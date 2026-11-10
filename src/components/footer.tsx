import Link from "next/link";
import { brand } from "@/config/brand";
import { nav } from "@/config/navigation";

export function Footer() {
  return <footer className="footer"><div className="shell footer-grid"><div><div className="brand"><i />ZENORA IPTV</div><p className="muted">{brand.tagline} Flexible plans, compatible devices, and guided setup in one considered experience.</p></div><div><p className="footer-heading">Explore</p>{nav.slice(1, 5).map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}<Link href="/how-it-works">How it works</Link><Link href="/trial">Paid trial information</Link><Link href="/about">About Zenora IPTV</Link></div><div><p className="footer-heading">Blog</p><Link href="/blog">All articles</Link><Link href="/blog?category=fundamentals">IPTV fundamentals</Link><Link href="/blog?category=performance">Troubleshooting</Link><Link href="/blog?category=safety">Safety &amp; privacy</Link></div><div><p className="footer-heading">Legal</p><Link href="/privacy-policy">Privacy</Link><Link href="/terms">Terms</Link><Link href="/refund-policy">Refund policy</Link><Link href="/cookie-policy">Cookies</Link></div></div><div className="shell muted" style={{ fontSize: 12, marginTop: 35 }}>© 2026 Zenora IPTV. Business details and policies require final review before publication.</div></footer>;
}
