import React from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw, Sparkles } from 'lucide-react';

/**
 * PlumpTimerWidget - ぽてっとかわいい＆超軽量タイマー操作盤
 * 
 * 【デザイン哲学】
 * 1. ぽってりとした角丸（rounded-[36px]）とソフトなクレイモーフィズムシャドウ
 * 2. マカロン＆パステルトーン（ストロベリーミルク、ミルキーピスタチオ、ハニーカスタード）
 * 3. むにゅっと押せるバウンス感のある触感インタラクション
 * 4. DOM直接更新（useAtomicTimerと連携）により、タイマー稼働中も親の再レンダリング0回で動作
 */
export function PlumpTimerWidget({
  isRunning,
  displayTimeRef,
  ringProgressRef,
  onToggle,
  onReset,
  onSelectDuration,
  currentDurationMinutes = 25,
  themeColor = '#FF8DA1', // さくらストロベリー
  softBgColor = '#FFF5F6',
}) {
  const PRESET_DURATIONS = [
    { label: '5分', minutes: 5, emoji: '🌱' },
    { label: '15分', minutes: 15, emoji: '☕' },
    { label: '25分', minutes: 25, emoji: '🍅' },
    { label: '45分', minutes: 45, emoji: '📚' },
  ];

  // SVGサークルの定数
  const radius = 108;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="relative w-full max-w-[340px] flex flex-col items-center select-none">
      {/* ぽってりクッション背景カード */}
      <div
        className="w-full rounded-[38px] p-6 flex flex-col items-center transition-all duration-300"
        style={{
          backgroundColor: '#FFFFFF',
          boxShadow: `
            0 16px 36px -10px ${themeColor}28,
            0 2px 10px rgba(0, 0, 0, 0.03),
            inset 0 3px 6px #FFFFFF,
            inset 0 -3px 6px rgba(0, 0, 0, 0.02)
          `,
          border: `2px solid ${themeColor}20`,
        }}
      >
        {/* 円形プログレス＆タイマーディスプレイ */}
        <div className="relative w-56 h-56 flex items-center justify-center my-2">
          {/* SVGプログレスリング */}
          <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 240 240">
            <defs>
              <linearGradient id="cuteRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFA6B7" />
                <stop offset="100%" stopColor="#FF708A" />
              </linearGradient>
              <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor={themeColor} floodOpacity="0.25" />
              </filter>
            </defs>

            {/* 背景トラック（淡いマカロンピンク） */}
            <circle
              cx="120"
              cy="120"
              r={radius}
              stroke={softBgColor}
              strokeWidth="16"
              fill="none"
              strokeLinecap="round"
            />

            {/* 進捗リング（DOM直接更新により0再レンダリングでヌルヌル駆動） */}
            <circle
              ref={ringProgressRef}
              data-circumference={circumference}
              cx="120"
              cy="120"
              r={radius}
              stroke="url(#cuteRingGrad)"
              strokeWidth="16"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={0}
              strokeLinecap="round"
              filter="url(#softGlow)"
              className="transition-[stroke-dashoffset] duration-300 ease-out"
            />
          </svg>

          {/* 中央のまあるいタイマー文字盤 */}
          <motion.div
            whileTap={{ scale: 0.95 }}
            onClick={onToggle}
            className="absolute w-40 h-40 rounded-full flex flex-col items-center justify-center cursor-pointer transition-transform"
            style={{
              backgroundColor: '#FFFDF9',
              boxShadow: `
                0 6px 16px rgba(0, 0, 0, 0.05),
                inset 0 2px 4px #FFFFFF,
                inset 0 -2px 6px rgba(255, 141, 161, 0.1)
              `,
              border: `1.5px solid ${themeColor}25`,
            }}
          >
            {/* 集中中サイン */}
            <div className="flex items-center gap-1 text-[11px] font-bold tracking-wider text-amber-700/60 mb-0.5">
              {isRunning ? (
                <span className="flex items-center gap-1 text-rose-400 animate-pulse">
                  <Sparkles className="w-3 h-3 fill-rose-300" />
                  いっしょに集中中
                </span>
              ) : (
                <span>タップでスタート</span>
              )}
            </div>

            {/* タイマーカウントダウン（DOM直接更新） */}
            <div
              ref={displayTimeRef}
              className="text-[42px] font-extrabold tracking-tight tabular-nums text-slate-700 font-sans leading-none my-1"
              style={{
                fontFamily: 'ui-rounded, "Hiragino Maru Gothic ProN", "Quicksand", "Nunito", sans-serif',
              }}
            >
              25:00
            </div>

            {/* 再生/一時停止アイコン */}
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center mt-1 transition-all"
              style={{
                backgroundColor: isRunning ? '#FFF0F2' : '#F0FBF6',
                color: isRunning ? '#FF6B8B' : '#34D399',
              }}
            >
              {isRunning ? (
                <Pause className="w-4 h-4 fill-current" />
              ) : (
                <Play className="w-4 h-4 fill-current ml-0.5" />
              )}
            </div>
          </motion.div>
        </div>

        {/* ぷっくり時間プリセットピル */}
        <div className="w-full flex items-center justify-center gap-2 mt-4 mb-2">
          {PRESET_DURATIONS.map((preset) => {
            const isSelected = currentDurationMinutes === preset.minutes;
            return (
              <motion.button
                key={preset.minutes}
                whileTap={{ scale: 0.92 }}
                onClick={() => onSelectDuration(preset.minutes)}
                disabled={isRunning}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                  isSelected
                    ? 'bg-rose-400 text-white shadow-md shadow-rose-200'
                    : 'bg-slate-100/80 text-slate-600 hover:bg-slate-200/70'
                } ${isRunning ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <span>{preset.emoji}</span>
                <span>{preset.label}</span>
              </motion.button>
            );
          })}
        </div>

        {/* リセットボタン（ぽよんボタン） */}
        <div className="flex items-center justify-center mt-2">
          <motion.button
            whileTap={{ scale: 0.88 }}
            onClick={onReset}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-2xl text-xs font-bold text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            title="タイマーを最初に戻す"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>リセット</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
}
