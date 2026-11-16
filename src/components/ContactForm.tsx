import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FORMSPREE_ENDPOINT = import.meta.env.PUBLIC_FORMSPREE_ID
  ? `https://formspree.io/f/${import.meta.env.PUBLIC_FORMSPREE_ID}`
  : '';

type Status = 'idle' | 'loading' | 'success' | 'error';

const SERVICES = [
  'Páginas web y sistemas a la medida',
  'Optimización web (SEO)',
  'Marketing digital y publicidad',
  'Soluciones a la medida',
  'Mantenimiento y soporte técnico',
];

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [feedback, setFeedback] = useState('');
  const [service, setService] = useState(SERVICES[0]);

  useEffect(() => {
    const handler = (e: Event) => {
      const custom = e as CustomEvent<string>;
      if (custom.detail && SERVICES.includes(custom.detail)) {
        setService(custom.detail);
      }
    };
    window.addEventListener('select-service', handler);
    return () => window.removeEventListener('select-service', handler);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (!FORMSPREE_ENDPOINT) {
      setStatus('error');
      setFeedback('Formulario pendiente de configuración.');
      return;
    }
    setStatus('loading');
    setFeedback('');
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      if (!response.ok) throw new Error('Delivery failed');
      setStatus('success');
      setFeedback('Consulta recibida. Te responderemos en menos de 24h.');
      form.reset();
      setService(SERVICES[0]);
    } catch {
      setStatus('error');
      setFeedback('No se pudo enviar. Inténtalo de nuevo.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl flex flex-col gap-5 relative" noValidate>
      <label className="flex flex-col gap-2">
        <span className="text-xs font-mono tracking-widest text-neutral-500 uppercase">01 / Nombre o empresa</span>
        <input name="name" type="text" required minLength={2} autoComplete="name" placeholder="¿Cómo te llamas?" disabled={status === 'loading' || status === 'success'} className="bg-transparent border border-neutral-800 text-[#ecebe6] px-4 py-3 font-mono text-sm focus:border-neutral-400 focus:outline-none transition-colors placeholder:text-neutral-700 disabled:opacity-50" />
      </label>

      <label className="flex flex-col gap-2">
        <span className="text-xs font-mono tracking-widest text-neutral-500 uppercase">02 / Correo</span>
        <input name="email" type="email" required autoComplete="email" placeholder="nombre@empresa.com" disabled={status === 'loading' || status === 'success'} className="bg-transparent border border-neutral-800 text-[#ecebe6] px-4 py-3 font-mono text-sm focus:border-neutral-400 focus:outline-none transition-colors placeholder:text-neutral-700 disabled:opacity-50" />
      </label>

      <label className="flex flex-col gap-2">
        <span className="text-xs font-mono tracking-widest text-neutral-500 uppercase">03 / Teléfono o WhatsApp <span className="text-neutral-700 normal-case">(opcional)</span></span>
        <input name="phone" type="tel" autoComplete="tel" inputMode="tel" placeholder="Ej. +505 8888 0000" disabled={status === 'loading' || status === 'success'} className="bg-transparent border border-neutral-800 text-[#ecebe6] px-4 py-3 font-mono text-sm focus:border-neutral-400 focus:outline-none transition-colors placeholder:text-neutral-700 disabled:opacity-50" />
      </label>

      <label className="flex flex-col gap-2 relative">
        <span className="text-xs font-mono tracking-widest text-neutral-500 uppercase">04 / Servicio de interés</span>
        <div className="relative">
          <select name="service" value={service} onChange={(e) => setService(e.target.value)} disabled={status === 'loading' || status === 'success'} className="w-full bg-[#0c0d0d] border border-neutral-800 text-[#ecebe6] px-4 py-3 font-mono text-sm focus:border-neutral-400 focus:outline-none transition-colors disabled:opacity-50 appearance-none cursor-pointer pr-10">
            {SERVICES.map((s) => (
              <option key={s} value={s} className="bg-[#0c0d0d] text-[#ecebe6]">{s}</option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-neutral-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
          </div>
        </div>
      </label>

      <label className="flex flex-col gap-2">
        <span className="text-xs font-mono tracking-widest text-neutral-500 uppercase">05 / Proyecto</span>
        <textarea name="project" required minLength={12} rows={4} placeholder="Cuéntanos qué deseas construir..." disabled={status === 'loading' || status === 'success'} className="bg-transparent border border-neutral-800 text-[#ecebe6] px-4 py-3 font-mono text-sm focus:border-neutral-400 focus:outline-none transition-colors resize-none placeholder:text-neutral-700 disabled:opacity-50" />
      </label>

      <div className="flex flex-col gap-2 mt-2">
        <button type="submit" disabled={status === 'loading' || status === 'success'} className="self-start bg-white text-black font-mono text-sm px-6 py-4 hover:bg-neutral-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-3 overflow-hidden relative">
          {status === 'loading' ? 'ENVIANDO...' : status === 'success' ? 'ENVIADO ✓' : 'ENVIAR CONSULTA'}
          {status === 'idle' && <span aria-hidden="true">→</span>}
          {status === 'loading' && (
            <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.15, ease: 'easeOut' }} className="absolute bottom-0 left-0 h-1 bg-black origin-left w-full" />
          )}
        </button>

        <AnimatePresence>
          {status === 'success' && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: 'easeOut' }} className="text-sm font-mono text-neutral-300">
              <p className="flex items-center gap-2 mt-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                {feedback}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {status === 'error' && (
          <p role="status" className="text-sm font-mono text-red-400 mt-2">{feedback}</p>
        )}
      </div>
    </form>
  );
}
