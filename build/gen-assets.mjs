// Generates the derived image assets.
//
// Runs automatically via the predev / prebuild / prestart hooks in
// package.json, so replacing the source images needs no extra step.
//
//   public/imagenes/     hero sequence -> frames.json manifest
//   public/imagenes3/    JPG gallery -> WebP
//
// The gallery carousel cannot lazy-load its slides: they live inside an
// overflow:hidden track, so a CSS transform never counts as entering the
// viewport and the slides would stay blank when navigating to them.
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const publicDir = path.resolve("public");
// Originals live outside public/ on purpose. Anything in public/ is copied
// verbatim into the static export, and 13 authored JPGs of the cover flow are
// 31.7 MB of weight the site never requests. See README.
const sourcesDir = path.resolve("fuentes");

function webpName(file) {
  return file.replace(/\.(png|jpe?g)$/i, ".webp");
}

// Reads the originals from fuentes/<dir>, writes the WebP into public/<dir>.
async function convertDir(dir, filter, quality, width) {
  const srcDir = path.join(sourcesDir, dir);
  const outDir = path.join(publicDir, dir);
  if (!fs.existsSync(srcDir)) return { converted: 0, reused: 0, from: 0, to: 0 };
  fs.mkdirSync(outDir, { recursive: true });

  let converted = 0;
  let reused = 0;
  let from = 0;
  let to = 0;

  for (const file of fs.readdirSync(srcDir).filter(filter).sort()) {
    const src = path.join(srcDir, file);
    const dest = path.join(outDir, webpName(file));
    const stat = fs.statSync(src);
    from += stat.size;

    if (!fs.existsSync(dest) || fs.statSync(dest).mtimeMs < stat.mtimeMs) {
      // width caps the output. The gallery portraits are authored at 928px but
      // render at 341 CSS px, so 820 covers a dpr-3 phone without carrying a
      // third of the bytes.
      let pipe = sharp(src);
      if (width) pipe = pipe.resize({ width, withoutEnlargement: true });
      await pipe.webp({ quality }).toFile(dest);
      converted++;
    } else {
      reused++;
    }
    to += fs.statSync(dest).size;
  }

  return { converted, reused, from, to };
}

// ---------------------------------------------------------------------------
// Hero sequence: the WebP frames are the source of truth, this only writes the
// ordered manifest the component reads so it never guesses a frame count.
// ---------------------------------------------------------------------------
const framesDir = path.join(publicDir, "imagenes");
const frames = fs
  .readdirSync(framesDir)
  .filter((f) => /^ezgif-frame-\d+\.webp$/i.test(f) && !/-sm\.webp$/i.test(f))
  .sort((a, b) => Number(a.match(/(\d+)/)[1]) - Number(b.match(/(\d+)/)[1]));

if (!frames.length) {
  console.error("no hero frames found in", framesDir);
  process.exit(1);
}

// Phones paint the canvas at ~400 CSS px wide, so decoding 1920x1080 frames
// costs ~112 MB of RAM for pixels nobody sees. Emit a half-size variant for
// small screens.
const SMALL_WIDTH = 900;
let smallMade = 0;
let smallReused = 0;
let smallFixed = 0;

// A variant counts as up to date only if it is also the right SIZE. The mtime
// check alone cannot see a file that was written at the wrong dimensions, and
// one was: ezgif-frame-012-sm.webp sat in the repo at 1920x1080, which made a
// phone decode a 8.3 MB bitmap per frame for a canvas 375px wide. Its mtime was
// newer than its source, so nothing ever regenerated it.
async function wrongSize(file, expectedWidth) {
  try {
    const m = await sharp(file).metadata();
    return !!expectedWidth && m.width > expectedWidth;
  } catch {
    return true; // unreadable: regenerate rather than ship a broken file
  }
}

const start = Number(frames[0].match(/(\d+)/)[1]);
const bytes = frames.reduce((s, f) => s + fs.statSync(path.join(framesDir, f)).size, 0);

const files = [];
for (const webp of frames) {
  const src = path.join(framesDir, webp);
  const smallName = webp.replace(/\.webp$/i, "-sm.webp");
  const smallPath = path.join(framesDir, smallName);

  const exists = fs.existsSync(smallPath);
  const stale = exists && fs.statSync(smallPath).mtimeMs < fs.statSync(src).mtimeMs;
  const oversize = exists && (await wrongSize(smallPath, SMALL_WIDTH));

  if (!exists || stale || oversize) {
    await sharp(src)
      .resize({ width: SMALL_WIDTH, withoutEnlargement: true })
      .webp({ quality: 72 })
      .toFile(smallPath);
    smallMade++;
    if (oversize && !stale) smallFixed++;
  } else {
    smallReused++;
  }

  files.push({ webp, small: smallName });
}

fs.writeFileSync(
  path.join(framesDir, "frames.json"),
  JSON.stringify({ start, files }, null, 2) + "\n",
  "utf8"
);

const smallBytes = files.reduce(
  (s, f) => s + fs.statSync(path.join(framesDir, f.small)).size,
  0
);

console.log(`hero:    ${frames.length} frames  ${frames[0]} -> ${frames[frames.length - 1]}  start=${start}`);
console.log(`         desktop ${(bytes / 1024).toFixed(0)} KB webp`);
console.log(
  `         mobile  ${(smallBytes / 1024).toFixed(0)} KB webp (${smallMade} made, ${smallReused} up to date)`
);

// ---------------------------------------------------------------------------
// Gallery slides, in two sizes.
//
// imagenes3 holds the 4:1 banners (2064x512) used from 768px up.
// imagenes2 holds the same five designs as 4:5 portraits, used below that. At
// 390px wide the banners render only 85px tall, which reads as a stripe rather
// than a slide; the portraits render 426px tall in the same box.
//
// The originals are not kept: dropping a JPG into either folder re-encodes it,
// and removing it afterwards is safe. The WebP is what the site serves, so an
// absent original is normal, not an error.
//
// PORTRAIT_WIDTH caps the gallery portrait set. Those were authored at 928px
// and render at 341 CSS px, so a dpr-3 phone resolves 1023 device px; 820 is
// the smallest size that stays sharp there, and it drops the set from 540 KB to
// 383 KB.
//
// imagenes4 is the service catalogue flyer, one image per breakpoint. Both are
// already close to what the layout needs, so no cap is applied and
// withoutEnlargement keeps them at their authored size.
//
// carrusel is the photo per service shown in the 3D cover flow. The widest
// card is 280px, which is 560 device pixels on a dpr-2 screen, so 480 lands
// just under that and still covers dpr-2 without the 4000px the art came in at.
// Going lower starts to soften the fine print on the cards; going higher only
// buys oversampling nobody can see.
const PORTRAIT_WIDTH = 820;
const BANNER_WIDTH = 1400;
const CARD_WIDTH = 480;

for (const [label, dir, width] of [
  ["gallery desktop", "imagenes3", BANNER_WIDTH],
  ["gallery mobile ", "imagenes2", PORTRAIT_WIDTH],
  ["carrusel       ", "carrusel", CARD_WIDTH],
]) {
  const r = await convertDir(dir, (f) => /\.(jpe?g|png)$/i.test(f), 78, width);
  if (r.reused + r.converted > 0) {
    console.log(
      `${label}: ${r.converted} generated, ${r.reused} up to date  (${(r.from / 1048576).toFixed(2)} MB original -> ${(r.to / 1048576).toFixed(2)} MB webp${width ? `, max ${width}px` : ", full size"})`
    );
  }
}

// The component loads the WebP, so that is what has to exist and what has to
// line up: count the outputs, not the sources.
const webpCount = (dir) =>
  fs.readdirSync(path.join(publicDir, dir)).filter((f) => /\.webp$/i.test(f)).length;

for (const dir of ["imagenes3", "imagenes2", "carrusel"]) {
  if (webpCount(dir) === 0) {
    console.error(
      `no webp in public/${dir}: drop the JPG or PNG there and run npm run frames`
    );
    process.exit(1);
  }
}
// The gallery is art directed too: the component switches between the two at
// 768px, so shipping only one of them would leave the other a 404.
if (webpCount("imagenes3") !== webpCount("imagenes2")) {
  console.error(
    `gallery sets differ: imagenes3 has ${webpCount("imagenes3")} webp, imagenes2 has ${webpCount("imagenes2")}`
  );
  process.exit(1);
}