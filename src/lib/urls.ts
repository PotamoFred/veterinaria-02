/**
 * Builds a URL for an asset in public/.
 *
 * Why this exists instead of just writing "/carrusel/x.webp": the basePath in
 * next.config.ts is applied by Next to the paths it resolves itself, but not to
 * a literal string in a plain <img src>. On GitHub Pages, where the site is
 * served from /<repo>/, those images 404.
 *
 * The variable is inlined at build time, which is what makes this work in a
 * client component.
 */
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** "/carrusel/Cirugia.webp" -> "/veterinaria-02/carrusel/Cirugia.webp" on Pages. */
export function asset(ruta: string): string {
  return `${BASE_PATH}/${ruta.replace(/^\/+/, "")}`;
}

/** Same, but keeps a filename with spaces as a valid URL. */
export function assetEncoded(ruta: string): string {
  return encodeURI(asset(ruta));
}