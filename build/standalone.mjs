import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(".");
const tmp = process.argv[2];
const out = process.argv[3];

// Which hero frame size to embed. Carrying both lets the page pick at runtime
// but costs ~500 KB, so it is opt-in via --variant=both.
//
// Default is desktop on purpose. The hero canvas is ~1375 px wide at 1390 px of
// viewport, so the 900 px frames land at a 1.53x upscale and read as visibly
// soft. 628 KB of download is a fair price for that; the 112 MB of decoded RAM
// only matters on low-end phones, and the Next.js app -- the artifact that is
// actually served -- keeps both sets and does adapt.
//   desktop (default) full-size frames, sharp at any window size
//   mobile             900 px frames, 1.18 MB, ~25 MB decoded RAM
//   both               embed both and choose by viewport at runtime
const variantArg = process.argv.find((a) => a.startsWith("--variant="));
const VARIANT = variantArg ? variantArg.split("=")[1] : "desktop";
if (!["mobile", "desktop", "both"].includes(VARIANT)) {
  console.error(`--variant must be mobile, desktop or both (got "${VARIANT}")`);
  process.exit(1);
}

// Same idea for the gallery art. Here it matters more than bytes: the two sets
// have different aspect ratios (4:1 vs 4:5), so picking one also means the
// page has one shape everywhere, and the markup is rewritten to match.
//   both (default) 2.40 MB, the <picture> picks per viewport like the app does
//   desktop        1.91 MB, 4:1 everywhere
//   mobile         2.05 MB, 4:5 everywhere
const galleryArg = process.argv.find((a) => a.startsWith("--gallery="));
const GALLERY = galleryArg ? galleryArg.split("=")[1] : "both";
if (!["mobile", "desktop", "both"].includes(GALLERY)) {
  console.error(`--gallery must be mobile, desktop or both (got "${GALLERY}")`);
  process.exit(1);
}

const read = (p) => fs.readFileSync(path.join(tmp, p));
const readText = (p) => fs.readFileSync(path.join(tmp, p), "utf8");
const b64 = (buf) => Buffer.from(buf).toString("base64");

// ---------------------------------------------------------------------------
// 1. Images -> WebP data URIs
// ---------------------------------------------------------------------------
// Inlining the original PNGs would produce a ~48 MB file; WebP lands near 2 MB.

// Use the same manifest the runtime reads, so a re-export that renumbers the
// sequence (000-based instead of 001-based) is picked up without edits here.
const frameDir = path.join(root, "public", "imagenes");
const manifest = JSON.parse(
  fs.readFileSync(path.join(frameDir, "frames.json"), "utf8")
);

const wantFull = VARIANT === "desktop" || VARIANT === "both";
const wantSmall = VARIANT === "mobile" || VARIANT === "both";
const frames = [];
const framesSmall = [];

if (wantFull || wantSmall) {
  for (const entry of manifest.files) {
    const name = typeof entry === "string" ? entry : entry.webp;
    const src = path.join(frameDir, name);
    // Already WebP on disk: read as-is rather than re-encoding (a second lossy
    // pass for no gain).
    const disk = (f) => (/\.webp$/i.test(f) ? fs.readFileSync(path.join(frameDir, f)) : null);
    const buf = disk(name) ?? (await sharp(src).webp({ quality: 74 }).toBuffer());
    if (wantFull) frames.push(buf);

    // Half-size copy for phones: the canvas is ~400 CSS px wide there, so the
    // full-size frames cost ~112 MB of decoded RAM for pixels nobody sees.
    const smallName =
      typeof entry === "string"
        ? name.replace(/\.webp$/i, "-sm.webp")
        : entry.small ?? name.replace(/\.webp$/i, "-sm.webp");
    const smallPath = path.join(frameDir, smallName);
    if (!wantSmall) continue;
    framesSmall.push(
      fs.existsSync(smallPath)
        ? fs.readFileSync(smallPath)
        : await sharp(buf)
            .resize({ width: 900, withoutEnlargement: true })
            .webp({ quality: 72 })
            .toBuffer()
    );
  }
}

const embedded = VARIANT === "mobile" ? framesSmall : frames;

// Gallery, in both sizes. imagenes3 is the 4:1 banner and imagenes2 the 4:5
// portrait; the component picks between them with a <picture>, so both have to
// be inlined for the single-file build to match what the app serves.
const GALLERY_WIDE = [
  "imagenes3/01.webp",
  "imagenes3/2.webp",
  "imagenes3/3.webp",
  "imagenes3/4.webp",
  "imagenes3/5.webp",
];
const GALLERY_NARROW = [
  "imagenes2/1.webp",
  "imagenes2/2.webp",
  "imagenes2/3.webp",
  "imagenes2/4.webp",
  "imagenes2/5.webp",
];

// Service cards for the 3D cover flow, one image per service. Read straight off
// disk: the folder names the cards, not the build script.
//
// Two forms of each name: "file" to open from disk, "url" to match against the
// markup. They differ because the component encodes the URL -- one card is
// "24 H.webp" and the markup says "24%20H.webp".
const CARRUSEL_DIR = path.join(root, "public", "carrusel");
const CARRUSEL = fs
  .readdirSync(CARRUSEL_DIR)
  .filter((f) => /\.webp$/i.test(f))
  .sort((a, b) => a.localeCompare(b, "es"))
  .map((file) => ({ file, url: encodeURI(`carrusel/${file}`) }));

const contentImages = [
  ...(GALLERY === "mobile" ? [] : GALLERY_WIDE.map((r) => [r, 1400])),
  ...(GALLERY === "desktop" ? [] : GALLERY_NARROW.map((r) => [r, 928])),
  ...CARRUSEL.map((c) => [`carrusel/${c.file}`, 0]),
];
const contentMap = new Map();
for (const [rel, width] of contentImages) {
  const src = path.join(root, "public", rel);
  // Already WebP on disk: read it rather than re-encoding, which would be a
  // second lossy pass for no gain.
  const buf = /\.webp$/i.test(rel)
    ? fs.readFileSync(src)
    : await sharp(src)
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: 78 })
        .toBuffer();
  contentMap.set(rel, buf);
}
// The markup carries the encoded URL, so alias the entries whose file name
// needed escaping ("24 H.webp" is written as "24%20H.webp").
for (const c of CARRUSEL) {
  if (c.url !== `carrusel/${c.file}`) {
    contentMap.set(c.url, contentMap.get(`carrusel/${c.file}`));
  }
}

// ---------------------------------------------------------------------------
// 2. Fonts -> base64 @font-face
// ---------------------------------------------------------------------------
const fontCss = `
@font-face{font-family:'Geist';font-style:normal;font-weight:400 900;font-display:swap;src:url(data:font/woff2;base64,${b64(read("geist.woff2"))}) format('woff2')}
@font-face{font-family:'Geist Mono';font-style:normal;font-weight:400 700;font-display:swap;src:url(data:font/woff2;base64,${b64(read("geist-mono.woff2"))}) format('woff2')}
:root{--font-geist-sans:'Geist';--font-geist-mono:'Geist Mono'}
`;

// ---------------------------------------------------------------------------
// 3. Body markup: rewrite image refs to data URIs
// ---------------------------------------------------------------------------
let body = readText(process.env.BODY_FILE || "body2.html");

// Collapse the <picture> when only one gallery set is embedded. This runs before
// the inlining pass so exactly one path is left to rewrite; skipping it would
// leave a srcSet pointing at a file a single-file build does not have, and the
// browser would silently fall back to the wrong shape.
const PIC = " aspect-[4/5] md:aspect-[2064/512]";
if (GALLERY === "mobile") {
  GALLERY_WIDE.forEach((wide, i) => {
    body = body.split(`<img src="/${wide}"`).join(`<img src="/${GALLERY_NARROW[i]}"`);
  });
  body = body.replace(/<source media="[^"]*" srcSet="[^"]*"\/>/g, "");
  body = body.replaceAll(PIC, " aspect-[4/5]");
} else if (GALLERY === "desktop") {
  body = body.replace(/<source media="[^"]*" srcSet="[^"]*"\/>/g, "");
  body = body.replaceAll(PIC, " aspect-[2064/512]");
}

for (const [rel, buf] of contentMap) {
  const uri = `data:image/webp;base64,${b64(buf)}`;
  // Both attributes have to be rewritten: the gallery <img> carries the banner
  // in src and its <source> child carries the portrait in srcset. Miss the
  // second one and phones request a file that does not exist in a single-file
  // build, so the <picture> silently falls back to the 4:1 banner.
  //
  // The attribute is matched case-insensitively because React 19 renders
  // srcSet in camelCase while older markup emitted lowercase srcset.
  const attr = new RegExp(`(\\s(?:src|srcset)=")/${rel}(")`, "gi");
  body = body.replace(attr, `$1${uri}$2`);
}

// Remove the inline <style> block for the service animations: it moves into
// the single stylesheet so we do not ship two copies.
body = body.replace(/<style>[\s\S]*?node-float[\s\S]*?<\/style>/, "");

// ---------------------------------------------------------------------------
// 4. Behaviour: vanilla ports of the three client components
// ---------------------------------------------------------------------------
const script = `<script>
(function () {
  "use strict";

  // --- CanvasSequence -------------------------------------------------------
  // Port of CanvasSequence.tsx. Two fixes over the original: only the frames
  // the scroll range can actually reach are decoded, and the RAF loop parks
  // itself while the hero is off-screen.
  var canvas = document.querySelector("canvas");
  var track = canvas && canvas.closest("main");
  if (canvas && track) {
    var ctx = canvas.getContext("2d", { alpha: false });
${
  VARIANT === "both"
    ? `    var framesFull = ${JSON.stringify(
        frames.map((f) => `data:image/webp;base64,${b64(f)}`)
      )};
    var framesSmall = ${JSON.stringify(
        framesSmall.map((f) => `data:image/webp;base64,${b64(f)}`)
      )};
    // Phones paint the canvas at ~400 CSS px wide; decoding the full-size
    // frames there costs ~112 MB of RAM for pixels nobody sees.
    var frames = window.matchMedia("(max-width: 768px)").matches ? framesSmall : framesFull;`
    : `    // Single embedded size (build flag --variant=${VARIANT}).
    var frames = ${JSON.stringify(
        embedded.map((f) => `data:image/webp;base64,${b64(f)}`)
      )};`
}
    var FRAME_COUNT = frames.length;
    var imgs = frames.map(function (src) {
      var im = new Image();
      im.src = src;
      return im;
    });

    var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var current = 1, target = 1, raf = 0, pending = 0;

    // Derive from the frames actually embedded rather than a hardcoded number:
    // a replaced hero sequence must not leave this pointing past the last one.
    var PLAY_START = 0.06, TRANSITION_FRAME = FRAME_COUNT, DOOR_END = 0.76, PLAY_END = 0.81;

    function render(i) {
      var idx = Math.max(0, Math.min(FRAME_COUNT - 1, Math.round(i) - 1));
      // Fall back to the nearest earlier decoded frame so a missing or
      // still-loading image never freezes the canvas.
      function ready(im) { return !!im && im.complete && im.naturalWidth > 0; }
      while (idx > 0 && !ready(imgs[idx])) idx--;
      var img = imgs[idx];
      if (!ready(img)) return;
      var dpr = window.devicePixelRatio || 1;
      var rect = canvas.getBoundingClientRect();
      var tw = Math.floor(rect.width * dpr), th = Math.floor(rect.height * dpr);
      if (canvas.width !== tw || canvas.height !== th) {
        canvas.width = tw; canvas.height = th;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
      ctx.fillStyle = "#1B004B";
      ctx.fillRect(0, 0, rect.width, rect.height);
      var ratio = Math.max(rect.width / img.width, rect.height / img.height);
      var dx = (rect.width - img.width * ratio) / 2;
      var dy = (rect.height - img.height * ratio) / 2;
      ctx.drawImage(img, dx, dy, img.width * ratio, img.height * ratio);
    }

    function updateScroll() {
      var scrollable = track.offsetHeight - window.innerHeight;
      var rect = track.getBoundingClientRect();
      var fraction = scrollable > 0 ? -rect.top / scrollable : 0;
      fraction = Math.max(0, Math.min(1, fraction));
      var overlay = 0;
      if (fraction <= PLAY_START) target = 1;
      else if (fraction < DOOR_END) target = 1 + ((fraction - PLAY_START) / (DOOR_END - PLAY_START)) * (TRANSITION_FRAME - 1);
      else if (fraction < PLAY_END) { target = TRANSITION_FRAME; overlay = (fraction - DOOR_END) / (PLAY_END - DOOR_END); }
      else { target = TRANSITION_FRAME; overlay = 1; }
      document.documentElement.style.setProperty("--hero-progress", overlay.toFixed(4));
      if (reduced) current = target;

      // Park the loop while the hero is far off-screen, using the rect we already
      // measured so play/pause lives in one place.
      if (rect.bottom > -200 && rect.top < window.innerHeight + 200) play();
      else pause();
    }

    function loop() {
      if (!reduced) {
        var delta = target - current;
        current += delta * (Math.abs(delta) > 8 ? 0.22 : 0.14);
      }
      render(current);
      raf = requestAnimationFrame(loop);
    }

    function play() { if (!raf) loop(); }
    function pause() { if (raf) { cancelAnimationFrame(raf); raf = 0; } }

    var resizeTimer;
    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("resize", function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () { render(current); }, 50);
    });

    updateScroll();
  }

// --- ServiciosDestacados (cover flow 3D) ---------------------------------
  // Vanilla port of the cover flow. The markup arrives already laid out for
  // index 0, so this only has to react to a change and rewrite the transforms.
  // The arithmetic matches _referencia-carrusel/script.js exactly.
  (function () {
    var root = document.querySelector(".coverflow");
    if (!root) return;

    var cards = [].slice.call(root.querySelectorAll(".coverflow__card"));
    var dashes = [].slice.call(root.querySelectorAll(".coverflow__dash"));
    var viewport = root.querySelector(".coverflow__viewport");
    var titleEl = root.querySelector(".coverflow__title");
    var prevBtn = root.querySelector('[aria-label="Servicio anterior"]');
    var nextBtn = root.querySelector('[aria-label="Servicio siguiente"]');
    var total = cards.length;
    if (!total) return;

    var titles = cards.map(function (c) { return c.getAttribute("data-title") || ""; });
    var cur = 0;

    function metrics(w) {
      if (w <= 600) return { baseOffset: 90, stepOffset: 70, baseZ: -100, stepZ: 50, rotateAngle: 38 };
      if (w <= 900) return { baseOffset: 120, stepOffset: 95, baseZ: -130, stepZ: 65, rotateAngle: 42 };
      return { baseOffset: 150, stepOffset: 125, baseZ: -150, stepZ: 75, rotateAngle: 46 };
    }

    function update() {
      var m = metrics(window.innerWidth);

      cards.forEach(function (card, idx) {
        var offset = idx - cur;
        var abs = Math.abs(offset);
        var active = offset === 0;
        var x = active ? 0 : (offset > 0 ? 1 : -1) * (m.baseOffset + (abs - 1) * m.stepOffset);
        var z = active ? 0 : m.baseZ - (abs - 1) * m.stepZ;
        var rot = active ? 0 : (offset > 0 ? -1 : 1) * m.rotateAngle;
        var scale = active ? 1 : Math.max(0.62, 1 - abs * 0.075);
        var opacity = active ? 1 : Math.max(0, 1 - (abs - 1) * 0.22);
        var brightness = active ? 1 : Math.max(0.4, 0.9 - abs * 0.12);

        card.style.transform =
          "translateX(" + x + "px) translateZ(" + z + "px) rotateY(" + rot + "deg) scale(" + scale + ")";
        card.style.zIndex = String(50 - abs);
        card.style.opacity = String(opacity);
        card.style.filter = "brightness(" + brightness + ")";
        card.classList.toggle("is-active", active);
      });

      dashes.forEach(function (d, idx) {
        var on = idx === cur;
        d.classList.toggle("is-active", on);
        d.setAttribute("aria-selected", String(on));
      });

      prevBtn.disabled = cur === 0;
      nextBtn.disabled = cur === total - 1;

      if (titleEl && titles[cur] && titleEl.textContent !== titles[cur]) {
        titleEl.textContent = titles[cur];
      }
    }

    function goTo(n) {
      cur = Math.min(Math.max(0, n), total - 1);
      update();
    }

    if (prevBtn) prevBtn.addEventListener("click", function () { goTo(cur - 1); });
    if (nextBtn) nextBtn.addEventListener("click", function () { goTo(cur + 1); });
    dashes.forEach(function (d, idx) {
      d.addEventListener("click", function () { goTo(idx); });
    });
    cards.forEach(function (c, idx) {
      var hit = c.querySelector("button");
      if (hit) hit.addEventListener("click", function () { goTo(idx); });
    });

    window.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") goTo(cur - 1);
      else if (e.key === "ArrowRight") goTo(cur + 1);
    });

    if (viewport) {
      var startX = 0;
      var dragging = false;
      var wheelUntil = 0;
      var THRESHOLD = 40;
      var DEBOUNCE = 300;

      viewport.addEventListener("mousedown", function (e) { startX = e.clientX; dragging = true; });
      window.addEventListener("mouseup", function (e) {
        if (!dragging) return;
        dragging = false;
        var diff = e.clientX - startX;
        if (diff > THRESHOLD) goTo(cur - 1);
        else if (diff < -THRESHOLD) goTo(cur + 1);
      });
      viewport.addEventListener("touchstart", function (e) {
        if (e.touches.length) { startX = e.touches[0].clientX; dragging = true; }
      }, { passive: true });
      viewport.addEventListener("touchend", function (e) {
        if (!dragging || !e.changedTouches.length) return;
        dragging = false;
        var diff = e.changedTouches[0].clientX - startX;
        if (diff > THRESHOLD) goTo(cur - 1);
        else if (diff < -THRESHOLD) goTo(cur + 1);
      }, { passive: true });
      viewport.addEventListener("wheel", function (e) {
        // Shift+wheel and horizontal swipes belong to the page.
        if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;

        var dir = e.deltaY > 0 ? 1 : -1;
        var atEnd = dir > 0 ? cur >= total - 1 : cur <= 0;
        // Release the scroll at either end, so the section is not a trap the
        // visitor has to hunt past.
        if (atEnd) return;

        e.preventDefault();

        var now = Date.now();
        if (now < wheelUntil) return;
        wheelUntil = now + DEBOUNCE;
        goTo(cur + dir);
      }, { passive: false });
    }

    var resizeTimer;
    window.addEventListener("resize", function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(update, 50);
    });

    update();
  })();

  // --- GaleriaClinica (carrusel) -------------------------------------------
  // Port of the gallery carousel. Wrapped in its own scope on purpose: sharing
  // the outer IIFE let "var track" and "var reduced" collide with the canvas
  // block above, which silently broke the hero scroll mapping.
  (function () {
    var gal = document.querySelector('[aria-roledescription="carrusel"]');
    if (!gal) return;
    var gTrack = gal.querySelector('div[style*="translateX"]');
    var slides = gTrack ? gTrack.children.length : 0;
    if (!slides) return;
    var dots = [].slice.call(gal.querySelectorAll('[aria-label^="Ir a la imagen"]'));
    var counter = gal.querySelector("span.tabular-nums");
    var btns = [].slice.call(gal.querySelectorAll("button"));
    var nextBtn = btns.filter(function (b) { return /siguiente/i.test(b.getAttribute("aria-label") || ""); })[0];
    var prevBtn = btns.filter(function (b) { return /anterior/i.test(b.getAttribute("aria-label") || ""); })[0];
    var idx = 0;
    var galTimer = null;
    var noMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function paint() {
      gTrack.style.transform = "translateX(-" + idx * 100 + "%)";
      dots.forEach(function (d, i) {
        if (i === idx) d.setAttribute("aria-current", "true");
        else d.removeAttribute("aria-current");
      });
      if (counter) {
        counter.textContent =
          String(idx + 1).padStart(2, "0") + " / " + String(slides).padStart(2, "0");
      }
      [].slice.call(gTrack.children).forEach(function (fig, i) {
        if (i === idx) fig.removeAttribute("aria-hidden");
        else fig.setAttribute("aria-hidden", "true");
      });
    }

    function restart() {
      if (galTimer) clearInterval(galTimer);
      if (noMotion) return;
      galTimer = setInterval(function () { go(idx + 1); }, 5200);
    }

    function go(n) {
      idx = ((n % slides) + slides) % slides;
      paint();
      restart();
    }

    if (nextBtn) nextBtn.addEventListener("click", function () { go(idx + 1); });
    if (prevBtn) prevBtn.addEventListener("click", function () { go(idx - 1); });
    dots.forEach(function (d, i) { d.addEventListener("click", function () { go(i); }); });

    var frame = gal.querySelector("[tabindex]");
    if (frame) {
      frame.addEventListener("keydown", function (e) {
        if (e.key === "ArrowRight") { e.preventDefault(); go(idx + 1); }
        else if (e.key === "ArrowLeft") { e.preventDefault(); go(idx - 1); }
      });
      frame.addEventListener("mouseenter", function () { if (galTimer) clearInterval(galTimer); });
      frame.addEventListener("mouseleave", restart);
      frame.addEventListener("focusin", function () { if (galTimer) clearInterval(galTimer); });
      frame.addEventListener("focusout", restart);
    }

    paint();
    restart();
  })();

  // --- Sticky header -------------------------------------------------------
  // Own scope for the same reason as the gallery block.
  (function () {
    var header = document.querySelector("header");
    if (!header) return;
    var toggle = header.querySelector("[aria-controls]");
    var panel = document.getElementById("menu-movil");
    if (toggle && panel) {
      toggle.addEventListener("click", function () {
        var open = toggle.getAttribute("aria-expanded") !== "true";
        toggle.setAttribute("aria-expanded", String(open));
        panel.hidden = !open;
        panel.classList.toggle("hidden", !open);
        document.body.style.overflow = open ? "hidden" : "";
      });
      panel.classList.add("hidden");
      [].slice.call(panel.querySelectorAll("a")).forEach(function (a) {
        a.addEventListener("click", function () {
          panel.hidden = true;
          panel.classList.add("hidden");
          toggle.setAttribute("aria-expanded", "false");
          document.body.style.overflow = "";
        });
      });
    }

    var bar = header.children[1] || header;
    window.addEventListener("scroll", function () {
      bar.classList.toggle("shadow-lg", window.scrollY > 24);
    }, { passive: true });
  })();
})();
<\/script>`;

const css = readText(process.env.CSS_FILE || "styles2.css") + fontCss;

// ---------------------------------------------------------------------------
// 5. Assemble
// ---------------------------------------------------------------------------
// Title/description/lang are fixed here rather than carried over from the
// create-next-app defaults the layout still had.
const html = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Bienestar Animal | Clínica Veterinaria</title>
<meta name="description" content="Clínica veterinaria en Ibagué, Tolima. Brindamos cuidado y salud integral a tus mascotas con un equipo profesional y un trato lleno de amor.">
<meta name="robots" content="index, follow">
<meta name="keywords" content="clínica veterinaria, veterinario Ibagué, veterinaria Tolima, consulta veterinaria, cirugía veterinaria, vacunación mascotas, hospitalización veterinaria">
<meta name="theme-color" content="#1B004B">
<meta property="og:title" content="Bienestar Animal | Clínica Veterinaria">
<meta property="og:description" content="Clínica veterinaria en Ibagué, Tolima. Brindamos cuidado y salud integral a tus mascotas con un equipo profesional y un trato lleno de amor.">
<meta property="og:type" content="website">
<meta property="og:locale" content="es_CO">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Bienestar Animal | Clínica Veterinaria">
<meta name="twitter:description" content="Clínica veterinaria en Ibagué, Tolima. Brindamos cuidado y salud integral a tus mascotas con un equipo profesional y un trato lleno de amor.">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Ccircle cx='16' cy='16' r='16' fill='%231B004B'/%3E%3Cpath d='M16 26s-8-5-8-11a4.5 4.5 0 018-2.8A4.5 4.5 0 0124 15c0 6-8 11-8 11z' fill='%23FFDDC1'/%3E%3C/svg%3E">
<style>
${css}
</style>
</head>
<body class="min-h-full flex flex-col">
${body}
${script}
</body>
</html>`;

fs.writeFileSync(out, html, "utf8");

const size = Buffer.byteLength(html, "utf8");
console.log("output:", out);
console.log("frames inlined:", embedded.length, `(variant: ${VARIANT})`);
console.log("gallery:", GALLERY);
console.log("size:", (size / 1024 / 1024).toFixed(2), "MB");
console.log(
  "image payload:",
  (
    (embedded.reduce((s, f) => s + f.length, 0) +
      [...contentMap.values()].reduce((s, f) => s + f.length, 0)) /
    1024 /
    1024
  ).toFixed(2),
  "MB raw"
);