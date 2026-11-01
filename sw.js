const CACHE_NAME = 'habit-timer-cache-v17';
const DATA_CACHE_NAME = 'habit-timer-user-data-backup-v1';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.map((key) => {
            // Never delete the user data backup cache across app updates!
            if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
              return caches.delete(key);
            }
            return null;
          })
        )
      )
      .then(() => self.clients.claim())
  );
});

const putInCache = (request, response) => {
  if (!response || !response.ok || response.type === 'opaque') return;
  const cloned = response.clone();
  caches.open(CACHE_NAME).then((cache) => cache.put(request, cloned)).catch(() => {});
};

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  // Only handle our own origin. Firebase / Google APIs (streaming Firestore channels etc.)
  // go straight to the network without being cloned into the cache.
  if (url.origin !== self.location.origin) return;

  // Content-hashed build assets never change: cache-first for instant loads.
  if (url.pathname.includes('/assets/') || url.pathname.includes('/alarms/')) {
    event.respondWith(
      caches.match(request).then(
        (cached) =>
          cached ||
          fetch(request).then((response) => {
            putInCache(request, response);
            return response;
          })
      )
    );
    return;
  }

  // HTML / manifest / everything else: network-first so updates appear immediately,
  // falling back to cache when offline.
  event.respondWith(
    fetch(request)
      .then((response) => {
        putInCache(request, response);
        return response;
      })
      .catch(() => caches.match(request))
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if ('focus' in client) {
          return client.focus();
        }
      }
      if (self.clients.openWindow) {
        return self.clients.openWindow('./');
      }
    })
  );
});
