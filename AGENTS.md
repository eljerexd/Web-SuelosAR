<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# SuelosAR Web — guía completa del proyecto

Esta guía describe la implementación que existe en este repositorio. Antes de modificar algo, leer la sección correspondiente y contrastarla con el código actual: las rutas, traducciones, métricas y fuentes de datos pueden evolucionar. No inferir capacidades de la app a partir del sitio ni viceversa.

## 1. Propósito y límites del repositorio

- Es el sitio web público de SuelosAR, construido con Next.js App Router. No es el repositorio Flutter de la aplicación de escritorio/móvil.
- El contenido público presenta la app, sus plataformas, provincias y páginas explicativas de cartografía.
- Los datos cartográficos pertenecen a sus organizaciones de origen. SuelosAR es un proyecto independiente y no está afiliado institucionalmente al INTA.
- La app cubre Buenos Aires, Santa Fe y Córdoba. En este sitio hay páginas provinciales publicadas para Buenos Aires y Santa Fe; Córdoba está en el catálogo como provincia en preparación y no tiene ruta pública propia. No enlazar ni crear una página Córdoba vacía.
- La hoja de ruta de la home presenta Córdoba como disponible en la app y Entre Ríos como próximo objetivo. Esto no promete una fecha ni significa que haya cobertura o página publicada para Entre Ríos.
- `README.md` puede quedarse atrás respecto de cambios recientes de cobertura. Para modificar datos actuales, contrastar `lib/i18n/dictionaries.ts`, `lib/provinces.ts`, `lib/stats.ts` y el código de la app cuando corresponda; no inventar cifras.

## 2. Tecnología y comandos

- Node.js `>=20.9.0`, npm, Next.js `16.3.2`, React `19`, TypeScript, Tailwind CSS 4, Framer Motion y Lucide React.
- Scripts: `npm run dev`, `npm run build`, `npm run start`, `npm run lint`, `npm test`.
- `npm test` ejecuta `node --test tests/*.test.mjs`. Son pruebas Node sobre contratos de código/seguridad; no reemplazan una comprobación visual del navegador.
- Next.js mantiene un bloque generado en este archivo entre `BEGIN:nextjs-agent-rules` y `END:nextjs-agent-rules`. No eliminarlo ni editarlo; el servidor de desarrollo puede volver a generarlo.
- No asumir que APIs de Next.js son las de versiones anteriores: revisar guías instaladas en `node_modules/next/dist/docs/` cuando se modifiquen APIs del framework.

## 3. Mapa de rutas

| Ruta | Implementación | Función |
| --- | --- | --- |
| `/` | `app/page.tsx` | Home: Hero, Features/roadmap/Product Tour, galería, FAQ y CTA. Server Component que obtiene metadatos de releases y pasa etiquetas al Hero. |
| `/mapas-de-suelos` | `app/mapas-de-suelos/page.tsx`, `components/catalog/soil-map-catalog.tsx` | Catálogo provincial localizado. Buenos Aires y Santa Fe enlazan a páginas existentes; Córdoba se muestra sin anchor mientras no esté publicada. |
| `/mapa-suelos-buenos-aires` | `app/mapa-suelos-buenos-aires/page.tsx` | Página SEO de Buenos Aires; metadata propia, JSON-LD y contenido compartido. |
| `/mapa-suelos-santa-fe` | `app/mapa-suelos-santa-fe/page.tsx` | Página SEO de Santa Fe; metadata propia, JSON-LD y contenido compartido. |
| `/data-sources` | `app/data-sources/page.tsx` | Procedencia y descripción de fuentes. |
| `/privacy`, `/terms`, `/disclaimer` | `app/{privacy,terms,disclaimer}/page.tsx` | Páginas legales con `components/legal/legal-page.tsx`. |
| `/download/[platform]` | `app/download/[platform]/route.ts` | GET/HEAD resuelven el asset actual y redirigen; no hacen proxy del instalador. |
| `/download-unavailable` | `app/download-unavailable/page.tsx` | Estado de descarga no disponible. |
| `/admin/metricas` | `app/admin/metricas/page.tsx` | Dashboard privado de métricas; autorización server-side antes de consultar los datos. |
| `/api/auth/[...nextauth]` | `app/api/auth/[...nextauth]/route.ts`, `auth.ts` | OAuth GitHub / Auth.js. |
| `/api/admin/metrics` | `app/api/admin/metrics/route.ts` | Lectura autenticada de métricas. |
| `/api/metrics/android-play-click` | `app/api/metrics/android-play-click/route.ts` | Incremento público anónimo, same-origin y limitado globalmente. |
| `/api/cron/snapshot-installer-downloads` | `app/api/cron/snapshot-installer-downloads/route.ts` | Captura programada de contador agregado de GitHub. |

Otros endpoints de descubrimiento son `app/sitemap.ts`, `app/robots.ts`, `app/manifest.ts`, `app/opengraph-image.tsx`, `app/icon.png` y `app/apple-icon.png`.

## 4. Shell, diseño y temas

- `app/layout.tsx` es el layout raíz: metadata base, manifest, providers de idioma y tema, skip link, navbar, página, footer y proveedor de Vercel Analytics.
- `components/layout/navbar.tsx` es el header sticky. Usa `usePathname()` para marcar activa la navegación a `/mapas-de-suelos`; el nombre proviene del diccionario. Idioma y tema están a la derecha.
- `components/layout/footer.tsx` obtiene copy y enlaces rápidos/legales del diccionario; los enlaces relativos de ancla se adaptan si se está en otra ruta.
- `styles/tokens.css` contiene tokens CSS de superficie, texto, verde, borde, estado de preparación, foco y sombra. `.dark` redefine los tokens; los componentes deben consumir variables, no introducir paletas separadas.
- `app/globals.css` importa Tailwind y `styles/tokens.css`, define base/scroll/foco/reduced-motion y ajustes específicos de Hero responsive.
- `components/theme/theme-provider.tsx` persiste `suelosar-theme` en `localStorage`, sigue preferencia del sistema mientras no haya elección guardada y aplica `.dark` al `<html>`. El pequeño script de `app/layout.tsx` aplica el tema temprano para evitar destello.
- Respetar `useReducedMotion` y clases `motion-reduce`; no agregar movimiento al ignorar preferencias de accesibilidad.

## 5. Idiomas y contenido

- `lib/i18n/dictionaries.ts` define `Locale`, `defaultLocale` (`es-AR`), estructura `Dictionary` inferida y diccionarios español/inglés. Todo copy de UI que se localiza vive ahí; conservar claves y estructura paralelas.
- `components/i18n/i18n-provider.tsx` guarda `suelosar-locale` en `localStorage`, comparte el diccionario por contexto y actualiza `document.documentElement.lang`. `useI18n()` solo se usa bajo el provider raíz.
- `components/i18n/language-selector.tsx` cambia entre las dos opciones. `components/i18n/skip-link.tsx` da acceso por teclado al contenido principal.
- Hay contenido provincial independiente en `dictionary.soilMap` y `dictionary.soilMapSantaFe`; la configuración `dictionaryKey` de `lib/provinces.ts` decide cuál consume la página.
- No guardar textos de interfaz hardcodeados en un componente si forman parte del contenido español/inglés; excepciones como valores de protocolo, cifras verificadas o rutas se explican en código.

## 6. Home y Hero

- `app/page.tsx` obtiene en paralelo `getGooglePlayReleaseMetadata()` y `getLatestReleaseMetadata()` de `lib/downloads.ts`. Formatea fecha/versiones en server-side y pasa etiquetas opcionales a `<Hero>`; un error de proveedor deja la línea metadata vacía, no rompe el render.
- `components/home/hero.tsx` contiene el Hero, copys de diccionario, CTAs, badges, registro anónimo del clic Play y `HeroDeviceShowcase`. No mover/reordenar ni reescribir el Hero sin una solicitud explícita: título y descripción tienen copy SEO deliberado.
- `components/home/hero-device-showcase.tsx` compone captura de Android y laptop con capas y breakpoint styles. `components/ui/device-mockup.tsx` y `laptop-mockup.tsx` representan marcos de dispositivo; no editar las capturas para corregir geometría del frame.
- CTA Android normal apunta a Google Play (`ANDROID_DOWNLOAD_URL`); Windows apunta a `/download/windows`. El CTA final puede usar `/download/android` para el APK, excepción documentada en `lib/downloads.ts`.

## 7. Features, roadmap y Product Tour

- `components/features/features.tsx` junta introducción, cifras, roadmap, seis capítulos del tour y escena de vinculación.
- Estadísticas verificadas viven en `lib/stats.ts`: 386 Cartas de Suelo Buenos Aires, 213 series Santa Fe y 409 series Córdoba son unidades diferentes. No sumarlas como si fueran el mismo tipo de dato. El contador de cobertura de la home termina en tres provincias.
- `components/features/province-roadmap.tsx` solo presenta: Buenos Aires (Vinculación entre dispositivos), Santa Fe (Descarga bajo demanda), Córdoba (Nuevo motor de render) y Entre Ríos como próximo objetivo. Traducciones/estados vienen de `dictionary.features.roadmap`.
- Animación actual del roadmap: dispara al entrar en viewport mediante `onViewportEnter` y `viewport={{ once: true, amount: 0.55 }}`. `hasAnimatedStatsRef` impide repetirla al volver a entrar. No usa progreso ligado al scroll ni intercepta rueda/touch. El primer conector BA→Santa Fe tiene `duration: 0.8s`, `delay: 0.35s` y easing `[0.22, 1, 0.36, 1]`; al llegar activa Santa Fe, espera `160ms` y empieza Santa Fe→Córdoba a `1.2s` con el mismo easing. Al llegar activa Córdoba. Los hitos aparecen escalonados; con movimiento reducido se muestran estados finales sin la secuencia. El conector a Río Negro nunca se pinta y el nodo permanece `next`/flecha gris. Si se toca el ritmo, cambiar solo el tramo solicitado.
- `FeatureStory` (`components/features/feature-story.tsx`) es un capítulo memoizado con texto, progreso local y captura móvil. El orden está en `featureOrder`; imágenes y alts vienen de `featureImages` y `lib/i18n/dictionaries.ts`.
- El Product Tour de escritorio es sticky: una laptop con la imagen del capítulo activo acompaña los capítulos de texto. `getActiveFeatureIndex()` en `lib/product-tour-scroll.ts` elige el capítulo cuyo centro está más cerca de la línea de lectura del viewport. `features.tsx` toma mediciones en `requestAnimationFrame` ante scroll pasivo/resize/pageshow y usa `ResizeObserver`; evitar lógica adicional de scroll o `setState` en cada evento sin necesidad. En mobile las capturas quedan dentro de cada capítulo, sin la composición sticky.
- El último capítulo tiene wrapper alto y `finalHold`; preservar su comportamiento de retención. No mezclar el roadmap con la animación del Product Tour.
- `components/features/device-linking-scene.tsx` es una escena distinta, scroll-driven y sticky, con transforms y estados de dispositivos enlazados. Al completar, conserva el mismo wrapper/pinning para evitar cambiar la altura del documento mientras se scrollea; deja que el track sticky se libere de forma natural. No intercepta wheel/touch. No modificarla cuando el pedido se limita al roadmap.

## 8. Catálogo y páginas provinciales

- `lib/provinces.ts` es el registro tipado compartido. `availability: "available"` requiere ruta, clave de contenido e imágenes; `"coming-soon"` no admite ruta. Córdoba está hoy `coming-soon` en catálogo, aun cuando la app ya incluya su cartografía.
- Siluetas SVG en `public/images/provinces/`. No reemplazar ni alterar geometría verificada por cambios de presentación. Las imágenes usadas por páginas están bajo `public/images/screenshots/`.
- `components/catalog/soil-map-catalog.tsx` itera configuración y copy localizado. Una provincia disponible es un `<Link>` con destino real; una próxima aparece en contenedor no interactivo. La última tarjeta de una lista impar se centra en desktop.
- `components/soil-map/soil-map-content.tsx` comparte estructura de landing provincial: hero/captura, datos, glosario, cobertura, FAQ y CTA. Contenido sale del diccionario y de `ProvinceConfig`.
- Las rutas publicadas son exactamente las de `buenosAiresProvince.path` y `santaFeProvince.path`. No modificar página/canonicals de una provincia para agregar otra; primero se necesita contenido verificado y luego registrar ruta real.

## 9. Descargas y versiones

- `lib/downloads.ts` centraliza origen GitHub, URL Play, plataformas, extensiones, fallback y metadatos. El repo GitHub contiene releases web y app; el resolver enumera releases, descarta draft/pre-release y releases cuyo label contiene `web`, ordena por `published_at` y busca asset por extensión.
- `resolveLatestDownloadUrl(platform)` selecciona `.apk`/`.exe` publicado y usa URL de fallback si no hay API/asset. `app/download/[platform]/route.ts` redirige (307), no entrega archivos grandes mediante función Vercel.
- Metadatos Windows del dashboard suman `download_count` de assets `.exe` en releases de app; eso significa “informado por GitHub”, no instalación, transferencia completada ni atribución al sitio.
- Google Play es el destino habitual del botón Android. `recordAndroidPlayButtonClick()` envía petición `keepalive` sin cookies al contador, sin retrasar navegación.

## 10. Métricas privadas / autenticación

- `auth.ts` crea una sola instancia Auth.js con provider GitHub explícito (`AUTH_GITHUB_ID`, `AUTH_GITHUB_SECRET`), `AUTH_SECRET` y sesiones JWT; `app/api/auth/[...nextauth]/route.ts` exporta sus handlers.
- `lib/admin-authorization.mjs` valida ID numérico inmutable de administrador; `lib/admin-session.ts` valida sesión server-side. La página y endpoint `/api/admin/metrics` comprueban autorización antes de entregar datos. La ruta privada añade `noindex`, que no es control de acceso.
- Redis se inicializa solo en servidor en `lib/metrics.ts`, con `KV_REST_API_URL` y `KV_REST_API_TOKEN`. No usar `KV_REST_API_READ_ONLY_TOKEN` para incrementar. No añadir variables `NEXT_PUBLIC_` ni pasar credenciales al cliente.
- Se almacenan contadores agregados de clics Play y snapshots agregados del total de GitHub. No crear ID por visitante, huella, IP, user-agent ni evento de navegación.
- `app/api/cron/snapshot-installer-downloads/route.ts` comprueba autorización cron antes de capturar datos; `vercel.json` declara periodicidad. Dashboard/charts en `app/admin/metricas/`.
- Las instrucciones externas de configuración y limitaciones están en `docs/metrics-setup.md`; actualizar ese documento si cambian OAuth, Redis o el cron.

## 11. SEO, indexación y metadata

- `lib/site.ts` es la fuente del origin (`https://web-suelos-ar.vercel.app`), nombre, GitHub y contacto. No duplicar dominio en helpers.
- `lib/metadata.ts:createPageMetadata()` construye title, description, robots, canonical, Open Graph y Twitter para páginas públicas. El layout raíz fija `metadataBase` y metadata global. Las páginas provinciales generan JSON-LD via `components/seo/soil-map-json-ld.tsx`; home usa `software-application-json-ld.tsx`.
- `app/sitemap.ts` define manualmente URLs públicas indexables y fechas significativas verificadas en Git; no poner fecha de build/solicitud. Mantener sincronizadas nuevas páginas reales. `/robots.txt` viene de `app/robots.ts` y apunta al sitemap. No incluir admin/API ni rutas de descarga como páginas indexables.
- `app/manifest.ts`, iconos y OpenGraph están bajo `app/` y `public/`; cambios SEO deben ser intencionales, por página y evitar metadata duplicada.

## 12. Componentes visuales reutilizables

- `components/ui/laptop-mockup.tsx`, `device-mockup.tsx`: marcos y viewport de screenshot. `image-lightbox.tsx`: ampliación accesible de capturas.
- `components/ui/platform-icon.tsx`: iconografía específica de plataformas; `social-icons.tsx`: redes.
- `components/faq/faq.tsx` y `faq-item.tsx`: contenido FAQ del diccionario y respuestas accesibles.
- `components/gallery/screenshot-gallery.tsx`: Galería Android; contenido traducido, assets en `public/images/screenshots/`.
- `components/cta/final-cta.tsx`: cierre y enlaces de descarga/indicadores.
- `components/legal/legal-page.tsx`: plantilla de lectura para textos legales. JSON-LD localizado en `components/seo/`.

## 13. Prácticas para cambios futuros

1. Antes de editar: revisar `git status --short`, diff completo de los archivos objetivo, rama y archivos `AGENTS.md`/`CLAUDE.md`. El árbol puede contener trabajo del usuario; no hacer reset, checkout, clean ni revert de archivos completos.
2. Limitar el diff a la solicitud. Las páginas comparten diccionarios y componentes: verificar impacto en ambos idiomas, temas y rutas antes de cambiar una clave compartida.
3. No modificar el Hero, Product Tour, animación independiente de vinculación, SEO o descargas cuando la solicitud se refiera solo a otro bloque.
4. Mantener contenido relevante en SSR/HTML inicial; usar enlaces `<Link>` para destinos internos reales. No simular rutas inexistentes.
5. Validar al menos `npx tsc --noEmit`, `npm run lint`, pruebas relevantes y `npm run build` según alcance. Para scroll/animación, confirmar el comportamiento en navegador con scroll normal, dirección inversa cuando aplique y `prefers-reduced-motion`; una compilación exitosa no demuestra por sí sola el comportamiento visual.
6. Reportar claramente fallos existentes de tests, limitaciones de validación visual y archivos modificados. No afirmar despliegue, indexación ni captura completada sin evidencia.
