import React, { useState, useEffect, useRef, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Check } from 'lucide-react';

/**
 * AtomicTimerDisplay - 局所ステート隔離型・超軽量ぽてかわタイマー盤
 * 
 * 【Opus 5.5 監査に基づくアーキテクチャ最適化】
 * 1. 親（App.jsx / 13,000行）を一切再レンダリングさせず、この超軽量子コンポーネント内のみで
 *    1秒に1回のローカルステート（localRemainingMs）を更新。
 * 2. Reactの宣言的ツリーを壊さないため、DOMデタッチによるクラッシュ（NotFoundError）を根絶。
 * 3. Hourglass（砂時計）、Liquid（水面）、Pulse（波紋）、リングプログレスが全て完全かつ美しく連動。
 * 4. 完了判定は親側（App.jsx）に一元化し、多重完了コールバックを防止。
 * 5. durationMs は getTaskSetMinutes ヘルパーから算出した正確なセット時間を適用。
 */
export const AtomicTimerDisplay = memo(function AtomicTimerDisplay({
  isRunning,
  endTimestamp,
  durationMs,
  initialRemainingMs,
  timerStyle = 'ring',
  activeCategory,
  currentTheme,
  justCompleted,
  activeTask,
  toggleTimer,
  formatTime,
  HourglassTimerVisual,
  getTaskTotalSets,
  getTaskCompletedSets,
}) {
  // 親の巨大ツリーを隔離し、この小さな子コンポーネント内だけで残り時間を保持
  const [localRemainingMs, setLocalRemainingMs] = useState(
    () => (initialRemainingMs > 0 ? initialRemainingMs : durationMs)
  );

  // 外部からの initialRemainingMs や durationMs の変更を同期
  useEffect(() => {
    if (!isRunning) {
      const base = initialRemainingMs > 0 ? initialRemainingMs : durationMs;
      setLocalRemainingMs(base);
    }
  }, [isRunning, initialRemainingMs, durationMs]);

  // 1秒境界スロットリング型ローカルタイマーループ
  useEffect(() => {
    if (!isRunning || !endTimestamp) return;

    let animId = null;
    let lastSec = -1;

    const tick = () => {
      const now = Date.now();
      const diff = Math.max(0, endTimestamp - now);
      const sec = Math.ceil(diff / 1000);

      if (sec !== lastSec) {
        lastSec = sec;
        setLocalRemainingMs(diff);

        // タブタイトルの更新
        if (activeTask?.title && formatTime) {
          document.title = `${formatTime(diff)} - ${activeTask.title}`;
        }
      }

      if (diff > 0) {
        animId = requestAnimationFrame(tick);
      }
    };

    animId = requestAnimationFrame(tick);

    const handleVisibility = () => {
      if (document.visibilityState === 'visible' && endTimestamp) {
        const diff = Math.max(0, endTimestamp - Date.now());
        setLocalRemainingMs(diff);
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      if (animId) cancelAnimationFrame(animId);
      document.removeEventListener('visibilitychange', handleVisibility);
      document.title = '習慣タイマー';
    };
  }, [isRunning, endTimestamp, activeTask?.title, formatTime]);

  // 進捗率の計算
  const progress = durationMs > 0 ? Math.max(0, Math.min(1, localRemainingMs / durationMs)) : 0;
  const formattedCountdown = formatTime ? formatTime(localRemainingMs) : '00:00';
  const isLongFormat = formattedCountdown.length > 5;

  const radius = 124;
  const circumference = 2 * Math.PI * radius;
  const strokeOffset = circumference * progress;

  const ActiveIcon = activeCategory?.icon;
  const totalSets = getTaskTotalSets ? getTaskTotalSets(activeTask) : 1;
  const completedSets = getTaskCompletedSets ? getTaskCompletedSets(activeTask) : 0;

  return (
    <div className="relative z-30 w-[min(19rem,74vw,33dvh)] h-[min(19rem,74vw,33dvh)] max-w-[304px] max-h-[304px] flex items-center justify-center select-none touch-manipulation">
      {/* リキッド演出 */}
      {timerStyle === 'liquid' && (
        <div
          className={`absolute inset-4 rounded-full overflow-hidden backdrop-blur-2xl border transition-all duration-500 ${currentTheme?.card || ''}`}
        >
          <div
            className="absolute bottom-0 left-0 right-0 transition-all duration-300"
            style={{
              height: `${Math.max(4, (1 - progress) * 100)}%`,
              backgroundColor: activeCategory?.color,
              opacity: 0.38,
              boxShadow: `0 -10px 30px ${activeCategory?.glow}`,
            }}
          >
            {isRunning && (
              <motion.div
                animate={{ x: ['-25%', '0%', '-25%'] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="w-[200%] h-6 -mt-3 rounded-[100%] opacity-60"
                style={{ backgroundColor: activeCategory?.color }}
              />
            )}
          </div>
        </div>
      )}

      {/* パルス演出 */}
      {timerStyle === 'pulse' && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {[0, 1, 2].map((idx) => (
            <motion.div
              key={idx}
              animate={
                isRunning
                  ? {
                      scale: [1, 1.08 + idx * 0.05, 1],
                      opacity: [0.35 - idx * 0.08, 0.12, 0.35 - idx * 0.08],
                    }
                  : { scale: 1, opacity: 0.15 }
              }
              transition={{
                duration: 2.6,
                delay: idx * 0.4,
                repeat: isRunning ? Infinity : 0,
                ease: 'easeInOut',
              }}
              className="absolute rounded-full border-2"
              style={{
                width: `${82 - idx * 12}%`,
                height: `${82 - idx * 12}%`,
                borderColor: activeCategory?.color,
                backgroundColor: idx === 2 ? activeCategory?.glow : 'transparent',
              }}
            />
          ))}
        </div>
      )}

      {/* SVG サークルプログレス */}
      <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 280 280">
        <defs>
          <filter id="cuteAtomicGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* 背景トラック */}
        <circle
          cx="140"
          cy="140"
          r={radius}
          stroke={currentTheme?.ringTrack || 'rgba(0,0,0,0.1)'}
          strokeWidth={timerStyle === 'ring' ? '16' : '7'}
          fill="none"
        />

        {/* 目盛りライン */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * 30 * Math.PI) / 180;
          const x1 = 140 + 105 * Math.cos(angle);
          const y1 = 140 + 105 * Math.sin(angle);
          const x2 = 140 + 111 * Math.cos(angle);
          const y2 = 140 + 111 * Math.sin(angle);
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="currentColor"
              strokeOpacity={0.22}
              strokeWidth="2.4"
              strokeLinecap="round"
            />
          );
        })}

        {/* プログレスリング */}
        <circle
          cx="140"
          cy="140"
          r={radius}
          stroke={activeCategory?.color}
          strokeWidth={timerStyle === 'ring' ? '16' : '9'}
          strokeLinecap="round"
          fill="none"
          filter="url(#cuteAtomicGlow)"
          strokeDasharray={circumference}
          strokeDashoffset={strokeOffset}
          className="transition-[stroke-dashoffset] duration-300 ease-linear"
        />
      </svg>

      {/* 中央ぽってりボタン盤（むにゅっと押せるバウンス感） */}
      <motion.div
        whileTap={{ scale: 0.94 }}
        onClick={toggleTimer}
        className={`relative z-30 w-[min(11.8rem,46vw,20.5dvh)] h-[min(11.8rem,46vw,20.5dvh)] max-w-[190px] max-h-[190px] rounded-full backdrop-blur-2xl border flex flex-col items-center justify-center cursor-pointer transition-all px-2 select-none touch-manipulation ${currentTheme?.card || ''}`}
        style={{
          boxShadow: isRunning ? `0 0 48px ${activeCategory?.glow}` : undefined,
        }}
      >
        <AnimatePresence mode="wait">
          {justCompleted || (activeTask && activeTask.completed) ? (
            <motion.div
              key="completed-check"
              initial={{ scale: 0.3, opacity: 0, rotate: -30 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 16 }}
              className="flex flex-col items-center justify-center gap-2"
            >
              <div
                className="w-24 h-24 rounded-full flex items-center justify-center shadow-lg"
                style={{
                  backgroundColor: activeCategory?.color,
                  boxShadow: `0 0 30px ${activeCategory?.glow}`,
                }}
              >
                <Check className="w-12 h-12 text-white stroke-[3]" />
              </div>
              {totalSets > 1 && (
                <span className="font-mono text-xs font-extrabold tracking-tight">
                  {activeTask?.completed
                    ? `全${totalSets}セット完了`
                    : `セット ${completedSets} / ${totalSets} 完了`}
                </span>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="active-countdown"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className={`flex flex-col items-center justify-center ${
                timerStyle === 'hourglass' ? 'gap-1' : 'gap-2'
              }`}
            >
              {timerStyle === 'hourglass' && HourglassTimerVisual ? (
                <HourglassTimerVisual
                  progress={progress}
                  color={activeCategory?.color}
                  glow={activeCategory?.glow}
                  isRunning={isRunning}
                  height={92}
                />
              ) : (
                ActiveIcon && (
                  <motion.div
                    animate={
                      isRunning
                        ? { y: [0, -4, 0], scale: [1, 1.08, 1] }
                        : { y: 0, scale: 1 }
                    }
                    transition={{
                      duration: 2.2,
                      repeat: isRunning ? Infinity : 0,
                      ease: 'easeInOut',
                    }}
                    className="p-3.5 rounded-2xl transition-transform"
                    style={{ backgroundColor: activeCategory?.softBg }}
                  >
                    <ActiveIcon
                      className="w-8 h-8"
                      style={{ color: activeCategory?.color }}
                    />
                  </motion.div>
                )
              )}

              {/* カウントダウン表示（フォントサイズオーバーフロー防止） */}
              <div
                className={`font-mono font-bold tracking-tight tabular-nums leading-none my-1 ${
                  isLongFormat ? 'text-3xl sm:text-4xl' : 'text-5xl sm:text-[3.25rem]'
                }`}
                style={{
                  fontFamily: 'ui-rounded, "Hiragino Maru Gothic ProN", "Quicksand", "Nunito", sans-serif',
                }}
              >
                {formattedCountdown}
              </div>

              {/* 再生/一時停止アイコン */}
              <div className="opacity-55 mt-0.5">
                {isRunning ? (
                  <Pause className="w-5 h-5 fill-current" />
                ) : (
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
});
