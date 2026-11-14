# BITACORA — BrutalDevs

> Documento maestro. Lectura obligatoria antes de tocar codigo.

## 1. Resumen Ejecutivo

BrutalDevs es la agencia de desarrollo web de Managua, Nicaragua.

| Campo | Valor |
| :--- | :--- |
| Dominio | brutaldevs.com (Vercel: brutaldevs-4369) |
| Repo | github.com/brutaldevs/brutaldevs-site |
| Email | brutaldevs@gmail.com |
| Formspree ID | xrpqejar |
| Cliente | Carlos Andres (amarod88) |
| Estado | Online. Fase 6 pendiente (Chat Groq) |

## 2. Stack (NO actualizar sin autorizacion)

| Capa | Tech | Version |
| :--- | :--- | :--- |
| Framework | Astro | 5.18.2 |
| Islas | React | 18.3.1 |
| Estilos | Tailwind | 3.4.19 |
| Animacion | Framer Motion | 11.18.2 |
| IA | @ai-sdk/groq / ai | 1.2.9 / 4.3.19 |
| Build | esbuild | 0.24.0 (pinneado Big Sur) |
| Runtime | Node | 20.20.2 |
| PM | pnpm | 9.15.9 |

## 3. Regla de Oro

NO hacer git push sin validacion local del cliente: pnpm dev + Hard Refresh + visto bueno explicito.


## 4. Linea de Tiempo

Fase 1 — Setup e Infraestructura (cerrada): Astro 5 + React 18 + Tailwind 3 manual. Override esbuild 0.24.0 para Big Sur. Deploy en Vercel. Dominio vinculado.

Fase 2 — Identidad Visual (cerrada): Hero con efecto de lamparas (HeroLamp.tsx). Logo de fondo al 8% opacidad. Paleta monocromatica (#ecebe6 / #0c0d0d / neutrales). Ruido gaussiano al 15%.

Fase 3 — SEO Local y Estructura (cerrada): JSON-LD ProfessionalService con direccion Managua. Metatags completos. Estructura Hero > Servicios > Formulario > FAQ. Keywords locales integradas.

Fase 4 — Formulario Funcional (cerrada): Formspree con fetch nativo. Barra de progreso 150ms. Feedback ENVIANDO > ENVIADO. Correos llegan a brutaldevs@gmail.com.

Fase 5 — Parallax Premium (cerrada, commit 2b854b4): ParallaxSection.tsx con 3 capas translate3d. Reveal.tsx con IntersectionObserver puro. Cero scale. Validado por cliente y en produccion.

Fase 6 — Chat con Groq (PENDIENTE): ver seccion 6.

Fase 7 — Blog con Content Collections (PENDIENTE): ver seccion 6.

## 5. Deudas Tecnicas

| # | Deuda | Prioridad |
| :--- | :--- | :--- |
| 1 | Chat Groq no integrado | Alta |
| 2 | Blog no implementado | Alta |
| 3 | Google Business Profile pendiente | Media |
| 4 | Warning pnpm: ignored build scripts (esbuild, sharp) | Media |
| 5 | Sin og-image.jpg real | Media |
| 6 | Sin sitemap.xml ni robots.txt | Media |
| 7 | Sin analytics | Media |
| 8 | Sin llms.txt en public/ | Baja |
| 9 | Form sin honeypot | Baja |
| 10 | Blog sin RSS | Baja |
| 11 | Warning git: unreachable loose objects | Baja |

Fix deuda 11: rm -f .git/gc.log && git prune && git gc --aggressive

## 6. Proximas Acciones

Sesion 1 (esta): crear BITACORA.md, AGENTS.md, ARCHITECTURE.md, SEO_AEO_GEO.md.

Sesion 2 — Chat Groq: crear src/pages/api/chat.ts con Vercel AI SDK + Groq (llama-3.3-70b-versatile). Crear src/components/ChatWidget.tsx. Montar client:load en Layout.astro. Configurar GROQ_API_KEY en .env y Vercel. Validar y push. Deps ya instaladas.

Sesion 3 — Blog + SEO Tecnico: Content Collections con Zod. src/pages/blog/index.astro y [...slug].astro. 3 articulos (Pillar 2000+ palabras, Cluster 1 y 2). @astrojs/sitemap. public/robots.txt. public/llms.txt.

Sesion 4 — Imagen y Marca: og-image.jpg 1200x630 y referencia en Layout.astro.

Sesion 5 — Analytics y Negocio: Vercel Analytics o Umami. Google Business Profile. Google Search Console + sitemap.

## 7. Accesos y Env

Repo: github.com/brutaldevs/brutaldevs-site
Vercel: vercel.com/brutaldevs-4369
Formspree: formspree.io (ID xrpqejar)
Groq: console.groq.com/keys
Astro docs: docs.astro.build
AI SDK docs: sdk.vercel.ai/docs

.env local (no se sube a Git):
PUBLIC_FORMSPREE_ID=xrpqejar
GROQ_API_KEY=gsk_... (pendiente)

En Vercel: PUBLIC_FORMSPREE_ID configurado, GROQ_API_KEY pendiente.

## 8. Sistema de Diseno

Fondo: #0c0d0d
Texto: #ecebe6
Secundario: neutral-400/500/600
Acento: #ffffff
Bordes: border-neutral-800
Sans: Inter 400/600/900
Mono: JetBrains Mono 400/700
Radios: 0
Transicion: cubic-bezier(0.22, 1, 0.36, 1)

## 9. Filosofia de Marca

Tagline: Sistemas que no se improvisan. Arquitectura digital. Ingenieria de software.
Tono: directo, tecnico, sin adornos.
Audiencia: empresas en Nicaragua y Centroamerica.
Keywords: desarrollo web Managua, agencia desarrollo web Nicaragua, SEO tecnico Nicaragua, arquitectura digital Centroamerica.

## 10. Notas para el Proximo Agente

1. No reinventes: diseno y estructura ya validados. Mejoras, no reescrituras.
2. El cliente tiene la vision estetica. Traduce a codigo de elite.
3. Performance: cada kB cuenta. Si libreria >10kB gzip y se resuelve en 20 lineas nativas, hazlo nativo.
4. SEO innegociable: mantener 100/100 PageSpeed. Verificar en pagespeed.web.dev antes de push.
5. Documenta decisiones tecnicas no obvias aqui o en ARCHITECTURE.md.

## 11. Estado del Handoff

Ultima actualizacion: 14 de noviembre de 2026
Ultimo commit: 2b854b4
Estado: Fase de gobernanza en curso. BITACORA.md completo. Pendiente: AGENTS.md, ARCHITECTURE.md, SEO_AEO_GEO.md.

