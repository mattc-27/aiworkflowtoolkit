// app/sitemap.ts
import type { MetadataRoute } from "next";
import { tools } from "./config/tools";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = (
    process.env.NEXT_PUBLIC_SITE_URL || "https://example.com"
  ).replace(/\/+$/, "");
  const now = new Date();

  return [
    { url: `${base}/`, lastModified: now },
    { url: `${base}/tools`, lastModified: now },
    { url: `${base}/docs`, lastModified: now },
    { url: `${base}/changelog`, lastModified: now },
    ...tools.map((t) => ({
      url: `${base}/tools/${t.slug}`,
      lastModified: now,
    })),
  ];
}
