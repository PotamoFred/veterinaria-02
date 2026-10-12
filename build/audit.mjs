import fs from "node:fs";

const h = fs.readFileSync(process.argv[2], "utf8");

const abs = [...h.matchAll(/(?:src|href)="(\/[^"]*)"/g)].map((m) => m[1]);
console.log("absolute local refs:", abs.length ? abs.join(", ") : "NONE");
console.log("_next refs:", (h.match(/_next/g) || []).length);
console.log("/imagenes refs:", (h.match(/\/imagenes/g) || []).length);
console.log("webp data URIs:", (h.match(/data:image\/webp/g) || []).length);
console.log("font data URIs:", (h.match(/data:font\/woff2/g) || []).length);
console.log("size MB:", (Buffer.byteLength(h, "utf8") / 1048576).toFixed(2));
console.log("doctype ok:", h.startsWith("<!DOCTYPE html>"));
console.log("script open/close:", (h.match(/<script/g) || []).length, (h.match(/<\/script>/g) || []).length);
console.log("style open/close:", (h.match(/<style/g) || []).length, (h.match(/<\/style>/g) || []).length);

// Every img must resolve to something embedded, not a file path.
const srcs = [...h.matchAll(/<img[^>]*src="([^"]{0,60})/g)].map((m) => m[1]);
const nonEmbedded = srcs.filter((s) => !s.startsWith("data:"));
console.log("img tags:", srcs.length, "not embedded:", nonEmbedded.length, nonEmbedded.join(" | "));