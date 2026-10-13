import type { MetadataRoute } from "next";

// One page, so the sitemap has one entry. The base path matters: on GitHub
// Pages the site lives at /<repo>/, and a sitemap pointing at the bare domain
// sends crawlers to a 404.
const BASE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://bienestaranimal.vercel.app"
).replace(/\/$/, "");
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${BASE_URL}${BASE_PATH}/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}