import React, { useState, useEffect, useRef, useCallback } from 'react';

const WORD_1 = "Brutal".split('');
const WORD_2 = "Devs".split('');
const TOTAL = WORD_1.length + WORD_2.length;

type State = 'off' | 'flickering' | 'lit';

export default function HeroLamp() {
  const [states, setStates] = useState<State[]>(Array(TOTAL).fill('off'));
  const [hot, setHot] = useState<Record<number, boolean>>({});
  const [bgVisible, setBgVisible] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const runSequence = useCallback(() => {
    clearTimers();
    setStates(Array(TOTAL).fill('off'));
    setBgVisible(false);

    for (let i = 0; i < TOTAL; i++) {
      const delay = 80 + i * 55;
      const t1 = setTimeout(() => {
        setStates(prev => {
          const n = [...prev]; n[i] = 'flickering'; return n;
        });
      }, delay);
      const t2 = setTimeout(() => {
        setStates(prev => {
          const n = [...prev]; if (n[i] === 'flickering') n[i] = 'lit'; return n;
        });
      }, delay + 700);
      timers.current.push(t1, t2);
    }

    const bgStart = setTimeout(() => setBgVisible(true), 80 + 6 * 55 + 250);
    timers.current.push(bgStart);
  }, []);

  useEffect(() => {
    runSequence();
    return clearTimers;
  }, [runSequence]);

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse' || !stageRef.current) return;
    const nh: Record<number, boolean> = {};
    stageRef.current.querySelectorAll('.lamp-letter').forEach((el, i) => {
      const b = el.getBoundingClientRect();
      const d = Math.hypot(b.left + b.width / 2 - e.clientX, b.top + b.height / 2 - e.clientY);
      if (d < 130) nh[i] = true;
    });
    setHot(nh);
  };
  const onLeave = () => setHot({});

  const onTouch = (e: React.TouchEvent) => {
    const t = e.touches[0];
    const el = document.elementFromPoint(t.clientX, t.clientY);
    if (el?.classList.contains('lamp-letter')) {
      const letters = Array.from(stageRef.current?.querySelectorAll('.lamp-letter') || []);
      const i = letters.indexOf(el as Element);
      if (i !== -1) {
        setHot(p => ({ ...p, [i]: true }));
        setTimeout(() => setHot(p => ({ ...p, [i]: false })), 700);
      }
    }
  };

  const onCta = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const renderWord = (word: string[], offset: number) => (
    <span className="flex whitespace-nowrap items-baseline w-fit max-w-full">
      {word.map((c, i) => {
        const idx = i + offset;
        const st = states[idx];
        const isHot = hot[idx];
        let cls = 'lamp-letter inline-block select-none cursor-default ';
        if (st === 'flickering') {
          cls += 'lamp-warmup text-[#ecebe6]';
        } else if (isHot) {
          cls += 'text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.9)] transition-all duration-200';
        } else if (st === 'lit') {
          cls += 'text-[#ecebe6] drop-shadow-[0_0_8px_rgba(255,255,255,0.25)] transition-all duration-500';
        } else {
          cls += 'text-[#3a3a3a] opacity-30 transition-all duration-300';
        }
        return <span key={idx} className={cls}>{c}</span>;
      })}
    </span>
  );

  return (
    <>
      <style>{`
        @keyframes warmup {
          0%   { opacity: 0;    text-shadow: none; }
          40%  { opacity: 0.85; text-shadow: 0 0 20px rgba(255,255,255,0.85); }
          55%  { opacity: 0.5;  text-shadow: 0 0 6px rgba(255,255,255,0.5); }
          100% { opacity: 1;    text-shadow: 0 0 10px rgba(255,255,255,0.3); }
        }
        .lamp-warmup { animation: warmup 0.7s ease-out forwards; }
        @media (prefers-reduced-motion: reduce) {
          .lamp-warmup { animation: none; opacity: 1; text-shadow: 0 0 10px rgba(255,255,255,0.3); }
        }
      `}</style>

      <div
        ref={stageRef}
        className="relative w-full max-w-7xl mx-auto px-6 py-20 flex flex-col justify-center min-h-[80vh]"
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        onTouchStart={onTouch}
      >
        <div
          className={`absolute inset-0 flex items-center justify-center pointer-events-none z-0 transition-opacity ease-out ${
            bgVisible ? 'opacity-[0.08] duration-[1800ms]' : 'opacity-0 duration-300'
          }`}
        >
          <img
            src="/logo.svg"
            alt=""
            aria-hidden="true"
            className="w-[80%] max-w-3xl"
            style={{ filter: 'invert(1)' }}
          />
        </div>

        <div className="relative z-10 flex flex-col items-start">
          <h1 className="font-sans font-black text-[clamp(64px,15vw,200px)] leading-[0.85] tracking-tight m-0 text-[#ecebe6]">
            {renderWord(WORD_1, 0)}
            <span className="block">{renderWord(WORD_2, WORD_1.length)}</span>
          </h1>
        </div>

        <div className="relative z-10 mt-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-t border-neutral-800 pt-8">
          <p className="max-w-md text-lg text-neutral-400 font-mono leading-relaxed">
            Construimos sistemas que no se improvisan.<br />
            <span className="text-neutral-600">Arquitectura digital. Ingeniería de software.</span>
          </p>
          <a
            href="#contacto"
            onClick={onCta}
            className="group bg-white text-black font-mono text-sm px-6 py-4 hover:bg-neutral-200 transition-colors inline-flex items-center gap-3"
          >
            HABLEMOS DE TU PRÓXIMO PROYECTO
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </div>
      </div>
    </>
  );
}
