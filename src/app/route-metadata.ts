import type { Metadata } from "next";

const socialImage = "/images/guides/iptv-login-authentication-errors-overview.webp";

export function brandMetadata(title: string, description: string, canonical: string, noindex = false): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical },
    robots: noindex ? { index: false, follow: true } : undefined,
    openGraph: { title, description, url: canonical, images: [{ url: socialImage, alt: "Zenora IPTV guidance" }] },
    twitter: { card: "summary_large_image", title, description, images: [socialImage] },
  };
}

export function privateMetadata(title: string, description: string): Metadata {
  return {
    title: { absolute: title },
    description,
    robots: { index: false, follow: false },
    openGraph: { title, description, images: [{ url: socialImage, alt: "Zenora IPTV" }] },
    twitter: { card: "summary_large_image", title, description, images: [socialImage] },
  };
}
