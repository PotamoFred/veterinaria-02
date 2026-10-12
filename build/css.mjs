import fs from "node:fs";
import path from "node:path";
import postcss from "postcss";
import tailwind from "@tailwindcss/postcss";

const root = path.resolve(".");
const bodyFile = process.argv[2];
const outFile = process.argv[3];

const body = fs.readFileSync(bodyFile, "utf8");

// The SSR markup carries every utility class actually used on the page, so
// scan that file directly instead of guessing at source globs.
// path.resolve, not path.join: these inputs are already absolute and
// path.join would concatenate them onto the repo root.
const scanTargets = [bodyFile, "src/app/globals.css"].map((p) =>
  path.resolve(root, p)
);

const css = fs.readFileSync(path.join(root, "src/app/globals.css"), "utf8");

// `source(none)` disables auto-detection so the explicit @source rules below
// are the only inputs. Without it the plugin also crawls from the CSS file's
// own directory and emits nothing useful for our extracted markup.
const withSources =
  `@import "tailwindcss" source(none);\n` +
  scanTargets.map((t) => `@source ${JSON.stringify(t)};\n`).join("") +
  `\n` +
  css.replace(/@import\s+"tailwindcss";?/, "");

const result = await postcss([tailwind()]).process(withSources, {
  from: undefined,
  to: outFile,
});

fs.writeFileSync(outFile, result.css, "utf8");

console.log("css bytes:", result.css.length);
console.log("css lines:", result.css.split("\n").length);
if (result.warnings().length) {
  for (const w of result.warnings()) console.log("warn:", w.text);
}