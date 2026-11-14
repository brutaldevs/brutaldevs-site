import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FORMSPREE_ENDPOINT = import.meta.env.PUBLIC_FORMSPREE_ID
  ? `https://formspree.io/f/${import.meta.env.PUBLIC_FORMSPREE_ID}`
  : '';

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [feedback, setFeedback] = useState('');

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

      // Sin setTimeout: en cuanto Formspree responde, cambiamos al estado success
      setStatus('success');
      setFeedback('Consulta recibida. Te responderemos en menos de 24h.');
      form.reset();
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
        <span className="text-xs font-mono tracking-widest text-neutral-500 uppercase">03 / Proyecto</span>
        <textarea name="project" required minLength={12} rows={4} placeholder="Cuéntanos qué deseas construir..." disabled={status === 'loading' || status === 'success'} className="bg-transparent border border-neutral-800 text-[#ecebe6] px-4 py-3 font-mono text-sm focus:border-neutral-400 focus:outline-none transition-colors resize-none placeholder:text-neutral-700 disabled:opacity-50" />
      </label>

      <div className="flex flex-col gap-2 mt-2">
        <button type="submit" disabled={status === 'loading' || status === 'success'} className="self-start bg-white text-black font-mono text-sm px-6 py-4 hover:bg-neutral-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-3 overflow-hidden relative">
          {status === 'loading' ? 'ENVIANDO...' : status === 'success' ? 'ENVIADO ✓' : 'ENVIAR CONSULTA'}
          {status === 'idle' && <span aria-hidden="true">→</span>}

          {status === 'loading' && (
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
              className="absolute bottom-0 left-0 h-1 bg-black origin-left w-full"
            />
          )}
        </button>

        <AnimatePresence>
          {status === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="text-sm font-mono text-neutral-300"
            >
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
