# Bienestar Animal — Clínica Veterinaria

Landing page de una clínica veterinaria en Ibagué (Tolima, Colombia). Hero con
secuencia de scroll sobre canvas, catálogo de servicios en 3D cover flow y
secciones de confianza.

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind 4 · Turbopack.

## Puesta en marcha

```bash
npm install
npm run dev        # http://localhost:3000
```

Los hooks `predev`, `prebuild` y `prestart` ejecutan `npm run frames` antes de
cada arranque: generan los `.webp` de cada imagen fuente y escriben
`public/imagenes/frames.json`. Si cambias las imágenes del hero, no hace falta
nada más.

Ojo con las mayúsculas en los nombres de carpeta: `next dev` (Turbopack) las
resuelve sin distinguir mayúsculas en Windows, `next start` no. Una carpeta
`Carrusel` servida como `/carrusel` da 200 en desarrollo y 404 en producción.

## Scripts

| Script | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm run start` | Sirve el build |
| `npm run lint` | ESLint |
| `npm run frames` | Regenera los WebP (hero, galería y cover flow) y el manifiesto |

### Versión de un solo archivo

`index.html` es una build independiente que no necesita Node ni servidor: CSS,
JavaScript, fuentes e imágenes van embebidos. Se abre con doble clic.

```bash
node build/standalone.mjs "%TEMP%/opencode" index.html
```

Necesita las fuentes Geist descargadas en esa carpeta y `sharp` (devDependency).
La cadena completa es: `npm run build` → `extract.mjs` (markup del SSR) →
`css.mjs` (Tailwind compilado) → `standalone.mjs` (ensamblado).

El carrusel de tarifas también es *art direction*: `public/imagenes3` tiene los
cinco diseños en 4:1 (2064x512) y `public/imagenes2` los mismos cinco en 4:5
(820x1018). El componente elige con un `<picture>` y una media query en 768px,
porque un 4:1 a 390px de ancho solo mide 85px de alto y se lee como una franja.

#### Qué tamaños embebe

El hero son 13 imágenes de 1920 px. En un móvil el canvas se pinta a ~400 px de
ancho, así que decodificarlas ahí cuesta ~112 MB de RAM que nadie ve. Por eso
`gen-assets.mjs` genera además una variante de 900 px, y la build elige cuál
embebe con `--variant`:

| Flag | Embe | Resultado |
| --- | --- | --- |
| `--variant=desktop` (por defecto) | 1920 px | 1.70 MB, nítido a cualquier tamaño de ventana |
| `--variant=mobile` | 900 px | 1.18 MB, ~25 MB de RAM, hero algo borroso en escritorio |
| `--variant=both` | ambas | 2.00 MB, la página elige según el ancho en tiempo de ejecución |

El default es escritorio a propósito: el canvas del hero mide ~1375 px con una
ventana de 1390 px, así que los frames de 900 px quedan a 1.53x de escalado y
se notan blandos. La app de Next.js, que es lo que se sirve en producción, sí
lleva las dos variantes y cambia sola según el ancho de pantalla; este archivo
solo lleva la que elijas, porque el costo de embebirlas duplicadas no se paga en
otro sitio.

El carrusel tiene su propio flag, `--gallery=`. Aquí no es solo cuestión de
bytes: los dos juegos tienen distinta proporción, así que elegir uno también
significa que la página tiene una sola forma en todas partes.

| Flag | Embe | Resultado |
| --- | --- | --- |
| `--gallery=both` (por defecto) | 4:1 + 4:5 | 3.62 MB |
| `--gallery=desktop` | solo 4:1 | 2.92 MB |
| `--gallery=mobile` | solo 4:5 | 2.98 MB |

Cuando solo se embebe un juego, la build quita el `<picture>` y el
`aspect-ratio` del otro, para que el marcado no quede apuntando a un archivo que
un archivo único no puede servir. El cover flow de servicios (13 tarjetas, 0.85
MB) va siempre embebido.

## Estructura

```
src/app/
  layout.tsx        metadata, fuentes, header fijo y botón de urgencias
  page.tsx          hero con canvas + composición de secciones
  globals.css       tokens, marquee, efectos del hero y cover flow
src/components/
  Header.tsx        barra de urgencias (ticker) + navegación sticky
  UrgentButton.tsx  botón flotante de WhatsApp
  CanvasSequence.tsx secuencia del hero sobre canvas
  GaleriaClinica.tsx carrusel de tarifas y jornadas
  ServiciosDestacados.tsx  cover flow 3D de los 13 servicios
  Equipo.tsx        perfiles del equipo
  TestimonialsCarousel.tsx  marquee de testimonios
  Footer.tsx        contacto, mapa y enlaces
build/
  gen-assets.mjs    convierte cada imagen fuente a WebP y escribe frames.json
  standalone.mjs    ensambla index.html
  extract.mjs       saca el markup del SSR
  css.mjs           compila Tailwind para el autónomo
  serve.mjs         sirve index.html para probarlo
_referencia-carrusel/
  style.css, script.js   implementación original del cover flow, sin usar
```

La carpeta `_referencia-carrusel/` es el código fuente del cover flow tal como
llegó, conservado para poder comparar. No se sirve ni se compila.

## Hero

`public/imagenes/` guarda la secuencia en WebP, que es la fuente de verdad, y
`frames.json` como manifiesto ordenado. El componente lee ese manifiesto en vez
de hardcodear cuántos frames hay, así que re-exportar la secuencia no obliga a
tocar código.

El scroll recorre 3.2 pantallas: la animación va del 6% al 62% del recorrido, el
fade del 62% al 81%, y el resto es el traspaso a la siguiente sección.

El frame 000 mide 2867x1600 mientras los demás son 1920x1080. No rompe nada
porque el canvas pinta con `object-cover`, pero ocupa el doble de RAM
decodificada que los otros.

## Antes de publicar

- **Los nombres de `Equipo.tsx` son ficticios** (Dra. Camila Restrepo, Dr. Andrés
  Lozano, Dra. Valentina Torres, Diego Marley). Son personas reales que no
  existen en una web de una clínica real: o se reemplazan por el equipo de verdad
  o se quita la sección.
- Los ocho testimonios de `TestimonialsCarousel.tsx` también son inventados, con
  nombre y puntuación. En Colombia eso es publicidad engañosa, y Google penaliza
  las reseñas marcadas como `schema.org/Review` que no sean reales. Hoy no se
  emiten como datos estructurados, lo que evita parte del problema pero no el de
  fondo.
- `Header.tsx` y `Footer.tsx` tienen el teléfono real (`315 647 8656`); el email
  sigue siendo de ejemplo.
- La URL canónica está en `SITE_URL`, en `src/app/layout.tsx`.
- Los enlaces del pie a Política de privacidad, Términos, Aviso legal y Cookies
  apuntan a `#`.

## Notas sobre las imágenes

`public/imagenes3/` son banners de 2064x512 (ratio 4:1) y `public/imagenes2/`
los mismos cinco diseños en 4:5 (820x1018). El marco fija el ratio con
`aspect-ratio` por breakpoint, no con las dimensiones intrínsecas, porque las
dos fuentes tienen proporciones distintas y un solo par de atributos `width` y
`height` no puede describirlas.

El carrusel no puede usar `loading="lazy"`: las slides viven en una pista con
`overflow: hidden`, así que el navegador nunca las ve entrar al viewport y se
quedan en blanco al navegar. Lo mismo ocurre en el cover flow, donde las
tarjetas viven en un escenario con transform 3D. Se cargan eager, y por eso
están en WebP (3.27 MB → 0.48 MB).

La numeración de las carpetas es inconsistente (`01.jpg`, `2.jpg`, ...), por eso
el componente ordena por número extraído del nombre en vez de por orden
alfabético.

`public/imagenes4/` ya no lo usa ninguna sección: era el flyer del catálogo que
estaba antes del cover flow. Son 3.19 MB sin referenciar.