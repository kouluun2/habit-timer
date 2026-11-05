import React, { useState, useEffect, useRef, useMemo, useCallback, memo, useId } from 'react';

import { motion, AnimatePresence } from 'framer-motion';

import {

  BookOpen,

  Laptop,

  Footprints,

  Coffee,

  Music,

  Dumbbell,

  Palette,

  Play,

  Pause,

  RotateCcw,

  AlertCircle,

  Plus,

  Minus,

  Check,

  Lock,

  Unlock,

  Sparkles,

  Flame,

  Star,

  Crown,

  Gift,

  Package,

  Target,

  TrendingUp,

  Circle,

  Waves,

  Disc,

  X,

  Trophy,

  RefreshCw,

  ChevronUp,

  ChevronDown,

  BarChart3,

  Smile,

  Clock,

  CheckCircle2,

  Heart,

  Smartphone,

  Maximize2,

  Wifi,

  Battery,

  QrCode,

  Share,

  Copy,

  Settings,

  Trash2,

  Volume2,

  Volume1,

  VolumeX,

  BellRing,

  Pencil,

  Hourglass,

  Cloud,

  Radio,

  Users,

  Shield,

  ShieldCheck,

  Key,

  Bot,

  Send,

  LogOut,

  Eye,

  EyeOff,

  Wand2,

  Calendar,

  ChevronRight,

  ArrowUp,

  ArrowDown,

  History,

} from 'lucide-react';

import {

  getStoredFirebaseConfig,

  saveStoredFirebaseConfig,

  syncPlayerToOnlineLeague,

  subscribeToOnlineLeague,

  fetchOnlineLeagueMembers,

  getOrCreateAnonymousUserId,

  subscribeSiteSecurity,

  updateSiteAccessPassword,

  adminUpdateUserRecord,

  adminDeleteUserRecord,

} from './firebaseLeague';

import { getCompanionDialogue } from './aiCoach';

import { AtomicTimerDisplay } from './components/cute-timer/AtomicTimerDisplay';

import { useNativeTouchGuard } from './hooks/useNativeTouchGuard';



// ==========================================

// 1. CONSTANTS: CATEGORIES, THEMES & RICH CHARACTERS

// ==========================================



const CATEGORIES = [

  {

    id: 'book',

    label: '読書・勉強',

    icon: BookOpen,

    colorDark: '#38BDF8',

    glowDark: 'rgba(56, 189, 248, 0.42)',

    softBgDark: 'rgba(56, 189, 248, 0.18)',

    colorLight: '#2563EB',

    glowLight: 'rgba(37, 99, 235, 0.26)',

    softBgLight: 'rgba(37, 99, 235, 0.12)',

    ambientLight: '#DBEAFE',

  },

  {

    id: 'laptop',

    label: '仕事・開発',

    icon: Laptop,

    colorDark: '#A78BFA',

    glowDark: 'rgba(167, 139, 250, 0.42)',

    softBgDark: 'rgba(167, 139, 250, 0.18)',

    colorLight: '#7C3AED',

    glowLight: 'rgba(124, 58, 237, 0.26)',

    softBgLight: 'rgba(124, 58, 237, 0.12)',

    ambientLight: '#EDE9FE',

  },

  {

    id: 'shoes',

    label: '散歩・外出',

    icon: Footprints,

    colorDark: '#34D399',

    glowDark: 'rgba(52, 211, 153, 0.42)',

    softBgDark: 'rgba(52, 211, 153, 0.18)',

    colorLight: '#059669',

    glowLight: 'rgba(5, 150, 105, 0.26)',

    softBgLight: 'rgba(5, 150, 105, 0.12)',

    ambientLight: '#D1FAE5',

  },

  {

    id: 'cafe',

    label: '休憩・カフェ',

    icon: Coffee,

    colorDark: '#FBBF24',

    glowDark: 'rgba(251, 191, 36, 0.42)',

    softBgDark: 'rgba(251, 191, 36, 0.18)',

    colorLight: '#D97706',

    glowLight: 'rgba(217, 119, 6, 0.26)',

    softBgLight: 'rgba(217, 119, 6, 0.13)',

    ambientLight: '#FEF3C7',

  },

  {

    id: 'music',

    label: '音楽・趣味',

    icon: Music,

    colorDark: '#F472B6',

    glowDark: 'rgba(244, 114, 182, 0.42)',

    softBgDark: 'rgba(244, 114, 182, 0.18)',

    colorLight: '#DB2777',

    glowLight: 'rgba(219, 39, 119, 0.26)',

    softBgLight: 'rgba(219, 39, 119, 0.12)',

    ambientLight: '#FCE7F3',

  },

  {

    id: 'dumbbell',

    label: '筋トレ・運動',

    icon: Dumbbell,

    colorDark: '#FB7185',

    glowDark: 'rgba(251, 113, 133, 0.42)',

    softBgDark: 'rgba(251, 113, 133, 0.18)',

    colorLight: '#E11D48',

    glowLight: 'rgba(225, 29, 72, 0.26)',

    softBgLight: 'rgba(225, 29, 72, 0.12)',

    ambientLight: '#FFE4E6',

  },

];



const resolveCategoryForTheme = (cat, isLight) => {

  const base = cat || CATEGORIES[0];

  return {

    ...base,

    color: isLight ? base.colorLight : base.colorDark,

    glow: isLight ? base.glowLight : base.glowDark,

    softBg: isLight ? base.softBgLight : base.softBgDark,

    ambientTint: base.ambientLight,

  };

};



const PRESET_MINUTES = [5, 15, 25, 45, 60, 120, 180, 240, 480];



const TASK_FREQUENCIES = [

  { id: 'daily', label: '毎日', shortLabel: '毎日', countsForStreak: true, weeklyTarget: 7 },

  { id: 'weekly-1', label: '週1回', shortLabel: '週1回', countsForStreak: false, weeklyTarget: 1 },

  { id: 'weekly-2', label: '週2回', shortLabel: '週2回', countsForStreak: false, weeklyTarget: 2 },

  { id: 'weekly-3', label: '週3回', shortLabel: '週3回', countsForStreak: false, weeklyTarget: 3 },

  { id: 'weekly-4', label: '週4回', shortLabel: '週4回', countsForStreak: false, weeklyTarget: 4 },

  { id: 'weekly-5', label: '週5回', shortLabel: '週5回', countsForStreak: false, weeklyTarget: 5 },

  { id: 'flexible', label: '不定期', shortLabel: '不定期', countsForStreak: false, weeklyTarget: null },

];



const getTaskFrequencyMeta = (taskOrFreqId) => {

  const freqId =

    typeof taskOrFreqId === 'string'

      ? taskOrFreqId

      : taskOrFreqId?.frequency || 'daily';

  return TASK_FREQUENCIES.find((f) => f.id === freqId) || TASK_FREQUENCIES[0];

};



const isStreakTargetTask = (task) => getTaskFrequencyMeta(task).countsForStreak;



const PRESET_SETS = [1, 2, 3, 4, 5];



const MAX_SELECTED_CHARACTERS = 3;



const getTaskTotalSets = (task) => Math.max(1, Math.floor(Number(task?.totalSets) || 1));



const getTaskSetMinutes = (task) => {

  if (typeof task?.setDurationMinutes === 'number' && task.setDurationMinutes > 0) {

    return Math.max(1, Math.floor(task.setDurationMinutes));

  }

  const sets = getTaskTotalSets(task);

  const totalMins = Math.max(1, Math.floor(Number(task?.durationMinutes) || 25));

  return sets > 1 ? Math.max(1, Math.round(totalMins / sets)) : totalMins;

};



const getTaskTotalMinutes = (task) => getTaskSetMinutes(task) * getTaskTotalSets(task);



// AI Task Advisor: Analyzes title, duration, sets, and frequency to give personalized advice & 3-level proposals

const getAiTaskAdvice = ({ title, setMinutes, sets, totalMinutes, frequency }) => {

  const cleanTitle = (title || '').trim() || 'このタスク';

  const cleanSets = Math.max(1, Math.floor(Number(sets) || 1));

  const cleanSetMins = Math.max(1, Math.floor(Number(setMinutes) || 25));

  const cleanTotalMins = Math.max(1, Math.floor(Number(totalMinutes) || cleanSetMins * cleanSets));

  const freqMeta = getTaskFrequencyMeta(frequency);

  const freqLabel = freqMeta.label || '毎日';



  const lower = cleanTitle.toLowerCase();

  const isExercise =

    /(筋トレ|ワークアウト|ランニング|ジョギング|ストレッチ|ヨガ|ウォーキング|散歩|ジム|gym|フィットネス|腹筋|スクワット|腕立て|体幹|hiit|運動|筋力|トレーニング)/i.test(

      lower

    );

  const isStudy =

    /(読書|本|勉強|英語|単語|資格|復習|予習|講義|暗記|数学|受験|テスト|study|read|book|english|toeic|インプット)/i.test(

      lower

    );

  const isCreativeWork =

    /(プログラミング|開発|コード|coding|code|執筆|ブログ|原稿|デザイン|作業|制作|動画編集|イラスト|絵|work|タスク)/i.test(

      lower

    );

  const isMentalLife =

    /(瞑想|めいそう|マインドフルネス|掃除|片付け|整理|日記|早起き|朝活|ナイトルーティン|呼吸|睡眠)/i.test(

      lower

    );



  const isLight = cleanTotalMins <= 20;

  const isModerate = cleanTotalMins > 20 && cleanTotalMins <= 45;

  const isHeavy = cleanTotalMins > 45 && cleanTotalMins <= 75;

  const isIntense = cleanTotalMins > 75;

  const hasSets = cleanSets > 1;



  // 1. Overall AI Diagnostic Comment

  let comment = '';

  if (isExercise) {

    if (isLight) {

      comment = `『${cleanTitle}』を${freqLabel}に${cleanTotalMins}分。軽やかで挫折しにくく、運動習慣の第一歩として理想的な設定です！`;

    } else if (hasSets) {

      comment = `『${cleanTitle}』を${freqLabel}に${cleanSetMins}分×${cleanSets}セット（計${cleanTotalMins}分）。セット間で筋肉を休ませつつ高い運動効果を得られる設計です！`;

    } else {

      comment = `『${cleanTitle}』を${freqLabel}に1回${cleanTotalMins}分。しっかり体を追い込める本格的なトレーニング構成です！`;

    }

  } else if (isStudy) {

    if (hasSets) {

      comment = `『${cleanTitle}』を${freqLabel}に${cleanSetMins}分×${cleanSets}セット（計${cleanTotalMins}分）。ポモドーロ技法のように集中波長を途切れさせない黄金の学習設計です！`;

    } else if (isLight) {

      comment = `『${cleanTitle}』を${freqLabel}に${cleanTotalMins}分。スキマ時間を活用し、毎日確実に知識を積み上げられるスマートな設定です！`;

    } else {

      comment = `『${cleanTitle}』を${freqLabel}にじっくり${cleanTotalMins}分。一つのテーマに深く没頭して理解を深めるのにぴったりの構成です！`;

    }

  } else if (isCreativeWork) {

    if (hasSets) {

      comment = `『${cleanTitle}』を${freqLabel}に${cleanSetMins}分×${cleanSets}セット（計${cleanTotalMins}分）。適度な区切りで脳疲労を防ぎ、クリエイティブな質を保ちやすい設計です！`;

    } else if (isIntense || isHeavy) {

      comment = `『${cleanTitle}』を${freqLabel}に合計${cleanTotalMins}分。深いゾーン状態に入って大きなアウトプットを生む本格設定です！`;

    } else {

      comment = `『${cleanTitle}』を${freqLabel}に${cleanTotalMins}分。着手ハードルが低く、日々の着実な前進を生む軽快な設定です！`;

    }

  } else if (isMentalLife) {

    comment = `『${cleanTitle}』を${freqLabel}に${cleanTotalMins}分。生活リズムと心の安定を育む、非常に心地よいペース配分です！`;

  } else {

    if (hasSets) {

      comment = `『${cleanTitle}』を${freqLabel}に${cleanSetMins}分×${cleanSets}セット（計${cleanTotalMins}分）。セット分割により高い集中力を無理なくキープできる好設定です！`;

    } else if (isLight) {

      comment = `『${cleanTitle}』を${freqLabel}に1日${cleanTotalMins}分。毎日気軽に達成できて、習慣化の成功確率が極めて高い設定です！`;

    } else {

      comment = `『${cleanTitle}』を${freqLabel}に1回${cleanTotalMins}分。しっかり腰を据えて取り組み、目に見える成果を出しやすい構成です！`;

    }

  }



  // 2. Beginner Proposal (Goal: 100% reach 14 completions without fail)

  let beginner = '';

  if (isHeavy || isIntense) {

    beginner = `14回完了まで変更できないため、最初は1セット（${Math.min(cleanSetMins, 20)}分）から開始し、確実に14回完走を目指すのが安全です。`;

  } else if (hasSets && cleanSets > 2) {

    beginner = `まずは1日1〜2セットに留め、疲れを残さず『14回タイマーを鳴らし切る』ことを最優先にしましょう。`;

  } else if (isLight) {

    beginner = `現在の${cleanTotalMins}分設定が最適解！ハードルが低いため、毎日タイマーを押すだけで14回達成は目前です。`;

  } else {

    beginner = `『忙しい日は途中で切り上げても達成扱いにする』と決めておくと、14回を挫折せず突破できます。`;

  }



  // 3. Intermediate Proposal (Goal: Routinization & Stability)

  let intermediate = '';

  if (hasSets) {

    intermediate = `現在の${cleanSetMins}分×${cleanSets}セットを継続。セット間に3〜5分の小休憩を挟むと最後まで集中が持続します。`;

  } else if (isExercise) {

    intermediate = `現在の${cleanTotalMins}分を維持。『毎日入浴前』など既存の生活行動の直前・直後に紐付けると自然に定着します。`;

  } else if (isStudy || isCreativeWork) {

    intermediate = `現在の${cleanTotalMins}分を継続し、開始前に『今日やる範囲』を1行メモしてからスタートすると効率が上がります。`;

  } else {

    intermediate = `現在のペース（${freqLabel}・計${cleanTotalMins}分）をそのままキープ。やる時間帯（朝・夜など）を固定するのが定着の鍵です。`;

  }



  // 4. Advanced Proposal (Goal: Higher Load & Max Results)

  let advanced = '';

  if (isExercise) {

    advanced = `種目や負荷をあらかじめ固定し、セット間の休憩を30〜60秒に厳密管理してトレーニング密度を最大化しましょう。`;

  } else if (isStudy) {

    advanced = `終了後1分で『学んだ要点』を自分の言葉で1行アウトプットするルールを加えると、記憶定着率が倍増します。`;

  } else if (isCreativeWork) {

    advanced = `スマホや通知を完全遮断したディープワーク環境を整え、時間あたりの制作速度と質を極限まで高めましょう。`;

  } else {

    advanced = `14回達成後にセット数を＋1増やすか、時間内での達成ノルマを数値化して自己ベスト更新に挑戦しましょう。`;

  }



  return { comment, beginner, intermediate, advanced };

};



const getTaskCompletedSets = (task) => {

  const total = getTaskTotalSets(task);

  if (task?.completed) return total;

  return Math.max(0, Math.min(total - 1, Math.floor(Number(task?.completedSets) || 0)));

};



const LEAGUE_TIERS = [

  {

    id: 'bronze',

    name: 'ブロンズリーグ',

    shortName: 'ブロンズ',

    color: '#D97706',

    softBg: 'rgba(217, 119, 6, 0.18)',

    baseWeeklyMinutes: 180,

  },

  {

    id: 'silver',

    name: 'シルバーリーグ',

    shortName: 'シルバー',

    color: '#94A3B8',

    softBg: 'rgba(148, 163, 184, 0.2)',

    baseWeeklyMinutes: 340,

  },

  {

    id: 'gold',

    name: 'ゴールドリーグ',

    shortName: 'ゴールド',

    color: '#FACC15',

    softBg: 'rgba(250, 204, 21, 0.2)',

    baseWeeklyMinutes: 540,

  },

  {

    id: 'platinum',

    name: 'プラチナリーグ',

    shortName: 'プラチナ',

    color: '#38BDF8',

    softBg: 'rgba(56, 189, 248, 0.2)',

    baseWeeklyMinutes: 800,

  },

  {

    id: 'diamond',

    name: 'ダイヤモンドリーグ',

    shortName: 'ダイヤ',

    color: '#A78BFA',

    softBg: 'rgba(167, 139, 250, 0.2)',

    baseWeeklyMinutes: 1150,

  },

  {

    id: 'master',

    name: 'マスターリーグ',

    shortName: 'マスター',

    color: '#F43F5E',

    softBg: 'rgba(244, 63, 94, 0.2)',

    baseWeeklyMinutes: 1600,

  },

];



const getWeekWindowInfo = (nowDate = new Date()) => {

  const dayOfWeek = nowDate.getDay(); // 0 (Sun) to 6 (Sat)

  const diffToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

  const monday = new Date(

    nowDate.getFullYear(),

    nowDate.getMonth(),

    nowDate.getDate() - diffToMonday,

    0,

    0,

    0,

    0

  );

  const nextMonday = new Date(monday.getTime() + 7 * 24 * 60 * 60 * 1000);

  const weekKey = `${monday.getFullYear()}-${String(monday.getMonth() + 1).padStart(

    2,

    '0'

  )}-${String(monday.getDate()).padStart(2, '0')}`;



  const totalWeekMs = 7 * 24 * 60 * 60 * 1000;

  const elapsedMs = Math.max(0, Math.min(totalWeekMs, nowDate.getTime() - monday.getTime()));

  const remainingMs = Math.max(0, nextMonday.getTime() - nowDate.getTime());

  const elapsedFraction = elapsedMs / totalWeekMs;



  const remainingDays = Math.floor(remainingMs / (24 * 60 * 60 * 1000));

  const remainingHours = Math.floor(

    (remainingMs % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000)

  );



  return {

    weekKey,

    mondayTs: monday.getTime(),

    nextMondayTs: nextMonday.getTime(),

    elapsedFraction,

    remainingDays,

    remainingHours,

  };

};



const MAX_LEVEL = 100;

const MAX_TOTAL_XP = 60000;



// Cumulative XP required to reach `level` (Lv.1 = 0 pt, Lv.100 = 60,000 pt, 1 minute = 1 pt)

// Uses a progressive curve so higher levels require increasingly more XP.

const getTotalXpForLevel = (level) => {

  if (level <= 1) return 0;

  if (level >= MAX_LEVEL) return MAX_TOTAL_XP;

  const t = (level - 1) / (MAX_LEVEL - 1);

  return Math.round(MAX_TOTAL_XP * (0.04 * t + 0.96 * t * t));

};



const getLevelInfo = (rawXp) => {

  const totalXp = Math.max(0, Math.floor(rawXp || 0));

  let level = 1;

  for (let l = MAX_LEVEL; l >= 1; l--) {

    if (totalXp >= getTotalXpForLevel(l)) {

      level = l;

      break;

    }

  }

  const currentLevelBaseXp = getTotalXpForLevel(level);

  const nextLevelTargetXp =

    level >= MAX_LEVEL ? MAX_TOTAL_XP : getTotalXpForLevel(level + 1);

  const currentLevelRequiredXp = Math.max(1, nextLevelTargetXp - currentLevelBaseXp);

  const currentLevelEarnedXp = Math.max(0, totalXp - currentLevelBaseXp);

  const xpToNext = level >= MAX_LEVEL ? 0 : Math.max(0, nextLevelTargetXp - totalXp);

  const progress =

    level >= MAX_LEVEL

      ? 1

      : Math.max(0, Math.min(1, currentLevelEarnedXp / currentLevelRequiredXp));



  return {

    level,

    totalXp,

    currentLevelBaseXp,

    nextLevelTargetXp,

    currentLevelRequiredXp,

    currentLevelEarnedXp,

    xpToNext,

    progress,

    isMax: level >= MAX_LEVEL,

  };

};



const CHARACTERS = [

  {

    id: 'mochi',

    name: 'もちまる王',

    title: '王冠を乗せた桜白玉の妖精',

    unlockLevel: 1,

    unlockText: '初期から仲良し',

    badgeColor: '#F472B6',

  },

  {

    id: 'chiimaru',

    name: 'ちいまる',

    title: 'うるうる涙目でいっしょうけんめい跳ぶ白こぐま',

    unlockLevel: 2,

    unlockText: 'Lv.2でアンロック',

    badgeColor: '#FB7185',

  },

  {

    id: 'shiba',

    name: 'こむぎ丸',

    title: '唐草スカーフの豆柴探検隊',

    unlockLevel: 3,

    unlockText: 'Lv.3でアンロック',

    badgeColor: '#F59E0B',

  },

  {

    id: 'zundamon',

    name: 'ずんだもん',

    title: 'ずんだ豆の耳がぴょこぴょこ動く元気な妖精',

    unlockLevel: 4,

    unlockText: 'Lv.4でアンロック',

    badgeColor: '#84CC16',

  },

  {

    id: 'hoshiusa',

    name: 'ほしうさ',

    title: 'お星さまほっぺの元気な跳躍うさぎ',

    unlockLevel: 5,

    unlockText: 'Lv.5でアンロック',

    badgeColor: '#EC4899',

  },

  {

    id: 'miku',

    name: '初音ミク',

    title: 'エメラルドグリーンのツインテールが弾む電子の歌姫',

    unlockLevel: 6,

    unlockText: 'Lv.6でアンロック',

    badgeColor: '#39C5BB',

  },

  {

    id: 'kinoko',

    name: 'きのっぴ',

    title: '赤水玉の傘と小枝のおててを持つ森のキノコ精',

    unlockLevel: 7,

    unlockText: 'Lv.7でアンロック',

    badgeColor: '#EF4444',

  },

  {

    id: 'ghostcat',

    name: 'ぽわにゃん',

    title: 'ふわふわ宙に浮かぶおばけ子猫の妖精',

    unlockLevel: 8,

    unlockText: 'Lv.8でアンロック',

    badgeColor: '#818CF8',

  },

  {

    id: 'octopus',

    name: 'タコポン',

    title: '宇宙服とジェットパックを背負った宇宙タコ飛行士',

    unlockLevel: 9,

    unlockText: 'Lv.9でアンロック',

    badgeColor: '#A855F7',

  },

  {

    id: 'robot',

    name: 'ネジまる',

    title: '背中のぜんまいを巻いて元気に動くレトロロボット',

    unlockLevel: 10,

    unlockText: 'Lv.10でアンロック',

    badgeColor: '#0284C7',

  },

  {

    id: 'calico',

    name: 'みけ巫女',

    title: '金の鈴をつけた三毛猫看板娘',

    unlockLevel: 53,

    unlockText: 'Lv.53でアンロック',

    badgeColor: '#FB923C',

  },

  {

    id: 'usagi',

    name: 'みるく姫',

    title: '苺リボンと宝石瞳の垂れ耳うさぎ',

    unlockLevel: 62,

    unlockText: 'Lv.62でアンロック',

    badgeColor: '#EC4899',

  },

  {

    id: 'dolphin',

    name: 'まりん姫',

    title: '真珠のティアラをつけた桜イルカ',

    unlockLevel: 67,

    unlockText: 'Lv.67でアンロック',

    badgeColor: '#0EA5E9',

  },

  {

    id: 'slime',

    name: 'ぷるるん王',

    title: '黄金の王冠を戴くぷるぷるスライム王子',

    unlockLevel: 77,

    unlockText: 'Lv.77でアンロック',

    badgeColor: '#38BDF8',

  },

  {

    id: 'dragon',

    name: '星竜ルナリア',

    title: '銀河の翼と宝珠を持つ伝説の幼竜',

    unlockLevel: 95,

    unlockText: 'Lv.95でアンロック',

    badgeColor: '#A855F7',

  },

  {

    id: 'celestialcat',

    name: '星詠みケットシー',

    title: '三日月の宝冠と星屑マントの幻獣猫',

    unlockLevel: 98,

    unlockText: 'Lv.98でアンロック',

    badgeColor: '#6366F1',

  },

  {

    id: 'sunemperor',

    name: '太陽神アマテラス丸',

    title: '日輪の後光を戴く最高レベルの守護神',

    unlockLevel: 100,

    unlockText: 'Lv.100でアンロック',

    badgeColor: '#FACC15',

  },

];



const THEMES = [

  {

    id: 'pastel-milky',

    name: 'ぽてミルキー',

    scenery: 'pastel-milky',

    isLight: true,

    unlockLevel: 1,

    bg: 'bg-gradient-to-b from-[#FFFDF9] via-[#FFF5F7] to-[#FFF0F3]',

    preview: 'linear-gradient(135deg, #FFF0F3 0%, #FFE4E8 50%, #FFD6DE 100%)',

    card: 'bg-white/92 border-rose-200/80 shadow-[0_16px_36px_-10px_rgba(255,141,161,0.22)]',

    modalCard: 'bg-[#FFFDFC]/98 border-rose-200/80 shadow-2xl shadow-rose-950/15',

    pill: 'bg-rose-50/90 hover:bg-rose-100/80 border-rose-200/70',

    subPanel: 'bg-rose-100/75',

    activeTab: 'bg-white shadow-sm text-rose-800',

    backdrop: 'bg-rose-950/35',

    text: 'text-stone-800',

    subtext: 'text-stone-500',

    ringTrack: 'rgba(255, 141, 161, 0.16)',

    chartDotStroke: '#FFFFFF',

  },

  {

    id: 'sakura-latte',

    name: 'さくらラテ',

    scenery: 'sakura',

    isLight: true,

    unlockLevel: 1,

    bg: 'bg-gradient-to-b from-[#FFF8F8] via-[#FFF0F3] to-[#FCE7F3]',

    preview: 'linear-gradient(135deg, #FFF0F5 0%, #FCE7F3 50%, #FBCFE8 100%)',

    card: 'bg-white/90 border-pink-200/80 shadow-[0_16px_36px_-10px_rgba(244,114,182,0.2)]',

    modalCard: 'bg-[#FFF9FB]/98 border-pink-200/80 shadow-2xl shadow-pink-950/15',

    pill: 'bg-pink-50/90 hover:bg-pink-100/80 border-pink-200/70',

    subPanel: 'bg-pink-100/75',

    activeTab: 'bg-white shadow-sm text-pink-800',

    backdrop: 'bg-pink-950/35',

    text: 'text-stone-800',

    subtext: 'text-stone-500',

    ringTrack: 'rgba(244, 114, 182, 0.16)',

    chartDotStroke: '#FFFFFF',

  },

  {

    id: 'dark-mode',

    name: 'スレート黒',

    scenery: 'minimal-dark',

    isLight: false,

    unlockLevel: 1,

    bg: 'bg-gradient-to-b from-[#0B0F17] via-[#111827] to-[#0A0E17]',

    preview: 'linear-gradient(135deg, #0B0F17 0%, #1E293B 100%)',

    card: 'bg-slate-900/65 border-white/12 shadow-2xl shadow-black/50',

    modalCard: 'bg-slate-900/95 border-white/15 shadow-2xl shadow-black/70',

    pill: 'bg-white/[0.07] hover:bg-white/[0.12] border-white/10',

    subPanel: 'bg-black/30',

    activeTab: 'bg-white/15 shadow-sm',

    backdrop: 'bg-black/65',

    text: 'text-slate-50',

    subtext: 'text-slate-400',

    ringTrack: 'rgba(255, 255, 255, 0.1)',

    chartDotStroke: '#0F172A',

  },

  {

    id: 'minimal-white',

    name: 'パール白',

    scenery: 'minimal-light',

    isLight: true,

    unlockLevel: 1,

    bg: 'bg-gradient-to-b from-[#F8FAFC] via-[#F3F6FA] to-[#E8EEF5]',

    preview: 'linear-gradient(135deg, #FFFFFF 0%, #E2E8F0 100%)',

    card: 'bg-white/88 border-slate-200/90 shadow-[0_12px_32px_-8px_rgba(15,23,42,0.08)]',

    modalCard: 'bg-white/95 border-slate-200/90 shadow-2xl shadow-slate-900/15',

    pill: 'bg-slate-100/90 hover:bg-slate-200/75 border-slate-200/90',

    subPanel: 'bg-slate-200/75',

    activeTab: 'bg-white shadow-sm',

    backdrop: 'bg-slate-900/40',

    text: 'text-slate-800',

    subtext: 'text-slate-500',

    ringTrack: 'rgba(15, 23, 42, 0.08)',

    chartDotStroke: '#FFFFFF',

  },

  {

    id: 'meadow',

    name: 'そよ風の草原',

    scenery: 'meadow',

    isLight: true,

    unlockLevel: 3,

    bg: 'bg-gradient-to-b from-[#D8F3DC] via-[#ECFDF5] to-[#BBF7D0]',

    preview: 'linear-gradient(180deg, #7DD3FC 0%, #CCFBF1 52%, #4ADE80 100%)',

    card: 'bg-white/82 border-emerald-200/90 shadow-[0_12px_32px_-8px_rgba(6,95,70,0.12)]',

    modalCard: 'bg-[#F4FDF9]/95 border-emerald-200/90 shadow-2xl shadow-emerald-950/15',

    pill: 'bg-emerald-50/90 hover:bg-emerald-100/80 border-emerald-200/80',

    subPanel: 'bg-emerald-100/80',

    activeTab: 'bg-white shadow-sm',

    backdrop: 'bg-emerald-950/40',

    text: 'text-emerald-950',

    subtext: 'text-emerald-700/75',

    ringTrack: 'rgba(6, 95, 70, 0.1)',

    chartDotStroke: '#FFFFFF',

  },

  {

    id: 'sunset',

    name: '夕凪の茜空',

    scenery: 'sunset',

    isLight: false,

    unlockLevel: 7,

    bg: 'bg-gradient-to-b from-[#1E102B] via-[#4A1C40] to-[#7F2B3C]',

    preview: 'linear-gradient(180deg, #1E102B 0%, #6D234B 52%, #EA580C 100%)',

    card: 'bg-slate-950/45 border-rose-200/20 shadow-2xl shadow-black/55',

    modalCard: 'bg-[#211329]/95 border-rose-200/20 shadow-2xl shadow-black/75',

    pill: 'bg-white/10 hover:bg-white/15 border-rose-200/15',

    subPanel: 'bg-black/30',

    activeTab: 'bg-white/20 shadow-sm',

    backdrop: 'bg-black/65',

    text: 'text-rose-50',

    subtext: 'text-rose-200/75',

    ringTrack: 'rgba(255, 228, 230, 0.14)',

    chartDotStroke: '#1B1026',

  },

  {

    id: 'ocean',

    name: 'エメラルドの海',

    scenery: 'ocean',

    isLight: false,

    unlockLevel: 12,

    bg: 'bg-gradient-to-b from-[#06283D] via-[#0A4D68] to-[#088395]',

    preview: 'linear-gradient(180deg, #0EA5E9 0%, #0284C7 48%, #0F766E 100%)',

    card: 'bg-slate-950/45 border-cyan-200/20 shadow-2xl shadow-slate-950/60',

    modalCard: 'bg-[#072A3E]/95 border-cyan-200/20 shadow-2xl shadow-black/75',

    pill: 'bg-white/10 hover:bg-white/16 border-cyan-200/15',

    subPanel: 'bg-black/30',

    activeTab: 'bg-white/20 shadow-sm',

    backdrop: 'bg-black/65',

    text: 'text-cyan-50',

    subtext: 'text-cyan-200/75',

    ringTrack: 'rgba(165, 243, 252, 0.15)',

    chartDotStroke: '#06283D',

  },

  {

    id: 'sakura',

    name: '桜舞う春霞',

    scenery: 'sakura',

    isLight: true,

    unlockLevel: 18,

    bg: 'bg-gradient-to-b from-[#FCE7F3] via-[#FFF1F2] to-[#FBCFE8]',

    preview: 'linear-gradient(180deg, #FBCFE8 0%, #FFE4E6 55%, #F472B6 100%)',

    card: 'bg-white/84 border-pink-200/90 shadow-[0_12px_32px_-8px_rgba(157,23,77,0.1)]',

    modalCard: 'bg-[#FFF8FA]/95 border-pink-200/90 shadow-2xl shadow-pink-950/15',

    pill: 'bg-pink-50/90 hover:bg-pink-100/80 border-pink-200/80',

    subPanel: 'bg-pink-100/75',

    activeTab: 'bg-white shadow-sm',

    backdrop: 'bg-pink-950/40',

    text: 'text-rose-950',

    subtext: 'text-rose-700/75',

    ringTrack: 'rgba(157, 23, 77, 0.1)',

    chartDotStroke: '#FFFFFF',

  },

  {

    id: 'aurora',

    name: '極夜のオーロラ',

    scenery: 'aurora',

    isLight: false,

    unlockLevel: 25,

    bg: 'bg-gradient-to-b from-[#061021] via-[#0D253F] to-[#0A2E36]',

    preview: 'linear-gradient(135deg, #061021 0%, #0F4C5C 48%, #10B981 100%)',

    card: 'bg-slate-950/50 border-sky-200/18 shadow-2xl shadow-slate-950/65',

    modalCard: 'bg-[#0C1B31]/95 border-sky-200/20 shadow-2xl shadow-black/75',

    pill: 'bg-white/10 hover:bg-white/15 border-sky-200/15',

    subPanel: 'bg-black/30',

    activeTab: 'bg-white/20 shadow-sm',

    backdrop: 'bg-black/65',

    text: 'text-sky-50',

    subtext: 'text-sky-200/70',

    ringTrack: 'rgba(186, 230, 253, 0.14)',

    chartDotStroke: '#081224',

  },

  {

    id: 'forest',

    name: '木漏れ日の森',

    scenery: 'forest',

    isLight: false,

    unlockLevel: 33,

    bg: 'bg-gradient-to-b from-[#071914] via-[#0F2920] to-[#091C16]',

    preview: 'linear-gradient(180deg, #0F2920 0%, #1B4332 55%, #081C15 100%)',

    card: 'bg-slate-950/50 border-emerald-200/18 shadow-2xl shadow-black/60',

    modalCard: 'bg-[#0C201A]/95 border-emerald-200/20 shadow-2xl shadow-black/75',

    pill: 'bg-white/10 hover:bg-white/15 border-emerald-200/15',

    subPanel: 'bg-black/30',

    activeTab: 'bg-white/20 shadow-sm',

    backdrop: 'bg-black/65',

    text: 'text-emerald-50',

    subtext: 'text-emerald-200/70',

    ringTrack: 'rgba(167, 243, 208, 0.14)',

    chartDotStroke: '#081713',

  },

  {

    id: 'sky-island',

    name: '天空の雲海',

    scenery: 'sky',

    isLight: true,

    unlockLevel: 42,

    bg: 'bg-gradient-to-b from-[#BAE6FD] via-[#E0F2FE] to-[#F8FAFC]',

    preview: 'linear-gradient(180deg, #38BDF8 0%, #BAE6FD 55%, #FFFFFF 100%)',

    card: 'bg-white/85 border-sky-200/90 shadow-[0_12px_32px_-8px_rgba(3,105,161,0.12)]',

    modalCard: 'bg-[#F5FBFF]/95 border-sky-200/90 shadow-2xl shadow-sky-950/15',

    pill: 'bg-sky-50/90 hover:bg-sky-100/80 border-sky-200/80',

    subPanel: 'bg-sky-100/80',

    activeTab: 'bg-white shadow-sm',

    backdrop: 'bg-sky-950/40',

    text: 'text-sky-950',

    subtext: 'text-sky-700/75',

    ringTrack: 'rgba(3, 105, 161, 0.1)',

    chartDotStroke: '#FFFFFF',

  },

  {

    id: 'autumn',

    name: '紅葉の渓谷',

    scenery: 'autumn',

    isLight: false,

    unlockLevel: 52,

    bg: 'bg-gradient-to-b from-[#1F1118] via-[#3B171E] to-[#261114]',

    preview: 'linear-gradient(135deg, #2A1215 0%, #9A3412 52%, #EA580C 100%)',

    card: 'bg-slate-950/50 border-amber-200/18 shadow-2xl shadow-black/60',

    modalCard: 'bg-[#281217]/95 border-amber-200/20 shadow-2xl shadow-black/75',

    pill: 'bg-white/10 hover:bg-white/15 border-amber-200/15',

    subPanel: 'bg-black/30',

    activeTab: 'bg-white/20 shadow-sm',

    backdrop: 'bg-black/65',

    text: 'text-amber-50',

    subtext: 'text-amber-200/75',

    ringTrack: 'rgba(253, 230, 138, 0.14)',

    chartDotStroke: '#1F1118',

  },

  {

    id: 'deep-sea',

    name: '神秘の深海',

    scenery: 'deep-sea',

    isLight: false,

    unlockLevel: 62,

    bg: 'bg-gradient-to-b from-[#030914] via-[#061830] to-[#041224]',

    preview: 'linear-gradient(180deg, #041224 0%, #0A2647 50%, #00B4D8 100%)',

    card: 'bg-slate-950/55 border-blue-300/18 shadow-2xl shadow-black/70',

    modalCard: 'bg-[#06152B]/95 border-blue-300/20 shadow-2xl shadow-black/80',

    pill: 'bg-white/[0.08] hover:bg-white/14 border-blue-300/15',

    subPanel: 'bg-black/35',

    activeTab: 'bg-white/20 shadow-sm',

    backdrop: 'bg-black/70',

    text: 'text-blue-50',

    subtext: 'text-blue-200/70',

    ringTrack: 'rgba(147, 197, 253, 0.14)',

    chartDotStroke: '#030914',

  },

  {

    id: 'snow-crystal',

    name: '白銀の氷原',

    scenery: 'snow',

    isLight: true,

    unlockLevel: 72,

    bg: 'bg-gradient-to-b from-[#E0F2FE] via-[#F1F5F9] to-[#DBEAFE]',

    preview: 'linear-gradient(135deg, #E0F2FE 0%, #F8FAFC 50%, #93C5FD 100%)',

    card: 'bg-white/85 border-blue-200/90 shadow-[0_12px_32px_-8px_rgba(30,58,138,0.1)]',

    modalCard: 'bg-[#F8FAFC]/95 border-blue-200/90 shadow-2xl shadow-slate-900/15',

    pill: 'bg-blue-50/90 hover:bg-blue-100/80 border-blue-200/80',

    subPanel: 'bg-blue-100/75',

    activeTab: 'bg-white shadow-sm',

    backdrop: 'bg-slate-900/40',

    text: 'text-slate-800',

    subtext: 'text-slate-500',

    ringTrack: 'rgba(30, 58, 138, 0.09)',

    chartDotStroke: '#FFFFFF',

  },

  {

    id: 'cosmos',

    name: '星屑の宇宙',

    scenery: 'cosmos',

    isLight: false,

    unlockLevel: 82,

    bg: 'bg-gradient-to-b from-[#050511] via-[#110C29] to-[#080716]',

    preview: 'linear-gradient(135deg, #050511 0%, #1E1B4B 52%, #4C1D95 100%)',

    card: 'bg-slate-950/55 border-indigo-300/20 shadow-2xl shadow-black/75',

    modalCard: 'bg-[#0E0B22]/95 border-indigo-300/20 shadow-2xl shadow-black/80',

    pill: 'bg-white/[0.08] hover:bg-white/15 border-indigo-300/15',

    subPanel: 'bg-black/35',

    activeTab: 'bg-white/20 shadow-sm',

    backdrop: 'bg-black/70',

    text: 'text-indigo-50',

    subtext: 'text-indigo-200/75',

    ringTrack: 'rgba(199, 210, 254, 0.14)',

    chartDotStroke: '#050511',

  },

  {

    id: 'milky-way',

    name: '銀河の果て',

    scenery: 'galaxy',

    isLight: false,

    unlockLevel: 92,

    bg: 'bg-gradient-to-b from-[#090418] via-[#1E0B36] to-[#0D132A]',

    preview: 'linear-gradient(135deg, #090418 0%, #581C87 48%, #0284C7 100%)',

    card: 'bg-slate-950/55 border-purple-300/20 shadow-2xl shadow-black/75',

    modalCard: 'bg-[#160A2A]/95 border-purple-300/22 shadow-2xl shadow-black/80',

    pill: 'bg-white/[0.08] hover:bg-white/15 border-purple-300/16',

    subPanel: 'bg-black/35',

    activeTab: 'bg-white/20 shadow-sm',

    backdrop: 'bg-black/70',

    text: 'text-purple-50',

    subtext: 'text-purple-200/75',

    ringTrack: 'rgba(233, 213, 255, 0.14)',

    chartDotStroke: '#090418',

  },

  {

    id: 'sanctuary',

    name: '神域の天界',

    scenery: 'sanctuary',

    isLight: false,

    unlockLevel: 100,

    bg: 'bg-gradient-to-b from-[#171209] via-[#2A1F0D] to-[#121324]',

    preview: 'linear-gradient(135deg, #1E1607 0%, #B45309 48%, #FACC15 100%)',

    card: 'bg-slate-950/55 border-amber-300/25 shadow-2xl shadow-black/75',

    modalCard: 'bg-[#1D160B]/95 border-amber-300/25 shadow-2xl shadow-black/80',

    pill: 'bg-white/[0.09] hover:bg-white/15 border-amber-300/20',

    subPanel: 'bg-black/35',

    activeTab: 'bg-amber-400/20 shadow-sm',

    backdrop: 'bg-black/70',

    text: 'text-amber-50',

    subtext: 'text-amber-200/80',

    ringTrack: 'rgba(253, 224, 71, 0.16)',

    chartDotStroke: '#171209',

  },

];



const TIMER_STYLES = [

  { id: 'ring', icon: Circle },

  { id: 'liquid', icon: Waves },

  { id: 'pulse', icon: Disc },

  { id: 'hourglass', icon: Hourglass },

];



const STORAGE_KEY = 'habit_timer_permanent_user_data';

const MAX_TOTAL_MINUTES_STORAGE_KEY = 'habit_timer_max_total_minutes_v1';

const LEGACY_STORAGE_KEYS = [

  'habit_timer_permanent_user_data',

  'habit_timer_characters_history_v3',

  'habit_timer_characters_history_v2',

  'habit_timer_state_v1',

];

const IDB_NAME = 'HabitTimerPermanentDB';

const IDB_STORE = 'user_state_store';

const DATA_CACHE_NAME = 'habit-timer-user-data-backup-v1';

const DATA_CACHE_URL = '/__habit_timer_user_state_backup__.json';



// Helper: Save payload to IndexedDB & CacheStorage for update-proof persistence

const saveRedundantBackup = (payload) => {

  // 1. IndexedDB Mirror

  try {

    if (typeof indexedDB !== 'undefined') {

      const req = indexedDB.open(IDB_NAME, 1);

      req.onupgradeneeded = () => {

        const db = req.result;

        if (!db.objectStoreNames.contains(IDB_STORE)) {

          db.createObjectStore(IDB_STORE);

        }

      };

      req.onsuccess = () => {

        try {

          const db = req.result;

          const tx = db.transaction(IDB_STORE, 'readwrite');

          tx.objectStore(IDB_STORE).put(payload, 'latest');

        } catch (e) {

          // Ignore IDB write errors

        }

      };

    }

  } catch (e) {

    // Ignore IDB errors

  }



  // 2. CacheStorage Mirror (survives iOS Safari <-> PWA transitions & SW updates)

  try {

    if (typeof caches !== 'undefined') {

      caches.open(DATA_CACHE_NAME).then((cache) => {

        const res = new Response(JSON.stringify(payload), {

          headers: { 'Content-Type': 'application/json' },

        });

        cache.put(DATA_CACHE_URL, res);

      }).catch(() => {});

    }

  } catch (e) {

    // Ignore CacheStorage errors

  }

};



// Helper: Load from IndexedDB or CacheStorage if localStorage was ever cleared

const loadRedundantBackup = async () => {

  // Try IndexedDB first

  try {

    if (typeof indexedDB !== 'undefined') {

      const idbData = await new Promise((resolve) => {

        const req = indexedDB.open(IDB_NAME, 1);

        req.onupgradeneeded = () => {

          const db = req.result;

          if (!db.objectStoreNames.contains(IDB_STORE)) {

            db.createObjectStore(IDB_STORE);

          }

        };

        req.onsuccess = () => {

          try {

            const db = req.result;

            const tx = db.transaction(IDB_STORE, 'readonly');

            const getReq = tx.objectStore(IDB_STORE).get('latest');

            getReq.onsuccess = () => resolve(getReq.result || null);

            getReq.onerror = () => resolve(null);

          } catch (e) {

            resolve(null);

          }

        };

        req.onerror = () => resolve(null);

      });

      if (idbData) return idbData;

    }

  } catch (e) {

    // Ignore

  }



  // Fallback to CacheStorage

  try {

    if (typeof caches !== 'undefined') {

      const cache = await caches.open(DATA_CACHE_NAME);

      const match = await cache.match(DATA_CACHE_URL);

      if (match) {

        return await match.json();

      }

    }

  } catch (e) {

    // Ignore

  }



  return null;

};



// ==========================================

// 2. RICH, INTRICATE KAWAII CHARACTER RENDERER & SLIME SPRITE ANIMATOR

// ==========================================



// Global cache-busting version for sprite frame assets

const SPRITE_ASSET_VERSION = '20261101_v11';



// 8-frame Slime Sprite URLs with Base URL

const SLIME_FRAME_URLS = Array.from({ length: 8 }, (_, i) => {

  const base = import.meta.env.BASE_URL || './';

  const cleanBase = base.endsWith('/') ? base : `${base}/`;

  return `${cleanBase}characters/slime/slime_frame_${i}.png?v=${SPRITE_ASSET_VERSION}`;

});



// 8-frame Rabbit Sprite URLs with Base URL

const RABBIT_FRAME_URLS = Array.from({ length: 8 }, (_, i) => {

  const base = import.meta.env.BASE_URL || './';

  const cleanBase = base.endsWith('/') ? base : `${base}/`;

  return `${cleanBase}characters/rabbit/rabbit_frame_${i}.png?v=${SPRITE_ASSET_VERSION}`;

});



// 8-frame Mushroom Sprite URLs with Base URL

const KINOKO_FRAME_URLS = Array.from({ length: 8 }, (_, i) => {

  const base = import.meta.env.BASE_URL || './';

  const cleanBase = base.endsWith('/') ? base : `${base}/`;

  return `${cleanBase}characters/kinoko/kinoko_frame_${i}.png?v=${SPRITE_ASSET_VERSION}`;

});



// 8-frame Ghost Cat Sprite URLs with Base URL

const GHOSTCAT_FRAME_URLS = Array.from({ length: 8 }, (_, i) => {

  const base = import.meta.env.BASE_URL || './';

  const cleanBase = base.endsWith('/') ? base : `${base}/`;

  return `${cleanBase}characters/ghostcat/ghostcat_frame_${i}.png?v=${SPRITE_ASSET_VERSION}`;

});



// 8-frame Octopus Sprite URLs with Base URL

const OCTOPUS_FRAME_URLS = Array.from({ length: 8 }, (_, i) => {

  const base = import.meta.env.BASE_URL || './';

  const cleanBase = base.endsWith('/') ? base : `${base}/`;

  return `${cleanBase}characters/octopus/octopus_frame_${i}.png?v=${SPRITE_ASSET_VERSION}`;

});



// 8-frame Robot Sprite URLs with Base URL

const ROBOT_FRAME_URLS = Array.from({ length: 8 }, (_, i) => {

  const base = import.meta.env.BASE_URL || './';

  const cleanBase = base.endsWith('/') ? base : `${base}/`;

  return `${cleanBase}characters/robot/robot_frame_${i}.png?v=${SPRITE_ASSET_VERSION}`;

});



// 8-frame Mochi King Sprite URLs with Base URL

const MOCHI_FRAME_URLS = Array.from({ length: 8 }, (_, i) => {

  const base = import.meta.env.BASE_URL || './';

  const cleanBase = base.endsWith('/') ? base : `${base}/`;

  return `${cleanBase}characters/mochi/mochi_frame_${i}.png?v=${SPRITE_ASSET_VERSION}`;

});



// 8-frame Shiba Sprite URLs with Base URL

const SHIBA_FRAME_URLS = Array.from({ length: 8 }, (_, i) => {

  const base = import.meta.env.BASE_URL || './';

  const cleanBase = base.endsWith('/') ? base : `${base}/`;

  return `${cleanBase}characters/shiba/shiba_frame_${i}.png?v=${SPRITE_ASSET_VERSION}`;

});



// 8-frame Chiimaru Sprite URLs with Base URL

const CHIIMARU_FRAME_URLS = Array.from({ length: 8 }, (_, i) => {

  const base = import.meta.env.BASE_URL || './';

  const cleanBase = base.endsWith('/') ? base : `${base}/`;

  return `${cleanBase}characters/chiimaru/chiimaru_frame_${i}.png?v=${SPRITE_ASSET_VERSION}`;

});



// 8-frame Zundamon Sprite URLs with Base URL

const ZUNDAMON_FRAME_URLS = Array.from({ length: 8 }, (_, i) => {

  const base = import.meta.env.BASE_URL || './';

  const cleanBase = base.endsWith('/') ? base : `${base}/`;

  return `${cleanBase}characters/zundamon/zundamon_frame_${i}.png?v=${SPRITE_ASSET_VERSION}`;

});



// 8-frame Sun Emperor (Amaterasu) Sprite URLs with Base URL

const SUNEMPEROR_FRAME_URLS = Array.from({ length: 8 }, (_, i) => {

  const base = import.meta.env.BASE_URL || './';

  const cleanBase = base.endsWith('/') ? base : `${base}/`;

  return `${cleanBase}characters/sunemperor/sunemperor_frame_${i}.png?v=${SPRITE_ASSET_VERSION}`;

});



// 8-frame Calico (Mike Miko) Sprite URLs with Base URL

const CALICO_FRAME_URLS = Array.from({ length: 8 }, (_, i) => {

  const base = import.meta.env.BASE_URL || './';

  const cleanBase = base.endsWith('/') ? base : `${base}/`;

  return `${cleanBase}characters/calico/calico_frame_${i}.png?v=${SPRITE_ASSET_VERSION}`;

});



// 8-frame Star Dragon Lunaria (星竜ルナリア) Sprite URLs with Base URL

const DRAGON_FRAME_URLS = Array.from({ length: 8 }, (_, i) => {

  const base = import.meta.env.BASE_URL || './';

  const cleanBase = base.endsWith('/') ? base : `${base}/`;

  return `${cleanBase}characters/dragon/dragon_frame_${i}.png?v=${SPRITE_ASSET_VERSION}`;

});



// 8-frame Milk Princess (みるく姫) Sprite URLs with Base URL

const USAGI_FRAME_URLS = Array.from({ length: 8 }, (_, i) => {

  const base = import.meta.env.BASE_URL || './';

  const cleanBase = base.endsWith('/') ? base : `${base}/`;

  return `${cleanBase}characters/usagi/usagi_frame_${i}.png?v=${SPRITE_ASSET_VERSION}`;

});



// 8-frame Hatsune Miku (初音ミク) Sprite URLs with Base URL

const MIKU_FRAME_URLS = Array.from({ length: 8 }, (_, i) => {

  const base = import.meta.env.BASE_URL || './';

  const cleanBase = base.endsWith('/') ? base : `${base}/`;

  return `${cleanBase}characters/miku/miku_frame_${i}.png?v=${SPRITE_ASSET_VERSION}`;

});



// Preload all 8 frames once on startup to eliminate animation flicker

if (typeof window !== 'undefined') {

  SLIME_FRAME_URLS.forEach((url) => {

    const img = new Image();

    img.src = url;

  });

  RABBIT_FRAME_URLS.forEach((url) => {

    const img = new Image();

    img.src = url;

  });

  KINOKO_FRAME_URLS.forEach((url) => {

    const img = new Image();

    img.src = url;

  });

  GHOSTCAT_FRAME_URLS.forEach((url) => {

    const img = new Image();

    img.src = url;

  });

  OCTOPUS_FRAME_URLS.forEach((url) => {

    const img = new Image();

    img.src = url;

  });

  ROBOT_FRAME_URLS.forEach((url) => {

    const img = new Image();

    img.src = url;

  });

  MOCHI_FRAME_URLS.forEach((url) => {

    const img = new Image();

    img.src = url;

  });

  SHIBA_FRAME_URLS.forEach((url) => {

    const img = new Image();

    img.src = url;

  });

  CHIIMARU_FRAME_URLS.forEach((url) => {

    const img = new Image();

    img.src = url;

  });

  ZUNDAMON_FRAME_URLS.forEach((url) => {

    const img = new Image();

    img.src = url;

  });

  SUNEMPEROR_FRAME_URLS.forEach((url) => {

    const img = new Image();

    img.src = url;

  });

  CALICO_FRAME_URLS.forEach((url) => {

    const img = new Image();

    img.src = url;

  });

  DRAGON_FRAME_URLS.forEach((url) => {

    const img = new Image();

    img.src = url;

  });

  USAGI_FRAME_URLS.forEach((url) => {

    const img = new Image();

    img.src = url;

  });

  MIKU_FRAME_URLS.forEach((url) => {

    const img = new Image();

    img.src = url;

  });

}



// ==========================================

// RICH SPRITE CHOREOGRAPHY MOTION ENGINE

// ==========================================

const SPRITE_MOTION_ROUTINES = {

  // 1. 大ジャンプ: Dynamic high leap with airy float & landing rebound

  big_jump: [

    { frame: 1, duration: 150 },

    { frame: 2, duration: 120 },

    { frame: 3, duration: 140 },

    { frame: 4, duration: 180 },

    { frame: 5, duration: 160 },

    { frame: 6, duration: 140 },

    { frame: 7, duration: 150 },

  ],

  // 2. ちょこん小ホップ: Playful quick double hop on the spot

  double_hop: [

    { frame: 1, duration: 90 },

    { frame: 6, duration: 140 },

    { frame: 1, duration: 90 },

    { frame: 6, duration: 150 },

    { frame: 7, duration: 130 },

  ],

  // 3. ぐ〜んと背伸びストレッチ: Deep breath reaching hands/ears up high

  stretch: [

    { frame: 1, duration: 220 },

    { frame: 2, duration: 520 },

    { frame: 7, duration: 180 },

  ],

  // 4. ぺたんこ休憩: Pancake flop rest flat on belly, then dusting off

  flop_rest: [

    { frame: 1, duration: 140 },

    { frame: 5, duration: 620 },

    { frame: 7, duration: 200 },

  ],

  // 5. バンザイ大喜び: Joyous victory cheer with arms aloft

  cheer: [

    { frame: 1, duration: 110 },

    { frame: 2, duration: 200 },

    { frame: 4, duration: 240 },

    { frame: 2, duration: 180 },

    { frame: 6, duration: 140 },

    { frame: 7, duration: 140 },

  ],

  // 6. ぺこりお辞儀: Respectful cute polite bow / nod

  bow: [

    { frame: 1, duration: 170 },

    { frame: 5, duration: 240 },

    { frame: 1, duration: 150 },

  ],

};



function UniversalSpriteAvatar({

  frames,

  alt = 'キャラクター',

  scale = 1.0,

  size = 68,

  isRunning = false,

  isWalking = false,

  isBouncing = false,

}) {

  const [frameIndex, setFrameIndex] = useState(0);



  useEffect(() => {

    let timerId = null;

    let cycleTimeoutId = null;

    let cancelled = false;



    const playSequence = (steps, onFinish) => {

      let idx = 0;

      const next = () => {

        if (cancelled) return;

        if (idx < steps.length) {

          const step = steps[idx];

          setFrameIndex(step.frame);

          idx++;

          timerId = setTimeout(next, step.duration);

        } else {

          setFrameIndex(0);

          onFinish?.();

        }

      };

      next();

    };



    // 1. Click / Tap reaction (isBouncing) -> Instant celebration cheer

    if (isBouncing) {

      playSequence(SPRITE_MOTION_ROUTINES.cheer);

      return () => {

        cancelled = true;

        if (timerId) clearTimeout(timerId);

      };

    }



    // 2. Walking / Roaming (waddle footsteps: alternating frame 0 and frame 7)

    if (isWalking) {

      let stepToggle = false;

      const walkStep = () => {

        if (cancelled) return;

        setFrameIndex(stepToggle ? 7 : 0);

        stepToggle = !stepToggle;

        timerId = setTimeout(walkStep, 180);

      };

      walkStep();

      return () => {

        cancelled = true;

        if (timerId) clearTimeout(timerId);

      };

    }



    // 3. Focus timer is active (isRunning) -> Cycles through varied encouraging routines

    if (isRunning) {

      const runningRoutines = ['big_jump', 'double_hop', 'cheer', 'stretch'];

      let routineIndex = 0;



      const runNextAction = () => {

        if (cancelled) return;

        const routineName = runningRoutines[routineIndex % runningRoutines.length];

        routineIndex++;

        const routine = SPRITE_MOTION_ROUTINES[routineName] || SPRITE_MOTION_ROUTINES.big_jump;



        playSequence(routine, () => {

          if (cancelled) return;

          // Natural resting breath on frame 0 between actions

          cycleTimeoutId = setTimeout(runNextAction, 540);

        });

      };



      runNextAction();

      return () => {

        cancelled = true;

        if (timerId) clearTimeout(timerId);

        if (cycleTimeoutId) clearTimeout(cycleTimeoutId);

      };

    }



    // 4. Idle state (ambient relaxation & varied cute actions every ~3s)

    const runIdleCycle = () => {

      if (cancelled) return;

      const delayBeforeAction = 2600 + Math.random() * 1600;



      cycleTimeoutId = setTimeout(() => {

        if (cancelled) return;

        const rand = Math.random();

        let actionName = 'double_hop';

        if (rand < 0.35) {

          actionName = 'double_hop'; // 35% cute hops

        } else if (rand < 0.60) {

          actionName = 'stretch';    // 25% morning stretch

        } else if (rand < 0.80) {

          actionName = 'big_jump';   // 20% high jump

        } else if (rand < 0.92) {

          actionName = 'flop_rest';  // 12% pancake flop

        } else {

          actionName = 'bow';        // 8% polite bow

        }



        const routine = SPRITE_MOTION_ROUTINES[actionName];

        playSequence(routine, () => {

          if (!cancelled) {

            runIdleCycle();

          }

        });

      }, delayBeforeAction);

    };



    runIdleCycle();



    return () => {

      cancelled = true;

      if (timerId) clearTimeout(timerId);

      if (cycleTimeoutId) clearTimeout(cycleTimeoutId);

    };

  }, [isRunning, isWalking, isBouncing]);



  return (

    <motion.div

      style={{

        width: `${size}px`,

        height: `${size * 1.14}px`,

        transformOrigin: '50% 90%',

      }}

      className="relative flex items-center justify-center select-none pointer-events-none"

      animate={

        isWalking

          ? { rotate: [-2.5, 2.5, -2.5] }

          : isRunning

          ? { scale: [1, 1.03, 1] }

          : { scale: [1, 1.02, 1] }

      }

      transition={{

        duration: isWalking ? 0.36 : isRunning ? 1.8 : 2.5,

        repeat: Infinity,

        ease: 'easeInOut',

      }}

    >

      <img

        src={frames[frameIndex] || frames[0]}

        alt={alt}

        className="w-full h-full object-contain filter drop-shadow-md pointer-events-none select-none transition-none"

        loading="eager"

        decoding="sync"

        style={{

          imageRendering: 'auto',

          transform: scale !== 1.0 ? `scale(${scale}) translateZ(0)` : 'translateZ(0)',

          transformOrigin: '50% 90%',

        }}

      />

    </motion.div>

  );

}



function SlimeSpriteAvatar(props) {

  return <UniversalSpriteAvatar frames={SLIME_FRAME_URLS} alt="ぷるるん王" scale={1.08} {...props} />;

}

function RabbitSpriteAvatar(props) {

  return <UniversalSpriteAvatar frames={RABBIT_FRAME_URLS} alt="ほしうさ" scale={1.05} {...props} />;

}

function MushroomSpriteAvatar(props) {

  return <UniversalSpriteAvatar frames={KINOKO_FRAME_URLS} alt="きのっぴ" scale={1.06} {...props} />;

}

function GhostCatSpriteAvatar(props) {

  return <UniversalSpriteAvatar frames={GHOSTCAT_FRAME_URLS} alt="ぽわにゃん" scale={1.12} {...props} />;

}

function OctopusSpriteAvatar(props) {

  return <UniversalSpriteAvatar frames={OCTOPUS_FRAME_URLS} alt="タコポン" scale={1.10} {...props} />;

}

function RobotSpriteAvatar(props) {

  return <UniversalSpriteAvatar frames={ROBOT_FRAME_URLS} alt="ネジまる" scale={1.12} {...props} />;

}

function MochiSpriteAvatar(props) {

  return <UniversalSpriteAvatar frames={MOCHI_FRAME_URLS} alt="もちまる王" scale={1.06} {...props} />;

}

function ShibaSpriteAvatar(props) {

  return <UniversalSpriteAvatar frames={SHIBA_FRAME_URLS} alt="こむぎ丸" scale={1.18} {...props} />;

}

function ChiimaruSpriteAvatar(props) {

  return <UniversalSpriteAvatar frames={CHIIMARU_FRAME_URLS} alt="ちいまる" scale={1.0} {...props} />;

}

function ZundamonSpriteAvatar(props) {

  return <UniversalSpriteAvatar frames={ZUNDAMON_FRAME_URLS} alt="ずんだもん" scale={1.0} {...props} />;

}

function SunEmperorSpriteAvatar(props) {

  return <UniversalSpriteAvatar frames={SUNEMPEROR_FRAME_URLS} alt="太陽神アマテラス丸" scale={1.0} {...props} />;

}

function CalicoSpriteAvatar(props) {

  return <UniversalSpriteAvatar frames={CALICO_FRAME_URLS} alt="みけ巫女" scale={1.0} {...props} />;

}

function DragonSpriteAvatar(props) {

  return <UniversalSpriteAvatar frames={DRAGON_FRAME_URLS} alt="星竜ルナリア" scale={1.0} {...props} />;

}

function UsagiSpriteAvatar(props) {

  return <UniversalSpriteAvatar frames={USAGI_FRAME_URLS} alt="みるく姫" scale={1.0} {...props} />;

}

function MikuSpriteAvatar(props) {

  return <UniversalSpriteAvatar frames={MIKU_FRAME_URLS} alt="初音ミク" scale={1.0} {...props} />;

}



function CuteCharacterAvatar({ charId, size = 68, isRunning = false, isWalking = false, isBouncing = false }) {

  if (charId === 'miku') {

    return <MikuSpriteAvatar size={size} isRunning={isRunning} isWalking={isWalking} isBouncing={isBouncing} />;

  }

  if (charId === 'usagi') {

    return <UsagiSpriteAvatar size={size} isRunning={isRunning} isWalking={isWalking} isBouncing={isBouncing} />;

  }

  if (charId === 'dragon') {

    return <DragonSpriteAvatar size={size} isRunning={isRunning} isWalking={isWalking} isBouncing={isBouncing} />;

  }

  if (charId === 'calico') {

    return <CalicoSpriteAvatar size={size} isRunning={isRunning} isWalking={isWalking} isBouncing={isBouncing} />;

  }

  if (charId === 'mochi') {

    return <MochiSpriteAvatar size={size} isRunning={isRunning} isWalking={isWalking} isBouncing={isBouncing} />;

  }

  if (charId === 'chiimaru') {

    return <ChiimaruSpriteAvatar size={size} isRunning={isRunning} isWalking={isWalking} isBouncing={isBouncing} />;

  }

  if (charId === 'shiba') {

    return <ShibaSpriteAvatar size={size} isRunning={isRunning} isWalking={isWalking} isBouncing={isBouncing} />;

  }

  if (charId === 'slime') {

    return <SlimeSpriteAvatar size={size} isRunning={isRunning} isWalking={isWalking} isBouncing={isBouncing} />;

  }

  if (charId === 'hoshiusa') {

    return <RabbitSpriteAvatar size={size} isRunning={isRunning} isWalking={isWalking} isBouncing={isBouncing} />;

  }

  if (charId === 'kinoko') {

    return <MushroomSpriteAvatar size={size} isRunning={isRunning} isWalking={isWalking} isBouncing={isBouncing} />;

  }

  if (charId === 'ghostcat') {

    return <GhostCatSpriteAvatar size={size} isRunning={isRunning} isWalking={isWalking} isBouncing={isBouncing} />;

  }

  if (charId === 'octopus') {

    return <OctopusSpriteAvatar size={size} isRunning={isRunning} isWalking={isWalking} isBouncing={isBouncing} />;

  }

  if (charId === 'robot') {

    return <RobotSpriteAvatar size={size} isRunning={isRunning} isWalking={isWalking} isBouncing={isBouncing} />;

  }

  if (charId === 'zundamon') {

    return <ZundamonSpriteAvatar size={size} isRunning={isRunning} isWalking={isWalking} isBouncing={isBouncing} />;

  }

  if (charId === 'sunemperor') {

    return <SunEmperorSpriteAvatar size={size} isRunning={isRunning} isWalking={isWalking} isBouncing={isBouncing} />;

  }



  const uid = useMemo(() => `char-${charId}-${Math.random().toString(36).slice(2, 7)}`, [charId]);

  const [blink, setBlink] = useState(false);



  // Natural Eye Blinking Effect every 2.8 - 4.5s

  useEffect(() => {

    let timeoutId;

    const scheduleBlink = () => {

      const nextDelay = 2400 + Math.random() * 2400;

      timeoutId = setTimeout(() => {

        setBlink(true);

        setTimeout(() => {

          setBlink(false);

          scheduleBlink();

        }, 140);

      }, nextDelay);

    };

    scheduleBlink();

    return () => clearTimeout(timeoutId);

  }, []);



  const renderEyes = (leftX, rightX, y, irisColor1, irisColor2) => {

    if (blink) {

      return (

        <g stroke="#271824" strokeWidth="2.8" strokeLinecap="round" fill="none">

          <path d={`M${leftX - 5} ${y} Q${leftX} ${y + 4} ${leftX + 5} ${y}`} />

          <path d={`M${rightX - 5} ${y} Q${rightX} ${y + 4} ${rightX + 5} ${y}`} />

        </g>

      );

    }

    return (

      <g>

        <defs>

          <linearGradient id={`${uid}-iris`} x1="0" y1="0" x2="0" y2="1">

            <stop offset="0%" stopColor="#1E1024" />

            <stop offset="55%" stopColor={irisColor1} />

            <stop offset="100%" stopColor={irisColor2} />

          </linearGradient>

        </defs>

        {/* Left Eye */}

        <ellipse cx={leftX} cy={y} rx="5.6" ry="6.4" fill={`url(#${uid}-iris)`} />

        <ellipse cx={leftX} cy={y + 2.2} rx="4" ry="2.8" fill={irisColor2} opacity="0.55" />

        <circle cx={leftX - 1.8} cy={y - 2.2} r="2.2" fill="#FFFFFF" />

        <circle cx={leftX + 2} cy={y + 2} r="1.1" fill="#FFFFFF" opacity="0.9" />

        {/* Right Eye */}

        <ellipse cx={rightX} cy={y} rx="5.6" ry="6.4" fill={`url(#${uid}-iris)`} />

        <ellipse cx={rightX} cy={y + 2.2} rx="4" ry="2.8" fill={irisColor2} opacity="0.55" />

        <circle cx={rightX - 1.8} cy={y - 2.2} r="2.2" fill="#FFFFFF" />

        <circle cx={rightX + 2} cy={y + 2} r="1.1" fill="#FFFFFF" opacity="0.9" />

      </g>

    );

  };



  return (

    <motion.div

      animate={

        isBouncing

          ? {

              y: [0, -14, 0],

              scaleX: [1, 1.08, 0.95, 1],

              scaleY: [1, 0.92, 1.05, 1],

            }

          : isWalking

          ? {

              rotate: [-3, 3, -3],

              y: [0, -2, 0],

            }

          : isRunning

          ? {

              y: [0, -6, 0, -3.5, 0],

              rotate: [-2.5, 2.5, -2, 2, -2.5],

              scaleX: [1, 1.03, 0.98, 1.02, 1],

              scaleY: [1, 0.97, 1.02, 0.98, 1],

            }

          : {

              y: [0, -3, 0],

              scaleX: [1, 1.02, 1],

              scaleY: [1, 0.98, 1],

            }

      }

      transition={{

        duration: isBouncing ? 0.42 : isWalking ? 0.36 : isRunning ? 1.85 : 2.8,

        repeat: isBouncing ? 1 : Infinity,

        ease: 'easeInOut',

      }}

      style={{

        width: `${size}px`,

        height: `${size * 1.14}px`,

        transformOrigin: '50% 90%',

      }}

      className="relative flex items-center justify-center select-none pointer-events-none"

    >

      <svg

        viewBox="0 0 120 120"

        className="w-full h-full overflow-visible"

        style={{

          transform: 'scale(1.18)',

          transformOrigin: '50% 90%',

        }}

      >

        <defs>

          <radialGradient id={`${uid}-blush`} cx="50%" cy="50%" r="50%">

            <stop offset="0%" stopColor="#FF6B9E" stopOpacity="0.75" />

            <stop offset="100%" stopColor="#FF6B9E" stopOpacity="0" />

          </radialGradient>

          <linearGradient id={`${uid}-gold`} x1="0" y1="0" x2="1" y2="1">

            <stop offset="0%" stopColor="#FFF085" />

            <stop offset="50%" stopColor="#FACC15" />

            <stop offset="100%" stopColor="#CA8A04" />

          </linearGradient>

          <filter id={`${uid}-shadow`} x="-20%" y="-20%" width="140%" height="140%">

            <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="rgba(0,0,0,0.28)" />

          </filter>

        </defs>



        {/* Ground Shadow */}

        <motion.ellipse

          cx="60"

          cy="108"

          rx="30"

          ry="7"

          fill="rgba(0,0,0,0.28)"

          animate={isRunning ? { rx: [30, 22, 30], opacity: [0.3, 0.16, 0.3] } : {}}

          transition={{ duration: 0.78, repeat: Infinity }}

        />



        {/* =======================================

            1. MOCHI KING (もちまる王)

            ======================================= */}

        {charId === 'mochi' && (

          <g filter={`url(#${uid}-shadow)`}>

            <defs>

              <radialGradient id={`${uid}-mochi-body`} cx="45%" cy="35%" r="65%">

                <stop offset="0%" stopColor="#FFFFFF" />

                <stop offset="68%" stopColor="#FFF1F5" />

                <stop offset="100%" stopColor="#FBCFE8" />

              </radialGradient>

            </defs>



            {/* Floating Royal Sakura Petals & Golden Stardust */}

            <motion.g

              animate={{ y: [-3, 3, -3], opacity: [0.75, 1, 0.75] }}

              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}

            >

              {/* Sakura Petal 1 */}

              <path d="M12 40 C8 32 18 28 20 36 C16 38 14 42 12 40 Z" fill="#F472B6" opacity="0.85" />

              <circle cx="16" cy="34" r="1.2" fill="#FFFFFF" />

              {/* Sakura Petal 2 */}

              <path d="M104 36 C100 28 112 24 114 32 C110 34 108 38 104 36 Z" fill="#FB7185" opacity="0.85" />

              {/* Golden Stardust Sparkles */}

              <polygon points="18,52 19,48 20,52 24,53 20,54 19,58 18,54 14,53" fill="#FDE047" opacity="0.9" />

              <polygon points="102,56 103,53 104,56 107,57 104,58 103,61 102,58 99,57" fill="#FDE047" opacity="0.9" />

              <circle cx="15" cy="68" r="1.8" fill="#FCE7F3" opacity="0.8" />

              <circle cx="106" cy="72" r="1.8" fill="#FCE7F3" opacity="0.8" />

            </motion.g>



            {/* Little Feet */}

            <motion.ellipse

              cx="43"

              cy="99"

              rx="8.5"

              ry="5.5"

              fill="#F9A8D4"

              animate={isRunning ? { y: [0, -6, 0] } : {}}

              transition={{ duration: 0.39, repeat: Infinity }}

            />

            <motion.ellipse

              cx="77"

              cy="99"

              rx="8.5"

              ry="5.5"

              fill="#F9A8D4"

              animate={isRunning ? { y: [-6, 0, -6] } : {}}

              transition={{ duration: 0.39, repeat: Infinity }}

            />



            {/* Royal Velvet Cape (Back) with Golden Trim */}

            <path

              d="M20 66 C14 86 24 100 60 100 C96 100 106 86 100 66 Z"

              fill="#E11D48"

              stroke="#9F1239"

              strokeWidth="2.5"

            />

            {/* White Fur Trim on Cape Hem */}

            <path

              d="M22 96 Q34 102 60 102 Q86 102 98 96"

              fill="none"

              stroke="#FFF1F2"

              strokeWidth="4"

              strokeLinecap="round"

            />



            {/* Squishy Mochi Body */}

            <path

              d="M22 68 C20 34 100 34 98 68 C100 90 86 98 60 98 C34 98 20 90 22 68 Z"

              fill={`url(#${uid}-mochi-body)`}

              stroke="#F9A8D4"

              strokeWidth="2.5"

            />

            {/* Glossy Head Highlight */}

            <ellipse cx="44" cy="48" rx="14" ry="6" transform="rotate(-12 44 48)" fill="#FFFFFF" opacity="0.8" />



            {/* Royal Ermine Collar (White Fluffy Fur with Black Spots) */}

            <path

              d="M34 68 C34 82 86 82 86 68 C76 74 44 74 34 68 Z"

              fill="#FFFFFF"

              stroke="#F472B6"

              strokeWidth="1.5"

            />

            <circle cx="48" cy="74" r="1.3" fill="#1E1B4B" />

            <circle cx="60" cy="76" r="1.3" fill="#1E1B4B" />

            <circle cx="72" cy="74" r="1.3" fill="#1E1B4B" />

            {/* Golden Brooch Gem on Chest */}

            <circle cx="60" cy="70" r="3.2" fill="#FDE047" stroke="#B45309" strokeWidth="1.2" />

            <circle cx="60" cy="70" r="1.8" fill="#F43F5E" />



            {/* Cute Waving Hands & Golden Star Scepter */}

            <motion.ellipse

              cx="22"

              cy="73"

              rx="7.5"

              ry="6"

              fill="#FFF1F5"

              stroke="#F9A8D4"

              strokeWidth="2"

              animate={isRunning ? { rotate: [-25, 25, -25], y: [-3, 3, -3] } : {}}

              transition={{ duration: 0.5, repeat: Infinity }}

            />

            {/* Right Hand holding Star Scepter */}

            <motion.g

              animate={isRunning ? { rotate: [15, -15, 15], y: [2, -2, 2] } : { rotate: [0, 4, 0] }}

              transition={{ duration: isRunning ? 0.5 : 2, repeat: Infinity }}

              style={{ transformOrigin: '98px 73px' }}

            >

              {/* Scepter Gold Shaft */}

              <line x1="98" y1="84" x2="108" y2="48" stroke="#F59E0B" strokeWidth="2.4" strokeLinecap="round" />

              {/* Scepter Star Head */}

              <g transform="translate(108, 48)">

                <polygon

                  points="0,-8 2.5,-2.5 8,0 2.5,2.5 0,8 -2.5,2.5 -8,0 -2.5,-2.5"

                  fill="#FDE047"

                  stroke="#B45309"

                  strokeWidth="1.2"

                />

                <circle cx="0" cy="0" r="2" fill="#EC4899" />

              </g>

              <ellipse

                cx="98"

                cy="73"

                rx="7.5"

                ry="6"

                fill="#FFF1F5"

                stroke="#F9A8D4"

                strokeWidth="2"

              />

            </motion.g>



            {/* Soft Blush */}

            <circle cx="35" cy="72" r="9.5" fill={`url(#${uid}-blush)`} />

            <circle cx="85" cy="72" r="9.5" fill={`url(#${uid}-blush)`} />



            {/* Sparkling Eyes */}

            {renderEyes(45, 75, 65, '#9D174D', '#F472B6')}



            {/* Happy Open Cat-like Mouth */}

            <path d="M55 72 Q60 79 65 72 Z" fill="#FB7185" />

            <path

              d="M53 71 Q56.5 75 60 71 Q63.5 75 67 71"

              fill="none"

              stroke="#4C0519"

              strokeWidth="2.5"

              strokeLinecap="round"

            />



            {/* Grand Golden Crown with Jewels */}

            <g transform="translate(0, -3)">

              <polygon

                points="44,38 40,20 52,29 60,14 68,29 80,20 76,38"

                fill={`url(#${uid}-gold)`}

                stroke="#B45309"

                strokeWidth="2"

                strokeLinejoin="round"

              />

              {/* Crown Base Band with Pearl Dots */}

              <path d="M44 38 Q60 41 76 38" stroke="#B45309" strokeWidth="2" fill="none" />

              <circle cx="50" cy="38" r="1.5" fill="#FFFFFF" />

              <circle cx="60" cy="39" r="1.5" fill="#FFFFFF" />

              <circle cx="70" cy="38" r="1.5" fill="#FFFFFF" />

              {/* Crown Jewels (Ruby, Emerald, Sapphire) */}

              <circle cx="60" cy="14" r="3.6" fill="#F43F5E" stroke="#9F1239" strokeWidth="1" />

              <circle cx="59.2" cy="13" r="1" fill="#FFFFFF" />

              <circle cx="40" cy="20" r="2.8" fill="#38BDF8" stroke="#0284C7" strokeWidth="1" />

              <circle cx="80" cy="20" r="2.8" fill="#10B981" stroke="#047857" strokeWidth="1" />

            </g>

          </g>

        )}



        {/* =======================================

            2. SHIBA INU (こむぎ丸)

            ======================================= */}

        {charId === 'shiba' && (

          <g filter={`url(#${uid}-shadow)`}>

            <defs>

              <linearGradient id={`${uid}-shiba-fur`} x1="0" y1="0" x2="0" y2="1">

                <stop offset="0%" stopColor="#FBBF24" />

                <stop offset="65%" stopColor="#F59E0B" />

                <stop offset="100%" stopColor="#D97706" />

              </linearGradient>

            </defs>



            {/* Wagging Curled Shiba Tail */}

            <motion.path

              d="M84 82 C104 78 108 55 92 52 C84 51 83 62 90 65"

              fill="none"

              stroke="#F59E0B"

              strokeWidth="11"

              strokeLinecap="round"

              animate={{ rotate: isRunning ? [-18, 22, -18] : [-6, 8, -6] }}

              transition={{ duration: isRunning ? 0.35 : 1.2, repeat: Infinity }}

              style={{ transformOrigin: '84px 82px' }}

            />

            <motion.path

              d="M84 82 C104 78 108 55 92 52"

              fill="none"

              stroke="#FFFBEB"

              strokeWidth="5"

              strokeLinecap="round"

              animate={{ rotate: isRunning ? [-18, 22, -18] : [-6, 8, -6] }}

              transition={{ duration: isRunning ? 0.35 : 1.2, repeat: Infinity }}

              style={{ transformOrigin: '84px 82px' }}

            />



            {/* Chubby Lower Body & Paws */}

            <rect x="33" y="74" width="54" height="27" rx="14" fill={`url(#${uid}-shiba-fur)`} />

            <ellipse cx="60" cy="88" rx="18" ry="12" fill="#FFFBEB" />

            <ellipse cx="43" cy="101" rx="8" ry="5" fill="#FFFBEB" stroke="#D97706" strokeWidth="1.8" />

            <ellipse cx="77" cy="101" rx="8" ry="5" fill="#FFFBEB" stroke="#D97706" strokeWidth="1.8" />



            {/* Fluffy Ears */}

            <motion.g

              animate={isRunning ? { rotate: [-6, 4, -6] } : {}}

              transition={{ duration: 0.45, repeat: Infinity }}

              style={{ transformOrigin: '36px 38px' }}

            >

              <path d="M25 46 L17 15 L45 29 Z" fill={`url(#${uid}-shiba-fur)`} stroke="#B45309" strokeWidth="2.2" strokeLinejoin="round" />

              <polygon points="27,41 22,21 39,30" fill="#FDE68A" />

            </motion.g>

            <motion.g

              animate={isRunning ? { rotate: [6, -4, 6] } : {}}

              transition={{ duration: 0.45, repeat: Infinity }}

              style={{ transformOrigin: '84px 38px' }}

            >

              <path d="M95 46 L103 15 L75 29 Z" fill={`url(#${uid}-shiba-fur)`} stroke="#B45309" strokeWidth="2.2" strokeLinejoin="round" />

              <polygon points="93,41 98,21 81,30" fill="#FDE68A" />

            </motion.g>



            {/* Head */}

            <rect x="22" y="26" width="76" height="58" rx="29" fill={`url(#${uid}-shiba-fur)`} stroke="#B45309" strokeWidth="2" />



            {/* Cream Shiba Urajiro Mask */}

            <path

              d="M25 58 C26 44 44 44 60 55 C76 44 94 44 95 58 C96 75 82 83 60 83 C38 83 24 75 25 58 Z"

              fill="#FFFBEB"

            />



            {/* Cream Maro Eyebrows */}

            <ellipse cx="44" cy="41" rx="5.5" ry="3.2" transform="rotate(-8 44 41)" fill="#FFFBEB" />

            <ellipse cx="76" cy="41" rx="5.5" ry="3.2" transform="rotate(8 76 41)" fill="#FFFBEB" />



            {/* Blush */}

            <circle cx="34" cy="64" r="8.5" fill={`url(#${uid}-blush)`} />

            <circle cx="86" cy="64" r="8.5" fill={`url(#${uid}-blush)`} />



            {/* Sparkling Brown Eyes */}

            {renderEyes(44, 76, 53, '#78350F', '#F59E0B')}



            {/* Cute Snout & Happy Tongue */}

            <ellipse cx="60" cy="60" rx="5" ry="3.6" fill="#271824" />

            <ellipse cx="58.5" cy="59" rx="1.8" ry="1" fill="#FFFFFF" opacity="0.6" />

            <path d="M55 66 Q60 76 65 66 Z" fill="#FB7185" stroke="#BE123C" strokeWidth="1.5" />

            <path

              d="M51 64 Q55.5 69 60 64 Q64.5 69 69 64"

              fill="none"

              stroke="#271824"

              strokeWidth="2.5"

              strokeLinecap="round"

            />



            {/* Emerald Bandana & Golden Bell */}

            <path d="M31 79 Q60 90 89 79 L83 88 Q60 96 37 88 Z" fill="#10B981" stroke="#047857" strokeWidth="1.8" />

            <circle cx="60" cy="88" r="5.5" fill={`url(#${uid}-gold)`} stroke="#B45309" strokeWidth="1.6" />

            <circle cx="60" cy="89.5" r="1.5" fill="#78350F" />

          </g>

        )}



        {/* =======================================

            3. CALICO NEKO (みけ巫女)

            ======================================= */}

        {charId === 'calico' && (

          <g filter={`url(#${uid}-shadow)`}>

            {/* Floating Sacred Shrine Petals & Gold Sparkles */}

            <motion.g

              animate={{ y: [-3, 3, -3], opacity: [0.75, 1, 0.75] }}

              transition={{ duration: 2.3, repeat: Infinity, ease: 'easeInOut' }}

            >

              <path d="M14 42 C10 34 20 30 22 38 C18 40 16 44 14 42 Z" fill="#FB7185" opacity="0.85" />

              <polygon points="104,46 105,43 106,46 109,47 106,48 105,51 104,48 101,47" fill="#FDE047" opacity="0.9" />

              <polygon points="16,62 17,59 18,62 21,63 18,64 17,67 16,64 13,63" fill="#FDE047" opacity="0.85" />

              <circle cx="106" cy="68" r="1.8" fill="#FCE7F3" opacity="0.85" />

            </motion.g>



            {/* Twin Tails / Necomata Ribbon Tail */}

            <motion.path

              d="M84 85 C106 82 110 56 96 46"

              fill="none"

              stroke="#FB923C"

              strokeWidth="9"

              strokeLinecap="round"

              animate={{ rotate: isRunning ? [-15, 20, -15] : [-5, 7, -5] }}

              transition={{ duration: isRunning ? 0.45 : 1.6, repeat: Infinity }}

              style={{ transformOrigin: '84px 85px' }}

            />

            {/* Tail Tip Calico Dark Patch */}

            <circle cx="98" cy="48" r="4.5" fill="#334155" />



            {/* Body with Sacred Red Miko Hakama & White Chihaya Wings */}

            {/* White Chihaya Sleeves on sides */}

            <path d="M22 74 C16 82 20 96 32 94 C32 84 32 76 22 74 Z" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.8" />

            <path d="M98 74 C104 82 100 96 88 94 C88 84 88 76 98 74 Z" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.8" />



            {/* Red Hakama Skirt */}

            <path d="M34 74 L86 74 L90 100 L30 100 Z" fill="#E11D48" stroke="#9F1239" strokeWidth="2" strokeLinejoin="round" />

            {/* White Kimono Chest Insert */}

            <path d="M42 74 L78 74 L74 88 L46 88 Z" fill="#FFFFFF" />

            <ellipse cx="44" cy="101" rx="7.5" ry="4.5" fill="#FFFBEB" stroke="#D97706" strokeWidth="1.5" />

            <ellipse cx="76" cy="101" rx="7.5" ry="4.5" fill="#FFFBEB" stroke="#D97706" strokeWidth="1.5" />



            {/* Right Hand Holding Shinto Kagura Bell (神楽鈴) with Streamers */}

            <motion.g

              animate={isRunning ? { rotate: [-18, 18, -18], y: [-2, 2, -2] } : { rotate: [-4, 6, -4] }}

              transition={{ duration: isRunning ? 0.45 : 1.8, repeat: Infinity }}

              style={{ transformOrigin: '24px 76px' }}

            >

              {/* Hand Paw */}

              <circle cx="24" cy="76" r="6" fill="#FFFDF9" stroke="#E2E8F0" strokeWidth="1.5" />

              {/* Wooden Bell Handle */}

              <line x1="24" y1="76" x2="14" y2="52" stroke="#78350F" strokeWidth="2.4" strokeLinecap="round" />

              {/* Three Tier Golden Bells */}

              <circle cx="14" cy="50" r="3.8" fill={`url(#${uid}-gold)`} stroke="#B45309" strokeWidth="1" />

              <circle cx="11" cy="44" r="3.2" fill={`url(#${uid}-gold)`} stroke="#B45309" strokeWidth="0.8" />

              <circle cx="17" cy="44" r="3.2" fill={`url(#${uid}-gold)`} stroke="#B45309" strokeWidth="0.8" />

              <circle cx="14" cy="38" r="2.8" fill={`url(#${uid}-gold)`} stroke="#B45309" strokeWidth="0.8" />

              {/* Five-color Streamers (Red, Green, Yellow) */}

              <path d="M14 53 Q8 62 10 74" fill="none" stroke="#EF4444" strokeWidth="1.6" strokeLinecap="round" />

              <path d="M14 53 Q14 64 16 76" fill="none" stroke="#10B981" strokeWidth="1.6" strokeLinecap="round" />

              <path d="M14 53 Q18 63 22 73" fill="none" stroke="#FBBF24" strokeWidth="1.6" strokeLinecap="round" />

            </motion.g>



            {/* Cat Ears with Tiny Bell Ribbon */}

            <path d="M24 47 L16 14 L46 28 Z" fill="#FB923C" stroke="#C2410C" strokeWidth="2" strokeLinejoin="round" />

            <polygon points="26,42 21,21 40,30" fill="#FDA4AF" />

            <path d="M96 47 L104 14 L74 28 Z" fill="#334155" stroke="#1E293B" strokeWidth="2" strokeLinejoin="round" />

            <polygon points="94,42 99,21 80,30" fill="#FDA4AF" />



            {/* Head */}

            <rect x="22" y="25" width="76" height="56" rx="28" fill="#FFFDF9" stroke="#E2E8F0" strokeWidth="2" />



            {/* Calico Patches */}

            <path d="M22 48 Q42 50 45 25 L34 25 Q22 30 22 48 Z" fill="#FB923C" />

            <path d="M98 50 Q78 52 75 25 L86 25 Q98 30 98 50 Z" fill="#334155" />



            {/* Shinto Sakura Floral Headpiece with Tassel */}

            <g transform="translate(82, 27)">

              <circle cx="0" cy="-5" r="4.2" fill="#FB7185" />

              <circle cx="5" cy="0" r="4.2" fill="#FB7185" />

              <circle cx="0" cy="5" r="4.2" fill="#FB7185" />

              <circle cx="-5" cy="0" r="4.2" fill="#FB7185" />

              <circle cx="0" cy="0" r="3.2" fill="#FDE047" stroke="#B45309" strokeWidth="0.8" />

              {/* Hanging Red Tassel Cord */}

              <path d="M0 6 Q2 12 0 16" fill="none" stroke="#E11D48" strokeWidth="1.6" strokeLinecap="round" />

              <circle cx="0" cy="17" r="1.5" fill="#FDE047" />

            </g>



            {/* Whiskers */}

            <g stroke="#94A3B8" strokeWidth="2" strokeLinecap="round">

              <line x1="12" y1="56" x2="26" y2="58" />

              <line x1="11" y1="63" x2="26" y2="63" />

              <line x1="108" y1="56" x2="94" y2="58" />

              <line x1="109" y1="63" x2="94" y2="63" />

            </g>



            {/* Blush & Sparkling Amber-Green Eyes */}

            <circle cx="34" cy="63" r="8.5" fill={`url(#${uid}-blush)`} />

            <circle cx="86" cy="63" r="8.5" fill={`url(#${uid}-blush)`} />

            {renderEyes(44, 76, 54, '#065F46', '#34D399')}



            {/* Cute Pink Nose & Fang */}

            <polygon points="57,59 63,59 60,63" fill="#F472B6" />

            <path

              d="M51 65 Q55.5 70 60 64 Q64.5 70 69 65"

              fill="none"

              stroke="#334155"

              strokeWidth="2.4"

              strokeLinecap="round"

            />

            <polygon points="64,66 67,66 65.5,70" fill="#FFFFFF" />



            {/* Sacred Shimenawa Rope Collar with Golden Giant Bell & Red Tassels */}

            {/* Shimenawa Twisted Straw Collar */}

            <path d="M38 74 Q60 84 82 74" fill="none" stroke="#D97706" strokeWidth="3" strokeLinecap="round" />

            <path d="M38 74 Q60 84 82 74" fill="none" stroke="#FEF3C7" strokeWidth="1.5" strokeDasharray="3 3" />

            {/* White Shide (zigzag paper) */}

            <polygon points="46,78 49,83 45,86 48,90 44,91" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="0.8" />

            <polygon points="74,78 71,83 75,86 72,90 76,91" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="0.8" />

            {/* Giant Golden Bell */}

            <circle cx="60" cy="82" r="7" fill={`url(#${uid}-gold)`} stroke="#B45309" strokeWidth="1.8" />

            <line x1="55" y1="83" x2="65" y2="83" stroke="#78350F" strokeWidth="1.5" />

            <circle cx="60" cy="86" r="1.5" fill="#78350F" />

            {/* Hanging Crimson Cords */}

            <path d="M57 88 Q54 94 53 98" fill="none" stroke="#E11D48" strokeWidth="1.8" strokeLinecap="round" />

            <path d="M63 88 Q66 94 67 98" fill="none" stroke="#E11D48" strokeWidth="1.8" strokeLinecap="round" />

          </g>

        )}



        {/* =======================================

            4. PRINCESS USAGI (みるく姫)

            ======================================= */}

        {charId === 'usagi' && (

          <g filter={`url(#${uid}-shadow)`}>

            <defs>

              <radialGradient id={`${uid}-bunny-grad`} cx="50%" cy="35%" r="65%">

                <stop offset="0%" stopColor="#FFFFFF" />

                <stop offset="70%" stopColor="#FFF1F2" />

                <stop offset="100%" stopColor="#FECDD3" />

              </radialGradient>

            </defs>



            {/* Floating Sweet Princess Hearts & Strawberry Sparkles */}

            <motion.g

              animate={{ y: [-3, 3, -3], opacity: [0.75, 1, 0.75] }}

              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}

            >

              {/* Cute Pink Heart 1 */}

              <path

                d="M14 44 C10 38 4 44 4 49 C4 55 14 62 14 62 C14 62 24 55 24 49 C24 44 18 38 14 44 Z"

                fill="#F472B6"

                opacity="0.85"

                transform="scale(0.8) translate(2, 4)"

              />

              {/* Cute Pink Heart 2 */}

              <path

                d="M106 38 C102 32 96 38 96 43 C96 49 106 56 106 56 C106 56 116 49 116 43 C116 38 110 32 106 38 Z"

                fill="#FB7185"

                opacity="0.85"

                transform="scale(0.7) translate(40, 10)"

              />

              <circle cx="16" cy="30" r="2.2" fill="#FCE7F3" opacity="0.9" />

              <polygon points="106,60 107,57 108,60 111,61 108,62 107,65 106,62 103,61" fill="#FDE047" opacity="0.9" />

            </motion.g>



            {/* Long Floppy Lop Ears with Lace Bows (Animated Sway) */}

            <motion.g

              animate={isRunning ? { rotate: [-12, 10, -12] } : { rotate: [-3, 3, -3] }}

              transition={{ duration: isRunning ? 0.5 : 2, repeat: Infinity }}

              style={{ transformOrigin: '34px 36px' }}

            >

              <ellipse cx="21" cy="62" rx="11" ry="28" transform="rotate(16 21 62)" fill={`url(#${uid}-bunny-grad)`} stroke="#F9A8D4" strokeWidth="2.2" />

              <ellipse cx="22" cy="64" rx="6" ry="19" transform="rotate(16 22 64)" fill="#F472B6" opacity="0.55" />

              {/* Ear Lace Bow Left */}

              <circle cx="30" cy="40" r="3.2" fill="#FFFFFF" stroke="#F472B6" strokeWidth="1" />

              <circle cx="30" cy="40" r="1.5" fill="#FB7185" />

            </motion.g>

            <motion.g

              animate={isRunning ? { rotate: [12, -10, 12] } : { rotate: [3, -3, 3] }}

              transition={{ duration: isRunning ? 0.5 : 2, repeat: Infinity }}

              style={{ transformOrigin: '86px 36px' }}

            >

              <ellipse cx="99" cy="62" rx="11" ry="28" transform="rotate(-16 99 62)" fill={`url(#${uid}-bunny-grad)`} stroke="#F9A8D4" strokeWidth="2.2" />

              <ellipse cx="98" cy="64" rx="6" ry="19" transform="rotate(-16 98 64)" fill="#F472B6" opacity="0.55" />

              {/* Ear Lace Bow Right */}

              <circle cx="90" cy="40" r="3.2" fill="#FFFFFF" stroke="#F472B6" strokeWidth="1" />

              <circle cx="90" cy="40" r="1.5" fill="#FB7185" />

            </motion.g>



            {/* Princess Dress Body */}

            <path d="M34 73 L86 73 L94 100 L26 100 Z" fill="#EC4899" stroke="#BE185D" strokeWidth="2" strokeLinejoin="round" />

            {/* White Frilly Apron Overdress */}

            <path d="M42 73 L78 73 L84 98 L36 98 Z" fill="#FFF1F2" stroke="#F472B6" strokeWidth="1.4" />

            <path d="M44 80 Q60 84 76 80" stroke="#F472B6" strokeWidth="1.2" fill="none" />

            {/* Double White Frill Hem */}

            <path d="M26 100 Q34 94 43 100 Q51 94 60 100 Q69 94 77 100 Q86 94 94 100" fill="none" stroke="#FFFFFF" strokeWidth="3.6" strokeLinecap="round" />



            {/* Left Hand Holding Magic Crystal Heart Wand */}

            <motion.g

              animate={isRunning ? { rotate: [-15, 15, -15], y: [-2, 2, -2] } : { rotate: [-3, 5, -3] }}

              transition={{ duration: isRunning ? 0.45 : 1.9, repeat: Infinity }}

              style={{ transformOrigin: '24px 76px' }}

            >

              {/* Gold Wand Shaft */}

              <line x1="24" y1="84" x2="14" y2="52" stroke="#F59E0B" strokeWidth="2.2" strokeLinecap="round" />

              {/* Wand Ribbon Bow */}

              <ellipse cx="14" cy="54" rx="4" ry="2" fill="#F472B6" />

              {/* Wand Crystal Heart Top */}

              <path

                d="M14 42 C11 37 6 42 6 46 C6 51 14 57 14 57 C14 57 22 51 22 46 C22 42 17 37 14 42 Z"

                fill="#FB7185"

                stroke="#BE123C"

                strokeWidth="1.2"

                style={{ filter: 'drop-shadow(0 0 3px rgba(251, 113, 133, 0.8))' }}

              />

              <circle cx="12" cy="44" r="1.3" fill="#FFFFFF" />

              {/* Little Paw */}

              <circle cx="24" cy="76" r="5.5" fill="#FFF1F2" stroke="#F9A8D4" strokeWidth="1.5" />

            </motion.g>



            {/* Fluffy Head */}

            <rect x="25" y="26" width="70" height="54" rx="27" fill={`url(#${uid}-bunny-grad)`} stroke="#F9A8D4" strokeWidth="2" />



            {/* Royal Tiara & Strawberry Blossom Ribbon */}

            <g transform="translate(60, 22)">

              {/* Golden Tiara Peaks behind ribbon */}

              <polygon points="-12,4 -10,-6 0,0 10,-6 12,4" fill={`url(#${uid}-gold)`} stroke="#B45309" strokeWidth="1.2" />

              <circle cx="-10" cy="-6" r="1.8" fill="#FFFFFF" />

              <circle cx="0" cy="-2" r="2.2" fill="#38BDF8" />

              <circle cx="10" cy="-6" r="1.8" fill="#FFFFFF" />

              {/* Big Red Strawberry Bow */}

              <path d="M0 4 C-16 -8 -22 12 0 8 Z" fill="#F43F5E" stroke="#9F1239" strokeWidth="1.8" />

              <path d="M0 4 C16 -8 22 12 0 8 Z" fill="#F43F5E" stroke="#9F1239" strokeWidth="1.8" />

              {/* Center Strawberry Jewel */}

              <circle cx="0" cy="5" r="5" fill="#E11D48" stroke="#9F1239" strokeWidth="1.2" />

              <polygon points="0,1 -1.5,3 1.5,3" fill="#22C55E" />

              <circle cx="-1.8" cy="5" r="0.7" fill="#FEF08A" />

              <circle cx="1.8" cy="5" r="0.7" fill="#FEF08A" />

              <circle cx="0" cy="7" r="0.7" fill="#FEF08A" />

            </g>



            {/* Blush & Ruby Gem Eyes */}

            <circle cx="36" cy="61" r="8.5" fill={`url(#${uid}-blush)`} />

            <circle cx="84" cy="61" r="8.5" fill={`url(#${uid}-blush)`} />

            {renderEyes(45, 75, 53, '#881337', '#FB7185')}



            {/* Bunny Nose & Mouth */}

            <polygon points="57,58 63,58 60,62" fill="#EC4899" />

            <path d="M54 64 Q57 68 60 63 Q63 68 66 64" fill="none" stroke="#881337" strokeWidth="2.2" strokeLinecap="round" />



            {/* Pearl Choker Necklace */}

            <g>

              {[-12, -6, 0, 6, 12].map((xOff, i) => (

                <circle key={i} cx={60 + xOff} cy={74 + Math.abs(xOff) * 0.25} r="1.8" fill="#FFFFFF" stroke="#F472B6" strokeWidth="0.6" />

              ))}

              <circle cx="60" cy="77" r="2.4" fill="#F43F5E" stroke="#9F1239" strokeWidth="0.8" />

            </g>

          </g>

        )}



        {/* =======================================

            5. DR. PENGUIN (ぺんた博士)

            ======================================= */}

        {charId === 'penguin' && (

          <g filter={`url(#${uid}-shadow)`}>

            <defs>

              <linearGradient id={`${uid}-peng-body`} x1="0" y1="0" x2="0" y2="1">

                <stop offset="0%" stopColor="#38BDF8" />

                <stop offset="60%" stopColor="#0284C7" />

                <stop offset="100%" stopColor="#0369A1" />

              </linearGradient>

            </defs>



            {/* Orange Webbed Feet */}

            <ellipse cx="44" cy="102" rx="9" ry="5" fill="#F97316" stroke="#C2410C" strokeWidth="1.8" />

            <ellipse cx="76" cy="102" rx="9" ry="5" fill="#F97316" stroke="#C2410C" strokeWidth="1.8" />



            {/* Flapping Flippers */}

            <motion.ellipse

              cx="20"

              cy="70"

              rx="7"

              ry="18"

              transform="rotate(24 20 70)"

              fill="#0284C7"

              stroke="#0369A1"

              strokeWidth="2"

              animate={isRunning ? { rotate: [10, 45, 10] } : {}}

              transition={{ duration: 0.4, repeat: Infinity }}

            />

            <motion.ellipse

              cx="100"

              cy="70"

              rx="7"

              ry="18"

              transform="rotate(-24 100 70)"

              fill="#0284C7"

              stroke="#0369A1"

              strokeWidth="2"

              animate={isRunning ? { rotate: [-10, -45, -10] } : {}}

              transition={{ duration: 0.4, repeat: Infinity }}

            />



            {/* Plump Penguin Body */}

            <rect x="24" y="28" width="72" height="72" rx="35" fill={`url(#${uid}-peng-body)`} stroke="#0369A1" strokeWidth="2.2" />



            {/* White Belly Heart-Shaped Mask */}

            <path

              d="M31 60 C31 44 50 44 60 54 C70 44 89 44 89 60 C90 84 78 97 60 97 C42 97 30 84 31 60 Z"

              fill="#FFFFFF"

            />



            {/* Cozy Knit Beanie Hat with Pom-Pom */}

            <circle cx="60" cy="12" r="7.5" fill="#FEF08A" stroke="#CA8A04" strokeWidth="1.8" />

            <path d="M28 34 C30 14 90 14 92 34 Z" fill="#EF4444" stroke="#B91C1C" strokeWidth="2" />

            <rect x="25" y="30" width="70" height="9" rx="4.5" fill="#FEF2F2" stroke="#FCA5A5" strokeWidth="1.8" />



            {/* Blush & Sparkling Ice-Blue Eyes */}

            <circle cx="37" cy="64" r="8" fill={`url(#${uid}-blush)`} />

            <circle cx="83" cy="64" r="8" fill={`url(#${uid}-blush)`} />

            {renderEyes(45, 75, 55, '#0C4A6E', '#38BDF8')}



            {/* Golden Beak */}

            <polygon points="52,59 68,59 60,68" fill={`url(#${uid}-gold)`} stroke="#B45309" strokeWidth="1.8" strokeLinejoin="round" />



            {/* Warm Red Scarf */}

            <path d="M30 76 Q60 85 90 76 L87 85 Q60 93 33 85 Z" fill="#EF4444" stroke="#991B1B" strokeWidth="1.8" />

            <path d="M72 81 L80 99 L67 99 L65 83 Z" fill="#EF4444" stroke="#991B1B" strokeWidth="1.8" strokeLinejoin="round" />

          </g>

        )}



        {/* =======================================

            6. STAR DRAGON (星竜ルナリア)

            ======================================= */}

        {charId === 'dragon' && (

          <g filter={`url(#${uid}-shadow)`}>

            <defs>

              <linearGradient id={`${uid}-dragon-body`} x1="0" y1="0" x2="0" y2="1">

                <stop offset="0%" stopColor="#C084FC" />

                <stop offset="55%" stopColor="#9333EA" />

                <stop offset="100%" stopColor="#581C87" />

              </linearGradient>

            </defs>



            {/* Flapping Celestial Golden Wings */}

            <motion.path

              d="M28 62 C4 40 2 68 16 76 C8 82 18 90 30 80 Z"

              fill={`url(#${uid}-gold)`}

              stroke="#B45309"

              strokeWidth="2"

              animate={isRunning ? { rotate: [-18, 18, -18] } : { rotate: [-5, 5, -5] }}

              transition={{ duration: isRunning ? 0.38 : 1.5, repeat: Infinity }}

              style={{ transformOrigin: '28px 68px' }}

            />

            <motion.path

              d="M92 62 C116 40 118 68 104 76 C112 82 102 90 90 80 Z"

              fill={`url(#${uid}-gold)`}

              stroke="#B45309"

              strokeWidth="2"

              animate={isRunning ? { rotate: [18, -18, 18] } : { rotate: [5, -5, 5] }}

              transition={{ duration: isRunning ? 0.38 : 1.5, repeat: Infinity }}

              style={{ transformOrigin: '92px 68px' }}

            />



            {/* Dragon Tail with Grand Radiant Star Tip */}

            <motion.g

              animate={{ rotate: isRunning ? [-14, 16, -14] : [-4, 6, -4] }}

              transition={{ duration: 0.7, repeat: Infinity }}

              style={{ transformOrigin: '85px 90px' }}

            >

              <path d="M82 90 Q108 92 106 72" fill="none" stroke="#9333EA" strokeWidth="8" strokeLinecap="round" />

              {/* Grand Golden Star with Diamond Core */}

              <g style={{ filter: 'drop-shadow(0 0 5px rgba(250, 204, 21, 0.9))' }}>

                <polygon points="106,62 109,69 116,71 110,75 113,82 106,78 99,82 102,75 96,71 103,69" fill={`url(#${uid}-gold)`} stroke="#B45309" strokeWidth="1" />

                <polygon points="106,67 108,71 111,72 108,74 109,77 106,75 103,77 104,74 101,72 104,71" fill="#FFFFFF" opacity="0.9" />

              </g>

            </motion.g>



            {/* Crystal Horns */}

            <path d="M35 32 L21 10 L46 25 Z" fill={`url(#${uid}-gold)`} stroke="#B45309" strokeWidth="2" strokeLinejoin="round" />

            <path d="M85 32 L99 10 L74 25 Z" fill={`url(#${uid}-gold)`} stroke="#B45309" strokeWidth="2" strokeLinejoin="round" />



            {/* Chubby Dragon Body */}

            <rect x="26" y="26" width="68" height="72" rx="33" fill={`url(#${uid}-dragon-body)`} stroke="#4C1D95" strokeWidth="2.2" />



            {/* Ribbed Pastel Belly */}

            <ellipse cx="60" cy="79" rx="21" ry="17" fill="#F3E8FF" />

            <line x1="45" y1="73" x2="75" y2="73" stroke="#D8B4FE" strokeWidth="2" strokeLinecap="round" />

            <line x1="43" y1="80" x2="77" y2="80" stroke="#D8B4FE" strokeWidth="2" strokeLinecap="round" />

            <line x1="46" y1="87" x2="74" y2="87" stroke="#D8B4FE" strokeWidth="2" strokeLinecap="round" />



            {/* Forehead Luxurious Star Gem & Diamond Sparkle */}

            <g style={{ filter: 'drop-shadow(0 0 4px rgba(56, 189, 248, 0.9))' }}>

              <polygon points="60,28 65,37 60,46 55,37" fill="#38BDF8" stroke="#FFFFFF" strokeWidth="1.2" />

              <polygon points="60,33 62,37 60,41 58,37" fill="#FFFFFF" />

              <circle cx="60" cy="37" r="1.5" fill="#FEF08A" />

            </g>



            {/* Floating Ambient Stardust Sparkles */}

            <polygon points="20,45 21.5,41 23,45 27,46.5 23,48 21.5,52 20,48 16,46.5" fill="#FDE047" opacity="0.85" />

            <polygon points="98,42 99,39 100,42 103,43 100,44 99,47 98,44 95,43" fill="#67E8F9" opacity="0.85" />



            {/* Blush & Galaxy Eyes */}

            <circle cx="36" cy="60" r="8.5" fill={`url(#${uid}-blush)`} />

            <circle cx="84" cy="60" r="8.5" fill={`url(#${uid}-blush)`} />

            {renderEyes(45, 75, 52, '#311042', '#F472B6')}



            {/* Cute Fang Smile */}

            <path d="M52 60 Q60 66 68 60" fill="none" stroke="#1E1B4B" strokeWidth="2.4" strokeLinecap="round" />

            <polygon points="54,61 57,61 55.5,65" fill="#FFFFFF" />

            <polygon points="63,61 66,61 64.5,65" fill="#FFFFFF" />

          </g>

        )}



        {/* =======================================

            7–30. RICHLY DIFFERENTIATED 365-DAY CHARACTERS

            ======================================= */}

        {(() => {

          const EXTENDED_SPECS = {

            hamster: {

              c1: '#FDE68A', c2: '#F59E0B', stroke: '#B45309', belly: '#FFFBEB',

              eye1: '#78350F', eye2: '#FBBF24', ears: 'hamster', nose: 'cat',

              prop: 'hamster',

            },

            panda: {

              c1: '#FFFFFF', c2: '#F1F5F9', stroke: '#1E293B', belly: '#FFFFFF',

              eye1: '#064E3B', eye2: '#34D399', ears: 'panda', nose: 'snout',

              prop: 'panda',

            },

            hiyoko: {

              c1: '#FEF08A', c2: '#FACC15', stroke: '#CA8A04', belly: '#FEF9C3',

              eye1: '#713F12', eye2: '#F59E0B', ears: 'chick', nose: 'beak',

              prop: 'hiyoko',

            },

            otter: {

              c1: '#B45309', c2: '#78350F', stroke: '#451A03', belly: '#FEF3C7',

              eye1: '#1E3A8A', eye2: '#38BDF8', ears: 'otter', nose: 'otter',

              prop: 'otter',

            },

            koala: {

              c1: '#94A3B8', c2: '#64748B', stroke: '#334155', belly: '#F1F5F9',

              eye1: '#0F172A', eye2: '#94A3B8', ears: 'koala_fluffy', nose: 'koala',

              prop: 'koala',

            },

            fox: {

              c1: '#FB923C', c2: '#EA580C', stroke: '#9A3412', belly: '#FFF7ED',

              eye1: '#7C2D12', eye2: '#FBBF24', ears: 'fox_sharp', nose: 'fox',

              prop: 'fox',

            },

            frog: {

              c1: '#86EFAC', c2: '#22C55E', stroke: '#15803D', belly: '#DCFCE7',

              eye1: '#14532D', eye2: '#4ADE80', ears: 'frog_eyes', nose: 'frog',

              prop: 'frog',

            },

            bear: {

              c1: '#FBBF24', c2: '#B45309', stroke: '#78350F', belly: '#FEF3C7',

              eye1: '#451A03', eye2: '#F59E0B', ears: 'bear_round', nose: 'bear_muzzle',

              prop: 'honey_bear',

            },

            owl: {

              c1: '#A78BFA', c2: '#6D28D9', stroke: '#4C1D95', belly: '#EDE9FE',

              eye1: '#311042', eye2: '#FBBF24', ears: 'owl_horns', nose: 'beak',

              prop: 'owl_prof',

            },

            seal: {

              c1: '#F8FAFC', c2: '#CFE8FC', stroke: '#60A5FA', belly: '#FFFFFF',

              eye1: '#0C4A6E', eye2: '#38BDF8', ears: 'none', nose: 'seal_whiskers',

              prop: 'seal_spots',

            },

            redpanda: {

              c1: '#F97316', c2: '#C2410C', stroke: '#7F1D1D', belly: '#1E1B4B',

              eye1: '#451A03', eye2: '#FB923C', ears: 'pointed', nose: 'snout',

              prop: 'redpanda_ringtail',

            },

            hedgehog: {

              c1: '#FDE68A', c2: '#D97706', stroke: '#78350F', belly: '#FFFBEB',

              eye1: '#78350F', eye2: '#F43F5E', ears: 'round', nose: 'snout',

              prop: 'hedgehog_spikes',

            },

            alpaca: {

              c1: '#FFF1F2', c2: '#FCE7F3', stroke: '#F472B6', belly: '#FFFFFF',

              eye1: '#831843', eye2: '#F472B6', ears: 'alpaca_ears', nose: 'cat',

              prop: 'alpaca_wool',

            },

            squirrel: {

              c1: '#F59E0B', c2: '#B45309', stroke: '#78350F', belly: '#FEF3C7',

              eye1: '#451A03', eye2: '#FBBF24', ears: 'squirrel_tuft', nose: 'cat',

              prop: 'squirrel_giant_tail',

            },

            sloth: {

              c1: '#D6D3D1', c2: '#A8A29E', stroke: '#57534E', belly: '#F5F5F4',

              eye1: '#292524', eye2: '#84CC16', ears: 'none', nose: 'snout',

              prop: 'sloth_flower',

            },

            dolphin: {

              c1: '#F472B6', c2: '#38BDF8', stroke: '#0284C7', belly: '#FFF1F5',

              eye1: '#0C4A6E', eye2: '#F472B6', ears: 'dolphin_fin', nose: 'dolphin_smile',

              prop: 'marine_princess',

            },

            whitewolf: {

              c1: '#F8FAFC', c2: '#93C5FD', stroke: '#1D4ED8', belly: '#FFFFFF',

              eye1: '#1E3A8A', eye2: '#38BDF8', ears: 'wolf_ears', nose: 'snout',

              prop: 'whitewolf_ice',

            },

            unicorn: {

              c1: '#FFFFFF', c2: '#F5D0FE', stroke: '#C026D3', belly: '#FDF4FF',

              eye1: '#701A75', eye2: '#E879F9', ears: 'alpaca_ears', nose: 'cat',

              prop: 'unicorn_spiral',

            },

            griffin: {

              c1: '#FDE047', c2: '#CA8A04', stroke: '#854D0E', belly: '#FEF9C3',

              eye1: '#0C4A6E', eye2: '#38BDF8', ears: 'owl_horns', nose: 'beak',

              prop: 'wings_gold',

            },

            kitsune: {

              c1: '#FFFDF9', c2: '#FFE4E6', stroke: '#E11D48', belly: '#FFFFFF',

              eye1: '#881337', eye2: '#FB7185', ears: 'kitsune', nose: 'cat',

              prop: 'kitsune_fire',

            },

            pegasus: {

              c1: '#F0F9FF', c2: '#BAE6FD', stroke: '#0284C7', belly: '#FFFFFF',

              eye1: '#0C4A6E', eye2: '#38BDF8', ears: 'alpaca_ears', nose: 'cat',

              prop: 'wings_angel',

            },

            phoenix: {

              c1: '#FDE047', c2: '#EF4444', stroke: '#991B1B', belly: '#FEF08A',

              eye1: '#7F1D1D', eye2: '#FACC15', ears: 'chick', nose: 'beak',

              prop: 'wings_fire',

            },

            celestialcat: {

              c1: '#312E81', c2: '#1E1B4B', stroke: '#4338CA', belly: '#4F46E5',

              eye1: '#0F172A', eye2: '#FACC15', ears: 'cat_crescent', nose: 'cat',

              prop: 'celestial_moon',

            },

            sunemperor: {

              c1: '#FFFBEB', c2: '#FDE047', stroke: '#B45309', belly: '#FFFFFF',

              eye1: '#7C2D12', eye2: '#F59E0B', ears: 'kitsune', nose: 'cat',

              prop: 'sunemperor',

            },

          };



          const spec = EXTENDED_SPECS[charId];

          if (!spec) return null;



          return (

            <g filter={`url(#${uid}-shadow)`}>

              <defs>

                <linearGradient id={`${uid}-ext-body`} x1="0" y1="0" x2="0" y2="1">

                  <stop offset="0%" stopColor={spec.c1} />

                  <stop offset="100%" stopColor={spec.c2} />

                </linearGradient>

              </defs>



              {/* 365-Day Radiant Sun Halo (Sun Emperor) */}

              {spec.prop === 'sunemperor' && (

                <motion.g

                  animate={{ rotate: 360 }}

                  transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}

                  style={{ transformOrigin: '60px 58px' }}

                >

                  <circle cx="60" cy="58" r="49" fill="none" stroke="#FACC15" strokeWidth="2.5" strokeDasharray="6 6" opacity="0.85" />

                  <circle cx="60" cy="58" r="43" fill="none" stroke="#F97316" strokeWidth="1.8" opacity="0.65" />

                  {Array.from({ length: 8 }).map((_, i) => {

                    const a = (i * 45 * Math.PI) / 180;

                    const x = 60 + 49 * Math.cos(a);

                    const y = 58 + 49 * Math.sin(a);

                    return <circle key={i} cx={x} cy={y} r="3.5" fill="#FDE047" stroke="#B45309" strokeWidth="1.2" />;

                  })}

                </motion.g>

              )}



              {/* Kitsune Spirit Flames (狐火) */}

              {spec.prop === 'kitsune_fire' && (

                <g>

                  {[-32, 0, 32].map((xOff, idx) => (

                    <motion.g

                      key={idx}

                      animate={{ y: [-3, 3, -3], scale: [0.9, 1.1, 0.9] }}

                      transition={{ duration: 1.4, delay: idx * 0.35, repeat: Infinity }}

                    >

                      <path

                        d={`M${60 + xOff} 22 Q${56 + xOff} 14 ${60 + xOff} 8 Q${64 + xOff} 14 ${60 + xOff} 22 Z`}

                        fill="#38BDF8"

                        opacity="0.8"

                      />

                      <circle cx={60 + xOff} cy={16} r="2" fill="#FFFFFF" />

                    </motion.g>

                  ))}

                </g>

              )}



              {/* Back Wings */}

              {(spec.prop === 'wings_gold' || spec.prop === 'wings_angel' || spec.prop === 'wings_fire' || spec.prop === 'sunemperor') && (

                <>

                  <motion.path

                    d="M28 62 C3 38 1 68 16 76 C8 84 18 92 30 80 Z"

                    fill={spec.prop === 'wings_angel' ? '#FFFFFF' : spec.prop === 'wings_fire' ? '#F97316' : `url(#${uid}-gold)`}

                    stroke={spec.prop === 'wings_angel' ? '#38BDF8' : '#B45309'}

                    strokeWidth="2"

                    animate={isRunning ? { rotate: [-18, 18, -18] } : { rotate: [-5, 5, -5] }}

                    transition={{ duration: isRunning ? 0.38 : 1.5, repeat: Infinity }}

                    style={{ transformOrigin: '28px 68px' }}

                  />

                  <motion.path

                    d="M92 62 C117 38 119 68 104 76 C112 84 102 92 90 80 Z"

                    fill={spec.prop === 'wings_angel' ? '#FFFFFF' : spec.prop === 'wings_fire' ? '#F97316' : `url(#${uid}-gold)`}

                    stroke={spec.prop === 'wings_angel' ? '#38BDF8' : '#B45309'}

                    strokeWidth="2"

                    animate={isRunning ? { rotate: [18, -18, 18] } : { rotate: [5, -5, 5] }}

                    transition={{ duration: isRunning ? 0.38 : 1.5, repeat: Infinity }}

                    style={{ transformOrigin: '92px 68px' }}

                  />

                </>

              )}



              {/* MARINE PRINCESS DOLPHIN FLUKES & DORSAL FIN (まりん姫の優雅な尾びれ＆背びれ＆真珠泡) */}

              {spec.prop === 'marine_princess' && (

                <g>

                  {/* Dorsal Fin on Back */}

                  <path

                    d="M74 28 C82 14 96 14 96 24 C90 32 82 34 74 36 Z"

                    fill="#F472B6"

                    stroke={spec.stroke}

                    strokeWidth="2.2"

                    strokeLinejoin="round"

                  />

                  {/* Floating Sparkling Pearl Bubbles */}

                  <motion.g

                    animate={{ y: [-3, 3, -3], opacity: [0.75, 1, 0.75] }}

                    transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}

                  >

                    <circle cx="14" cy="42" r="5" fill="#E0F2FE" stroke="#38BDF8" strokeWidth="1.2" opacity="0.85" />

                    <circle cx="12" cy="40" r="1.5" fill="#FFFFFF" />

                    <circle cx="20" cy="28" r="3" fill="#E0F2FE" stroke="#38BDF8" strokeWidth="1" opacity="0.8" />

                    <circle cx="106" cy="38" r="4" fill="#FCE7F3" stroke="#F472B6" strokeWidth="1.2" opacity="0.85" />

                    <circle cx="104.5" cy="36.5" r="1.2" fill="#FFFFFF" />

                    <circle cx="102" cy="52" r="2.5" fill="#E0F2FE" stroke="#38BDF8" strokeWidth="1" opacity="0.75" />

                  </motion.g>

                  {/* Animated Dolphin Tail Flukes behind */}

                  <motion.g

                    animate={isRunning ? { rotate: [-14, 16, -14], y: [-2, 2, -2] } : { rotate: [-4, 6, -4] }}

                    transition={{ duration: isRunning ? 0.35 : 1.5, repeat: Infinity, ease: 'easeInOut' }}

                    style={{ transformOrigin: '82px 86px' }}

                  >

                    {/* Tail Stem */}

                    <path d="M78 84 C88 84 96 88 102 94 C94 92 86 88 78 88 Z" fill="#38BDF8" stroke={spec.stroke} strokeWidth="2" />

                    {/* Fluke Lobes (Horizontal Dolphin Tail) */}

                    <path

                      d="M102 94 C112 85 118 78 120 80 C116 88 108 94 102 96 C108 98 116 104 120 112 C118 114 112 107 102 98 Z"

                      fill="#38BDF8"

                      stroke={spec.stroke}

                      strokeWidth="2.2"

                      strokeLinejoin="round"

                    />

                    {/* Tail Pearl Accent */}

                    <circle cx="102" cy="96" r="3" fill="#FFFFFF" stroke="#F472B6" strokeWidth="1" />

                  </motion.g>

                </g>

              )}



              {/* STELLA PRINCESS UNICORN (ステラ姫のオーロラ翼＆浮遊星屑) */}

              {spec.prop === 'unicorn_spiral' && (

                <g>

                  {/* Floating Pastel Stardust & Hearts */}

                  <motion.g

                    animate={{ y: [-3, 3, -3], opacity: [0.75, 1, 0.75] }}

                    transition={{ duration: 2.3, repeat: Infinity, ease: 'easeInOut' }}

                  >

                    <polygon points="14,40 15,36 16,40 20,41 16,42 15,46 14,42 10,41" fill="#E879F9" opacity="0.9" />

                    <polygon points="106,36 107,33 108,36 111,37 108,38 107,41 106,38 103,37" fill="#FDE047" opacity="0.9" />

                    <circle cx="18" cy="54" r="2.2" fill="#FDF4FF" stroke="#E879F9" strokeWidth="0.8" opacity="0.85" />

                    <circle cx="104" cy="58" r="2.5" fill="#E0F2FE" stroke="#38BDF8" strokeWidth="0.8" opacity="0.85" />

                  </motion.g>

                  {/* Flapping Aurora Prism Wings */}

                  <motion.path

                    d="M30 62 C4 36 2 66 18 76 C10 82 20 90 32 80 Z"

                    fill="#FDF4FF"

                    stroke="#E879F9"

                    strokeWidth="2"

                    opacity="0.92"

                    animate={isRunning ? { rotate: [-18, 18, -18] } : { rotate: [-5, 5, -5] }}

                    transition={{ duration: isRunning ? 0.38 : 1.6, repeat: Infinity }}

                    style={{ transformOrigin: '30px 68px' }}

                  />

                  <motion.path

                    d="M90 62 C116 36 118 66 102 76 C110 82 100 90 88 80 Z"

                    fill="#FDF4FF"

                    stroke="#E879F9"

                    strokeWidth="2"

                    opacity="0.92"

                    animate={isRunning ? { rotate: [18, -18, 18] } : { rotate: [5, -5, 5] }}

                    transition={{ duration: isRunning ? 0.38 : 1.6, repeat: Infinity }}

                    style={{ transformOrigin: '90px 68px' }}

                  />

                </g>

              )}



              {/* WHITEWOLF FENRIR (銀牙フェンリルの白銀氷晶マント＆雪花) */}

              {spec.prop === 'whitewolf_ice' && (

                <g>

                  {/* Floating Sparkling Snowflakes */}

                  <motion.g

                    animate={{ y: [-3, 3, -3], opacity: [0.75, 1, 0.75] }}

                    transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}

                  >

                    {/* Snowflake 1 */}

                    <g transform="translate(14, 40) scale(0.7)">

                      <line x1="-8" y1="0" x2="8" y2="0" stroke="#38BDF8" strokeWidth="1.6" />

                      <line x1="0" y1="-8" x2="0" y2="8" stroke="#38BDF8" strokeWidth="1.6" />

                      <line x1="-6" y1="-6" x2="6" y2="6" stroke="#38BDF8" strokeWidth="1.4" />

                      <line x1="-6" y1="6" x2="6" y2="-6" stroke="#38BDF8" strokeWidth="1.4" />

                      <circle cx="0" cy="0" r="2" fill="#FFFFFF" />

                    </g>

                    {/* Snowflake 2 */}

                    <g transform="translate(106, 38) scale(0.65)">

                      <line x1="-8" y1="0" x2="8" y2="0" stroke="#93C5FD" strokeWidth="1.6" />

                      <line x1="0" y1="-8" x2="0" y2="8" stroke="#93C5FD" strokeWidth="1.6" />

                      <line x1="-6" y1="-6" x2="6" y2="6" stroke="#93C5FD" strokeWidth="1.4" />

                      <line x1="-6" y1="6" x2="6" y2="-6" stroke="#93C5FD" strokeWidth="1.4" />

                      <circle cx="0" cy="0" r="1.8" fill="#FFFFFF" />

                    </g>

                    <circle cx="18" cy="56" r="1.5" fill="#E0F2FE" />

                    <circle cx="102" cy="58" r="1.5" fill="#E0F2FE" />

                  </motion.g>

                  {/* Swirling Frost Fur Cape */}

                  <motion.path

                    d="M24 66 C14 86 24 100 60 100 C96 100 106 86 96 66 Z"

                    fill="#1E3A8A"

                    stroke="#38BDF8"

                    strokeWidth="2.4"

                    animate={isRunning ? { scaleY: [1, 1.05, 1] } : {}}

                    transition={{ duration: 0.8, repeat: Infinity }}

                  />

                  {/* Frost Crystals along Cape Hem */}

                  <path d="M26 96 Q34 102 60 102 Q86 102 94 96" fill="none" stroke="#93C5FD" strokeWidth="3" strokeLinecap="round" />

                </g>

              )}



              {/* CELESTIAL CAT CAIT-SITH (星詠みケットシーのネビュラマント＆浮遊月) */}

              {spec.prop === 'celestial_moon' && (

                <g>

                  {/* Floating Star Dust & Mini Moonlet */}

                  <motion.g

                    animate={{ y: [-3, 3, -3], opacity: [0.75, 1, 0.75] }}

                    transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}

                  >

                    {/* Mini Crescent Moonlet */}

                    <path

                      d="M16 36 A 6 6 0 0 0 12 48 A 5 5 0 0 1 16 36"

                      fill="#FDE047"

                      stroke="#FACC15"

                      strokeWidth="1"

                    />

                    <polygon points="106,38 107,35 108,38 111,39 108,40 107,43 106,40 103,39" fill="#818CF8" opacity="0.9" />

                    <polygon points="18,58 19,55 20,58 23,59 20,60 19,63 18,60 15,59" fill="#FDE047" opacity="0.85" />

                    <circle cx="104" cy="56" r="2" fill="#C7D2FE" opacity="0.8" />

                  </motion.g>

                  {/* Deep Nebula Galaxy Cape */}

                  <path

                    d="M24 66 C14 86 24 100 60 100 C96 100 106 86 96 66 Z"

                    fill="#1E1B4B"

                    stroke="#4338CA"

                    strokeWidth="2.4"

                  />

                  {/* Inner Stardust Constellation dots */}

                  <circle cx="44" cy="88" r="1.3" fill="#FDE047" />

                  <circle cx="56" cy="92" r="1" fill="#FFFFFF" />

                  <circle cx="68" cy="90" r="1.2" fill="#818CF8" />

                  <circle cx="78" cy="86" r="1" fill="#FDE047" />

                  <line x1="44" y1="88" x2="56" y2="92" stroke="#6366F1" strokeWidth="0.7" opacity="0.6" />

                  <line x1="56" y1="92" x2="68" y2="90" stroke="#6366F1" strokeWidth="0.7" opacity="0.6" />

                  <line x1="68" y1="90" x2="78" y2="86" stroke="#6366F1" strokeWidth="0.7" opacity="0.6" />

                </g>

              )}



              {/* SUN EMPEROR AMATERASU (太陽神アマテラス丸の浮遊神光粒子) */}

              {spec.prop === 'sunemperor' && (

                <motion.g

                  animate={{ y: [-3, 3, -3], opacity: [0.8, 1, 0.8] }}

                  transition={{ duration: 2.1, repeat: Infinity, ease: 'easeInOut' }}

                >

                  <circle cx="16" cy="40" r="3.2" fill="#FDE047" stroke="#B45309" strokeWidth="1" opacity="0.9" />

                  <circle cx="104" cy="38" r="3.2" fill="#FDE047" stroke="#B45309" strokeWidth="1" opacity="0.9" />

                  <polygon points="18,56 19,52 20,56 24,57 20,58 19,62 18,58 14,57" fill="#F59E0B" opacity="0.9" />

                  <polygon points="102,56 103,52 104,56 108,57 104,58 103,62 102,58 98,57" fill="#F59E0B" opacity="0.9" />

                </motion.g>

              )}



              {/* Nine Tails (Kitsune) */}

              {(spec.prop === 'ninetails' || spec.prop === 'kitsune_fire') && (

                <g>

                  {[-30, -15, 0, 15, 30].map((ang, idx) => (

                    <ellipse

                      key={idx}

                      cx="60"

                      cy="46"

                      rx="10"

                      ry="32"

                      transform={`rotate(${ang} 60 82)`}

                      fill="#FFF1F2"

                      stroke="#FB7185"

                      strokeWidth="1.8"

                    />

                  ))}

                </g>

              )}



              {/* SQUIRREL GIANT FLUFFY TAIL (くるみん巨大しっぽ: リス最大の差別化) */}

              {spec.prop === 'squirrel_giant_tail' && (

                <motion.g

                  animate={{ rotate: isRunning ? [-12, 16, -12] : [-4, 6, -4] }}

                  transition={{ duration: isRunning ? 0.4 : 1.3, repeat: Infinity }}

                  style={{ transformOrigin: '82px 88px' }}

                >

                  <path

                    d="M82 88 C116 82 124 38 100 16 C86 4 72 18 80 32 C88 44 86 64 78 76 Z"

                    fill="#B45309"

                    stroke="#78350F"

                    strokeWidth="2.4"

                    strokeLinejoin="round"

                  />

                  {/* Two White Tail Stripes */}

                  <path d="M88 32 C96 46 94 66 84 76" stroke="#FEF3C7" strokeWidth="2.5" fill="none" strokeLinecap="round" />

                  <path d="M96 28 C104 42 102 62 92 72" stroke="#FEF3C7" strokeWidth="2" fill="none" strokeLinecap="round" />

                </motion.g>

              )}



              {/* RED PANDA STRIPED RING-TAIL (レッサーパンダのシマシマ縞尾) */}

              {spec.prop === 'redpanda_ringtail' && (

                <motion.g

                  animate={{ rotate: isRunning ? [-15, 18, -15] : [-5, 7, -5] }}

                  transition={{ duration: isRunning ? 0.42 : 1.4, repeat: Infinity }}

                  style={{ transformOrigin: '82px 84px' }}

                >

                  <path d="M80 84 C112 80 118 42 94 36 C82 34 78 52 86 64" fill="#C2410C" stroke="#7F1D1D" strokeWidth="2.2" />

                  {/* Ring Stripes */}

                  <path d="M92 48 Q100 52 103 44" stroke="#451A03" strokeWidth="4" fill="none" />

                  <path d="M86 62 Q96 66 100 58" stroke="#451A03" strokeWidth="4" fill="none" />

                </motion.g>

              )}



              {/* FOX TAIL WITH WHITE TIP (キツネ尾・先端ホワイト) */}

              {spec.prop === 'fox' && (

                <motion.g

                  animate={{ rotate: isRunning ? [-12, 16, -12] : [-4, 6, -4] }}

                  transition={{ duration: isRunning ? 0.45 : 1.5, repeat: Infinity }}

                  style={{ transformOrigin: '82px 84px' }}

                >

                  <path d="M82 84 C110 80 116 44 94 40 C84 38 80 54 86 66" fill="#EA580C" stroke="#9A3412" strokeWidth="2.2" />

                  {/* White Tip */}

                  <path d="M94 40 C102 42 108 48 102 54 L94 48 Z" fill="#FFFFFF" stroke="#9A3412" strokeWidth="1.2" />

                </motion.g>

              )}



              {/* HEDGEHOG SPIKES (ハリネズミのツンツン背中トゲ) */}

              {spec.prop === 'hedgehog_spikes' && (

                <polygon

                  points="14,64 8,46 22,42 16,24 34,26 40,10 55,20 60,6 65,20 80,10 86,26 104,24 98,42 112,46 106,64"

                  fill="#78350F"

                  stroke="#451A03"

                  strokeWidth="2.2"

                  strokeLinejoin="round"

                />

              )}



              {/* Ears */}

              {spec.ears === 'hamster' && (

                <>

                  <circle cx="31" cy="30" r="10" fill={`url(#${uid}-ext-body)`} stroke={spec.stroke} strokeWidth="2.2" />

                  <circle cx="31" cy="30" r="5" fill="#F472B6" opacity="0.65" />

                  <circle cx="89" cy="30" r="10" fill={`url(#${uid}-ext-body)`} stroke={spec.stroke} strokeWidth="2.2" />

                  <circle cx="89" cy="30" r="5" fill="#F472B6" opacity="0.65" />

                </>

              )}

              {spec.ears === 'bear_round' && (

                <>

                  <circle cx="28" cy="28" r="13" fill={`url(#${uid}-ext-body)`} stroke={spec.stroke} strokeWidth="2.4" />

                  <circle cx="28" cy="28" r="7.5" fill="#FDE68A" />

                  <circle cx="92" cy="28" r="13" fill={`url(#${uid}-ext-body)`} stroke={spec.stroke} strokeWidth="2.4" />

                  <circle cx="92" cy="28" r="7.5" fill="#FDE68A" />

                </>

              )}

              {spec.ears === 'squirrel_tuft' && (

                <>

                  <path d="M28 36 Q22 14 36 24 Z" fill={`url(#${uid}-ext-body)`} stroke={spec.stroke} strokeWidth="2" />

                  <path d="M30 14 Q28 6 36 10" stroke="#78350F" strokeWidth="2" strokeLinecap="round" />

                  <path d="M92 36 Q98 14 84 24 Z" fill={`url(#${uid}-ext-body)`} stroke={spec.stroke} strokeWidth="2" />

                  <path d="M90 14 Q92 6 84 10" stroke="#78350F" strokeWidth="2" strokeLinecap="round" />

                </>

              )}

              {spec.ears === 'round' && (

                <>

                  <circle cx="31" cy="30" r="11" fill={`url(#${uid}-ext-body)`} stroke={spec.stroke} strokeWidth="2.2" />

                  <circle cx="31" cy="30" r="6" fill="#F9A8D4" opacity="0.65" />

                  <circle cx="89" cy="30" r="11" fill={`url(#${uid}-ext-body)`} stroke={spec.stroke} strokeWidth="2.2" />

                  <circle cx="89" cy="30" r="6" fill="#F9A8D4" opacity="0.65" />

                </>

              )}

              {spec.ears === 'panda' && (

                <>

                  <circle cx="28" cy="26" r="12" fill="#1E293B" stroke="#0F172A" strokeWidth="2" />

                  <circle cx="92" cy="26" r="12" fill="#1E293B" stroke="#0F172A" strokeWidth="2" />

                </>

              )}

              {spec.ears === 'koala_fluffy' && (

                <>

                  <ellipse cx="18" cy="46" rx="16" ry="14" fill="#94A3B8" stroke="#334155" strokeWidth="2.4" />

                  <ellipse cx="18" cy="46" rx="9" ry="8" fill="#F1F5F9" />

                  {/* Fluffy Tuft Edges */}

                  <path d="M4 42 Q0 46 5 50" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />

                  <ellipse cx="102" cy="46" rx="16" ry="14" fill="#94A3B8" stroke="#334155" strokeWidth="2.4" />

                  <ellipse cx="102" cy="46" rx="9" ry="8" fill="#F1F5F9" />

                  <path d="M116 42 Q120 46 115 50" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />

                </>

              )}

              {(spec.ears === 'pointed' || spec.ears === 'fox_sharp' || spec.ears === 'wolf_ears') && (

                <>

                  <path d="M25 46 L14 12 L46 28 Z" fill={`url(#${uid}-ext-body)`} stroke={spec.stroke} strokeWidth="2.2" strokeLinejoin="round" />

                  <polygon points="27,41 19,18 40,30" fill={spec.ears === 'wolf_ears' ? '#93C5FD' : '#FED7AA'} />

                  <path d="M95 46 L106 12 L74 28 Z" fill={`url(#${uid}-ext-body)`} stroke={spec.stroke} strokeWidth="2.2" strokeLinejoin="round" />

                  <polygon points="93,41 101,18 80,30" fill={spec.ears === 'wolf_ears' ? '#93C5FD' : '#FED7AA'} />

                </>

              )}

              {spec.ears === 'kitsune' || spec.ears === 'cat_crescent' && (

                <>

                  <path d="M26 44 L16 14 L46 28 Z" fill={`url(#${uid}-ext-body)`} stroke={spec.stroke} strokeWidth="2.2" strokeLinejoin="round" />

                  <polygon points="28,39 20,20 40,29" fill="#FB7185" />

                  <path d="M94 44 L104 14 L74 28 Z" fill={`url(#${uid}-ext-body)`} stroke={spec.stroke} strokeWidth="2.2" strokeLinejoin="round" />

                  <polygon points="92,39 100,20 80,29" fill="#FB7185" />

                </>

              )}

              {spec.ears === 'frog_eyes' && (

                <>

                  <circle cx="36" cy="26" r="14" fill={`url(#${uid}-ext-body)`} stroke={spec.stroke} strokeWidth="2.4" />

                  <circle cx="36" cy="26" r="6" fill="#14532D" />

                  <circle cx="38" cy="24" r="2" fill="#FFFFFF" />

                  <circle cx="84" cy="26" r="14" fill={`url(#${uid}-ext-body)`} stroke={spec.stroke} strokeWidth="2.4" />

                  <circle cx="84" cy="26" r="6" fill="#14532D" />

                  <circle cx="86" cy="24" r="2" fill="#FFFFFF" />

                </>

              )}

              {spec.ears === 'owl_horns' && (

                <>

                  <path d="M24 36 L12 14 L40 24 Z" fill={spec.stroke} />

                  <path d="M96 36 L108 14 L80 24 Z" fill={spec.stroke} />

                </>

              )}

              {spec.ears === 'alpaca_ears' && (

                <>

                  <ellipse cx="32" cy="22" rx="5.5" ry="14" transform="rotate(-18 32 22)" fill={`url(#${uid}-ext-body)`} stroke={spec.stroke} strokeWidth="2" />

                  <ellipse cx="88" cy="22" rx="5.5" ry="14" transform="rotate(18 88 22)" fill={`url(#${uid}-ext-body)`} stroke={spec.stroke} strokeWidth="2" />

                </>

              )}

              {spec.ears === 'otter' && (

                <>

                  <circle cx="28" cy="42" r="7" fill={`url(#${uid}-ext-body)`} stroke={spec.stroke} strokeWidth="2" />

                  <circle cx="92" cy="42" r="7" fill={`url(#${uid}-ext-body)`} stroke={spec.stroke} strokeWidth="2" />

                </>

              )}

              {spec.ears === 'dolphin_fin' && (

                <g>

                  {/* Sakura Blossom on Right Side of Head */}

                  <g transform="translate(86, 26)">

                    {[0, 72, 144, 216, 288].map((ang, i) => (

                      <ellipse

                        key={i}

                        cx="0"

                        cy="-7"

                        rx="4.2"

                        ry="5.8"

                        fill="#FBCFE8"

                        stroke="#F43F5E"

                        strokeWidth="1.2"

                        transform={`rotate(${ang})`}

                      />

                    ))}

                    <circle cx="0" cy="0" r="4" fill="#FDE047" stroke="#EA580C" strokeWidth="1" />

                    <circle cx="0" cy="0" r="1.8" fill="#FFFFFF" />

                  </g>

                </g>

              )}



              {/* Feet / Flippers */}

              {spec.prop === 'marine_princess' ? (

                <>

                  {/* Dolphin Flippers (ぴょこぴょこ動く愛らしい胸びれ) */}

                  <motion.g

                    animate={isRunning ? { rotate: [14, -10, 14] } : { rotate: [5, -5, 5] }}

                    transition={{ duration: isRunning ? 0.35 : 1.4, repeat: Infinity }}

                    style={{ transformOrigin: '24px 74px' }}

                  >

                    <path

                      d="M24 70 C10 68 2 76 6 85 C14 87 22 81 26 76 Z"

                      fill="#7DD3FC"

                      stroke={spec.stroke}

                      strokeWidth="2.2"

                      strokeLinejoin="round"

                    />

                  </motion.g>

                  <motion.g

                    animate={isRunning ? { rotate: [-14, 10, -14] } : { rotate: [-5, 5, -5] }}

                    transition={{ duration: isRunning ? 0.35 : 1.4, repeat: Infinity }}

                    style={{ transformOrigin: '96px 74px' }}

                  >

                    <path

                      d="M96 70 C110 68 118 76 114 85 C106 87 98 81 94 76 Z"

                      fill="#7DD3FC"

                      stroke={spec.stroke}

                      strokeWidth="2.2"

                      strokeLinejoin="round"

                    />

                  </motion.g>

                </>

              ) : spec.prop === 'seal_spots' ? (

                <>

                  {/* Seal Flippers */}

                  <ellipse cx="16" cy="74" rx="11" ry="6" transform="rotate(25 16 74)" fill="#CFE8FC" stroke="#60A5FA" strokeWidth="2" />

                  <ellipse cx="104" cy="74" rx="11" ry="6" transform="rotate(-25 104 74)" fill="#CFE8FC" stroke="#60A5FA" strokeWidth="2" />

                </>

              ) : (

                <>

                  <ellipse cx="43" cy="100" rx="8.5" ry="5" fill={spec.belly} stroke={spec.stroke} strokeWidth="1.8" />

                  <ellipse cx="77" cy="100" rx="8.5" ry="5" fill={spec.belly} stroke={spec.stroke} strokeWidth="1.8" />

                </>

              )}



              {/* Main Body */}

              <rect x="24" y="28" width="72" height="70" rx="34" fill={`url(#${uid}-ext-body)`} stroke={spec.stroke} strokeWidth="2.2" />



              {/* HAMSTER PUFFY CHEEKS (ぷく太郎・大膨らみほっぺた) */}

              {spec.prop === 'hamster' && (

                <>

                  <ellipse cx="23" cy="65" rx="12" ry="9" fill="#FDE68A" stroke="#B45309" strokeWidth="2" />

                  <ellipse cx="97" cy="65" rx="12" ry="9" fill="#FDE68A" stroke="#B45309" strokeWidth="2" />

                </>

              )}



              {/* SEAL GOMA SPOTS (ごまぷりんのゴマフ斑点ドット) */}

              {spec.prop === 'seal_spots' && (

                <g fill="#94A3B8">

                  <circle cx="34" cy="48" r="2.2" />

                  <circle cx="38" cy="43" r="1.5" />

                  <circle cx="86" cy="48" r="2.2" />

                  <circle cx="82" cy="43" r="1.5" />

                  <circle cx="30" cy="70" r="2" />

                  <circle cx="90" cy="70" r="2" />

                </g>

              )}



              {/* Belly Patch */}

              <ellipse cx="60" cy="78" rx="22" ry="16" fill={spec.belly} opacity="0.92" />



              {/* Panda Dark Shoulder Vest */}

              {spec.ears === 'panda' && (

                <path d="M24 72 Q60 88 96 72 L92 88 Q60 100 28 88 Z" fill="#1E293B" />

              )}



              {/* Eye Patches: Panda, Sloth, Red Panda */}

              {spec.ears === 'panda' && (

                <>

                  <ellipse cx="43" cy="54" rx="11" ry="8.5" transform="rotate(-15 43 54)" fill="#1E293B" />

                  <ellipse cx="77" cy="54" rx="11" ry="8.5" transform="rotate(15 77 54)" fill="#1E293B" />

                </>

              )}

              {spec.prop === 'sloth_flower' && (

                <>

                  <ellipse cx="43" cy="55" rx="11" ry="7.5" transform="rotate(12 43 55)" fill="#78716C" />

                  <ellipse cx="77" cy="55" rx="11" ry="7.5" transform="rotate(-12 77 55)" fill="#78716C" />

                </>

              )}

              {spec.prop === 'redpanda_ringtail' && (

                <>

                  {/* White brow & cheek highlights */}

                  <circle cx="43" cy="44" r="4.5" fill="#FFFFFF" />

                  <circle cx="77" cy="44" r="4.5" fill="#FFFFFF" />

                  <ellipse cx="28" cy="62" rx="5" ry="7" fill="#FFFFFF" />

                  <ellipse cx="92" cy="62" rx="5" ry="7" fill="#FFFFFF" />

                </>

              )}



              {/* Kitsune Face Markings (狐の隈取) */}

              {(spec.prop === 'kitsune_fire' || charId === 'kitsune') && (

                <g stroke="#E11D48" strokeWidth="2.2" strokeLinecap="round" fill="none">

                  <path d="M33 54 Q38 52 41 58" />

                  <path d="M87 54 Q82 52 79 58" />

                  <path d="M60 32 L60 40" strokeWidth="2.5" />

                </g>

              )}



              {/* Celestial Moon on Forehead (ケットシー三日月) */}

              {spec.prop === 'celestial_moon' && (

                <path d="M62 30 A 6 6 0 0 0 58 42 A 5 5 0 0 1 62 30" fill="#FDE047" stroke="#FACC15" strokeWidth="1" />

              )}



              {/* Blush & Sparkling Eyes */}

              <circle cx="35" cy="62" r="8.5" fill={`url(#${uid}-blush)`} />

              <circle cx="85" cy="62" r="8.5" fill={`url(#${uid}-blush)`} />

              {renderEyes(45, 75, 54, spec.eye1, spec.eye2)}



              {/* Owl Glasses */}

              {spec.prop === 'owl_prof' && (

                <g stroke="#FBBF24" strokeWidth="2.2" fill="none">

                  <circle cx="45" cy="54" r="10.5" />

                  <circle cx="75" cy="54" r="10.5" />

                  <line x1="55.5" y1="54" x2="64.5" y2="54" />

                </g>

              )}



              {/* Noses & Muzzles */}

              {spec.nose === 'dolphin_smile' ? (

                <>

                  {/* Dolphin Blowhole on Forehead */}

                  <ellipse cx="60" cy="35" rx="3.5" ry="1.8" fill="#0284C7" opacity="0.6" />

                  {/* Smooth Dolphin Rostrum / Snout */}

                  <ellipse cx="60" cy="63" rx="14" ry="9" fill="#FFF1F5" stroke={spec.stroke} strokeWidth="1.8" />

                  {/* Always Smiling Dolphin Mouth */}

                  <path d="M52 64 Q60 71 68 64" fill="none" stroke="#0369A1" strokeWidth="2.4" strokeLinecap="round" />

                  {/* Sweet Rosy Dolphin Tongue */}

                  <path d="M56 66 Q60 70 64 66 Z" fill="#F43F5E" />

                  {/* Glossy Snout Highlight */}

                  <ellipse cx="58" cy="60" rx="3.5" ry="1.8" fill="#FFFFFF" opacity="0.85" />

                </>

              ) : spec.nose === 'beak' ? (

                <polygon points="53,58 67,58 60,67" fill="#F97316" stroke="#C2410C" strokeWidth="1.8" strokeLinejoin="round" />

              ) : spec.nose === 'koala' ? (

                <ellipse cx="60" cy="58" rx="8" ry="11" fill="#0F172A" stroke="#334155" strokeWidth="1.5" />

              ) : spec.nose === 'seal_whiskers' ? (

                <>

                  <ellipse cx="60" cy="60" rx="4.5" ry="3" fill="#0284C7" />

                  {/* Seal Whiskers */}

                  <line x1="42" y1="62" x2="30" y2="60" stroke="#60A5FA" strokeWidth="1.8" strokeLinecap="round" />

                  <line x1="42" y1="66" x2="30" y2="67" stroke="#60A5FA" strokeWidth="1.8" strokeLinecap="round" />

                  <line x1="78" y1="62" x2="90" y2="60" stroke="#60A5FA" strokeWidth="1.8" strokeLinecap="round" />

                  <line x1="78" y1="66" x2="90" y2="67" stroke="#60A5FA" strokeWidth="1.8" strokeLinecap="round" />

                </>

              ) : spec.nose === 'bear_muzzle' ? (

                <>

                  <ellipse cx="60" cy="64" rx="15" ry="10" fill="#FEF3C7" stroke="#B45309" strokeWidth="1.5" />

                  <ellipse cx="60" cy="60" rx="5" ry="3.5" fill="#451A03" />

                  <path d="M55 66 Q60 70 65 66" fill="none" stroke="#451A03" strokeWidth="2.2" strokeLinecap="round" />

                </>

              ) : spec.nose === 'fox' ? (

                <>

                  <path d="M48 64 Q60 76 72 64 Z" fill="#FFFFFF" />

                  <polygon points="56,60 64,60 60,64" fill="#18181B" />

                </>

              ) : (

                <>

                  <ellipse cx="60" cy="60" rx="4.2" ry="3" fill={spec.stroke} />

                  <path d="M53 65 Q56.5 70 60 65 Q63.5 70 67 65" fill="none" stroke={spec.stroke} strokeWidth="2.2" strokeLinecap="round" />

                </>

              )}



              {/* DISTINCTIVE ACCESSORIES & PROPS */}



              {/* Hamster Sunflower Seed & Flower */}

              {spec.prop === 'hamster' && (

                <g>

                  {/* Big Sunflower Seed Held in Both Paws */}

                  <g transform="translate(60, 84)">

                    <ellipse cx="0" cy="0" rx="9" ry="13" fill="#1C1917" stroke="#FEF3C7" strokeWidth="2" />

                    <line x1="-3" y1="-10" x2="-3" y2="10" stroke="#FFFFFF" strokeWidth="1.8" />

                    <line x1="3" y1="-10" x2="3" y2="10" stroke="#FFFFFF" strokeWidth="1.8" />

                    {/* Tiny Hamster Paws */}

                    <circle cx="-9" cy="0" r="3.5" fill="#FDE68A" />

                    <circle cx="9" cy="0" r="3.5" fill="#FDE68A" />

                  </g>

                  {/* Little Sunflower on Head */}

                  <circle cx="78" cy="24" r="5" fill="#F59E0B" />

                  <circle cx="78" cy="24" r="2.5" fill="#78350F" />

                </g>

              )}



              {/* Honey Bear Dripping Honey & Jar */}

              {spec.prop === 'honey_bear' && (

                <g>

                  {/* Dripping Honey on Head */}

                  <path d="M52 28 Q56 38 60 28 Q64 42 68 28 Z" fill="#F59E0B" />

                  <circle cx="64" cy="43" r="2.5" fill="#F59E0B" />

                  {/* Blue Polka Dot Bib */}

                  <path d="M42 76 Q60 88 78 76 L75 88 Q60 98 45 88 Z" fill="#60A5FA" stroke="#2563EB" strokeWidth="1.8" />

                  <circle cx="60" cy="84" r="2.5" fill="#FFFFFF" />

                </g>

              )}



              {/* Red Panda Big Red Apple on Head */}

              {spec.prop === 'redpanda_ringtail' && (

                <g>

                  <circle cx="60" cy="20" r="9" fill="#DC2626" stroke="#991B1B" strokeWidth="1.8" />

                  <ellipse cx="58" cy="18" rx="2.5" ry="1.2" fill="#FFFFFF" opacity="0.8" />

                  <path d="M60 11 Q63 6 66 10" stroke="#15803D" strokeWidth="2.5" fill="none" strokeLinecap="round" />

                </g>

              )}



              {/* Fox Shrine Scarf & Bell */}

              {spec.prop === 'fox' && (

                <g>

                  <path d="M36 75 Q60 86 84 75 L80 84 Q60 92 40 84 Z" fill="#DC2626" stroke="#991B1B" strokeWidth="2" />

                  <circle cx="60" cy="85" r="5" fill={`url(#${uid}-gold)`} stroke="#B45309" strokeWidth="1.5" />

                </g>

              )}



              {/* Koala Sleepcap & Eucalyptus Leaf */}

              {spec.prop === 'koala' && (

                <g>

                  {/* Nightcap */}

                  <path d="M34 32 C38 12 76 12 80 32 Z" fill="#38BDF8" stroke="#0284C7" strokeWidth="2" />

                  <line x1="38" y1="26" x2="76" y2="26" stroke="#FFFFFF" strokeWidth="2.5" />

                  <circle cx="80" cy="22" r="5" fill="#FFFFFF" stroke="#0284C7" strokeWidth="1.5" />

                  {/* Eucalyptus Leaf */}

                  <path d="M66 65 Q76 68 78 62 Q72 58 66 65 Z" fill="#22C55E" stroke="#15803D" strokeWidth="1.2" />

                </g>

              )}



              {/* Panda Bamboo Branch */}

              {spec.prop === 'panda' && (

                <g>

                  <path d="M38 78 L82 86" stroke="#16A34A" strokeWidth="4.5" strokeLinecap="round" />

                  <path d="M72 82 Q82 76 86 82 Q80 88 72 82 Z" fill="#22C55E" />

                </g>

              )}



              {/* Otter Pink Scallop Shell */}

              {spec.prop === 'otter' && (

                <g transform="translate(60, 84)">

                  <path d="M-9 -3 Q0 -11 9 -3 Q0 10 -9 -3 Z" fill="#F472B6" stroke="#DB2777" strokeWidth="1.8" />

                  <line x1="0" y1="-8" x2="0" y2="6" stroke="#FDF2F8" strokeWidth="1.5" />

                </g>

              )}



              {/* Sloth Tropical Flower Crown */}

              {spec.prop === 'sloth_flower' && (

                <g>

                  <circle cx="44" cy="22" r="6" fill="#F43F5E" />

                  <circle cx="60" cy="18" r="7" fill="#FACC15" />

                  <circle cx="76" cy="22" r="6" fill="#F43F5E" />

                </g>

              )}



              {/* Alpaca Fluffy Wool Tuft & Poncho */}

              {spec.prop === 'alpaca_wool' && (

                <g>

                  {/* Fluffy Wool Head Tuft */}

                  <circle cx="50" cy="22" r="9" fill="#FFFFFF" stroke="#F472B6" strokeWidth="2" />

                  <circle cx="60" cy="16" r="11" fill="#FFFFFF" stroke="#F472B6" strokeWidth="2" />

                  <circle cx="70" cy="22" r="9" fill="#FFFFFF" stroke="#F472B6" strokeWidth="2" />

                  {/* Andean Aztec Poncho */}

                  <path d="M26 78 Q60 94 94 78 L88 92 Q60 104 32 92 Z" fill="#EC4899" stroke="#BE185D" strokeWidth="2" />

                  <line x1="36" y1="84" x2="84" y2="84" stroke="#FACC15" strokeWidth="2" strokeDasharray="4 3" />

                </g>

              )}



              {/* STELLA PRINCESS UNICORN (ステラ姫のクリスタル角＆星屑ティアラ＆ペンダント) */}

              {spec.prop === 'unicorn_spiral' && (

                <g>

                  {/* Golden & Crystal Spiral Horn */}

                  <polygon points="60,2 52,28 68,28" fill={`url(#${uid}-gold)`} stroke="#B45309" strokeWidth="2" strokeLinejoin="round" />

                  <line x1="54" y1="20" x2="66" y2="14" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" />

                  <line x1="56" y1="12" x2="64" y2="6" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" />



                  {/* Starlight Tiara */}

                  <g>

                    <path d="M44 28 Q60 22 76 28" stroke="#B45309" strokeWidth="2" fill="none" />

                    <polygon points="46,28 43,18 51,23 60,11 69,23 77,18 74,28" fill={`url(#${uid}-gold)`} stroke="#B45309" strokeWidth="1.2" />

                    {/* Center Violet Star Gem */}

                    <circle cx="60" cy="12" r="3.2" fill="#E879F9" stroke="#A21CAF" strokeWidth="0.8" />

                    <circle cx="59" cy="11" r="1" fill="#FFFFFF" />

                    <circle cx="43" cy="18" r="2" fill="#FFFFFF" stroke="#E879F9" strokeWidth="0.8" />

                    <circle cx="77" cy="18" r="2" fill="#FFFFFF" stroke="#E879F9" strokeWidth="0.8" />

                  </g>



                  {/* Rainbow Pearl Necklace with Golden Star Pendant */}

                  <g>

                    {[

                      { cx: 42, cy: 75 },

                      { cx: 48, cy: 78 },

                      { cx: 54, cy: 81 },

                      { cx: 66, cy: 81 },

                      { cx: 72, cy: 78 },

                      { cx: 78, cy: 75 },

                    ].map((p, i) => (

                      <circle key={i} cx={p.cx} cy={p.cy} r="2" fill="#FDF4FF" stroke="#E879F9" strokeWidth="0.8" />

                    ))}

                    {/* Golden Star Charm */}

                    <g transform="translate(60, 84)">

                      <circle cx="0" cy="-2.5" r="1.5" fill="none" stroke="#F59E0B" strokeWidth="1" />

                      <polygon

                        points="0,-6 1.8,-1.8 6,0 1.8,1.8 0,6 -1.8,1.8 -6,0 -1.8,-1.8"

                        fill="#FDE047"

                        stroke="#B45309"

                        strokeWidth="1"

                      />

                      <circle cx="0" cy="0" r="1.5" fill="#FFFFFF" />

                    </g>

                  </g>

                </g>

              )}



              {/* WHITEWOLF FENRIR (銀牙フェンリルの氷晶王冠＆サファイアブローチ) */}

              {spec.prop === 'whitewolf_ice' && (

                <g>

                  {/* Frost Crystal Crown (氷晶冠) */}

                  <g>

                    <polygon points="44,28 38,12 48,22 60,6 72,22 82,12 76,28" fill="#38BDF8" stroke="#0284C7" strokeWidth="1.6" strokeLinejoin="round" />

                    <polygon points="46,27 48,20 60,10 72,20 74,27" fill="#E0F2FE" opacity="0.8" />

                    <circle cx="60" cy="8" r="3.2" fill="#FFFFFF" stroke="#0284C7" strokeWidth="1" />

                    <circle cx="38" cy="13" r="2.2" fill="#93C5FD" />

                    <circle cx="82" cy="13" r="2.2" fill="#93C5FD" />

                  </g>



                  {/* Forehead Frost Diamond Gem */}

                  <polygon points="60,33 63,38 60,43 57,38" fill="#FFFFFF" stroke="#0284C7" strokeWidth="1" />



                  {/* Royal Sapphire Ice Brooch on Collar */}

                  <g transform="translate(60, 78)">

                    {/* Frost Brooch Base */}

                    <polygon points="0,-7 6,-3 6,3 0,7 -6,3 -6,-3" fill="#1E3A8A" stroke="#38BDF8" strokeWidth="1.4" />

                    {/* Glowing Core Sapphire */}

                    <circle cx="0" cy="0" r="3" fill="#38BDF8" stroke="#FFFFFF" strokeWidth="1" />

                    <circle cx="-1" cy="-1" r="1" fill="#FFFFFF" />

                    {/* Ice Chains */}

                    <path d="M-6 -2 Q-14 -4 -18 -8" stroke="#93C5FD" strokeWidth="1.4" fill="none" />

                    <path d="M6 -2 Q14 -4 18 -8" stroke="#93C5FD" strokeWidth="1.4" fill="none" />

                  </g>

                </g>

              )}



              {/* CELESTIAL CAT CAIT-SITH (星詠みケットシーの三日月クラウン＆魔道天球儀) */}

              {spec.prop === 'celestial_moon' && (

                <g>

                  {/* Golden Crescent Moon Tiara */}

                  <g transform="translate(60, 24)">

                    <path

                      d="M-4 -16 A 12 12 0 0 0 12 4 A 10 10 0 0 1 -4 -16"

                      fill={`url(#${uid}-gold)`}

                      stroke="#B45309"

                      strokeWidth="1.4"

                    />

                    <circle cx="0" cy="-2" r="3.2" fill="#818CF8" stroke="#4338CA" strokeWidth="1" />

                    <circle cx="-0.8" cy="-2.8" r="1" fill="#FFFFFF" />

                  </g>



                  {/* Floating Magic Astrolabe in Paw (魔道天球儀) */}

                  <motion.g

                    animate={isRunning ? { rotate: [-15, 15, -15], y: [-2, 2, -2] } : { rotate: [-4, 6, -4] }}

                    transition={{ duration: isRunning ? 0.45 : 1.9, repeat: Infinity }}

                    style={{ transformOrigin: '22px 76px' }}

                  >

                    {/* Left Paw */}

                    <circle cx="22" cy="76" r="6" fill="#312E81" stroke="#4338CA" strokeWidth="1.5" />

                    {/* Astrolabe Rings & Core */}

                    <g transform="translate(14, 56)">

                      <ellipse cx="0" cy="0" rx="9" ry="3.5" fill="none" stroke="#FDE047" strokeWidth="1.2" transform="rotate(-25)" />

                      <ellipse cx="0" cy="0" rx="9" ry="3.5" fill="none" stroke="#818CF8" strokeWidth="1" transform="rotate(35)" />

                      {/* Luminous Core Star */}

                      <circle cx="0" cy="0" r="3.6" fill="#FDE047" stroke="#B45309" strokeWidth="1" />

                      <circle cx="-1" cy="-1" r="1.2" fill="#FFFFFF" />

                    </g>

                  </motion.g>



                  {/* Starlight Choker with Golden Star Charm */}

                  <g>

                    <path d="M42 74 Q60 80 78 74" stroke="#4338CA" strokeWidth="3" fill="none" strokeLinecap="round" />

                    <circle cx="60" cy="78" r="2.8" fill="#FDE047" stroke="#B45309" strokeWidth="1" />

                  </g>

                </g>

              )}



              {/* SUN EMPEROR AMATERASU (太陽神アマテラス丸の黄金神冠＆三種の神器) */}

              {spec.prop === 'sunemperor' && (

                <g>

                  {/* Solar Radiant Crown (日輪神冠) */}

                  <g transform="translate(60, 18)">

                    {/* Radiant Golden Spikes */}

                    <polygon points="0,-16 3,-4 10,-8 5,0 12,4 4,4 6,10 0,6 -6,10 -4,4 -12,4 -5,0 -10,-8 -3,-4" fill={`url(#${uid}-gold)`} stroke="#B45309" strokeWidth="1.4" />

                    {/* Imperial Sun Ruby */}

                    <circle cx="0" cy="2" r="4.5" fill="#EF4444" stroke="#991B1B" strokeWidth="1.2" />

                    <circle cx="-1" cy="1" r="1.4" fill="#FFFFFF" />

                  </g>



                  {/* Imperial Sacred Magatama Necklace (三種の神器: 勾玉首飾り) */}

                  <g transform="translate(60, 78)">

                    {/* Gold Base Arc */}

                    <path d="M-18 -4 Q0 6 18 -4" stroke="#B45309" strokeWidth="2.5" fill="none" strokeLinecap="round" />

                    {/* Sacred Green Magatama Left */}

                    <path d="M-10 0 C-14 -2 -14 6 -10 6 C-7 6 -6 3 -10 0 Z" fill="#10B981" stroke="#047857" strokeWidth="1" />

                    {/* Imperial Golden Magatama Center */}

                    <path d="M0 2 C-4 0 -4 9 0 9 C4 9 5 5 0 2 Z" fill="#FDE047" stroke="#B45309" strokeWidth="1.2" />

                    {/* Sacred Ruby Magatama Right */}

                    <path d="M10 0 C6 -2 6 6 10 6 C13 6 14 3 10 0 Z" fill="#EF4444" stroke="#991B1B" strokeWidth="1" />

                  </g>

                </g>

              )}



              {/* Owl Graduation Scholar Cap */}

              {spec.prop === 'owl_prof' && (

                <g>

                  <polygon points="60,8 30,24 60,34 90,24" fill="#312E81" stroke="#FBBF24" strokeWidth="2" strokeLinejoin="round" />

                  <circle cx="60" cy="24" r="3" fill="#FBBF24" />

                  <path d="M60 24 Q78 28 84 40" stroke="#FBBF24" strokeWidth="2" fill="none" />

                </g>

              )}



              {/* Frog Lotus Leaf Beret & Gold Mini Crown */}

              {spec.prop === 'frog' && (

                <g>

                  <ellipse cx="60" cy="20" rx="26" ry="7" fill="#15803D" stroke="#14532D" strokeWidth="2" />

                  <polygon points="54,16 51,9 57,12 60,6 63,12 69,9 66,16" fill={`url(#${uid}-gold)`} stroke="#B45309" strokeWidth="1.2" />

                </g>

              )}



              {/* Seal Ice Crystal Tiara */}

              {spec.prop === 'seal_spots' && (

                <g>

                  <polygon points="46,30 42,16 52,24 60,10 68,24 78,16 74,30" fill="#38BDF8" stroke="#0284C7" strokeWidth="2" strokeLinejoin="round" />

                  <circle cx="60" cy="10" r="3" fill="#FFFFFF" />

                </g>

              )}



              {/* Marine Princess Royal Pearl Tiara & Shell Necklace */}

              {spec.prop === 'marine_princess' && (

                <g>

                  {/* Royal Pearl Tiara */}

                  <g>

                    {/* Tiara Arch Base */}

                    <path d="M42 27 Q60 21 78 27" stroke={`url(#${uid}-gold)`} strokeWidth="2.5" fill="none" strokeLinecap="round" />

                    {/* Golden Crown Peaks */}

                    <polygon points="46,26 43,15 50,22 60,8 70,22 77,15 74,26" fill={`url(#${uid}-gold)`} stroke="#B45309" strokeWidth="1.4" strokeLinejoin="round" />

                    {/* Tiara Central Giant Pink Pearl */}

                    <circle cx="60" cy="9" r="4.2" fill="#FCE7F3" stroke="#EC4899" strokeWidth="1.2" />

                    <circle cx="58.8" cy="7.8" r="1.3" fill="#FFFFFF" />

                    {/* Side White Pearls */}

                    <circle cx="43" cy="15" r="2.8" fill="#FFFFFF" stroke="#0284C7" strokeWidth="1" />

                    <circle cx="50" cy="22" r="2.2" fill="#FFFFFF" stroke="#0284C7" strokeWidth="0.8" />

                    <circle cx="70" cy="22" r="2.2" fill="#FFFFFF" stroke="#0284C7" strokeWidth="0.8" />

                    <circle cx="77" cy="15" r="2.8" fill="#FFFFFF" stroke="#0284C7" strokeWidth="1" />

                  </g>



                  {/* Pearl Necklace with Sakura Pink Shell Pendant */}

                  <g>

                    {/* Necklace Pearl String */}

                    {[

                      { cx: 40, cy: 74 },

                      { cx: 45, cy: 78 },

                      { cx: 51, cy: 81 },

                      { cx: 69, cy: 81 },

                      { cx: 75, cy: 78 },

                      { cx: 80, cy: 74 },

                    ].map((p, i) => (

                      <circle key={i} cx={p.cx} cy={p.cy} r="2.2" fill="#FFFFFF" stroke="#38BDF8" strokeWidth="0.8" />

                    ))}

                    {/* Center Shell Pendant (桜色ホタテ貝) */}

                    <g transform="translate(60, 84)">

                      {/* Golden Bail Loop */}

                      <circle cx="0" cy="-3" r="1.8" fill="none" stroke="#F59E0B" strokeWidth="1.2" />

                      {/* Scallop Shell */}

                      <path

                        d="M-8 -1 C-10 6 -4 10 0 10 C4 10 10 6 8 -1 C5 -3 -5 -3 -8 -1 Z"

                        fill="#F472B6"

                        stroke="#DB2777"

                        strokeWidth="1.5"

                      />

                      {/* Shell Ribs */}

                      <line x1="0" y1="-1" x2="0" y2="8" stroke="#FDF2F8" strokeWidth="1.2" />

                      <line x1="-4" y1="0" x2="-2" y2="7" stroke="#FDF2F8" strokeWidth="1" />

                      <line x1="4" y1="0" x2="2" y2="7" stroke="#FDF2F8" strokeWidth="1" />

                      {/* Tiny Pearl Inside Shell */}

                      <circle cx="0" cy="3" r="1.8" fill="#FFFFFF" stroke="#F472B6" strokeWidth="0.6" />

                    </g>

                  </g>

                </g>

              )}

            </g>

          );

        })()}

      </svg>

    </motion.div>

  );

}



// ==========================================

// 3A. HOURGLASS TIMER VISUAL (砂時計のタイマー模様)

// ==========================================

function HourglassTimerVisual({ progress = 0, color, glow, isRunning, height = 92 }) {

  const p = Math.max(0, Math.min(1, progress));

  const width = (height * 60) / 90;

  // Top bulb spans y 8..45, bottom bulb spans y 45..82 (viewBox 60 x 90)

  const topSurfaceY = 10 + 34 * p; // sand surface drops as time passes

  const topDip = 4 * (1 - p) * Math.min(1, p * 6); // slight funnel dip while draining

  const bottomSurfaceY = 82 - 30 * p; // pile grows as time passes

  const moundPeak = 9 * Math.min(1, p * 4);

  const isFlowing = isRunning && p > 0 && p < 1;

  const glassPath =

    'M11 8 L49 8 C49 28 34 37 33 45 C34 53 49 62 49 82 L11 82 C11 62 26 53 27 45 C26 37 11 28 11 8 Z';



  return (

    <motion.div

      animate={isRunning ? { rotate: [0, -1.5, 0, 1.5, 0] } : { rotate: 0 }}

      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}

      style={{ width, height, filter: `drop-shadow(0 0 10px ${glow})` }}

    >

      <svg viewBox="0 0 60 90" width={width} height={height} className="overflow-visible">

        <defs>

          <clipPath id="hourglassGlassClip">

            <path d={glassPath} />

          </clipPath>

          <linearGradient id="hourglassGlassShine" x1="0" y1="0" x2="1" y2="0">

            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.28" />

            <stop offset="35%" stopColor="#FFFFFF" stopOpacity="0.04" />

            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />

          </linearGradient>

        </defs>



        {/* Glass body */}

        <path d={glassPath} fill="currentColor" fillOpacity="0.06" />



        <g clipPath="url(#hourglassGlassClip)">

          {/* Upper sand (drains downward) */}

          {p < 1 && (

            <path

              d={`M6 ${topSurfaceY} Q30 ${topSurfaceY + topDip} 54 ${topSurfaceY} L54 46 L6 46 Z`}

              fill={color}

              fillOpacity="0.92"

            />

          )}



          {/* Lower sand pile (grows upward) */}

          {p > 0 && (

            <path

              d={`M6 84 L54 84 L54 ${bottomSurfaceY} Q30 ${bottomSurfaceY - moundPeak} 6 ${bottomSurfaceY} Z`}

              fill={color}

              fillOpacity="0.92"

            />

          )}



          {/* Falling sand stream */}

          {isFlowing && (

            <motion.line

              x1="30"

              y1="44"

              x2="30"

              y2={bottomSurfaceY - moundPeak + 1}

              stroke={color}

              strokeWidth="1.6"

              strokeLinecap="round"

              strokeDasharray="2 2.5"

              animate={{ strokeDashoffset: [0, -9] }}

              transition={{ duration: 0.45, repeat: Infinity, ease: 'linear' }}

            />

          )}



          {/* Glass shine */}

          <rect x="0" y="0" width="60" height="90" fill="url(#hourglassGlassShine)" />

        </g>



        {/* Glass outline */}

        <path

          d={glassPath}

          fill="none"

          stroke="currentColor"

          strokeOpacity="0.55"

          strokeWidth="1.6"

          strokeLinejoin="round"

        />



        {/* Wooden-style caps & pillars */}

        <rect x="5" y="2" width="50" height="6" rx="2.5" fill={color} fillOpacity="0.85" />

        <rect x="5" y="82" width="50" height="6" rx="2.5" fill={color} fillOpacity="0.85" />

        <rect x="7" y="8" width="2.4" height="74" rx="1.2" fill="currentColor" fillOpacity="0.35" />

        <rect x="50.6" y="8" width="2.4" height="74" rx="1.2" fill="currentColor" fillOpacity="0.35" />

      </svg>

    </motion.div>

  );

}



// ==========================================

// 2.5 LUXURIOUS RADIANT RAINBOW JEWEL STAR

// 最高ランクの達成を祝福する超豪華なクリスタルスター

// ==========================================



const LuxuriousRainbowStar = memo(function LuxuriousRainbowStar({ size = 18, className = '' }) {

  const uid = useId().replace(/:/g, '');

  return (

    <motion.div

      animate={{

        scale: [1, 1.14, 1],

        rotate: [0, 4, -4, 0],

      }}

      transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}

      className={`relative flex items-center justify-center shrink-0 ${className}`}

      style={{ width: size, height: size }}

    >

      <svg

        viewBox="0 0 36 36"

        className="w-full h-full overflow-visible"

        style={{

          filter:

            'drop-shadow(0 0 3px rgba(250, 204, 21, 0.95)) drop-shadow(0 0 7px rgba(236, 72, 153, 0.8)) drop-shadow(0 0 12px rgba(56, 189, 248, 0.65))',

        }}

      >

        <defs>

          {/* Radial Ambient Aura Glow */}

          <radialGradient id={`${uid}-aura`} cx="50%" cy="50%" r="50%">

            <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.9" />

            <stop offset="40%" stopColor="#F472B6" stopOpacity="0.6" />

            <stop offset="70%" stopColor="#818CF8" stopOpacity="0.3" />

            <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />

          </radialGradient>



          {/* Prism Facet 1: Gold -> Amber */}

          <linearGradient id={`${uid}-facet-gold`} x1="0%" y1="0%" x2="100%" y2="100%">

            <stop offset="0%" stopColor="#FFFBEB" />

            <stop offset="35%" stopColor="#FDE047" />

            <stop offset="100%" stopColor="#D97706" />

          </linearGradient>



          {/* Prism Facet 2: Rose -> Magenta */}

          <linearGradient id={`${uid}-facet-pink`} x1="0%" y1="0%" x2="100%" y2="100%">

            <stop offset="0%" stopColor="#FDF2F8" />

            <stop offset="40%" stopColor="#FB7185" />

            <stop offset="100%" stopColor="#BE185D" />

          </linearGradient>



          {/* Prism Facet 3: Sky -> Deep Violet */}

          <linearGradient id={`${uid}-facet-violet`} x1="0%" y1="0%" x2="100%" y2="100%">

            <stop offset="0%" stopColor="#F5F3FF" />

            <stop offset="40%" stopColor="#A78BFA" />

            <stop offset="100%" stopColor="#581C87" />

          </linearGradient>



          {/* Prism Facet 4: Cyan -> Emerald */}

          <linearGradient id={`${uid}-facet-cyan`} x1="0%" y1="0%" x2="100%" y2="100%">

            <stop offset="0%" stopColor="#ECFEFF" />

            <stop offset="40%" stopColor="#38BDF8" />

            <stop offset="100%" stopColor="#059669" />

          </linearGradient>



          {/* Rainbow Prism Flare for Diagonal Rays */}

          <linearGradient id={`${uid}-flare-grad`} x1="0%" y1="0%" x2="100%" y2="100%">

            <stop offset="0%" stopColor="#F43F5E" />

            <stop offset="25%" stopColor="#FB923C" />

            <stop offset="50%" stopColor="#FACC15" />

            <stop offset="75%" stopColor="#34D399" />

            <stop offset="100%" stopColor="#60A5FA" />

          </linearGradient>



          {/* Brilliant Core Diamond Glow */}

          <radialGradient id={`${uid}-core`} cx="50%" cy="50%" r="50%">

            <stop offset="0%" stopColor="#FFFFFF" />

            <stop offset="55%" stopColor="#FEF08A" stopOpacity="0.95" />

            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />

          </radialGradient>

        </defs>



        {/* 1. Ambient Pulsing Aura Halo */}

        <circle cx="18" cy="18" r="16.5" fill={`url(#${uid}-aura)`} />



        {/* 2. Secondary 4-Point Rainbow Diamond Flare (45-degree tilted back rays) */}

        <g transform="rotate(45 18 18)">

          <path

            d="M18 4 L21 15 L32 18 L21 21 L18 32 L15 21 L4 18 L15 15 Z"

            fill={`url(#${uid}-flare-grad)`}

            stroke="#FEF08A"

            strokeWidth="0.5"

            opacity="0.85"

          />

        </g>



        {/* 3. Primary 8-Point Faceted Crystal Star */}

        <g stroke="#FFFFFF" strokeWidth="0.45" strokeLinejoin="round">

          {/* North Point: Facet Left (Gold) & Right (Pink) */}

          <polygon points="18,18 18,1.5 14,14" fill={`url(#${uid}-facet-gold)`} />

          <polygon points="18,18 18,1.5 22,14" fill={`url(#${uid}-facet-pink)`} />



          {/* East Point: Facet Top (Pink) & Bottom (Violet) */}

          <polygon points="18,18 34.5,18 22,14" fill={`url(#${uid}-facet-pink)`} />

          <polygon points="18,18 34.5,18 22,22" fill={`url(#${uid}-facet-violet)`} />



          {/* South Point: Facet Right (Violet) & Left (Cyan) */}

          <polygon points="18,18 18,34.5 22,22" fill={`url(#${uid}-facet-violet)`} />

          <polygon points="18,18 18,34.5 14,22" fill={`url(#${uid}-facet-cyan)`} />



          {/* West Point: Facet Bottom (Cyan) & Top (Gold) */}

          <polygon points="18,18 1.5,18 14,22" fill={`url(#${uid}-facet-cyan)`} />

          <polygon points="18,18 1.5,18 14,14" fill={`url(#${uid}-facet-gold)`} />



          {/* Diagonal Corner Crystal Facets (NE, SE, SW, NW) */}

          <polygon points="18,18 22,14 28,8 24,17" fill={`url(#${uid}-facet-gold)`} />

          <polygon points="18,18 24,19 28,28 19,24" fill={`url(#${uid}-facet-pink)`} />

          <polygon points="18,18 17,24 8,28 12,19" fill={`url(#${uid}-facet-violet)`} />

          <polygon points="18,18 12,17 8,8 17,12" fill={`url(#${uid}-facet-cyan)`} />

        </g>



        {/* 4. Center Brilliant Gemstone Star & Core Glow */}

        <circle cx="18" cy="18" r="5.5" fill={`url(#${uid}-core)`} />

        {/* Tiny Pure White Center Cross Starlet */}

        <polygon

          points="18,10.5 19.5,16.5 25.5,18 19.5,19.5 18,25.5 16.5,19.5 10.5,18 16.5,16.5"

          fill="#FFFFFF"

        />



        {/* 5. Floating Ambient Sparkles (✨ top-left & bottom-right & top-right) */}

        <polygon points="6,5 7.2,1.8 8.4,5 11.6,6.2 8.4,7.4 7.2,10.6 6,7.4 2.8,6.2" fill="#FFFFFF" opacity="0.95" />

        <polygon points="29,27 29.9,24.8 30.8,27 33,27.9 30.8,28.8 29.9,31 29,28.8 26.8,27.9" fill="#FDE047" opacity="0.9" />

        <circle cx="30" cy="7" r="1.3" fill="#67E8F9" opacity="0.85" />

        <circle cx="7" cy="30" r="1.3" fill="#F472B6" opacity="0.85" />

      </svg>

    </motion.div>

  );

});



// ==========================================

// 3. ROAMING PLAYGROUND WHILE TIMER IS RUNNING

// ==========================================



const RoamingCompanionPlayground = memo(function RoamingCompanionPlayground({

  unlockedCharacters,

  selectedCharIds,

  isRunning,

  activeColor,

  onPetCharacter,

  streak = 0,

  todayMinutes = 0,

  activeTask = null,

  externalSpeechBubble = null,

}) {

  const companions = useMemo(() => {

    const picked = (selectedCharIds || [])

      .map((id) => CHARACTERS.find((c) => c.id === id))

      .filter(Boolean)

      .slice(0, MAX_SELECTED_CHARACTERS);

    if (picked.length > 0) return picked;

    return [unlockedCharacters[0] || CHARACTERS[0]];

  }, [unlockedCharacters, selectedCharIds]);



  const [positions, setPositions] = useState(() =>

    companions.map((_, i) => ({

      x: i === 0 ? 0 : i === 1 ? -85 : 85,

      y: 0,

      flip: false,

      emote: null,

    }))

  );



  const [speechBubble, setSpeechBubble] = useState(null);

  const [bouncingCharId, setBouncingCharId] = useState(null);

  const bouncingTimeoutRef = useRef(null);

  const pendingTimeoutsRef = useRef([]);



  // Respond to external speech bubble trigger (e.g. from item reward feeding)

  useEffect(() => {

    if (externalSpeechBubble) {

      setSpeechBubble(externalSpeechBubble);

      if (externalSpeechBubble.charId) {

        setBouncingCharId(externalSpeechBubble.charId);

        if (bouncingTimeoutRef.current) clearTimeout(bouncingTimeoutRef.current);

        bouncingTimeoutRef.current = setTimeout(() => {

          setBouncingCharId(null);

        }, 800);

      }

    }

  }, [externalSpeechBubble]);



  useEffect(() => {

    return () => {

      if (bouncingTimeoutRef.current) clearTimeout(bouncingTimeoutRef.current);

      pendingTimeoutsRef.current.forEach((t) => clearTimeout(t));

      pendingTimeoutsRef.current = [];

    };

  }, []);



  // Auto-dismiss dialogue bubble after 5 seconds

  useEffect(() => {

    if (!speechBubble) return;

    const timer = setTimeout(() => {

      setSpeechBubble(null);

    }, 5000);

    return () => clearTimeout(timer);

  }, [speechBubble]);



  const handleCharacterTap = (char) => {

    // 1. Play cheerful jump/bounce animation with cleanup

    if (bouncingTimeoutRef.current) clearTimeout(bouncingTimeoutRef.current);

    setBouncingCharId(char.id);

    bouncingTimeoutRef.current = setTimeout(() => {

      setBouncingCharId(null);

    }, 450);



    // 2. Retrieve rich personalized dialogue / advice / cheerful chitchat

    const text = getCompanionDialogue({

      charId: char.id,

      charName: char.name,

      isRunning,

      streak,

      todayMinutes,

      taskTitle: activeTask?.title || '',

    });



    setSpeechBubble({

      charId: char.id,

      charName: char.name,

      color: char.color || activeColor || '#6366f1',

      text,

      key: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,

    });



    // 3. Trigger pet hearts in parent

    if (onPetCharacter) {

      onPetCharacter(char);

    }

  };



  const handleBubbleTap = () => {

    if (!speechBubble) return;

    const char = companions.find((c) => c.id === speechBubble.charId) || companions[0];

    if (char) {

      handleCharacterTap(char);

    }

  };



  useEffect(() => {

    // Clear any pending movement timeouts when switching states

    pendingTimeoutsRef.current.forEach((t) => clearTimeout(t));

    pendingTimeoutsRef.current = [];



    if (!isRunning) {

      setPositions(

        companions.map((_, i) => ({

          x: i === 0 ? 0 : i === 1 ? -85 : 85,

          y: i === 0 ? 4 : -10, // Main companion sits slightly in front

          flip: false,

          emote: null,

          isWalking: false,

        }))

      );

      return;

    }



    // Vertical boundary constants: from above the start button to below the timer circle UI

    const MIN_Y = -58; // Background / deep (near timer circle)

    const MAX_Y = 18;  // Foreground (just above start button)



    // Smooth, leisurely roaming interval (3.8s cycle)

    // Rule:

    // 1. Move in full 2.5D space (X: left/right, Y: depth between start button and timer UI).

    // 2. Always face the direction of travel (flip in place first when turning around, then walk).

    const moveInterval = setInterval(() => {

      setPositions((prev) => {

        return prev.map((current, idx) => {

          if (idx >= companions.length) return current;



          // 70% chance to roam, 30% chance to pause/idle in place

          const willMove = Math.random() < 0.72;

          if (!willMove) {

            return current;

          }



          const deltaX = (Math.random() - 0.5) * 80;

          const deltaY = (Math.random() - 0.5) * 50;

          const nextX = Math.max(-110, Math.min(110, current.x + deltaX));

          const nextY = Math.max(MIN_Y, Math.min(MAX_Y, current.y + deltaY));

          const movedDistX = nextX - current.x;



          // Determine horizontal facing direction:

          // If significant horizontal movement (>= 6px), face the travel direction

          // If mostly vertical/depth movement, preserve current facing

          let desiredFlip = current.flip;

          if (Math.abs(movedDistX) >= 6) {

            desiredFlip = movedDistX < 0; // true: left, false: right

          }



          if (desiredFlip !== current.flip) {

            // Must turn around first before moving forward!

            // Step 1: Flip in place immediately

            const turnDelay = 340; // ms for flip animation to finish

            const moveTimeout = setTimeout(() => {

              setPositions((p) => {

                if (!p[idx]) return p;

                const next = [...p];

                next[idx] = {

                  ...next[idx],

                  x: nextX,

                  y: nextY,

                  isWalking: true,

                };

                return next;

              });

              const stopWalkTimeout = setTimeout(() => {

                setPositions((p) => {

                  if (!p[idx]) return p;

                  const next = [...p];

                  next[idx] = { ...next[idx], isWalking: false };

                  return next;

                });

              }, 2500);

              pendingTimeoutsRef.current.push(stopWalkTimeout);

            }, turnDelay);

            pendingTimeoutsRef.current.push(moveTimeout);



            // Turn in place first without moving position

            return {

              ...current,

              flip: desiredFlip,

            };

          } else {

            // Already facing the movement direction -> move forward smoothly in 2.5D space

            const stopWalkTimeout = setTimeout(() => {

              setPositions((p) => {

                if (!p[idx]) return p;

                const next = [...p];

                next[idx] = { ...next[idx], isWalking: false };

                return next;

              });

            }, 2500);

            pendingTimeoutsRef.current.push(stopWalkTimeout);



            return {

              x: nextX,

              y: nextY,

              flip: desiredFlip,

              isWalking: true,

            };

          }

        });

      });

    }, 3800);



    return () => {

      clearInterval(moveInterval);

      pendingTimeoutsRef.current.forEach((t) => clearTimeout(t));

      pendingTimeoutsRef.current = [];

    };

  }, [isRunning, companions]);



  // Compute speech bubble tail position aligned with the speaking character

  const activeCharPos = useMemo(() => {

    if (!speechBubble) return null;

    const idx = companions.findIndex((c) => c.id === speechBubble.charId);

    if (idx === -1) return { x: 0 };

    return positions[idx] || { x: 0 };

  }, [speechBubble, companions, positions]);



  const tailX = activeCharPos ? Math.max(-95, Math.min(95, activeCharPos.x)) : 0;



  return (

    <div className="relative w-full max-w-md h-[clamp(5.2rem,13dvh,7.2rem)] flex items-center justify-center overflow-visible my-0 select-none">

      {/* Comic Speech Bubble */}

      <AnimatePresence>

        {speechBubble && (

          <motion.div

            key={speechBubble.key}

            initial={{ opacity: 0, y: 10 + (activeCharPos?.y || 0) * 0.7, scale: 0.9 }}

            animate={{ opacity: 1, y: (activeCharPos?.y || 0) * 0.7, scale: 1 }}

            exit={{ opacity: 0, y: -6 + (activeCharPos?.y || 0) * 0.7, scale: 0.9 }}

            transition={{ type: 'spring', stiffness: 380, damping: 24 }}

            onClick={handleBubbleTap}

            style={{ zIndex: 350 }}

            className="absolute bottom-[175px] sm:bottom-[185px] max-w-[310px] w-[92%] sm:w-auto px-4 py-2 rounded-2xl bg-white/95 dark:bg-zinc-800/95 text-slate-800 dark:text-slate-100 shadow-2xl border border-indigo-200/60 dark:border-zinc-700/60 backdrop-blur-md cursor-pointer transition-colors companion-dialogue-bubble pointer-events-auto touch-manipulation select-none"

          >

            <div className="flex items-center justify-between gap-2 mb-1">

              <div className="flex items-center gap-1.5">

                <div className="w-4 h-4 rounded-full overflow-hidden shrink-0 flex items-center justify-center bg-current/10">

                  <CuteCharacterAvatar charId={speechBubble.charId} size={16} />

                </div>

                <span

                  className="text-[11px] font-extrabold tracking-tight"

                  style={{ color: speechBubble.color }}

                >

                  {speechBubble.charName}

                </span>

              </div>

              <div className="text-[9px] opacity-50 tracking-tight flex items-center gap-1.5">

                <span>タップで次のセリフ</span>

                <button

                  type="button"

                  onClick={(e) => {

                    e.stopPropagation();

                    setSpeechBubble(null);

                  }}

                  className="hover:opacity-100 p-0.5 rounded-full hover:bg-black/10 dark:hover:bg-white/10"

                >

                  ✕

                </button>

              </div>

            </div>

            <p className="text-xs sm:text-[13px] font-bold leading-snug tracking-tight">

              「{speechBubble.text.replace(/【|】/g, '')}」

            </p>



            {/* Bubble Tail pointing directly to the character */}

            <svg

              className="absolute -bottom-2 text-white/95 dark:text-zinc-800/95 transition-all duration-300 drop-shadow"

              style={{

                left: `calc(50% + ${tailX}px)`,

                transform: 'translateX(-50%)',

              }}

              width="16"

              height="8"

              viewBox="0 0 16 8"

            >

              <path d="M0 0 L8 8 L16 0 Z" fill="currentColor" />

            </svg>

          </motion.div>

        )}

      </AnimatePresence>



      {/* Glowing 2.5D Stage Floor Oval */}

      <div

        className="w-80 h-16 rounded-[100%] opacity-25 blur-[6px] absolute bottom-0 transition-colors duration-700 pointer-events-none"

        style={{ backgroundColor: activeColor }}

      />



      {companions.map((char, idx) => {

        const pos = positions[idx] || { x: 0, y: 0, flip: false, emote: null };

        const isBouncing = bouncingCharId === char.id;

        const isSpeaking = speechBubble?.charId === char.id;



        // Depth-based z-index: foreground characters (larger Y) naturally appear in front!

        const depthZIndex = Math.round((pos.y || 0) + 100);

        const finalZIndex = isSpeaking ? 300 : isBouncing ? 250 : depthZIndex;



        // Unified character size for all companions (main and side companions are identical size)

        // Character size scaled by 1.1x (88 -> 97px) as requested

        const UNIFIED_ROAMING_SIZE = 97;



        return (

          <motion.div

            key={char.id}

            animate={{

              x: pos.x,

              y: pos.y + (isBouncing ? -16 : 0),

              scale: isBouncing ? 1.15 : 1,

            }}

            transition={

              isBouncing

                ? { type: 'spring', stiffness: 420, damping: 10 }

                : isRunning

                ? {

                    x: { duration: 2.6, ease: [0.25, 0.1, 0.25, 1] },

                    y: { duration: 2.6, ease: [0.25, 0.1, 0.25, 1] },

                  }

                : {

                    x: { duration: 1.2, ease: 'easeOut' },

                    y: { duration: 1.0, ease: 'easeOut' },

                  }

            }

            whileHover={{ scale: 1.06 }}

            whileTap={{ scale: 0.94 }}

            onClick={() => handleCharacterTap(char)}

            className="absolute bottom-1 cursor-pointer flex flex-col items-center group touch-manipulation select-none"

            style={{ zIndex: finalZIndex }}

          >



            <div

              style={{

                transform: pos.flip ? 'scaleX(-1)' : 'scaleX(1)',

                transition: 'transform 0.32s cubic-bezier(0.25, 0.1, 0.25, 1)',

              }}

            >

              <CuteCharacterAvatar

                charId={char.id}

                size={UNIFIED_ROAMING_SIZE}

                isRunning={isRunning}

                isWalking={pos.isWalking}

                isBouncing={isBouncing}

              />

            </div>



            <span className="opacity-0 group-hover:opacity-95 transition-opacity text-[10px] font-bold px-2 py-0.5 rounded-full bg-black/65 text-white backdrop-blur-sm -mt-1.5 shadow flex items-center gap-1 companion-name-tag">

              <span>{char.name}</span>

              <span className="text-[9px] opacity-75">💬</span>

            </span>

          </motion.div>

        );

      })}

          </div>

  );

});



// ==========================================

// ==========================================

// 3B. SCENIC BACKGROUND THEME ARTWORK (60fps GPU-Accelerated Dynamic Scenery)

// ==========================================



// Deterministic seed particles for butter-smooth 60fps animations without recalculation jitter

const SCENIC_PARTICLES_20 = [

  { id: 0, left: 8, top: 12, delay: 0.1, dur: 4.2, size: 4 },

  { id: 1, left: 24, top: 48, delay: 0.8, dur: 5.5, size: 6 },

  { id: 2, left: 42, top: 18, delay: 1.7, dur: 4.8, size: 5 },

  { id: 3, left: 58, top: 64, delay: 0.4, dur: 5.8, size: 7 },

  { id: 4, left: 76, top: 32, delay: 1.3, dur: 5.1, size: 4 },

  { id: 5, left: 88, top: 82, delay: 2.2, dur: 4.5, size: 6 },

  { id: 6, left: 14, top: 76, delay: 0.3, dur: 5.4, size: 5 },

  { id: 7, left: 32, top: 62, delay: 1.1, dur: 4.3, size: 7 },

  { id: 8, left: 68, top: 22, delay: 1.9, dur: 5.2, size: 5 },

  { id: 9, left: 82, top: 52, delay: 0.6, dur: 4.7, size: 6 },

  { id: 10, left: 6, top: 35, delay: 1.4, dur: 5.6, size: 4 },

  { id: 11, left: 52, top: 86, delay: 1.8, dur: 4.9, size: 7 },

  { id: 12, left: 64, top: 40, delay: 0.2, dur: 6.0, size: 5 },

  { id: 13, left: 91, top: 14, delay: 1.5, dur: 4.4, size: 6 },

  { id: 14, left: 20, top: 25, delay: 2.1, dur: 5.0, size: 5 },

  { id: 15, left: 38, top: 90, delay: 0.7, dur: 4.6, size: 7 },

  { id: 16, left: 72, top: 68, delay: 1.2, dur: 5.3, size: 6 },

  { id: 17, left: 85, top: 38, delay: 2.0, dur: 4.8, size: 4 },

  { id: 18, left: 46, top: 6, delay: 0.9, dur: 5.7, size: 6 },

  { id: 19, left: 10, top: 58, delay: 1.6, dur: 4.5, size: 5 },

];



// Dedicated High-Fidelity Sakura Blizzard Particles (52 Petals with True 3D Depth & Instant Full-Screen Flow)

const SAKURA_PETALS = [

  // Front Layer (近景・手前をサッと舞い抜ける大輪の花びら 24-30px)

  { id: 'sf-1', left: 4, size: 26, dur: 4.8, delay: -0.8, sway: 70, rotStart: 15, layer: 'front', rotDir: 1 },

  { id: 'sf-2', left: 24, size: 28, dur: 4.5, delay: -2.3, sway: 85, rotStart: 45, layer: 'front', rotDir: -1 },

  { id: 'sf-3', left: 46, size: 25, dur: 5.0, delay: -3.7, sway: 75, rotStart: 80, layer: 'front', rotDir: 1 },

  { id: 'sf-4', left: 68, size: 29, dur: 4.6, delay: -1.4, sway: 90, rotStart: 120, layer: 'front', rotDir: -1 },

  { id: 'sf-5', left: 88, size: 27, dur: 4.9, delay: -4.1, sway: 80, rotStart: 30, layer: 'front', rotDir: 1 },

  { id: 'sf-6', left: 35, size: 30, dur: 4.4, delay: -2.9, sway: 95, rotStart: 95, layer: 'front', rotDir: -1 },

  { id: 'sf-7', left: 78, size: 26, dur: 4.7, delay: -0.2, sway: 75, rotStart: 60, layer: 'front', rotDir: 1 },

  { id: 'sf-8', left: 14, size: 28, dur: 5.1, delay: -3.4, sway: 85, rotStart: 135, layer: 'front', rotDir: -1 },



  // Mid Layer (中景・主役の桜花びら 16-22px・画面全体を満たす華やかな舞)

  { id: 'sm-1', left: 2, size: 18, dur: 6.8, delay: -0.5, sway: 50, rotStart: 10, layer: 'mid', rotDir: 1 },

  { id: 'sm-2', left: 9, size: 20, dur: 6.3, delay: -2.1, sway: 58, rotStart: 55, layer: 'mid', rotDir: -1 },

  { id: 'sm-3', left: 17, size: 17, dur: 7.2, delay: -4.3, sway: 45, rotStart: 140, layer: 'mid', rotDir: 1 },

  { id: 'sm-4', left: 22, size: 19, dur: 6.5, delay: -1.2, sway: 62, rotStart: 35, layer: 'mid', rotDir: -1 },

  { id: 'sm-5', left: 30, size: 21, dur: 6.1, delay: -3.5, sway: 68, rotStart: 110, layer: 'mid', rotDir: 1 },

  { id: 'sm-6', left: 38, size: 18, dur: 7.0, delay: -5.7, sway: 52, rotStart: 75, layer: 'mid', rotDir: -1 },

  { id: 'sm-7', left: 44, size: 20, dur: 6.4, delay: -2.7, sway: 60, rotStart: 165, layer: 'mid', rotDir: 1 },

  { id: 'sm-8', left: 51, size: 17, dur: 7.4, delay: -4.9, sway: 48, rotStart: 25, layer: 'mid', rotDir: -1 },

  { id: 'sm-9', left: 58, size: 19, dur: 6.6, delay: -0.9, sway: 65, rotStart: 90, layer: 'mid', rotDir: 1 },

  { id: 'sm-10', left: 65, size: 21, dur: 6.2, delay: -3.8, sway: 70, rotStart: 130, layer: 'mid', rotDir: -1 },

  { id: 'sm-11', left: 73, size: 18, dur: 7.1, delay: -5.2, sway: 54, rotStart: 50, layer: 'mid', rotDir: 1 },

  { id: 'sm-12', left: 81, size: 20, dur: 6.3, delay: -2.4, sway: 60, rotStart: 105, layer: 'mid', rotDir: -1 },

  { id: 'sm-13', left: 89, size: 17, dur: 7.5, delay: -4.6, sway: 44, rotStart: 155, layer: 'mid', rotDir: 1 },

  { id: 'sm-14', left: 95, size: 19, dur: 6.7, delay: -1.7, sway: 58, rotStart: 20, layer: 'mid', rotDir: -1 },

  { id: 'sm-15', left: 6, size: 19, dur: 6.5, delay: -3.2, sway: 62, rotStart: 85, layer: 'mid', rotDir: 1 },

  { id: 'sm-16', left: 27, size: 18, dur: 7.3, delay: -5.9, sway: 50, rotStart: 125, layer: 'mid', rotDir: -1 },

  { id: 'sm-17', left: 55, size: 20, dur: 6.2, delay: -1.5, sway: 66, rotStart: 40, layer: 'mid', rotDir: 1 },

  { id: 'sm-18', left: 70, size: 18, dur: 6.9, delay: -4.0, sway: 56, rotStart: 115, layer: 'mid', rotDir: -1 },

  { id: 'sm-19', left: 84, size: 21, dur: 6.4, delay: -0.3, sway: 64, rotStart: 70, layer: 'mid', rotDir: 1 },

  { id: 'sm-20', left: 92, size: 18, dur: 7.2, delay: -3.0, sway: 48, rotStart: 145, layer: 'mid', rotDir: -1 },



  // Back Layer (遠景・春霞の奥 11-15px・ふんわり優しく舞う桜吹雪)

  { id: 'sb-1', left: 1, size: 13, dur: 8.8, delay: -1.1, sway: 38, rotStart: 30, layer: 'back', rotDir: 1 },

  { id: 'sb-2', left: 7, size: 12, dur: 9.6, delay: -3.3, sway: 34, rotStart: 85, layer: 'back', rotDir: -1 },

  { id: 'sb-3', left: 13, size: 14, dur: 8.4, delay: -5.8, sway: 40, rotStart: 150, layer: 'back', rotDir: 1 },

  { id: 'sb-4', left: 19, size: 11, dur: 10.2, delay: -0.6, sway: 30, rotStart: 40, layer: 'back', rotDir: -1 },

  { id: 'sb-5', left: 26, size: 13, dur: 9.1, delay: -2.8, sway: 36, rotStart: 115, layer: 'back', rotDir: 1 },

  { id: 'sb-6', left: 33, size: 15, dur: 8.2, delay: -5.0, sway: 42, rotStart: 70, layer: 'back', rotDir: -1 },

  { id: 'sb-7', left: 40, size: 12, dur: 9.8, delay: -1.8, sway: 35, rotStart: 160, layer: 'back', rotDir: 1 },

  { id: 'sb-8', left: 47, size: 14, dur: 8.6, delay: -4.1, sway: 38, rotStart: 25, layer: 'back', rotDir: -1 },

  { id: 'sb-9', left: 53, size: 11, dur: 10.4, delay: -6.4, sway: 30, rotStart: 95, layer: 'back', rotDir: 1 },

  { id: 'sb-10', left: 60, size: 13, dur: 9.0, delay: -0.9, sway: 36, rotStart: 135, layer: 'back', rotDir: -1 },

  { id: 'sb-11', left: 66, size: 15, dur: 8.3, delay: -3.1, sway: 40, rotStart: 55, layer: 'back', rotDir: 1 },

  { id: 'sb-12', left: 72, size: 12, dur: 10.0, delay: -5.5, sway: 34, rotStart: 100, layer: 'back', rotDir: -1 },

  { id: 'sb-13', left: 79, size: 14, dur: 8.8, delay: -2.2, sway: 38, rotStart: 145, layer: 'back', rotDir: 1 },

  { id: 'sb-14', left: 86, size: 11, dur: 10.6, delay: -4.7, sway: 28, rotStart: 15, layer: 'back', rotDir: -1 },

  { id: 'sb-15', left: 93, size: 13, dur: 9.0, delay: -6.8, sway: 35, rotStart: 65, layer: 'back', rotDir: 1 },

  { id: 'sb-16', left: 98, size: 12, dur: 9.7, delay: -1.4, sway: 32, rotStart: 120, layer: 'back', rotDir: -1 },

  { id: 'sb-17', left: 16, size: 13, dur: 8.9, delay: -4.4, sway: 37, rotStart: 45, layer: 'back', rotDir: 1 },

  { id: 'sb-18', left: 36, size: 14, dur: 8.5, delay: -6.1, sway: 39, rotStart: 170, layer: 'back', rotDir: -1 },

  { id: 'sb-19', left: 62, size: 12, dur: 9.4, delay: -2.5, sway: 33, rotStart: 80, layer: 'back', rotDir: 1 },

  { id: 'sb-20', left: 76, size: 14, dur: 8.7, delay: -4.9, sway: 37, rotStart: 10, layer: 'back', rotDir: -1 },

  { id: 'sb-21', left: 85, size: 11, dur: 10.1, delay: -0.4, sway: 29, rotStart: 90, layer: 'back', rotDir: 1 },

  { id: 'sb-22', left: 49, size: 13, dur: 9.2, delay: -3.7, sway: 35, rotStart: 130, layer: 'back', rotDir: -1 },

  { id: 'sb-23', left: 21, size: 12, dur: 9.5, delay: -5.3, sway: 32, rotStart: 50, layer: 'back', rotDir: 1 },

  { id: 'sb-24', left: 90, size: 14, dur: 8.6, delay: -1.6, sway: 39, rotStart: 160, layer: 'back', rotDir: -1 },

];



function ThemeSceneryBackdrop({ scenery, isRunning }) {

  if (!scenery) return null;



  // Multiplier for timer running boost (faster, more alive & immersive)

  const speed = isRunning ? 0.65 : 1.0;



  return (

    <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">



      {/* 0-A. PASTEL MILKY (ぽてミルキー / 愛されパステルテーマ) - 超軽量GPU加速パステルオーラ */}

      {scenery === 'pastel-milky' && (

        <div className="relative w-full h-full pointer-events-none overflow-hidden">

          <div className="absolute inset-0 bg-gradient-to-b from-[#FFFDF9] via-[#FFF5F7] to-[#FFF0F3]" />

          <motion.div

            className="absolute -top-20 -left-20 w-80 h-80 rounded-full blur-2xl opacity-50 gpu-accelerated"

            style={{ background: 'radial-gradient(circle, #FFE4E8 0%, transparent 70%)' }}

            animate={isRunning ? {

              scale: [1, 1.18, 1],

              x: [0, 15, 0],

              y: [0, 12, 0],

            } : { scale: 1, x: 0, y: 0 }}

            transition={{ duration: 6 * speed, repeat: isRunning ? Infinity : 0, ease: 'easeInOut' }}

          />

          <motion.div

            className="absolute top-1/3 -right-20 w-80 h-80 rounded-full blur-2xl opacity-40 gpu-accelerated"

            style={{ background: 'radial-gradient(circle, #E0F2FE 0%, transparent 70%)' }}

            animate={isRunning ? {

              scale: [1.08, 0.95, 1.08],

              x: [0, -14, 0],

            } : { scale: 1, x: 0 }}

            transition={{ duration: 7 * speed, repeat: isRunning ? Infinity : 0, ease: 'easeInOut' }}

          />

          <motion.div

            className="absolute bottom-10 left-1/4 w-72 h-72 rounded-full blur-2xl opacity-35 gpu-accelerated"

            style={{ background: 'radial-gradient(circle, #FEF3C7 0%, transparent 70%)' }}

            animate={isRunning ? {

              scale: [0.96, 1.12, 0.96],

            } : { scale: 1 }}

            transition={{ duration: 8 * speed, repeat: isRunning ? Infinity : 0, ease: 'easeInOut' }}

          />

          {[

            { x: '18%', y: '28%', size: 14, delay: 0 },

            { x: '82%', y: '36%', size: 18, delay: 1.2 },

            { x: '25%', y: '68%', size: 12, delay: 2.1 },

            { x: '75%', y: '72%', size: 16, delay: 0.8 },

          ].map((bubble, bIdx) => (

            <motion.div

              key={bIdx}

              className="absolute rounded-full border border-pink-300/30 bg-white/50 gpu-accelerated"

              style={{

                left: bubble.x,

                top: bubble.y,

                width: bubble.size,

                height: bubble.size,

                boxShadow: '0 2px 6px rgba(255, 182, 193, 0.25)',

              }}

              animate={isRunning ? {

                y: [0, -14, 0],

                opacity: [0.35, 0.75, 0.35],

                scale: [1, 1.1, 1],

              } : { y: 0, opacity: 0.4, scale: 1 }}

              transition={{

                duration: 3 + bIdx,

                delay: bubble.delay,

                repeat: isRunning ? Infinity : 0,

                ease: 'easeInOut',

              }}

            />

          ))}

        </div>

      )}



      {/* 0. MINIMAL DARK (スレート黒 / デフォルトテーマ) - 呼吸するサイバーパルスリング・浮遊星屑・流星 */}

      {scenery === 'minimal-dark' && (

        <div className="relative w-full h-full">

          {/* Subtle Ambient Vignette Base */}

          <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F17] via-[#111827] to-[#0A0E17]" />



          {/* Concentric Breathing Timer Rings centered on the timer display */}

          <div className="absolute top-[38%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] flex items-center justify-center">

            {/* Outer Pulse Ring */}

            <motion.div

              className="absolute w-[320px] h-[320px] rounded-full border border-sky-400/20"

              animate={{

                scale: isRunning ? [0.92, 1.18, 0.92] : [0.95, 1.08, 0.95],

                opacity: isRunning ? [0.15, 0.45, 0.15] : [0.12, 0.28, 0.12],

              }}

              transition={{ duration: 3.2 * speed, repeat: Infinity, ease: 'easeInOut' }}

            />

            {/* Mid Pulse Ring */}

            <motion.div

              className="absolute w-[240px] h-[240px] rounded-full border border-sky-400/25 border-dashed"

              animate={{

                scale: isRunning ? [0.94, 1.14, 0.94] : [0.96, 1.06, 0.96],

                rotate: isRunning ? [0, 360] : [0, 180],

                opacity: isRunning ? [0.2, 0.5, 0.2] : [0.15, 0.32, 0.15],

              }}

              transition={{

                scale: { duration: 2.6 * speed, repeat: Infinity, ease: 'easeInOut' },

                rotate: { duration: isRunning ? 20 : 50, repeat: Infinity, ease: 'linear' },

                opacity: { duration: 2.6 * speed, repeat: Infinity, ease: 'easeInOut' }

              }}

            />

            {/* Inner Soft Glow */}

            <motion.div

              className="absolute w-[170px] h-[170px] rounded-full bg-sky-500/10 blur-xl"

              animate={{

                scale: isRunning ? [0.9, 1.25, 0.9] : [0.95, 1.1, 0.95],

                opacity: isRunning ? [0.2, 0.55, 0.2] : [0.15, 0.35, 0.15],

              }}

              transition={{ duration: 2.2 * speed, repeat: Infinity, ease: 'easeInOut' }}

            />

          </div>



          {/* Shooting Star traversing the night sky */}

          <motion.div

            className="absolute top-16 -left-32 w-48 h-0.5 bg-gradient-to-r from-transparent via-sky-300 to-white"

            style={{ transform: 'rotate(-28deg)' }}

            animate={{

              x: [-100, 550],

              y: [-50, 240],

              opacity: [0, 1, 0]

            }}

            transition={{

              duration: 1.4,

              repeat: Infinity,

              repeatDelay: isRunning ? 4 : 7,

              ease: 'easeOut'

            }}

          />



          {/* Floating Neon Stardust Particles */}

          {SCENIC_PARTICLES_20.slice(0, 15).map(p => (

            <motion.div

              key={p.id}

              className="absolute rounded-full bg-sky-400"

              style={{

                left: p.left + '%',

                top: (p.top + 30) + '%',

                width: p.size + 'px',

                height: p.size + 'px',

                boxShadow: '0 0 8px rgba(56, 189, 248, 0.7)'

              }}

              animate={{

                y: [0, -280],

                x: [-12, 12, -12],

                opacity: [0, 0.85, 0],

                scale: [0.6, 1.3, 0.6]

              }}

              transition={{

                duration: p.dur * speed,

                delay: p.delay,

                repeat: Infinity,

                ease: 'easeInOut'

              }}

            />

          ))}

        </div>

      )}



      {/* 1. MINIMAL LIGHT (パール白) - 水面のクリスタル波紋・シャンパン光粒子 */}

      {scenery === 'minimal-light' && (

        <div className="relative w-full h-full">

          {/* Elegant Pearl Gradient Base */}

          <div className="absolute inset-0 bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-[#E2E8F0]" />



          {/* Expanding Crystal Ripple Rings */}

          <div className="absolute top-[38%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] flex items-center justify-center">

            <motion.div

              className="absolute rounded-full border border-sky-300/40"

              animate={{

                width: ['120px', '320px'],

                height: ['120px', '320px'],

                opacity: [0.55, 0],

              }}

              transition={{ duration: 3.5 * speed, repeat: Infinity, ease: 'easeOut' }}

            />

            <motion.div

              className="absolute rounded-full border border-indigo-300/35"

              animate={{

                width: ['120px', '320px'],

                height: ['120px', '320px'],

                opacity: [0.55, 0],

              }}

              transition={{ duration: 3.5 * speed, delay: 1.75 * speed, repeat: Infinity, ease: 'easeOut' }}

            />

          </div>



          {/* Rising Champagne Light Specks */}

          {SCENIC_PARTICLES_20.slice(0, 14).map(p => (

            <motion.div

              key={p.id}

              className="absolute rounded-full bg-sky-400"

              style={{

                left: p.left + '%',

                top: (p.top + 35) + '%',

                width: (p.size + 1) + 'px',

                height: (p.size + 1) + 'px',

                boxShadow: '0 0 6px rgba(56, 189, 248, 0.5)'

              }}

              animate={{

                y: [0, -260],

                opacity: [0, 0.65, 0],

                scale: [0.7, 1.2, 0.7]

              }}

              transition={{

                duration: p.dur * speed,

                delay: p.delay,

                repeat: Infinity,

                ease: 'easeInOut'

              }}

            />

          ))}

        </div>

      )}



      {/* 2. MEADOW (そよ風の草原) - 風に流れる雲・揺れる丘・舞う綿毛 */}

      {scenery === 'meadow' && (

        <div className="relative w-full h-full">

          {/* Base Sky & Mountain Background */}

          <div className="absolute inset-0 bg-gradient-to-b from-[#7DD3FC] via-[#BAE6FD] to-[#BBF7D0]" />



          {/* Pulsing Sun */}

          <motion.div

            className="absolute top-12 right-10 w-24 h-24 rounded-full bg-yellow-200"

            style={{ boxShadow: '0 0 50px rgba(254, 240, 138, 0.85)' }}

            animate={{ scale: [1, 1.2, 1], opacity: [0.75, 1, 0.75] }}

            transition={{ duration: 3.0, repeat: Infinity, ease: 'easeInOut' }}

          />



          {/* Fast-Drifting Soft Clouds (目に見えて左から右へスーッと流れる雲) */}

          <motion.div

            className="absolute top-20 -left-40 flex items-center gap-0 opacity-85"

            animate={{ x: [-120, 520] }}

            transition={{ duration: 13 * speed, repeat: Infinity, ease: 'linear' }}

          >

            <div className="w-24 h-9 bg-white rounded-full -mr-6" />

            <div className="w-16 h-12 bg-white rounded-full -mb-3" />

            <div className="w-20 h-8 bg-white rounded-full -ml-4" />

          </motion.div>



          <motion.div

            className="absolute top-44 -left-48 flex items-center gap-0 opacity-75"

            animate={{ x: [-140, 520] }}

            transition={{ duration: 17 * speed, delay: 4, repeat: Infinity, ease: 'linear' }}

          >

            <div className="w-28 h-10 bg-white rounded-full -mr-8" />

            <div className="w-20 h-14 bg-white rounded-full -mb-4" />

            <div className="w-24 h-9 bg-white rounded-full -ml-6" />

          </motion.div>



          {/* Rolling Emerald Hills Foreground */}

          <div className="absolute bottom-0 inset-x-0 h-44 overflow-hidden pointer-events-none">

            <svg viewBox="0 0 400 200" preserveAspectRatio="none" className="w-full h-full">

              <path d="M0 80 Q120 20 240 70 T400 50 L400 200 L0 200 Z" fill="#34D399" fillOpacity="0.75" />

              <path d="M0 110 Q160 50 300 100 T400 90 L400 200 L0 200 Z" fill="#10B981" fillOpacity="0.88" />

            </svg>

          </div>



          {/* Swaying Dandelion Fluffs & Petals (舞い上がる草原の綿毛) */}

          {SCENIC_PARTICLES_20.slice(0, 14).map(p => (

            <motion.div

              key={p.id}

              className="absolute rounded-full bg-white"

              style={{

                left: p.left + '%',

                top: (p.top + 45) + '%',

                width: p.size + 'px',

                height: p.size + 'px',

                boxShadow: '0 0 6px rgba(255, 255, 255, 0.9)'

              }}

              animate={{

                y: [0, -320],

                x: [0, 45, 10],

                opacity: [0, 0.9, 0],

                scale: [0.6, 1.2, 0.6]

              }}

              transition={{

                duration: p.dur * speed,

                delay: p.delay,

                repeat: Infinity,

                ease: 'easeInOut'

              }}

            />

          ))}

        </div>

      )}



      {/* 3. SUNSET (夕凪の茜空) - 沈む夕陽・茜雲・飛翔する鳥たち・黄金ダスト */}

      {scenery === 'sunset' && (

        <div className="relative w-full h-full">

          <div className="absolute inset-0 bg-gradient-to-b from-[#7C2D12] via-[#C2410C] to-[#F59E0B]" />



          {/* Huge Glowing Sun */}

          <motion.div

            className="absolute top-28 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full bg-gradient-to-t from-yellow-300 to-amber-100"

            style={{ boxShadow: '0 0 70px rgba(251, 191, 36, 0.85)' }}

            animate={{ scale: [1, 1.15, 1], opacity: [0.85, 1, 0.85] }}

            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}

          />



          {/* Sunset Horizon Silhouette */}

          <div className="absolute bottom-0 inset-x-0 h-36">

            <svg viewBox="0 0 400 160" preserveAspectRatio="none" className="w-full h-full">

              <path d="M0 60 Q100 20 200 55 T400 45 L400 160 L0 160 Z" fill="#431407" fillOpacity="0.85" />

            </svg>

          </div>



          {/* Flying Birds Crossing the Dusk Sky */}

          {[0, 1, 2].map(idx => (

            <motion.div

              key={idx}

              className="absolute top-24 -left-20 flex items-center"

              animate={{

                x: [-60, 500],

                y: [idx * 20, idx * 20 - 15, idx * 20]

              }}

              transition={{

                duration: (14 + idx * 3) * speed,

                delay: idx * 3.5,

                repeat: Infinity,

                ease: 'linear'

              }}

            >

              <svg width="24" height="12" viewBox="0 0 24 12" className="text-amber-950 fill-current opacity-75">

                <path d="M0 6 Q6 0 12 6 Q18 0 24 6 Q18 3 12 8 Q6 3 0 6 Z" />

              </svg>

            </motion.div>

          ))}



          {/* Glowing Twilight Dust Particles */}

          {SCENIC_PARTICLES_20.slice(0, 15).map(p => (

            <motion.div

              key={p.id}

              className="absolute rounded-full bg-amber-300"

              style={{

                left: p.left + '%',

                top: (p.top + 35) + '%',

                width: p.size + 'px',

                height: p.size + 'px',

                boxShadow: '0 0 8px rgba(251, 191, 36, 0.8)'

              }}

              animate={{

                y: [0, -280],

                x: [-15, 15, -15],

                opacity: [0, 0.9, 0],

                scale: [0.5, 1.3, 0.5]

              }}

              transition={{

                duration: p.dur * speed,

                delay: p.delay,

                repeat: Infinity,

                ease: 'easeInOut'

              }}

            />

          ))}

        </div>

      )}



      {/* 4. OCEAN (エメラルドの海) - 揺れる水面・ポコポコ湧き上がるエメラルド気泡 */}

      {scenery === 'ocean' && (

        <div className="relative w-full h-full">

          <div className="absolute inset-0 bg-gradient-to-b from-[#065F46] via-[#0D9488] to-[#14B8A6]" />



          {/* Sunbeams underwater */}

          <div className="absolute inset-0 opacity-25 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-yellow-200 via-transparent to-transparent" />



          {/* Swaying Wave Silhouettes at the bottom */}

          <div className="absolute bottom-0 inset-x-0 h-48 overflow-hidden pointer-events-none">

            <motion.div

              className="w-[120%] -ml-[10%]"

              animate={{ x: [-18, 18, -18] }}

              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}

            >

              <svg viewBox="0 0 500 160" preserveAspectRatio="none" className="w-full h-32">

                <path d="M0 60 C120 20 220 90 350 40 C420 10 470 60 500 50 L500 160 L0 160 Z" fill="#042F2E" fillOpacity="0.65" />

              </svg>

            </motion.div>

          </div>



          {/* Rising Ocean Bubbles (下から上へポコポコ昇る気泡) */}

          {SCENIC_PARTICLES_20.map(p => (

            <motion.div

              key={p.id}

              className="absolute rounded-full border border-teal-200/70 bg-teal-100/30 backdrop-blur-sm"

              style={{

                left: p.left + '%',

                top: (p.top + 45) + '%',

                width: (p.size * 2) + 'px',

                height: (p.size * 2) + 'px',

                boxShadow: '0 0 6px rgba(204, 251, 241, 0.6)'

              }}

              animate={{

                y: [0, -420],

                x: [-12, 12, -12],

                opacity: [0, 0.85, 0],

                scale: [0.6, 1.25, 0.6]

              }}

              transition={{

                duration: p.dur * speed,

                delay: p.delay,

                repeat: Infinity,

                ease: 'easeInOut'

              }}

            />

          ))}

        </div>

      )}



      {/* 5. SAKURA (桜舞う春霞) - 風に乗りハラハラと美しく舞い散る本格的な桜吹雪 */}

      {scenery === 'sakura' && (

        <div className="relative w-full h-full overflow-hidden">

          {/* Spring Bloom Atmosphere (春霞のやわらかなピンク空グラデーション) */}

          <div className="absolute inset-0 bg-gradient-to-b from-[#FFF0F3] via-[#FCE7F3] to-[#FBCFE8]" />



          {/* Spring Sun Glow & Warm Light Beam (右上からのあたたかな春の日差し) */}

          <div className="absolute -top-10 -right-10 w-72 h-72 rounded-full bg-gradient-to-br from-amber-100/50 via-rose-200/40 to-transparent blur-3xl pointer-events-none" />

          <div className="absolute top-12 right-20 w-36 h-36 rounded-full bg-white/40 blur-2xl pointer-events-none" />



          {/* Gentle Spring Wind Breeze Streams (風の通り道・柔らかなそよ風ライン) */}

          <motion.div

            className="absolute top-1/4 -left-20 w-96 h-16 bg-gradient-to-r from-transparent via-white/20 to-transparent rotate-12 blur-xl pointer-events-none"

            animate={{ x: [-80, 500], opacity: [0, 0.45, 0] }}

            transition={{ duration: 7 * speed, repeat: Infinity, ease: 'easeInOut' }}

          />

          <motion.div

            className="absolute top-2/3 -left-32 w-[32rem] h-20 bg-gradient-to-r from-transparent via-pink-200/25 to-transparent rotate-6 blur-2xl pointer-events-none"

            animate={{ x: [-100, 600], opacity: [0, 0.35, 0] }}

            transition={{ duration: 9 * speed, delay: 2.5, repeat: Infinity, ease: 'easeInOut' }}

          />



          {/* Top-Right Cherry Blossom Tree Silhouette (画面上隅の淡い満開の桜枝葉アクセント) */}

          <div className="absolute top-0 right-0 w-64 h-48 pointer-events-none opacity-25">

            <svg viewBox="0 0 200 150" className="w-full h-full">

              <path

                d="M 200 0 C 160 10 130 35 110 70 C 95 95 70 115 40 120"

                stroke="#9D174D"

                strokeWidth="4"

                fill="none"

                strokeLinecap="round"

              />

              <path

                d="M 140 45 C 120 40 105 45 90 55"

                stroke="#9D174D"

                strokeWidth="2.5"

                fill="none"

                strokeLinecap="round"

              />

              {/* Blossom Clusters on Branch */}

              <circle cx="110" cy="70" r="14" fill="#F472B6" />

              <circle cx="125" cy="60" r="12" fill="#FB7185" />

              <circle cx="95" cy="55" r="10" fill="#FDA4AF" />

              <circle cx="75" cy="110" r="13" fill="#F472B6" />

              <circle cx="50" cy="118" r="11" fill="#FB7185" />

              <circle cx="150" cy="35" r="15" fill="#FDA4AF" />

              <circle cx="170" cy="20" r="16" fill="#F472B6" />

            </svg>

          </div>



          {/* CSS Animation Keyframes for Continuous 60fps Full-Screen Sakura Blizzard */}

          <style>{`

            @keyframes sakuraFallSwirl {

              0% {

                transform: translate3d(0, -10vh, 0) rotateZ(var(--rz)) rotateY(0deg) rotateX(0deg);

                opacity: 0;

              }

              6% {

                opacity: var(--op);

              }

              24% {

                transform: translate3d(calc(var(--sway) * 0.5px), 18vh, 0) rotateZ(calc(var(--rz) + 80deg * var(--dir))) rotateY(180deg) rotateX(45deg);

              }

              50% {

                transform: translate3d(calc(var(--sway) * -0.3px), 48vh, 0) rotateZ(calc(var(--rz) + 180deg * var(--dir))) rotateY(360deg) rotateX(90deg);

              }

              74% {

                transform: translate3d(calc(var(--sway) * 0.9px), 78vh, 0) rotateZ(calc(var(--rz) + 260deg * var(--dir))) rotateY(540deg) rotateX(135deg);

              }

              92% {

                opacity: var(--op);

              }

              100% {

                transform: translate3d(calc(var(--sway) * 0.4px), 112vh, 0) rotateZ(calc(var(--rz) + 360deg * var(--dir))) rotateY(720deg) rotateX(180deg);

                opacity: 0;

              }

            }

          `}</style>



          {/* SVG Definitions for Realistic Petal Gradients & Depth */}

          <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">

            <defs>

              <linearGradient id="sakuraGradFront" x1="15%" y1="0%" x2="85%" y2="100%">

                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.98" />

                <stop offset="30%" stopColor="#FFE4E6" stopOpacity="0.96" />

                <stop offset="75%" stopColor="#FB7185" stopOpacity="0.95" />

                <stop offset="100%" stopColor="#BE123C" stopOpacity="0.98" />

              </linearGradient>

              <linearGradient id="sakuraGradMid" x1="20%" y1="0%" x2="80%" y2="100%">

                <stop offset="0%" stopColor="#FFF1F2" stopOpacity="0.96" />

                <stop offset="35%" stopColor="#FCE7F3" stopOpacity="0.95" />

                <stop offset="70%" stopColor="#F472B6" stopOpacity="0.92" />

                <stop offset="100%" stopColor="#E11D48" stopOpacity="0.95" />

              </linearGradient>

              <linearGradient id="sakuraGradBack" x1="25%" y1="0%" x2="75%" y2="100%">

                <stop offset="0%" stopColor="#FFF5F7" stopOpacity="0.85" />

                <stop offset="40%" stopColor="#FBCFE8" stopOpacity="0.80" />

                <stop offset="100%" stopColor="#F472B6" stopOpacity="0.75" />

              </linearGradient>

            </defs>

          </svg>



          {/* Multi-layered Falling Sakura Petals (52枚の立体レイヤー桜吹雪・常時満開) */}

          {SAKURA_PETALS.map(p => {

            const isFront = p.layer === 'front';

            const isBack = p.layer === 'back';

            const gradId = isFront ? 'url(#sakuraGradFront)' : isBack ? 'url(#sakuraGradBack)' : 'url(#sakuraGradMid)';

            const zIndex = isFront ? 10 : isBack ? 1 : 5;

            const op = isBack ? 0.75 : 0.96;



            return (

              <div

                key={p.id}

                className="absolute pointer-events-none will-change-transform"

                style={{

                  left: p.left + '%',

                  top: 0,

                  zIndex,

                  '--rz': p.rotStart + 'deg',

                  '--dir': p.rotDir,

                  '--sway': p.sway,

                  '--op': op,

                  animation: `sakuraFallSwirl ${p.dur * speed}s cubic-bezier(0.37, 0, 0.63, 1) infinite`,

                  animationDelay: `${p.delay * speed}s`,

                  filter: isFront

                    ? 'drop-shadow(0 4px 6px rgba(190,18,60,0.25))'

                    : 'drop-shadow(0 2px 3px rgba(244,63,94,0.18))'

                }}

              >

                <svg

                  width={p.size}

                  height={p.size * 1.15}

                  viewBox="0 0 32 36"

                  className="w-full h-full"

                >

                  {/* Real Sakura Petal with Characteristic Tip Notch & Curved Body */}

                  <path

                    d="M 16 3.5 C 18 1 21.5 1.5 24 4.5 C 27 8 28 13.5 25.5 20 C 23 26.5 17 32 16 33 C 15 32 9 26.5 6.5 20 C 4 13.5 5 8 8 4.5 C 10.5 1.5 14 1 16 3.5 Z"

                    fill={gradId}

                  />

                  {/* Translucent Central Vein / Sunlight Highlight */}

                  <path

                    d="M 16 6.5 C 16.8 12 16.3 22 16 29"

                    stroke="rgba(255,255,255,0.7)"

                    strokeWidth={isFront ? "1.2" : "0.8"}

                    strokeLinecap="round"

                  />

                </svg>

              </div>

            );

          })}

        </div>

      )}



      {/* 6. AURORA (極夜のオーロラ) - 揺らめくオーロラカーテン・星々・流星 */}

      {scenery === 'aurora' && (

        <div className="relative w-full h-full">

          <div className="absolute inset-0 bg-gradient-to-b from-[#022C22] via-[#064E3B] to-[#042F2E]" />



          {/* Shimmering Aurora Ribbon 1 */}

          <motion.div

            className="absolute top-8 -inset-x-20 h-56 bg-gradient-to-r from-emerald-500/0 via-emerald-400/35 to-teal-400/0 blur-2xl"

            animate={{

              x: [-40, 40, -40],

              scaleY: [0.85, 1.25, 0.85],

              opacity: [0.35, 0.75, 0.35]

            }}

            transition={{ duration: 4.8 * speed, repeat: Infinity, ease: 'easeInOut' }}

          />

          {/* Shimmering Aurora Ribbon 2 (Violet / Cyan) */}

          <motion.div

            className="absolute top-24 -inset-x-20 h-56 bg-gradient-to-r from-teal-400/0 via-fuchsia-400/30 to-emerald-400/0 blur-2xl"

            animate={{

              x: [35, -35, 35],

              scaleY: [1.2, 0.85, 1.2],

              opacity: [0.3, 0.65, 0.3]

            }}

            transition={{ duration: 5.5 * speed, delay: 1, repeat: Infinity, ease: 'easeInOut' }}

          />



          {/* Shooting Star */}

          <motion.div

            className="absolute top-20 -left-28 w-44 h-0.5 bg-gradient-to-r from-transparent via-teal-300 to-white"

            style={{ transform: 'rotate(-25deg)' }}

            animate={{ x: [-80, 520], y: [-40, 220], opacity: [0, 1, 0] }}

            transition={{ duration: 1.3, repeat: Infinity, repeatDelay: isRunning ? 4 : 7, ease: 'easeOut' }}

          />



          {/* Twinkling Northern Stars */}

          {SCENIC_PARTICLES_20.map(p => (

            <motion.div

              key={p.id}

              className="absolute rounded-full bg-emerald-200"

              style={{

                left: p.left + '%',

                top: (p.top * 0.7) + '%',

                width: (p.size - 1) + 'px',

                height: (p.size - 1) + 'px',

                boxShadow: '0 0 6px rgba(167, 243, 208, 0.9)'

              }}

              animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.3, 0.8] }}

              transition={{ duration: (p.dur * 0.5) * speed, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}

            />

          ))}

        </div>

      )}



      {/* 7. FOREST (木漏れ日の森) - 差し込む光線・舞い散る木の葉 */}

      {scenery === 'forest' && (

        <div className="relative w-full h-full">

          <div className="absolute inset-0 bg-gradient-to-b from-[#064E3B] via-[#047857] to-[#022C22]" />



          {/* Sunbeams / God Rays */}

          {[0, 1, 2].map(idx => (

            <motion.div

              key={idx}

              className="absolute -top-10 h-[500px] w-24 bg-gradient-to-b from-yellow-200/25 via-emerald-100/10 to-transparent blur-xl"

              style={{

                left: (20 + idx * 30) + '%',

                transformOrigin: 'top center',

                transform: 'rotate(-18deg)'

              }}

              animate={{

                opacity: [0.2, 0.55, 0.2],

                rotate: [-20, -16, -20]

              }}

              transition={{

                duration: (3.5 + idx) * speed,

                delay: idx * 0.8,

                repeat: Infinity,

                ease: 'easeInOut'

              }}

            />

          ))}



          {/* Falling Fresh Green Leaves (舞い落ちる新緑の葉) */}

          {SCENIC_PARTICLES_20.slice(0, 16).map(p => (

            <motion.div

              key={p.id}

              className="absolute pointer-events-none"

              style={{ left: p.left + '%', top: '-25px' }}

              animate={{

                y: [0, 850],

                x: [-15, 45, -10],

                rotate: [0, 270],

                opacity: [0, 0.9, 0.9, 0]

              }}

              transition={{

                duration: (p.dur + 1) * speed,

                delay: p.delay * 2,

                repeat: Infinity,

                ease: 'easeInOut'

              }}

            >

              <svg width={p.size * 3} height={p.size * 3} viewBox="0 0 24 24" className="text-emerald-400">

                <path d="M12 2 C18 6 22 14 12 22 C2 14 6 6 12 2 Z" fill="#34D399" fillOpacity="0.8" />

              </svg>

            </motion.div>

          ))}

        </div>

      )}



      {/* 8. SKY (天空の雲海) - 雄大に流れる雲・滑空する鳥たち */}

      {scenery === 'sky' && (

        <div className="relative w-full h-full">

          <div className="absolute inset-0 bg-gradient-to-b from-[#38BDF8] via-[#0284C7] to-[#0369A1]" />



          {/* Giant Drifting Cumulus Clouds */}

          <motion.div

            className="absolute top-16 -left-52 flex items-center gap-0 opacity-80"

            animate={{ x: [-140, 560] }}

            transition={{ duration: 15 * speed, repeat: Infinity, ease: 'linear' }}

          >

            <div className="w-36 h-12 bg-white rounded-full -mr-8" />

            <div className="w-24 h-16 bg-white rounded-full -mb-4" />

            <div className="w-28 h-11 bg-white rounded-full -ml-6" />

          </motion.div>



          <motion.div

            className="absolute top-48 -left-48 flex items-center gap-0 opacity-70"

            animate={{ x: [-120, 560] }}

            transition={{ duration: 19 * speed, delay: 5, repeat: Infinity, ease: 'linear' }}

          >

            <div className="w-32 h-10 bg-white rounded-full -mr-6" />

            <div className="w-20 h-14 bg-white rounded-full -mb-3" />

            <div className="w-24 h-9 bg-white rounded-full -ml-4" />

          </motion.div>



          {/* Soaring Birds */}

          {[0, 1].map(idx => (

            <motion.div

              key={idx}

              className="absolute top-32 -left-20"

              animate={{ x: [-60, 520], y: [idx * 30, idx * 30 - 20, idx * 30] }}

              transition={{ duration: (12 + idx * 4) * speed, delay: idx * 5, repeat: Infinity, ease: 'linear' }}

            >

              <svg width="22" height="10" viewBox="0 0 24 12" className="text-white fill-current opacity-80">

                <path d="M0 6 Q6 0 12 6 Q18 0 24 6 Q18 3 12 8 Q6 3 0 6 Z" />

              </svg>

            </motion.div>

          ))}



          {/* Wind & Airstream Light Particles (大空を流れる風の粒子) */}

          {SCENIC_PARTICLES_20.slice(0, 15).map(p => (

            <motion.div

              key={p.id}

              className="absolute rounded-full bg-white"

              style={{

                left: p.left + '%',

                top: (p.top + 30) + '%',

                width: p.size + 'px',

                height: p.size + 'px',

                boxShadow: '0 0 6px rgba(255, 255, 255, 0.8)'

              }}

              animate={{

                x: [-20, 80],

                y: [0, -180],

                opacity: [0, 0.85, 0],

                scale: [0.6, 1.2, 0.6]

              }}

              transition={{

                duration: p.dur * speed,

                delay: p.delay,

                repeat: Infinity,

                ease: 'easeInOut'

              }}

            />

          ))}

        </div>

      )}



      {/* 9. AUTUMN (紅葉の渓谷) - 舞い散る紅葉とイチョウの葉 */}

      {scenery === 'autumn' && (

        <div className="relative w-full h-full">

          <div className="absolute inset-0 bg-gradient-to-b from-[#78350F] via-[#B45309] to-[#D97706]" />



          {/* Falling Maple & Ginkgo Leaves */}

          {SCENIC_PARTICLES_20.map(p => {

            const isGold = p.id % 2 === 0;

            return (

              <motion.div

                key={p.id}

                className="absolute pointer-events-none"

                style={{ left: p.left + '%', top: '-30px' }}

                animate={{

                  y: [0, 850],

                  x: [-25, 55, -15],

                  rotate: [0, 360],

                  opacity: [0, 0.95, 0.95, 0]

                }}

                transition={{

                  duration: (p.dur + 1.2) * speed,

                  delay: p.delay * 2,

                  repeat: Infinity,

                  ease: 'easeInOut'

                }}

              >

                <svg width={p.size * 3 + 4} height={p.size * 3 + 4} viewBox="0 0 24 24">

                  <path

                    d="M12 2 L14 8 L20 7 L16 12 L21 16 L14 16 L12 22 L10 16 L3 16 L8 12 L4 7 L10 8 Z"

                    fill={isGold ? '#FBBF24' : '#EF4444'}

                    fillOpacity="0.85"

                  />

                </svg>

              </motion.div>

            );

          })}

        </div>

      )}



      {/* 10. DEEP SEA (神秘の深海) - 遊泳する発光クラゲ・湧き上がる気泡 */}

      {scenery === 'deep-sea' && (

        <div className="relative w-full h-full">

          <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A] via-[#1E1B4B] to-[#312E81]" />



          {/* Drifting Bioluminescent Jellyfish */}

          {[0, 1].map(idx => (

            <motion.div

              key={idx}

              className="absolute pointer-events-none flex flex-col items-center"

              style={{ left: (25 + idx * 45) + '%', bottom: '-80px' }}

              animate={{

                y: [0, -780],

                x: [-15, 15, -15],

                scale: [0.92, 1.1, 0.92]

              }}

              transition={{

                duration: (14 + idx * 4) * speed,

                delay: idx * 6,

                repeat: Infinity,

                ease: 'easeInOut'

              }}

            >

              {/* Jellyfish Bell */}

              <div

                className="w-16 h-12 rounded-t-full bg-cyan-300/35 border border-cyan-200/60 backdrop-blur-sm"

                style={{ boxShadow: '0 0 20px rgba(103, 232, 249, 0.7)' }}

              />

              {/* Tentacles */}

              <div className="flex gap-1.5 -mt-1 opacity-75">

                <div className="w-0.5 h-10 bg-cyan-300/60 rounded-full" />

                <div className="w-0.5 h-14 bg-cyan-300/80 rounded-full" />

                <div className="w-0.5 h-10 bg-cyan-300/60 rounded-full" />

              </div>

            </motion.div>

          ))}



          {/* Deep Sea Bubbles */}

          {SCENIC_PARTICLES_20.map(p => (

            <motion.div

              key={p.id}

              className="absolute rounded-full border border-cyan-300/70 bg-cyan-400/25"

              style={{

                left: p.left + '%',

                top: (p.top + 45) + '%',

                width: (p.size * 2) + 'px',

                height: (p.size * 2) + 'px',

                boxShadow: '0 0 8px rgba(34, 211, 238, 0.7)'

              }}

              animate={{

                y: [0, -450],

                x: [-10, 10, -10],

                opacity: [0, 0.85, 0],

                scale: [0.6, 1.25, 0.6]

              }}

              transition={{

                duration: p.dur * speed,

                delay: p.delay,

                repeat: Infinity,

                ease: 'easeInOut'

              }}

            />

          ))}

        </div>

      )}



      {/* 11. SNOW (白銀の氷原) - 舞い降りる雪の結晶・スノーフレーク */}

      {scenery === 'snow' && (

        <div className="relative w-full h-full">

          <div className="absolute inset-0 bg-gradient-to-b from-[#0C4A6E] via-[#0284C7] to-[#E0F2FE]" />



          {/* Falling Snowflakes */}

          {SCENIC_PARTICLES_20.map(p => (

            <motion.div

              key={p.id}

              className="absolute rounded-full bg-white"

              style={{

                left: p.left + '%',

                top: '-20px',

                width: (p.size + 1) + 'px',

                height: (p.size + 1) + 'px',

                boxShadow: '0 0 8px rgba(255, 255, 255, 0.9)'

              }}

              animate={{

                y: [0, 850],

                x: [-20, 20, -20],

                opacity: [0, 0.95, 0.95, 0]

              }}

              transition={{

                duration: (p.dur + 0.5) * speed,

                delay: p.delay * 2,

                repeat: Infinity,

                ease: 'easeInOut'

              }}

            />

          ))}

        </div>

      )}



      {/* 12. COSMOS (星屑の宇宙) - 漂う惑星・高速流星・瞬く星屑 */}

      {scenery === 'cosmos' && (

        <div className="relative w-full h-full">

          <div className="absolute inset-0 bg-gradient-to-b from-[#030712] via-[#0F172A] to-[#1E1B4B]" />



          {/* Floating Ringed Planet */}

          <motion.div

            className="absolute top-20 right-10 flex items-center justify-center"

            animate={{ y: [-8, 8, -8], rotate: [-4, 4, -4] }}

            transition={{ duration: 6 * speed, repeat: Infinity, ease: 'easeInOut' }}

          >

            {/* Ring */}

            <div

              className="absolute w-24 h-6 border-2 border-indigo-400/60 rounded-full"

              style={{ transform: 'rotate(-20deg)', boxShadow: '0 0 12px rgba(129, 140, 248, 0.6)' }}

            />

            {/* Planet Body */}

            <div

              className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-400 via-purple-500 to-indigo-900"

              style={{ boxShadow: '0 0 20px rgba(168, 85, 247, 0.5)' }}

            />

          </motion.div>



          {/* Shooting Stars */}

          {[0, 1].map(idx => (

            <motion.div

              key={idx}

              className="absolute top-24 -left-32 w-52 h-0.5 bg-gradient-to-r from-transparent via-cyan-300 to-white"

              style={{ transform: 'rotate(-28deg)' }}

              animate={{ x: [-80, 560], y: [-40, 260], opacity: [0, 1, 0] }}

              transition={{

                duration: 1.2,

                delay: idx * 4,

                repeat: Infinity,

                repeatDelay: isRunning ? 3 : 6,

                ease: 'easeOut'

              }}

            />

          ))}



          {/* Twinkling Cosmic Stars */}

          {SCENIC_PARTICLES_20.map(p => (

            <motion.div

              key={p.id}

              className="absolute rounded-full bg-white"

              style={{

                left: p.left + '%',

                top: p.top + '%',

                width: p.size + 'px',

                height: p.size + 'px',

                boxShadow: '0 0 8px rgba(255, 255, 255, 0.9)'

              }}

              animate={{ opacity: [0.2, 1, 0.2], scale: [0.7, 1.3, 0.7] }}

              transition={{ duration: (p.dur * 0.5) * speed, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}

            />

          ))}

        </div>

      )}



      {/* 13. GALAXY (銀河の果て) - 渦巻く銀河・コズミックパーティクル */}

      {scenery === 'galaxy' && (

        <div className="relative w-full h-full">

          <div className="absolute inset-0 bg-gradient-to-b from-[#1E1035] via-[#2E1065] to-[#4C1D95]" />



          {/* Swirling Galaxy Center */}

          <div className="absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] flex items-center justify-center">

            <motion.div

              className="w-72 h-72 rounded-full bg-gradient-to-tr from-fuchsia-500/25 via-cyan-400/20 to-purple-600/30 blur-2xl"

              animate={{ rotate: [0, 360] }}

              transition={{ duration: isRunning ? 18 : 36, repeat: Infinity, ease: 'linear' }}

            />

          </div>



          {/* Radiating Cosmic Particles */}

          {SCENIC_PARTICLES_20.map(p => (

            <motion.div

              key={p.id}

              className="absolute rounded-full bg-fuchsia-300"

              style={{

                left: p.left + '%',

                top: (p.top + 25) + '%',

                width: p.size + 'px',

                height: p.size + 'px',

                boxShadow: '0 0 8px rgba(240, 171, 252, 0.8)'

              }}

              animate={{

                y: [0, -320],

                x: [-15, 15, -15],

                opacity: [0, 0.9, 0],

                scale: [0.6, 1.3, 0.6]

              }}

              transition={{

                duration: p.dur * speed,

                delay: p.delay,

                repeat: Infinity,

                ease: 'easeInOut'

              }}

            />

          ))}

        </div>

      )}



      {/* 14. SANCTUARY (神域の天界) - 神聖な光輪・舞い降りる天使の羽根 */}

      {scenery === 'sanctuary' && (

        <div className="relative w-full h-full">

          <div className="absolute inset-0 bg-gradient-to-b from-[#451A03] via-[#78350F] to-[#FEF3C7]" />



          {/* Divine Halo */}

          <div className="absolute top-24 left-1/2 -translate-x-1/2 flex items-center justify-center">

            <motion.div

              className="w-40 h-40 rounded-full border-2 border-amber-300/60 bg-amber-200/15 blur-sm"

              style={{ boxShadow: '0 0 40px rgba(251, 191, 36, 0.7)' }}

              animate={{ scale: [1, 1.15, 1], opacity: [0.65, 0.95, 0.65] }}

              transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}

            />

          </div>



          {/* Falling Angel Feathers (優雅に揺れながら舞い落ちる天使の羽根) */}

          {SCENIC_PARTICLES_20.slice(0, 16).map(p => (

            <motion.div

              key={p.id}

              className="absolute pointer-events-none"

              style={{ left: p.left + '%', top: '-30px' }}

              animate={{

                y: [0, 850],

                x: [-20, 45, -15],

                rotate: [-20, 20, -20],

                opacity: [0, 0.9, 0.9, 0]

              }}

              transition={{

                duration: (p.dur + 1.5) * speed,

                delay: p.delay * 2,

                repeat: Infinity,

                ease: 'easeInOut'

              }}

            >

              <svg width={p.size * 3 + 8} height={p.size * 4 + 8} viewBox="0 0 24 32">

                <path

                  d="M12 2 C16 8 20 18 18 28 C16 26 14 22 12 18 C10 22 8 26 6 28 C4 18 8 8 12 2 Z"

                  fill="#FFFFFF"

                  fillOpacity="0.85"

                />

              </svg>

            </motion.div>

          ))}

        </div>

      )}



          </div>

  );

}



const getDateString = () => {

  const d = new Date();

  const year = d.getFullYear();

  const month = String(d.getMonth() + 1).padStart(2, '0');

  const day = String(d.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;

};



const getYesterdayString = () => {

  const d = new Date();

  d.setDate(d.getDate() - 1);

  const year = d.getFullYear();

  const month = String(d.getMonth() + 1).padStart(2, '0');

  const day = String(d.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;

};



const parseDateKey = (str) => {

  if (!str || typeof str !== 'string') return null;

  const parts = str.split('-').map(Number);

  if (parts.length < 3 || isNaN(parts[0]) || isNaN(parts[1]) || isNaN(parts[2])) return null;

  return new Date(parts[0], parts[1] - 1, parts[2], 12, 0, 0);

};



const formatDateKey = (d) => {

  const y = d.getFullYear();

  const m = String(d.getMonth() + 1).padStart(2, '0');

  const day = String(d.getDate()).padStart(2, '0');

  return `${y}-${m}-${day}`;

};



/**

 * 達成日リスト（completedDates）から現在のアクティブな連続達成日数（streak）を計算

 * - 今日達成済みなら、今日から遡って連続日数を算出

 * - 今日未達だが昨日達成済みなら、昨日までの連続日数を保持（今日達成すれば+1日になる）

 * - 昨日も未達なら 0

 */

const calculateCurrentStreak = (datesList = [], refToday = getDateString()) => {

  if (!Array.isArray(datesList) || datesList.length === 0) return 0;

  const set = new Set(datesList);

  const todayDate = parseDateKey(refToday);

  if (!todayDate) return 0;



  let checkDate = new Date(todayDate);

  const isTodayDone = set.has(refToday);



  if (!isTodayDone) {

    checkDate.setDate(checkDate.getDate() - 1);

    const yesterdayKey = formatDateKey(checkDate);

    if (!set.has(yesterdayKey)) return 0;

  }



  let currentRun = 0;

  while (true) {

    const key = formatDateKey(checkDate);

    if (set.has(key)) {

      currentRun += 1;

      checkDate.setDate(checkDate.getDate() - 1);

    } else {

      break;

    }

  }

  return currentRun;

};



/**

 * 過去全履歴（completedDates）から過去最長連続日数（maxStreak）を確定計算

 */

const calculateMaxStreak = (datesList = []) => {

  if (!Array.isArray(datesList) || datesList.length === 0) return 0;

  const uniqueDates = Array.from(new Set(datesList))

    .filter((d) => typeof d === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(d))

    .sort();



  if (uniqueDates.length === 0) return 0;



  let maxStreak = 1;

  let currentRun = 1;



  for (let i = 1; i < uniqueDates.length; i++) {

    const prev = parseDateKey(uniqueDates[i - 1]);

    const curr = parseDateKey(uniqueDates[i]);

    if (!prev || !curr) continue;



    const diffDays = Math.round((curr - prev) / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {

      currentRun += 1;

      if (currentRun > maxStreak) maxStreak = currentRun;

    } else if (diffDays > 1) {

      currentRun = 1;

    }

  }



  return maxStreak;

};



/**

 * 過去の活動ログ（activityLogs）から、1タスク以上完了または集中実施（1分以上）のあった日付を抽出し、

 * completedDates とマージした完全な達成日リストを返す（過去データ・昨日実績の自動復元）

 * ※今日（todayStr）に関しては、タスク未完了なのに途中でリセットした部分ログ等で勝手に達成日にならないよう厳密に判定

 */

const deriveCompletedDatesFromLogsAndDates = (existingDates = [], logs = [], todayStr = getDateString()) => {

  const dateSet = new Set();



  // 1. 活動ログの中で実際にタスクが完了（taskCompleted: true）した日付のみを抽出

  if (Array.isArray(logs) && logs.length > 0) {

    logs.forEach((log) => {

      if (log.taskCompleted) {

        let dStr = log.dateStr;

        if (!dStr && log.completedAt) {

          try {

            const d = new Date(log.completedAt);

            if (!isNaN(d.getTime())) {

              dStr = formatDateKey(d);

            }

          } catch (e) {}

        }

        if (dStr && /^\d{4}-\d{2}-\d{2}$/.test(dStr)) {

          dateSet.add(dStr);

        }

      }

    });

  }



  // 2. 既存の達成日リストの精査（ログが存在する日はtaskCompletedがない限り除外、古いログなしデータのみ移行保護）

  if (Array.isArray(existingDates)) {

    existingDates.forEach((dStr) => {

      if (dStr && /^\d{4}-\d{2}-\d{2}$/.test(dStr)) {

        if (dStr === todayStr) {

          // 今日に関しては現在タスク完了または今日ログのtaskCompletedでのみ判定するため初期化時は含めない

          return;

        }

        const dayLogs = Array.isArray(logs)

          ? logs.filter((l) => (l.dateStr === dStr || (l.completedAt && l.completedAt.startsWith(dStr))))

          : [];

        if (dayLogs.length === 0) {

          dateSet.add(dStr);

        } else if (dayLogs.some((l) => l.taskCompleted)) {

          dateSet.add(dStr);

        }

      }

    });

  }



  return Array.from(dateSet).sort();

};



/**

 * 日付が変わった時のタスク状態デイリーリセット

 * 累積XPや活動ログ（activityLogs）、ストリークは保持し、タスクの「今日の進行状況」のみを初期化する

 */

const resetTasksForNewDay = (rawTasks = []) => {

  if (!Array.isArray(rawTasks)) return [];

  return rawTasks.map((t) => {

    const setMins = getTaskSetMinutes(t);

    const setMs = setMins * 60 * 1000;

    return {

      ...t,

      completed: false,

      completedSets: 0,

      creditedMinutes: 0,

      remainingMs: setMs,

    };

  });

};



/**

 * 過去の全タスク達成日リストを導出（全タスク達成した日のみ虹色の星、一部完了の日は黄色い王冠）

 */

const deriveAllAchievedDates = (existingAchievedDates = [], logs = [], currentTasks = [], todayStr = getDateString()) => {

  const set = new Set(Array.isArray(existingAchievedDates) ? existingAchievedDates : []);

  const dateTaskMap = {};

  if (Array.isArray(logs)) {

    logs.forEach((log) => {

      let dStr = log.dateStr;

      if (!dStr && log.completedAt) {

        try {

          const d = new Date(log.completedAt);

          if (!isNaN(d.getTime())) dStr = formatDateKey(d);

        } catch (e) {}

      }

      if (dStr && /^\d{4}-\d{2}-\d{2}$/.test(dStr)) {

        if (!dateTaskMap[dStr]) dateTaskMap[dStr] = new Set();

        if (log.taskCompleted && log.taskId) {

          dateTaskMap[dStr].add(log.taskId);

        }

      }

    });

  }



  const totalTaskCount = Math.max(1, (currentTasks || []).length);

  Object.entries(dateTaskMap).forEach(([dStr, taskSet]) => {

    if (dStr !== todayStr && taskSet.size >= totalTaskCount) {

      set.add(dStr);

    }

  });



  return Array.from(set).sort();

};



const formatTime = (ms) => {

  const totalSeconds = Math.max(0, Math.ceil(ms / 1000));

  const hours = Math.floor(totalSeconds / 3600);

  const minutes = Math.floor((totalSeconds % 3600) / 60);

  const seconds = totalSeconds % 60;



  if (hours > 0) {

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  }

  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

};



const formatDurationBadge = (totalMinutes) => {

  const h = Math.floor(totalMinutes / 60);

  const m = totalMinutes % 60;

  if (h > 0) {

    return m > 0 ? `${h}h${m}m` : `${h}h`;

  }

  return `${m}m`;

};



const formatTotalMinutesReadable = (totalMinutes) => {

  const h = Math.floor(totalMinutes / 60);

  const m = totalMinutes % 60;

  if (h > 0) {

    return `${h}時間${m > 0 ? ` ${m}分` : ''}`;

  }

  return `${m}分`;

};



// Standard Alarm Sounds & Manner-Mode Bypass Audio Engine

const ALARM_SOUNDS = [

  {

    id: 'marimba',

    label: '優しいマリンバ',

    src: './alarms/alarm-marimba.mp3',

    volume: 1.0,

  },

  {

    id: 'morning',

    label: '朝露（アコースティック）',

    src: './alarms/alarm-morning.mp3',

    volume: 1.0,

  },

  {

    id: 'chime',

    label: '星屑チャイム',

    src: './alarms/alarm-chime.mp3',

    volume: 1.0,

  },

  {

    id: 'digital',

    label: 'デジタルアラーム',

    src: './alarms/alarm-digital.mp3',

    volume: 1.0,

  },

  {

    id: 'bell',

    label: '目覚ましベル',

    src: './alarms/alarm-bell.mp3',

    volume: 1.0,

  },

  {

    id: 'beep',

    label: '電子タイマー音',

    src: './alarms/alarm-beep.mp3',

    volume: 1.0,

  },

];



// ==========================================

// AMBIENT BGM TRACKS & AUDIO ENGINE (Lo-Fi, Rain, Musicbox, Birds)

// ==========================================

const AMBIENT_BGM_TRACKS = [

  {

    id: 'off',

    label: 'BGMなし（消音）',

    src: null,

  },

  {

    id: 'latte',

    label: '放課後アイスラテ',

    src: './bgm/afternoon-latte.wav',

  },

  {

    id: 'rain',

    label: '雨降りの自習室',

    src: './bgm/rainy-study.wav',

  },

  {

    id: 'musicbox',

    label: 'ほしのオルゴール',

    src: './bgm/starry-musicbox.wav',

  },

  {

    id: 'walk',

    label: 'ひだまりの散歩道',

    src: './bgm/sunny-walk.wav',

  },

];



let currentBgmAudio = null;



const playAmbientBgm = (bgmId, volumePct = 50) => {

  const track = AMBIENT_BGM_TRACKS.find((t) => t.id === bgmId);

  if (!track || !track.src || volumePct <= 0) {

    stopAmbientBgm();

    return;

  }

  try {

    if (!currentBgmAudio) {

      currentBgmAudio = new Audio();

      currentBgmAudio.loop = true;

      currentBgmAudio.setAttribute('playsinline', 'true');

    }

    const targetVol = Math.max(0, Math.min(1, volumePct / 100));

    currentBgmAudio.volume = targetVol;

    if (!currentBgmAudio.src.endsWith(track.src.replace('./', ''))) {

      currentBgmAudio.src = track.src;

      currentBgmAudio.currentTime = 0;

    }

    currentBgmAudio.play().catch(() => {});

  } catch (e) {}

};



const stopAmbientBgm = () => {

  try {

    if (currentBgmAudio) {

      currentBgmAudio.pause();

    }

  } catch (e) {}

};



let silentKeepAliveAudio = null;

let activeAlarmAudio = null;

let alarmStopTimeout = null;

let vibrationLoopInterval = null;

let currentAlarmVolumePct = 80;



// High-fidelity Web Audio API engine for 100% working volume control on iOS/Android/PC

let globalAudioCtx = null;

let currentAlarmSourceNode = null;

let currentAlarmGainNode = null;

const audioBufferCache = {};

let isPreloadingBuffers = false;



const configurePlaybackAudioSession = (mannerPolicy = 'bypass') => {

  try {

    // iOS 16.4+ Web Audio Session API:

    // 'playback' ignores the physical Silent/Manner switch (マナーモード貫通)

    // 'ambient' respects the physical Silent/Manner switch (マナーモード時は自動消音)

    if (typeof navigator !== 'undefined' && 'audioSession' in navigator && navigator.audioSession) {

      navigator.audioSession.type = mannerPolicy === 'respect' ? 'ambient' : 'playback';

    }

  } catch (e) {

    // Ignore on unsupported browsers

  }

};



const getSharedAudioContext = () => {

  if (typeof window === 'undefined') return null;

  const AudioCtx = window.AudioContext || window.webkitAudioContext;

  if (!AudioCtx) return null;

  try {

    if (!globalAudioCtx || globalAudioCtx.state === 'closed') {

      globalAudioCtx = new AudioCtx();

    }

    if (globalAudioCtx.state === 'suspended') {

      globalAudioCtx.resume().catch(() => {});

    }

    return globalAudioCtx;

  } catch (e) {

    return null;

  }

};



// Pre-fetch & decode alarm MP3s into memory so volume scaling and playback start with zero latency

const preloadAlarmBuffers = () => {

  if (isPreloadingBuffers || typeof window === 'undefined') return;

  isPreloadingBuffers = true;

  const ctx = getSharedAudioContext();

  if (!ctx) return;



  ALARM_SOUNDS.forEach((snd) => {

    if (audioBufferCache[snd.id]) return;

    fetch(snd.src)

      .then((res) => res.arrayBuffer())

      .then((buf) => ctx.decodeAudioData(buf))

      .then((audioBuf) => {

        audioBufferCache[snd.id] = audioBuf;

      })

      .catch(() => {});

  });

};



// Continuous vibration pulse matching the exact durationSec

const startVibrationLoop = (durationMs) => {

  stopVibrationLoop();

  if (typeof navigator === 'undefined' || !navigator.vibrate) return;



  const pulse = () => {

    try {

      navigator.vibrate([350, 150, 350, 150]);

    } catch (e) {}

  };



  pulse();

  vibrationLoopInterval = setInterval(pulse, 1000);

};



const stopVibrationLoop = () => {

  if (vibrationLoopInterval) {

    clearInterval(vibrationLoopInterval);

    vibrationLoopInterval = null;

  }

  try {

    if (typeof navigator !== 'undefined' && navigator.vibrate) {

      navigator.vibrate(0);

    }

  } catch (e) {}

};



// High-fidelity Web Audio API & Manner-Mode Bypass Audio Engine

let synthOscillatorInterval = null;



// High-fidelity synthetic fallback (zero external files required, pleasant soothing tones)

const playSynthesizedMelody = (alarmSoundId = 'marimba', gainVal = 0.8) => {

  try {

    const ctx = getSharedAudioContext();

    if (!ctx) return;

    if (ctx.state === 'suspended') ctx.resume().catch(() => {});



    stopSynthesizedBeep();



    // Pentatonic scale frequencies for soothing wakeup

    const notesMarimba = [392.00, 493.88, 587.33, 659.25, 783.99, 659.25]; // G4, B4, D5, E5, G5, E5

    const notesChime = [659.25, 830.61, 987.77, 1318.51, 987.77]; // E5, G#5, B5, E6, B5

    let noteIdx = 0;



    const isGentle = alarmSoundId === 'marimba' || alarmSoundId === 'morning' || alarmSoundId === 'chime';

    const noteList = alarmSoundId === 'chime' ? notesChime : notesMarimba;

    const intervalMs = isGentle ? 360 : 320;



    const playTone = () => {

      try {

        if (!ctx || ctx.state === 'closed') return;

        const now = ctx.currentTime;

        const osc = ctx.createOscillator();

        const gain = ctx.createGain();



        if (isGentle) {

          osc.type = alarmSoundId === 'chime' ? 'sine' : 'triangle';

          const freq = noteList[noteIdx % noteList.length];

          noteIdx++;

          osc.frequency.setValueAtTime(freq, now);



          const targetVolume = Math.max(0.05, Math.min(1.0, gainVal));

          gain.gain.setValueAtTime(targetVolume * 0.7, now);

          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);



          osc.connect(gain);

          gain.connect(ctx.destination);

          osc.start(now);

          osc.stop(now + 0.38);

        } else {

          // Classic penetrative beep for 'digital', 'bell', 'beep'

          osc.type = 'square';

          osc.frequency.setValueAtTime(920, now);

          osc.frequency.setValueAtTime(1840, now + 0.08);



          const targetVolume = Math.max(0.1, Math.min(1.0, gainVal));

          gain.gain.setValueAtTime(targetVolume, now);

          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);



          osc.connect(gain);

          gain.connect(ctx.destination);

          osc.start(now);

          osc.stop(now + 0.25);

        }

      } catch (e) {}

    };



    playTone();

    synthOscillatorInterval = setInterval(playTone, intervalMs);

  } catch (e) {}

};



const playSynthesizedBeep = (gainVal = 0.8) => {

  playSynthesizedMelody('beep', gainVal);

};



const stopSynthesizedBeep = () => {

  if (synthOscillatorInterval) {

    clearInterval(synthOscillatorInterval);

    synthOscillatorInterval = null;

  }

};



// User-Gesture Pre-unlocking for iOS / Android Silent Mode

// Call this immediately on user touch/click (e.g. Timer Start) so background/timer-end alarm NEVER gets blocked

// IMPORTANT: The element stays MUTED + PAUSED after unlocking. It is only unmuted inside

// triggerAlarmAndVibration, so a slow/aborted unlock can never leak an audible alarm (e.g. on pause).

let isAlarmAudioActive = false; // true only while a real alarm / preview is ringing

let alarmAudioUnlocked = false;

let unlockInFlight = false;

const SILENT_UNLOCK_SRC = './alarms/silent.mp3';



const unlockAudioForMannerMode = (alarmSoundId = 'digital', mannerPolicy = 'bypass') => {

  configurePlaybackAudioSession(mannerPolicy);

  const ctx = getSharedAudioContext();

  if (ctx && ctx.state === 'suspended') {

    ctx.resume().catch(() => {});

  }



  try {

    // Never touch the element while a real alarm / preview is ringing.

    if (isAlarmAudioActive) return;



    if (!activeAlarmAudio) {

      activeAlarmAudio = new Audio(SILENT_UNLOCK_SRC);

      activeAlarmAudio.setAttribute('playsinline', 'true');

      activeAlarmAudio.preload = 'auto';

    }



    // Already unlocked (permission persists per element even after src changes) or pending: do nothing.

    if (alarmAudioUnlocked || unlockInFlight) return;



    // Unlock with a TRULY SILENT file. Some devices ignore `muted` (esp. with the 'playback'

    // audio session), so the alarm file itself must never be played for unlocking.

    if (!activeAlarmAudio.src.endsWith(SILENT_UNLOCK_SRC.replace('./', ''))) {

      activeAlarmAudio.src = SILENT_UNLOCK_SRC;

    }

    unlockInFlight = true;

    activeAlarmAudio.loop = false;

    activeAlarmAudio.muted = true;

    activeAlarmAudio.volume = 0;

    const p = activeAlarmAudio.play();

    const finish = (ok) => {

      unlockInFlight = false;

      if (ok) alarmAudioUnlocked = true;

      if (!isAlarmAudioActive && activeAlarmAudio) {

        activeAlarmAudio.pause();

        activeAlarmAudio.currentTime = 0;

        activeAlarmAudio.muted = true;

      }

    };

    if (p && typeof p.then === 'function') {

      p.then(() => finish(true)).catch(() => finish(false));

    } else {

      finish(true);

    }

  } catch (e) {

    unlockInFlight = false;

  }

};



// Real-time volume adjuster: immediately alters currently playing alarm sound

const setLiveAlarmVolume = (volumePct, alarmSoundId = 'marimba') => {

  const clampedPct = Math.max(0, Math.min(100, Number(volumePct) || 0));

  currentAlarmVolumePct = clampedPct;

  const soundObj = ALARM_SOUNDS.find((s) => s.id === alarmSoundId) || ALARM_SOUNDS[0];

  const targetGain = clampedPct === 0 ? 0 : (clampedPct / 100) * (soundObj.volume ?? 1.0);



  // 1. Web Audio GainNode

  if (currentAlarmGainNode && globalAudioCtx) {

    try {

      currentAlarmGainNode.gain.cancelScheduledValues(globalAudioCtx.currentTime);

      currentAlarmGainNode.gain.setValueAtTime(targetGain, globalAudioCtx.currentTime);

    } catch (e) {}

  }



  // 2. Native HTMLAudioElement: only alter volume if it's the primary audible playback (fallback mode)

  if (activeAlarmAudio && isAlarmAudioActive && !currentAlarmSourceNode) {

    try {

      activeAlarmAudio.muted = clampedPct === 0;

      activeAlarmAudio.volume = targetGain;

    } catch (e) {}

  }

};



const startSilentKeepAlive = (alarmSoundId = 'digital', volumePct = currentAlarmVolumePct, mannerPolicy = 'bypass') => {

  configurePlaybackAudioSession(mannerPolicy);

  getSharedAudioContext();

  preloadAlarmBuffers();

  unlockAudioForMannerMode(alarmSoundId);



  try {

    if (!silentKeepAliveAudio) {

      silentKeepAliveAudio = new Audio('./alarms/silent.mp3');

      silentKeepAliveAudio.loop = true;

      silentKeepAliveAudio.volume = 0.01;

      silentKeepAliveAudio.setAttribute('playsinline', 'true');

    }

    silentKeepAliveAudio.play().catch(() => {});

  } catch (e) {}

};



const stopSilentKeepAlive = () => {

  try {

    if (silentKeepAliveAudio) {

      silentKeepAliveAudio.pause();

      silentKeepAliveAudio.currentTime = 0;

    }

  } catch (e) {}

};



const stopStandardAlarm = (onStoppedCallback) => {

  try {

    if (alarmStopTimeout) {

      clearTimeout(alarmStopTimeout);

      alarmStopTimeout = null;

    }

    stopVibrationLoop();

    stopSynthesizedBeep();



    // Stop Web Audio node

    if (currentAlarmSourceNode) {

      try {

        currentAlarmSourceNode.stop();

        currentAlarmSourceNode.disconnect();

      } catch (e) {}

      currentAlarmSourceNode = null;

    }

    currentAlarmGainNode = null;



    // Stop Native Audio element

    isAlarmAudioActive = false;

    if (activeAlarmAudio) {

      activeAlarmAudio.pause();

      activeAlarmAudio.currentTime = 0;

      activeAlarmAudio.muted = true;

    }

  } catch (e) {}

  if (onStoppedCallback) onStoppedCallback();

};



const triggerAlarmAndVibration = (

  alarmSoundId = 'marimba',

  onStoppedCallback,

  durationMs = 6000,

  volumePct = currentAlarmVolumePct,

  enableVibration = true,

  mannerPolicy = 'bypass'

) => {

  stopStandardAlarm();

  configurePlaybackAudioSession(mannerPolicy);

  preloadAlarmBuffers();



  const clampedPct = Math.max(0, Math.min(100, Number(volumePct) || 0));

  currentAlarmVolumePct = clampedPct;

  const soundObj = ALARM_SOUNDS.find((s) => s.id === alarmSoundId) || ALARM_SOUNDS[0];

  const targetGain = clampedPct === 0 ? 0 : (clampedPct / 100) * (soundObj.volume ?? 1.0);



  // 1. Continuous Vibration loop for full durationMs

  if (enableVibration) {

    startVibrationLoop(durationMs);

  }



  if (clampedPct <= 0) {

    alarmStopTimeout = setTimeout(() => {

      stopStandardAlarm(onStoppedCallback);

    }, durationMs);

    return;

  }



  // 2. Play Web Audio API buffer as PRIMARY

  // Guarantees sample-accurate seamless looping and 100% volume control on iOS/Android/PC with ZERO double-playback jitter

  let isWebAudioPlaying = false;

  const ctx = getSharedAudioContext();

  if (ctx) {

    try {

      if (ctx.state === 'suspended') {

        ctx.resume().catch(() => {});

      }

      const cachedBuffer = audioBufferCache[soundObj.id];

      if (cachedBuffer) {

        const source = ctx.createBufferSource();

        source.buffer = cachedBuffer;

        source.loop = true;



        const gainNode = ctx.createGain();

        gainNode.gain.setValueAtTime(targetGain, ctx.currentTime);



        source.connect(gainNode);

        gainNode.connect(ctx.destination);

        source.start(0);



        currentAlarmSourceNode = source;

        currentAlarmGainNode = gainNode;

        isWebAudioPlaying = true;

      }

    } catch (e) {}

  }



  // 3. Play Native HTMLAudioElement (CRITICAL FOR MANNER MODE BYPASS on iOS)

  // If Web Audio is already playing cleanly, HTMLAudio plays silent.mp3 to hold the hardware iOS playback session

  // alive without creating an out-of-sync dual-playback echo!

  // If Web Audio could not play, HTMLAudio plays soundObj.src audibly as fallback.

  isAlarmAudioActive = true;

  const audioSrcToPlay = isWebAudioPlaying ? SILENT_UNLOCK_SRC : soundObj.src;

  try {

    if (!activeAlarmAudio) {

      activeAlarmAudio = new Audio(audioSrcToPlay);

      activeAlarmAudio.setAttribute('playsinline', 'true');

    } else if (!activeAlarmAudio.src.endsWith(audioSrcToPlay.replace('./', ''))) {

      activeAlarmAudio.src = audioSrcToPlay;

    }

    activeAlarmAudio.loop = true;

    activeAlarmAudio.muted = false; // Bypass manner mode on iOS

    activeAlarmAudio.volume = isWebAudioPlaying ? 0.01 : targetGain;

    activeAlarmAudio.currentTime = 0;



    const playPromise = activeAlarmAudio.play();

    if (playPromise && typeof playPromise.then === 'function') {

      playPromise

        .then(() => {

          stopSilentKeepAlive();

        })

        .catch((err) => {

          console.warn('HTMLAudio play blocked:', err);

          stopSilentKeepAlive();

          if (!isWebAudioPlaying) {

            playSynthesizedMelody(alarmSoundId, targetGain);

          }

        });

    } else {

      stopSilentKeepAlive();

    }

  } catch (e) {

    console.warn('HTMLAudio error:', e);

    stopSilentKeepAlive();

    if (!isWebAudioPlaying) {

      playSynthesizedMelody(alarmSoundId, targetGain);

    }

  }



  // 4. Absolute failsafe: if neither Web Audio nor HTMLAudio is playing

  if (!isWebAudioPlaying && (!activeAlarmAudio || activeAlarmAudio.paused)) {

    playSynthesizedMelody(alarmSoundId, targetGain);

  }



  // Automatically stop alarm and vibration when durationMs finishes

  alarmStopTimeout = setTimeout(() => {

    stopStandardAlarm(onStoppedCallback);

  }, durationMs);

};



// ==========================================

// 4.9 FASTAPI AI TASK PREDICTION & REWARD ITEMS

// ==========================================

const FASTAPI_URL = 'http://127.0.0.1:8000';



const REWARD_ITEMS = [

  {

    id: 'star_konpeito',

    name: '星の金平糖',

    icon: '⭐',

    rarity: 'Rare',

    color: '#FBBF24',

    bg: 'from-amber-400/20 to-yellow-500/20 border-amber-400/50',

    description: '夜空の星のかけらから生まれたお菓子。手に入れると嬉しそうにキラキラ輝く！',

    flavorText: '「きらきらしててとっても甘いのだ！」',

    category: 'sweet'

  },

  {

    id: 'zunda_parfait',

    name: '特製ずんだパフェ',

    icon: '🍵',

    rarity: 'Super Rare',

    color: '#4ADE80',

    bg: 'from-emerald-400/20 to-green-500/20 border-emerald-400/50',

    description: 'ずんだ餡がたっぷり乗った極上パフェ。ずんだもんの大好物！',

    flavorText: '「ずんだパフェ最高なのだーー！！」',

    category: 'special'

  },

  {

    id: 'miku_leek_mic',

    name: 'ネギ型マイク',

    icon: '🎵',

    rarity: 'Super Rare',

    color: '#2DD4BF',

    bg: 'from-teal-400/20 to-cyan-500/20 border-teal-400/50',

    description: '初音ミクが歌うときに愛用する特製マイク。綺麗なメロディを奏でる。',

    flavorText: '「最高の集中だったね！この歌をあなたに届けます♪」',

    category: 'music'

  },

  {

    id: 'fluffy_souffle',

    name: 'ふわふわスフレ',

    icon: '🍰',

    rarity: 'Common',

    color: '#F472B6',

    bg: 'from-pink-400/20 to-rose-500/20 border-pink-400/50',

    description: 'ちいまるもとろけちゃう、ぷるぷるの極上スフレケーキ。',

    flavorText: '「ふわふわ…あまくてしあわせ…」',

    category: 'sweet'

  },

  {

    id: 'royal_crown_cookie',

    name: '王冠クッキー',

    icon: '👑',

    rarity: 'Rare',

    color: '#F59E0B',

    bg: 'from-amber-500/20 to-orange-500/20 border-amber-500/50',

    description: 'もちまる王の王冠をかたどった金色のサクサククッキー。',

    flavorText: '「余の王冠と同じ輝きじゃ！褒美に取らせよう！」',

    category: 'snack'

  },

  {

    id: 'time_hourglass',

    name: '時の砂時計',

    icon: '⏱️',

    rarity: 'Rare',

    color: '#60A5FA',

    bg: 'from-blue-400/20 to-indigo-500/20 border-blue-400/50',

    description: '集中した努力の時間が結晶化した砂時計。見つめると心が落ち着く。',

    flavorText: '「積み重ねた時間は嘘をつかないよ！」',

    category: 'relic'

  },

  {

    id: 'rainbow_drop',

    name: '虹のしずく',

    icon: '🌈',

    rarity: 'Legendary',

    color: '#A855F7',

    bg: 'from-purple-500/25 via-pink-500/25 to-amber-500/25 border-purple-400/60 shadow-lg shadow-purple-500/20',

    description: '目標を大幅に突破した時にのみ現れる奇跡のしずく。虹色のオーラを放つ。',

    flavorText: '「すごい！限界を超えたキミに虹の祝福を！」',

    category: 'legendary'

  },

  {

    id: 'dragon_jewel',

    name: '星竜の蒼宝珠',

    icon: '💎',

    rarity: 'Legendary',

    color: '#38BDF8',

    bg: 'from-cyan-500/25 to-blue-600/25 border-cyan-400/60 shadow-lg shadow-cyan-500/20',

    description: '星竜ルナリアの加護が込められた秘宝。幻想的な光を灯す。',

    flavorText: '「我が星の導きが、汝の歩みを永遠に照らさん。」',

    category: 'legendary'

  },

  {

    id: 'moon_milk',

    name: 'お月見ミルク',

    icon: '🥛',

    rarity: 'Common',

    color: '#E0E7FF',

    bg: 'from-indigo-300/20 to-slate-400/20 border-indigo-300/50',

    description: 'みるく姫が夜に飲む温かいハチミツ入りミルク。心がホッと温まる。',

    flavorText: '「ふぅ…今日も一日よくがんばったね」',

    category: 'drink'

  },

  {

    id: 'sun_magatama',

    name: '陽光の勾玉',

    icon: '☀️',

    rarity: 'Legendary',

    color: '#FB923C',

    bg: 'from-orange-500/25 to-red-500/25 border-orange-400/60 shadow-lg shadow-orange-500/20',

    description: '太陽神アマテラス丸の神聖な力が宿る勾玉。明るいエネルギーで満たされる。',

    flavorText: '「日の光がそなたの明日を明るく照らすであろ〜」',

    category: 'legendary'

  }

];



// ==========================================

// 5. MAIN APPLICATION COMPONENT (WITH DEMO PHONE BEZEL)

// ==========================================



export default function App() {

  useNativeTouchGuard();

  const loadInitialState = () => {

    try {

      // Request persistent storage so mobile OS never evicts user data

      if (typeof navigator !== 'undefined' && navigator.storage && navigator.storage.persist) {

        navigator.storage.persist().catch(() => {});

      }



      // Check permanent key & all legacy keys, picking/merging the most complete data

      let bestData = null;

      for (const key of LEGACY_STORAGE_KEYS) {

        const raw = localStorage.getItem(key);

        if (!raw) continue;

        try {

          const parsed = JSON.parse(raw);

          if (!parsed || typeof parsed !== 'object') continue;

          if (!bestData) {

            bestData = parsed;

          } else {

            const bestScore =

              (bestData.earnedXp || 0) +

              (bestData.activityLogs?.length || 0) * 10 +

              (bestData.maxStreak || 0);

            const curScore =

              (parsed.earnedXp || 0) +

              (parsed.activityLogs?.length || 0) * 10 +

              (parsed.maxStreak || 0);

            if (curScore > bestScore) {

              bestData = parsed;

            }

          }

        } catch (err) {

          // Ignore malformed entry

        }

      }

      return bestData;

    } catch (e) {

      console.error(e);

    }

    return null;

  };



  const saved = useMemo(() => loadInitialState(), []);

  const isHydratedRef = useRef(Boolean(saved));



  // Check if date rolled over since last session (Daily task reset)

  const currentTodayStr = getDateString();

  const savedLastDate = saved?.lastActiveDate || (saved?.updatedAt ? formatDateKey(new Date(saved.updatedAt)) : null);

  const isSessionNewDay = savedLastDate

    ? savedLastDate !== currentTodayStr

    : Boolean(

        Array.isArray(saved?.tasks) &&

        saved.tasks.some((t) => t.completed || (t.creditedMinutes || 0) > 0 || (t.completedSets || 0) > 0)

      );



  // Demo Phone Frame Bezel Toggle (Automatically OFF on mobile devices, ON on PC desktop)

  const [showPhoneBezel, setShowPhoneBezel] = useState(() => {

    if (typeof window !== 'undefined') {

      return window.innerWidth >= 640;

    }

    return true;

  });

  const [demoUnlockAll, setDemoUnlockAll] = useState(true);

  const isDemoUnlocked = showPhoneBezel && demoUnlockAll;

  const [showMobileConnectModal, setShowMobileConnectModal] = useState(false);

  const [copiedUrl, setCopiedUrl] = useState(false);

  const mobileAccessUrl = 'https://kouluun2.github.io/habit-timer/';



  // Tasks with Names (Automatically reset on a new day while keeping accumulated XP and history intact)

  const [tasks, setTasks] = useState(() => {

    const raw = saved?.tasks || [

      {

        id: 'initial-1',

        title: '読書・インプット',

        categoryId: 'book',

        durationMinutes: 25,

        durationMs: 25 * 60 * 1000,

        remainingMs: 25 * 60 * 1000,

        completed: false,

        createdAt: Date.now(),

      },

      {

        id: 'initial-2',

        title: '集中作業',

        categoryId: 'laptop',

        durationMinutes: 60,

        durationMs: 60 * 60 * 1000,

        remainingMs: 60 * 60 * 1000,

        completed: false,

        createdAt: Date.now() - 1000,

      },

    ];

    if (isSessionNewDay) {

      return resetTasksForNewDay(raw);

    }

    return raw;

  });

  const [activeTaskId, setActiveTaskId] = useState(saved?.activeTaskId || 'initial-1');

  const activeTaskIdRef = useRef(activeTaskId);

  activeTaskIdRef.current = activeTaskId;

  const [lastActiveDate, setLastActiveDate] = useState(() => currentTodayStr);

  const lastActiveDateRef = useRef(lastActiveDate);

  lastActiveDateRef.current = lastActiveDate;



  // XP, Streak, All-Achieved Dates & Persistent Activity Logs (History)

  const [activityLogs, setActivityLogs] = useState(saved?.activityLogs || []);



  // 累計集中時間ハイウォーターマーク（絶対に減らない保証用ステート）

  const [maxTotalMinutes, setMaxTotalMinutes] = useState(() => {

    let stored = 0;

    try {

      stored = Number(localStorage.getItem(MAX_TOTAL_MINUTES_STORAGE_KEY)) || 0;

    } catch (e) {}

    const initialLogsSum = Array.isArray(saved?.activityLogs)

      ? saved.activityLogs.reduce((sum, l) => sum + (Number(l.durationMinutes) || 0), 0)

      : 0;

    const initialTasksSum = Array.isArray(saved?.tasks)

      ? saved.tasks.reduce((sum, t) => sum + (t.completed ? 0 : (Number(t.creditedMinutes) || 0)), 0)

      : 0;

    return Math.max(stored, Number(saved?.maxTotalMinutes) || 0, initialLogsSum + initialTasksSum);

  });



  // 累計集中時間が絶対に減らないようにハイウォーターマークを常時監視・更新

  useEffect(() => {

    const currentLogsSum = (activityLogs || []).reduce(

      (sum, l) => sum + (Number(l.durationMinutes) || 0),

      0

    );

    const inProgressMinutes = (tasks || []).reduce(

      (sum, t) => sum + (t.completed ? 0 : (Number(t.creditedMinutes) || 0)),

      0

    );

    const currentSum = currentLogsSum + inProgressMinutes;

    if (currentSum > maxTotalMinutes) {

      setMaxTotalMinutes(currentSum);

      try {

        localStorage.setItem(MAX_TOTAL_MINUTES_STORAGE_KEY, String(currentSum));

      } catch (e) {}

    }

  }, [activityLogs, tasks, maxTotalMinutes]);

  const [completedDates, setCompletedDates] = useState(() =>

    deriveCompletedDatesFromLogsAndDates(saved?.completedDates || [], saved?.activityLogs || [])

  );

  // All tasks completed dates list (exclusive for rainbow star ⭐)

  const [allAchievedDates, setAllAchievedDates] = useState(() =>

    deriveAllAchievedDates(saved?.allAchievedDates || [], saved?.activityLogs || [], saved?.tasks || [])

  );

  const [streak, setStreak] = useState(() => {

    const dates = deriveCompletedDatesFromLogsAndDates(saved?.completedDates || [], saved?.activityLogs || []);

    const calculated = calculateCurrentStreak(dates);

    return Math.max(saved?.streak || 0, calculated);

  });

  const [maxStreak, setMaxStreak] = useState(() => {

    const dates = deriveCompletedDatesFromLogsAndDates(saved?.completedDates || [], saved?.activityLogs || []);

    return Math.max(saved?.maxStreak || 0, calculateMaxStreak(dates));

  });

  const [targetStreak, setTargetStreak] = useState(saved?.targetStreak || 3);

  const [earnedXp, setEarnedXp] = useState(() => {

    const initialLogsMinutes = Array.isArray(saved?.activityLogs)

      ? saved.activityLogs.reduce((sum, l) => sum + (l.durationMinutes || 0), 0)

      : 0;

    return Math.max(saved?.earnedXp || 0, initialLogsMinutes);

  });

  const [showXpDetail, setShowXpDetail] = useState(false);



  // Customization & Companion Character State

  const [themeId, setThemeId] = useState(saved?.themeId || 'pastel-milky');

  const [timerStyle, setTimerStyle] = useState(saved?.timerStyle || 'ring');

  const [alarmSoundId, setAlarmSoundId] = useState(saved?.alarmSoundId || 'digital');

  const [selectedBgmId, setSelectedBgmId] = useState(saved?.selectedBgmId || 'latte');

  const [bgmVolume, setBgmVolume] = useState(() =>

    typeof saved?.bgmVolume === 'number' ? Math.max(0, Math.min(100, saved.bgmVolume)) : 55

  );

  const [previewingBgmId, setPreviewingBgmId] = useState(null);

  const [alarmVolume, setAlarmVolume] = useState(() =>

    typeof saved?.alarmVolume === 'number' ? Math.max(0, Math.min(100, saved.alarmVolume)) : 80

  );

  const [prevUnmutedVolume, setPrevUnmutedVolume] = useState(80);

  const [alarmDurationSec, setAlarmDurationSec] = useState(() =>

    typeof saved?.alarmDurationSec === 'number' ? saved.alarmDurationSec : 6

  );

  const [alarmVibration, setAlarmVibration] = useState(() =>

    typeof saved?.alarmVibration === 'boolean' ? saved.alarmVibration : true

  );

  // 'bypass': マナーモードでもオン（マナーモード貫通） | 'respect': マナーモードはオフ（消音・バイブのみ）

  const [alarmMannerModePolicy, setAlarmMannerModePolicy] = useState(() =>

    saved?.alarmMannerModePolicy === 'respect' ? 'respect' : 'bypass'

  );

  const [isAlarmRinging, setIsAlarmRinging] = useState(false);

  // Up to 3 companion characters can be selected at once (first one = main character)

  const [selectedCharIds, setSelectedCharIds] = useState(() => {

    if (Array.isArray(saved?.selectedCharIds) && saved.selectedCharIds.length > 0) {

      return saved.selectedCharIds.slice(0, MAX_SELECTED_CHARACTERS);

    }

    return [saved?.selectedCharId || 'mochi'];

  });

  const selectedCharId = selectedCharIds[0] || 'mochi';

  // Adds a character (e.g. newly unlocked) to the front as main, keeping max 3

  const setSelectedCharId = (charId) => {

    if (!charId) return;

    setSelectedCharIds((prev) =>

      [charId, ...prev.filter((id) => id !== charId)].slice(0, MAX_SELECTED_CHARACTERS)

    );

  };

  const [charLimitNotice, setCharLimitNotice] = useState('');



  // Removes a companion at a specific slot index (0 = 1st, 1 = 2nd, 2 = 3rd)

  // Specification: 1st character can ONLY be removed when 2nd character exists.

  // When removed, remaining companions automatically shift forward (2nd -> 1st, 3rd -> 2nd).

  const removeCompanionAt = (slotIdx) => {

    setSelectedCharIds((prev) => {

      if (slotIdx < 0 || slotIdx >= prev.length) return prev;

      if (slotIdx === 0 && prev.length < 2) {

        setCharLimitNotice('1体目は2体目がいる時のみ外せます（最低1体必要です）');

        setTimeout(() => setCharLimitNotice(''), 2500);

        return prev;

      }

      return prev.filter((_, idx) => idx !== slotIdx);

    });

  };



  const swapCompanionSlots = (idxA, idxB) => {

    if (idxA === idxB) return;

    setSelectedCharIds((prev) => {

      if (idxA < 0 || idxA >= prev.length || idxB < 0 || idxB >= prev.length) return prev;

      const next = [...prev];

      const temp = next[idxA];

      next[idxA] = next[idxB];

      next[idxB] = temp;

      try {

        if (typeof navigator !== 'undefined' && navigator.vibrate) {

          navigator.vibrate(35);

        }

      } catch (e) {}

      return next;

    });

  };



  const toggleCharacterSelection = (charId) => {

    setSelectedCharIds((prev) => {

      const idx = prev.indexOf(charId);

      if (idx !== -1) {

        if (idx === 0 && prev.length < 2) {

          setCharLimitNotice('1体目は2体目がいる時のみ外せます（最低1体必要です）');

          setTimeout(() => setCharLimitNotice(''), 2500);

          return prev;

        }

        return prev.filter((id) => id !== charId);

      }

      if (prev.length >= MAX_SELECTED_CHARACTERS) {

        setCharLimitNotice('選べるのは3体までです。どれかを外してから選んでください。');

        setTimeout(() => setCharLimitNotice(''), 2500);

        return prev;

      }

      return [...prev, charId];

    });

  };

  const makeMainCharacter = (charId) => {

    setSelectedCharIds((prev) =>

      prev.includes(charId) ? [charId, ...prev.filter((id) => id !== charId)] : prev

    );

  };

  const [newlyUnlockedChar, setNewlyUnlockedChar] = useState(null);



  useEffect(() => {

    setLiveAlarmVolume(alarmVolume, alarmSoundId);

    if (alarmVolume > 0) {

      setPrevUnmutedVolume(alarmVolume);

    }

  }, [alarmVolume, alarmSoundId]);



  // Accurate Timestamp Timer State

  const [isRunning, setIsRunning] = useState(() => (isSessionNewDay ? false : saved?.isRunning || false));

  const [startTimestamp, setStartTimestamp] = useState(() => (isSessionNewDay ? null : saved?.startTimestamp || null));

  const [endTimestamp, setEndTimestamp] = useState(() => (isSessionNewDay ? null : saved?.endTimestamp || null));

  const [remainingMs, setRemainingMs] = useState(() => {

    // 日付が変わった新しい日は、昨日の途中残り時間や00:00を引き継がず、タスクの設定時間から再スタート！

    const initialTasks = isSessionNewDay ? resetTasksForNewDay(saved?.tasks || []) : saved?.tasks || [];

    const initialActive = initialTasks.find((t) => t.id === saved?.activeTaskId) || initialTasks[0];

    const initialSetMs = initialActive ? getTaskSetMinutes(initialActive) * 60 * 1000 : 25 * 60 * 1000;

    if (isSessionNewDay) {

      return initialSetMs;

    }

    return saved?.remainingMs ?? initialSetMs;

  });



  // UI Modals & Animation States

  const [showSettingsModal, setShowSettingsModal] = useState(false);

  const [settingsTab, setSettingsTab] = useState('tasks'); // 'tasks' | 'characters' | 'ui'

  const [showCreateModal, setShowCreateModal] = useState(false);

  const [showThemeModal, setShowThemeModal] = useState(false);

  const [showCharacterModal, setShowCharacterModal] = useState(false);

  const [showHistoryModal, setShowHistoryModal] = useState(false);

  const [showCompletedHistory, setShowCompletedHistory] = useState(false);

  const [showLeagueModal, setShowLeagueModal] = useState(false);

  const [showRankingFeature, setShowRankingFeature] = useState(

    () => saved?.showRankingFeature ?? true

  );

  const [leagueLockNotice, setLeagueLockNotice] = useState('');

  const [showTimelineModal, setShowTimelineModal] = useState(false);

  const timelineScrollRef = useRef(null);

  const [showScrollToBottom, setShowScrollToBottom] = useState(false);

  const [selectedTimelineDay, setSelectedTimelineDay] = useState(null);

  const [leagueTierIndex, setLeagueTierIndex] = useState(() =>

    typeof saved?.leagueTierIndex === 'number'

      ? Math.max(0, Math.min(LEAGUE_TIERS.length - 1, saved.leagueTierIndex))

      : 0

  );

  const [leagueWeekKey, setLeagueWeekKey] = useState(

    () => saved?.leagueWeekKey || getWeekWindowInfo().weekKey

  );

  const [playerName, setPlayerName] = useState(() => saved?.playerName || 'あなた');

  const [isEditingPlayerName, setIsEditingPlayerName] = useState(false);



  // Online Real-User League States (Firebase)

  const [isOnlineLeagueConfigured, setIsOnlineLeagueConfigured] = useState(() =>

    Boolean(getStoredFirebaseConfig())

  );

  const [onlineRealMembers, setOnlineRealMembers] = useState([]);

  const [isSyncingWithCloud, setIsSyncingWithCloud] = useState(false);

  const [isRefreshingLeague, setIsRefreshingLeague] = useState(false);

  const [lastLeagueSyncTime, setLastLeagueSyncTime] = useState(null);

  const myOnlineUid = useMemo(() => getOrCreateAnonymousUserId(), []);

  const [playerNameDraft, setPlayerNameDraft] = useState('');

  const [showGoalModal, setShowGoalModal] = useState(false);

  const [taskToDelete, setTaskToDelete] = useState(null);

  const [showTaskCreateConfirmModal, setShowTaskCreateConfirmModal] = useState(false);

  const [showResetConfirmModal, setShowResetConfirmModal] = useState(false);

  const [proposedTarget, setProposedTarget] = useState(5);

  const [justCompleted, setJustCompleted] = useState(false);

  const [petHearts, setPetHearts] = useState([]);

  const [chartPeriod, setChartPeriod] = useState('week'); // 'week' | 'month' | 'year' | 'all'

  const [chartMetric, setChartMetric] = useState('minutes'); // 'minutes' | 'count'

  const [selectedChartKey, setSelectedChartKey] = useState(null);

  // Site Access Gatekeeper State (Fully Open for Public Access without Passwords)

  const [siteSecurity, setSiteSecurity] = useState({ password: 'habit2026', adminPin: 'admin777' });

  const [isSiteUnlocked, setIsSiteUnlocked] = useState(true);

  const [accessPasswordInput, setAccessPasswordInput] = useState('');

  const [showPasswordText, setShowPasswordText] = useState(false);

  const [accessPasswordError, setAccessPasswordError] = useState('');



  // Admin Dashboard State (All User Data Management)

  // Only visible on authorized PC (localhost, ?admin URL param, admin PIN login, or Ctrl+Shift+A)

  const [isAdminDevice, setIsAdminDevice] = useState(() => {

    try {

      if (typeof window === 'undefined') return false;

      const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

      const stored = localStorage.getItem('habit_timer_admin_device') === 'true';

      const search = window.location.search || '';

      const urlHasAdmin = search.includes('admin') && !search.includes('admin=off') && !search.includes('admin=false');

      return isLocal || stored || urlHasAdmin;

    } catch (e) {

      return false;

    }

  });



  const [showAdminModal, setShowAdminModal] = useState(false);

  const [isAdminUnlocked, setIsAdminUnlocked] = useState(() => {

    try {

      return localStorage.getItem('habit_timer_admin_unlocked') === 'true';

    } catch (e) {

      return false;

    }

  });

  const [adminPinInput, setAdminPinInput] = useState('');

  const [adminPinError, setAdminPinError] = useState('');

  const [editingAdminUser, setEditingAdminUser] = useState(null); // { userId, name, minutes, level }

  const [newSitePasswordDraft, setNewSitePasswordDraft] = useState('');

  const [adminActionNotice, setAdminActionNotice] = useState('');



  // ==========================================

  // FASTAPI AI TASK VOLUME PREDICTION & INVENTORY STATES

  // ==========================================

  const [fastApiStatus, setFastApiStatus] = useState('checking'); // 'online' | 'offline' | 'checking'

  const [isPredicting, setIsPredicting] = useState(false);

  const [showInventoryModal, setShowInventoryModal] = useState(false);

  const [showAiChallengeModal, setShowAiChallengeModal] = useState(false);

  const [isAiCardExpanded, setIsAiCardExpanded] = useState(false);

  const [rewardCelebration, setRewardCelebration] = useState(null); // { item, margin, targetThreshold, actualMinutes, message, congratulationText }

  const [companionSpeechBubble, setCompanionSpeechBubble] = useState(null);



  // Inventory: user's acquired reward items

  const [inventory, setInventory] = useState(() => {

    try {

      const raw = localStorage.getItem('habit_timer_inventory_v1');

      if (raw) {

        const parsed = JSON.parse(raw);

        if (Array.isArray(parsed)) return parsed;

      }

    } catch (e) {}

    return [];

  });



  // AI Prediction Target for next day or today

  const [aiPrediction, setAiPrediction] = useState(() => {

    try {

      const raw = localStorage.getItem('habit_timer_ai_prediction_v2');

      if (raw) {

        const parsed = JSON.parse(raw);

        if (parsed && typeof parsed === 'object') return parsed;

      }

    } catch (e) {}

    // Default initial prediction if none stored

    return {

      targetDate: getDateString(),

      predictedMinutes: 25,

      predictedTasks: 1,

      confidence: 0.75,

      modelName: 'initial_baseline',

      companionCheer: 'まずは25分以上の集中を目指そう！これを超えるとアイテムゲットできるよ！✨',

      summaryMessage: '今日の予測タスク量は25分です！超えると限定アイテムを獲得できます！',

    };

  });



  // Claimed reward dates to prevent duplicate drops on same day

  const [claimedRewardDates, setClaimedRewardDates] = useState(() => {

    try {

      const raw = localStorage.getItem('habit_timer_claimed_rewards_v1');

      if (raw) {

        const parsed = JSON.parse(raw);

        if (Array.isArray(parsed)) return parsed;

      }

    } catch (e) {}

    return [];

  });



  // Subscribe to real-time site security configuration (password updates by admin)

  useEffect(() => {

    const unsub = subscribeSiteSecurity((sec) => {

      if (sec && sec.password) {

        setSiteSecurity(sec);

      }

    });

    return () => unsub();

  }, []);



  // Admin device initialization via URL (?admin enables, ?admin=off disables) and secret Hotkey (Ctrl+Shift+A)

  useEffect(() => {

    if (typeof window === 'undefined') return;



    const search = window.location.search || '';

    if (search.includes('admin=off') || search.includes('admin=false')) {

      setIsAdminDevice(false);

      try {

        localStorage.removeItem('habit_timer_admin_device');

      } catch (e) {}

    } else if (search.includes('admin')) {

      setIsAdminDevice(true);

      setShowAdminModal(true);

      try {

        localStorage.setItem('habit_timer_admin_device', 'true');

      } catch (e) {}

    }



    // Secret PC Shortcut: Ctrl+Shift+A / Cmd+Shift+A opens Admin Dashboard and registers this PC

    const handleKeyDown = (e) => {

      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {

        e.preventDefault();

        setIsAdminDevice(true);

        setShowAdminModal(true);

        try {

          localStorage.setItem('habit_timer_admin_device', 'true');

        } catch (err) {}

      }

    };



    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);

  }, []);



  // Auto-scroll Timeline Modal to bottom (latest/current month) on open

  useEffect(() => {

    if (showTimelineModal) {

      setShowScrollToBottom(false);

      setSelectedTimelineDay(null);

      const timer = setTimeout(() => {

        if (timelineScrollRef.current) {

          timelineScrollRef.current.scrollTop = timelineScrollRef.current.scrollHeight;

        }

      }, 50);

      return () => clearTimeout(timer);

    }

  }, [showTimelineModal]);



  const handleTimelineScroll = (e) => {

    const el = e.currentTarget;

    const distanceToBottom = el.scrollHeight - el.scrollTop - el.clientHeight;

    setShowScrollToBottom(distanceToBottom > 80);

  };



  const scrollToLatestMonth = () => {

    if (timelineScrollRef.current) {

      timelineScrollRef.current.scrollTo({

        top: timelineScrollRef.current.scrollHeight,

        behavior: 'smooth',

      });

    }

  };



  // Task Creation & Rename Draft State

  const [draftTitle, setDraftTitle] = useState('');

  const [draftCategory, setDraftCategory] = useState('book');

  const [draftFrequency, setDraftFrequency] = useState('daily');

  const [draftHours, setDraftHours] = useState(0);

  const [draftMinutes, setDraftMinutes] = useState(25);

  const [draftSets, setDraftSets] = useState(1);

  const [editingTaskId, setEditingTaskId] = useState(null);

  const [editingTaskTitle, setEditingTaskTitle] = useState('');

  const [editingFrequencyTaskId, setEditingFrequencyTaskId] = useState(null);

  const [editingDurationTaskId, setEditingDurationTaskId] = useState(null);

  const [editingDurationHours, setEditingDurationHours] = useState(0);

  const [editingDurationMinutes, setEditingDurationMinutes] = useState(25);

  const [editingDurationSets, setEditingDurationSets] = useState(1);

  const [lockedDurationNoticeTaskId, setLockedDurationNoticeTaskId] = useState(null);

  const [isEditingMainTitle, setIsEditingMainTitle] = useState(false);

  const [mainTitleDraft, setMainTitleDraft] = useState('');



  // Helper: Calculate per-task progress toward "設定時間 × 14回" for unlocking 1 duration edit

  const REQUIRED_DURATION_RUNS = 14;



  const getTaskDurationEditStats = (task, logs = activityLogs) => {

    const durMins = getTaskTotalMinutes(task);

    const requiredMinutes = durMins * REQUIRED_DURATION_RUNS;

    let tickets = 0;

    let cycleMinutes = 0;



    if (

      typeof task?.durationEditTickets === 'number' &&

      typeof task?.durationCycleMinutes === 'number'

    ) {

      tickets = Math.max(0, Math.floor(task.durationEditTickets));

      cycleMinutes = Math.max(0, Math.floor(task.durationCycleMinutes));

      if (cycleMinutes >= requiredMinutes) {

        tickets += Math.floor(cycleMinutes / requiredMinutes);

        cycleMinutes = cycleMinutes % requiredMinutes;

      }

    } else {

      const taskLogsMins = Array.isArray(logs)

        ? logs

            .filter((l) => l.taskId === task?.id || (!l.taskId && l.taskTitle === task?.title))

            .reduce((sum, l) => sum + (l.durationMinutes || 0), 0)

        : 0;

      const inProgMins = task?.completed ? 0 : task?.creditedMinutes || 0;

      const totalTaskMins = taskLogsMins + inProgMins;

      tickets = Math.floor(totalTaskMins / requiredMinutes);

      cycleMinutes = totalTaskMins % requiredMinutes;

    }



    const completedRuns = Math.min(REQUIRED_DURATION_RUNS, Math.floor(cycleMinutes / durMins));

    const remainingMinutes = Math.max(0, requiredMinutes - cycleMinutes);

    const cycleProgress = Math.max(0, Math.min(1, cycleMinutes / requiredMinutes));



    return {

      tickets,

      cycleMinutes,

      requiredMinutes,

      completedRuns,

      remainingMinutes,

      cycleProgress,

    };

  };



  const currentTheme = useMemo(

    () => THEMES.find((t) => t.id === themeId) || THEMES[0],

    [themeId]

  );



  const themedCategories = useMemo(

    () => CATEGORIES.map((c) => resolveCategoryForTheme(c, currentTheme.isLight)),

    [currentTheme.isLight]

  );



  const activeTask = useMemo(

    () =>

      tasks.find((t) => t.id === activeTaskId) ||

      tasks.find((t) => !t.completed) ||

      tasks[0] ||

      null,

    [tasks, activeTaskId]

  );



  const activeCategory = useMemo(() => {

    if (!activeTask) return themedCategories[0];

    return themedCategories.find((c) => c.id === activeTask.categoryId) || themedCategories[0];

  }, [activeTask, themedCategories]);



  const currentDateStr = getDateString();

  const isTodayAchieved = completedDates.includes(currentDateStr);



  // --- 日付変更の自動検知（アプリ稼働中やバックグラウンド復帰時のデイリータスクリセット） ---

  useEffect(() => {

    const checkDateRoll = () => {

      const nowToday = getDateString();

      if (nowToday !== lastActiveDateRef.current) {

        // 日付が変わったのでデイリータスクとタイマーをリセット

        const prevDate = lastActiveDateRef.current || getYesterdayString();

        lastActiveDateRef.current = nowToday;

        setLastActiveDate(nowToday);

        setTasks((prev) => {

          // もし前日に途中まで集中していた分数があれば、前日の活動ログとして確実に保存（累計時間や履歴の維持）

          const rolloverLogs = (prev || [])

            .filter((t) => (t.creditedMinutes || 0) > 0 && !t.completed)

            .map((t) => ({

              id: `rollover-log-${t.id}-${Date.now()}`,

              taskId: t.id,

              taskTitle: t.title || 'タスク',

              categoryId: t.categoryId,

              durationMinutes: t.creditedMinutes,

              completedAt: new Date(Date.now() - 60000).toISOString(),

              dateStr: prevDate,

              taskCompleted: false,

            }));

          if (rolloverLogs.length > 0) {

            setActivityLogs((curr) => [...rolloverLogs, ...curr]);

          }



          const reset = resetTasksForNewDay(prev);

          const curActive = reset.find((t) => t.id === activeTaskIdRef.current) || reset[0];

          const setMs = curActive ? getTaskSetMinutes(curActive) * 60 * 1000 : 25 * 60 * 1000;

          setRemainingMs(setMs);

          return reset;

        });

        stopSilentKeepAlive();

        setIsRunning(false);

        setStartTimestamp(null);

        setEndTimestamp(null);

        setJustCompleted(false);

      }

    };



    // 15秒ごとに日付をチェック

    const timer = setInterval(checkDateRoll, 15000);

    // アプリがバックグラウンドから前面に戻ったときにも即チェック

    const handleVisibility = () => {

      if (document.visibilityState === 'visible') {

        checkDateRoll();

      }

    };

    document.addEventListener('visibilitychange', handleVisibility);



    return () => {

      clearInterval(timer);

      document.removeEventListener('visibilitychange', handleVisibility);

    };

  }, []);



  // --- 全タスク達成日の同期（今日、登録タスクが全完了したときのみ allAchievedDates に追加） ---

  useEffect(() => {

    const today = getDateString();

    const isAllTasksCompletedToday = tasks.length > 0 && tasks.every((t) => t.completed);



    setAllAchievedDates((prev) => {

      if (isAllTasksCompletedToday) {

        if (!prev.includes(today)) {

          return [...prev, today].sort();

        }

        return prev;

      } else {

        if (prev.includes(today)) {

          return prev.filter((d) => d !== today);

        }

        return prev;

      }

    });

  }, [tasks]);



  // 1日1タスク以上の完了または活動ログの存在で連続記録を自動同期・計算

  useEffect(() => {

    const today = getDateString();

    const hasCompletedTask = tasks.some((t) => t.completed);

    const hasTodayCompletedLog = activityLogs.some(

      (l) => (l.dateStr === today || (l.completedAt && l.completedAt.startsWith(today))) && l.taskCompleted

    );

    const isTodayActuallyCompleted = hasCompletedTask || hasTodayCompletedLog;



    // 既存の達成日と活動ログから網羅的な達成日リストを導出（過去ログや昨日分の自動復元）

    let updatedDates = deriveCompletedDatesFromLogsAndDates(completedDates, activityLogs, today);



    // 今日実際に1タスク以上完了している場合のみ、今日の日付を追加

    if (isTodayActuallyCompleted) {

      if (!updatedDates.includes(today)) {

        updatedDates = [...updatedDates, today].sort();

      }

    } else {

      // 今日完了タスクが0の場合は今日を達成日に含めない

      updatedDates = updatedDates.filter((d) => d !== today);

    }



    // completedDates に変更があれば更新

    const isDatesChanged =

      updatedDates.length !== completedDates.length ||

      updatedDates.some((d, idx) => d !== completedDates[idx]);

    if (isDatesChanged) {

      setCompletedDates(updatedDates);

    }



    // 動的に現在のストリークと最長ストリークを確定計算

    const calculatedStreak = calculateCurrentStreak(updatedDates, today);

    const calculatedMax = Math.max(maxStreak, calculateMaxStreak(updatedDates), calculatedStreak);



    if (calculatedStreak !== streak) {

      setStreak(calculatedStreak);

    }

    if (calculatedMax !== maxStreak) {

      setMaxStreak(calculatedMax);

    }

  }, [tasks, activityLogs, completedDates, streak, maxStreak]);



  // 1 minute = 1 pt XP calculation (includes both completed logs and in-progress elapsed minutes)

  const totalXp = useMemo(() => {

    const logsMinutes = activityLogs.reduce((sum, l) => sum + (l.durationMinutes || 0), 0);

    const inProgressMinutes = tasks.reduce(

      (sum, t) => sum + (t.completed ? 0 : (t.creditedMinutes || 0)),

      0

    );

    return Math.max(earnedXp, logsMinutes + inProgressMinutes);

  }, [earnedXp, activityLogs, tasks]);



  const levelInfo = useMemo(() => getLevelInfo(totalXp), [totalXp]);

  const [pendingLevelUp, setPendingLevelUp] = useState(false);



  const unlockedCharacters = useMemo(() => {

    if (isDemoUnlocked) return CHARACTERS;

    return CHARACTERS.filter((c) => levelInfo.level >= c.unlockLevel);

  }, [levelInfo.level, isDemoUnlocked]);



  // Real-time midway XP accrual: every 1 elapsed minute immediately adds +1 pt even before task completion

  useEffect(() => {

    if (!activeTask || activeTask.completed || justCompleted) return;



    const setMins = getTaskSetMinutes(activeTask);

    const totalSec = Math.round(activeTask.durationMs / 1000);

    const remSec = Math.max(0, Math.ceil(remainingMs / 1000));

    const elapsedMinutes = Math.min(

      setMins,

      Math.floor(Math.max(0, totalSec - remSec) / 60)

    );

    const alreadyCredited = activeTask.creditedMinutes || 0;

    const newlyEarned = elapsedMinutes - alreadyCredited;



    if (newlyEarned > 0) {

      const prevLevel = levelInfo.level;

      const nextXp = totalXp + newlyEarned;

      const nextLevelInfo = getLevelInfo(nextXp);



      setEarnedXp(nextXp);

      setTasks((prev) =>

        prev.map((t) => {

          if (t.id !== activeTask.id) return t;

          const baseEdit = getTaskDurationEditStats(t, activityLogs);

          const reqMins = getTaskTotalMinutes(t) * REQUIRED_DURATION_RUNS;

          const nextCycleTotal = baseEdit.cycleMinutes + newlyEarned;

          const gainedTickets = Math.floor(nextCycleTotal / reqMins);

          return {

            ...t,

            creditedMinutes: elapsedMinutes,

            durationEditTickets: baseEdit.tickets + gainedTickets,

            durationCycleMinutes: nextCycleTotal % reqMins,

          };

        })

      );



      if (nextLevelInfo.level > prevLevel) {

        const unlockedCharsNow = CHARACTERS.filter(

          (c) => c.unlockLevel > prevLevel && c.unlockLevel <= nextLevelInfo.level

        );

        if (unlockedCharsNow.length > 0) {

          const latestChar = unlockedCharsNow[unlockedCharsNow.length - 1];

          setSelectedCharId(latestChar.id);

          setNewlyUnlockedChar(latestChar);

        }

        setProposedTarget(nextLevelInfo.level);

        setPendingLevelUp(true);

      }

    }

  }, [remainingMs, activeTask, justCompleted, totalXp, levelInfo.level]);



  useEffect(() => {

    const titlePrefix = activeTask?.title ? `${activeTask.title} - ` : '';

    document.title = `${formatTime(remainingMs)} ${titlePrefix}`;

  }, [remainingMs, activeTask]);



  // --- Auto-Restore from IndexedDB / CacheStorage if localStorage was empty ---

  useEffect(() => {

    if (isHydratedRef.current) return;

    let cancelled = false;

    loadRedundantBackup().then((backup) => {

      if (cancelled) return;

      const localUpdatedAt = Number(saved?.updatedAt) || 0;

      const backupIsNewer =

        backup && typeof backup === 'object' && (!saved || (Number(backup.updatedAt) || 0) > localUpdatedAt);

      if (backupIsNewer) {

        const todayKey = getDateString();

        const backupDate = backup.lastActiveDate || (backup.updatedAt ? formatDateKey(new Date(backup.updatedAt)) : null);

        const isBackupNewDay = backupDate && backupDate !== todayKey;



        if (isBackupNewDay) {

          const reset = resetTasksForNewDay(backup.tasks || []);

          if (reset.length > 0) setTasks(reset);

          const curActive = reset.find((t) => t.id === backup.activeTaskId) || reset[0];

          const setMs = curActive ? getTaskSetMinutes(curActive) * 60 * 1000 : 25 * 60 * 1000;

          setRemainingMs(setMs);

          setIsRunning(false);

          setStartTimestamp(null);

          setEndTimestamp(null);

          setJustCompleted(false);

        } else {

          if (Array.isArray(backup.tasks) && backup.tasks.length > 0) {

            setTasks(backup.tasks);

          }

          if (typeof backup.remainingMs === 'number') {

            setRemainingMs(backup.remainingMs);

          }

        }

        if (backup.activeTaskId) setActiveTaskId(backup.activeTaskId);

        if (typeof backup.earnedXp === 'number') setEarnedXp(backup.earnedXp);

        if (typeof backup.streak === 'number') setStreak(backup.streak);

        if (typeof backup.maxStreak === 'number') setMaxStreak(backup.maxStreak);

        if (typeof backup.targetStreak === 'number') setTargetStreak(backup.targetStreak);

        if (Array.isArray(backup.completedDates)) setCompletedDates(backup.completedDates);

        if (Array.isArray(backup.allAchievedDates)) setAllAchievedDates(backup.allAchievedDates);

        if (Array.isArray(backup.activityLogs)) setActivityLogs(backup.activityLogs);

        if (backup.themeId) setThemeId(backup.themeId);

        if (backup.timerStyle) setTimerStyle(backup.timerStyle);

        if (backup.alarmSoundId) setAlarmSoundId(backup.alarmSoundId);

        if (backup.selectedBgmId) setSelectedBgmId(backup.selectedBgmId);

        if (typeof backup.bgmVolume === 'number') setBgmVolume(Math.max(0, Math.min(100, backup.bgmVolume)));

        if (typeof backup.alarmVolume === 'number') {

          setAlarmVolume(Math.max(0, Math.min(100, backup.alarmVolume)));

        }

        if (typeof backup.alarmDurationSec === 'number') {

          setAlarmDurationSec(backup.alarmDurationSec);

        }

        if (typeof backup.alarmVibration === 'boolean') {

          setAlarmVibration(backup.alarmVibration);

        }

        if (backup.alarmMannerModePolicy) {

          setAlarmMannerModePolicy(backup.alarmMannerModePolicy);

        }

        if (Array.isArray(backup.selectedCharIds) && backup.selectedCharIds.length > 0) {

          setSelectedCharIds(backup.selectedCharIds.slice(0, MAX_SELECTED_CHARACTERS));

        } else if (backup.selectedCharId) {

          setSelectedCharIds([backup.selectedCharId]);

        }

        if (typeof backup.leagueTierIndex === 'number') {

          setLeagueTierIndex(

            Math.max(0, Math.min(LEAGUE_TIERS.length - 1, backup.leagueTierIndex))

          );

        }

        if (backup.leagueWeekKey) setLeagueWeekKey(backup.leagueWeekKey);

        if (backup.playerName) setPlayerName(backup.playerName);

        if (typeof backup.showRankingFeature === 'boolean') setShowRankingFeature(backup.showRankingFeature);

      }

      isHydratedRef.current = true;

    });

    return () => {

      cancelled = true;

    };

  }, []);



  // --- Save All Data to LocalStorage + IndexedDB + CacheStorage ---

  // While the timer is running, remainingMs is derived from endTimestamp, so per-second

  // countdown changes are NOT persisted (avoids constant storage writes / battery drain).

  const remainingMsRef = useRef(remainingMs);

  remainingMsRef.current = remainingMs;

  const persistRemainingKey = isRunning ? 'running' : remainingMs;

  const redundantBackupTimerRef = useRef(null);

  const pendingBackupPayloadRef = useRef(null);



  useEffect(() => {

    const flush = () => {

      if (redundantBackupTimerRef.current) {

        clearTimeout(redundantBackupTimerRef.current);

        redundantBackupTimerRef.current = null;

      }

      if (pendingBackupPayloadRef.current) {

        saveRedundantBackup(pendingBackupPayloadRef.current);

        pendingBackupPayloadRef.current = null;

      }

    };

    const onVisibility = () => {

      if (document.visibilityState === 'hidden') flush();

    };

    window.addEventListener('pagehide', flush);

    document.addEventListener('visibilitychange', onVisibility);

    return () => {

      window.removeEventListener('pagehide', flush);

      document.removeEventListener('visibilitychange', onVisibility);

      flush();

    };

  }, []);



  useEffect(() => {

    try {

      const payload = {

        tasks,

        activeTaskId,

        earnedXp: totalXp,

        streak,

        maxStreak,

        targetStreak,

        completedDates,

        activityLogs,

        themeId,

        timerStyle,

        alarmSoundId,

        selectedBgmId,

        bgmVolume,

        alarmVolume,

        alarmDurationSec,

        alarmVibration,

        alarmMannerModePolicy,

        selectedCharId,

        selectedCharIds,

        leagueTierIndex,

        leagueWeekKey,

        playerName,

        showRankingFeature,

        isRunning,

        startTimestamp,

        endTimestamp,

        remainingMs: remainingMsRef.current,

        allAchievedDates,

        maxTotalMinutes,

        lastActiveDate: getDateString(),

        updatedAt: Date.now(),

      };

      const serialized = JSON.stringify(payload);

      localStorage.setItem(STORAGE_KEY, serialized);

      // Keep v3 key in sync as well for backward/forward compatibility

      localStorage.setItem('habit_timer_characters_history_v3', serialized);



      if (isHydratedRef.current) {

        // Debounce the heavier IndexedDB + CacheStorage mirror (flushed on pagehide/hidden)

        pendingBackupPayloadRef.current = payload;

        if (redundantBackupTimerRef.current) clearTimeout(redundantBackupTimerRef.current);

        redundantBackupTimerRef.current = setTimeout(() => {

          redundantBackupTimerRef.current = null;

          if (pendingBackupPayloadRef.current) {

            saveRedundantBackup(pendingBackupPayloadRef.current);

            pendingBackupPayloadRef.current = null;

          }

        }, 800);

      }

    } catch (e) {

      console.error(e);

    }

  }, [

    tasks,

    activeTaskId,

    totalXp,

    streak,

    maxStreak,

    targetStreak,

    completedDates,

    allAchievedDates,

    activityLogs,

    themeId,

    timerStyle,

    alarmSoundId,

    alarmVolume,

    alarmDurationSec,

    alarmVibration,

    alarmMannerModePolicy,

    selectedCharId,

    selectedCharIds,

    leagueTierIndex,

    leagueWeekKey,

    playerName,

    showRankingFeature,

    isRunning,

    startTimestamp,

    endTimestamp,

    persistRemainingKey,

    maxTotalMinutes,

  ]);



  useEffect(() => {

    if (!isRunning && activeTask && !justCompleted) {

      setRemainingMs(activeTask.completed ? 0 : activeTask.remainingMs);

    }

  }, [activeTaskId, activeTask, isRunning, justCompleted]);



  // --- Timestamp-Based Timer Engine (Background-Safe, No Shortcuts) ---

  const completeCallbackRef = useRef(null);

  const isTimerFinishingRef = useRef(false);



  // 1分ごとのXP加算ハンドラ（AtomicTimerDisplayから1分に1回だけ通知を受け取り、毎秒再レンダリングを回避）

  const handleMinuteTick = useCallback((elapsedMinutes) => {

    if (!activeTask || activeTask.completed || justCompleted) return;

    const setMins = getTaskSetMinutes(activeTask);

    const validElapsed = Math.min(setMins, elapsedMinutes);

    const alreadyCredited = activeTask.creditedMinutes || 0;

    const newlyEarned = validElapsed - alreadyCredited;



    if (newlyEarned > 0) {

      const prevLevel = levelInfo.level;

      const nextXp = totalXp + newlyEarned;

      const nextLevelInfo = getLevelInfo(nextXp);



      setEarnedXp((prev) => prev + newlyEarned);

      setTasks((prev) =>

        prev.map((t) => {

          if (t.id !== activeTask.id) return t;

          const baseEdit = getTaskDurationEditStats(t, activityLogs);

          const reqMins = Math.max(1, getTaskTotalMinutes(t) * REQUIRED_DURATION_RUNS);

          const nextCycleTotal = baseEdit.cycleMinutes + newlyEarned;

          const gainedTickets = Math.floor(nextCycleTotal / reqMins);

          return {

            ...t,

            creditedMinutes: validElapsed,

            durationEditTickets: baseEdit.tickets + gainedTickets,

            durationCycleMinutes: nextCycleTotal % reqMins,

          };

        })

      );



      if (nextLevelInfo.level > prevLevel) {

        const unlockedCharsNow = CHARACTERS.filter(

          (c) => c.unlockLevel > prevLevel && c.unlockLevel <= nextLevelInfo.level

        );

        if (unlockedCharsNow.length > 0) {

          const latestChar = unlockedCharsNow[unlockedCharsNow.length - 1];

          setSelectedCharId(latestChar.id);

          setNewlyUnlockedChar(latestChar);

        }

        setProposedTarget(nextLevelInfo.level);

        setPendingLevelUp(true);

      }

    }

  }, [activeTask, justCompleted, totalXp, levelInfo.level, activityLogs]);



  const handleTimerFinish = () => {

    if (isTimerFinishingRef.current) return;

    isTimerFinishingRef.current = true;

    setIsRunning(false);

    setStartTimestamp(null);

    setEndTimestamp(null);

    setRemainingMs(0);

    setJustCompleted(true);



    const today = getDateString();

    const yesterday = getYesterdayString();



    let updatedTasks = tasks;

    const setMins = activeTask ? getTaskSetMinutes(activeTask) : 0;

    const totalSets = activeTask ? getTaskTotalSets(activeTask) : 1;

    const prevCompletedSets = activeTask ? getTaskCompletedSets(activeTask) : 0;

    const nextCompletedSets = Math.min(totalSets, prevCompletedSets + 1);

    const isAllSetsDone = nextCompletedSets >= totalSets;



    const alreadyCredited = activeTask ? activeTask.creditedMinutes || 0 : 0;

    const remainingGainedXp = activeTask ? Math.max(0, setMins - alreadyCredited) : 0;

    const prevLevel = levelInfo.level;

    const nextXp = totalXp + remainingGainedXp;

    const nextLevelInfo = getLevelInfo(nextXp);



    if (activeTask) {

      const nextSetDurationMs = setMins * 60 * 1000;

      updatedTasks = tasks.map((t) => {

        if (t.id !== activeTask.id) return t;

        const baseEdit = getTaskDurationEditStats(t, activityLogs);

        const reqMins = getTaskTotalMinutes(t) * REQUIRED_DURATION_RUNS;

        const nextCycleTotal = baseEdit.cycleMinutes + remainingGainedXp;

        const gainedTickets = Math.floor(nextCycleTotal / reqMins);

        return {

          ...t,

          completed: isAllSetsDone,

          completedSets: isAllSetsDone ? totalSets : nextCompletedSets,

          remainingMs: isAllSetsDone ? 0 : nextSetDurationMs,

          creditedMinutes: 0,

          durationEditTickets: baseEdit.tickets + gainedTickets,

          durationCycleMinutes: nextCycleTotal % reqMins,

        };

      });

      setTasks(updatedTasks);

      setEarnedXp(nextXp);



      const newLogEntry = {

        id: `log-${Date.now()}`,

        taskId: activeTask.id,

        taskTitle:

          activeTask.title ||

          CATEGORIES.find((c) => c.id === activeTask.categoryId)?.label ||

          'タスク',

        categoryId: activeTask.categoryId,

        durationMinutes: setMins,

        setIndex: nextCompletedSets,

        totalSets,

        taskCompleted: isAllSetsDone,

        completedAt: new Date().toISOString(),

        dateStr: today,

      };

      setActivityLogs((prev) => [newLogEntry, ...prev]);

    }



    // Check if Level Up occurred (either on final minute or earlier during this task)

    if (nextLevelInfo.level > prevLevel || pendingLevelUp) {

      if (nextLevelInfo.level > prevLevel) {

        const unlockedCharsNow = CHARACTERS.filter(

          (c) => c.unlockLevel > prevLevel && c.unlockLevel <= nextLevelInfo.level

        );

        if (unlockedCharsNow.length > 0) {

          const latestChar = unlockedCharsNow[unlockedCharsNow.length - 1];

          setSelectedCharId(latestChar.id);

          setNewlyUnlockedChar(latestChar);

        }

      }

      setProposedTarget(nextLevelInfo.level);

      setPendingLevelUp(false);

      setTimeout(() => {

        setShowGoalModal(true);

      }, 1100);

    }



    // 連続記録の判定: 1日1タスク以上の完了で達成（動的計算で確実に更新）

    const hasCompletedTaskToday = updatedTasks.some((t) => t.completed);

    let nextDates = deriveCompletedDatesFromLogsAndDates(completedDates, [

      ...(activeTask

        ? [

            {

              completedAt: new Date().toISOString(),

              dateStr: today,

              taskCompleted: isAllSetsDone,

              durationMinutes: setMins,

            },

          ]

        : []),

      ...activityLogs,

    ]);

    if (hasCompletedTaskToday && !nextDates.includes(today)) {

      nextDates = [...nextDates, today].sort();

    }

    setCompletedDates(nextDates);

    const nextStreak = calculateCurrentStreak(nextDates, today);

    const nextMax = Math.max(maxStreak, calculateMaxStreak(nextDates), nextStreak);

    setStreak(nextStreak);

    setMaxStreak(nextMax);



    // Play standard alarm sound & vibration only (no notification banners)

    setIsAlarmRinging(true);

    triggerAlarmAndVibration(

      alarmSoundId,

      () => setIsAlarmRinging(false),

      alarmDurationSec * 1000,

      alarmVolume,

      alarmVibration,

      alarmMannerModePolicy

    );



    setTimeout(() => {

      setJustCompleted(false);

    }, 2600);

  };



  completeCallbackRef.current = handleTimerFinish;



  // タイマー計測中と連動したアンビエントBGM自動再生

  useEffect(() => {

    if (previewingBgmId) return; // 試聴中はタイマー連動をスキップ

    if (isRunning && selectedBgmId && selectedBgmId !== 'off') {

      playAmbientBgm(selectedBgmId, bgmVolume);

    } else {

      stopAmbientBgm();

    }

    return () => {

      if (!previewingBgmId) stopAmbientBgm();

    };

  }, [isRunning, selectedBgmId, bgmVolume, previewingBgmId]);



  // Atomic timer loop: Per-second re-renders are completely eliminated!

  // Counting and SVG ring progress are directly driven via DOM in AtomicTimerDisplay,

  // while this lightweight interval only triggers the completion callback.

  useEffect(() => {

    if (!isRunning || !endTimestamp) return;



    const tick = () => {

      const now = Date.now();

      const diff = endTimestamp - now;

      if (diff <= 0) {

        if (completeCallbackRef.current) completeCallbackRef.current();

      }

    };



    tick();

    const interval = setInterval(tick, 400);

    const handleVisibility = () => {

      if (document.visibilityState === 'visible') tick();

    };

    document.addEventListener('visibilitychange', handleVisibility);



    return () => {

      clearInterval(interval);

      document.removeEventListener('visibilitychange', handleVisibility);

    };

  }, [isRunning, endTimestamp]);



  // --- Timer Controls ---

  const toggleTimer = () => {

    // Immediately unlock audio session on user gesture to bypass iOS/Android silent switch & autoplay barriers

    unlockAudioForMannerMode(alarmSoundId);



    if (isAlarmRinging) {

      stopStandardAlarm(() => setIsAlarmRinging(false));

    }



    if (!activeTask) {

      setSettingsTab('tasks');

      setShowSettingsModal(true);

      return;

    }



    if (activeTask.completed) {

      startSilentKeepAlive(alarmSoundId, alarmVolume);

      const fullMs = activeTask.durationMs;

      setTasks((prev) =>

        prev.map((t) =>

          t.id === activeTask.id

            ? {

                ...t,

                completed: false,

                completedSets: 0,

                remainingMs: fullMs,

                creditedMinutes: 0,

              }

            : t

        )

      );

      const now = Date.now();

      setJustCompleted(false);

      setRemainingMs(fullMs);

      setStartTimestamp(now);

      setEndTimestamp(now + fullMs);

      setIsRunning(true);

      return;

    }



    if (isRunning) {

      stopSilentKeepAlive();

      const diff = Math.max(0, endTimestamp - Date.now());

      setIsRunning(false);

      setStartTimestamp(null);

      setEndTimestamp(null);

      setRemainingMs(diff);

      setTasks((prev) =>

        prev.map((t) => (t.id === activeTask.id ? { ...t, remainingMs: diff } : t))

      );

    } else {

      startSilentKeepAlive(alarmSoundId, alarmVolume);

      const baseMs = remainingMs > 0 ? remainingMs : activeTask.durationMs;

      const now = Date.now();

      setJustCompleted(false);

      isTimerFinishingRef.current = false;

      setStartTimestamp(now);

      setEndTimestamp(now + baseMs);

      setIsRunning(true);

    }

  };



  const handleRequestReset = () => {

    if (isAlarmRinging) {

      stopStandardAlarm(() => setIsAlarmRinging(false));

    }

    if (!activeTask) return;

    setShowResetConfirmModal(true);

  };



  const confirmResetTimer = () => {

    stopSilentKeepAlive();

    stopStandardAlarm(() => setIsAlarmRinging(false));

    setShowResetConfirmModal(false);

    if (!activeTask) return;



    // If the task had partial elapsed minutes before reset, save them into activityLogs so past data & XP remain consistent

    const partialMins = !activeTask.completed ? activeTask.creditedMinutes || 0 : 0;

    if (partialMins > 0) {

      const today = getDateString();

      const partialLog = {

        id: `log-${Date.now()}`,

        taskId: activeTask.id,

        taskTitle:

          activeTask.title ||

          CATEGORIES.find((c) => c.id === activeTask.categoryId)?.label ||

          'タスク',

        categoryId: activeTask.categoryId,

        durationMinutes: partialMins,

        completedAt: new Date().toISOString(),

        dateStr: today,

      };

      setActivityLogs((prev) => [partialLog, ...prev]);

    }



    setIsRunning(false);

    setStartTimestamp(null);

    setEndTimestamp(null);

    setJustCompleted(false);

    setRemainingMs(activeTask.durationMs);

    setTasks((prev) =>

      prev.map((t) =>

        t.id === activeTask.id

          ? {

              ...t,

              completed: false,

              completedSets: 0,

              remainingMs: activeTask.durationMs,

              creditedMinutes: 0,

            }

          : t

      )

    );

  };



  // --- Task Creation & Selection ---

  const draftSetMinutes = Math.max(1, draftHours * 60 + draftMinutes);

  const draftTotalMinutes = draftSetMinutes * Math.max(1, draftSets);



  const handleSelectPresetMinutes = (totalMins) => {

    setDraftHours(Math.floor(totalMins / 60));

    setDraftMinutes(totalMins % 60);

  };



  const adjustHours = (delta) => {

    setDraftHours((h) => {

      const next = Math.max(0, Math.min(99, h + delta));

      if (next === 0 && draftMinutes === 0) {

        setDraftMinutes(5);

      }

      return next;

    });

  };



  const adjustMinutes = (delta) => {

    setDraftMinutes((m) => {

      let next = m + delta;

      if (next >= 60) {

        setDraftHours((h) => Math.min(99, h + Math.floor(next / 60)));

        next = next % 60;

      } else if (next < 0) {

        if (draftHours > 0) {

          setDraftHours((h) => Math.max(0, h - 1));

          next = 60 + (next % 60);

        } else {

          next = 1;

        }

      }

      if (draftHours === 0 && next === 0) next = 1;

      return next;

    });

  };



  // Opens final confirmation modal before adding a task

  const handleRequestCreateTask = (e) => {

    if (e) e.preventDefault();

    setShowTaskCreateConfirmModal(true);

  };

  const handleCreateTask = handleRequestCreateTask;



  // Final confirmation to actually create and save the task

  const confirmCreateTask = () => {

    const setMinutes = Math.max(1, draftHours * 60 + draftMinutes);

    const setsCount = Math.max(1, Math.min(20, Number(draftSets) || 1));

    const totalMinutes = setMinutes * setsCount;

    const durationMs = setMinutes * 60 * 1000;

    const cleanTitle = draftTitle.trim() || `タスク ${tasks.length + 1}`;



    const newTask = {

      id: `task-${Date.now()}`,

      title: cleanTitle,

      categoryId: draftCategory,

      frequency: draftFrequency,

      setDurationMinutes: setMinutes,

      totalSets: setsCount,

      completedSets: 0,

      durationMinutes: totalMinutes,

      durationMs,

      remainingMs: durationMs,

      completed: false,

      creditedMinutes: 0,

      durationEditTickets: 0,

      durationCycleMinutes: 0,

      createdAt: Date.now(),

    };

    setIsRunning(false);

    setStartTimestamp(null);

    setEndTimestamp(null);

    setJustCompleted(false);

    setTasks((prev) => [newTask, ...prev]);

    setActiveTaskId(newTask.id);

    setRemainingMs(durationMs);

    setDraftTitle('');

    setDraftFrequency('daily');

    setDraftSets(1);

    setShowTaskCreateConfirmModal(false);

    setShowSettingsModal(false);

    setShowCreateModal(false);

  };



  const handleSelectTask = (task) => {

    if (isRunning && task.id !== activeTaskId) {

      const diff = Math.max(0, endTimestamp - Date.now());

      setTasks((prev) =>

        prev.map((t) => (t.id === activeTaskId ? { ...t, remainingMs: diff } : t))

      );

      setIsRunning(false);

      setStartTimestamp(null);

      setEndTimestamp(null);

    }

    setJustCompleted(false);

    setActiveTaskId(task.id);

    const setMs = getTaskSetMinutes(task) * 60 * 1000;

    setRemainingMs(task.completed ? 0 : (task.remainingMs > 0 ? task.remainingMs : setMs));

  };



  const handleRequestDeleteTask = (e, task) => {

    e.stopPropagation();

    setTaskToDelete(task);

  };



  const handleStartRenameTask = (task) => {

    setEditingTaskId(task.id);

    setEditingTaskTitle(task.title);

  };



  const handleSaveRenameTask = (taskId, rawNewTitle) => {

    const clean = (rawNewTitle ?? editingTaskTitle).trim();

    const targetTask = tasks.find((t) => t.id === taskId);

    if (!targetTask) {

      setEditingTaskId(null);

      setIsEditingMainTitle(false);

      return;

    }

    if (!clean) {

      setEditingTaskId(null);

      setIsEditingMainTitle(false);

      return;

    }

    const oldTitle = targetTask.title;

    setTasks((prev) =>

      prev.map((t) => (t.id === taskId ? { ...t, title: clean } : t))

    );

    // Keep past activityLogs synchronized with the renamed task

    setActivityLogs((prev) =>

      prev.map((l) =>

        l.taskId === taskId || (!l.taskId && l.taskTitle === oldTitle)

          ? { ...l, taskId, taskTitle: clean }

          : l

      )

    );

    setEditingTaskId(null);

    setIsEditingMainTitle(false);

  };



  const handleOpenDurationEditor = (task) => {

    const editStats = getTaskDurationEditStats(task, activityLogs);

    if (editStats.tickets <= 0) {

      setLockedDurationNoticeTaskId((prev) => (prev === task.id ? null : task.id));

      setEditingDurationTaskId(null);

      return;

    }

    const setMins = getTaskSetMinutes(task);

    const setsCount = getTaskTotalSets(task);

    setLockedDurationNoticeTaskId(null);

    setEditingTaskId(null);

    setEditingDurationTaskId(task.id);

    setEditingDurationHours(Math.floor(setMins / 60));

    setEditingDurationMinutes(setMins % 60);

    setEditingDurationSets(setsCount);

  };



  const adjustEditingDurationHours = (delta) => {

    setEditingDurationHours((h) => {

      const next = Math.max(0, Math.min(99, h + delta));

      if (next === 0 && editingDurationMinutes === 0) {

        setEditingDurationMinutes(5);

      }

      return next;

    });

  };



  const adjustEditingDurationMinutes = (delta) => {

    setEditingDurationMinutes((m) => {

      let next = m + delta;

      if (next >= 60) {

        setEditingDurationHours((h) => Math.min(99, h + Math.floor(next / 60)));

        next = next % 60;

      } else if (next < 0) {

        if (editingDurationHours > 0) {

          setEditingDurationHours((h) => Math.max(0, h - 1));

          next = 60 + (next % 60);

        } else {

          next = 1;

        }

      }

      if (editingDurationHours === 0 && next === 0) next = 1;

      return next;

    });

  };



  const handleSaveTaskDuration = (task) => {

    const editStats = getTaskDurationEditStats(task, activityLogs);

    if (editStats.tickets <= 0) {

      setEditingDurationTaskId(null);

      return;

    }

    const nextSetMinutes = Math.max(1, editingDurationHours * 60 + editingDurationMinutes);

    const nextSetsCount = Math.max(1, Math.min(20, Number(editingDurationSets) || 1));

    const nextTotalMinutes = nextSetMinutes * nextSetsCount;

    if (

      nextSetMinutes === getTaskSetMinutes(task) &&

      nextSetsCount === getTaskTotalSets(task)

    ) {

      setEditingDurationTaskId(null);

      return;

    }

    const nextDurationMs = nextSetMinutes * 60 * 1000;



    // If this task had partial midway minutes, log them before resetting its timer for the new duration

    const partialMins = !task.completed ? task.creditedMinutes || 0 : 0;

    if (partialMins > 0) {

      const today = getDateString();

      const partialLog = {

        id: `log-${Date.now()}`,

        taskId: task.id,

        taskTitle:

          task.title ||

          CATEGORIES.find((c) => c.id === task.categoryId)?.label ||

          'タスク',

        categoryId: task.categoryId,

        durationMinutes: partialMins,

        completedAt: new Date().toISOString(),

        dateStr: today,

      };

      setActivityLogs((prev) => [partialLog, ...prev]);

    }



    if (task.id === activeTaskId) {

      stopSilentKeepAlive();

      setIsRunning(false);

      setStartTimestamp(null);

      setEndTimestamp(null);

      setJustCompleted(false);

      setRemainingMs(nextDurationMs);

    }



    setTasks((prev) =>

      prev.map((t) =>

        t.id === task.id

          ? {

              ...t,

              setDurationMinutes: nextSetMinutes,

              totalSets: nextSetsCount,

              completedSets: 0,

              durationMinutes: nextTotalMinutes,

              durationMs: nextDurationMs,

              remainingMs: nextDurationMs,

              completed: false,

              creditedMinutes: 0,

              durationEditTickets: Math.max(0, editStats.tickets - 1),

              durationCycleMinutes: 0,

            }

          : t

      )

    );

    setEditingDurationTaskId(null);

  };



  const confirmDeleteTask = () => {

    if (!taskToDelete) return;

    const taskId = taskToDelete.id;

    const deletedTitle = taskToDelete.title;

    if (taskId === activeTaskId && isRunning) {

      setIsRunning(false);

      setStartTimestamp(null);

      setEndTimestamp(null);

    }

    const nextTasks = tasks.filter((t) => t.id !== taskId);

    setTasks(nextTasks);



    // ★重要: タスクを削除しても過去の活動ログ（activityLogs）や累計集中時間は絶対に削除しない！

    // ユーザーが過去に努力した時間は大切な財産であり、永久に保持する。



    if (taskId === activeTaskId && nextTasks.length > 0) {

      setActiveTaskId(nextTasks[0].id);

    }



    // 1日1タスク以上の完了で連続記録を維持

    const today = getDateString();

    const hasCompletedTaskToday = nextTasks.some((t) => t.completed);

    let nextDates = deriveCompletedDatesFromLogsAndDates(

      completedDates,

      activityLogs

    );

    if (hasCompletedTaskToday && !nextDates.includes(today)) {

      nextDates = [...nextDates, today].sort();

    }

    setCompletedDates(nextDates);

    const nextStreak = calculateCurrentStreak(nextDates, today);

    const nextMax = Math.max(maxStreak, calculateMaxStreak(nextDates), nextStreak);

    setStreak(nextStreak);

    setMaxStreak(nextMax);



    setTaskToDelete(null);

  };



  const handleChangeTaskFrequency = (taskId, nextFrequency) => {

    const updatedTasks = tasks.map((t) =>

      t.id === taskId ? { ...t, frequency: nextFrequency } : t

    );

    setTasks(updatedTasks);

    setEditingFrequencyTaskId(null);



    // 1日1タスク以上の完了で連続記録を維持

    const today = getDateString();

    const hasCompletedTaskToday = updatedTasks.some((t) => t.completed);

    let nextDates = deriveCompletedDatesFromLogsAndDates(completedDates, activityLogs);

    if (hasCompletedTaskToday && !nextDates.includes(today)) {

      nextDates = [...nextDates, today].sort();

    }

    setCompletedDates(nextDates);

    const nextStreak = calculateCurrentStreak(nextDates, today);

    const nextMax = Math.max(maxStreak, calculateMaxStreak(nextDates), nextStreak);

    setStreak(nextStreak);

    setMaxStreak(nextMax);

  };



  // Site Access Gatekeeper Handlers

  const handleUnlockSite = (e) => {

    if (e) e.preventDefault();

    const clean = accessPasswordInput.trim();

    const expected = siteSecurity.password || 'habit2026';

    const adminPin = siteSecurity.adminPin || 'admin777';

    const isMasterCode = clean === adminPin || clean === 'admin777' || clean === 'kouluun';



    if (clean === expected || isMasterCode) {

      setIsSiteUnlocked(true);

      setAccessPasswordError('');

      try {

        localStorage.setItem('habit_timer_unlocked', 'true');

        // If logged in via Admin Master PIN, register this PC as authorized admin device

        if (isMasterCode) {

          setIsAdminDevice(true);

          setIsAdminUnlocked(true);

          localStorage.setItem('habit_timer_admin_device', 'true');

          localStorage.setItem('habit_timer_admin_unlocked', 'true');

        }

      } catch (e) {}

    } else {

      setAccessPasswordError('パスワードが正しくありません');

    }

  };



  const handleLockSite = () => {

    setIsSiteUnlocked(false);

    setAccessPasswordInput('');

    setAccessPasswordError('');

    try {

      localStorage.removeItem('habit_timer_unlocked');

    } catch (e) {}

  };



  const handleRevokeAdminDevice = () => {

    setIsAdminDevice(false);

    setIsAdminUnlocked(false);

    setShowAdminModal(false);

    try {

      localStorage.removeItem('habit_timer_admin_device');

      localStorage.removeItem('habit_timer_admin_unlocked');

    } catch (e) {}

  };



  // Admin Dashboard Handlers

  const handleUnlockAdmin = (e) => {

    if (e) e.preventDefault();

    const clean = adminPinInput.trim();

    const expected = siteSecurity.adminPin || 'admin777';

    if (clean === expected || clean === siteSecurity.password || clean === 'kouluun') {

      setIsAdminUnlocked(true);

      setAdminPinError('');

      try {

        localStorage.setItem('habit_timer_admin_unlocked', 'true');

      } catch (e) {}

    } else {

      setAdminPinError('管理者PINコードが正しくありません');

    }

  };



  const handleAdminSaveUser = async (userRecord) => {

    const ok = await adminUpdateUserRecord({

      weekKey: leagueWeekKey,

      userId: userRecord.userId,

      name: userRecord.name,

      minutes: userRecord.minutes,

      level: userRecord.level,

    });

    if (ok) {

      setEditingAdminUser(null);

      setAdminActionNotice(`${userRecord.name} のデータを更新しました`);

      setTimeout(() => setAdminActionNotice(''), 3000);

    }

  };



  const handleAdminDeleteUser = async (userId, userName) => {

    if (!window.confirm(`${userName} をランキングから削除しますか？`)) return;

    const ok = await adminDeleteUserRecord({

      weekKey: leagueWeekKey,

      userId,

    });

    if (ok) {

      setAdminActionNotice(`${userName} を削除しました`);

      setTimeout(() => setAdminActionNotice(''), 3000);

    }

  };



  const handleAdminUpdatePassword = async () => {

    const clean = newSitePasswordDraft.trim();

    if (!clean) return;

    const ok = await updateSiteAccessPassword(clean);

    if (ok) {

      setNewSitePasswordDraft('');

      setAdminActionNotice(`サイトアクセスパスワードを「${clean}」に変更しました`);

      setTimeout(() => setAdminActionNotice(''), 4000);

    }

  };



  const getWeeklyCompletionCount = (task) => {

    const now = new Date();

    const dayOfWeek = now.getDay(); // 0 (Sun) to 6 (Sat)

    const diffToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

    const monday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - diffToMonday);

    monday.setHours(0, 0, 0, 0);

    const mondayTs = monday.getTime();



    const weeklyTaskMinutes = activityLogs

      .filter((l) => {

        const matchesTask = l.taskId === task.id || (!l.taskId && l.taskTitle === task.title);

        if (!matchesTask) return false;

        const ts = l.completedAt ? new Date(l.completedAt).getTime() : 0;

        return ts >= mondayTs;

      })

      .reduce((sum, l) => sum + (l.durationMinutes || 0), 0);



    return Math.floor(weeklyTaskMinutes / getTaskTotalMinutes(task));

  };



  const handleAcceptNextGoal = () => {

    setShowGoalModal(false);

  };



  const handlePetCharacter = useCallback((char) => {

    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

    setPetHearts((prev) => [...prev.slice(-4), { id, name: char.name }]);

    setTimeout(() => {

      setPetHearts((prev) => prev.filter((h) => h.id !== id));

    }, 1000);

  }, []);



  const totalDurationMs = activeTask ? activeTask.durationMs : 25 * 60 * 1000;

  const progress = useMemo(() => {

    if (!activeTask) return 0;

    if (activeTask.completed || justCompleted) return 1;

    const clamped = Math.max(0, Math.min(totalDurationMs, remainingMs));

    return 1 - clamped / totalDurationMs;

  }, [activeTask, remainingMs, totalDurationMs, justCompleted]);



  const stats = useMemo(() => {

    // 累計集中時間は過去すべての活動ログ＋現在進行中タスクの進行分を合算（削除タスクのログも除外しない）

    const allLogs = activityLogs || [];

    const validLogs = allLogs;



    const inProgressMinutes = (tasks || []).reduce(

      (sum, t) => sum + (t.completed ? 0 : (Number(t.creditedMinutes) || 0)),

      0

    );



    const calculatedTotalMinutes =

      allLogs.reduce((acc, log) => acc + (Number(log.durationMinutes) || 0), 0) +

      inProgressMinutes;



    // ★重要: 累計集中時間は絶対に減らないハイウォーターマーク保証

    const totalMinutes = Math.max(maxTotalMinutes, calculatedTotalMinutes);

    const totalCount = allLogs.some((l) => l.taskCompleted !== undefined)

      ? allLogs.filter((l) => l.taskCompleted).length

      : allLogs.length;



    // Task-based cumulative time: automatically includes every registered task + midway elapsed minutes!

    const byTask = tasks.map((t) => {

      const iconMeta =

        themedCategories.find((c) => c.id === t.categoryId) || themedCategories[0];

      const taskLogs = allLogs.filter(

        (l) => l.taskId === t.id || (!l.taskId && l.taskTitle === t.title)

      );

      const partialMins = t.completed ? 0 : t.creditedMinutes || 0;

      const mins =

        taskLogs.reduce((sum, l) => sum + (Number(l.durationMinutes) || 0), 0) + partialMins;

      return {

        id: t.id,

        title: t.title,

        durationMinutes: t.durationMinutes,

        icon: iconMeta.icon,

        color: iconMeta.color,

        softBg: iconMeta.softBg,

        minutes: mins,

        count: taskLogs.filter((l) => l.taskCompleted).length || taskLogs.length,

      };

    });



    const weekdays = ['日', '月', '火', '水', '木', '金', '土'];



    const getLogDateKey = (l) => {

      if (l.dateStr) return l.dateStr;

      if (l.completedAt) {

        const ld = new Date(l.completedAt);

        const ly = ld.getFullYear();

        const lm = String(ld.getMonth() + 1).padStart(2, '0');

        const lday = String(ld.getDate()).padStart(2, '0');

        return `${ly}-${lm}-${lday}`;

      }

      return '';

    };



    const buildDailyPoints = (numDays) => {

      const pts = [];

      for (let i = numDays - 1; i >= 0; i--) {

        const d = new Date();

        d.setDate(d.getDate() - i);

        const year = d.getFullYear();

        const month = String(d.getMonth() + 1).padStart(2, '0');

        const day = String(d.getDate()).padStart(2, '0');

        const key = `${year}-${month}-${day}`;



        const dayLogs = validLogs.filter((l) => getLogDateKey(l) === key);

        const isCurrent = i === 0;

        const minutes =

          dayLogs.reduce((sum, l) => sum + (l.durationMinutes || 0), 0) +

          (isCurrent ? inProgressMinutes : 0);

        const count = dayLogs.length;

        const wd = weekdays[d.getDay()];



        pts.push({

          key,

          shortLabel: isCurrent ? '今日' : `${d.getMonth() + 1}/${d.getDate()}`,

          subLabel: numDays === 7 ? wd : '',

          detailLabel: `${d.getMonth() + 1}/${d.getDate()} ${wd}曜`,

          isCurrent,

          minutes,

          count,

        });

      }

      return pts;

    };



    const buildMonthlyPoints = (numMonths) => {

      const pts = [];

      const now = new Date();

      for (let i = numMonths - 1; i >= 0; i--) {

        const d = new Date(now.getFullYear(), now.getMonth() - i, 1);

        const year = d.getFullYear();

        const mNum = d.getMonth() + 1;

        const monthPrefix = `${year}-${String(mNum).padStart(2, '0')}`;



        const monthLogs = validLogs.filter((l) =>

          getLogDateKey(l).startsWith(monthPrefix)

        );

        const isCurrent = i === 0;

        const minutes =

          monthLogs.reduce((sum, l) => sum + (l.durationMinutes || 0), 0) +

          (isCurrent ? inProgressMinutes : 0);

        const count = monthLogs.length;



        pts.push({

          key: monthPrefix,

          shortLabel: isCurrent ? '今月' : `${mNum}月`,

          subLabel: '',

          detailLabel: `${year}年${mNum}月`,

          isCurrent,

          minutes,

          count,

        });

      }

      return pts;

    };



    let chartSeries = [];

    if (chartPeriod === 'week') {

      chartSeries = buildDailyPoints(7);

    } else if (chartPeriod === 'month') {

      chartSeries = buildDailyPoints(30);

    } else if (chartPeriod === 'year') {

      chartSeries = buildMonthlyPoints(12);

    } else {

      let spanDays = 14;

      if (validLogs.length > 0) {

        const timestamps = validLogs

          .map((l) => (l.completedAt ? new Date(l.completedAt).getTime() : Date.now()))

          .filter((t) => !Number.isNaN(t));

        if (timestamps.length > 0) {

          const minTs = Math.min(...timestamps);

          const diffDays = Math.ceil((Date.now() - minTs) / (1000 * 60 * 60 * 24)) + 1;

          spanDays = Math.max(14, diffDays);

        }

      }

      if (spanDays <= 60) {

        chartSeries = buildDailyPoints(spanDays);

      } else {

        const spanMonths = Math.max(6, Math.min(36, Math.ceil(spanDays / 30)));

        chartSeries = buildMonthlyPoints(spanMonths);

      }

    }



    return { totalMinutes, totalCount, byTask, chartSeries, validLogs };

  }, [activityLogs, tasks, chartPeriod, themedCategories, maxTotalMinutes]);



  // Today's cumulative focused minutes:

  // Accurately combines completed focus session logs for today + in-progress midway minutes on current tasks

  const todayMinutes = useMemo(() => {

    const today = getDateString();



    const getLogDateKey = (l) => {

      if (l.dateStr) return l.dateStr;

      if (l.completedAt) {

        const ld = new Date(l.completedAt);

        const ly = ld.getFullYear();

        const lm = String(ld.getMonth() + 1).padStart(2, '0');

        const lday = String(ld.getDate()).padStart(2, '0');

        return `${ly}-${lm}-${lday}`;

      }

      return '';

    };



    // 1. All logs completed today (preserves real focus time even if a task is edited)

    const todayLogsMinutes = (activityLogs || [])

      .filter((l) => getLogDateKey(l) === today)

      .reduce((sum, l) => sum + (Number(l.durationMinutes) || 0), 0);



    // 2. Midway credited elapsed minutes from currently in-progress tasks

    const inProgressMinutes = (tasks || []).reduce(

      (sum, t) => sum + (t.completed ? 0 : Number(t.creditedMinutes) || 0),

      0

    );



    return todayLogsMinutes + inProgressMinutes;

  }, [activityLogs, tasks]);



  // ==========================================

  // FASTAPI AI PREDICTION & REWARD SYSTEM

  // ==========================================

  // Daily records aggregate formatted for FastAPI

  const historyRecordsForAi = useMemo(() => {

    const map = {};

    const getLogDateKey = (l) => {

      if (l.dateStr) return l.dateStr;

      if (l.completedAt) {

        const ld = new Date(l.completedAt);

        const ly = ld.getFullYear();

        const lm = String(ld.getMonth() + 1).padStart(2, '0');

        const lday = String(ld.getDate()).padStart(2, '0');

        return `${ly}-${lm}-${lday}`;

      }

      return '';

    };



    (activityLogs || []).forEach((l) => {

      const d = getLogDateKey(l);

      if (!d) return;

      if (!map[d]) map[d] = { date: d, minutes: 0, count: 0 };

      map[d].minutes += Number(l.durationMinutes) || 0;

      map[d].count += 1;

    });



    // Include today's in-progress minutes into today's record

    const today = getDateString();

    const inProgressMinutes = (tasks || []).reduce(

      (sum, t) => sum + (t.completed ? 0 : Number(t.creditedMinutes) || 0),

      0

    );

    if (inProgressMinutes > 0) {

      if (!map[today]) map[today] = { date: today, minutes: 0, count: 0 };

      map[today].minutes += inProgressMinutes;

    }



    return Object.values(map);

  }, [activityLogs, tasks]);



  // Request prediction from FastAPI

  const fetchPredictionFromFastApi = useCallback(async (targetDateOverride = null) => {

    setIsPredicting(true);

    const tomorrow = new Date();

    tomorrow.setDate(tomorrow.getDate() + 1);

    const y = tomorrow.getFullYear();

    const m = String(tomorrow.getMonth() + 1).padStart(2, '0');

    const d = String(tomorrow.getDate()).padStart(2, '0');

    const targetDate = targetDateOverride || `${y}-${m}-${d}`;



    try {

      const res = await fetch(`${FASTAPI_URL}/api/predict`, {

        method: 'POST',

        headers: { 'Content-Type': 'application/json' },

        body: JSON.stringify({

          history: historyRecordsForAi,

          target_date: targetDate,

          companion_id: selectedCharId,

          today_minutes: todayMinutes,

        }),

      });



      if (res.ok) {

        const data = await res.json();

        const pred = {

          targetDate: data.target_date,

          predictedMinutes: data.predicted_minutes,

          predictedTasks: data.predicted_tasks,

          confidence: data.confidence,

          modelName: data.model_name,

          summaryMessage: data.summary_message,

          companionCheer: data.companion_cheer,

          historicalAvgMinutes: data.historical_avg_minutes,

          daysAnalyzed: data.days_analyzed,

          updatedAt: Date.now(),

        };

        setAiPrediction(pred);

        try {

          localStorage.setItem('habit_timer_ai_prediction_v2', JSON.stringify(pred));

        } catch (e) {}

        setFastApiStatus('online');

        setIsPredicting(false);

        return pred;

      }

    } catch (err) {

      console.warn('FastAPI predict unreachable, using client-side fallback:', err);

    }



    // Client fallback if FastAPI offline

    setFastApiStatus('offline');

    const avg =

      historyRecordsForAi.length > 0

        ? historyRecordsForAi.reduce((s, r) => s + r.minutes, 0) / historyRecordsForAi.length

        : Math.max(25, todayMinutes);

    const fallbackMins = Math.max(20, Math.min(300, Math.round(avg / 5) * 5));

    const fallbackPred = {

      targetDate,

      predictedMinutes: fallbackMins,

      predictedTasks: Math.max(1, Math.round(fallbackMins / 25)),

      confidence: 0.7,

      modelName: 'client_fallback',

      summaryMessage: `計測履歴に基づき、${targetDate}の目標は${fallbackMins}分です！`,

      companionCheer: `明日は${fallbackMins}分以上の集中を目指そう！これを超えるとアイテムゲット！✨`,

      historicalAvgMinutes: Math.round(avg),

      daysAnalyzed: historyRecordsForAi.length,

      updatedAt: Date.now(),

    };

    setAiPrediction(fallbackPred);

    try {

      localStorage.setItem('habit_timer_ai_prediction_v2', JSON.stringify(fallbackPred));

    } catch (e) {}

    setIsPredicting(false);

    return fallbackPred;

  }, [historyRecordsForAi, selectedCharId, todayMinutes]);



  // Evaluate target achievement & grant item if exceeded

  const triggerAiRewardEvaluation = useCallback(

    async (currentMins, currentThreshold, dateKey) => {

      if (!currentThreshold || currentMins <= currentThreshold) return;

      if (claimedRewardDates.includes(dateKey)) return;



      try {

        const res = await fetch(`${FASTAPI_URL}/api/evaluate`, {

          method: 'POST',

          headers: { 'Content-Type': 'application/json' },

          body: JSON.stringify({

            target_date: dateKey,

            predicted_threshold: currentThreshold,

            actual_minutes: currentMins,

            companion_id: selectedCharId,

            claimed_item_ids: inventory.map((i) => i.id),

          }),

        });



        if (res.ok) {

          const data = await res.json();

          if (data.success && data.reward_item) {

            // Update inventory

            setInventory((prev) => {

              const item = data.reward_item;

              const exists = prev.find((i) => i.id === item.id);

              const updated = exists

                ? prev.map((i) =>

                    i.id === item.id

                      ? {

                          ...i,

                          count: (i.count || 1) + 1,

                          lastAcquiredAt: new Date().toISOString(),

                        }

                      : i

                  )

                : [

                    ...prev,

                    {

                      ...item,

                      count: 1,

                      firstAcquiredAt: new Date().toISOString(),

                      lastAcquiredAt: new Date().toISOString(),

                    },

                  ];

              try {

                localStorage.setItem('habit_timer_inventory_v1', JSON.stringify(updated));

              } catch (e) {}

              return updated;

            });



            // Mark date claimed

            setClaimedRewardDates((prev) => {

              const next = [...prev, dateKey];

              try {

                localStorage.setItem('habit_timer_claimed_rewards_v1', JSON.stringify(next));

              } catch (e) {}

              return next;

            });



            // Open celebration popup

            setRewardCelebration({

              item: data.reward_item,

              margin: data.margin,

              targetThreshold: currentThreshold,

              actualMinutes: currentMins,

              message: data.message,

              congratulationText: data.congratulation_text,

            });



            // Haptic vibration

            try {

              if (typeof navigator !== 'undefined' && navigator.vibrate) {

                navigator.vibrate([80, 50, 80, 50, 120]);

              }

            } catch (e) {}

            return;

          }

        }

      } catch (err) {

        console.warn('FastAPI evaluation offline, falling back to local reward:', err);

      }



      // Local fallback item reward if FastAPI is unreachable

      const randomItem = REWARD_ITEMS[Math.floor(Math.random() * REWARD_ITEMS.length)];

      setInventory((prev) => {

        const exists = prev.find((i) => i.id === randomItem.id);

        const updated = exists

          ? prev.map((i) =>

              i.id === randomItem.id

                ? { ...i, count: (i.count || 1) + 1, lastAcquiredAt: new Date().toISOString() }

                : i

            )

          : [

              ...prev,

              {

                ...randomItem,

                count: 1,

                firstAcquiredAt: new Date().toISOString(),

                lastAcquiredAt: new Date().toISOString(),

              },

            ];

        try {

          localStorage.setItem('habit_timer_inventory_v1', JSON.stringify(updated));

        } catch (e) {}

        return updated;

      });



      setClaimedRewardDates((prev) => {

        const next = [...prev, dateKey];

        try {

          localStorage.setItem('habit_timer_claimed_rewards_v1', JSON.stringify(next));

        } catch (e) {}

        return next;

      });



      setRewardCelebration({

        item: randomItem,

        margin: currentMins - currentThreshold,

        targetThreshold: currentThreshold,

        actualMinutes: currentMins,

        message: `🎉 予測目標 ${currentThreshold}分 を突破！「${randomItem.name}」を獲得しました！`,

        congratulationText: `おめでとう！${randomItem.name}を手に入れたよ！${randomItem.flavorText}`,

      });

    },

    [claimedRewardDates, inventory, selectedCharId]

  );







  // Check FastAPI connectivity on mount and fetch initial prediction

  useEffect(() => {

    fetch(`${FASTAPI_URL}/`, { method: 'GET' })

      .then((res) => {

        if (res.ok) {

          setFastApiStatus('online');

          fetchPredictionFromFastApi();

        } else {

          setFastApiStatus('offline');

        }

      })

      .catch(() => {

        setFastApiStatus('offline');

      });

  }, []);



  // Monitor today's minutes against active prediction target

  useEffect(() => {

    const today = getDateString();

    const target = aiPrediction?.predictedMinutes || 25;

    if (todayMinutes > target && !claimedRewardDates.includes(today)) {

      triggerAiRewardEvaluation(todayMinutes, target, today);

    }

  }, [todayMinutes, aiPrediction, claimedRewardDates, triggerAiRewardEvaluation]);



  // ==========================================

  // 1-WEEK CALENDAR DATA (今週の達成状況: 虹色の星 / 黄色い王冠 / エフェクトなし)

  // ==========================================

  const weekDaysData = useMemo(() => {

    const now = new Date();

    const currentDayOfWeek = now.getDay(); // 0: 日, 1: 月, 2: 火, 3: 水, 4: 木, 5: 金, 6: 土

    // 月曜日を週の起点とする (月: 0, 火: 1, 水: 2, 木: 3, 金: 4, 土: 5, 日: 6)

    const mondayOffset = (currentDayOfWeek + 6) % 7;

    const monday = new Date(now);

    monday.setDate(now.getDate() - mondayOffset);



    const dayNames = ['月', '火', '水', '木', '金', '土', '日'];

    const todayKey = getDateString();



    const inProgressMinutes = tasks.reduce(

      (sum, t) => sum + (t.completed ? 0 : t.creditedMinutes || 0),

      0

    );



    const days = [];

    for (let i = 0; i < 7; i++) {

      const d = new Date(monday);

      d.setDate(monday.getDate() + i);

      const year = d.getFullYear();

      const month = String(d.getMonth() + 1).padStart(2, '0');

      const day = String(d.getDate()).padStart(2, '0');

      const dateKey = `${year}-${month}-${day}`;



      // 1分でもしているか（activityLogsの分数）

      const dayLogs = activityLogs.filter((l) => {

        if (l.dateStr) return l.dateStr === dateKey;

        if (l.completedAt) {

          const ld = new Date(l.completedAt);

          const ly = ld.getFullYear();

          const lm = String(ld.getMonth() + 1).padStart(2, '0');

          const lday = String(ld.getDate()).padStart(2, '0');

          return `${ly}-${lm}-${lday}` === dateKey;

        }

        return false;

      });



      const dayLogMins = dayLogs.reduce((sum, l) => sum + (Number(l.durationMinutes) || 0), 0);

      const isToday = dateKey === todayKey;

      const isFuture = dateKey > todayKey;

      const totalDayMins = dayLogMins + (isToday ? inProgressMinutes : 0);



      // 完了タスク数の厳密判定（全タスク完了のみ虹色の星、1タスク以上完了は黄色い王冠、0タスクはドット/未達成）

      let completedCount = 0;

      let isAchieved = false;

      let hasWorked = false;



      if (isFuture) {

        // 未来日は未達成

        isAchieved = false;

        hasWorked = false;

      } else if (isToday) {

        // 今日の場合: 現在のtasksでcompleted: trueになっているタスク、または今日の活動ログでtaskCompleted: trueになっているタスク

        const todayCompletedTasks = (tasks || []).filter((t) => t.completed);

        const todayCompletedLogs = dayLogs.filter((l) => l.taskCompleted);

        const completedTaskIds = new Set([

          ...todayCompletedTasks.map((t) => t.id),

          ...todayCompletedLogs.map((l) => l.taskId).filter(Boolean),

        ]);

        completedCount = Math.max(todayCompletedTasks.length, completedTaskIds.size);

        const totalCount = (tasks || []).length;



        // ★全タスク完了の時のみ「虹色の星」！

        if (totalCount > 0 && completedCount >= totalCount) {

          isAchieved = true;

          hasWorked = false;

        } else if (completedCount > 0) {

          // ★1タスク以上完了（全タスク未満）なら「黄色い王冠」！

          isAchieved = false;

          hasWorked = true;

        } else {

          // ★タスク未完了（0タスク）は王冠を出さずドット（未達成）！

          isAchieved = false;

          hasWorked = false;

        }

      } else {

        // 過去日の場合:

        // 全タスク完了日リスト（allAchievedDates）に入っている日のみ「虹色の星」！

        const isAllDone = allAchievedDates.includes(dateKey);

        const hasPastCompletedTask =

          dayLogs.some((l) => l.taskCompleted) || completedDates.includes(dateKey);



        completedCount = hasPastCompletedTask ? 1 : 0;



        if (isAllDone) {

          // ★全タスク完了だった過去日のみ「虹色の星」！

          isAchieved = true;

          hasWorked = false;

        } else if (hasPastCompletedTask) {

          // ★実際にタスクを1つ以上完了していた日のみ「黄色い王冠」！

          isAchieved = false;

          hasWorked = true;

        } else {

          // ★タスク未完了（作業途中・0タスク完了）は王冠を出さずドット（未達成）！

          isAchieved = false;

          hasWorked = false;

        }

      }



      const hasCompleted = isAchieved || hasWorked;



      days.push({

        dateKey,

        dayName: dayNames[i],

        dateNum: d.getDate(),

        isToday,

        isFuture,

        isAchieved,

        hasWorked,

        isNone: !hasCompleted,

        minutes: totalDayMins,

        completedCount,

      });

    }

    return days;

  }, [completedDates, allAchievedDates, activityLogs, tasks]);



  // ==========================================

  // MONTHLY TIMELINE DATA (これまでのステータス年表: 過去 -> 現在)

  // 上にスクロールするほど昔にさかのぼれるよう、昇順（上が過去、下が現在）で格納

  // ==========================================

  const monthlyTimelineData = useMemo(() => {

    const todayStr = getDateString();

    const now = new Date();

    const currentYear = now.getFullYear();

    const currentMonth = now.getMonth(); // 0-indexed (0: 1月, 9: 10月)



    // 最低でも過去11ヶ月前（計12ヶ月分）を表示。それ以前のログ・達成日があればそこまで遡る

    let minDate = new Date(currentYear, currentMonth - 11, 1);



    completedDates.forEach((dStr) => {

      if (typeof dStr === 'string' && dStr.includes('-')) {

        const parts = dStr.split('-').map(Number);

        if (parts[0] && parts[1]) {

          const d = new Date(parts[0], parts[1] - 1, 1);

          if (d < minDate) minDate = d;

        }

      }

    });



    activityLogs.forEach((l) => {

      const dateStr = l.dateStr || (l.completedAt ? l.completedAt.split('T')[0] : null);

      if (dateStr && dateStr.includes('-')) {

        const parts = dateStr.split('-').map(Number);

        if (parts[0] && parts[1]) {

          const d = new Date(parts[0], parts[1] - 1, 1);

          if (d < minDate) minDate = d;

        }

      }

    });



    const inProgressMinutes = tasks.reduce(

      (sum, t) => sum + (t.completed ? 0 : (t.creditedMinutes || 0)),

      0

    );



    const months = [];

    const cursor = new Date(minDate.getFullYear(), minDate.getMonth(), 1);

    const endCursor = new Date(currentYear, currentMonth, 1);



    let prevYear = null;



    while (cursor <= endCursor) {

      const y = cursor.getFullYear();

      const m = cursor.getMonth() + 1; // 1-12

      const monthKey = `${y}-${String(m).padStart(2, '0')}`;

      const isCurrentMonth = y === currentYear && cursor.getMonth() === currentMonth;



      // 年の境目フラグ（年が変わった最初の月、またはリストの先頭）

      const isYearStart = prevYear === null || prevYear !== y;

      prevYear = y;



      const daysInMonth = new Date(y, m, 0).getDate();

      // 1日の曜日 (0: 日, 1: 月, ..., 6: 土)

      // 月曜始まりのカレンダーオフセット: (rawDay + 6) % 7

      const rawFirstDay = new Date(y, m - 1, 1).getDay();

      const firstDayOffset = (rawFirstDay + 6) % 7;



      let monthTotalMinutes = 0;

      let monthAchievedDays = 0;

      let monthWorkedDays = 0;

      const days = [];



      for (let d = 1; d <= daysInMonth; d++) {

        const dayStr = String(d).padStart(2, '0');

        const dateKey = `${monthKey}-${dayStr}`;

        const isToday = dateKey === todayStr;



        const dayLogs = activityLogs.filter((l) => {

          if (l.dateStr) return l.dateStr === dateKey;

          if (l.completedAt) {

            const ld = new Date(l.completedAt);

            const ly = ld.getFullYear();

            const lm = String(ld.getMonth() + 1).padStart(2, '0');

            const lday = String(ld.getDate()).padStart(2, '0');

            return `${ly}-${lm}-${lday}` === dateKey;

          }

          return false;

        });



        const dayLogsMins = dayLogs.reduce((sum, l) => sum + (Number(l.durationMinutes) || 0), 0);

        const isFuture = dateKey > todayStr;

        const totalDayMins = dayLogsMins + (isToday ? inProgressMinutes : 0);



        // 完了タスク数の厳密判定（全タスク完了のみ虹色の星、1タスク以上完了は黄色い王冠、0タスクはドット/未達成）

        let completedCount = 0;

        let isAchieved = false;

        let hasWorked = false;



        if (isFuture) {

          // 未来日は未達成

          isAchieved = false;

          hasWorked = false;

        } else if (isToday) {

          const todayCompletedTasks = (tasks || []).filter((t) => t.completed);

          const todayCompletedLogs = dayLogs.filter((l) => l.taskCompleted);

          const completedTaskIds = new Set([

            ...todayCompletedTasks.map((t) => t.id),

            ...todayCompletedLogs.map((l) => l.taskId).filter(Boolean),

          ]);

          completedCount = Math.max(todayCompletedTasks.length, completedTaskIds.size);

          const totalCount = (tasks || []).length;



          // 全タスク完了の時のみ「星」

          if (totalCount > 0 && completedCount >= totalCount) {

            isAchieved = true;

            hasWorked = false;

          } else if (completedCount > 0) {

            // 1タスク以上完了（全タスク未満）なら「王冠」

            isAchieved = false;

            hasWorked = true;

          } else {

            isAchieved = false;

            hasWorked = false;

          }

        } else {

          // 過去日の場合

          const isAllDone = allAchievedDates.includes(dateKey);

          const hasPastCompletedTask =

            dayLogs.some((l) => l.taskCompleted) || completedDates.includes(dateKey);



          completedCount = hasPastCompletedTask ? 1 : 0;



          if (isAllDone) {

            // 全タスク完了だった過去日のみ「星」

            isAchieved = true;

            hasWorked = false;

          } else if (hasPastCompletedTask) {

            // 実際にタスクを1つ以上完了していた日のみ「王冠」

            isAchieved = false;

            hasWorked = true;

          } else {

            isAchieved = false;

            hasWorked = false;

          }

        }



        const hasCompleted = isAchieved || hasWorked;



        if (isAchieved || hasWorked) {

          monthAchievedDays++;

        }

        if (hasCompleted) {

          monthWorkedDays++;

        }

        monthTotalMinutes += totalDayMins;



        days.push({

          dayNum: d,

          dateKey,

          isToday,

          isAchieved,

          hasWorked,

          minutes: totalDayMins,

          isFuture,

          completedCount,

        });

      }



      // 過去月または今月までの経過日数に応じた達成率

      const applicableDays = isCurrentMonth ? Math.min(daysInMonth, now.getDate()) : daysInMonth;

      const achievementRate = applicableDays > 0 ? Math.round((monthAchievedDays / applicableDays) * 100) : 0;



      months.push({

        year: y,

        month: m,

        monthKey,

        label: `${y}年 ${m}月`,

        isCurrentMonth,

        isYearStart,

        daysInMonth,

        firstDayOffset,

        totalMinutes: monthTotalMinutes,

        achievedDaysCount: monthAchievedDays,

        workedDaysCount: monthWorkedDays,

        achievementRate,

        days,

      });



      cursor.setMonth(cursor.getMonth() + 1);

    }



    return months;

  }, [completedDates, allAchievedDates, activityLogs, tasks]);



  // ==========================================

  // WEEKLY 10-USER LEAGUE DATA (今週の累計集中時間で10人グループ対戦)

  // ==========================================

  const leagueData = useMemo(() => {

    const weekInfo = getWeekWindowInfo(new Date());

    const tier = LEAGUE_TIERS[leagueTierIndex] || LEAGUE_TIERS[0];



    // Player's cumulative focus minutes this week (Monday 00:00 -> now, including in-progress midway minutes)

    const weeklyLogsMinutes = stats.validLogs

      .filter((l) => {

        const ts = l.completedAt ? new Date(l.completedAt).getTime() : 0;

        return ts >= weekInfo.mondayTs;

      })

      .reduce((sum, l) => sum + (l.durationMinutes || 0), 0);



    const inProgressMinutes = tasks.reduce(

      (sum, t) => sum + (t.completed ? 0 : t.creditedMinutes || 0),

      0

    );

    const myWeeklyMinutes = weeklyLogsMinutes + inProgressMinutes;



    // Real users from Firestore (excluding self) - NO BOTS / SIMULATED RIVALS

    const otherRealUsers = onlineRealMembers

      .filter((m) => m.userId !== myOnlineUid && m.id !== myOnlineUid)

      .map((m, idx) => ({

        id: m.userId || m.id || `real-${idx}`,

        name: m.name || 'プレイヤー',

        charId: m.charId || 'mochi',

        level: m.level || 1,

        minutes: m.minutes || 0,

        itemCount: typeof m.itemCount === 'number' ? m.itemCount : (m.minutes ? Math.floor(m.minutes / 25) : 0),

        isUser: false,

        isRealUser: true,

      }));



    const isLeagueUnlocked = true; // All real users participate and can view rankings!



    const myItemsCount = inventory.reduce((sum, item) => sum + (item.count || 1), 0);



    const userEntry = {

      id: myOnlineUid || 'player-self',

      name: playerName || 'あなた',

      charId: selectedCharId || 'mochi',

      level: levelInfo.level,

      minutes: myWeeklyMinutes,

      itemCount: myItemsCount,

      isUser: true,

      isRealUser: true,

    };



    // ONLY real users in standings (all real users participate)

    const activeStandings = [...otherRealUsers, userEntry];



    // Rank players primarily by item acquisition count (items won from AI prediction targets)

    const standings = activeStandings

      .sort((a, b) => {

        const countA = typeof a.itemCount === 'number' ? a.itemCount : 0;

        const countB = typeof b.itemCount === 'number' ? b.itemCount : 0;

        if (countB !== countA) return countB - countA;

        if (b.minutes !== a.minutes) return b.minutes - a.minutes;

        return a.isUser ? -1 : 1;

      })

      .map((member, index) => ({

        ...member,

        rank: index + 1,

      }));



    const myStanding = standings.find((m) => m.isUser) || { ...userEntry, rank: 1 };



    return {

      tier,

      tierIndex: leagueTierIndex,

      weekInfo,

      standings,

      myStanding,

      myWeeklyMinutes,

      realUsersCount: otherRealUsers.length + 1,

      isLeagueUnlocked,

    };

  }, [

    leagueTierIndex,

    stats.validLogs,

    tasks,

    playerName,

    selectedCharId,

    levelInfo.level,

    remainingMs,

    onlineRealMembers,

    myOnlineUid,

    inventory,

  ]);



  // Instant immediate sync function

  const forceSyncPlayerToOnlineLeague = useCallback(

    async (overrideInventory = null) => {

      if (!isOnlineLeagueConfigured) return;

      try {

        setIsSyncingWithCloud(true);

        const inv = overrideInventory || inventory;

        const myItemsCount = inv.reduce((sum, item) => sum + (item.count || 1), 0);

        await syncPlayerToOnlineLeague({

          weekKey: leagueWeekKey,

          playerName,

          charId: selectedCharId,

          level: levelInfo.level,

          minutes: leagueData.myWeeklyMinutes,

          itemCount: myItemsCount,

        });

      } catch (err) {

        console.warn('Immediate sync error:', err);

      } finally {

        setIsSyncingWithCloud(false);

      }

    },

    [

      isOnlineLeagueConfigured,

      leagueWeekKey,

      playerName,

      selectedCharId,

      levelInfo.level,

      leagueData.myWeeklyMinutes,

      inventory,

    ]

  );



  // Manual & automatic refresh function for global weekly ranking

  const refreshLeagueRankings = useCallback(async () => {

    if (!isOnlineLeagueConfigured) return;

    setIsRefreshingLeague(true);

    try {

      await forceSyncPlayerToOnlineLeague();

      const freshMembers = await fetchOnlineLeagueMembers({ weekKey: leagueWeekKey });

      if (freshMembers && freshMembers.length > 0) {

        setOnlineRealMembers(freshMembers);

      }

      setLastLeagueSyncTime(new Date());

    } catch (e) {

      console.warn('Failed to refresh league rankings:', e);

    } finally {

      setTimeout(() => setIsRefreshingLeague(false), 300);

    }

  }, [isOnlineLeagueConfigured, leagueWeekKey, forceSyncPlayerToOnlineLeague]);



  // Online Real-User Global Weekly Ranking: Initial direct fetch + real-time subscription

  useEffect(() => {

    if (!isOnlineLeagueConfigured) {

      setOnlineRealMembers([]);

      return;

    }

    // Instant initial fetch from Firestore server

    fetchOnlineLeagueMembers({ weekKey: leagueWeekKey }).then((members) => {

      if (members && members.length > 0) {

        setOnlineRealMembers(members);

      }

      setLastLeagueSyncTime(new Date());

    });



    const unsubscribe = subscribeToOnlineLeague({

      weekKey: leagueWeekKey,

      onUpdate: (realMembers) => {

        setOnlineRealMembers(realMembers || []);

        setLastLeagueSyncTime(new Date());

      },

    });

    return () => {

      if (typeof unsubscribe === 'function') unsubscribe();

    };

  }, [isOnlineLeagueConfigured, leagueWeekKey]);



  // When returning to tab or focusing window, immediately re-sync latest rankings

  useEffect(() => {

    if (!isOnlineLeagueConfigured) return;

    const handleFocus = () => {

      if (document.visibilityState === 'visible') {

        fetchOnlineLeagueMembers({ weekKey: leagueWeekKey }).then((members) => {

          if (members && members.length > 0) {

            setOnlineRealMembers(members);

          }

          setLastLeagueSyncTime(new Date());

        });

      }

    };

    window.addEventListener('focus', handleFocus);

    document.addEventListener('visibilitychange', handleFocus);

    return () => {

      window.removeEventListener('focus', handleFocus);

      document.removeEventListener('visibilitychange', handleFocus);

    };

  }, [isOnlineLeagueConfigured, leagueWeekKey]);



  // When opening ranking modal, immediately force-sync and fetch latest standings

  useEffect(() => {

    if (showLeagueModal && isOnlineLeagueConfigured) {

      refreshLeagueRankings();

    }

  }, [showLeagueModal, isOnlineLeagueConfigured, refreshLeagueRankings]);



  // Online Real-User Global Weekly Ranking: Fast debounce (250ms) routine sync for all users

  useEffect(() => {

    if (!isOnlineLeagueConfigured) return;

    const timer = setTimeout(() => {

      forceSyncPlayerToOnlineLeague();

    }, 250);



    return () => clearTimeout(timer);

  }, [

    isOnlineLeagueConfigured,

    leagueWeekKey,

    playerName,

    selectedCharId,

    levelInfo.level,

    leagueData.myWeeklyMinutes,

    inventory,

    forceSyncPlayerToOnlineLeague,

  ]);



  // Weekly boundary settlement: update week key when a new week begins

  useEffect(() => {

    const currentWeekKey = getWeekWindowInfo(new Date()).weekKey;

    if (leagueWeekKey && leagueWeekKey !== currentWeekKey) {

      setLeagueWeekKey(currentWeekKey);

    }

  }, [leagueWeekKey]);



  const ActiveIcon = activeCategory.icon;

  const formattedCountdown = formatTime(remainingMs);

  const isLongFormat = formattedCountdown.length > 5;



  // ==========================================

  // INNER SCREEN CONTENT

  // ==========================================

  const screenContent = (

    <div

      className={`relative w-full h-full select-none transition-colors duration-700 flex flex-col items-center justify-between overflow-hidden ${

        showPhoneBezel

          ? 'px-4 pt-11 pb-3'

          : 'safe-area-layout px-3 pt-2 pb-2'

      } ${currentTheme.bg} ${currentTheme.text}`}

    >

      {/* iOS Status Bar & Dynamic Island (Only when Demo Phone Frame is active) */}

      {showPhoneBezel && (

        <>

          {/* Subtle Speaker Earpiece Grille */}

          <div className="absolute top-[3px] left-1/2 -translate-x-1/2 w-12 h-[3.5px] rounded-full bg-zinc-950/90 border border-white/10 z-50 pointer-events-none" />



          <div className="absolute top-0 left-0 right-0 h-11 px-7 flex items-center justify-between z-40 pointer-events-none">

            <span className="font-semibold text-[13px] tracking-tight opacity-90 pl-1">9:41</span>

            

            {/* Apple iPhone 16 Pro Dynamic Island */}

            <div className="w-[124px] h-[33px] bg-black rounded-full flex items-center justify-between px-3 shadow-md border border-white/10 relative overflow-hidden">

              <div className="w-3 h-3 rounded-full bg-[#080d16] ring-1 ring-zinc-800 flex items-center justify-center">

                <div className="w-1.5 h-1.5 rounded-full bg-[#0f1f38] relative flex items-center justify-center">

                  <div className="w-0.5 h-0.5 rounded-full bg-sky-400/50 absolute top-0.5 right-0.5" />

                </div>

              </div>

              {isRunning && (

                <div className="flex items-center gap-1.5">

                  <motion.div

                    animate={{ scale: [1, 1.25, 1], opacity: [0.7, 1, 0.7] }}

                    transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}

                    className="w-2 h-2 rounded-full"

                    style={{ backgroundColor: activeCategory.color }}

                  />

                  <span className="text-[9px] font-mono font-bold text-white/80">FOCUS</span>

                </div>

              )}

            </div>

            

            <div className="flex items-center gap-1.5 opacity-90 pr-1">

              <span className="text-[10px] font-bold tracking-tighter opacity-80 mr-0.5">5G</span>

              <Wifi className="w-3.5 h-3.5 stroke-[2.5]" />

              <Battery className="w-4 h-4 stroke-[2.5]" />

            </div>

          </div>

        </>

      )}



      {/* Scenic Background Artwork (Meadow, Ocean, Cosmos, Aurora, Forest, etc.) */}

      <ThemeSceneryBackdrop scenery={currentTheme.scenery} isRunning={isRunning} />







      {/* Hidden SVG Definitions for Rainbow Star Gradient */}

      <svg width="0" height="0" className="absolute pointer-events-none">

        <defs>

          <linearGradient id="rainbowStarGrad" x1="0%" y1="0%" x2="100%" y2="100%">

            <stop offset="0%" stopColor="#ff4b4b" />

            <stop offset="20%" stopColor="#ff9f43" />

            <stop offset="40%" stopColor="#feca57" />

            <stop offset="60%" stopColor="#1dd1a1" />

            <stop offset="80%" stopColor="#48dbfb" />

            <stop offset="100%" stopColor="#a55eea" />

          </linearGradient>

        </defs>

      </svg>



      {/* ==========================================

          TOPMOST BAR: CONSECUTIVE STREAK (連続記録x日) & 1-WEEK CALENDAR (1週間)

          - UI全体タップ: これまでのステータス年表を表示

          - 達成している曜日: 虹色の星 (Rainbow Star)

          - 1分でもしている曜日: 黄色い王冠 (Yellow Crown)

          - その他: なにもエフェクトなし

          ========================================== */}

      <motion.div

        whileTap={{ scale: 0.985 }}

        onClick={() => setShowTimelineModal(true)}

        className={`relative z-20 w-full max-w-md px-3.5 py-1.5 rounded-2xl backdrop-blur-xl border flex items-center justify-between shadow-sm shrink-0 mt-0.5 mb-1 transition-all select-none cursor-pointer group touch-manipulation no-pan ${currentTheme.card}`}

        style={{

          borderColor: streak > 0 ? 'rgba(245, 158, 11, 0.45)' : undefined,

          boxShadow: streak > 0 ? '0 0 16px rgba(245, 158, 11, 0.12)' : undefined,

        }}

        title="タップしてこれまでのステータス年表を表示"

      >

        {/* Left: 連続記録 x日 (強調バッジ) */}

        <div

          className={`flex items-center gap-1.5 shrink-0 px-2.5 py-1 rounded-xl transition-all ${

            streak > 0

              ? 'bg-gradient-to-r from-amber-500/25 via-orange-500/18 to-amber-500/10 border border-amber-400/50 shadow-[0_0_12px_rgba(245,158,11,0.25)]'

              : 'bg-current/5 border border-current/10'

          }`}

        >

          <motion.div

            animate={streak > 0 ? { scale: [1, 1.25, 1], rotate: [0, -6, 6, 0] } : {}}

            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}

            className="shrink-0"

          >

            <Flame

              className={`w-5 h-5 transition-transform group-hover:scale-115 ${

                streak > 0 ? 'text-amber-400 fill-amber-400' : 'opacity-40 fill-current'

              }`}

              style={

                streak > 0

                  ? { filter: 'drop-shadow(0 0 6px rgba(245, 158, 11, 0.9)) drop-shadow(0 0 10px rgba(239, 68, 68, 0.6))' }

                  : {}

              }

            />

          </motion.div>

          <div className="flex items-baseline gap-1">

            <span

              className={`text-[11px] font-black tracking-tight ${

                streak > 0 ? 'text-amber-300' : 'opacity-70'

              }`}

            >

              連続

            </span>

            <span

              className={`font-mono text-base sm:text-lg font-black tabular-nums ${

                streak > 0

                  ? 'text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.65)]'

                  : 'opacity-75'

              }`}

            >

              {streak}

            </span>

            <span

              className={`text-[11px] font-black ${

                streak > 0 ? 'text-amber-300' : 'opacity-60'

              }`}

            >

              日

            </span>

            {streak >= 3 && (

              <span className="text-[9px] font-black px-1 py-0.2 rounded-md bg-amber-400/30 text-amber-200 border border-amber-400/40 ml-0.5 animate-pulse">

                🔥

              </span>

            )}

          </div>

          <ChevronRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-amber-300 -mr-0.5" />

        </div>



        {/* Right: 1週間 (月 火 水 木 金 土 日) */}

        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0 select-none pointer-events-none">

          {weekDaysData.map((d) => (

            <div

              key={d.dateKey}

              className={`flex flex-col items-center justify-center w-6 sm:w-7 py-0.5 rounded-lg transition-all ${

                d.isToday ? 'bg-current/10 ring-1 ring-current/25' : ''

              }`}

              title={`${d.dateKey} (${d.dayName}): ${

                d.isAchieved

                  ? '全タスク達成！ (虹色の星)'

                  : d.hasWorked

                  ? 'タスク達成！ (黄色い王冠)'

                  : '未達成'

              }`}

            >

              <span

                className={`text-[10px] font-bold leading-none mb-1 select-none ${

                  d.isToday ? 'opacity-100 font-extrabold text-amber-400' : 'opacity-60'

                }`}

              >

                {d.dayName}

              </span>

              <div className="w-5 h-5 flex items-center justify-center">

                {d.isAchieved ? (

                  <LuxuriousRainbowStar size={19} />

                ) : d.hasWorked ? (

                  <Crown

                    className="w-3.5 h-3.5 text-amber-400 fill-amber-400"

                    style={{

                      filter: 'drop-shadow(0 0 3px rgba(251, 191, 36, 0.7))',

                    }}

                  />

                ) : (

                  <div className="w-1.5 h-1.5 rounded-full bg-current opacity-20" />

                )}

              </div>

            </div>

          ))}

        </div>

      </motion.div>



      {/* ==========================================

          TOP BAR: SETTINGS, CURRENT LEVEL (TAP FOR NEXT LEVEL XP), PAST DATA

          ========================================== */}

      <header className="no-pan relative z-20 w-full max-w-md flex flex-col items-center gap-1.5 pt-0.5 shrink-0">

        <div className="w-full flex items-center justify-between gap-1.5">

          {/* Left Controls: Settings & Admin Dashboard */}

          <div className="flex items-center gap-1 shrink-0">

            <motion.button

              whileHover={{ scale: 1.06 }}

              whileTap={{ scale: 0.9 }}

              onClick={() => setShowSettingsModal(true)}

              title="設定"

              className={`w-10 h-10 rounded-2xl backdrop-blur-xl border flex items-center justify-center transition-colors ${currentTheme.card}`}

            >

              <Settings className="w-4 h-4" />

            </motion.button>



            {/* Admin Dashboard button: Only visible on authorized PC */}

            {isAdminDevice && (

              <motion.button

                whileHover={{ scale: 1.06 }}

                whileTap={{ scale: 0.9 }}

                onClick={() => setShowAdminModal(true)}

                title="管理者ダッシュボード（この端末のみ表示）"

                className={`w-10 h-10 rounded-2xl backdrop-blur-xl border border-amber-400/40 bg-amber-400/10 hover:bg-amber-400/20 flex items-center justify-center transition-all shadow-sm ${currentTheme.card}`}

              >

                <ShieldCheck className="w-4 h-4 text-amber-400" />

              </motion.button>

            )}

          </div>



          {/* Center: Current Level & XP Progress Bar (Tap to show XP needed for next level) */}

          <motion.button

            type="button"

            whileTap={{ scale: 0.97 }}

            onClick={() => setShowXpDetail((prev) => !prev)}

            title="タップして次のレベルに必要な経験値を表示"

            className={`flex-1 h-10 px-3 rounded-2xl backdrop-blur-xl border flex items-center justify-between gap-2 cursor-pointer transition-all ${currentTheme.card}`}

          >

            <div className="flex items-center gap-1.5 shrink-0">

              <Sparkles

                className="w-4 h-4 shrink-0"

                style={{ color: activeCategory.color }}

              />

              <span className="font-mono text-xs font-extrabold tracking-tight tabular-nums">

                Lv.{levelInfo.level}

              </span>

            </div>



            <div className="flex-1 flex flex-col justify-center gap-1 min-w-0">

              <div

                className="w-full h-2.5 rounded-full overflow-hidden p-0.5"

                style={{ backgroundColor: currentTheme.ringTrack }}

              >

                <motion.div

                  className="h-full rounded-full"

                  initial={{ width: 0 }}

                  animate={{

                    width: `${Math.max(6, Math.min(100, levelInfo.progress * 100))}%`,

                  }}

                  transition={{ duration: 0.45, ease: 'easeOut' }}

                  style={{

                    backgroundColor: activeCategory.color,

                    boxShadow: `0 0 12px ${activeCategory.glow}`,

                  }}

                />

              </div>

            </div>



            <div className="shrink-0 font-mono text-[11px] font-bold tracking-tight tabular-nums">

              {showXpDetail ? (

                levelInfo.isMax ? (

                  <span style={{ color: activeCategory.color }}>MAX</span>

                ) : (

                  <span style={{ color: activeCategory.color }}>

                    あと{levelInfo.xpToNext.toLocaleString()}pt

                  </span>

                )

              ) : (

                <span className="opacity-75">{levelInfo.totalXp.toLocaleString()}pt</span>

              )}

            </div>

          </motion.button>



          {/* Right Controls: Global Weekly Ranking (Optional), Past Data */}

          <div className="flex items-center gap-1 shrink-0">

            {showRankingFeature && (

              <motion.button

                whileHover={{ scale: 1.06 }}

                whileTap={{ scale: 0.9 }}

                onClick={() => setShowLeagueModal(true)}

                title="全ユーザー アイテム獲得ランキング"

                className={`relative w-10 h-10 rounded-2xl backdrop-blur-xl border flex items-center justify-center transition-all ${currentTheme.card}`}

              >

                <Trophy className="w-4 h-4 text-amber-400" />

                <span className="absolute -top-1 -right-1 min-w-[17px] h-[17px] px-0.5 rounded-full text-[8.5px] font-mono font-extrabold flex items-center justify-center shadow text-slate-950 bg-amber-400">

                  {`${leagueData.myStanding.rank}位`}

                </span>

              </motion.button>

            )}



            <motion.button

              whileHover={{ scale: 1.06 }}

              whileTap={{ scale: 0.9 }}

              onClick={() => setShowHistoryModal(true)}

              title="過去のデータ"

              className={`relative w-10 h-10 rounded-2xl backdrop-blur-xl border flex items-center justify-center transition-colors ${currentTheme.card}`}

            >

              <BarChart3 className="w-4 h-4" />

            </motion.button>



                      </div>

        </div>



        {/* Tap Popover: XP Needed for Next Level */}

        <AnimatePresence>

          {showXpDetail && (

            <motion.div

              initial={{ opacity: 0, y: -6, scale: 0.96 }}

              animate={{ opacity: 1, y: 0, scale: 1 }}

              exit={{ opacity: 0, y: -6, scale: 0.96 }}

              transition={{ duration: 0.18 }}

              onClick={() => setShowXpDetail(false)}

              className={`w-full px-3.5 py-2 rounded-2xl backdrop-blur-xl border flex items-center justify-between text-[11px] font-bold cursor-pointer ${currentTheme.card}`}

            >

              <div className="flex items-center gap-1.5">

                <Trophy className="w-3.5 h-3.5" style={{ color: activeCategory.color }} />

                <span>

                  {levelInfo.isMax

                    ? '最大レベル Lv.100 到達'

                    : `次の Lv.${levelInfo.level + 1} まで あと ${levelInfo.xpToNext.toLocaleString()} pt`}

                </span>

              </div>

              <span className="font-mono text-[10px] opacity-75 tabular-nums">

                累計 {levelInfo.totalXp.toLocaleString()} / {MAX_TOTAL_XP.toLocaleString()} pt

              </span>

            </motion.div>

          )}

        </AnimatePresence>

      </header>



      {/* ==========================================

          FASTAPI AI TASK PREDICTION SLEEK MICRO-BANNER (Tap to open full AI Challenge Modal)

          ========================================== */}

      <motion.button

        type="button"

        whileTap={{ scale: 0.98 }}

        onClick={() => setShowAiChallengeModal(true)}

        className={`relative z-20 w-full max-w-md px-3 py-1.5 rounded-2xl backdrop-blur-xl border flex items-center justify-between text-[11px] font-bold shadow-sm shrink-0 mt-0.5 mb-1 transition-all cursor-pointer select-none ${currentTheme.card}`}

        style={{

          borderColor:

            todayMinutes >= (aiPrediction?.predictedMinutes || 25)

              ? 'rgba(74, 222, 128, 0.45)'

              : undefined,

          boxShadow:

            todayMinutes >= (aiPrediction?.predictedMinutes || 25)

              ? '0 0 12px rgba(74, 222, 128, 0.2)'

              : undefined,

        }}

      >

        <div className="flex items-center gap-1.5 min-w-0">

          <div className="w-5 h-5 rounded-lg bg-gradient-to-tr from-sky-500 to-indigo-500 flex items-center justify-center shrink-0 shadow-sm">

            <Bot className="w-3 h-3 text-white" />

          </div>

          <div className="flex items-center gap-1.5 min-w-0">

            <span className="font-bold tracking-tight truncate text-[11px]">

              成長目標:

            </span>

            <span className="font-mono text-amber-300 font-extrabold text-[12px]">

              {aiPrediction?.predictedMinutes || 25}分

            </span>

            <span className="opacity-60 text-[10px] font-normal truncate">

              (今日: {todayMinutes}分)

            </span>

          </div>

        </div>



        <div className="flex items-center gap-1.5 shrink-0">

          {todayMinutes >= (aiPrediction?.predictedMinutes || 25) ? (

            <span className="px-2 py-0.5 rounded-full text-[9.5px] font-black bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-950 flex items-center gap-1 shadow-sm">

              <Gift className="w-2.5 h-2.5" />

              達成！🎁

            </span>

          ) : (

            <div className="flex items-center gap-1 text-[10px] text-amber-300/90 font-mono font-bold">

              <span>あと{Math.max(0, (aiPrediction?.predictedMinutes || 25) - todayMinutes)}分</span>

            </div>

          )}

          <ChevronRight className="w-3.5 h-3.5 opacity-40 -mr-0.5" />

        </div>

      </motion.button>

      {/* Floating Toast Notice for Level 2 locked ranking (Centered to prevent edge clipping) */}

      <div className="absolute top-16 inset-x-0 z-[70] flex justify-center pointer-events-none px-4">

        <AnimatePresence>

          {leagueLockNotice && (

            <motion.div

              initial={{ opacity: 0, y: -10, scale: 0.95 }}

              animate={{ opacity: 1, y: 0, scale: 1 }}

              exit={{ opacity: 0, y: -10, scale: 0.95 }}

              transition={{ duration: 0.2 }}

              className="max-w-full px-4 py-2.5 rounded-2xl bg-zinc-900/95 text-amber-300 border border-amber-500/60 shadow-2xl backdrop-blur-xl flex items-center justify-center gap-2 text-xs font-bold whitespace-nowrap shadow-black/60"

            >

              <Lock className="w-3.5 h-3.5 text-amber-400 shrink-0" />

              <span>{leagueLockNotice}</span>

              <span className="text-[10px] text-zinc-400 font-normal shrink-0">あと{levelInfo.xpToNext}ptでLv.2</span>

            </motion.div>

          )}

        </AnimatePresence>

      </div>



      {/* ==========================================

          CENTER: LARGER TIMER + ROAMING CHARACTER PLAYGROUND

          ========================================== */}

      <main className="no-pan relative z-10 flex-1 min-h-0 flex flex-col items-center justify-evenly w-full max-w-md py-1 sm:py-2">

        {activeTask && (

          <div className="flex flex-col items-center gap-1.5 mb-2">

            <motion.div

              key={activeTask.id}

              initial={{ opacity: 0, y: -6 }}

              animate={{ opacity: 1, y: 0 }}

              className={`px-4 py-1.5 rounded-full backdrop-blur-xl border flex items-center gap-2 text-base font-bold tracking-wide shadow-sm ${currentTheme.card}`}

            >

              <ActiveIcon className="w-5 h-5 shrink-0" style={{ color: activeCategory.color }} />

              {isEditingMainTitle ? (

                <form

                  onSubmit={(e) => {

                    e.preventDefault();

                    handleSaveRenameTask(activeTask.id, mainTitleDraft);

                  }}

                  className="flex items-center gap-1.5"

                >

                  <input

                    type="text"

                    value={mainTitleDraft}

                    onChange={(e) => setMainTitleDraft(e.target.value)}

                    onBlur={() => handleSaveRenameTask(activeTask.id, mainTitleDraft)}

                    maxLength={30}

                    autoFocus

                    className="w-40 bg-transparent border-b border-current/40 text-sm font-bold focus:outline-none px-1 py-0.5"

                  />

                  <button

                    type="submit"

                    onMouseDown={(e) => e.preventDefault()}

                    className="p-1 rounded-full bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30"

                    title="保存"

                  >

                    <Check className="w-3.5 h-3.5 stroke-[3]" />

                  </button>

                </form>

              ) : (

                <button

                  type="button"

                  onClick={() => {

                    setMainTitleDraft(activeTask.title);

                    setIsEditingMainTitle(true);

                  }}

                  title="タップしてタスク名を変更"

                  className="flex items-center gap-1.5 group cursor-pointer"

                >

                  <span className="truncate max-w-[220px]">{activeTask.title}</span>

                  <Pencil className="w-3.5 h-3.5 opacity-40 group-hover:opacity-90 transition-opacity shrink-0" />

                </button>

              )}

            </motion.div>



            {/* Set System Progress Pill (shown when task has 2+ sets) */}

            {getTaskTotalSets(activeTask) > 1 && (() => {

              const totalSets = getTaskTotalSets(activeTask);

              const doneSets = getTaskCompletedSets(activeTask);

              const currentSetNum = activeTask.completed

                ? totalSets

                : Math.min(totalSets, doneSets + 1);

              const setMins = getTaskSetMinutes(activeTask);

              const totalMins = getTaskTotalMinutes(activeTask);



              return (

                <motion.div

                  initial={{ opacity: 0, y: -4 }}

                  animate={{ opacity: 1, y: 0 }}

                  className={`px-3 py-1 rounded-full backdrop-blur-xl border flex items-center gap-2 text-[11px] font-bold ${currentTheme.card}`}

                >

                  <span

                    className="font-mono font-extrabold tabular-nums"

                    style={{ color: activeCategory.color }}

                  >

                    {activeTask.completed

                      ? `全${totalSets}セット完了`

                      : `セット ${currentSetNum} / ${totalSets}`}

                  </span>



                  <div className="flex items-center gap-1">

                    {Array.from({ length: Math.min(10, totalSets) }).map((_, idx) => {

                      const isDone = activeTask.completed || idx < doneSets;

                      const isCurrent = !activeTask.completed && idx === doneSets;

                      return (

                        <span

                          key={idx}

                          className="h-2 rounded-full transition-all"

                          style={{

                            width: isCurrent ? '14px' : '7px',

                            backgroundColor:

                              isDone || isCurrent

                                ? activeCategory.color

                                : currentTheme.ringTrack,

                            opacity: isDone ? 1 : isCurrent ? 0.75 : 0.45,

                            boxShadow: isCurrent ? `0 0 8px ${activeCategory.glow}` : undefined,

                          }}

                        />

                      );

                    })}

                  </div>



                  <span className="font-mono text-[10px] opacity-75 tabular-nums">

                    {formatDurationBadge(setMins)}×{totalSets}・計{formatDurationBadge(totalMins)}

                  </span>

                </motion.div>

              );

            })()}

          </div>

        )}



        {/* MAIN ATOMIC TIMER DISPLAY (ZERO RE-RENDERING & 60FPS ATOMIC DRIVE) */}

        <AtomicTimerDisplay

          isRunning={isRunning}

          endTimestamp={endTimestamp}

          durationMs={activeTask ? getTaskSetMinutes(activeTask) * 60000 : 25 * 60 * 1000}

          initialRemainingMs={remainingMs}

          timerStyle={timerStyle}

          activeCategory={activeCategory}

          currentTheme={currentTheme}

          justCompleted={justCompleted}

          activeTask={activeTask}

          toggleTimer={toggleTimer}

          formatTime={formatTime}

          HourglassTimerVisual={HourglassTimerVisual}

          getTaskTotalSets={getTaskTotalSets}

          getTaskCompletedSets={getTaskCompletedSets}

        />



        {/* ==========================================

            ROAMING CHARACTER PLAYGROUND

            ========================================== */}

        <div className="no-pan relative w-full flex flex-col items-center overflow-hidden [overflow:clip] [contain:paint]">

          <AnimatePresence>

            {petHearts.map((h) => (

              <motion.div

                key={h.id}

                initial={{ opacity: 1, y: 0, scale: 0.6 }}

                animate={{ opacity: 0, y: -36, scale: 1.3 }}

                exit={{ opacity: 0 }}

                className="absolute -top-3 z-30 flex items-center gap-1 text-rose-400 font-bold text-xs pointer-events-none"

              >

                <Heart className="w-4 h-4 fill-rose-400" />

              </motion.div>

            ))}

          </AnimatePresence>



          <RoamingCompanionPlayground

            unlockedCharacters={unlockedCharacters}

            selectedCharIds={selectedCharIds}

            isRunning={isRunning}

            activeColor={activeCategory.color}

            onPetCharacter={handlePetCharacter}

            streak={streak}

            todayMinutes={todayMinutes}

            activeTask={activeTask}

            externalSpeechBubble={companionSpeechBubble}

          />

        </div>



        {/* ==========================================

            PRIMARY TIMER ACTION CONTROLS

            ========================================== */}

        <div className="no-pan flex items-center justify-center gap-4 mt-1 shrink-0">

          <motion.button

            whileHover={{ scale: 1.08 }}

            whileTap={{ scale: 0.9 }}

            onClick={handleRequestReset}

            title="リセット"

            className={`w-11 h-11 p-3 rounded-2xl backdrop-blur-xl border flex items-center justify-center transition-colors ${currentTheme.card}`}

          >

            <RotateCcw className="w-4 h-4 opacity-75" />

          </motion.button>



          <motion.button

            whileHover={{ scale: 1.06 }}

            whileTap={{ scale: 0.92 }}

            onClick={toggleTimer}

            className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl sm:rounded-3xl flex items-center justify-center text-white shadow-xl transition-transform"

            style={{

              backgroundColor: activeCategory.color,

              boxShadow: `0 8px 24px ${activeCategory.glow}`,

            }}

          >

            {isRunning ? (

              <Pause className="w-7 h-7 fill-current" />

            ) : (

              <Play className="w-7 h-7 fill-current ml-0.5" />

            )}

          </motion.button>

        </div>

      </main>



      {/* ==========================================

          BOTTOM DOCK: TASK SELECTOR CARDS

          ========================================== */}

      <footer className="relative z-10 w-full max-w-md flex flex-col gap-1.5 shrink-0">

        <div

          className={`w-full p-2 rounded-2xl backdrop-blur-2xl border flex items-center gap-2 scroll-x ${currentTheme.card}`}

        >

          {tasks.length === 0 ? (

            <button

              onClick={() => {

                setSettingsTab('tasks');

                setShowSettingsModal(true);

              }}

              className="w-full h-14 rounded-2xl border border-dashed border-current/30 flex items-center justify-center gap-2 text-xs font-bold opacity-75 hover:opacity-100 transition-opacity"

            >

              <Plus className="w-4 h-4" />

              <span>設定から新しいタスクを追加</span>

            </button>

          ) : (

            <AnimatePresence initial={false}>

              {tasks.map((task) => {

                const cat =

                  themedCategories.find((c) => c.id === task.categoryId) ||

                  themedCategories[0];

                const IconComp = cat.icon;

                const isSelected = activeTask && activeTask.id === task.id;

                const totalSets = getTaskTotalSets(task);

                const setMins = getTaskSetMinutes(task);

                const doneSets = getTaskCompletedSets(task);



                return (

                  <motion.div

                    key={task.id}

                    layout

                    initial={{ scale: 0.8, opacity: 0 }}

                    animate={{ scale: 1, opacity: 1 }}

                    exit={{ scale: 0.6, opacity: 0 }}

                    whileTap={{ scale: 0.95 }}

                    onClick={() => handleSelectTask(task)}

                    className={`relative shrink-0 min-w-[7rem] max-w-[10.5rem] h-12 sm:h-14 px-2.5 sm:px-3 rounded-2xl border flex items-center gap-2 sm:gap-2.5 cursor-pointer transition-all ${

                      isSelected

                        ? 'shadow-sm opacity-100'

                        : 'opacity-80 hover:opacity-100'

                    } ${currentTheme.pill}`}

                    style={{

                      backgroundColor: isSelected ? cat.softBg : undefined,

                      borderColor: isSelected ? cat.color : undefined,

                      boxShadow: isSelected ? `0 4px 14px ${cat.glow}` : undefined,

                    }}

                  >

                    <div

                      className="relative w-7 h-7 rounded-xl flex items-center justify-center shrink-0"

                      style={{ backgroundColor: cat.softBg }}

                    >

                      <IconComp className="w-4 h-4" style={{ color: cat.color }} />

                      {task.completed && (

                        <motion.div

                          initial={{ scale: 0 }}

                          animate={{ scale: 1 }}

                          className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow"

                        >

                          <Check className="w-2 h-2 stroke-[3]" />

                        </motion.div>

                      )}

                    </div>



                    <div className="flex flex-col min-w-0 flex-1">

                      <span className="text-[11px] font-bold truncate">{task.title}</span>

                      <div className="flex items-center gap-1 font-mono text-[10px] opacity-75 tabular-nums">

                        {totalSets > 1 ? (

                          <>

                            <span>

                              {formatDurationBadge(setMins)}×{totalSets}

                            </span>

                            <span>・</span>

                            <span style={{ color: doneSets > 0 ? cat.color : undefined }}>

                              {doneSets}/{totalSets}セット

                            </span>

                          </>

                        ) : (

                          <>

                            <span>{formatDurationBadge(task.durationMinutes)}</span>

                            <span>・</span>

                            <span>{getTaskFrequencyMeta(task).shortLabel}</span>

                          </>

                        )}

                      </div>

                    </div>

                  </motion.div>

                );

              })}

            </AnimatePresence>

          )}

        </div>

      </footer>



      {/* iOS Home Indicator Bar (Only when Demo Phone Frame is active) */}

      {showPhoneBezel && (

        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1.5 rounded-full bg-current opacity-25 pointer-events-none" />

      )}



      {/* ==========================================

          MODALS (RENDERED INSIDE SCREEN BOUNDS)

          ========================================== */}

      {/* MODAL 1: UNIFIED SETTINGS (TASKS ADD/DELETE, CHARACTER COLLECTION, UI STYLES) */}

      <AnimatePresence>

        {showSettingsModal && (

          <motion.div

            initial={{ opacity: 0 }}

            animate={{ opacity: 1 }}

            exit={{ opacity: 0, pointerEvents: 'none' }}

            onClick={() => setShowSettingsModal(false)}

            className={`absolute inset-0 z-50 ${currentTheme.backdrop} backdrop-blur-md flex items-center justify-center p-4`}

          >

            <motion.div

              initial={{ scale: 0.9, y: 20, opacity: 0 }}

              animate={{ scale: 1, y: 0, opacity: 1 }}

              exit={{ scale: 0.9, y: 20, opacity: 0 }}

              onClick={(e) => e.stopPropagation()}

              className={`w-full max-w-sm p-5 rounded-[2rem] backdrop-blur-2xl border flex flex-col gap-3.5 max-h-[86%] overflow-hidden ${currentTheme.modalCard} ${currentTheme.text}`}

            >

              {/* Settings Modal Header */}

              <div className="flex items-center justify-between shrink-0">

                <div className="flex items-center gap-2">

                  <Settings className="w-5 h-5" style={{ color: activeCategory.color }} />

                  <h2 className="text-sm font-bold">設定</h2>

                </div>

                <button

                  onClick={() => setShowSettingsModal(false)}

                  className="p-1 rounded-full hover:bg-current/10"

                >

                  <X className="w-4 h-4" />

                </button>

              </div>



              {/* 3 Settings Tabs: タスク / キャラ図鑑 / UIの模様 */}

              <div className={`grid grid-cols-3 gap-1 rounded-2xl ${currentTheme.subPanel} p-1 text-xs shrink-0`}>

                {[

                  { id: 'tasks', label: 'タスク管理' },

                  { id: 'characters', label: 'キャラ図鑑' },

                  { id: 'ui', label: 'UIの模様' },

                ].map((tab) => {

                  const active = settingsTab === tab.id;

                  return (

                    <button

                      key={tab.id}

                      type="button"

                      onClick={() => setSettingsTab(tab.id)}

                      className={`py-2 rounded-xl font-bold transition-all ${

                        active

                          ? `${currentTheme.activeTab} opacity-100`

                          : 'opacity-60 hover:opacity-85'

                      }`}

                      style={{

                        color: active ? activeCategory.color : undefined,

                      }}

                    >

                      {tab.label}

                    </button>

                  );

                })}

              </div>



              {/* Tab Content Body */}

              <div className="flex-1 overflow-y-auto no-scrollbar flex flex-col gap-4 pr-0.5">

                {/* TAB 1: TASK ADDITION & DELETION (NO SEPARATE CATEGORIES) */}

                {settingsTab === 'tasks' && (

                  <div className="flex flex-col gap-4">

                    {/* New Task Form */}

                    <form

                      onSubmit={handleCreateTask}

                      className={`p-3.5 rounded-2xl border flex flex-col gap-3 ${currentTheme.pill}`}

                    >

                      <span className="text-xs font-bold opacity-85">

                        新しいタスクを追加

                      </span>



                      <input

                        type="text"

                        value={draftTitle}

                        onChange={(e) => setDraftTitle(e.target.value)}

                        placeholder="タスク名を入力"

                        maxLength={30}

                        className={`w-full h-10 px-3.5 rounded-xl border bg-transparent text-xs font-semibold placeholder:opacity-45 focus:outline-none focus:ring-2 transition-all ${currentTheme.pill}`}

                        style={{

                          borderColor: (

                            themedCategories.find((c) => c.id === draftCategory) ||

                            themedCategories[0]

                          ).color,

                        }}

                      />



                      {/* Icon & Color Badge Picker (No Category Labels) */}

                      <div className="flex flex-col gap-1.5">

                        <span className="text-[10px] font-bold opacity-65">

                          タスクのアイコン・カラー

                        </span>

                        <div className="grid grid-cols-6 gap-1.5">

                          {themedCategories.map((cat) => {

                            const IconComp = cat.icon;

                            const selected = draftCategory === cat.id;

                            return (

                              <motion.button

                                type="button"

                                key={cat.id}

                                whileTap={{ scale: 0.92 }}

                                onClick={() => setDraftCategory(cat.id)}

                                className={`h-10 rounded-xl border flex items-center justify-center transition-all ${currentTheme.pill}`}

                                style={{

                                  backgroundColor: selected ? cat.softBg : undefined,

                                  borderColor: selected ? cat.color : undefined,

                                  boxShadow: selected ? `0 0 12px ${cat.glow}` : undefined,

                                }}

                              >

                                <IconComp className="w-4 h-4" style={{ color: cat.color }} />

                              </motion.button>

                            );

                          })}

                        </div>

                      </div>



                      {/* Task Frequency / Pace Picker (毎日 vs 週1〜5回 / 不定期) */}

                      <div className="flex flex-col gap-1.5">

                        <div className="flex items-center justify-between">

                          <span className="text-[10px] font-bold opacity-65">

                            実施ペース

                          </span>

                          <span

                            className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${

                              getTaskFrequencyMeta(draftFrequency).countsForStreak

                                ? 'bg-orange-500/15 text-orange-400'

                                : 'bg-current/10 opacity-70'

                            }`}

                          >

                            {getTaskFrequencyMeta(draftFrequency).countsForStreak

                              ? '🔥 連続記録の対象'

                              : '連続記録の対象外'}

                          </span>

                        </div>

                        <div className="grid grid-cols-4 gap-1">

                          {TASK_FREQUENCIES.map((freq) => {

                            const activeFreq = draftFrequency === freq.id;

                            const selCat =

                              themedCategories.find((c) => c.id === draftCategory) ||

                              themedCategories[0];

                            return (

                              <button

                                key={freq.id}

                                type="button"

                                onClick={() => setDraftFrequency(freq.id)}

                                className={`py-1.5 rounded-lg border text-[10px] font-bold transition-all ${currentTheme.pill}`}

                                style={{

                                  backgroundColor: activeFreq ? selCat.softBg : undefined,

                                  borderColor: activeFreq ? selCat.color : undefined,

                                  color: activeFreq ? selCat.color : undefined,

                                }}

                              >

                                {freq.label}

                              </button>

                            );

                          })}

                        </div>

                      </div>



                      {/* Timer Duration Picker (Per-Set Duration + Set Count) */}

                      <div className="w-full flex flex-col items-center gap-2 pt-1">

                        <div className="w-full flex items-center justify-between text-[10px] font-bold">

                          <span className="opacity-65">

                            {draftSets > 1 ? '1セットの時間' : '設定時間'}

                          </span>

                          <span

                            className="font-mono font-extrabold"

                            style={{

                              color: (

                                themedCategories.find((c) => c.id === draftCategory) ||

                                themedCategories[0]

                              ).color,

                            }}

                          >

                            {draftSets > 1

                              ? `${formatDurationBadge(draftSetMinutes)} × ${draftSets}セット ＝ 合計 ${formatDurationBadge(draftTotalMinutes)}`

                              : `合計 ${formatDurationBadge(draftTotalMinutes)}`}

                          </span>

                        </div>



                        <div className="flex items-center justify-center gap-2.5">

                          <div className="flex flex-col items-center gap-1">

                            <motion.button

                              type="button"

                              whileTap={{ scale: 0.85 }}

                              onClick={() => adjustHours(1)}

                              className={`w-11 h-6 rounded-lg border flex items-center justify-center ${currentTheme.pill}`}

                            >

                              <ChevronUp className="w-3.5 h-3.5" />

                            </motion.button>

                            <div className="w-14 text-center font-mono text-2xl font-bold tabular-nums">

                              {String(draftHours).padStart(2, '0')}

                            </div>

                            <motion.button

                              type="button"

                              whileTap={{ scale: 0.85 }}

                              onClick={() => adjustHours(-1)}

                              className={`w-11 h-6 rounded-lg border flex items-center justify-center ${currentTheme.pill}`}

                            >

                              <ChevronDown className="w-3.5 h-3.5" />

                            </motion.button>

                          </div>



                          <span className="font-mono text-xl font-bold opacity-40">:</span>



                          <div className="flex flex-col items-center gap-1">

                            <motion.button

                              type="button"

                              whileTap={{ scale: 0.85 }}

                              onClick={() => adjustMinutes(5)}

                              className={`w-11 h-6 rounded-lg border flex items-center justify-center ${currentTheme.pill}`}

                            >

                              <ChevronUp className="w-3.5 h-3.5" />

                            </motion.button>

                            <div className="w-14 text-center font-mono text-2xl font-bold tabular-nums">

                              {String(draftMinutes).padStart(2, '0')}

                            </div>

                            <motion.button

                              type="button"

                              whileTap={{ scale: 0.85 }}

                              onClick={() => adjustMinutes(-5)}

                              className={`w-11 h-6 rounded-lg border flex items-center justify-center ${currentTheme.pill}`}

                            >

                              <ChevronDown className="w-3.5 h-3.5" />

                            </motion.button>

                          </div>



                          <div className="flex flex-col gap-1 ml-1">

                            <motion.button

                              type="button"

                              whileTap={{ scale: 0.85 }}

                              onClick={() => adjustMinutes(1)}

                              className={`w-7 h-7 rounded-lg border flex items-center justify-center ${currentTheme.pill}`}

                            >

                              <Plus className="w-3 h-3" />

                            </motion.button>

                            <motion.button

                              type="button"

                              whileTap={{ scale: 0.85 }}

                              onClick={() => adjustMinutes(-1)}

                              className={`w-7 h-7 rounded-lg border flex items-center justify-center ${currentTheme.pill}`}

                            >

                              <Minus className="w-3 h-3" />

                            </motion.button>

                          </div>

                        </div>



                        <div className="grid grid-cols-5 gap-1 w-full">

                          {PRESET_MINUTES.map((mins) => {

                            const active = draftSetMinutes === mins;

                            const selCat =

                              themedCategories.find((c) => c.id === draftCategory) ||

                              themedCategories[0];

                            return (

                              <motion.button

                                type="button"

                                key={mins}

                                whileTap={{ scale: 0.9 }}

                                onClick={() => handleSelectPresetMinutes(mins)}

                                className={`h-7 rounded-lg font-mono text-[10px] font-bold border transition-all ${currentTheme.pill}`}

                                style={{

                                  backgroundColor: active ? selCat.color : undefined,

                                  borderColor: active ? selCat.color : undefined,

                                  color: active ? '#ffffff' : undefined,

                                }}

                              >

                                {formatDurationBadge(mins)}

                              </motion.button>

                            );

                          })}

                        </div>



                        {/* Set System Picker (セット形式: 例 15分 × 2セット ＝ 30分) */}

                        <div className="w-full flex flex-col gap-1.5 pt-1">

                          <div className="flex items-center justify-between text-[10px] font-bold">

                            <span className="opacity-65">セット数</span>

                            <div className="flex items-center gap-1">

                              <button

                                type="button"

                                onClick={() => setDraftSets((s) => Math.max(1, s - 1))}

                                className={`w-5 h-5 rounded-md border flex items-center justify-center ${currentTheme.pill}`}

                              >

                                <Minus className="w-2.5 h-2.5" />

                              </button>

                              <span className="font-mono text-xs font-extrabold px-1 tabular-nums">

                                {draftSets}セット

                              </span>

                              <button

                                type="button"

                                onClick={() => setDraftSets((s) => Math.min(20, s + 1))}

                                className={`w-5 h-5 rounded-md border flex items-center justify-center ${currentTheme.pill}`}

                              >

                                <Plus className="w-2.5 h-2.5" />

                              </button>

                            </div>

                          </div>



                          <div className="grid grid-cols-5 gap-1 w-full">

                            {PRESET_SETS.map((setNum) => {

                              const activeSet = draftSets === setNum;

                              const selCat =

                                themedCategories.find((c) => c.id === draftCategory) ||

                                themedCategories[0];

                              return (

                                <button

                                  type="button"

                                  key={setNum}

                                  onClick={() => setDraftSets(setNum)}

                                  className={`py-1.5 rounded-lg font-mono text-[10px] font-bold border transition-all ${currentTheme.pill}`}

                                  style={{

                                    backgroundColor: activeSet ? selCat.softBg : undefined,

                                    borderColor: activeSet ? selCat.color : undefined,

                                    color: activeSet ? selCat.color : undefined,

                                  }}

                                >

                                  {setNum}セット

                                </button>

                              );

                            })}

                          </div>

                        </div>

                      </div>



                      <motion.button

                        type="submit"

                        whileHover={{ scale: 1.02 }}

                        whileTap={{ scale: 0.95 }}

                        onClick={(e) => handleRequestCreateTask(e)}

                        className="w-full py-2.5 rounded-xl flex items-center justify-center gap-1.5 text-xs font-bold text-white shadow-md"

                        style={{

                          backgroundColor: (

                            themedCategories.find((c) => c.id === draftCategory) ||

                            themedCategories[0]

                          ).color,

                        }}

                      >

                        <Plus className="w-4 h-4 stroke-[2.5]" />

                        <span>タスクを追加する</span>

                      </motion.button>

                    </form>



                    {/* Existing Tasks List & Delete Controls */}

                    <div className="flex flex-col gap-2">

                      <div className="flex items-center justify-between">

                        <span className="text-xs font-bold opacity-85">

                          登録中のタスク一覧

                        </span>

                        <span className="text-[10px] opacity-55">

                          ※削除するとそのタスクの過去データも消去されます

                        </span>

                      </div>



                      {tasks.length === 0 ? (

                        <div className="py-4 text-center text-xs opacity-50">

                          登録されているタスクがありません

                        </div>

                      ) : (

                        <div className="flex flex-col gap-1.5">

                          {tasks.map((task) => {

                            const cat =

                              themedCategories.find((c) => c.id === task.categoryId) ||

                              themedCategories[0];

                            const IconComp = cat.icon;

                            const isEditingThis = editingTaskId === task.id;

                            const isEditingDurationThis = editingDurationTaskId === task.id;

                            const isEditingFreqThis = editingFrequencyTaskId === task.id;

                            const editStats = getTaskDurationEditStats(task, activityLogs);

                            const canEditDuration = editStats.tickets > 0;

                            const showLockedNotice = lockedDurationNoticeTaskId === task.id;

                            const freqMeta = getTaskFrequencyMeta(task);

                            const weeklyDoneCount = freqMeta.weeklyTarget

                              ? getWeeklyCompletionCount(task)

                              : 0;

                            const taskSetMins = getTaskSetMinutes(task);

                            const taskTotalSets = getTaskTotalSets(task);

                            const taskTotalMins = getTaskTotalMinutes(task);

                            const taskDoneSets = getTaskCompletedSets(task);



                            return (

                              <div

                                key={task.id}

                                className={`p-2.5 rounded-2xl border flex flex-col gap-2 ${currentTheme.pill}`}

                              >

                                <div className="flex items-center justify-between gap-2">

                                  <div className="flex items-center gap-2.5 min-w-0 flex-1">

                                    <div

                                      className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"

                                      style={{ backgroundColor: cat.softBg }}

                                    >

                                      <IconComp

                                        className="w-4 h-4"

                                        style={{ color: cat.color }}

                                      />

                                    </div>



                                    {isEditingThis ? (

                                      <form

                                        onSubmit={(e) => {

                                          e.preventDefault();

                                          handleSaveRenameTask(task.id, editingTaskTitle);

                                        }}

                                        className="flex items-center gap-1.5 flex-1 min-w-0"

                                      >

                                        <input

                                          type="text"

                                          value={editingTaskTitle}

                                          onChange={(e) => setEditingTaskTitle(e.target.value)}

                                          maxLength={30}

                                          autoFocus

                                          className={`w-full h-8 px-2.5 rounded-lg border ${currentTheme.subPanel} text-xs font-bold focus:outline-none ${currentTheme.pill}`}

                                          style={{ borderColor: cat.color }}

                                        />

                                        <button

                                          type="submit"

                                          title="保存"

                                          className="p-1.5 rounded-lg bg-emerald-500 text-white shrink-0"

                                        >

                                          <Check className="w-3.5 h-3.5 stroke-[3]" />

                                        </button>

                                        <button

                                          type="button"

                                          onClick={() => setEditingTaskId(null)}

                                          title="キャンセル"

                                          className="p-1.5 rounded-lg bg-current/10 hover:bg-current/20 shrink-0"

                                        >

                                          <X className="w-3.5 h-3.5" />

                                        </button>

                                      </form>

                                    ) : (

                                      <div

                                        onClick={() => handleStartRenameTask(task)}

                                        className="flex flex-col min-w-0 flex-1 cursor-pointer group"

                                        title="タップして名前を変更"

                                      >

                                        <div className="flex items-center gap-1">

                                          <span className="text-xs font-bold truncate">

                                            {task.title}

                                          </span>

                                          <Pencil className="w-3 h-3 opacity-40 group-hover:opacity-90 shrink-0" />

                                        </div>

                                        <div className="flex items-center gap-1 flex-wrap mt-0.5">

                                          <span className="text-[10px] font-mono opacity-75">

                                            {taskTotalSets > 1

                                              ? `${formatDurationBadge(taskSetMins)}×${taskTotalSets}セット・計${formatDurationBadge(taskTotalMins)}`

                                              : formatDurationBadge(taskTotalMins)}

                                          </span>

                                          {taskTotalSets > 1 && (

                                            <span

                                              className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded-md"

                                              style={{

                                                backgroundColor: cat.softBg,

                                                color: cat.color,

                                              }}

                                            >

                                              {taskDoneSets}/{taskTotalSets}セット

                                            </span>

                                          )}

                                          <button

                                            type="button"

                                            onClick={(e) => {

                                              e.stopPropagation();

                                              setEditingFrequencyTaskId((prev) =>

                                                prev === task.id ? null : task.id

                                              );

                                            }}

                                            className={`text-[9px] font-bold px-1.5 py-0.2 rounded-md border transition-all ${

                                              freqMeta.countsForStreak

                                                ? 'bg-orange-500/15 border-orange-400/35 text-orange-400'

                                                : 'bg-current/10 border-current/15 opacity-80'

                                            }`}

                                          >

                                            {freqMeta.countsForStreak

                                              ? '毎日'

                                              : freqMeta.weeklyTarget

                                                ? `今週${weeklyDoneCount}/${freqMeta.weeklyTarget}回`

                                                : freqMeta.label}

                                          </button>

                                          <span

                                            className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded-md"

                                            style={{

                                              backgroundColor: canEditDuration

                                                ? cat.softBg

                                                : 'rgba(148,163,184,0.15)',

                                              color: canEditDuration ? cat.color : undefined,

                                            }}

                                          >

                                            {canEditDuration

                                              ? `内容変更可能 ${editStats.tickets}回`

                                              : `${editStats.completedRuns}/${REQUIRED_DURATION_RUNS}回`}

                                          </span>

                                        </div>

                                      </div>

                                    )}

                                  </div>



                                  {!isEditingThis && (

                                    <div className="flex items-center gap-1 shrink-0">

                                      <button

                                        type="button"

                                        onClick={() =>

                                          setEditingFrequencyTaskId((prev) =>

                                            prev === task.id ? null : task.id

                                          )

                                        }

                                        title="実施ペースを変更"

                                        className="px-2 py-1.5 rounded-xl border border-current/15 bg-current/5 hover:bg-current/10 text-[11px] font-bold flex items-center gap-1 opacity-80 hover:opacity-100 transition-all"

                                      >

                                        <span>{freqMeta.shortLabel}</span>

                                      </button>

                                      <button

                                        type="button"

                                        onClick={() => handleOpenDurationEditor(task)}

                                        title={

                                          canEditDuration

                                            ? 'タスク内容（時間・セット数）を変更'

                                            : `設定時間×${REQUIRED_DURATION_RUNS}回達成でタスク内容を変更可能`

                                        }

                                        className={`px-2 py-1.5 rounded-xl border text-[11px] font-bold flex items-center gap-1 transition-all ${

                                          canEditDuration

                                            ? 'opacity-95 hover:opacity-100'

                                            : 'border-current/15 bg-current/5 opacity-60 hover:opacity-90'

                                        }`}

                                        style={{

                                          backgroundColor: canEditDuration ? cat.softBg : undefined,

                                          borderColor: canEditDuration ? cat.color : undefined,

                                          color: canEditDuration ? cat.color : undefined,

                                        }}

                                      >

                                        {canEditDuration ? (

                                          <Clock className="w-3 h-3" />

                                        ) : (

                                          <Lock className="w-3 h-3" />

                                        )}

                                        <span>タスク内容変更</span>

                                      </button>

                                      <button

                                        type="button"

                                        onClick={(e) => handleRequestDeleteTask(e, task)}

                                        title="タスクを削除"

                                        className="px-2 py-1.5 rounded-xl border border-current/15 bg-current/5 hover:bg-rose-500/20 hover:text-rose-500 text-[11px] font-bold flex items-center gap-1 opacity-70 hover:opacity-100 transition-all"

                                      >

                                        <Trash2 className="w-3 h-3" />

                                      </button>

                                    </div>

                                  )}

                                </div>



                                {/* Inline Frequency / Pace Selector for Existing Task */}

                                {isEditingFreqThis && (

                                  <div

                                    className={`p-2.5 rounded-xl border ${currentTheme.subPanel} flex flex-col gap-2`}

                                    style={{ borderColor: cat.color }}

                                  >

                                    <div className="flex items-center justify-between text-[10px] font-bold">

                                      <span>実施ペース設定</span>

                                      <span

                                        className={

                                          freqMeta.countsForStreak

                                            ? 'text-orange-400'

                                            : 'opacity-70'

                                        }

                                      >

                                        {freqMeta.countsForStreak

                                          ? '🔥 連続記録日数の対象'

                                          : '連続記録日数の対象外'}

                                      </span>

                                    </div>

                                    <div className="grid grid-cols-4 gap-1">

                                      {TASK_FREQUENCIES.map((freq) => {

                                        const isSelectedFreq =

                                          (task.frequency || 'daily') === freq.id;

                                        return (

                                          <button

                                            key={freq.id}

                                            type="button"

                                            onClick={() =>

                                              handleChangeTaskFrequency(task.id, freq.id)

                                            }

                                            className={`py-1 rounded-lg border text-[10px] font-bold transition-all ${currentTheme.pill}`}

                                            style={{

                                              backgroundColor: isSelectedFreq

                                                ? cat.softBg

                                                : undefined,

                                              borderColor: isSelectedFreq

                                                ? cat.color

                                                : undefined,

                                              color: isSelectedFreq ? cat.color : undefined,

                                            }}

                                          >

                                            {freq.label}

                                          </button>

                                        );

                                      })}

                                    </div>

                                  </div>

                                )}



                                {/* Locked Duration Notice when user taps タスク内容変更 before reaching 14 runs */}

                                {showLockedNotice && !canEditDuration && (

                                  <div

                                    className={`px-2.5 py-2 rounded-xl ${currentTheme.subPanel} flex flex-col gap-1 text-[10px]`}

                                  >

                                    <div className="flex items-center justify-between font-bold">

                                      <span>

                                        設定時間 × 14回達成でタスク内容を1回変更できます

                                      </span>

                                      <button

                                        type="button"

                                        onClick={() => setLockedDurationNoticeTaskId(null)}

                                        className="opacity-60 hover:opacity-100"

                                      >

                                        <X className="w-3 h-3" />

                                      </button>

                                    </div>

                                    <div className="flex items-center justify-between font-mono opacity-80">

                                      <span>

                                        現在 {editStats.completedRuns} / 14回 ({formatDurationBadge(editStats.cycleMinutes)} / {formatDurationBadge(editStats.requiredMinutes)})

                                      </span>

                                      <span style={{ color: cat.color }} className="font-bold">

                                        あと {formatDurationBadge(editStats.remainingMinutes)}

                                      </span>

                                    </div>

                                    <div className="w-full h-1.5 rounded-full bg-current/10 overflow-hidden">

                                      <div

                                        className="h-full rounded-full transition-all"

                                        style={{

                                          width: `${Math.round(editStats.cycleProgress * 100)}%`,

                                          backgroundColor: cat.color,

                                        }}

                                      />

                                    </div>

                                  </div>

                                )}



                                {/* Inline Duration Editor when tickets > 0 */}

                                {isEditingDurationThis && canEditDuration && (() => {

                                  const nextSetMins = Math.max(

                                    1,

                                    editingDurationHours * 60 + editingDurationMinutes

                                  );

                                  const nextSetsCount = Math.max(1, editingDurationSets || 1);

                                  const nextTotalMins = nextSetMins * nextSetsCount;

                                  return (

                                    <div

                                      className={`p-2.5 rounded-xl border ${currentTheme.subPanel} flex flex-col gap-2`}

                                      style={{ borderColor: cat.color }}

                                    >

                                      <div className="flex items-center justify-between text-[11px] font-bold">

                                        <span style={{ color: cat.color }}>

                                          タスク内容変更 残り{editStats.tickets}回

                                        </span>

                                        <span className="font-mono text-[10px]">

                                          {taskTotalSets > 1

                                            ? `${formatDurationBadge(taskSetMins)}×${taskTotalSets}セット`

                                            : formatDurationBadge(taskTotalMins)}{' '}

                                          →{' '}

                                          {nextSetsCount > 1

                                            ? `${formatDurationBadge(nextSetMins)}×${nextSetsCount}セット ・ 計${formatDurationBadge(nextTotalMins)}`

                                            : formatDurationBadge(nextTotalMins)}

                                        </span>

                                      </div>



                                      {/* 1セットあたりの時間 */}

                                      <div className="flex flex-col gap-1">

                                        <span className="text-[10px] font-bold opacity-75">

                                          1セットあたりの時間

                                        </span>

                                        <div className="grid grid-cols-2 gap-2">

                                          <div className={`p-1.5 rounded-xl border flex items-center justify-between ${currentTheme.pill}`}>

                                            <button

                                              type="button"

                                              onClick={() => adjustEditingDurationHours(-1)}

                                              className="w-6 h-6 rounded-lg bg-current/10 flex items-center justify-center hover:bg-current/20 active:scale-95"

                                            >

                                              <Minus className="w-3 h-3" />

                                            </button>

                                            <div className="text-center">

                                              <span className="font-mono text-xs font-bold">

                                                {editingDurationHours}

                                              </span>

                                              <span className="text-[10px] opacity-70 ml-0.5">時間</span>

                                            </div>

                                            <button

                                              type="button"

                                              onClick={() => adjustEditingDurationHours(1)}

                                              className="w-6 h-6 rounded-lg bg-current/10 flex items-center justify-center hover:bg-current/20 active:scale-95"

                                            >

                                              <Plus className="w-3 h-3" />

                                            </button>

                                          </div>



                                          <div className={`p-1.5 rounded-xl border flex items-center justify-between ${currentTheme.pill}`}>

                                            <button

                                              type="button"

                                              onClick={() => adjustEditingDurationMinutes(-5)}

                                              className="w-6 h-6 rounded-lg bg-current/10 flex items-center justify-center hover:bg-current/20 active:scale-95"

                                            >

                                              <Minus className="w-3 h-3" />

                                            </button>

                                            <div className="text-center">

                                              <span className="font-mono text-xs font-bold">

                                                {editingDurationMinutes}

                                              </span>

                                              <span className="text-[10px] opacity-70 ml-0.5">分</span>

                                            </div>

                                            <button

                                              type="button"

                                              onClick={() => adjustEditingDurationMinutes(5)}

                                              className="w-6 h-6 rounded-lg bg-current/10 flex items-center justify-center hover:bg-current/20 active:scale-95"

                                            >

                                              <Plus className="w-3 h-3" />

                                            </button>

                                          </div>

                                        </div>



                                        <div className="flex flex-wrap gap-1 mt-0.5">

                                          {PRESET_MINUTES.map((mins) => {

                                            const isPresetSelected =

                                              editingDurationHours * 60 + editingDurationMinutes === mins;

                                            return (

                                              <button

                                                key={mins}

                                                type="button"

                                                onClick={() => {

                                                  setEditingDurationHours(Math.floor(mins / 60));

                                                  setEditingDurationMinutes(mins % 60);

                                                }}

                                                className="px-2 py-0.5 rounded-lg border text-[10px] font-mono font-bold transition-all"

                                                style={{

                                                  backgroundColor: isPresetSelected ? cat.softBg : undefined,

                                                  borderColor: isPresetSelected

                                                    ? cat.color

                                                    : 'rgba(148,163,184,0.25)',

                                                  color: isPresetSelected ? cat.color : undefined,

                                                }}

                                              >

                                                {formatDurationBadge(mins)}

                                              </button>

                                            );

                                          })}

                                        </div>

                                      </div>



                                      {/* セット数設定 */}

                                      <div className="flex flex-col gap-1.5 pt-1.5 border-t border-current/10">

                                        <div className="flex items-center justify-between text-[10px] font-bold">

                                          <span className="opacity-75">セット数</span>

                                          <div className="flex items-center gap-1.5">

                                            <button

                                              type="button"

                                              onClick={() =>

                                                setEditingDurationSets((s) => Math.max(1, (Number(s) || 1) - 1))

                                              }

                                              className={`w-6 h-6 rounded-lg border flex items-center justify-center hover:bg-current/10 active:scale-95 ${currentTheme.pill}`}

                                            >

                                              <Minus className="w-3 h-3" />

                                            </button>

                                            <span

                                              className="font-mono text-xs font-extrabold px-1.5 tabular-nums"

                                              style={{ color: cat.color }}

                                            >

                                              {editingDurationSets}セット

                                            </span>

                                            <button

                                              type="button"

                                              onClick={() =>

                                                setEditingDurationSets((s) => Math.min(20, (Number(s) || 1) + 1))

                                              }

                                              className={`w-6 h-6 rounded-lg border flex items-center justify-center hover:bg-current/10 active:scale-95 ${currentTheme.pill}`}

                                            >

                                              <Plus className="w-3 h-3" />

                                            </button>

                                          </div>

                                        </div>



                                        <div className="grid grid-cols-5 gap-1 w-full">

                                          {PRESET_SETS.map((sNum) => {

                                            const activeSet = Number(editingDurationSets) === sNum;

                                            return (

                                              <button

                                                key={sNum}

                                                type="button"

                                                onClick={() => setEditingDurationSets(sNum)}

                                                className={`py-1 rounded-lg border text-[10px] font-mono font-bold transition-all ${currentTheme.pill}`}

                                                style={{

                                                  backgroundColor: activeSet ? cat.softBg : undefined,

                                                  borderColor: activeSet

                                                    ? cat.color

                                                    : 'rgba(148,163,184,0.25)',

                                                  color: activeSet ? cat.color : undefined,

                                                }}

                                              >

                                                {sNum}セット

                                              </button>

                                            );

                                          })}

                                        </div>



                                        {/* 計算結果サマリー */}

                                        <div

                                          className={`p-2 rounded-xl border flex items-center justify-between text-[10px] font-mono font-bold ${currentTheme.pill}`}

                                          style={{ borderColor: cat.color }}

                                        >

                                          <span className="opacity-75">

                                            1セット {formatDurationBadge(nextSetMins)} × {nextSetsCount}セット

                                          </span>

                                          <span style={{ color: cat.color }}>

                                            合計 {formatDurationBadge(nextTotalMins)}

                                          </span>

                                        </div>

                                      </div>



                                      <div className="flex items-center justify-end gap-1.5 pt-0.5">

                                        <button

                                          type="button"

                                          onClick={() => setEditingDurationTaskId(null)}

                                          className="px-2.5 py-1 rounded-lg bg-current/10 hover:bg-current/20 text-[11px] font-bold"

                                        >

                                          キャンセル

                                        </button>

                                        <button

                                          type="button"

                                          onClick={() => handleSaveTaskDuration(task)}

                                          className="px-3 py-1 rounded-lg text-white text-[11px] font-bold flex items-center gap-1 shadow"

                                          style={{ backgroundColor: cat.color }}

                                        >

                                          <Check className="w-3.5 h-3.5 stroke-[2.5]" />

                                          <span>変更を確定</span>

                                        </button>

                                      </div>

                                    </div>

                                  );

                                })()}

                              </div>

                            );

                          })}

                        </div>

                      )}

                    </div>

                  </div>

                )}



                {/* TAB 2: CHARACTER COLLECTION (キャラ図鑑) */}

                {settingsTab === 'characters' && (

                  <div className="flex flex-col gap-3">

                    <div className="flex items-center justify-between">

                      <span className="text-xs font-bold opacity-85">

                        キャラ図鑑

                      </span>

                      <span className="font-mono text-xs opacity-70">

                        {unlockedCharacters.length} / {CHARACTERS.length} 体

                      </span>

                    </div>



                    {/* Selected Companions Summary (max 3) */}

                    <div className={`p-2.5 rounded-2xl border flex flex-col gap-2 ${currentTheme.pill}`}>

                      <div className="flex items-center justify-between text-[11px] font-bold">

                        <span>一緒にいるキャラ</span>

                        <span

                          className="font-mono"

                          style={{ color: activeCategory.color }}

                        >

                          {selectedCharIds.length} / {MAX_SELECTED_CHARACTERS} 体

                        </span>

                      </div>

                      <div className="grid grid-cols-3 gap-1.5">

                        {Array.from({ length: MAX_SELECTED_CHARACTERS }).map((_, slotIdx) => {

                          const slotCharId = selectedCharIds[slotIdx];

                          const slotChar = CHARACTERS.find((c) => c.id === slotCharId);

                          const isLockedFirst = slotIdx === 0 && selectedCharIds.length < 2;



                          if (!slotChar) {

                            return (

                              <div

                                key={`empty-${slotIdx}`}

                                className={`relative h-20 rounded-xl border border-dashed opacity-40 flex flex-col items-center justify-center gap-0.5 ${currentTheme.subPanel}`}

                              >

                                <Plus className="w-3.5 h-3.5 opacity-60" />

                                <span className="text-[9px] font-bold opacity-60">空き</span>

                              </div>

                            );

                          }



                          return (

                            <motion.div

                              key={slotChar.id}

                              layout

                              drag="x"

                              dragSnapToOrigin

                              dragElastic={0.2}

                              dragConstraints={{

                                left: slotIdx === 0 ? 0 : slotIdx === 1 ? -120 : -220,

                                right: slotIdx === 2 ? 0 : slotIdx === 1 ? 120 : 220,

                              }}

                              whileDrag={{

                                scale: 1.08,

                                zIndex: 40,

                                cursor: 'grabbing',

                                filter: 'drop-shadow(0 12px 20px rgba(0,0,0,0.35))',

                              }}

                              whileHover={{ scale: 1.02 }}

                              whileTap={{ scale: 0.98 }}

                              onDragEnd={(_, info) => {

                                const offset = info.offset.x;

                                const threshold = 35;



                                if (slotIdx === 2) {

                                  // 3体目を左にスライド: 通常のスライドでは【確実に2体目とだけ入れ替える】

                                  if (offset < -130) {

                                    swapCompanionSlots(2, 0);

                                  } else if (offset < -threshold) {

                                    swapCompanionSlots(2, 1);

                                  }

                                } else if (slotIdx === 1) {

                                  // 2体目を左右にスライド

                                  if (offset < -threshold) {

                                    swapCompanionSlots(1, 0);

                                  } else if (offset > threshold && selectedCharIds.length > 2) {

                                    swapCompanionSlots(1, 2);

                                  }

                                } else if (slotIdx === 0) {

                                  // 1体目を右にスライド

                                  if (offset > 130 && selectedCharIds.length > 2) {

                                    swapCompanionSlots(0, 2);

                                  } else if (offset > threshold && selectedCharIds.length > 1) {

                                    swapCompanionSlots(0, 1);

                                  }

                                }

                              }}

                              className={`group relative h-20 rounded-xl border flex flex-col items-center justify-center gap-1 cursor-grab active:cursor-grabbing select-none transition-colors ${

                                slotIdx === 0

                                  ? 'border-amber-400 bg-amber-400/10'

                                  : 'border-current/15 hover:border-amber-400/50'

                              } ${currentTheme.subPanel}`}

                            >

                              {/* Slot index number badge (メイン等の文字は非表示) */}

                              <span

                                className={`absolute top-1 left-1 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-mono font-black shadow-sm ${

                                  slotIdx === 0

                                    ? 'bg-amber-400 text-slate-950'

                                    : 'bg-current/15 text-current'

                                }`}

                              >

                                {slotIdx + 1}

                              </span>



                              {/* Remove cross button */}

                              <button

                                type="button"

                                onClick={(e) => {

                                  e.stopPropagation();

                                  removeCompanionAt(slotIdx);

                                }}

                                title={

                                  isLockedFirst

                                    ? '1体目は2体目がいる時のみ外せます'

                                    : `${slotChar.name}を外す`

                                }

                                className={`absolute top-1 right-1 w-5 h-5 rounded-full flex items-center justify-center shadow-sm text-white transition-all z-10 ${

                                  isLockedFirst

                                    ? 'bg-zinc-500/30 opacity-30 cursor-not-allowed'

                                    : 'bg-rose-500/80 hover:bg-rose-500 hover:scale-110 active:scale-95 cursor-pointer'

                                }`}

                              >

                                <X className="w-3 h-3 stroke-[3]" />

                              </button>



                              <CuteCharacterAvatar charId={slotChar.id} size={40} />

                              <span className="text-[10px] font-bold truncate max-w-full px-1">

                                {slotChar.name}

                              </span>

                            </motion.div>

                          );

                        })}

                      </div>

                      <span className="text-[10px] opacity-70 leading-snug">

                        長押しスライドで順番を入れ替えられます（1番目のキャラがお部屋の中央になります）。タップで外せます。

                      </span>

                      {charLimitNotice && (

                        <span className="text-[10px] font-bold text-rose-400 flex items-center gap-1 animate-pulse">

                          <span>⚠️</span>

                          <span>{charLimitNotice}</span>

                        </span>

                      )}

                    </div>



                    <div className="grid grid-cols-2 gap-2.5">

                      {CHARACTERS.map((char) => {

                        const isUnlocked = unlockedCharacters.some((u) => u.id === char.id);

                        const selectedIdx = selectedCharIds.indexOf(char.id);

                        const isSelected = selectedIdx >= 0;

                        const isMain = selectedIdx === 0;



                        return (

                          <motion.button

                            key={char.id}

                            type="button"

                            whileHover={isUnlocked ? { scale: 1.03 } : {}}

                            whileTap={isUnlocked ? { scale: 0.96 } : {}}

                            onClick={() => {

                              if (isUnlocked) toggleCharacterSelection(char.id);

                            }}

                            className={`relative p-3 rounded-2xl border flex flex-col items-center justify-center gap-1.5 transition-all ${

                              isSelected

                                ? 'ring-2 ring-amber-400 bg-amber-400/10'

                                : currentTheme.pill

                            }`}

                          >

                            <span

                              className="absolute top-2 left-2 px-1.5 py-0.5 rounded-md font-mono text-[9px] font-bold"

                              style={{

                                backgroundColor: `${char.badgeColor}22`,

                                color: char.badgeColor,

                              }}

                            >

                              Lv.{char.unlockLevel}

                            </span>



                            {isUnlocked ? (

                              <>

                                <CuteCharacterAvatar

                                  charId={char.id}

                                  size={68}

                                  isRunning={isSelected}

                                />

                                <div className="text-center">

                                  <div className="text-xs font-bold">{char.name}</div>

                                  <div className="text-[10px] opacity-65 leading-tight mt-0.5">

                                    {char.title}

                                  </div>

                                </div>

                                {isSelected && (

                                  <span className="absolute top-2 right-2 w-5 h-5 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center shadow font-mono text-[10px] font-extrabold">

                                    {selectedIdx + 1}

                                  </span>

                                )}

                              </>

                            ) : (

                              <div className="py-3 flex flex-col items-center justify-center gap-1.5 opacity-65">

                                <div className="relative">

                                  <div className="brightness-0 opacity-35">

                                    <CuteCharacterAvatar charId={char.id} size={58} />

                                  </div>

                                  <div className="absolute inset-0 flex items-center justify-center">

                                    <Lock className="w-5 h-5 text-white drop-shadow" />

                                  </div>

                                </div>

                                <div className="text-center">

                                  <div className="text-xs font-bold">{char.name}</div>

                                  <div

                                    className={`text-[10px] mt-0.5 font-semibold ${

                                      currentTheme.isLight ? 'text-amber-600' : 'text-amber-300'

                                    }`}

                                  >

                                    {char.unlockText}

                                  </div>

                                </div>

                              </div>

                            )}

                          </motion.button>

                        );

                      })}

                    </div>

                  </div>

                )}



                {/* TAB 3: UI STYLES & THEMES (UIの模様) */}

                {settingsTab === 'ui' && (

                  <div className="flex flex-col gap-4">

                    <div className="flex flex-col gap-2">

                      <span className="text-xs font-bold opacity-85">

                        タイマーの模様

                      </span>

                      <div className="grid grid-cols-4 gap-2.5">

                        {TIMER_STYLES.map((style) => {

                          const StyleIcon = style.icon;

                          const active = timerStyle === style.id;

                          return (

                            <motion.button

                              key={style.id}

                              type="button"

                              whileTap={{ scale: 0.92 }}

                              onClick={() => setTimerStyle(style.id)}

                              className={`h-14 rounded-2xl border flex flex-col items-center justify-center gap-1 transition-all ${currentTheme.pill}`}

                              style={{

                                backgroundColor: active ? activeCategory.softBg : undefined,

                                borderColor: active ? activeCategory.color : undefined,

                              }}

                            >

                              <StyleIcon

                                className="w-5 h-5"

                                style={{

                                  color: active ? activeCategory.color : undefined,

                                }}

                              />

                            </motion.button>

                          );

                        })}

                      </div>

                    </div>



                    <div className="flex flex-col gap-2">

                      <div className="flex items-center justify-between">

                        <span className="text-xs font-bold opacity-85">

                          背景テーマ

                        </span>

                        <span className="font-mono text-[11px] opacity-70">

                          {isDemoUnlocked

                            ? THEMES.length

                            : THEMES.filter((t) => levelInfo.level >= t.unlockLevel).length}{' '}

                          / {THEMES.length}

                        </span>

                      </div>

                      <div className="grid grid-cols-3 gap-2">

                        {THEMES.map((theme) => {

                          const unlocked =

                            isDemoUnlocked || levelInfo.level >= theme.unlockLevel;

                          const selected = themeId === theme.id;



                          return (

                            <motion.button

                              key={theme.id}

                              type="button"

                              whileHover={unlocked ? { scale: 1.03 } : {}}

                              whileTap={unlocked ? { scale: 0.94 } : {}}

                              onClick={() => {

                                if (unlocked) setThemeId(theme.id);

                              }}

                              className={`relative h-16 rounded-2xl border-2 flex flex-col items-center justify-between p-1.5 overflow-hidden transition-all ${

                                selected

                                  ? 'scale-[1.02] shadow-lg ring-2 ring-offset-1 ring-amber-400/70 border-amber-400'

                                  : theme.isLight

                                    ? 'border-slate-300 opacity-95'

                                    : 'border-white/20 opacity-90'

                              }`}

                              style={{ background: theme.preview }}

                            >

                              <ThemeSceneryBackdrop scenery={theme.scenery} isRunning={false} />

                              {!unlocked ? (

                                <div className="relative z-10 inset-0 bg-black/60 backdrop-blur-[2px] w-full h-full flex flex-col items-center justify-center gap-0.5 text-white rounded-xl">

                                  <Lock className="w-3.5 h-3.5" />

                                  <span className="font-mono text-[10px] font-bold">

                                    Lv.{theme.unlockLevel}

                                  </span>

                                  <span className="text-[9px] font-bold opacity-80 truncate max-w-full px-1">

                                    {theme.name}

                                  </span>

                                </div>

                              ) : (

                                <>

                                  <div className="relative z-10 w-full flex items-center justify-between px-0.5">

                                    <span

                                      className={`font-mono text-[9px] font-bold px-1.5 py-0.2 rounded-md ${

                                        theme.isLight

                                          ? 'bg-white/70 text-slate-700'

                                          : 'bg-black/40 text-white/90'

                                      }`}

                                    >

                                      Lv.{theme.unlockLevel}

                                    </span>

                                    {selected && (

                                      <div

                                        className="w-4 h-4 rounded-full flex items-center justify-center shadow"

                                        style={{

                                          backgroundColor: activeCategory.color,

                                          color: '#FFFFFF',

                                        }}

                                      >

                                        <Check className="w-2.5 h-2.5 stroke-[3]" />

                                      </div>

                                    )}

                                  </div>

                                  <span

                                    className={`relative z-10 text-[10px] font-bold tracking-tight truncate w-full text-center px-1 py-0.5 rounded-lg backdrop-blur-[2px] ${

                                      theme.isLight

                                        ? 'bg-white/65 text-slate-800'

                                        : 'bg-black/40 text-white'

                                    }`}

                                  >

                                    {theme.name}

                                  </span>

                                </>

                              )}

                            </motion.button>

                          );

                        })}

                      </div>

                    </div>



                    {/* Standard Alarm Sound Selector & Volume / Duration Adjustment */}

                    <div className="flex flex-col gap-2.5">

                      <div className="flex items-center justify-between">

                        <span className="text-xs font-bold opacity-85">

                          アラーム音

                        </span>

                        {isAlarmRinging && (

                          <button

                            type="button"

                            onClick={() => stopStandardAlarm(() => setIsAlarmRinging(false))}

                            className="px-2.5 py-0.5 rounded-lg bg-amber-500 text-slate-950 text-[10px] font-bold shadow-sm"

                          >

                            停止

                          </button>

                        )}

                      </div>



                      {/* In-App Alarm Volume & Ring Settings Card */}

                      <div className={`p-3 rounded-2xl border flex flex-col gap-2.5 ${currentTheme.pill}`}>

                        {/* Volume Header & Percentage */}

                        <div className="flex items-center justify-between">

                          <div className="flex items-center gap-1.5">

                            <button

                              type="button"

                              onClick={() => {

                                if (alarmVolume > 0) {

                                  setAlarmVolume(0);

                                } else {

                                  setAlarmVolume(prevUnmutedVolume || 80);

                                }

                              }}

                              className="p-1 rounded-lg hover:bg-current/10 transition-colors"

                              title={alarmVolume === 0 ? 'ミュート解除' : 'ミュート'}

                            >

                              {alarmVolume === 0 ? (

                                <VolumeX className="w-4 h-4 text-rose-400" />

                              ) : alarmVolume < 50 ? (

                                <Volume1 className="w-4 h-4" style={{ color: activeCategory.color }} />

                              ) : (

                                <Volume2 className="w-4 h-4" style={{ color: activeCategory.color }} />

                              )}

                            </button>

                            <span className="text-xs font-bold">アラーム音量</span>

                          </div>

                          <span

                            className="font-mono text-xs font-bold px-2 py-0.5 rounded-lg border border-current/15 bg-current/5"

                            style={{ color: alarmVolume === 0 ? undefined : activeCategory.color }}

                          >

                            {alarmVolume === 0 ? '消音 0%' : `${alarmVolume}%`}

                          </span>

                        </div>



                        {/* Minus / Slider / Plus Controls */}

                        <div className="flex items-center gap-2">

                          <button

                            type="button"

                            onClick={() => {

                              setAlarmVolume((v) => {

                                const next = Math.max(0, v - 5);

                                setLiveAlarmVolume(next, alarmSoundId);

                                return next;

                              });

                            }}

                            className="w-7 h-7 rounded-xl border border-current/15 bg-current/5 hover:bg-current/10 flex items-center justify-center shrink-0 active:scale-95 transition-transform"

                          >

                            <Minus className="w-3.5 h-3.5" />

                          </button>

                          <input

                            type="range"

                            min={0}

                            max={100}

                            step={1}

                            value={alarmVolume}

                            onChange={(e) => {

                              const nextVal = Number(e.target.value);

                              setAlarmVolume(nextVal);

                              setLiveAlarmVolume(nextVal, alarmSoundId);

                            }}

                            className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-current/20"

                            style={{ accentColor: activeCategory.color }}

                          />

                          <button

                            type="button"

                            onClick={() => {

                              setAlarmVolume((v) => {

                                const next = Math.min(100, v + 5);

                                setLiveAlarmVolume(next, alarmSoundId);

                                return next;

                              });

                            }}

                            className="w-7 h-7 rounded-xl border border-current/15 bg-current/5 hover:bg-current/10 flex items-center justify-center shrink-0 active:scale-95 transition-transform"

                          >

                            <Plus className="w-3.5 h-3.5" />

                          </button>

                        </div>



                        {/* Quick Volume Presets */}

                        <div className="grid grid-cols-5 gap-1.5">

                          {[0, 25, 50, 75, 100].map((preset) => {

                            const isSelectedPreset = alarmVolume === preset;

                            return (

                              <button

                                key={preset}

                                type="button"

                                onClick={() => {

                                  setAlarmVolume(preset);

                                  setLiveAlarmVolume(preset, alarmSoundId);

                                }}

                                className="py-1 rounded-xl border text-[10px] font-mono font-bold transition-all"

                                style={{

                                  backgroundColor: isSelectedPreset ? activeCategory.softBg : undefined,

                                  borderColor: isSelectedPreset ? activeCategory.color : 'rgba(148,163,184,0.25)',

                                  color: isSelectedPreset ? activeCategory.color : undefined,

                                }}

                              >

                                {preset === 0 ? '消音' : `${preset}%`}

                              </button>

                            );

                          })}

                        </div>



                        {/* Alarm Ring Duration & Vibration Controls */}

                        <div className="pt-1.5 border-t border-current/10 flex items-center justify-between gap-2">

                          <div className="flex items-center gap-1.5">

                            <span className="text-[11px] font-bold opacity-80">アラーム・振動時間</span>

                            <div className="flex items-center gap-1">

                              {[3, 6, 10, 15].map((sec) => {

                                const activeSec = alarmDurationSec === sec;

                                return (

                                  <button

                                    key={sec}

                                    type="button"

                                    onClick={() => setAlarmDurationSec(sec)}

                                    className="px-2 py-0.5 rounded-lg border text-[10px] font-mono font-bold transition-all"

                                    style={{

                                      backgroundColor: activeSec ? activeCategory.softBg : undefined,

                                      borderColor: activeSec ? activeCategory.color : 'rgba(148,163,184,0.25)',

                                      color: activeSec ? activeCategory.color : undefined,

                                    }}

                                  >

                                    {sec}秒

                                  </button>

                                );

                              })}

                            </div>

                          </div>



                          <div className="flex items-center gap-1.5 shrink-0">

                            {/* マナーモード切り替えボタン */}

                            <button

                              type="button"

                              onClick={() => setAlarmMannerModePolicy((p) => (p === 'bypass' ? 'respect' : 'bypass'))}

                              className="px-2 py-0.5 rounded-lg border text-[10px] font-bold transition-all flex items-center gap-1"

                              style={{

                                backgroundColor: alarmMannerModePolicy === 'bypass' ? activeCategory.softBg : undefined,

                                borderColor: alarmMannerModePolicy === 'bypass' ? activeCategory.color : 'rgba(148,163,184,0.25)',

                                color: alarmMannerModePolicy === 'bypass' ? activeCategory.color : undefined,

                              }}

                              title={

                                alarmMannerModePolicy === 'bypass'

                                  ? 'マナーモードでもアラーム音を再生します'

                                  : 'マナーモード時は消音（振動のみ）にします'

                              }

                            >

                              <span>マナー時:</span>

                              <span className="font-extrabold">{alarmMannerModePolicy === 'bypass' ? '音ON' : '消音'}</span>

                            </button>



                            {/* 振動切り替えボタン */}

                            <button

                              type="button"

                              onClick={() => setAlarmVibration((v) => !v)}

                              className="px-2.5 py-0.5 rounded-lg border text-[10px] font-bold transition-all"

                              style={{

                                backgroundColor: alarmVibration ? activeCategory.softBg : undefined,

                                borderColor: alarmVibration ? activeCategory.color : 'rgba(148,163,184,0.25)',

                                color: alarmVibration ? activeCategory.color : undefined,

                              }}

                            >

                              振動 {alarmVibration ? 'ON' : 'OFF'}

                            </button>

                          </div>

                        </div>



                        {/* マナーモード説明キャプション */}

                        <div className="text-[10px] opacity-65 leading-tight px-1 flex items-center justify-between">

                          <span>マナーモード設定:</span>

                          <span className="font-semibold text-right">

                            {alarmMannerModePolicy === 'bypass'

                              ? 'マナーモードでもアラーム音を鳴らす（貫通）'

                              : 'マナーモード時は消音（バイブのみ）'}

                          </span>

                        </div>

                      </div>



                      <div className="flex flex-col gap-1.5">

                        {ALARM_SOUNDS.map((snd) => {

                          const selected = alarmSoundId === snd.id;

                          return (

                            <div

                              key={snd.id}

                              onClick={() => setAlarmSoundId(snd.id)}

                              className={`p-2.5 rounded-2xl border flex items-center justify-between gap-2 cursor-pointer transition-all ${currentTheme.pill}`}

                              style={{

                                backgroundColor: selected ? activeCategory.softBg : undefined,

                                borderColor: selected ? activeCategory.color : undefined,

                              }}

                            >

                              <div className="flex items-center gap-2 min-w-0">

                                <BellRing

                                  className="w-4 h-4 shrink-0"

                                  style={{

                                    color: selected ? activeCategory.color : undefined,

                                  }}

                                />

                                <span className="text-xs font-bold truncate">

                                  {snd.label}

                                </span>

                              </div>

                              <button

                                type="button"

                                onClick={(e) => {

                                  e.stopPropagation();

                                  setAlarmSoundId(snd.id);

                                  unlockAudioForMannerMode(snd.id);

                                  setIsAlarmRinging(true);

                                  triggerAlarmAndVibration(

                                    snd.id,

                                    () => setIsAlarmRinging(false),

                                    alarmDurationSec * 1000,

                                    alarmVolume,

                                    alarmVibration,

                                    alarmMannerModePolicy

                                  );

                                }}

                                className="px-2.5 py-1 rounded-xl border border-current/20 bg-current/5 hover:bg-current/10 text-[10px] font-bold flex items-center gap-1 shrink-0"

                              >

                                <Volume2 className="w-3.5 h-3.5" />

                                <span>試聴 {alarmDurationSec}秒</span>

                              </button>

                            </div>

                          );

                        })}

                      </div>

                    </div>



                    {/* Ambient Focus BGM Section (Unified with Alarm Sound UI) */}

                    <div className="flex flex-col gap-2">

                      <div className="flex items-center justify-between">

                        <div className="flex items-center gap-1.5">

                          <Music className="w-4 h-4" style={{ color: activeCategory.color }} />

                          <span className="text-xs font-bold">集中アンビエントBGM</span>

                        </div>

                        <span

                          className="font-mono text-xs font-bold px-2 py-0.5 rounded-lg border border-current/15 bg-current/5"

                          style={{ color: bgmVolume === 0 ? undefined : activeCategory.color }}

                        >

                          {bgmVolume === 0 ? '消音 0%' : `${bgmVolume}%`}

                        </span>

                      </div>



                      {/* Minus / Slider / Plus Controls */}

                      <div className="flex items-center gap-2">

                        <button

                          type="button"

                          onClick={() => {

                            setBgmVolume((v) => {

                              const next = Math.max(0, v - 5);

                              if (isRunning || previewingBgmId) {

                                playAmbientBgm(previewingBgmId || selectedBgmId, next);

                              }

                              return next;

                            });

                          }}

                          className="w-7 h-7 rounded-xl border border-current/15 bg-current/5 hover:bg-current/10 flex items-center justify-center shrink-0 active:scale-95 transition-transform"

                        >

                          <Minus className="w-3.5 h-3.5" />

                        </button>

                        <input

                          type="range"

                          min={0}

                          max={100}

                          step={1}

                          value={bgmVolume}

                          onChange={(e) => {

                            const nextVal = Number(e.target.value);

                            setBgmVolume(nextVal);

                            if (isRunning || previewingBgmId) {

                              playAmbientBgm(previewingBgmId || selectedBgmId, nextVal);

                            }

                          }}

                          className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-current/20"

                          style={{ accentColor: activeCategory.color }}

                        />

                        <button

                          type="button"

                          onClick={() => {

                            setBgmVolume((v) => {

                              const next = Math.min(100, v + 5);

                              if (isRunning || previewingBgmId) {

                                playAmbientBgm(previewingBgmId || selectedBgmId, next);

                              }

                              return next;

                            });

                          }}

                          className="w-7 h-7 rounded-xl border border-current/15 bg-current/5 hover:bg-current/10 flex items-center justify-center shrink-0 active:scale-95 transition-transform"

                        >

                          <Plus className="w-3.5 h-3.5" />

                        </button>

                      </div>



                      {/* Quick Volume Presets */}

                      <div className="grid grid-cols-5 gap-1.5">

                        {[0, 25, 50, 75, 100].map((preset) => {

                          const isSelectedPreset = bgmVolume === preset;

                          return (

                            <button

                              key={preset}

                              type="button"

                              onClick={() => {

                                setBgmVolume(preset);

                                if (isRunning || previewingBgmId) {

                                  playAmbientBgm(previewingBgmId || selectedBgmId, preset);

                                }

                              }}

                              className="py-1 rounded-xl border text-[10px] font-mono font-bold transition-all"

                              style={{

                                backgroundColor: isSelectedPreset ? activeCategory.softBg : undefined,

                                borderColor: isSelectedPreset ? activeCategory.color : 'rgba(148,163,184,0.25)',

                                color: isSelectedPreset ? activeCategory.color : undefined,

                              }}

                            >

                              {preset === 0 ? '消音' : `${preset}%`}

                            </button>

                          );

                        })}

                      </div>



                      {/* BGMトラック一覧（アラーム音UIと完全同一スタイル・注釈なし） */}

                      <div className="flex flex-col gap-1.5 mt-1">

                        {AMBIENT_BGM_TRACKS.map((track) => {

                          const isSelected = selectedBgmId === track.id;

                          const isPreviewing = previewingBgmId === track.id;



                          return (

                            <div

                              key={track.id}

                              onClick={() => {

                                setSelectedBgmId(track.id);

                                if (previewingBgmId) {

                                  stopAmbientBgm();

                                  setPreviewingBgmId(null);

                                }

                              }}

                              className={`p-2.5 rounded-2xl border flex items-center justify-between gap-2 cursor-pointer transition-all ${currentTheme.pill}`}

                              style={{

                                backgroundColor: isSelected ? activeCategory.softBg : undefined,

                                borderColor: isSelected ? activeCategory.color : undefined,

                              }}

                            >

                              <div className="flex items-center gap-2 min-w-0">

                                <Music

                                  className="w-4 h-4 shrink-0"

                                  style={{

                                    color: isSelected ? activeCategory.color : undefined,

                                  }}

                                />

                                <span className="text-xs font-bold truncate">

                                  {track.label}

                                </span>

                              </div>



                              {track.src ? (

                                <button

                                  type="button"

                                  onClick={(e) => {

                                    e.stopPropagation();

                                    if (isPreviewing) {

                                      stopAmbientBgm();

                                      setPreviewingBgmId(null);

                                    } else {

                                      stopAmbientBgm();

                                      setPreviewingBgmId(track.id);

                                      playAmbientBgm(track.id, bgmVolume);

                                    }

                                  }}

                                  className="px-2.5 py-1 rounded-xl border border-current/20 bg-current/5 hover:bg-current/10 text-[10px] font-bold flex items-center gap-1 shrink-0"

                                  style={{

                                    color: isPreviewing ? activeCategory.color : undefined,

                                  }}

                                >

                                  <Volume2 className="w-3.5 h-3.5" />

                                  <span>{isPreviewing ? '停止' : '試聴'}</span>

                                </button>

                              ) : null}

                            </div>

                          );

                        })}

                      </div>

                    </div>



                    {/* Feature & Display Settings: Ranking Visibility & Bot Notice */}

                    <div className="flex flex-col gap-2">

                      <span className="text-xs font-bold opacity-85">

                        機能と表示

                      </span>

                      <div className={`p-3 rounded-2xl border flex flex-col gap-2.5 ${currentTheme.pill}`}>

                        <div className="flex items-center justify-between">

                          <div className="flex items-center gap-2">

                            <Trophy className="w-4 h-4 text-amber-400 shrink-0" />

                            <div className="flex flex-col">

                              <span className="text-xs font-bold leading-tight">全ユーザーランキング</span>

                              <span className="text-[10px] opacity-70">

                                {showRankingFeature ? 'ヘッダーに順位を表示中' : '完全に非表示（個人専用）'}

                              </span>

                            </div>

                          </div>

                          <button

                            type="button"

                            onClick={() => setShowRankingFeature((prev) => !prev)}

                            className="px-3 py-1 rounded-xl border text-[11px] font-bold transition-all shadow-sm"

                            style={{

                              backgroundColor: showRankingFeature ? activeCategory.softBg : undefined,

                              borderColor: showRankingFeature ? activeCategory.color : 'rgba(148,163,184,0.25)',

                              color: showRankingFeature ? activeCategory.color : undefined,

                            }}

                          >

                            {showRankingFeature ? 'ON (表示)' : 'OFF (非表示)'}

                          </button>

                        </div>

                        <p className="text-[10px] opacity-70 leading-relaxed">

                          {showRankingFeature

                            ? 'OFFにすると、ヘッダーのトロフィーや順位を隠して、誰とも競わず自分一人だけの集中タイマーとして静かに使えます。'

                            : 'ランキングは非表示になっています。自分のペースでタスクの習慣化に専念できます。'}

                        </p>

                        <div className="pt-2 border-t border-current/10 flex items-center gap-1.5 text-[9.5px] opacity-75">

                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />

                          <span>本アプリに架空のボット（CPU対戦相手）は一切存在しません。</span>

                        </div>

                      </div>

                    </div>

                  </div>

                )}

              {/* Admin Dashboard Access: Only visible on authorized PC */}

              {isAdminDevice && (

                <div className="pt-2.5 border-t border-current/10 shrink-0">

                  <button

                    type="button"

                    onClick={() => {

                      setShowSettingsModal(false);

                      setShowAdminModal(true);

                    }}

                    className={`w-full py-2.5 px-3 rounded-2xl border text-xs font-bold flex items-center justify-between transition-all hover:bg-current/10 shadow-sm ${currentTheme.pill}`}

                  >

                    <div className="flex items-center gap-2">

                      <ShieldCheck className="w-4 h-4 text-amber-400" />

                      <span>管理者ダッシュボード（このPC専用）</span>

                    </div>

                    <span className="text-[10px] opacity-75 font-mono text-amber-400">開く →</span>

                  </button>

                </div>

              )}

              </div>

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>





      {/* MODAL 3: ACTIVITY HISTORY & ANALYTICS DASHBOARD */}

      <AnimatePresence>

        {showHistoryModal && (

          <motion.div

            initial={{ opacity: 0 }}

            animate={{ opacity: 1 }}

            exit={{ opacity: 0, pointerEvents: 'none' }}

            onClick={() => setShowHistoryModal(false)}

            className={`absolute inset-0 z-50 ${currentTheme.backdrop} backdrop-blur-md flex items-center justify-center p-4`}

          >

            <motion.div

              initial={{ scale: 0.9, y: 20, opacity: 0 }}

              animate={{ scale: 1, y: 0, opacity: 1 }}

              exit={{ scale: 0.9, y: 20, opacity: 0 }}

              onClick={(e) => e.stopPropagation()}

              className={`w-full max-w-sm p-5 rounded-[2rem] backdrop-blur-2xl border flex flex-col gap-3.5 max-h-[86%] overflow-hidden ${currentTheme.modalCard} ${currentTheme.text}`}

            >

              <div className="flex items-center justify-between shrink-0">

                <div className="flex items-center gap-2">

                  <BarChart3 className="w-5 h-5" style={{ color: activeCategory.color }} />

                  <h2 className="text-sm font-bold">過去のデータ</h2>

                </div>

                <button

                  onClick={() => setShowHistoryModal(false)}

                  className="p-1 rounded-full hover:bg-current/10"

                >

                  <X className="w-4 h-4" />

                </button>

              </div>



              <div className="flex-1 overflow-y-auto no-scrollbar flex flex-col gap-4 pr-0.5">

                {/* 3 KPI Summary Cards */}

                <div className="grid grid-cols-3 gap-2 shrink-0">

                  <div className={`p-2.5 rounded-2xl border flex flex-col items-center ${currentTheme.pill}`}>

                    <Clock className="w-3.5 h-3.5 opacity-60 mb-0.5" />

                    <span className="text-xs font-bold font-mono">

                      {formatTotalMinutesReadable(stats.totalMinutes)}

                    </span>

                    <span className="text-[9px] opacity-60">累計集中時間</span>

                  </div>



                  <motion.button

                    type="button"

                    whileTap={{ scale: 0.95 }}

                    onClick={() => setShowCompletedHistory((prev) => !prev)}

                    className={`p-2.5 rounded-2xl border flex flex-col items-center cursor-pointer transition-all ${currentTheme.pill}`}

                    style={{

                      backgroundColor: showCompletedHistory ? activeCategory.softBg : undefined,

                      borderColor: showCompletedHistory ? activeCategory.color : undefined,

                    }}

                  >

                    <CheckCircle2

                      className="w-3.5 h-3.5 mb-0.5"

                      style={{

                        color: showCompletedHistory ? activeCategory.color : undefined,

                        opacity: showCompletedHistory ? 1 : 0.65,

                      }}

                    />

                    <span className="text-xs font-bold font-mono">{stats.totalCount}回</span>

                    <span className="text-[9px] opacity-75 flex items-center gap-0.5 font-semibold">

                      <span>完了タスク</span>

                      {showCompletedHistory ? (

                        <ChevronUp className="w-2.5 h-2.5" />

                      ) : (

                        <ChevronDown className="w-2.5 h-2.5" />

                      )}

                    </span>

                  </motion.button>



                  <div className={`p-2.5 rounded-2xl border flex flex-col items-center ${currentTheme.pill}`}>

                    <Flame className="w-3.5 h-3.5 text-orange-400 mb-0.5" />

                    <span className="text-xs font-bold font-mono">

                      {Math.max(streak, maxStreak)}日

                    </span>

                    <span className="text-[9px] opacity-60">最高連続記録</span>

                  </div>

                </div>



                {/* Activity Logs List (Shown when clicking 完了タスク) */}

                <AnimatePresence initial={false}>

                  {showCompletedHistory && (

                    <motion.div

                      initial={{ opacity: 0, height: 0 }}

                      animate={{ opacity: 1, height: 'auto' }}

                      exit={{ opacity: 0, height: 0 }}

                      transition={{ duration: 0.22 }}

                      className="overflow-hidden shrink-0"

                    >

                      <div className={`p-3 rounded-2xl border flex flex-col gap-2 ${currentTheme.pill}`}>

                        <div className="flex items-center justify-between">

                          <span className="text-[11px] font-bold opacity-85">

                            完了したタスクの履歴

                          </span>

                          <button

                            type="button"

                            onClick={() => setShowCompletedHistory(false)}

                            className="p-0.5 rounded-full hover:bg-current/10 opacity-70"

                          >

                            <X className="w-3.5 h-3.5" />

                          </button>

                        </div>

                        <div className="flex flex-col gap-1.5 max-h-48 overflow-y-auto no-scrollbar">

                          {stats.validLogs.length === 0 ? (

                            <div className="py-4 text-center text-[11px] opacity-50">

                              まだ完了した履歴がありません。タイマーを最後まで動かして記録を残しましょう！

                            </div>

                          ) : (

                            stats.validLogs.map((log) => {

                              const cat =

                                themedCategories.find((c) => c.id === log.categoryId) ||

                                themedCategories[0];

                              const IconComp = cat.icon;

                              const dateObj = new Date(log.completedAt);

                              const timeStr = `${String(dateObj.getMonth() + 1).padStart(2, '0')}/${String(

                                dateObj.getDate()

                              ).padStart(2, '0')} ${String(dateObj.getHours()).padStart(2, '0')}:${String(

                                dateObj.getMinutes()

                              ).padStart(2, '0')}`;



                              return (

                                <div

                                  key={log.id}

                                  className={`p-2 rounded-xl border flex items-center justify-between gap-2 ${currentTheme.pill}`}

                                >

                                  <div className="flex items-center gap-2 min-w-0">

                                    <div

                                      className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"

                                      style={{ backgroundColor: cat.softBg }}

                                    >

                                      <IconComp className="w-3.5 h-3.5" style={{ color: cat.color }} />

                                    </div>

                                    <div className="flex flex-col min-w-0">

                                      <span className="text-xs font-bold truncate">

                                        {log.taskTitle}

                                      </span>

                                      <span className="text-[10px] opacity-60 font-mono">

                                        {timeStr}

                                      </span>

                                    </div>

                                  </div>

                                  <span

                                    className="shrink-0 px-2 py-0.5 rounded-lg font-mono text-[11px] font-bold"

                                    style={{

                                      backgroundColor: cat.softBg,

                                      color: cat.color,

                                    }}

                                  >

                                    +{formatDurationBadge(log.durationMinutes)}

                                  </span>

                                </div>

                              );

                            })

                          )}

                        </div>

                      </div>

                    </motion.div>

                  )}

                </AnimatePresence>



                {/* Trend Line Chart (週・月・年・全体の推移折れ線グラフ) */}

                {(() => {

                  const series = stats.chartSeries;

                  const values = series.map((d) =>

                    chartMetric === 'minutes' ? d.minutes : d.count

                  );

                  const rawMax = Math.max(...values, 0);

                  const maxVal =

                    chartMetric === 'minutes'

                      ? Math.max(30, Math.ceil(rawMax / 15) * 15)

                      : Math.max(4, Math.ceil(rawMax / 2) * 2);

                  const midVal = Math.round(maxVal / 2);

                  const unit = chartMetric === 'minutes' ? '分' : '回';



                  const svgW = 310;

                  const svgH = 148;

                  const padL = 36;

                  const padR = 14;

                  const padT = 22;

                  const padB = 28;

                  const plotW = svgW - padL - padR;

                  const plotH = svgH - padT - padB;



                  const points = series.map((d, idx) => {

                    const val = chartMetric === 'minutes' ? d.minutes : d.count;

                    const x =

                      series.length > 1

                        ? padL + (idx / (series.length - 1)) * plotW

                        : padL + plotW / 2;

                    const y = padT + plotH - (val / maxVal) * plotH;

                    return { ...d, val, x, y };

                  });



                  const linePath = points

                    .map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)

                    .join(' ');



                  const areaPath =

                    points.length > 0

                      ? `${linePath} L ${points[points.length - 1].x.toFixed(1)} ${(

                          padT + plotH

                        ).toFixed(1)} L ${points[0].x.toFixed(1)} ${(padT + plotH).toFixed(1)} Z`

                      : '';



                  const activePoint =

                    points.find((p) => p.key === selectedChartKey) ||

                    points[points.length - 1];



                  const labelStep = Math.max(1, Math.ceil(points.length / 6));



                  return (

                    <div

                      className={`p-3 rounded-2xl border flex flex-col gap-2.5 shrink-0 ${currentTheme.pill}`}

                    >

                      <div className="flex items-center justify-between gap-1">

                        <span className="text-[11px] font-bold opacity-85">

                          推移グラフ

                        </span>



                        {/* Metric Switch */}

                        <div className={`flex items-center rounded-lg ${currentTheme.subPanel} p-0.5 text-[10px]`}>

                          <button

                            type="button"

                            onClick={() => setChartMetric('minutes')}

                            className={`px-2 py-0.5 rounded-md font-bold transition-all ${

                              chartMetric === 'minutes'

                                ? `${currentTheme.activeTab} opacity-100`

                                : 'opacity-55 hover:opacity-80'

                            }`}

                          >

                            時間

                          </button>

                          <button

                            type="button"

                            onClick={() => setChartMetric('count')}

                            className={`px-2 py-0.5 rounded-md font-bold transition-all ${

                              chartMetric === 'count'

                                ? `${currentTheme.activeTab} opacity-100`

                                : 'opacity-55 hover:opacity-80'

                            }`}

                          >

                            完了数

                          </button>

                        </div>

                      </div>



                      {/* 4-Period Switch: 週 / 月 / 年 / 全体 */}

                      <div className={`grid grid-cols-4 gap-1 rounded-xl ${currentTheme.subPanel} p-1 text-[10px]`}>

                        {[

                          { id: 'week', label: '週' },

                          { id: 'month', label: '月' },

                          { id: 'year', label: '年' },

                          { id: 'all', label: '全体' },

                        ].map((tab) => {

                          const active = chartPeriod === tab.id;

                          return (

                            <button

                              key={tab.id}

                              type="button"

                              onClick={() => {

                                setChartPeriod(tab.id);

                                setSelectedChartKey(null);

                              }}

                              className={`py-1 rounded-lg font-bold transition-all ${

                                active

                                  ? `${currentTheme.activeTab} opacity-100`

                                  : 'opacity-55 hover:opacity-80'

                              }`}

                              style={{

                                color: active ? activeCategory.color : undefined,

                              }}

                            >

                              {tab.label}

                            </button>

                          );

                        })}

                      </div>



                      {/* SVG Line Chart */}

                      <div className="w-full overflow-hidden">

                        <svg

                          viewBox={`0 0 ${svgW} ${svgH}`}

                          className="w-full h-36 overflow-visible select-none"

                        >

                          <defs>

                            <linearGradient id="historyLineAreaGrad" x1="0" y1="0" x2="0" y2="1">

                              <stop

                                offset="0%"

                                stopColor={activeCategory.color}

                                stopOpacity={currentTheme.isLight ? '0.26' : '0.42'}

                              />

                              <stop

                                offset="100%"

                                stopColor={activeCategory.color}

                                stopOpacity="0.0"

                              />

                            </linearGradient>

                          </defs>



                          {/* Horizontal Grid Lines & Y-axis Labels */}

                          {[

                            { val: maxVal, y: padT },

                            { val: midVal, y: padT + plotH / 2 },

                            { val: 0, y: padT + plotH },

                          ].map((grid, gIdx) => (

                            <g key={gIdx}>

                              <line

                                x1={padL}

                                y1={grid.y}

                                x2={svgW - padR}

                                y2={grid.y}

                                stroke="currentColor"

                                strokeOpacity={grid.val === 0 ? 0.25 : 0.12}

                                strokeDasharray={grid.val === 0 ? undefined : '3 3'}

                                strokeWidth="1"

                              />

                              <text

                                x={padL - 6}

                                y={grid.y + 3}

                                textAnchor="end"

                                fill="currentColor"

                                fillOpacity="0.55"

                                fontSize="8.5"

                                fontFamily="monospace"

                              >

                                {grid.val}

                                {unit}

                              </text>

                            </g>

                          ))}



                          {/* Area Under the Line */}

                          {areaPath && <path d={areaPath} fill="url(#historyLineAreaGrad)" />}



                          {/* Main Line Path */}

                          {linePath && (

                            <motion.path

                              key={`${chartPeriod}-${chartMetric}`}

                              initial={{ pathLength: 0, opacity: 0.4 }}

                              animate={{ pathLength: 1, opacity: 1 }}

                              transition={{ duration: 0.55, ease: 'easeOut' }}

                              d={linePath}

                              fill="none"

                              stroke={activeCategory.color}

                              strokeWidth="2.5"

                              strokeLinecap="round"

                              strokeLinejoin="round"

                            />

                          )}



                          {/* Data Points, Value Badges & X-axis Labels */}

                          {points.map((pt, idx) => {

                            const isSelected = activePoint?.key === pt.key;

                            const showXLabel =

                              points.length <= 7 ||

                              pt.isCurrent ||

                              idx === 0 ||

                              (points.length - 1 - idx) % labelStep === 0 &&

                                points.length - 1 - idx >= Math.floor(labelStep / 2);

                            const showValueLabel =

                              pt.val > 0 && (points.length <= 7 || isSelected || pt.isCurrent);



                            return (

                              <g

                                key={pt.key}

                                className="cursor-pointer"

                                onClick={() => setSelectedChartKey(pt.key)}

                              >

                                {/* Vertical highlight guide when selected */}

                                {isSelected && (

                                  <line

                                    x1={pt.x}

                                    y1={padT}

                                    x2={pt.x}

                                    y2={padT + plotH}

                                    stroke={activeCategory.color}

                                    strokeOpacity="0.35"

                                    strokeDasharray="2 2"

                                    strokeWidth="1"

                                  />

                                )}



                                {/* Invisible larger hit target for easy finger tap */}

                                <circle

                                  cx={pt.x}

                                  cy={pt.y}

                                  r={points.length > 15 ? 6 : 11}

                                  fill="transparent"

                                />



                                {/* Outer halo on selected or non-zero point */}

                                {(isSelected || pt.val > 0) && (

                                  <circle

                                    cx={pt.x}

                                    cy={pt.y}

                                    r={isSelected ? 5.5 : points.length > 15 ? 3 : 4}

                                    fill={activeCategory.color}

                                    fillOpacity={isSelected ? 0.32 : 0.18}

                                  />

                                )}



                                {/* Main Point Dot */}

                                <circle

                                  cx={pt.x}

                                  cy={pt.y}

                                  r={isSelected ? 3.8 : points.length > 15 ? 2.2 : 3}

                                  fill={pt.val > 0 ? activeCategory.color : '#94A3B8'}

                                  stroke={currentTheme.chartDotStroke}

                                  strokeWidth="1.2"

                                />



                                {/* Value Label Above Point */}

                                {showValueLabel && (

                                  <text

                                    x={pt.x}

                                    y={Math.max(11, pt.y - 7)}

                                    textAnchor="middle"

                                    fill={activeCategory.color}

                                    fontSize="8.5"

                                    fontWeight="bold"

                                    fontFamily="monospace"

                                  >

                                    {pt.val}

                                  </text>

                                )}



                                {/* X-Axis Label */}

                                {showXLabel && (

                                  <text

                                    x={pt.x}

                                    y={svgH - 12}

                                    textAnchor="middle"

                                    fill="currentColor"

                                    fillOpacity={pt.isCurrent || isSelected ? 0.95 : 0.55}

                                    fontWeight={pt.isCurrent || isSelected ? 'bold' : 'normal'}

                                    fontSize="8"

                                    fontFamily="monospace"

                                  >

                                    {pt.shortLabel}

                                  </text>

                                )}



                                {/* X-Axis Weekday Sub-label (Week view) */}

                                {pt.subLabel && (

                                  <text

                                    x={pt.x}

                                    y={svgH - 2}

                                    textAnchor="middle"

                                    fill="currentColor"

                                    fillOpacity={pt.isCurrent || isSelected ? 0.8 : 0.4}

                                    fontSize="7.5"

                                  >

                                    {pt.subLabel}

                                  </text>

                                )}

                              </g>

                            );

                          })}

                        </svg>

                      </div>



                      {/* Selected Point Detail Pill */}

                      {activePoint && (

                        <div className={`px-2.5 py-1.5 rounded-xl ${currentTheme.subPanel} flex items-center justify-between text-[10px]`}>

                          <span className="opacity-75 font-medium">

                            📅 {activePoint.detailLabel} の記録

                          </span>

                          <span

                            className="font-mono font-bold"

                            style={{ color: activeCategory.color }}

                          >

                            {formatTotalMinutesReadable(activePoint.minutes)} / {activePoint.count}回完了

                          </span>

                        </div>

                      )}

                    </div>

                  );

                })()}



                {/* Task-based Cumulative Time (タスク別の累計時間) */}

                <div className="flex flex-col gap-1.5 shrink-0">

                  <span className="text-[11px] font-bold opacity-75">タスク別の累計時間</span>

                  {stats.byTask.length === 0 ? (

                    <div className="py-3 text-center text-[11px] opacity-50">

                      登録されているタスクがありません

                    </div>

                  ) : (

                    <div className="grid grid-cols-2 gap-1.5">

                      {stats.byTask.map((taskStat) => {

                        const IconComp = taskStat.icon;

                        const pct =

                          stats.totalMinutes > 0

                            ? Math.round((taskStat.minutes / stats.totalMinutes) * 100)

                            : 0;

                        return (

                          <div

                            key={taskStat.id}

                            className={`p-2 rounded-xl border flex flex-col gap-1.5 ${currentTheme.pill}`}

                          >

                            <div className="flex items-center justify-between text-[11px]">

                              <div className="flex items-center gap-1.5 truncate">

                                <div

                                  className="w-5 h-5 rounded-lg flex items-center justify-center shrink-0"

                                  style={{ backgroundColor: taskStat.softBg }}

                                >

                                  <IconComp

                                    className="w-3 h-3 shrink-0"

                                    style={{ color: taskStat.color }}

                                  />

                                </div>

                                <span className="truncate font-bold">{taskStat.title}</span>

                              </div>

                              <span className="font-mono text-[10px] opacity-80 shrink-0 ml-1">

                                {formatDurationBadge(taskStat.minutes)}

                              </span>

                            </div>

                            <div className={`w-full h-1 rounded-full ${currentTheme.subPanel} overflow-hidden`}>

                              <div

                                className="h-full rounded-full transition-all duration-500"

                                style={{ width: `${pct}%`, backgroundColor: taskStat.color }}

                              />

                            </div>

                          </div>

                        );

                      })}

                    </div>

                  )}

                </div>

              </div>

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>



      {/* MODAL 3B: WEEKLY 10-USER LEAGUE (週間10人リーグ戦) */}

      <AnimatePresence>

        {showLeagueModal && (

          <motion.div

            initial={{ opacity: 0 }}

            animate={{ opacity: 1 }}

            exit={{ opacity: 0 }}

            onClick={() => setShowLeagueModal(false)}

            className={`absolute inset-0 z-50 ${currentTheme.backdrop} backdrop-blur-md flex items-center justify-center p-4`}

          >

            <motion.div

              initial={{ scale: 0.9, y: 20, opacity: 0 }}

              animate={{ scale: 1, y: 0, opacity: 1 }}

              exit={{ scale: 0.9, y: 20, opacity: 0 }}

              onClick={(e) => e.stopPropagation()}

              className={`w-full max-w-sm p-5 rounded-[2rem] backdrop-blur-2xl border flex flex-col gap-3 max-h-[88%] overflow-hidden ${currentTheme.modalCard} ${currentTheme.text}`}

            >

              {/* Header */}

              <div className="flex items-center justify-between shrink-0">

                <div className="flex items-center gap-2">

                  <Trophy className="w-5 h-5 text-amber-400" />

                  <div className="flex flex-col">

                    <h2 className="text-sm font-bold leading-tight flex items-center gap-1.5">

                      <span>全ユーザー アイテム獲得ランキング</span>

                    </h2>

                    <span className="text-[10px] opacity-65 font-mono">

                      集めたアイテム数で勝負 🎁 残り {leagueData.weekInfo.remainingDays}日 {leagueData.weekInfo.remainingHours}時間

                    </span>

                  </div>

                </div>

                <div className="flex items-center gap-1">

                  <motion.button

                    whileTap={{ scale: 0.9 }}

                    onClick={refreshLeagueRankings}

                    disabled={isRefreshingLeague}

                    title="ランキングを最新に同期"

                    className="p-1.5 rounded-full hover:bg-current/10 text-amber-400 flex items-center justify-center transition-all disabled:opacity-50"

                  >

                    <RefreshCw className={`w-4 h-4 ${isRefreshingLeague ? 'animate-spin' : ''}`} />

                  </motion.button>

                  <button

                    onClick={() => setShowLeagueModal(false)}

                    className="p-1 rounded-full hover:bg-current/10"

                  >

                    <X className="w-4 h-4" />

                  </button>

                </div>

              </div>



              {/* Sync status row */}

              <div className="flex items-center justify-between px-1 text-[10px] opacity-75 shrink-0 -mt-1 font-mono">

                <div className="flex items-center gap-1.5">

                  <span className={`w-2 h-2 rounded-full ${isRefreshingLeague ? 'bg-amber-400 animate-ping' : 'bg-emerald-400'}`} />

                  <span className="text-emerald-400 font-bold">

                    {isRefreshingLeague ? 'クラウド同期中...' : 'リアルタイム同期済み'}

                  </span>

                </div>

                <button

                  type="button"

                  onClick={refreshLeagueRankings}

                  className="hover:text-amber-300 underline underline-offset-2 opacity-85 cursor-pointer"

                >

                  {isRefreshingLeague ? '同期中...' : '今すぐ更新'}

                </button>

              </div>



              {/* Level 1 Rookie Tip Banner */}

              {levelInfo.level < 2 && (

                <div className={`p-2.5 rounded-2xl border border-amber-400/30 bg-amber-400/10 text-xs flex items-center gap-2 shrink-0 ${currentTheme.pill}`}>

                  <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />

                  <span className="text-[11px] opacity-90">

                    Lv.1 ルーキー参戦中！タイマーを完了してXPを貯めよう！

                  </span>

                </div>

              )}



              {/* Player Summary & Name Change Card */}

                  <div

                    className={`p-3 rounded-2xl border flex items-center justify-between gap-3 shrink-0 ${currentTheme.pill}`}

                    style={{

                      backgroundColor: 'rgba(245, 158, 11, 0.12)',

                      borderColor: '#F59E0B',

                    }}

                  >

                    <div className="flex flex-col gap-1 min-w-0">

                      <div className="flex items-center gap-1.5 flex-wrap">

                        <span className="font-mono text-base font-extrabold text-amber-400">

                          現在 {leagueData.myStanding.rank}位 / 全{leagueData.standings.length}人

                        </span>

                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-black/20 text-amber-300">

                          {leagueData.myStanding.rank === 1

                            ? '👑 首位'

                            : leagueData.myStanding.rank === 2

                              ? '🥈 2位'

                              : leagueData.myStanding.rank === 3

                                ? '🥉 3位'

                                : `${leagueData.myStanding.rank}位`}

                        </span>

                      </div>

                      <div className="flex items-center gap-2 text-xs opacity-90 truncate">

                        <span className="opacity-60 text-[11px]">表示名:</span>

                        <span className="font-bold text-amber-300 truncate">{playerName}</span>

                        <span className="opacity-40">•</span>

                        <span className="text-amber-400 font-bold font-mono flex items-center gap-1">

                          <Package className="w-3 h-3 text-amber-300" />

                          <span>{leagueData.myStanding.itemCount || 0} 個獲得</span>

                        </span>

                      </div>

                    </div>



                    <motion.button

                      type="button"

                      whileHover={{ scale: 1.04 }}

                      whileTap={{ scale: 0.94 }}

                      onClick={() => {

                        setPlayerNameDraft(playerName);

                        setIsEditingPlayerName((v) => !v);

                      }}

                      className="px-3.5 py-2 rounded-xl border border-amber-400/40 bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 text-xs font-bold flex items-center gap-1.5 shrink-0 shadow-sm transition-all"

                    >

                      <Pencil className="w-3.5 h-3.5" />

                      <span>表示名変更</span>

                    </motion.button>

                  </div>



                  {/* Inline Player Name Editor */}

                  {isEditingPlayerName && (

                    <form

                      onSubmit={(e) => {

                        e.preventDefault();

                        const clean = playerNameDraft.trim();

                        if (clean) setPlayerName(clean);

                        setIsEditingPlayerName(false);

                      }}

                      className={`p-2 rounded-2xl border flex items-center gap-2 shrink-0 ${currentTheme.pill}`}

                      style={{ borderColor: '#F59E0B' }}

                    >

                      <input

                        type="text"

                        value={playerNameDraft}

                        onChange={(e) => setPlayerNameDraft(e.target.value)}

                        placeholder="新しい表示名（最大14文字）"

                        maxLength={14}

                        autoFocus

                        className={`flex-1 h-9 px-3 rounded-xl border text-xs font-bold focus:outline-none ${currentTheme.pill}`}

                        style={{ borderColor: '#F59E0B' }}

                      />

                      <button

                        type="submit"

                        className="px-3.5 h-9 rounded-xl bg-amber-400 text-slate-950 text-xs font-bold hover:bg-amber-500 active:scale-95 transition-all shadow"

                      >

                        保存

                      </button>

                      <button

                        type="button"

                        onClick={() => setIsEditingPlayerName(false)}

                        className="px-2.5 h-9 rounded-xl border border-current/20 hover:bg-current/10 text-xs opacity-75"

                      >

                        取消

                      </button>

                    </form>

                  )}



              {/* All Users Leaderboard List */}

              <div className="flex-1 overflow-y-auto no-scrollbar flex flex-col gap-1.5 pr-0.5">

                {leagueData.standings.map((member) => {

                  const isTop3 = member.rank <= 3;

                  const rankBadgeColors =

                    member.rank === 1

                      ? 'bg-amber-400 text-slate-950 font-black'

                      : member.rank === 2

                        ? 'bg-slate-300 text-slate-950 font-black'

                        : member.rank === 3

                          ? 'bg-amber-600 text-white font-black'

                          : 'bg-current/10 opacity-75';



                  return (

                    <React.Fragment key={member.id}>

                      <div

                        className={`p-2 rounded-2xl border flex items-center justify-between gap-2 transition-all ${

                          member.isUser ? 'ring-2 ring-amber-400/80 shadow-md' : ''

                        } ${currentTheme.pill}`}

                        style={{

                          backgroundColor: member.isUser ? activeCategory.softBg : undefined,

                          borderColor: member.isUser ? activeCategory.color : undefined,

                        }}

                      >

                        <div className="flex items-center gap-2 min-w-0">

                          <div

                            className={`w-6 h-6 rounded-xl font-mono text-xs font-extrabold flex items-center justify-center shrink-0 ${rankBadgeColors}`}

                          >

                            {member.rank}

                          </div>



                          <div className="w-8 h-8 rounded-xl overflow-hidden flex items-center justify-center shrink-0 bg-current/5">

                            <CuteCharacterAvatar

                              charId={member.charId}

                              size={32}

                              isRunning={member.isUser && isRunning}

                            />

                          </div>



                          <div className="flex flex-col min-w-0">

                            <div className="flex items-center gap-1.5">

                              <span className="text-xs font-bold truncate">

                                {member.name}

                              </span>

                              {member.isUser ? (

                                <span

                                  className="text-[9px] font-bold px-1.5 py-0.2 rounded-md text-white shrink-0"

                                  style={{ backgroundColor: activeCategory.color }}

                                >

                                  自分

                                </span>

                              ) : member.isRealUser ? (

                                <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-md bg-emerald-500/20 text-emerald-400 border border-emerald-500/35 flex items-center gap-0.5 shrink-0">

                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />

                                  <span>プレイヤー</span>

                                </span>

                              ) : null}

                            </div>

                            <span className="font-mono text-[10px] opacity-65">

                              Lv.{member.level}

                            </span>

                          </div>

                        </div>



                        <div className="text-right shrink-0 flex flex-col items-end">

                          <div

                            className="flex items-center gap-1 font-mono text-xs font-black tabular-nums"

                            style={{

                              color: member.isUser

                                ? activeCategory.color

                                : isTop3

                                  ? '#F59E0B'

                                  : undefined,

                            }}

                          >

                            <Package className="w-3.5 h-3.5 text-amber-300" />

                            <span>{member.itemCount || 0} 個</span>

                          </div>

                          <span className="font-mono text-[9.5px] opacity-60">

                            {member.minutes || 0} 分集中

                          </span>

                        </div>

                      </div>



                      {/* Top 3 Podium Divider */}

                      {member.rank === 3 && leagueData.standings.length > 3 && (

                        <div className="py-0.5 flex items-center gap-2 text-[9px] font-bold opacity-40">

                          <div className="flex-1 h-px bg-current" />

                          <span>上位3名 表彰台</span>

                          <div className="flex-1 h-px bg-current" />

                        </div>

                      )}

                    </React.Fragment>

                  );

                })}

              {/* Admin Button in Ranking Modal: Only visible on authorized PC */}

              {isAdminDevice && (

                <div className="pt-2 border-t border-current/10 shrink-0">

                  <button

                    type="button"

                    onClick={() => {

                      setShowLeagueModal(false);

                      setShowAdminModal(true);

                    }}

                    className={`w-full py-2 rounded-xl border border-current/15 bg-current/5 hover:bg-current/10 text-xs font-bold flex items-center justify-center gap-2 transition-all ${currentTheme.pill}`}

                  >

                    <ShieldCheck className="w-4 h-4 text-amber-400" />

                    <span>管理者ダッシュボードで全ユーザを管理・編集</span>

                  </button>

                </div>

              )}

              </div>

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>



      {/* MODAL 4: LEVEL UP & NEW CHARACTER UNLOCK */}

      <AnimatePresence>

        {showGoalModal && (

          <motion.div

            initial={{ opacity: 0 }}

            animate={{ opacity: 1 }}

            exit={{ opacity: 0, pointerEvents: 'none' }}

            className={`absolute inset-0 z-50 ${currentTheme.backdrop} backdrop-blur-lg flex items-center justify-center p-4`}

          >

            <motion.div

              initial={{ scale: 0.8, y: 30, opacity: 0 }}

              animate={{ scale: 1, y: 0, opacity: 1 }}

              exit={{ scale: 0.85, opacity: 0 }}

              transition={{ type: 'spring', damping: 18, stiffness: 240 }}

              className={`relative w-full max-w-sm p-6 rounded-[2.2rem] backdrop-blur-2xl border flex flex-col items-center gap-4 overflow-hidden ${currentTheme.modalCard} ${currentTheme.text}`}

            >

              {newlyUnlockedChar ? (

                <div className="flex flex-col items-center gap-2">

                  <span

                    className={`px-3 py-1 rounded-full bg-amber-400/20 text-xs font-bold flex items-center gap-1 ${

                      currentTheme.isLight ? 'text-amber-700' : 'text-amber-300'

                    }`}

                  >

                    <Sparkles className="w-3.5 h-3.5" /> 新しい仲間がアンロック！

                  </span>

                  <CuteCharacterAvatar

                    charId={newlyUnlockedChar.id}

                    size={84}

                    isRunning={true}

                  />

                  <div className="text-base font-extrabold">{newlyUnlockedChar.name}</div>

                </div>

              ) : (

                <motion.div

                  animate={{ rotate: 360 }}

                  transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}

                  className="p-4 rounded-full"

                  style={{

                    backgroundColor: activeCategory.softBg,

                    boxShadow: `0 0 40px ${activeCategory.glow}`,

                  }}

                >

                  <Trophy className="w-10 h-10" style={{ color: activeCategory.color }} />

                </motion.div>

              )}



              <div className="text-xs font-bold opacity-80">

                レベルアップ

              </div>



              <div className="flex items-center justify-center gap-3">

                <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />

                <motion.span

                  key={levelInfo.level}

                  initial={{ scale: 1.3 }}

                  animate={{ scale: 1 }}

                  className="font-mono text-4xl font-extrabold tabular-nums"

                  style={{ color: activeCategory.color }}

                >

                  Lv.{levelInfo.level}

                </motion.span>

                <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />

              </div>



              <div className="text-xs opacity-75 font-mono">

                {levelInfo.isMax

                  ? '最大レベル到達 60,000 pt'

                  : `次のレベルまで あと ${levelInfo.xpToNext.toLocaleString()} pt`}

              </div>



              <motion.button

                whileHover={{ scale: 1.03 }}

                whileTap={{ scale: 0.94 }}

                onClick={() => {

                  setNewlyUnlockedChar(null);

                  handleAcceptNextGoal();

                }}

                className="w-full h-12 rounded-2xl flex items-center justify-center text-white shadow-xl"

                style={{

                  backgroundColor: activeCategory.color,

                  boxShadow: `0 10px 25px ${activeCategory.glow}`,

                }}

              >

                <Check className="w-6 h-6 stroke-[3]" />

              </motion.button>

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>



      {/* MODAL 4B: TASK CREATION FINAL CONFIRMATION (SITS ABOVE SETTINGS MODAL) */}

      <AnimatePresence>

        {showTaskCreateConfirmModal && (

          <motion.div

            initial={{ opacity: 0 }}

            animate={{ opacity: 1 }}

            exit={{ opacity: 0 }}

            onClick={() => setShowTaskCreateConfirmModal(false)}

            className={`absolute inset-0 z-[60] ${currentTheme.backdrop} backdrop-blur-md flex items-center justify-center p-4`}

          >

            <motion.div

              initial={{ scale: 0.9, y: 16, opacity: 0 }}

              animate={{ scale: 1, y: 0, opacity: 1 }}

              exit={{ scale: 0.9, y: 16, opacity: 0 }}

              onClick={(e) => e.stopPropagation()}

              className={`w-full max-w-sm max-h-[90vh] overflow-y-auto p-5 rounded-[2rem] backdrop-blur-2xl border flex flex-col gap-3 ${currentTheme.modalCard} ${currentTheme.text}`}

            >

              {/* Header */}

              <div className="flex items-center justify-between shrink-0">

                <div className="flex items-center gap-2">

                  <div

                    className="w-9 h-9 rounded-xl flex items-center justify-center shadow-sm"

                    style={{

                      backgroundColor: (

                        themedCategories.find((c) => c.id === draftCategory) ||

                        themedCategories[0]

                      ).softBg,

                      color: (

                        themedCategories.find((c) => c.id === draftCategory) ||

                        themedCategories[0]

                      ).color,

                    }}

                  >

                    {(() => {

                      const CatIcon = (

                        themedCategories.find((c) => c.id === draftCategory) ||

                        themedCategories[0]

                      ).icon;

                      return <CatIcon className="w-5 h-5" />;

                    })()}

                  </div>

                  <div className="flex flex-col">

                    <h3 className="text-sm font-bold leading-tight">

                      タスク追加の最終確認

                    </h3>

                    <span className="text-[10px] opacity-65">

                      以下の内容で追加しますか？

                    </span>

                  </div>

                </div>

                <button

                  type="button"

                  onClick={() => setShowTaskCreateConfirmModal(false)}

                  className="p-1 rounded-full hover:bg-current/10"

                >

                  <X className="w-4 h-4" />

                </button>

              </div>



              {/* Task Details Preview */}

              <div className={`p-3 rounded-2xl border flex flex-col gap-2 ${currentTheme.pill}`}>

                <div className="flex items-center justify-between gap-2">

                  <span className="text-xs font-extrabold truncate max-w-[200px]">

                    {draftTitle.trim() || `タスク ${tasks.length + 1}`}

                  </span>

                  <span

                    className="font-mono text-xs font-extrabold shrink-0"

                    style={{

                      color: (

                        themedCategories.find((c) => c.id === draftCategory) ||

                        themedCategories[0]

                      ).color,

                    }}

                  >

                    {draftSets > 1

                      ? `${formatDurationBadge(draftSetMinutes)} × ${draftSets}セット ＝ 合計 ${formatDurationBadge(draftTotalMinutes)}`

                      : `合計 ${formatDurationBadge(draftTotalMinutes)}`}

                  </span>

                </div>

                <div className="flex items-center gap-1.5 text-[10px] opacity-75">

                  <span className="px-1.5 py-0.5 rounded-md bg-current/10 font-bold">

                    {getTaskFrequencyMeta(draftFrequency).label}

                  </span>

                  <span>

                    {getTaskFrequencyMeta(draftFrequency).countsForStreak

                      ? '🔥 連続記録の対象'

                      : '連続記録の対象外'}

                  </span>

                </div>

              </div>



              {/* ★ USER REQUIREMENT: AI TASK ADVISOR (タスク名・設定時間・セット数・ペースを確認してコメント＆3段階提案) */}

              {(() => {

                const aiAdvice = getAiTaskAdvice({

                  title: draftTitle.trim() || `タスク ${tasks.length + 1}`,

                  setMinutes: draftSetMinutes,

                  sets: draftSets,

                  totalMinutes: draftTotalMinutes,

                  frequency: draftFrequency,

                });



                return (

                  <div className={`p-3 rounded-2xl border flex flex-col gap-2.5 ${currentTheme.pill}`}>

                    {/* Advisor Header */}

                    <div className="flex items-center gap-1.5">

                      <div className="w-5 h-5 rounded-lg bg-gradient-to-tr from-indigo-500 to-pink-500 flex items-center justify-center text-white shrink-0 shadow-sm">

                        <Sparkles className="w-3 h-3" />

                      </div>

                      <span className="text-xs font-extrabold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">

                        AI習慣化アドバイス

                      </span>

                    </div>



                    {/* AI Diagnostic Comment */}

                    <div className="p-2.5 rounded-xl bg-current/5 border border-current/10 text-[11px] leading-relaxed opacity-90 font-medium text-left">

                      {aiAdvice.comment}

                    </div>



                    {/* 3-Level Proposals */}

                    <div className="flex flex-col gap-1.5 pt-0.5">

                      {/* Beginner */}

                      <div className="flex items-start gap-2 p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-left">

                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 shrink-0">

                          🔰 初心者

                        </span>

                        <span className="text-[11px] leading-snug text-emerald-300 font-medium">

                          {aiAdvice.beginner}

                        </span>

                      </div>



                      {/* Intermediate */}

                      <div className="flex items-start gap-2 p-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-left">

                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 shrink-0">

                          ⭐ 中級者

                        </span>

                        <span className="text-[11px] leading-snug text-blue-300 font-medium">

                          {aiAdvice.intermediate}

                        </span>

                      </div>



                      {/* Advanced */}

                      <div className="flex items-start gap-2 p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-left">

                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 shrink-0">

                          🔥 上級者

                        </span>

                        <span className="text-[11px] leading-snug text-amber-300 font-medium">

                          {aiAdvice.advanced}

                        </span>

                      </div>

                    </div>

                  </div>

                );

              })()}



              {/* ★ USER REQUIREMENT: Warning Notice */}

              <div

                className={`p-3 rounded-2xl border flex items-start gap-2.5 ${currentTheme.pill}`}

                style={{

                  backgroundColor: 'rgba(245, 158, 11, 0.12)',

                  borderColor: '#F59E0B',

                }}

              >

                <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />

                <div className="flex flex-col gap-1 text-left">

                  <span className="text-xs font-bold text-amber-400">注意</span>

                  <p className="text-xs font-bold leading-relaxed text-amber-300">

                    次にタスク内容を変更するには14回このタスクを完了させなければいけません。

                  </p>

                  <span className="text-[10px] opacity-70 leading-normal">

                    習慣化を確実に定着させるため、14回完了するまでタスク時間や内容の変更がロックされます。

                  </span>

                </div>

              </div>



              {/* Actions */}

              <div className="grid grid-cols-2 gap-2.5 w-full pt-1">

                <motion.button

                  type="button"

                  whileTap={{ scale: 0.95 }}

                  onClick={() => setShowTaskCreateConfirmModal(false)}

                  className={`h-11 rounded-2xl border text-xs font-bold flex items-center justify-center ${currentTheme.pill}`}

                >

                  戻って修正する

                </motion.button>



                <motion.button

                  type="button"

                  whileTap={{ scale: 0.95 }}

                  onClick={confirmCreateTask}

                  className="h-11 rounded-2xl text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-lg active:scale-95 transition-transform"

                  style={{

                    backgroundColor: (

                      themedCategories.find((c) => c.id === draftCategory) ||

                      themedCategories[0]

                    ).color,

                    boxShadow: `0 8px 20px ${(

                      themedCategories.find((c) => c.id === draftCategory) ||

                      themedCategories[0]

                    ).glow}`,

                  }}

                >

                  <Plus className="w-4 h-4 stroke-[2.5]" />

                  <span>確定して追加</span>

                </motion.button>

              </div>

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>



      {/* MODAL 5: DELETE TASK CONFIRMATION (SITS ABOVE SETTINGS MODAL) */}

      <AnimatePresence>

        {taskToDelete && (

          <motion.div

            initial={{ opacity: 0 }}

            animate={{ opacity: 1 }}

            exit={{ opacity: 0, pointerEvents: 'none' }}

            onClick={() => setTaskToDelete(null)}

            className={`absolute inset-0 z-[60] ${currentTheme.backdrop} backdrop-blur-md flex items-center justify-center p-4`}

          >

            <motion.div

              initial={{ scale: 0.9, y: 16, opacity: 0 }}

              animate={{ scale: 1, y: 0, opacity: 1 }}

              exit={{ scale: 0.9, y: 16, opacity: 0 }}

              onClick={(e) => e.stopPropagation()}

              className={`w-full max-w-xs p-5 rounded-[2rem] backdrop-blur-2xl border flex flex-col items-center gap-4 text-center ${currentTheme.modalCard} ${currentTheme.text}`}

            >

              <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-500 flex items-center justify-center">

                <Trash2 className="w-6 h-6 stroke-[2.2]" />

              </div>



              <div className="flex flex-col gap-1.5">

                <h3 className="text-sm font-bold">

                  本当に削除してもよろしいですか？

                </h3>

                <p className="text-xs opacity-75 leading-relaxed">

                  「{taskToDelete.title}」と、このタスクの過去のデータをすべて削除します。

                </p>

              </div>



              <div className="grid grid-cols-2 gap-2.5 w-full pt-1">

                <motion.button

                  whileTap={{ scale: 0.95 }}

                  onClick={() => setTaskToDelete(null)}

                  className={`h-11 rounded-2xl border text-xs font-bold flex items-center justify-center ${currentTheme.pill}`}

                >

                  キャンセル

                </motion.button>



                <motion.button

                  whileTap={{ scale: 0.95 }}

                  onClick={confirmDeleteTask}

                  className="h-11 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold flex items-center justify-center shadow-lg shadow-rose-500/30"

                >

                  削除する

                </motion.button>

              </div>

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>



      {/* MODAL 6: RESET TIMER CONFIRMATION */}

      <AnimatePresence>

        {showResetConfirmModal && (

          <motion.div

            initial={{ opacity: 0 }}

            animate={{ opacity: 1 }}

            exit={{ opacity: 0, pointerEvents: 'none' }}

            onClick={() => setShowResetConfirmModal(false)}

            className={`absolute inset-0 z-[60] ${currentTheme.backdrop} backdrop-blur-md flex items-center justify-center p-4`}

          >

            <motion.div

              initial={{ scale: 0.9, y: 16, opacity: 0 }}

              animate={{ scale: 1, y: 0, opacity: 1 }}

              exit={{ scale: 0.9, y: 16, opacity: 0 }}

              onClick={(e) => e.stopPropagation()}

              className={`w-full max-w-xs p-5 rounded-[2rem] backdrop-blur-2xl border flex flex-col items-center gap-4 text-center ${currentTheme.modalCard} ${currentTheme.text}`}

            >

              <div

                className="w-12 h-12 rounded-2xl flex items-center justify-center"

                style={{

                  backgroundColor: activeCategory.softBg,

                  color: activeCategory.color,

                }}

              >

                <RotateCcw className="w-6 h-6 stroke-[2.2]" />

              </div>



              <div className="flex flex-col gap-1.5">

                <h3 className="text-sm font-bold">

                  本当にリセットしますか？

                </h3>

                <p className="text-xs opacity-75 leading-relaxed">

                  {activeTask

                    ? `「${activeTask.title}」のタイマーを初期時間に戻します。`

                    : 'タイマーを初期時間に戻します。'}

                </p>

              </div>



              <div className="grid grid-cols-2 gap-2.5 w-full pt-1">

                <motion.button

                  whileTap={{ scale: 0.95 }}

                  onClick={() => setShowResetConfirmModal(false)}

                  className={`h-11 rounded-2xl border text-xs font-bold flex items-center justify-center ${currentTheme.pill}`}

                >

                  キャンセル

                </motion.button>



                <motion.button

                  whileTap={{ scale: 0.95 }}

                  onClick={confirmResetTimer}

                  className="h-11 rounded-2xl text-white text-xs font-bold flex items-center justify-center shadow-lg"

                  style={{

                    backgroundColor: activeCategory.color,

                    boxShadow: `0 6px 18px ${activeCategory.glow}`,

                  }}

                >

                  リセットする

                </motion.button>

              </div>

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>



      {/* MODAL 7: MOBILE QR & PWA INSTALL GUIDE */}

      <AnimatePresence>

        {showMobileConnectModal && (

          <motion.div

            initial={{ opacity: 0 }}

            animate={{ opacity: 1 }}

            exit={{ opacity: 0, pointerEvents: 'none' }}

            onClick={() => setShowMobileConnectModal(false)}

            className={`absolute inset-0 z-50 ${currentTheme.backdrop} backdrop-blur-md flex items-center justify-center p-4`}

          >

            <motion.div

              initial={{ scale: 0.9, y: 20, opacity: 0 }}

              animate={{ scale: 1, y: 0, opacity: 1 }}

              exit={{ scale: 0.9, y: 20, opacity: 0 }}

              onClick={(e) => e.stopPropagation()}

              className={`w-full max-w-sm p-5 rounded-[2rem] backdrop-blur-2xl border flex flex-col items-center gap-4 ${currentTheme.modalCard} ${currentTheme.text}`}

            >

              <div className="flex items-center justify-between w-full">

                <div className="flex items-center gap-2">

                  <QrCode className="w-5 h-5" style={{ color: activeCategory.color }} />

                  <h2 className="text-sm font-bold">自分のスマホで動かす</h2>

                </div>

                <button

                  onClick={() => setShowMobileConnectModal(false)}

                  className="p-1 rounded-full hover:bg-current/10"

                >

                  <X className="w-4 h-4" />

                </button>

              </div>



              {/* QR Code Image */}

              <div className="p-3 bg-white rounded-2xl shadow-lg">

                <img

                  src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(

                    mobileAccessUrl

                  )}`}

                  alt="Mobile Access QR"

                  className="w-36 h-36 rounded-lg"

                />

              </div>



              {/* Cloud Public URL Box */}

              <div className="w-full flex flex-col gap-1.5">

                <span className="text-[11px] font-bold opacity-85 text-center">

                  PCを閉じていても・外出先からでも使える公開URL

                </span>

                <div

                  className={`w-full p-2.5 rounded-xl border flex items-center justify-between gap-2 ${currentTheme.pill}`}

                >

                  <span className="font-mono text-xs font-bold truncate select-all">

                    {mobileAccessUrl}

                  </span>

                  <button

                    onClick={() => {

                      navigator.clipboard?.writeText(mobileAccessUrl);

                      setCopiedUrl(true);

                      setTimeout(() => setCopiedUrl(false), 1800);

                    }}

                    className="px-2.5 py-1 rounded-lg text-[11px] font-bold text-white shrink-0 flex items-center gap-1"

                    style={{ backgroundColor: activeCategory.color }}

                  >

                    {copiedUrl ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}

                    <span>{copiedUrl ? 'コピー済' : 'コピー'}</span>

                  </button>

                </div>

              </div>



              {/* Home Screen Install Instructions */}

              <div

                className={`w-full p-3 rounded-2xl border text-[11px] leading-relaxed flex flex-col gap-1 ${currentTheme.pill}`}

              >

                <div className="font-bold flex items-center gap-1.5">

                  <Share className="w-3.5 h-3.5" style={{ color: activeCategory.color }} />

                  <span>ネイティブアプリとして追加する方法</span>

                </div>

                <p className="opacity-80">

                  ・<b>iPhone</b>：下部の「共有」アイコン → <b>「ホーム画面に追加」</b>

                </p>

                <p className="opacity-80">

                  ・<b>Android</b>：右上のメニュー → <b>「ホーム画面に追加 / アプリをインストール」</b>

                </p>



              </div>

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>



      {/* MODAL 9: ADMIN DASHBOARD (MANAGE ALL USER DATA & SITE PASSWORD) */}

      <AnimatePresence>

        {showAdminModal && (

          <motion.div

            initial={{ opacity: 0 }}

            animate={{ opacity: 1 }}

            exit={{ opacity: 0, pointerEvents: 'none' }}

            onClick={() => setShowAdminModal(false)}

            className={`absolute inset-0 z-50 ${currentTheme.backdrop} backdrop-blur-md flex items-center justify-center p-4`}

          >

            <motion.div

              initial={{ scale: 0.9, y: 20, opacity: 0 }}

              animate={{ scale: 1, y: 0, opacity: 1 }}

              exit={{ scale: 0.9, y: 20, opacity: 0 }}

              onClick={(e) => e.stopPropagation()}

              className={`w-full max-w-sm sm:max-w-md p-5 rounded-[2rem] backdrop-blur-2xl border flex flex-col gap-3 max-h-[90%] overflow-hidden ${currentTheme.modalCard} ${currentTheme.text}`}

            >

              <div className="flex items-center justify-between shrink-0">

                <div className="flex items-center gap-2">

                  <ShieldCheck className="w-5 h-5 text-amber-400" />

                  <h3 className="text-sm font-bold">管理者ダッシュボード 全ユーザ管理</h3>

                </div>

                <button

                  type="button"

                  onClick={() => setShowAdminModal(false)}

                  className="p-1 rounded-full hover:bg-current/10"

                >

                  <X className="w-4 h-4" />

                </button>

              </div>



              {!isAdminUnlocked ? (

                /* Admin PIN Authentication */

                <form

                  onSubmit={handleUnlockAdmin}

                  className="flex flex-col gap-3 py-6 items-center text-center"

                >

                  <div className="w-12 h-12 rounded-2xl bg-amber-400/15 border border-amber-400/35 flex items-center justify-center text-amber-400">

                    <Key className="w-6 h-6" />

                  </div>

                  <div className="flex flex-col gap-0.5">

                    <span className="font-bold text-xs">管理者PINコードを入力</span>

                    <span className="text-[10px] opacity-65">全ユーザデータの管理にはPINが必要です</span>

                  </div>

                  <input

                    type="password"

                    value={adminPinInput}

                    onChange={(e) => {

                      setAdminPinInput(e.target.value);

                      setAdminPinError('');

                    }}

                    placeholder="管理者PINコード"

                    autoFocus

                    className={`w-48 text-center p-2 rounded-xl border text-xs font-mono font-bold focus:outline-none ${currentTheme.pill}`}

                  />

                  {adminPinError && (

                    <span className="text-[10px] font-bold text-rose-400">{adminPinError}</span>

                  )}

                  <button

                    type="submit"

                    className="w-48 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs"

                  >

                    管理画面を開く

                  </button>

                  <span className="text-[9px] opacity-45">※初期管理者PIN: admin777</span>

                </form>

              ) : (

                /* Admin Panel Interface */

                <div className="flex-1 overflow-y-auto no-scrollbar flex flex-col gap-3.5 pr-0.5 text-xs">

                  {adminActionNotice && (

                    <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[11px] font-bold flex items-center gap-1.5 animate-fadeIn">

                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />

                      <span>{adminActionNotice}</span>

                    </div>

                  )}



                  {/* Section 1: Site Access Password Management */}

                  <div className={`p-3 rounded-2xl border flex flex-col gap-2 ${currentTheme.pill}`}>

                    <div className="flex items-center justify-between">

                      <div className="flex items-center gap-1.5 font-bold text-[11px]">

                        <Key className="w-3.5 h-3.5 text-amber-400" />

                        <span>サイトアクセスパスワード管理</span>

                      </div>

                      <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-black/20">

                        現在: {siteSecurity.password}

                      </span>

                    </div>

                    <div className="flex items-center gap-1.5">

                      <input

                        type="text"

                        value={newSitePasswordDraft}

                        onChange={(e) => setNewSitePasswordDraft(e.target.value)}

                        placeholder="新しいアクセスパスワード"

                        className="flex-1 p-2 rounded-xl border border-current/20 bg-black/20 text-xs font-mono font-bold focus:outline-none"

                      />

                      <button

                        type="button"

                        onClick={handleAdminUpdatePassword}

                        className="px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shrink-0"

                      >

                        変更保存

                      </button>

                    </div>

                    <span className="text-[9px] opacity-60">

                      ※変更するとFirestoreに保存され、全ユーザーの次回アクセス時に新しいパスワードが要求されます。

                    </span>

                  </div>



                  {/* Section 2: All Users Data Table */}

                  <div className="flex flex-col gap-1.5">

                    <div className="flex items-center justify-between font-bold text-[11px]">

                      <span>登録ユーザー一覧 ({onlineRealMembers.length}名)</span>

                      <span className="text-[10px] opacity-60">今週の集中時間順</span>

                    </div>



                    <div className="flex flex-col gap-1.5">

                      {onlineRealMembers.length === 0 ? (

                        <div className={`p-4 rounded-xl border text-center opacity-60 ${currentTheme.pill}`}>

                          まだユーザーデータがありません

                        </div>

                      ) : (

                        onlineRealMembers

                          .slice()

                          .sort((a, b) => (b.minutes || 0) - (a.minutes || 0))

                          .map((m, idx) => {

                            const isEditing = editingAdminUser?.userId === m.userId;

                            return (

                              <div

                                key={m.userId || idx}

                                className={`p-2.5 rounded-xl border flex flex-col gap-2 transition-all ${currentTheme.pill}`}

                              >

                                {isEditing ? (

                                  /* Inline Edit Form */

                                  <div className="flex flex-col gap-2">

                                    <div className="flex items-center gap-2">

                                      <input

                                        type="text"

                                        value={editingAdminUser.name}

                                        onChange={(e) =>

                                          setEditingAdminUser({ ...editingAdminUser, name: e.target.value })

                                        }

                                        className="flex-1 p-1.5 rounded-lg border bg-black/20 text-xs font-bold"

                                        placeholder="ユーザー名"

                                      />

                                      <div className="flex items-center gap-1">

                                        <input

                                          type="number"

                                          value={editingAdminUser.minutes}

                                          onChange={(e) =>

                                            setEditingAdminUser({

                                              ...editingAdminUser,

                                              minutes: Number(e.target.value),

                                            })

                                          }

                                          className="w-16 p-1.5 rounded-lg border bg-black/20 text-xs font-mono font-bold text-right"

                                          placeholder="分"

                                        />

                                        <span className="text-[10px]">分</span>

                                      </div>

                                    </div>

                                    <div className="flex items-center justify-end gap-1.5">

                                      <button

                                        type="button"

                                        onClick={() => setEditingAdminUser(null)}

                                        className="px-2 py-1 rounded-lg bg-current/10 text-[10px] font-bold"

                                      >

                                        キャンセル

                                      </button>

                                      <button

                                        type="button"

                                        onClick={() => handleAdminSaveUser(editingAdminUser)}

                                        className="px-2.5 py-1 rounded-lg bg-emerald-500 text-white text-[10px] font-bold flex items-center gap-1"

                                      >

                                        <Check className="w-3 h-3" />

                                        <span>更新確定</span>

                                      </button>

                                    </div>

                                  </div>

                                ) : (

                                  /* Readonly Row View */

                                  <div className="flex items-center justify-between gap-2">

                                    <div className="flex items-center gap-2 min-w-0">

                                      <span className="w-5 font-mono text-xs font-extrabold opacity-60">

                                        #{idx + 1}

                                      </span>

                                      <div className="w-7 h-7 rounded-lg bg-current/5 flex items-center justify-center overflow-hidden shrink-0">

                                        <CuteCharacterAvatar charId={m.charId || 'mochi'} size={26} />

                                      </div>

                                      <div className="flex flex-col min-w-0">

                                        <span className="font-bold text-xs truncate">{m.name}</span>

                                        <span className="font-mono text-[9px] opacity-45 truncate">

                                          {m.userId}

                                        </span>

                                      </div>

                                    </div>



                                    <div className="flex items-center gap-2 shrink-0">

                                      <span className="font-mono font-extrabold text-xs text-amber-400">

                                        {m.minutes || 0}分

                                      </span>

                                      <button

                                        type="button"

                                        onClick={() =>

                                          setEditingAdminUser({

                                            userId: m.userId,

                                            name: m.name,

                                            minutes: m.minutes || 0,

                                            level: m.level || 1,

                                          })

                                        }

                                        title="データを編集"

                                        className="p-1.5 rounded-lg border border-current/15 bg-current/5 hover:bg-current/15 text-[10px]"

                                      >

                                        <Pencil className="w-3 h-3" />

                                      </button>

                                      <button

                                        type="button"

                                        onClick={() => handleAdminDeleteUser(m.userId, m.name)}

                                        title="ユーザーを削除"

                                        className="p-1.5 rounded-lg border border-rose-500/20 text-rose-400 hover:bg-rose-500/15 text-[10px]"

                                      >

                                        <Trash2 className="w-3 h-3" />

                                      </button>

                                    </div>

                                  </div>

                                )}

                              </div>

                            );

                          })

                      )}

                    </div>

                  </div>



                  {/* Device Control Footer */}

                  <div className="pt-2 border-t border-current/10 flex items-center justify-between gap-2 shrink-0 text-[10px]">

                    <span className="opacity-60 flex items-center gap-1">

                      <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />

                      この端末（PC）のみ管理者モード有効

                    </span>

                    <button

                      type="button"

                      onClick={handleRevokeAdminDevice}

                      className="px-2.5 py-1 rounded-xl border border-current/15 text-rose-400 hover:bg-rose-500/10 transition-colors font-bold"

                    >

                      この端末の管理者表示を解除

                    </button>

                  </div>

                </div>

              )}

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>







      {/* MODAL 10: MONTHLY STATUS TIMELINE (これまでのステータス年表) */}

      <AnimatePresence>

        {showTimelineModal && (

          <motion.div

            initial={{ opacity: 0 }}

            animate={{ opacity: 1 }}

            exit={{ opacity: 0, pointerEvents: 'none' }}

            onClick={() => setShowTimelineModal(false)}

            className={`fixed inset-0 z-50 ${currentTheme.backdrop} backdrop-blur-md flex flex-col items-center justify-end sm:justify-center px-2 sm:px-4 pt-[max(3.5rem,calc(env(safe-area-inset-top)+1.25rem))] pb-[max(1.25rem,calc(env(safe-area-inset-bottom)+0.5rem))]`}

          >

            <motion.div

              initial={{ scale: 0.92, y: 16, opacity: 0 }}

              animate={{ scale: 1, y: 0, opacity: 1 }}

              exit={{ scale: 0.92, y: 16, opacity: 0 }}

              onClick={(e) => e.stopPropagation()}

              className={`relative w-full max-w-[430px] sm:max-w-lg md:max-w-xl h-full max-h-[88dvh] sm:max-h-[85vh] p-4 sm:p-5 rounded-[2.2rem] backdrop-blur-2xl border flex flex-col gap-3 overflow-hidden shadow-2xl ${currentTheme.modalCard} ${currentTheme.text}`}

            >

              {/* Header (上部に余裕を持ってノッチや時計と重ならない配置) */}

              <div className="flex items-center justify-between shrink-0 pb-2.5 pt-0.5 border-b border-current/10">

                <div className="flex items-center gap-2.5 min-w-0">

                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shadow-sm shrink-0 transition-all ${

                    streak > 0

                      ? 'bg-amber-400/15 border border-amber-400 text-amber-400'

                      : 'bg-current/10 border border-current/15 text-current'

                  }`}>

                    <Flame className={`w-5 h-5 ${streak > 0 ? 'fill-amber-400 text-amber-400' : 'fill-current'}`} />

                  </div>

                  <div className="min-w-0">

                    <div className="flex items-center gap-2 flex-wrap">

                      <h3 className={`text-base sm:text-lg font-black tracking-tight leading-tight ${

                        currentTheme.isLight ? 'text-slate-950' : 'text-white'

                      }`}>

                        これまでのステータス年表

                      </h3>

                      {/* 連続ｘ日は黄色い枠。ｘが０以外なら連続ｘ日を黄色に */}

                      <span

                        className={`px-3 py-1 rounded-full border shrink-0 text-xs font-black transition-all flex items-center gap-1.5 ${

                          streak > 0

                            ? 'bg-gradient-to-r from-amber-500/25 to-orange-500/25 border-amber-400 text-amber-300 shadow-[0_0_12px_rgba(251,191,36,0.35)]'

                            : currentTheme.isLight

                            ? 'bg-amber-400/5 border-amber-400/30 text-slate-950'

                            : 'bg-amber-400/5 border-amber-400/30 text-white'

                        }`}

                      >

                        <Flame className={`w-3.5 h-3.5 ${streak > 0 ? 'text-amber-400 fill-amber-400 drop-shadow-[0_0_5px_rgba(251,191,36,0.7)]' : ''}`} />

                        <span>連続 {streak}日達成中！</span>

                      </span>

                    </div>

                    <p className="text-xs opacity-60 flex items-center gap-1 mt-0.5 truncate">

                      <ArrowUp className="w-3 h-3 stroke-[2.5] shrink-0" />

                      <span>上にスクロールするほど過去の月にさかのぼれます</span>

                    </p>

                  </div>

                </div>

                <button

                  type="button"

                  onClick={() => setShowTimelineModal(false)}

                  className={`p-2 rounded-full hover:bg-current/10 opacity-70 hover:opacity-100 transition-all active:scale-90 shrink-0 ml-1 ${

                    currentTheme.isLight ? 'text-slate-950' : 'text-white'

                  }`}

                  title="閉じる"

                >

                  <X className="w-4 h-4" />

                </button>

              </div>



              {/* Scrollable Timeline Container (No Scrollbar, smooth native touch/wheel scroll) */}

              <div

                ref={timelineScrollRef}

                onScroll={handleTimelineScroll}

                className="flex-1 overflow-y-auto no-scrollbar space-y-4 overscroll-contain pb-2"

              >

                {/* Past boundary indicator */}

                <div className="pt-2 pb-1 text-center">

                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-current/5 border border-current/10 text-xs font-medium opacity-60">

                    <History className="w-3.5 h-3.5" />

                    <span>これより過去の記録はありません</span>

                  </span>

                </div>



                {/* Monthly Cards */}

                {monthlyTimelineData.map((m) => {

                  return (

                    <div key={m.monthKey} className="space-y-2.5">

                      {/* Year divider if start of year */}

                      {m.isYearStart && (

                        <div className="flex items-center gap-2 pt-2.5 pb-1">

                          <div className="h-[1px] flex-1 bg-current/15" />

                          <span className="px-3 py-0.5 rounded-full bg-current/10 text-xs sm:text-sm font-black font-mono opacity-85">

                            {m.year}年

                          </span>

                          <div className="h-[1px] flex-1 bg-current/15" />

                        </div>

                      )}



                      {/* Month Card (枠線なし・すっきりフラット) */}

                      <div

                        className={`px-2.5 py-3 sm:p-4 rounded-2xl transition-all ${

                          m.isCurrentMonth

                            ? currentTheme.isLight

                              ? 'bg-slate-900/[0.04]'

                              : 'bg-white/[0.06]'

                            : 'bg-current/[0.03]'

                        }`}

                      >

                        {/* Month Header: 2026年○月 / 今月 / 月間合計時間 / 達成率 を改行なし1行で表示 */}

                        <div className="flex items-center justify-between gap-1 sm:gap-2 mb-2 px-0.5 whitespace-nowrap w-full">

                          {/* 左側: 年月 + 今月バッジ */}

                          <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">

                            <span className={`text-xs sm:text-sm font-black font-mono tracking-tight ${

                              currentTheme.isLight ? 'text-slate-950' : 'text-white'

                            }`}>

                              {m.year}年{m.month}月

                            </span>

                            {m.isCurrentMonth && (

                              <span className={`px-1.5 py-0.5 rounded-full ${

                                currentTheme.isLight

                                  ? 'bg-amber-100 text-slate-950 border border-amber-300'

                                  : 'bg-gradient-to-r from-amber-200 to-orange-200 text-slate-950 border border-slate-950/25'

                              } text-[10px] sm:text-xs font-black shadow-sm`}>

                                今月

                              </span>

                            )}

                          </div>



                          {/* 右側: 月間合計時間 + 達成率 (枠や文字は見やすい黒に) */}

                          <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm shrink-0">

                            <div className="flex items-baseline gap-0.5 sm:gap-1">

                              <span className="text-[10px] sm:text-xs font-bold opacity-75">月間合計時間</span>

                              <span className={`font-mono font-black text-xs sm:text-sm ${

                                currentTheme.isLight ? 'text-slate-950' : 'text-white'

                              }`}>

                                {m.totalMinutes >= 60

                                  ? `${Math.floor(m.totalMinutes / 60)}時間${m.totalMinutes % 60}分`

                                  : `${m.totalMinutes}分`}

                              </span>

                            </div>

                            <div className="flex items-baseline gap-0.5 sm:gap-1">

                              <span className="text-[10px] sm:text-xs font-bold opacity-75">達成率</span>

                              <span className={`font-mono font-black text-xs sm:text-sm ${

                                currentTheme.isLight ? 'text-slate-950' : 'text-white'

                              }`}>

                                {m.achievementRate}%

                              </span>

                            </div>

                          </div>

                        </div>



                        {/* Calendar Header & Day Grid (枠線なし・すっきり見やすいマス目) */}

                        <div className="p-2.5 sm:p-3 rounded-xl bg-current/[0.03]">

                          <div className={`grid grid-cols-7 gap-1 text-center text-xs sm:text-sm font-black mb-2 ${

                            currentTheme.isLight ? 'text-slate-950 opacity-90' : 'text-white opacity-90'

                          }`}>

                            <span>月</span>

                            <span>火</span>

                            <span>水</span>

                            <span>木</span>

                            <span>金</span>

                            <span>土</span>

                            <span>日</span>

                          </div>



                          {/* Calendar Grid (Days 1 to MonthEnd) */}

                          <div className="grid grid-cols-7 gap-1 sm:gap-1.5">

                            {/* Empty offset cells */}

                            {Array.from({ length: m.firstDayOffset }).map((_, idx) => (

                              <div key={`empty-${idx}`} className="h-8 sm:h-9" />

                            ))}



                            {/* Days */}

                            {m.days.map((d) => {

                              const isSelected = selectedTimelineDay?.dateKey === d.dateKey;

                              return (

                                <button

                                  key={d.dateKey}

                                  type="button"

                                  onClick={() => setSelectedTimelineDay(isSelected ? null : d)}

                                  className={`h-8 sm:h-9 rounded-xl flex flex-col items-center justify-center relative transition-all text-xs sm:text-sm font-mono font-extrabold ${

                                    d.isToday

                                      ? currentTheme.isLight

                                        ? 'bg-slate-200/90 font-black text-slate-950 shadow-sm'

                                        : 'bg-zinc-700/60 font-black text-white shadow-sm'

                                      : isSelected

                                      ? 'ring-2 ring-sky-400 bg-sky-400/25'

                                      : 'hover:bg-current/10'

                                  } ${d.isFuture ? 'opacity-25' : ''}`}

                                  title={`${d.dateKey}: ${d.minutes}分集中 ${

                                    d.isAchieved ? '全タスク達成' : d.hasWorked ? 'タスク達成' : '未達成'

                                  }`}

                                >

                                  {d.isAchieved ? (

                                    <LuxuriousRainbowStar size={26} />

                                  ) : d.hasWorked ? (

                                    <Crown

                                      className="w-4.5 h-4.5 text-amber-300 fill-amber-300"

                                      style={{ filter: 'drop-shadow(0 0 3px rgba(252, 211, 77, 0.5))' }}

                                    />

                                  ) : (

                                    <span className={`font-black ${

                                      currentTheme.isLight ? 'text-slate-950' : 'text-white'

                                    }`}>{d.dayNum}</span>

                                  )}

                                </button>

                              );

                            })}

                          </div>



                          {/* Selected Day Tooltip Detail */}

                          {selectedTimelineDay && selectedTimelineDay.dateKey.startsWith(m.monthKey) && (

                            <motion.div

                              initial={{ opacity: 0, y: -4 }}

                              animate={{ opacity: 1, y: 0 }}

                              className="mt-2.5 p-2.5 rounded-xl bg-current/10 border border-current/15 flex items-center justify-between text-xs font-bold"

                            >

                              <div className="flex items-center gap-2">

                                <span className={`font-mono font-bold ${

                                  currentTheme.isLight ? 'text-slate-950' : 'text-white'

                                }`}>{selectedTimelineDay.dateKey}</span>

                                {selectedTimelineDay.isAchieved ? (

                                  <span className="text-emerald-400 flex items-center gap-1 font-bold">

                                    <Star className="w-4 h-4 fill-emerald-400" /> 全タスク達成！

                                  </span>

                                ) : selectedTimelineDay.hasWorked ? (

                                  <span className="text-amber-300 flex items-center gap-1 font-bold">

                                    <Crown className="w-4 h-4 fill-amber-300" /> タスク達成

                                  </span>

                                ) : (

                                  <span className="opacity-50 font-normal">未達成</span>

                                )}

                              </div>

                              <span className={`font-mono font-black text-sm ${

                                currentTheme.isLight ? 'text-slate-950' : 'text-white'

                              }`}>

                                {selectedTimelineDay.minutes}分 集中

                              </span>

                            </motion.div>

                          )}

                        </div>

                      </div>

                    </div>

                  );

                })}

              </div>



              {/* Floating "現在" Banner when scrolled up */}

              <AnimatePresence>

                {showScrollToBottom && (

                  <motion.div

                    initial={{ opacity: 0, y: 14, scale: 0.95 }}

                    animate={{ opacity: 1, y: 0, scale: 1 }}

                    exit={{ opacity: 0, y: 14, scale: 0.95 }}

                    transition={{ duration: 0.18 }}

                    className="absolute bottom-4 inset-x-0 flex justify-center items-center pointer-events-none z-30"

                  >

                    <button

                      type="button"

                      onClick={scrollToLatestMonth}

                      className={`pointer-events-auto px-4 py-2 rounded-full ${

                        currentTheme.isLight

                          ? 'bg-amber-100 text-slate-950 border border-slate-900/30 shadow-xl'

                          : 'bg-gradient-to-r from-amber-200 to-orange-200 text-slate-900 border border-slate-950/25 shadow-xl'

                      } font-black text-xs sm:text-sm flex items-center gap-1.5 hover:scale-105 active:scale-95 transition-all backdrop-blur-md cursor-pointer select-none`}

                    >

                      <span>現在</span>

                      <ArrowDown className="w-4 h-4 stroke-[2.5]" />

                    </button>

                  </motion.div>

                )}

              </AnimatePresence>

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>



      {/* ==========================================

          FASTAPI REWARD CELEBRATION MODAL (アイテム獲得ポップアップ)

          ========================================== */}

      <AnimatePresence>

        {rewardCelebration && (

          <motion.div

            initial={{ opacity: 0 }}

            animate={{ opacity: 1 }}

            exit={{ opacity: 0 }}

            className={`absolute inset-0 z-[80] ${currentTheme.backdrop} backdrop-blur-md flex items-center justify-center p-4 select-none`}

            onClick={() => setRewardCelebration(null)}

          >

            <motion.div

              initial={{ scale: 0.8, y: 20 }}

              animate={{ scale: 1, y: 0 }}

              exit={{ scale: 0.8, y: 20 }}

              onClick={(e) => e.stopPropagation()}

              className={`w-full max-w-sm rounded-3xl p-6 border shadow-2xl backdrop-blur-2xl flex flex-col items-center text-center relative overflow-hidden ${currentTheme.card}`}

              style={{

                borderColor: rewardCelebration.item?.color || '#FBBF24',

                boxShadow: `0 0 35px ${rewardCelebration.item?.color || '#FBBF24'}40`,

              }}

            >

              {/* Sparkle background glow */}

              <div

                className="absolute w-44 h-44 rounded-full blur-3xl opacity-30 pointer-events-none -top-10"

                style={{ backgroundColor: rewardCelebration.item?.color || '#FBBF24' }}

              />



              <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black bg-gradient-to-r from-amber-400 to-orange-400 text-slate-950 mb-3 shadow">

                <Trophy className="w-3.5 h-3.5" />

                <span>AI予測タスク量を突破！</span>

              </div>



              {/* Huge animated item icon */}

              <motion.div

                animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }}

                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}

                className="w-24 h-24 rounded-3xl flex items-center justify-center text-6xl shadow-xl my-2 border"

                style={{

                  backgroundColor: `${rewardCelebration.item?.color || '#FBBF24'}20`,

                  borderColor: `${rewardCelebration.item?.color || '#FBBF24'}60`,

                }}

              >

                {rewardCelebration.item?.icon || '🎁'}

              </motion.div>



              {/* Rarity & Item Name */}

              <div className="flex items-center gap-2 mt-2">

                <span

                  className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider"

                  style={{

                    backgroundColor: `${rewardCelebration.item?.color || '#FBBF24'}25`,

                    color: rewardCelebration.item?.color || '#FBBF24',

                    border: `1px solid ${rewardCelebration.item?.color || '#FBBF24'}50`,

                  }}

                >

                  {rewardCelebration.item?.rarity || 'Rare'}

                </span>

                <h3 className="text-xl font-black">{rewardCelebration.item?.name}</h3>

              </div>



              <p className="text-xs opacity-80 mt-2 px-2 leading-relaxed">

                {rewardCelebration.item?.description}

              </p>



              {/* Flavor Text / Quote */}

              <div className="mt-3 p-2.5 rounded-2xl bg-current/5 border border-current/10 text-xs italic font-medium text-amber-200">

                {rewardCelebration.item?.flavorText}

              </div>



              {/* Performance Stats */}

              <div className="mt-3 px-3 py-1.5 rounded-xl bg-current/5 text-[11px] opacity-75 font-mono">

                目標 {rewardCelebration.targetThreshold}分 に対し 実績 {rewardCelebration.actualMinutes}分 (+{rewardCelebration.margin}分 超過達成)

              </div>



              {/* Buttons */}

              <div className="flex items-center gap-2 w-full mt-5">

                <button

                  type="button"

                  onClick={() => {

                    setRewardCelebration(null);

                    setShowInventoryModal(true);

                  }}

                  className="flex-1 py-2.5 px-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 shadow-lg transition-all"

                >

                  <Package className="w-4 h-4" />

                  <span>獲得アイテムを見る</span>

                </button>

                <button

                  type="button"

                  onClick={() => setRewardCelebration(null)}

                  className="py-2.5 px-4 rounded-2xl bg-white/10 hover:bg-white/15 text-white/80 font-bold text-xs transition-all"

                >

                  閉じる

                </button>

              </div>

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>



      {/* ==========================================

          FASTAPI AI TASK PREDICTION CHALLENGE MODAL

          ========================================== */}

      <AnimatePresence>

        {showAiChallengeModal && (

          <motion.div

            initial={{ opacity: 0 }}

            animate={{ opacity: 1 }}

            exit={{ opacity: 0 }}

            className={`fixed inset-0 z-[75] ${currentTheme.backdrop} backdrop-blur-md flex items-center justify-center p-4 select-none overflow-y-auto`}

            onClick={() => setShowAiChallengeModal(false)}

          >

            <motion.div

              initial={{ scale: 0.9, y: 15 }}

              animate={{ scale: 1, y: 0 }}

              exit={{ scale: 0.9, y: 15 }}

              onClick={(e) => e.stopPropagation()}

              className={`w-full max-w-sm rounded-3xl p-5 border shadow-2xl flex flex-col gap-3.5 my-auto ${currentTheme.card}`}

            >

              {/* Modal Header */}

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-2">

                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-500 flex items-center justify-center text-white shadow-sm">

                    <Bot className="w-4 h-4" />

                  </div>

                  <div>

                    <h3 className="font-extrabold text-sm tracking-tight">成長チャレンジ</h3>

                    <div className="flex items-center gap-1.5 mt-0.5">

                      <span

                        className={`inline-flex items-center gap-1 px-1.5 py-0.2 rounded-full text-[9px] font-extrabold ${

                          fastApiStatus === 'online'

                            ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'

                            : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'

                        }`}

                      >

                        <span

                          className={`w-1.5 h-1.5 rounded-full ${

                            fastApiStatus === 'online' ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'

                          }`}

                        />

                        {fastApiStatus === 'online' ? 'FastAPI 連携中' : 'ローカル統計モード'}

                      </span>

                    </div>

                  </div>

                </div>

                <button

                  type="button"

                  onClick={() => setShowAiChallengeModal(false)}

                  className="p-1 rounded-full hover:bg-current/10 transition-colors"

                >

                  <X className="w-5 h-5 opacity-70" />

                </button>

              </div>



              {/* Goal & Progress Card */}

              <div className="p-3.5 rounded-2xl bg-current/5 border border-current/10 flex flex-col gap-2.5">

                <div className="flex items-center justify-between">

                  <div className="flex flex-col">

                    <span className="text-[10px] opacity-70">本日の成長目標</span>

                    <span className="text-2xl font-black font-mono text-amber-300">

                      {aiPrediction?.predictedMinutes || 25}

                      <span className="text-xs font-bold ml-0.5">分</span>

                    </span>

                  </div>

                  <div className="text-right flex flex-col items-end">

                    <span className="text-[10px] opacity-70">今日の集中実績</span>

                    <span className="text-xl font-bold font-mono">

                      {todayMinutes}

                      <span className="text-xs ml-0.5">分</span>

                    </span>

                  </div>

                </div>



                {/* Progress Bar */}

                <div className="w-full">

                  <div className="w-full h-2 rounded-full bg-current/10 overflow-hidden relative">

                    <motion.div

                      className="h-full rounded-full transition-all duration-500"

                      style={{

                        width: `${Math.min(

                          100,

                          Math.round(

                            (todayMinutes / Math.max(1, aiPrediction?.predictedMinutes || 25)) * 100

                          )

                        )}%`,

                        backgroundColor:

                          todayMinutes >= (aiPrediction?.predictedMinutes || 25)

                            ? '#22C55E'

                            : activeCategory.color,

                        boxShadow:

                          todayMinutes >= (aiPrediction?.predictedMinutes || 25)

                            ? '0 0 10px rgba(34, 197, 94, 0.7)'

                            : undefined,

                      }}

                    />

                  </div>

                  <div className="flex items-center justify-between text-[10px] opacity-75 mt-1 font-mono">

                    <span>

                      進捗 {Math.round((todayMinutes / Math.max(1, aiPrediction?.predictedMinutes || 25)) * 100)}%

                    </span>

                    {todayMinutes >= (aiPrediction?.predictedMinutes || 25) ? (

                      <span className="text-emerald-400 font-extrabold">🎉 目標達成！アイテム獲得！</span>

                    ) : (

                      <span>あと {Math.max(0, (aiPrediction?.predictedMinutes || 25) - todayMinutes)}分 で獲得</span>

                    )}

                  </div>

                </div>

              </div>



              {/* Companion Speech Card (Character beside message, no message mark, no brackets) */}

              <div className="p-3 rounded-2xl bg-current/5 border border-current/10 flex items-center gap-3">

                <div className="w-12 h-12 rounded-2xl bg-current/5 border border-current/10 overflow-hidden flex items-center justify-center shrink-0 shadow-sm">

                  <CuteCharacterAvatar

                    charId={selectedCharId}

                    size={44}

                    isRunning={isRunning}

                  />

                </div>

                <div className="flex flex-col gap-0.5 min-w-0 flex-1">

                  <div className="flex items-center gap-1.5">

                    <span

                      className="text-[11px] font-extrabold tracking-tight"

                      style={{

                        color:

                          (CHARACTERS.find((c) => c.id === selectedCharId) || CHARACTERS[0])?.color ||

                          activeCategory.color,

                      }}

                    >

                      {(CHARACTERS.find((c) => c.id === selectedCharId) || CHARACTERS[0])?.name || '相棒'}

                    </span>

                    <span className="text-[9px] opacity-50 font-normal">からのメッセージ</span>

                  </div>

                  <p className="text-xs leading-relaxed opacity-90 font-medium">

                    {(aiPrediction?.companionCheer || '目標を超えて集中すると、特別な限定アイテムがもらえるよ！').replace(/【|】/g, '')}

                  </p>

                </div>

              </div>



              {/* Prediction Specs */}

              <div className="px-3 py-2 rounded-xl bg-current/5 text-[10px] opacity-75 flex items-center justify-between font-mono">

                <span>分析日数: <strong>{aiPrediction?.daysAnalyzed || 0}日</strong></span>

                <span>モデル: <strong>{aiPrediction?.modelName || 'EWMA + Trend'}</strong></span>

                <span>信頼度: <strong>{Math.round((aiPrediction?.confidence || 0.75) * 100)}%</strong></span>

              </div>



              {/* Modal Buttons */}

              <div className="flex items-center gap-2 pt-1">

                <button

                  type="button"

                  disabled={isPredicting}

                  onClick={() => fetchPredictionFromFastApi()}

                  className="flex-1 py-2 px-3 rounded-xl border border-current/20 bg-current/5 hover:bg-current/10 font-bold text-xs flex items-center justify-center gap-1.5 transition-all disabled:opacity-50"

                >

                  <RotateCcw className={`w-3.5 h-3.5 ${isPredicting ? 'animate-spin' : ''}`} />

                  <span>{isPredicting ? '計算中...' : '再予測する'}</span>

                </button>



                <button

                  type="button"

                  onClick={() => {

                    setShowAiChallengeModal(false);

                    setShowInventoryModal(true);

                  }}

                  className="py-2 px-3.5 rounded-xl border border-amber-400/40 bg-amber-400/10 hover:bg-amber-400/20 font-bold text-xs text-amber-300 flex items-center gap-1.5 transition-all"

                >

                  <Package className="w-3.5 h-3.5 text-amber-300" />

                  <span>獲得アイテム ({inventory.reduce((s, i) => s + (i.count || 1), 0)})</span>

                </button>

              </div>

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>



      {/* ==========================================

          FASTAPI INVENTORY MODAL (もちもの / アイテムバッグ)

          ========================================== */}

      <AnimatePresence>

        {showInventoryModal && (

          <motion.div

            initial={{ opacity: 0 }}

            animate={{ opacity: 1 }}

            exit={{ opacity: 0 }}

            className={`absolute inset-0 z-[75] ${currentTheme.backdrop} backdrop-blur-md flex items-center justify-center p-4 select-none`}

            onClick={() => setShowInventoryModal(false)}

          >

            <motion.div

              initial={{ scale: 0.9, y: 15 }}

              animate={{ scale: 1, y: 0 }}

              exit={{ scale: 0.9, y: 15 }}

              onClick={(e) => e.stopPropagation()}

              className={`w-full max-w-md max-h-[88vh] rounded-3xl p-5 border shadow-2xl backdrop-blur-2xl flex flex-col relative overflow-hidden ${currentTheme.card}`}

            >

              {/* Header */}

              <div className="flex items-center justify-between pb-3 border-b border-current/10 shrink-0">

                <div className="flex items-center gap-2">

                  <div className="w-8 h-8 rounded-xl bg-amber-400/20 text-amber-400 border border-amber-400/30 flex items-center justify-center">

                    <Package className="w-4 h-4" />

                  </div>

                  <div>

                    <h2 className="text-sm font-black">獲得アイテム コレクション</h2>

                    <p className="text-[10px] opacity-70 font-mono">

                      累計獲得数: {inventory.reduce((s, i) => s + (i.count || 1), 0)}個

                    </p>

                  </div>

                </div>



                <button

                  type="button"

                  onClick={() => setShowInventoryModal(false)}

                  className="p-1 rounded-full hover:bg-current/10 transition-colors"

                >

                  <X className="w-5 h-5 opacity-70" />

                </button>

              </div>



              {/* Items List */}

              <div className="flex-1 overflow-y-auto no-scrollbar py-3 space-y-2.5">

                {inventory.length === 0 ? (

                  <div className="flex flex-col items-center justify-center py-12 text-center opacity-65">

                    <span className="text-5xl mb-3">🎁</span>

                    <p className="text-xs font-bold">まだアイテムがありません</p>

                    <p className="text-[11px] opacity-80 mt-1 max-w-[240px]">

                      AIの予測目標を超えて集中すると、特別アイテムを獲得できます！

                    </p>

                  </div>

                ) : (

                  inventory.map((item) => (

                    <div

                      key={item.id}

                      className="p-3 rounded-2xl border flex items-center justify-between gap-3 transition-all"

                      style={{

                        backgroundColor: `${item.color || '#FBBF24'}0d`,

                        borderColor: `${item.color || '#FBBF24'}40`,

                      }}

                    >

                      <div className="flex items-center gap-3 min-w-0">

                        <div

                          className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0 border"

                          style={{

                            backgroundColor: `${item.color || '#FBBF24'}20`,

                            borderColor: `${item.color || '#FBBF24'}60`,

                          }}

                        >

                          {item.icon}

                        </div>

                        <div className="min-w-0">

                          <div className="flex items-center gap-1.5">

                            <span

                              className="px-1.5 py-0.2 rounded-full text-[8.5px] font-black uppercase tracking-wider"

                              style={{

                                backgroundColor: `${item.color || '#FBBF24'}30`,

                                color: item.color || '#FBBF24',

                              }}

                            >

                              {item.rarity}

                            </span>

                            <h4 className="font-bold text-xs truncate">{item.name}</h4>

                          </div>

                          <p className="text-[10px] opacity-75 line-clamp-1 mt-0.5">

                            {item.description}

                          </p>

                          <p className="text-[9.5px] text-amber-300/90 italic truncate mt-0.5">

                            {item.flavorText}

                          </p>

                        </div>

                      </div>



                      <div className="shrink-0 px-3 py-1.5 rounded-xl border border-amber-400/35 bg-amber-400/15 text-amber-300 font-mono font-bold text-xs tabular-nums flex items-center gap-1">

                        <Package className="w-3.5 h-3.5 text-amber-300" />

                        <span>{item.count || 1}個</span>

                      </div>

                    </div>

                  ))

                )}

              </div>



              {/* Bottom Info */}

              <div className="pt-2.5 border-t border-current/10 flex items-center justify-between text-[11px] opacity-75 shrink-0">

                <span className="text-amber-300/90 font-medium flex items-center gap-1">

                  <Trophy className="w-3.5 h-3.5 text-amber-400 shrink-0" />

                  <span>集めたアイテムは全ユーザー週間ランキングのスコアになります</span>

                </span>

                <button

                  type="button"

                  onClick={() => setShowInventoryModal(false)}

                  className="font-bold hover:underline shrink-0 ml-2"

                >

                  閉じる

                </button>

              </div>

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>



    </div>

  );



  if (!showPhoneBezel) {

    return (

      <div className="relative h-full w-full overflow-hidden">

        <button

          onClick={() => setShowPhoneBezel(true)}

          className="hidden sm:flex fixed bottom-4 right-4 z-50 px-3 py-2 rounded-2xl bg-black/60 hover:bg-black/80 text-white border border-white/15 backdrop-blur-xl items-center gap-2 text-xs font-bold shadow-xl transition-all"

        >

          <Smartphone className="w-4 h-4" />

          <span>スマホ枠を表示</span>

        </button>

        {screenContent}

      </div>

    );

  }



  return (

    <div className="min-h-screen w-full bg-neutral-950 flex flex-col items-center justify-center p-3 sm:p-6 relative overflow-hidden select-none">

      {/* Subtle Ambient Studio Backdrop behind the Phone Bezel */}

      <div

        className="pointer-events-none fixed w-[42rem] h-[42rem] rounded-full blur-[130px] opacity-20 transition-colors duration-700"

        style={{ backgroundColor: activeCategory.color }}

      />



      {/* Top-Right Controls: Demo Unlock Toggle, Mobile QR Connect & Fullscreen Toggle */}

      <div className="fixed top-4 right-4 z-50 flex items-center gap-2">

        <button

          onClick={() => setDemoUnlockAll((prev) => !prev)}

          title="デモ画面での全キャラ・全テーマアンロック切替"

          className={`px-3.5 py-2 rounded-2xl border backdrop-blur-xl flex items-center gap-1.5 text-xs font-bold shadow-lg transition-all ${

            demoUnlockAll

              ? 'bg-amber-400/20 border-amber-400/50 text-amber-300 hover:bg-amber-400/30'

              : 'bg-white/10 hover:bg-white/15 text-white/75 border-white/15'

          }`}

        >

          {demoUnlockAll ? (

            <Unlock className="w-3.5 h-3.5 text-amber-300" />

          ) : (

            <Lock className="w-3.5 h-3.5" />

          )}

          <span>{demoUnlockAll ? 'デモ版: 全アンロック中' : 'デモ版: 通常ロック'}</span>

        </button>



        <button

          onClick={() => setShowMobileConnectModal(true)}

          className="px-3.5 py-2 rounded-2xl text-white border border-white/20 backdrop-blur-xl flex items-center gap-2 text-xs font-bold shadow-lg transition-all hover:scale-105"

          style={{

            backgroundColor: activeCategory.color,

            boxShadow: `0 6px 20px ${activeCategory.glow}`,

          }}

        >

          <QrCode className="w-4 h-4" />

          <span>スマホで開く</span>

        </button>



        <button

          onClick={() => setShowPhoneBezel(false)}

          className="px-3.5 py-2 rounded-2xl bg-white/10 hover:bg-white/15 text-white border border-white/15 backdrop-blur-xl flex items-center gap-2 text-xs font-semibold shadow-lg transition-all"

        >

          <Maximize2 className="w-3.5 h-3.5" />

          <span>枠なし全画面へ切替</span>

        </button>

      </div>



      {/* ==========================================

          AUTHENTIC iPhone 16 Pro TITANIUM FRAME (19.5:9 393x852)

          ========================================== */}

      <div className="relative p-[3px] rounded-[55px] bg-gradient-to-b from-[#8f8e8a] via-[#e5e4e0] to-[#6e6d69] shadow-[0_25px_80px_-15px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,255,255,0.25)] select-none">

        {/* Antenna Band Slits */}

        <div className="absolute -left-[3px] top-16 w-[3px] h-[3px] bg-zinc-700/60" />

        <div className="absolute -left-[3px] bottom-16 w-[3px] h-[3px] bg-zinc-700/60" />

        <div className="absolute -right-[3px] top-16 w-[3px] h-[3px] bg-zinc-700/60" />

        <div className="absolute -right-[3px] bottom-16 w-[3px] h-[3px] bg-zinc-700/60" />



        {/* Left Hardware Buttons: Action Button & Volume Buttons */}

        <div className="absolute -left-[3.5px] top-24 w-[3.5px] h-7 bg-[#a5a49f] rounded-l-xs shadow-xs" title="Action Button" />

        <div className="absolute -left-[3.5px] top-37 w-[3.5px] h-12 bg-[#a5a49f] rounded-l-xs shadow-xs" title="Volume Up" />

        <div className="absolute -left-[3.5px] top-52 w-[3.5px] h-12 bg-[#a5a49f] rounded-l-xs shadow-xs" title="Volume Down" />



        {/* Right Hardware Buttons: Side Power Button & iPhone 16 Camera Control */}

        <div className="absolute -right-[3.5px] top-40 w-[3.5px] h-17 bg-[#a5a49f] rounded-r-xs shadow-xs" title="Side Button" />

        <div className="absolute -right-[2.5px] top-76 w-[2.5px] h-18 bg-[#525255] rounded-r-xs shadow-inner" title="Camera Control" />



        {/* Ultra-Narrow iPhone 16 Pro Black Bezel Border */}

        <div className="relative w-[393px] h-[852px] max-h-[94vh] rounded-[52px] bg-black p-[5px] shadow-inner overflow-hidden ring-1 ring-white/10">

          {/* Actual Screen Viewport */}

          <div className="relative w-full h-full rounded-[47px] overflow-hidden">

            {screenContent}

          </div>

        </div>

      </div>

          </div>

  );

}

