import React, { useState } from 'react';

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
      // Forzamos un delay mínimo de 800ms para que se vea el estado "ENVIANDO..."
      const [response] = await Promise.all([
        fetch(FORMSPREE_ENDPOINT, {
          method: 'POST',
          body: data,
          headers: { Accept: 'application/json' },
        }),
        new Promise(resolve => setTimeout(resolve, 800))
      ]);

      if (!response.ok) throw new Error('Delivery failed');

      setStatus('success');
      setFeedback('Consulta recibida. Te responderemos en menos de 24h.');
      form.reset();
    } catch {
      setStatus('error');
      setFeedback('No se pudo enviar. Inténtalo de nuevo.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl flex flex-col gap-5" noValidate>
      <label className="flex flex-col gap-2">
        <span className="text-xs font-mono tracking-widest text-neutral-500 uppercase">01 / Nombre o empresa</span>
        <input name="name" type="text" required minLength={2} autoComplete="name" placeholder="¿Cómo te llamas?" className="bg-transparent border border-neutral-800 text-[#ecebe6] px-4 py-3 font-mono text-sm focus:border-neutral-400 focus:outline-none transition-colors placeholder:text-neutral-700" />
      </label>
      <label className="flex flex-col gap-2">
        <span className="text-xs font-mono tracking-widest text-neutral-500 uppercase">02 / Correo</span>
        <input name="email" type="email" required autoComplete="email" placeholder="nombre@empresa.com" className="bg-transparent border border-neutral-800 text-[#ecebe6] px-4 py-3 font-mono text-sm focus:border-neutral-400 focus:outline-none transition-colors placeholder:text-neutral-700" />
      </label>
      <label className="flex flex-col gap-2">
        <span className="text-xs font-mono tracking-widest text-neutral-500 uppercase">03 / Proyecto</span>
        <textarea name="project" required minLength={12} rows={4} placeholder="Cuéntanos qué deseas construir..." className="bg-transparent border border-neutral-800 text-[#ecebe6] px-4 py-3 font-mono text-sm focus:border-neutral-400 focus:outline-none transition-colors resize-none placeholder:text-neutral-700" />
      </label>
      <button type="submit" disabled={status === 'loading'} className="self-start bg-white text-black font-mono text-sm px-6 py-4 hover:bg-neutral-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-3">
        {status === 'loading' ? 'ENVIANDO...' : 'ENVIAR CONSULTA'}
        <span aria-hidden="true">→</span>
      </button>
      {feedback && (
        <p role="status" aria-live="polite" className={`text-sm font-mono ${status === 'success' ? 'text-neutral-300' : 'text-red-400'}`}>
          {feedback}
        </p>
      )}
    </form>
  );
}
