# AGENTS.md — Charter del Agente

> Lectura obligatoria antes de cualquier comando. Si un agente no cumple este charter, no opera sobre el repo.

## 1. Orden de lectura al onboarding

1. BITACORA.md — estado y linea de tiempo.
2. AGENTS.md — este documento, reglas de operacion.
3. ARCHITECTURE.md — si vas a tocar codigo.
4. SEO_AEO_GEO.md — si tocas contenido, metadata, rutas publicas o markup.

## 2. Regla de Oro — Validacion antes de push

Ningun agente hace git push sin que el cliente (Carlos Andres / amarod88) haya:

1. Recibido el codigo en heredoc o archivo.
2. Ejecutado en su Mac con pnpm dev.
3. Validado en http://localhost:4321 con Hard Refresh (Cmd + Shift + R).
4. Dado visto bueno explicito (dale, ok, procede, push).

Sin los 4 pasos, no se dicta el comando de push.

## 3. Formato de entrega (obligatorio)

- Heredoc siempre con delimitador unico (BD_END, AG_END, ARCH_END, SEO_END). Nunca EOF generico.
- Un archivo por mensaje. Si el archivo supera 100 lineas, dividir en bloques de ~40 con cat >> y verificar entre bloques.
- Nunca python3 -c con ${...} — rompe zsh con bad substitution.
- Verificacion obligatoria al final: wc -l && head -1 && tail -3.
- Cierre explicito: "Pegame el output" o "Confirma X antes de proceder".
- Limpieza cuando se cambia codigo critico: rm -rf node_modules/.vite .astro

## 4. Entorno — restricciones NO negociables

| Capa | Pin | Por que |
| :--- | :--- | :--- |
| macOS | Big Sur 11.7.11 | esbuild@0.24.0 pinneado |
| Node | 20.20.2 | Astro 5 requiere 20; Astro 6+ pide 22 |
| pnpm | 9.15.9 | pnpm.overrides depende de el |
| Astro | 5.18.2 | NO subir a 6 |
| React | 18.3.1 | NO subir a 19 |
| Tailwind | 3.4.19 | NO subir a 4 |
| esbuild | 0.24.0 | Override intocable |

Cualquier propuesta que rompa esta tabla se rechaza de oficio.

## 5. Prohibiciones (errores ya vividos)

| Error | Consecuencia | Solucion |
| :--- | :--- | :--- |
| className en .astro | Tailwind no aplica | class en Astro |
| python3 -c con ${...} | bad substitution | heredoc con marcador |
| client:visible + whileInView | Elementos invisibles | useInView o IntersectionObserver puro |
| scale en parallax | Mareo visual | translate3d por capas |
| setTimeout artificial en form | Latencia | Promise.all con minimo 150ms |
| overflow-hidden en parallax | Recorta contenido | overflow-clip o ninguno |
| Actualizar esbuild | Build roto en Big Sur | Respetar pnpm.overrides |
| Pegar 100+ lineas en terminal | Heredoc no cierra | Dividir en bloques de ~40 con cat >> |

## 6. Protocolo de diagnostico

- node -v && pnpm -v
- cat .env
- cat package.json | grep -A3 overrides
- rm -rf node_modules/.vite .astro && pnpm dev
- curl -s http://localhost:4321 | head -50

Si algo no cuadra: parar, diagnosticar, reportar. No improvisar.

## 7. Performance budget (no negociable)

- JS total en Home: < 90 kB gzip
- LCP: < 2.0 s en 4G
- CLS: < 0.05
- PageSpeed mobile: >= 95/100 en cada push

Nueva dependencia >10 kB gzip: justificar o resolver nativo.

## 8. Invariantes SEO / AEO / GEO

Cada cambio publico debe preservar:

- JSON-LD valido (ProfessionalService + LocalBusiness + Article cuando aplique).
- Metatags completos (title, description, canonical, OG, Twitter).
- Un solo h1 por pagina.
- Semantica HTML5 (header, main, section, article, footer).
- URLs limpias (sin query params, sin mayusculas, con guiones).
- sitemap.xml y robots.txt accesibles.
- llms.txt en /llms.txt (ver SEO_AEO_GEO.md).

## 9. Escalamiento y honestidad

- Si no estas seguro: pregunta, no asumas.
- Si el cliente pide algo que rompe el charter: senalalo y propone alternativa.
- Si el feedback es visual: confirma con wireframe/texto antes de codear.
- Si una tarea toma mas de 2 intercambios sin cerrar: reenfocar, no acumular deuda.

## 10. Checklist de cada intervencion

- [ ] Lei BITACORA, AGENTS y (si aplica) ARCHITECTURE / SEO_AEO_GEO.
- [ ] Confirme versiones con node -v && pnpm -v.
- [ ] Identifique fase actual y proxima accion.
- [ ] Entregue en heredoc con verificacion.
- [ ] Pedi validacion local.
- [ ] No hice push sin visto bueno.

