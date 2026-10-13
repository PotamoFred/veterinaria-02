import type { NextConfig } from "next";

// GitHub Pages serves the site from https://<user>.github.io/<repo>/, so the
// whole app has to live under a base path. NEXT_PUBLIC_BASE_PATH is the single
// source of truth: the Pages workflow exports it, the app reads the same
// variable to build the canonical URL and the og:image. Deriving it here from
// GITHUB_REPOSITORY as well is what let those two disagree once already.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  // GitHub Pages has no Node server to host the app, only static files. Every
  // route here is a server component with no dynamic data, so a full static
  // export loses nothing.
  output: process.env.NEXT_OUTPUT === "export" ? "export" : undefined,
  basePath: basePath || undefined,
  // Absolute paths in <a href> and metadata are resolved against this. Without
  // it the canonical URL and the og:image point at the bare domain while the
  // assets are served from the repository subdirectory.
  assetPrefix: basePath || undefined,
  // Pages does not rewrite /about to /about/index.html on its own, so every
  // route needs the trailing slash to resolve.
  trailingSlash: true,
  images: {
    // No optimiser on a static host. The site uses plain <img> throughout, so
    // this only matters if an <Image> is ever added.
    unoptimized: true,
  },
};

export default nextConfig;