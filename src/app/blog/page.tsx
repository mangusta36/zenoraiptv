import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { categories, guides } from "@/data/guides";
import { clusterJourneys } from "@/data/topic-architecture";

export const metadata: Metadata = {
  title: { absolute: "IPTV Setup, Device & Troubleshooting Guides | Zenora IPTV" },
  description:
    "Practical, rights-aware Zenora IPTV articles about IPTV fundamentals, devices, setup, performance, and security.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "IPTV Setup, Device & Troubleshooting Guides | Zenora IPTV",
    description:
      "Practical, rights-aware articles about IPTV fundamentals, devices, setup, performance, and security.",
    url: "/blog",
    images: [{ url: "/images/guides/iptv-living-room-editorial.webp", alt: "Zenora IPTV practical guide library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "IPTV Setup, Device & Troubleshooting Guides | Zenora IPTV",
    description:
      "Practical, rights-aware articles about IPTV fundamentals, devices, setup, performance, and security.",
    images: ["/images/guides/iptv-living-room-editorial.webp"],
  },
};

const featuredSlug = "what-is-iptv";

export default async function Blog({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const activeCategory = category && category in categories ? category : undefined;
  const featured = guides.find((article) => article.slug === featuredSlug)!;
  const filteredArticles = activeCategory
    ? guides.filter((article) => article.category === activeCategory)
    : guides;
  const articles = activeCategory
    ? filteredArticles
    : filteredArticles.filter((article) => article.slug !== featured.slug);
  const activeJourney = activeCategory ? clusterJourneys[activeCategory as keyof typeof clusterJourneys] : undefined;

  return (
    <main>
      <section className="guide-hero">
        <div className="shell guide-hero-grid">
          <div>
            <div className="eyebrow">Zenora IPTV Blog</div>
            <h1>IPTV guides for setup, devices, and troubleshooting.</h1>
            <p>
              Reader-first articles about the technology around IPTV, from
              compatibility planning to practical troubleshooting. General
              guidance stays separate from details a specific service must verify.
            </p>
            <div className="guide-hero-meta">
              <span>{guides.length} practical articles</span>
              <span>{Object.keys(categories).length} editorial subjects</span>
              <span>Updated editorially</span>
            </div>
          </div>
          <figure className="guide-hero-image">
            <Image
              src="/images/guides/iptv-living-room-editorial.webp"
              alt="Modern living room with an abstractly lit television at night"
              width={1200}
              height={630}
              priority
              sizes="(max-width: 900px) 100vw, 48vw"
            />
            <figcaption>Technology should feel clearer, not more complicated.</figcaption>
          </figure>
        </div>
      </section>

      {!activeCategory && <section className="section guide-featured">
        <div className="shell">
          <div className="section-head">
            <div className="eyebrow">Featured article</div>
            <h2>Start with the essentials.</h2>
          </div>
          <Link className="card guide-card" href={`/blog/${featured.slug}`}>
            <div className="guide-card-top">
              <span className="eyebrow">
                {categories[featured.category as keyof typeof categories].name}
              </span>
              <span>{featured.read}</span>
            </div>
            <h3>{featured.title}</h3>
            <p>{featured.description}</p>
            <span className="guide-arrow">Read article →</span>
          </Link>
        </div>
      </section>}

      <section className="section topic-hub" aria-labelledby="topic-hub-heading">
        <div className="shell">
          <div className="section-kicker"><div><div className="eyebrow">Topic pathways</div><h2 id="topic-hub-heading">Choose the question before the fix.</h2></div><p>Each pathway separates fundamentals, compatible setup, performance diagnosis, and safe subscription decisions so one guide does not have to answer every question.</p></div>
          {activeJourney ? <div className="card topic-hub-card"><h3>{activeJourney.name}</h3><p>{activeJourney.summary}</p><p className="muted">{activeJourney.nextStep}</p></div> : <div className="grid setup-grid">{Object.entries(clusterJourneys).map(([slug, journey]) => <Link className="card topic-hub-card" href={journey.hub} key={slug}><h3>{journey.name}</h3><p>{journey.summary}</p><span className="guide-arrow">Follow this path →</span></Link>)}</div>}
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-kicker">
            <div>
              <div className="eyebrow">Browse the blog</div>
              <h2>{activeCategory ? categories[activeCategory as keyof typeof categories].name : "Every article in one place."}</h2>
            </div>
            <p>Choose a subject, then move directly to the article that answers your question.</p>
          </div>
          <nav className="pricing-controls" aria-label="Filter blog articles by category">
            <Link className={`tab ${!activeCategory ? "active" : ""}`} href="/blog" aria-current={!activeCategory ? "page" : undefined}>All articles</Link>
            {Object.entries(categories).map(([slug, item]) => (
              <Link
                className={`tab ${activeCategory === slug ? "active" : ""}`}
                href={`/blog?category=${slug}`}
                key={slug}
                aria-current={activeCategory === slug ? "page" : undefined}
              >
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="guide-grid">
            {articles.map((article) => (
              <Link className="card guide-card" href={`/blog/${article.slug}`} key={article.slug}>
                <div className="guide-card-top">
                  <span className="eyebrow">{categories[article.category as keyof typeof categories].name}</span>
                  <span>{article.read}</span>
                </div>
                <h3>{article.title}</h3>
                <p>{article.description}</p>
                <span className="guide-arrow">Read article →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
