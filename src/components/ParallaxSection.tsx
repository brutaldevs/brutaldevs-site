import React, { useRef, useEffect, useState } from 'react';

interface ParallaxSectionProps {
  children: React.ReactNode;
  id?: string;
}

export default function ParallaxSection({ children, id }: ParallaxSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0); // 0 → 1 según scroll

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let ticking = false;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // Progress: 0 cuando la sección entra por abajo, 1 cuando sale por arriba
      const p = Math.max(0, Math.min(1, (vh - rect.top) / (vh + rect.height)));
      setProgress(p);
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  // Capas con velocidades diferenciadas (20%, 40%, 60% del desplazamiento)
  // Usamos translate3d para aceleración por hardware
  const bgOffset = progress * 80 - 40;      // Fondo: se mueve 80px en total (20-40% feel)
  const midOffset = progress * 160 - 80;    // Medio: se mueve 160px (40-60% feel)
  const fgOffset = progress * 240 - 120;    // Primer plano: se mueve 240px (60-80% feel)

  return (
    <section ref={ref} id={id} className="relative border-t border-neutral-800 overflow-clip">
      {/* Capa de fondo: gradiente sutil que se mueve lento */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          transform: `translate3d(0, ${bgOffset}px, 0)`,
          willChange: 'transform',
          background: 'radial-gradient(ellipse at 50% 0%, rgba(60,60,60,0.08) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Capa media: línea vertical que se mueve a velocidad media */}
      <div
        className="absolute left-1/2 top-0 w-px h-full bg-gradient-to-b from-transparent via-neutral-800/40 to-transparent pointer-events-none"
        style={{
          transform: `translate3d(0, ${midOffset}px, 0)`,
          willChange: 'transform',
        }}
        aria-hidden="true"
      />

      {/* Capa de primer plano: el contenido que se mueve más rápido */}
      <div
        className="relative w-full max-w-7xl mx-auto px-6 py-28"
        style={{
          transform: `translate3d(0, ${fgOffset}px, 0)`,
          willChange: 'transform',
        }}
      >
        {children}
      </div>
    </section>
  );
}
