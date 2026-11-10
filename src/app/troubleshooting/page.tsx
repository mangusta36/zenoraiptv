import Link from "next/link";
import { guides } from "@/data/guides";
import { articleRelationships, clusterJourneys } from "@/data/topic-architecture";
import { brandMetadata } from "../route-metadata";

export const metadata = brandMetadata("IPTV Not Working? Troubleshooting Guide | Zenora IPTV", "Diagnose IPTV buffering, playlist, EPG, picture, sound, login, or authentication symptoms one layer at a time.", "/troubleshooting");

const symptomPaths = [
  ["Playback pauses or quality changes", "Compare delivery, device, player, and local-network conditions without assuming one speed test identifies the cause.", "iptv-buffering-causes"],
  ["Wi-Fi or Ethernet is the question", "Compare the same device and viewing location before treating a cable as a universal fix.", "ethernet-vs-wifi-streaming"],
  ["The list, guide, or sign-in will not load", "Separate playlist import, guide mapping, authentication, and playback; each fails at a different stage.", "m3u-playlist-not-loading"],
  ["Picture or sound is missing", "Use the audio, controls, output path, and same-title comparison to narrow the next check.", "iptv-black-screen-no-sound"],
] as const;

export default function TroubleshootingPage() {
  const journey = clusterJourneys.performance;
  const performanceArticles = guides.filter((guide) => articleRelationships[guide.slug]?.cluster === "performance");
  return <main>
    <section className="page-hero"><div className="shell"><div className="eyebrow">Troubleshooting hub</div><h1>Start IPTV troubleshooting with the symptom, not a random fix.</h1><p>{journey.summary} {journey.nextStep}</p></div></section>
    <section className="section"><div className="shell"><div className="section-kicker"><div><div className="eyebrow">Choose a path</div><h2>Keep the failing layer visible.</h2></div><p>A working player, account, device, network, and media source are separate conditions. Record the exact symptom before changing more than one of them.</p></div><div className="grid setup-grid">{symptomPaths.map(([title, text, slug]) => { const guide = guides.find((item) => item.slug === slug)!; return <Link className="card topic-hub-card" href={`/blog/${slug}`} key={slug}><h3>{title}</h3><p>{text}</p><span className="guide-arrow">{guide.title} →</span></Link>; })}</div></div></section>
    <section className="section"><div className="shell"><div className="section-kicker"><div><div className="eyebrow">Complete performance library</div><h2>Read the guide that matches the evidence.</h2></div><p>These pages have distinct primary questions. Their contextual paths identify what to read first and what to test next.</p></div><div className="guide-grid">{performanceArticles.map((guide) => <Link className="card guide-card" href={`/blog/${guide.slug}`} key={guide.slug}><span className="eyebrow">{guide.intent}</span><h3>{guide.title}</h3><p>{guide.description}</p><span className="guide-arrow">Read the focused guide →</span></Link>)}</div></div></section>
    <section className="section"><div className="shell split-panel"><div><div className="eyebrow">When to stop</div><h2>Escalate with a short, safe record.</h2><p>Keep the device model, player version, network type, time, symptom, and a redacted error. Do not post a password, activation code, or tokenized playlist address.</p></div><Link className="btn primary" href="/support">Open verified support guidance</Link></div></section>
  </main>;
}
