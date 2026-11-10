import type { MetadataRoute } from "next";
import { guides } from "@/data/guides";
import { siteUrl } from "@/config/site";

const publicPaths = ["", "pricing", "channels", "features", "devices", "how-it-works", "trial", "faq", "contact", "about", "setup", "troubleshooting", "renew", "support", "blog"];
const setupPaths = ["android", "apple-tv", "firestick", "ios", "mac", "mag", "smart-tv", "windows"];

export default function sitemap(): MetadataRoute.Sitemap {
  const updated = new Date("2026-10-28T12:00:00Z");
  return [
    ...publicPaths.map((path) => ({ url: siteUrl(path), lastModified: updated })),
    ...setupPaths.map((path) => ({ url: siteUrl(`/setup/${path}`), lastModified: updated })),
    ...guides.map((guide) => ({ url: siteUrl(`/blog/${guide.slug}`), lastModified: new Date(`${guide.updated}T12:00:00Z`) })),
  ];
}
