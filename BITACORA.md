# 📓 BITACORA — BrutalDevs

> **Documento maestro.** Cualquier agente o dev que retome el proyecto debe leerlo completo antes de tocar código.

---

## 🎯 1. Resumen Ejecutivo

**BrutalDevs** es la agencia de desarrollo web de Managua, Nicaragua. El sitio (`brutaldevs.com`) es la carta de presentación técnica y comercial de la marca.

| Campo | Valor |
| :--- | :--- |
| **Dominio** | `brutaldevs.com` (gestionado en Vercel) |
| **Repositorio** | `github.com/brutaldevs/brutaldevs-site` (org `brutaldevs`) |
| **Hosting** | Vercel (auto-deploy en cada push a `main`) |
| **Email de contacto** | `brutaldevs@gmail.com` |
| **Formulario** | Formspree (Form ID: `xrpqejar`) |
| **Estado general** | 🟢 Online, funcional, pendiente de chat IA y blog |

---

## 🛠️ 2. Stack Técnico (Versiones Exactas)

| Capa | Tecnología | Versión | Notas |
| :--- | :--- | :--- | :--- |
| Framework | **Astro** | `5.18.2` | **NO actualizar a 6+** (requiere Node 22) |
| Islas interactivas | **React** | `18.3.1` | **NO actualizar a 19** |
| Estilos | **Tailwind CSS** | `3.4.19` | **NO actualizar a 4** |
| Animaciones | **Framer Motion** | `11.18.2` | Solo en Hero y Formulario |
| IA | **Groq + Vercel AI SDK** | `@ai-sdk/groq@1.2.9`, `ai@4.3.19` | Instalado pero **no integrado** |
| Formulario | **Formspree** | API HTTP | Sin librería, `fetch` nativo |
| Empaquetador | **esbuild** | `0.24.0` (pinneado) | Override crítico para macOS Big Sur |
| Runtime | **Node** | `20.20.2` | Pinneado en `.nvmrc` |
| Package Manager | **pnpm** | `9.15.9` | Más rápido que npm |

### ⚠️ Restricciones críticas del entorno

1. **macOS Big Sur (11.7.11)**: `esbuild@0.24.0` pinneado en `package.json` vía `pnpm.overrides`. **No modificar.**
2. **Node v20**: Compatible con Astro 5.x. Astro 6+ requiere v22+, lo cual **rompería** el entorno de otros proyectos. **No actualizar Astro.**
3. **React 18**: No actualizar a 19. Librerías alineadas.
4. **Tailwind 3**: No actualizar a 4.

---

## 📋 3. Protocolo de Colaboración

### 🔴 Regla de Oro: NO hacer `git push` sin validación local del cliente

1. El agente escribe el código y lo entrega en bloques `bash` con heredocs (`cat > archivo << 'EOF'`).
2. El cliente ejecuta en su Mac, valida en `http://localhost:4321` con `pnpm dev` + **Hard Refresh** (`Cmd + Shift + R`).
3. Solo si el cliente da el visto bueno explícito, el agente **dicta el comando de push**.
4. Vercel hace auto-deploy al hacer push a `main`.

### ❌ Errores que NO se deben repetir

| Error | Consecuencia | Solución |
| :--- | :--- | :--- |
| Usar `className` en `.astro` | Tailwind no aplica estilos | Usar `class` en Astro |
| Usar `python3 -c` con `${...}` en zsh | `zsh: bad substitution` | Usar heredoc `cat > file << 'EOF'` |
| Combinar `client:visible` + `whileInView` | Elementos invisibles | Usar `useInView` o `IntersectionObserver` puro |
| Usar `scale` en parallax | Mareo, sensación de lupa | Usar `translate3d` con capas |
| Bloques de código muy grandes | El heredoc se corta | Usar bloques de máximo 80-100 líneas |

---

## 📜 4. Línea de Tiempo

### Fases Completadas ✅
- **Fase 1 (Setup)**: Astro 5 + React 18 + Tailwind 3. Node 20. Repo y Vercel.
- **Fase 2 (Identidad)**: Hero con lámparas. Paleta monocromática. Favicon SVG.
- **Fase 3 (SEO Local)**: JSON-LD. Metatags. Copy local. FAQ acordeón.
- **Fase 4 (Formulario)**: Formspree. Barra de progreso 150ms. Feedback visual.
- **Fase 5 (Parallax)**: 3 capas con `translate3d` (20-40%, 40-60%, 60-80%).
- **Fase 6 (Carrusel 3D)**: 5 tarjetas en anillo circular. Rotación con drag, inercia y snap. Eventos de teclado y flechas. Móvil con `touch-action: pan-y`.

### Fases Pendientes ⏳
- **Fase 7**: Chat con Groq (endpoint + widget).
- **Fase 8**: Blog con Content Collections.
- **Fase 9**: Imágenes OG, sitemap, robots, analytics.

---

## 🔧 5. Detalles a Pulir (Feedback del 15 de Nov)

1. **Carrusel 3D (Desktop)**: Ajustar la opacidad de las tarjetas laterales para que el contraste con la activa sea más marcado.
2. **Carrusel 3D (Móvil)**: Afinar la sensibilidad del drag (actualmente 0.35) para que no sea tan rápido al deslizar.
3. **Formulario**: Evaluar si el campo "Teléfono" debe ser obligatorio o si el opcional actual es el correcto. (Nota: se dejó opcional por recomendación de conversión).
4. **WhatsApp**: Se decidió no usar enlaces directos por ahora. Todo contacto va por el formulario.
5. **Copy**: Verificar que "Optimización web (SEO)" y "Soluciones a la medida" encajen con la propuesta de valor final de Carlos.

---

## 🚨 6. Deudas Técnicas

| # | Deuda | Impacto | Prioridad |
| :--- | :--- | :--- | :--- |
| 1 | **Chat con Groq no integrado** | Diferenciador clave | 🔴 Alta |
| 2 | **Blog no implementado** | No capta tráfico long-tail | 🔴 Alta |
| 3 | **Google Business Profile no creado** | No rankea en Local Pack | 🟡 Media |
| 4 | Warning de pnpm: "Ignored build scripts" | Podría afectar imágenes | 🟡 Media |
| 5 | No hay `og-image.jpg` real | Mala vista previa en redes | 🟡 Media |
| 6 | No hay `sitemap.xml` ni `robots.txt` | SEO técnico incompleto | 🟡 Media |
| 7 | No hay analytics | No se puede medir tráfico | 🟡 Media |

---

## 🎯 7. Próximas Acciones (Sesión Siguiente)

1. **Integrar Chat con Groq**: Crear `src/pages/api/chat.ts` y `ChatWidget.tsx`. Configurar `GROQ_API_KEY` en Vercel.
2. **Pulir detalles del carrusel** (ver sección 5).
3. **Iniciar Blog**: Configurar Content Collections y escribir 3 artículos iniciales.
4. **Crear `og-image.jpg`** y referenciarlo en `Layout.astro`.

---

## 📞 8. Accesos y Recursos

| Recurso | URL / Info |
| :--- | :--- |
| Repositorio | `github.com/brutaldevs/brutaldevs-site` |
| Vercel Dashboard | `vercel.com/brutaldevs-4369` |
| Formspree | `formspree.io` (Form ID: `xrpqejar`) |
| Groq Console | `console.groq.com/keys` |

### Variables de entorno

**Local (`.env`)**:

**Vercel**:
- `PUBLIC_FORMSPREE_ID=xrpqejar` ✅
- `GROQ_API_KEY` ⏳ Pendiente

---

## 🎨 9. Sistema de Diseño

| Token | Valor |
| :--- | :--- |
| Fondo principal | `#0c0d0d` |
| Texto principal | `#ecebe6` |
| Texto secundario | `neutral-400` / `neutral-500` / `neutral-600` |
| Acento único | `#ffffff` |
| Bordes | `border-neutral-800` |
| Tipografía sans | `Inter` |
| Tipografía mono | `JetBrains Mono` |
| Transición premium | `cubic-bezier(0.22, 1, 0.36, 1)` |

---

## 🎭 10. Filosofía de Marca

- **Tagline**: *"Sistemas que no se improvisan. Arquitectura digital. Ingeniería de software."*
- **Tono**: Directo, profesional, técnico pero accesible.
- **Audiencia**: Empresas en Nicaragua (Managua principalmente) y Centroamérica.
- **Palabras clave objetivo**: "desarrollo web Managua", "agencia de desarrollo web Nicaragua", "SEO técnico Nicaragua".

---

*Última actualización: 15 de noviembre de 2026*
*Estado: Listo para Fase 7 (Chat con Groq)*
