import "./globals.css";
import "./image-upgrade.css";
import "./hero-cinematic.css";
import "./hero-reference-refinement.css";
import "./hero-height-refinement.css";
import "./hero-mobile-refinement.css";
import "./hero-simple.css";
import "./homepage-expansion.css";
import type { Metadata, Viewport } from "next";
import { Header } from "@/components/site";
import { Footer } from "@/components/footer";
export const metadata: Metadata = {
  metadataBase: new URL("https://zenoraiptv.tv"),
  title: {
    default: "Zenora IPTV | Flexible plans, devices and setup guidance",
    template: "%s | Zenora IPTV",
  },
  description:
    "Zenora IPTV offers flexible subscription plans, compatible-device guidance, and practical setup support for your viewing experience.",
};
export const viewport: Viewport = { width: "device-width", initialScale: 1 };
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  name: "Zenora IPTV",
                  url: "https://zenoraiptv.tv",
                },
                {
                  "@type": "WebSite",
                  name: "Zenora IPTV",
                  url: "https://zenoraiptv.tv",
                },
              ],
            }),
          }}
        />
        <Header />
        <div id="main-content" tabIndex={-1}>
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
