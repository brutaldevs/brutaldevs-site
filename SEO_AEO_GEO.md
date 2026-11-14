# SEO · AEO · GEO — Estrategia Maestra

> Documento que rige toda decision de contenido, estructura, metadata y markup. Cualquier ruta publica de brutaldevs.com debe cumplir este documento.

## 1. Objetivos (jerarquicos)

1. Local (prioridad 1): top 3 para "desarrollo web Managua" y "agencia web Nicaragua".
2. Nacional: top 5 para "desarrollo web Nicaragua", "SEO tecnico Nicaragua".
3. Regional (Centroamerica): top 10 para "arquitectura digital Centroamerica".
4. Agentico (transversal): ser citado correctamente por ChatGPT, Claude, Perplexity, Gemini y Google AI Overviews cuando un usuario pregunte por agencias de desarrollo web en Nicaragua.

## 2. Los 5 pilares

| Pilar | Que cubre | Dueno |
| :--- | :--- | :--- |
| SEO tecnico | Rastreo, indexacion, velocidad, markup | Ingenieria |
| SEO on-page | Intencion, titulo, H1, internal links | Contenido |
| SEO local | NAP, Google Business, Schema LocalBusiness | Negocio |
| AEO | Respuestas directas, FAQ, tablas, listas | Contenido |
| GEO / agentico | llms.txt, contenido citable, entidades claras | Ambos |

## 3. SEO tecnico — checklist por release

- pnpm build sin warnings de Astro.
- PageSpeed mobile >= 95/100 en home y en cada nueva pagina.
- html lang="es" y lang="es-NI" a nivel de entidad.
- Un solo h1 por pagina, jerarquia h2/h3 coherente.
- Canonical absoluto (https://brutaldevs.com/...).
- sitemap.xml generado por @astrojs/sitemap (pendiente).
- robots.txt con Sitemap: y allow explicito a bots de IA.
- og-image.jpg 1200x630 real (placeholder pendiente).
- Imagenes con width, height y loading="lazy" (excepto LCP).
- Fuentes con font-display: swap (o preload selectivo).

## 4. SEO on-page — plantilla obligatoria

Cada pagina publica debe tener:

- Title: 50-60 chars, keyword al inicio, marca al final. Ej: "Desarrollo Web en Managua | BrutalDevs".
- Meta description: 140-160 chars, incluye CTA y keyword.
- H1: unico, coincide con la intencion principal.
- Primer parrafo: responde la intencion en <=3 lineas (AEO).
- Internal links: minimo 2 hacia servicios / blog / contacto con anchor descriptivo.
- FAQ al final con details/summary cuando aplique.
- CTA claro y unico por seccion.

## 5. SEO local

- NAP consistente en todo el sitio: BrutalDevs / Managua, Nicaragua / brutaldevs@gmail.com.
- Schema LocalBusiness + ProfessionalService en home (ya implementado, no romper).
- Crear Google Business Profile (pendiente, deuda 3).
- Enlazar GBP con sitio via sameAs en JSON-LD.

## 6. AEO — Answer Engine Optimization

Patrones obligatorios en contenido nuevo:

- Respuesta primero: el primer parrafo de cada seccion responde la pregunta.
- Listas numeradas para procesos.
- Tablas para comparativas (precio, stack, plazos).
- Preguntas literales como h2 o h3 (ej: "Cuanto cuesta una pagina web en Managua?").
- Datos concretos: precios en USD, plazos en semanas, numero de proyectos.
- Citas de autoridad cuando se afirma algo tecnico.


## 7. GEO / Busqueda agentica

- public/llms.txt (obligatorio): resumen del negocio en Markdown para LLMs. Incluye nombre, tagline, servicios, contacto y URL.
- public/robots.txt: permitir explicitamente GPTBot, ClaudeBot, PerplexityBot, Google-Extended, CCBot.
- HTML semantico: los crawlers de IA no ejecutan JS, todo el contenido critico debe estar en HTML servido (Astro lo cumple por defecto).
- Entidades claras: mencionar literalmente "Managua", "Nicaragua", "Centroamerica" en contenido.
- Contenido citable: frases cortas, autocontenidas, con datos verificables.
- Schema: Article + FAQPage en posts del blog.

## 8. Plan de Schema (JSON-LD)

| Schema | Donde | Estado |
| :--- | :--- | :--- |
| ProfessionalService | / | OK |
| LocalBusiness | / (junto al anterior) | Reforzar |
| Organization | Layout.astro global | Pendiente |
| WebSite + SearchAction | Layout.astro global | Pendiente |
| FAQPage | / (seccion FAQ) | Pendiente |
| Article | /blog/[slug] | Pendiente |
| BreadcrumbList | /blog/*, /servicios/* | Pendiente |

## 9. Estrategia de contenido (pillar + cluster)

Pillar: "Guia Completa de Desarrollo Web en Nicaragua (2026)" — 2000+ palabras.

Cluster 1: "Cuanto Cuesta una Pagina Web en Managua?" — 1200 palabras.

Cluster 2: "SEO Local para Negocios en Nicaragua" — 1500 palabras.

Cada cluster enlaza al pillar y viceversa. El pillar enlaza a /contacto.

## 10. KPIs y medicion

| KPI | Herramienta | Meta 90 dias |
| :--- | :--- | :--- |
| PageSpeed mobile | pagespeed.web.dev | >= 95 |
| Impresiones GSC | Search Console | +200% |
| Clics GSC | Search Console | +150% |
| Menciones en LLMs | Manual mensual | >= 3 |
| Leads form | Formspree | >= 5/mes |

## 11. Roadmap SEO (orden)

1. llms.txt + robots.txt + @astrojs/sitemap (1 sesion).
2. og-image.jpg real (1 sesion).
3. Google Business Profile + Search Console (1 sesion).
4. Blog pillar + 2 clusters (2 sesiones).
5. Schema Article + FAQPage + Organization (1 sesion).
6. Analytics (Vercel o Umami) (1 sesion).

