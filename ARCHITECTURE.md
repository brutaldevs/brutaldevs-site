# ARCHITECTURE — BrutalDevs Site

> Decisiones tecnicas del proyecto. Cualquier cambio estructural debe respetar este documento o justificar una enmienda.

## 1. Vista general

Sitio estatico Astro con islas React selectivas. Home en /, blog pendiente en /blog/*, API interna pendiente en /api/chat. Sin SSR obligatorio: todo el HTML critico se sirve estatico para crawlers y LLMs.

## 2. Stack y justificacion

| Capa | Tech | Version | Por que |
| :--- | :--- | :--- | :--- |
| Framework | Astro | 5.18.2 | HTML estatico, cero JS por defecto, ideal AEO/GEO |
| Islas | React | 18.3.1 | Interactividad quirurgica (Hero, Form, Chat) |
| Estilos | Tailwind | 3.4.19 | Utility-first, cero CSS muerto |
| Animacion | Framer Motion | 11.18.2 | Solo en Hero y Parallax |
| IA | Groq + AI SDK | 1.2.9 / 4.3.19 | Streaming rapido, tier gratuito |
| Formulario | Formspree | HTTP fetch | Sin libreria, minimo payload |
| Build | esbuild | 0.24.0 | Pinneado por Big Sur |
| Runtime | Node | 20.20.2 | Compatible Astro 5 |
| PM | pnpm | 9.15.9 | pnpm.overrides requiere pnpm |

## 3. Estructura (resumen)

- public/ : favicon, logo, og-image, llms.txt, robots.txt
- src/components/ : islas React (HeroLamp, ContactForm, ParallaxSection, Reveal, ChatWidget pendiente)
- src/layouts/Layout.astro : shell global (metadata, JSON-LD, fonts)
- src/pages/index.astro : home
- src/pages/blog/ : Content Collections (pendiente)
- src/pages/api/chat.ts : endpoint Groq (pendiente)
- src/styles/global.css : tokens y utilidades
- astro.config.mjs, tailwind.config.mjs, package.json (pnpm.overrides esbuild 0.24.0), .nvmrc (20)

## 4. Flujos

### 4.1 Request de pagina

Vercel Edge -> Astro SSG -> HTML + islas hidratadas -> navegador.

HTML critico completo: crawlers IA (GPTBot, ClaudeBot, PerplexityBot) y Google lo leen sin JS.

Islas con client:load (Hero, Form) o client:visible (Parallax; ojo con whileInView — ver AGENTS seccion 5).

### 4.2 Formulario (ContactForm.tsx)

submit -> fetch POST Formspree (PUBLIC_FORMSPREE_ID) -> Promise.all(fetch, minDelay 150ms) -> estado ENVIADO.

Sin librerias. Sin setTimeout artificial. Honeypot pendiente (deuda 9).

### 4.3 Chat IA (/api/chat, pendiente)

ChatWidget -> POST /api/chat -> Vercel AI SDK -> Groq (llama-3.3-70b-versatile) -> stream -> UI.

GROQ_API_KEY en .env local y en Vercel (Production + Preview + Development). Rate-limit basico por IP a definir.

### 4.4 Build y deploy

pnpm build -> dist/ -> Vercel auto-deploy en push a main. Sin CI adicional. PageSpeed se valida manual antes de push.


## 5. Performance budget

| Metrica | Limite |
| :--- | :--- |
| JS total Home | < 90 kB gzip |
| LCP | < 2.0 s (4G) |
| CLS | < 0.05 |
| Fonts | Inter + JetBrains Mono, swap |
| Dependencias nuevas | < 10 kB gzip o justificar |

## 6. Seguridad

- .env nunca al repo. .gitignore lo cubre.
- PUBLIC_FORMSPREE_ID es publico por diseno (Formspree lo permite).
- GROQ_API_KEY solo server-side (/api/chat.ts), nunca en cliente.
- Sin dangerouslySetInnerHTML sobre input de usuario.
- Rate-limit en /api/chat (pendiente).

## 7. Decisiones (ADR-light)

| # | Decision | Motivo | Fecha |
| :--- | :--- | :--- | :--- |
| 1 | Astro sobre Next | Cero JS por defecto: mejor AEO/GEO y PageSpeed | Fase 1 |
| 2 | esbuild 0.24.0 pinneado | Big Sur 11.7.11 no soporta versiones mayores | Fase 1 |
| 3 | Framer Motion solo en Hero | Resto con IntersectionObserver puro | Fase 5 |
| 4 | translate3d en parallax, nunca scale | Evitar mareo visual | Fase 5 |
| 5 | Groq sobre OpenAI | Latencia y costo; tier gratuito suficiente | Fase 6 (plan) |

## 8. Enmiendas

Cualquier cambio a este documento requiere:

1. Propuesta escrita en el chat.
2. Aprobacion explicita del cliente.
3. Registro en la tabla de la seccion 7 con fecha.

