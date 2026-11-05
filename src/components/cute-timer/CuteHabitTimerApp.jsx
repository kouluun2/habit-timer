import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Trophy, Flame, Heart, BookOpen, Coffee, Dumbbell, Palette, CheckCircle2 } from 'lucide-react';
import { useAtomicTimer } from './useAtomicTimer';
import { CompanionCharacter } from './CompanionCharacter';
import { PlumpTimerWidget } from './PlumpTimerWidget';

/**
 * CuteHabitTimerApp - 愛され癒やし系・超軽量習慣タイマー完全統合アプリ
 * 
 * 【特長】
 * 1. スマホが発熱せず60fps/120fpsを維持するゼロ再レンダリング・アトミックタイマー
 * 2. 毎日思わず開きたくなる「パステル調・ぽてっと角丸・ぷにぷにスプリング」UI
 * 3. Rive対応 ＆ ぽてかわSVGフォールバック内蔵の相棒キャラクター
 */
export function CuteHabitTimerApp() {
  const [currentMinutes, setCurrentMinutes] = useState(25);
  const [streakDays, setStreakDays] = useState(5);
  const [isCelebrated, setIsCelebrated] = useState(false);
  const [selectedTask, setSelectedTask] = useState('study');

  // タスクの定義（かわいいパステルカラー）
  const TASKS = [
    { id: 'study', label: '勉強・読書', icon: BookOpen, color: '#FF7E95', bg: '#FFF0F3' },
    { id: 'workout', label: 'ストレッチ', icon: Dumbbell, color: '#38C194', bg: '#EBFBF5' },
    { id: 'break', label: 'ひと息お茶', icon: Coffee, color: '#FFAE33', bg: '#FFF8EB' },
    { id: 'creative', label: '創作・作業', icon: Palette, color: '#9D7BFF', bg: '#F5F0FF' },
  ];

  const currentTaskObj = TASKS.find((t) => t.id === selectedTask) || TASKS[0];

  // タイマー完了時ハンドラー
  const handleTimerComplete = useCallback(() => {
    setIsCelebrated(true);
    // 連続日数をインクリメント
    setStreakDays((prev) => prev + 1);

    // 4秒後にセレブレーション終了
    setTimeout(() => {
      setIsCelebrated(false);
    }, 4500);
  }, []);

  // 超低負荷アトミックタイマーの初期化
  const {
    isRunning,
    displayTimeRef,
    ringProgressRef,
    toggle,
    reset,
  } = useAtomicTimer({
    initialSeconds: currentMinutes * 60,
    onComplete: handleTimerComplete,
  });

  // プリセット分数変更
  const handleSelectDuration = (minutes) => {
    setCurrentMinutes(minutes);
    reset(minutes * 60);
  };

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-between px-4 py-6 transition-colors duration-500 overflow-x-hidden"
      style={{
        backgroundColor: '#FFFDF9',
        fontFamily: 'ui-rounded, "Hiragino Maru Gothic ProN", "Quicksand", "Nunito", sans-serif',
      }}
    >
      {/* ほんのりパステルな背景オーラ */}
      <div
        className="fixed inset-0 pointer-events-none opacity-40 blur-3xl -z-10"
        style={{
          background: `radial-gradient(circle at 50% 20%, ${currentTaskObj.color}35 0%, transparent 60%),
                       radial-gradient(circle at 20% 80%, #FFE4E6 0%, transparent 50%),
                       radial-gradient(circle at 80% 80%, #E0F2FE 0%, transparent 50%)`,
        }}
      />

      {/* ====================================================
          TOP BAR: 連続日数ストリーク ＆ 相棒の称号
          ==================================================== */}
      <header className="w-full max-w-sm flex items-center justify-between z-10 mb-2">
        {/* ぽてっとストリークバッジ */}
        <motion.div
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-amber-200/80 shadow-sm shadow-amber-100"
        >
          <motion.div
            animate={{ scale: [1, 1.25, 1], rotate: [0, -6, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Flame className="w-4 h-4 text-amber-500 fill-amber-400" />
          </motion.div>
          <span className="text-xs font-black text-amber-800">
            {streakDays}日れんぞく！
          </span>
        </motion.div>

        {/* ご褒美トロフィー */}
        <motion.div
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-rose-100 shadow-sm shadow-rose-100/50 text-xs font-bold text-rose-500"
        >
          <Trophy className="w-4 h-4 text-amber-400" />
          <span>なかよし Lv.12</span>
        </motion.div>
      </header>

      {/* ====================================================
          MAIN AREA: 相棒キャラクター ＆ アトミックタイマー
          ==================================================== */}
      <main className="w-full max-w-sm flex flex-col items-center gap-2 z-10 flex-1 justify-center">
        {/* セレブレーション（完了時ポップアップ） */}
        <AnimatePresence>
          {isCelebrated && (
            <motion.div
              initial={{ opacity: 0, scale: 0.7, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -20 }}
              className="px-5 py-2.5 rounded-3xl bg-rose-500 text-white font-extrabold shadow-xl shadow-rose-300/60 flex items-center gap-2 mb-2 z-20"
            >
              <Sparkles className="w-5 h-5 animate-spin" />
              <span>おめでとう！今日もがんばったね 🎉</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 相棒キャラクター（Rive / ぽてかわフォールバック） */}
        <div className="flex flex-col items-center">
          <CompanionCharacter
            isFocusing={isRunning}
            isCelebrated={isCelebrated}
            size={160}
          />
          <div className="text-[12px] font-bold text-slate-500 mt-0.5 tracking-wide">
            {isRunning ? '（しずかに見守り中…）' : 'タップでなでなでしてね 🌸'}
          </div>
        </div>

        {/* ぽてっとタイマー操作盤 */}
        <PlumpTimerWidget
          isRunning={isRunning}
          displayTimeRef={displayTimeRef}
          ringProgressRef={ringProgressRef}
          onToggle={toggle}
          onReset={() => reset(currentMinutes * 60)}
          onSelectDuration={handleSelectDuration}
          currentDurationMinutes={currentMinutes}
          themeColor={currentTaskObj.color}
          softBgColor={currentTaskObj.bg}
        />
      </main>

      {/* ====================================================
          BOTTOM: 習慣タスク選択ピル（まあるいマカロンボタン）
          ==================================================== */}
      <footer className="w-full max-w-sm flex items-center justify-around gap-2 mt-4 px-2 py-2 rounded-full bg-white/80 backdrop-blur-md border border-slate-200/50 shadow-sm z-10">
        {TASKS.map((task) => {
          const Icon = task.icon;
          const isSelected = selectedTask === task.id;
          return (
            <motion.button
              key={task.id}
              whileTap={{ scale: 0.9 }}
              onClick={() => setSelectedTask(task.id)}
              className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-2xl transition-all cursor-pointer ${
                isSelected
                  ? 'bg-rose-50 border border-rose-200 shadow-sm'
                  : 'opacity-60 hover:opacity-100'
              }`}
            >
              <Icon
                className="w-5 h-5 mb-0.5"
                style={{ color: isSelected ? task.color : '#64748B' }}
              />
              <span
                className={`text-[10px] font-bold ${
                  isSelected ? 'text-slate-800' : 'text-slate-500'
                }`}
              >
                {task.label}
              </span>
            </motion.button>
          );
        })}
      </footer>
    </div>
  );
}

export default CuteHabitTimerApp;
