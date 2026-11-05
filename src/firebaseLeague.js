import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getFirestore,
  doc,
  setDoc,
  deleteDoc,
  collection,
  onSnapshot,
  getDocs,
  query,
  limit,
  serverTimestamp,
} from 'firebase/firestore';
import { getAuth, signInAnonymously } from 'firebase/auth';

// Pre-configured Firebase project settings for seamless zero-config online league
// When populated, all players automatically connect without pasting or manual setup.
export const DEFAULT_FIREBASE_CONFIG = {
  apiKey: 'AIzaSyCKSPnK2RUbewGUxogdzNscjGnuPzj5lBY',
  authDomain: 'syuukanzuke.firebaseapp.com',
  projectId: 'syuukanzuke',
  storageBucket: 'syuukanzuke.firebasestorage.app',
  messagingSenderId: '216671225596',
  appId: '1:216671225596:web:19eb746364d54c8a43f979',
  measurementId: 'G-XN1R2L7PHK',
};

const FIREBASE_CONFIG_STORAGE_KEY = 'habit_timer_firebase_config';
const ANONYMOUS_USER_KEY = 'habit_timer_online_user_id';

// Default / fallback Firebase config
export const getStoredFirebaseConfig = () => {
  if (DEFAULT_FIREBASE_CONFIG && DEFAULT_FIREBASE_CONFIG.apiKey) {
    return DEFAULT_FIREBASE_CONFIG;
  }
  try {
    if (typeof window !== 'undefined' && window.__HABIT_TIMER_FIREBASE_CONFIG__) {
      return window.__HABIT_TIMER_FIREBASE_CONFIG__;
    }
    const raw = localStorage.getItem(FIREBASE_CONFIG_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.apiKey && parsed.projectId) {
        return parsed;
      }
    }
  } catch (e) {
    // Ignore JSON errors
  }
  return null;
};

export const saveStoredFirebaseConfig = (config) => {
  try {
    if (!config) {
      localStorage.removeItem(FIREBASE_CONFIG_STORAGE_KEY);
      return;
    }
    localStorage.setItem(FIREBASE_CONFIG_STORAGE_KEY, JSON.stringify(config));
  } catch (e) {
    console.error(e);
  }
};

let cachedApp = null;
let cachedDb = null;
let cachedAuth = null;
let cachedUid = null;

export const getOrCreateAnonymousUserId = () => {
  try {
    let uid = localStorage.getItem(ANONYMOUS_USER_KEY);
    if (!uid) {
      uid = `user_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
      localStorage.setItem(ANONYMOUS_USER_KEY, uid);
    }
    return uid;
  } catch (e) {
    return `user_${Date.now()}`;
  }
};

export const initFirebase = () => {
  const config = getStoredFirebaseConfig();
  if (!config) return null;

  try {
    const app = getApps().length > 0 ? getApp() : initializeApp(config);
    const db = getFirestore(app);
    const auth = getAuth(app);
    cachedApp = app;
    cachedDb = db;
    cachedAuth = auth;

    // Sign in anonymously if not already signed in
    signInAnonymously(auth)
      .then((userCred) => {
        const existing = localStorage.getItem(ANONYMOUS_USER_KEY);
        if (!existing) {
          cachedUid = userCred.user.uid;
          localStorage.setItem(ANONYMOUS_USER_KEY, cachedUid);
        } else {
          cachedUid = existing;
        }
      })
      .catch((err) => {
        console.warn('Anonymous auth note:', err);
      });

    return { app, db, auth };
  } catch (e) {
    console.error('Firebase init failed:', e);
    return null;
  }
};

/**
 * Upload current player standing to the global weekly ranking (ALL USERS)
 */
export const syncPlayerToOnlineLeague = async ({
  weekKey,
  tierId, // Optional, retained for compatibility
  playerName,
  charId,
  level,
  minutes,
  itemCount = 0,
}) => {
  const fb = cachedDb ? { db: cachedDb, auth: cachedAuth } : initFirebase();
  const uid = getOrCreateAnonymousUserId();

  if (!fb || !fb.db) {
    return { success: false, isOffline: true };
  }

  try {
    // Global weekly rankings collection for all users
    const docRef = doc(fb.db, 'weekly_rankings', weekKey, 'members', uid);
    await setDoc(
      docRef,
      {
        userId: uid,
        name: playerName || 'あなた',
        charId: charId || 'mochi',
        level: Number(level) || 1,
        minutes: Math.max(0, Number(minutes) || 0),
        itemCount: Math.max(0, Number(itemCount) || 0),
        updatedAt: serverTimestamp(),
        isRealUser: true,
      },
      { merge: true }
    );
    return { success: true, uid };
  } catch (e) {
    console.error('Failed to sync player standing to Firestore:', e);
    return { success: false, error: e };
  }
};

/**
 * One-shot immediate fetch of all real users in the global weekly ranking
 */
export const fetchOnlineLeagueMembers = async ({ weekKey }) => {
  const fb = cachedDb ? { db: cachedDb } : initFirebase();
  if (!fb || !fb.db) return [];

  try {
    const membersCol = collection(fb.db, 'weekly_rankings', weekKey, 'members');
    const q = query(membersCol, limit(100));
    const snapshot = await getDocs(q);
    const realMembers = [];
    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      realMembers.push({
        id: docSnap.id,
        userId: data.userId || docSnap.id,
        name: data.name || 'プレイヤー',
        charId: data.charId || 'mochi',
        level: Number(data.level) || 1,
        minutes: Number(data.minutes) || 0,
        itemCount: Number(data.itemCount ?? (data.minutes ? Math.floor(data.minutes / 25) : 0)),
        isRealUser: true,
        updatedAt: data.updatedAt,
      });
    });
    return realMembers;
  } catch (e) {
    console.warn('Failed to fetch online league members:', e);
    return [];
  }
};

/**
 * Subscribe to all real users in the global weekly ranking
 */
export const subscribeToOnlineLeague = ({ weekKey, tierId, onUpdate }) => {
  const fb = cachedDb ? { db: cachedDb } : initFirebase();
  if (!fb || !fb.db) {
    onUpdate([]);
    return () => {};
  }

  try {
    // Listen to all users for this week
    const membersCol = collection(fb.db, 'weekly_rankings', weekKey, 'members');
    const q = query(membersCol, limit(100));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const realMembers = [];
        snapshot.forEach((docSnap) => {
          const data = docSnap.data();
          realMembers.push({
            id: docSnap.id,
            userId: data.userId || docSnap.id,
            name: data.name || 'プレイヤー',
            charId: data.charId || 'mochi',
            level: Number(data.level) || 1,
            minutes: Number(data.minutes) || 0,
            itemCount: Number(data.itemCount ?? (data.minutes ? Math.floor(data.minutes / 25) : 0)),
            isRealUser: true,
            updatedAt: data.updatedAt,
          });
        });
        onUpdate(realMembers);
      },
      (error) => {
        console.warn('Firestore ranking subscription error:', error);
        onUpdate([]);
      }
    );

    return unsubscribe;
  } catch (e) {
    console.error('Failed to listen to global ranking:', e);
    onUpdate([]);
    return () => {};
  }
};

// ==========================================
// ADMIN & SECURITY MANAGEMENT
// ==========================================

const DEFAULT_ACCESS_PASSWORD = 'habit2026';
const DEFAULT_ADMIN_PIN = 'admin777';

/**
 * Fetch or listen to site access security configuration from Firestore
 */
export const subscribeSiteSecurity = (onUpdate) => {
  const fb = cachedDb ? { db: cachedDb } : initFirebase();
  if (!fb || !fb.db) {
    onUpdate({ password: DEFAULT_ACCESS_PASSWORD, adminPin: DEFAULT_ADMIN_PIN });
    return () => {};
  }

  try {
    const docRef = doc(fb.db, 'app_settings', 'security');
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        onUpdate({
          password: data.password || DEFAULT_ACCESS_PASSWORD,
          adminPin: data.adminPin || DEFAULT_ADMIN_PIN,
          updatedAt: data.updatedAt,
        });
      } else {
        // Initial fallback
        onUpdate({ password: DEFAULT_ACCESS_PASSWORD, adminPin: DEFAULT_ADMIN_PIN });
      }
    }, () => {
      onUpdate({ password: DEFAULT_ACCESS_PASSWORD, adminPin: DEFAULT_ADMIN_PIN });
    });
    return unsubscribe;
  } catch (e) {
    onUpdate({ password: DEFAULT_ACCESS_PASSWORD, adminPin: DEFAULT_ADMIN_PIN });
    return () => {};
  }
};

/**
 * Update site access password (Admin only)
 */
export const updateSiteAccessPassword = async (newPassword) => {
  const fb = cachedDb ? { db: cachedDb } : initFirebase();
  if (!fb || !fb.db) return false;

  try {
    const docRef = doc(fb.db, 'app_settings', 'security');
    await setDoc(
      docRef,
      {
        password: String(newPassword).trim(),
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
    return true;
  } catch (e) {
    console.error('Failed to update access password:', e);
    return false;
  }
};

/**
 * Admin: Update specific user's minutes or name in Firestore
 */
export const adminUpdateUserRecord = async ({ weekKey, userId, name, minutes, level }) => {
  const fb = cachedDb ? { db: cachedDb } : initFirebase();
  if (!fb || !fb.db || !userId) return false;

  try {
    const docRef = doc(fb.db, 'weekly_rankings', weekKey, 'members', userId);
    const payload = {
      updatedAt: serverTimestamp(),
    };
    if (name !== undefined) payload.name = String(name).trim();
    if (minutes !== undefined) payload.minutes = Math.max(0, Number(minutes) || 0);
    if (level !== undefined) payload.level = Math.max(1, Number(level) || 1);

    await setDoc(docRef, payload, { merge: true });
    return true;
  } catch (e) {
    console.error('Failed to update user record:', e);
    return false;
  }
};

/**
 * Admin: Delete specific user from Firestore
 */
export const adminDeleteUserRecord = async ({ weekKey, userId }) => {
  const fb = cachedDb ? { db: cachedDb } : initFirebase();
  if (!fb || !fb.db || !userId) return false;

  try {
    const docRef = doc(fb.db, 'weekly_rankings', weekKey, 'members', userId);
    await deleteDoc(docRef);
    return true;
  } catch (e) {
    console.error('Failed to delete user record:', e);
    return false;
  }
};
