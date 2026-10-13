import sharp from "sharp";
import fs from "node:fs";

// One-off generator for the social card. Committed as a static asset after it
// runs: regenerating it means re-exporting the artwork anyway, so there is
// nothing to gain from doing it at build time.
//
//   node build/gen-og.mjs
const OUT = "public/og.png";

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1B004B"/>
      <stop offset="55%" stop-color="#2A0863"/>
      <stop offset="100%" stop-color="#4C007D"/>
    </linearGradient>
    <radialGradient id="glow1" cx="18%" cy="14%" r="46%">
      <stop offset="0%" stop-color="#AEE2D1" stop-opacity="0.34"/>
      <stop offset="100%" stop-color="#AEE2D1" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glow2" cx="88%" cy="92%" r="44%">
      <stop offset="0%" stop-color="#FFDDC1" stop-opacity="0.30"/>
      <stop offset="100%" stop-color="#FFDDC1" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow1)"/>
  <rect width="1200" height="630" fill="url(#glow2)"/>

  <g opacity="0.10" fill="#FFFFFF">
    <ellipse cx="150" cy="520" rx="17" ry="14"/>
    <ellipse cx="128" cy="497" rx="8" ry="10"/>
    <ellipse cx="146" cy="488" rx="8" ry="10"/>
    <ellipse cx="166" cy="490" rx="8" ry="10"/>
    <ellipse cx="181" cy="503" rx="7" ry="9"/>
    <ellipse cx="1045" cy="130" rx="17" ry="14"/>
    <ellipse cx="1023" cy="107" rx="8" ry="10"/>
    <ellipse cx="1041" cy="98" rx="8" ry="10"/>
    <ellipse cx="1061" cy="100" rx="8" ry="10"/>
    <ellipse cx="1076" cy="113" rx="7" ry="9"/>
  </g>

  <g transform="translate(80 74)">
    <circle cx="46" cy="46" r="46" fill="#FFFFFF" opacity="0.10"/>
    <circle cx="46" cy="46" r="46" fill="none" stroke="#FFDDC1" stroke-opacity="0.45" stroke-width="2"/>
    <path d="M46 74s-19-12-19-26a10.7 10.7 0 0 1 19-6.6A10.7 10.7 0 0 1 65 48c0 14-19 26-19 26z" fill="#FFDDC1"/>
    <path d="M36 50c0-5 4-9 10-9s10 4 10 9" fill="none" stroke="#4C007D" stroke-width="3" stroke-linecap="round"/>
  </g>

  <text x="192" y="112" font-family="Helvetica, Arial, sans-serif" font-size="30" font-weight="700" letter-spacing="7" fill="#AEE2D1">CLÍNICA VETERINARIA</text>
  <text x="192" y="150" font-family="Helvetica, Arial, sans-serif" font-size="22" font-weight="400" letter-spacing="3" fill="#FFFFFF" opacity="0.72">IBAGUÉ · TOLIMA</text>

  <rect x="80" y="248" width="96" height="5" fill="#AEE2D1"/>

  <text x="80" y="360" font-family="Helvetica, Arial, sans-serif" font-size="86" font-weight="700" fill="#FFFFFF">Bienestar</text>
  <text x="80" y="452" font-family="Helvetica, Arial, sans-serif" font-size="86" font-weight="700" fill="#FFDDC1">Animal</text>

  <text x="80" y="524" font-family="Helvetica, Arial, sans-serif" font-size="27" font-weight="400" fill="#FFFFFF" opacity="0.78">Cuidado integral para tu mascota</text>

  <g transform="translate(80 560)">
    <circle cx="20" cy="20" r="20" fill="#FFDDC1" opacity="0.16"/>
    <path d="M14 12c0-3.3 2.7-6 6-6s6 2.7 6 6c0 4.5-6 12-6 12s-6-7.5-6-12z" fill="#FFDDC1"/>
    <circle cx="20" cy="12" r="2.4" fill="#4C007D"/>
    <text x="56" y="28" font-family="Helvetica, Arial, sans-serif" font-size="25" font-weight="600" fill="#FFFFFF">315 647 8656</text>
  </g>
</svg>`;

await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(OUT);

const meta = await sharp(OUT).metadata();
const kb = Math.round(fs.statSync(OUT).size / 1024);
console.log(`${OUT}: ${meta.width}x${meta.height}, ${kb} KB`);