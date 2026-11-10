import siteConfig from "@/config/site.json";

export const siteOrigin = siteConfig.origin;
export const siteHostname = new URL(siteOrigin).hostname;

export function siteUrl(path = "") {
  if (!path || path === "/") return siteOrigin;
  return `${siteOrigin}/${path.replace(/^\/+/, "")}`;
}
