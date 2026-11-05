import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * CompanionCharacter - Rive対応 ＆ ぽてかわフォールバック搭載の相棒キャラクター
 * 
 * 【特徴】
 * 1. Rive (.riv) ファイル指定時は GPUアクセラレーションによる超軽量ステートマシンアニメーション
 * 2. Riveファイル未指定時も、SVG+CSS Springによる「もっちり・ぷるぷる」癒やしキャラが即座に動作
 * 3. タイマー状態（待機・集中中・達成）やタップ（なでなで）に完全連動
 */
export function CompanionCharacter({
  riveSrc = null, // 例: '/assets/rive/cute_cat.riv'
  stateMachine = 'State Machine 1',
  isFocusing = false,
  isCelebrated = false,
  mood = 'happy', // 'idle' | 'happy' | 'focus' | 'sleepy'
  onPet,
  className = '',
  size = 180,
}) {
  const [petCount, setPetCount] = useState(0);
  const [hearts, setHearts] = useState([]);

  // なでなで（タップ）インタラクション
  const handlePet = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newHeart = {
      id: Date.now() + Math.random(),
      x: x || size / 2,
      y: y || size / 2,
    };

    setHearts((prev) => [...prev.slice(-4), newHeart]);
    setPetCount((c) => c + 1);

    if (onPet) {
      onPet();
    }
  };

  // ハート消滅タイマー
  useEffect(() => {
    if (hearts.length === 0) return;
    const timer = setTimeout(() => {
      setHearts((prev) => prev.slice(1));
    }, 1200);
    return () => clearTimeout(timer);
  }, [hearts]);

  return (
    <div
      onClick={handlePet}
      className={`relative select-none cursor-pointer flex flex-col items-center justify-center touch-manipulation group ${className}`}
      style={{ width: size, height: size }}
    >
      {/* タップした時に飛び出すハートエフェクト */}
      <AnimatePresence>
        {hearts.map((h) => (
          <motion.div
            key={h.id}
            initial={{ opacity: 1, scale: 0.6, y: 0 }}
            animate={{ opacity: 0, scale: 1.4, y: -45, x: (Math.random() - 0.5) * 30 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="absolute pointer-events-none text-rose-400 z-30 font-bold"
            style={{ left: h.x - 10, top: h.y - 20 }}
          >
            🌸
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Riveファイルが提供されている場合はRiveCanvas、それ以外はSVGフォールバック */}
      {riveSrc ? (
        <RiveCanvasContainer
          src={riveSrc}
          stateMachine={stateMachine}
          isFocusing={isFocusing}
          isCelebrated={isCelebrated}
          size={size}
        />
      ) : (
        <KawaiiSquishyFallback
          isFocusing={isFocusing}
          isCelebrated={isCelebrated}
          size={size}
        />
      )}

      {/* 足元のぽよぽよ影 */}
      <motion.div
        animate={
          isCelebrated
            ? { scale: [0.7, 0.4, 0.7], opacity: [0.2, 0.08, 0.2] }
            : isFocusing
            ? { scale: [1, 0.95, 1], opacity: [0.25, 0.2, 0.25] }
            : { scale: [1, 0.9, 1], opacity: [0.25, 0.18, 0.25] }
        }
        transition={{
          duration: isCelebrated ? 0.6 : isFocusing ? 1.4 : 2.2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="w-24 h-4 bg-amber-950/15 rounded-full blur-[2px] mt-1"
      />
    </div>
  );
}

/**
 * Rive Canvas コンテナ
 * ※ @rive-app/react-canvas がインストールされている環境でシームレスに動作
 */
function RiveCanvasContainer({ src, stateMachine, isFocusing, isCelebrated, size }) {
  const [RiveComponent, setRiveComponent] = useState(null);

  useEffect(() => {
    let mounted = true;
    import('@rive-app/react-canvas')
      .then((rive) => {
        if (!mounted) return;
        const Component = () => {
          const { RiveComponent: Canvas, rive: riveInstance } = rive.useRive({
            src,
            stateMachines: stateMachine,
            autoplay: true,
          });

          // State Machineの入力バインド
          const isWorkingInput = rive.useStateMachineInput(riveInstance, stateMachine, 'isFocusing');
          const celebrateInput = rive.useStateMachineInput(riveInstance, stateMachine, 'triggerCelebrate');

          useEffect(() => {
            if (isWorkingInput) isWorkingInput.value = isFocusing;
          }, [isWorkingInput, isFocusing]);

          useEffect(() => {
            if (celebrateInput && isCelebrated) celebrateInput.fire();
          }, [celebrateInput, isCelebrated]);

          return <Canvas style={{ width: size, height: size }} />;
        };
        setRiveComponent(() => Component);
      })
      .catch(() => {
        // @rive-app/react-canvas が未インストールの場合はフォールバックへ
        setRiveComponent(null);
      });

    return () => {
      mounted = false;
    };
  }, [src, stateMachine, size, isFocusing, isCelebrated]);

  if (!RiveComponent) {
    return <KawaiiSquishyFallback isFocusing={isFocusing} isCelebrated={isCelebrated} size={size} />;
  }

  return <RiveComponent />;
}

/**
 * ぽてかわフォールバックキャラクター「もちまる (Mochimaru)」
 * SVG + CSSスプリングによる、もっちり・ぷるぷるの愛されベクター相棒
 */
function KawaiiSquishyFallback({ isFocusing, isCelebrated, size }) {
  // まばたきアニメーション
  const [isBlinking, setIsBlinking] = useState(false);

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 160);
    }, 3800);
    return () => clearInterval(blinkInterval);
  }, []);

  return (
    <motion.div
      animate={
        isCelebrated
          ? {
              y: [0, -28, 0, -18, 0],
              scaleX: [1, 0.88, 1.15, 0.92, 1],
              scaleY: [1, 1.18, 0.88, 1.1, 1],
              rotate: [0, -8, 8, -4, 0],
            }
          : isFocusing
          ? {
              y: [0, -4, 0],
              scaleX: [1, 1.03, 1],
              scaleY: [1, 0.97, 1],
            }
          : {
              y: [0, -8, 0],
              scaleX: [1, 1.05, 1],
              scaleY: [1, 0.95, 1],
            }
      }
      transition={{
        duration: isCelebrated ? 0.9 : isFocusing ? 1.6 : 2.4,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      className="relative flex items-center justify-center filter drop-shadow-[0_8px_16px_rgba(255,182,193,0.35)]"
      style={{ width: size * 0.85, height: size * 0.85 }}
    >
      <svg
        viewBox="0 0 160 160"
        className="w-full h-full overflow-visible"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* もち肌のふんわりグラデーション */}
          <linearGradient id="mochiBodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFF9F5" />
            <stop offset="60%" stopColor="#FFEFE8" />
            <stop offset="100%" stopColor="#FED7D7" />
          </linearGradient>

          {/* ほっぺのやわらかチーク */}
          <radialGradient id="cheekGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FF7E95" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#FF7E95" stopOpacity="0" />
          </radialGradient>

          {/* 頭のふたば */}
          <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A7F3D0" />
            <stop offset="100%" stopColor="#34D399" />
          </linearGradient>
        </defs>

        {/* 頭のふたば（集中中や達成時にピコピコ動く） */}
        <motion.g
          animate={
            isCelebrated
              ? { rotate: [-15, 20, -15], scale: [1, 1.25, 1] }
              : isFocusing
              ? { rotate: [-5, 5, -5] }
              : { rotate: [-2, 2, -2] }
          }
          transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ originX: '80px', originY: '38px' }}
        >
          <path
            d="M80 38 C75 22 62 18 64 12 C74 12 80 26 80 38 Z"
            fill="url(#leafGrad)"
          />
          <path
            d="M80 38 C85 24 98 20 96 14 C86 14 80 28 80 38 Z"
            fill="url(#leafGrad)"
          />
        </motion.g>

        {/* もっちりボディ（ぽてっとした愛され有機シェイプ） */}
        <path
          d="M80 32
             C122 32, 142 62, 142 98
             C142 134, 118 144, 80 144
             C42 144, 18 134, 18 98
             C18 62, 38 32, 80 32 Z"
          fill="url(#mochiBodyGrad)"
          stroke="#FCA5A5"
          strokeWidth="2.5"
        />

        {/* ふんわりチーク（ピンクのぽわぽわ） */}
        <ellipse cx="44" cy="100" rx="14" ry="8" fill="url(#cheekGlow)" />
        <ellipse cx="116" cy="100" rx="14" ry="8" fill="url(#cheekGlow)" />

        {/* おめめ（まばたき＆状態変化） */}
        {isCelebrated ? (
          // 達成時：にっこり三日月目 (^^)
          <g stroke="#4A3E3D" strokeWidth="3.5" strokeLinecap="round" fill="none">
            <path d="M48 88 Q56 80 64 88" />
            <path d="M96 88 Q104 80 112 88" />
          </g>
        ) : isBlinking ? (
          // まばたき時：線目 (-)
          <g stroke="#4A3E3D" strokeWidth="3.5" strokeLinecap="round" fill="none">
            <line x1="48" y1="88" x2="64" y2="88" />
            <line x1="96" y1="88" x2="112" y2="88" />
          </g>
        ) : isFocusing ? (
          // 集中中：真剣だけど愛らしいキラキラ目
          <g fill="#4A3E3D">
            <ellipse cx="56" cy="88" rx="6" ry="7" />
            <ellipse cx="104" cy="88" rx="6" ry="7" />
            <circle cx="58" cy="86" r="2.2" fill="#FFFFFF" />
            <circle cx="106" cy="86" r="2.2" fill="#FFFFFF" />
            {/* 集中ハチマキ or 汗 */}
            <circle cx="124" cy="74" r="2.5" fill="#93C5FD" />
          </g>
        ) : (
          // 通常待機：うるうる丸目
          <g fill="#4A3E3D">
            <circle cx="56" cy="88" r="6" />
            <circle cx="104" cy="88" r="6" />
            <circle cx="58" cy="85.5" r="2.2" fill="#FFFFFF" />
            <circle cx="106" cy="85.5" r="2.2" fill="#FFFFFF" />
            <circle cx="54" cy="89.5" r="1.2" fill="#FFFFFF" />
            <circle cx="102" cy="89.5" r="1.2" fill="#FFFFFF" />
          </g>
        )}

        {/* おくち（ちいさなω口） */}
        {isCelebrated ? (
          <path
            d="M74 97 Q80 106 86 97"
            stroke="#4A3E3D"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="#FF7E95"
          />
        ) : (
          <path
            d="M74 96 Q77 99 80 96 Q83 99 86 96"
            stroke="#4A3E3D"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
        )}

        {/* ちょこんとしたお手て */}
        <ellipse cx="38" cy="116" rx="7" ry="5" fill="#FFEFE8" stroke="#FCA5A5" strokeWidth="2" />
        <ellipse cx="122" cy="116" rx="7" ry="5" fill="#FFEFE8" stroke="#FCA5A5" strokeWidth="2" />
      </svg>
    </motion.div>
  );
}
