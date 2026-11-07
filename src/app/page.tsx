import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Cable,
  ListVideo,
  MonitorSmartphone,
  Router,
  ShieldCheck,
  Wifi,
} from "lucide-react";
import { CTA, FAQs, Pricing } from "@/components/site";
import { HeroCinematic } from "@/components/hero-cinematic";
import { IconTile, type IconName } from "@/components/icons";
import { siteImages } from "@/config/images";
import { heroPromotion } from "@/config/promotions";
import { categories, guides } from "@/data/guides";

export const metadata: Metadata = {
  title: {
    absolute: "Zenora IPTV | Flexible plans, devices and setup guidance",
  },
  description:
    "Zenora IPTV offers flexible subscription plans, compatible-device guidance, and practical setup and troubleshooting resources.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Zenora IPTV | Flexible plans, devices and setup guidance",
    description:
      "Explore Zenora IPTV plans, compatible-device guidance, setup resources, and practical streaming knowledge.",
    url: "/",
  },
};

const entertainment = [
  [siteImages.entertainment.liveTv, "Live entertainment venue"],
  [siteImages.entertainment.movies, "Cinema auditorium"],
  [siteImages.entertainment.sports, "Athletics event under stadium lights"],
] as const;

const devices: [string, string, string, IconName][] = [
  [
    "Fire TV Stick",
    "Prepare a Fire TV and choose a legitimate compatible player.",
    "/setup/firestick",
    "fireTv",
  ],
  [
    "Android",
    "Plan setup on an Android television, box, phone, or tablet.",
    "/setup/android",
    "phone",
  ],
  [
    "Apple TV",
    "Check player availability and follow the Apple TV setup path.",
    "/setup/apple-tv",
    "appleTv",
  ],
  [
    "Smart TV",
    "Confirm the television platform before choosing a player.",
    "/setup/smart-tv",
    "smartTv",
  ],
  [
    "iPhone & iPad",
    "Use an App Store player compatible with the supplied details.",
    "/setup/ios",
    "phone",
  ],
  [
    "Windows",
    "Configure a reputable compatible desktop player on Windows.",
    "/setup/windows",
    "laptop",
  ],
  [
    "macOS",
    "Follow the playlist-import flow supported by your Mac player.",
    "/setup/mac",
    "laptop",
  ],
  [
    "MAG",
    "Review model compatibility before entering portal information.",
    "/setup/mag",
    "mag",
  ],
];

const featuredGuideSlugs = [
  "what-is-iptv",
  "what-is-an-iptv-player",
  "device-compatibility",
  "iptv-buffering-causes",
  "m3u-playlist-not-loading",
  "iptv-security-privacy",
];

const featuredGuides = featuredGuideSlugs
  .map((slug) => guides.find((guide) => guide.slug === slug))
  .filter((guide): guide is (typeof guides)[number] => Boolean(guide));

export default function Home() {
  return (
    <main>
      <HeroCinematic />

      <section
        className="section section-pricing home-pricing-showcase"
        aria-labelledby="home-pricing"
      >
        <div className="shell">
          <div className="section-kicker home-pricing-heading">
            <div>
              <div className="eyebrow">Choose your plan</div>
              <h2 id="home-pricing">
                Compare Zenora IPTV plans by duration and connections.
              </h2>
            </div>
            <p>
              First choose how long you want access, then select how many
              streams need to play at the same time. Every price below updates
              when you change the connection count.
            </p>
          </div>
          <div className="home-plan-notes">
            <article>
              <span>01</span>
              <h3>Choose a duration</h3>
              <p>Compare monthly, three-month, six-month, and annual access.</p>
            </article>
            <article>
              <span>02</span>
              <h3>Count simultaneous streams</h3>
              <p>
                Select one to six connections based on how many streams need to
                play at once.
              </p>
            </article>
            <article>
              <span>03</span>
              <h3>Confirm the setup path</h3>
              <p>
                Review device compatibility and current policy information
                before checkout.
              </p>
            </article>
          </div>
          {heroPromotion.active && (
            <p className="home-promotion-note">
              <b>Annual subscription offer:</b> {heroPromotion.title} —{" "}
              {heroPromotion.totalMonths} months total for every available
              connection option at the existing annual price.
            </p>
          )}
          <Pricing showAnnualOffer />
          <div className="home-section-foot home-pricing-foot">
            <Link className="home-text-link" href="/pricing">
              View full plan details <ArrowRight size={15} />
            </Link>
            <Link
              className="home-text-link"
              href="/blog/choosing-an-iptv-subscription"
            >
              Read the subscription evaluation guide <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      <section
        className="section home-benefits"
        aria-labelledby="why-choose-zenora"
      >
        <div className="shell">
          <div className="home-benefits-heading">
            <div>
              <div className="eyebrow">Why choose Zenora IPTV</div>
              <h2 id="why-choose-zenora">
                Make a confident choice before you reach checkout.
              </h2>
            </div>
            <p>
              Zenora IPTV brings plan comparison, compatible-device guidance,
              setup information, and practical support pathways into one clear
              journey. You can understand the variables that matter before
              choosing a subscription.
            </p>
          </div>

          <div className="home-benefits-composition">
            <article className="home-benefit-featured">
              <span className="home-benefit-number">01 / DEVICE PLANNING</span>
              <MonitorSmartphone aria-hidden="true" />
              <div>
                <h3>Start with the screen you already use.</h3>
                <p>
                  Compare documented setup paths for Fire TV Stick, Android,
                  Apple TV, Smart TV, iPhone and iPad, Windows, macOS, and MAG
                  before selecting a player or plan.
                </p>
              </div>
              <div className="home-inline-actions">
                <Link className="btn primary" href="/devices">
                  Check device options <ArrowRight size={16} />
                </Link>
                <Link className="home-text-link" href="/setup">
                  Browse setup guides <ArrowRight size={14} />
                </Link>
              </div>
            </article>

            <div className="home-benefit-supporting">
              <article>
                <span>02</span>
                <div>
                  <h3>Compare the two plan variables that matter.</h3>
                  <p>
                    Review duration separately from simultaneous connections,
                    with prices shown before you continue to checkout.
                  </p>
                  <Link href="/pricing">
                    Review pricing details <ArrowRight size={14} />
                  </Link>
                </div>
              </article>
              <article>
                <span>03</span>
                <div>
                  <h3>Keep setup and problem solving within reach.</h3>
                  <p>
                    Move from device-specific setup to buffering, playlist, and
                    login guidance without searching across unrelated sites.
                  </p>
                  <Link href="/troubleshooting">
                    Open troubleshooting <ArrowRight size={14} />
                  </Link>
                </div>
              </article>
              <article>
                <span>04</span>
                <div>
                  <h3>Find answers without unsupported promises.</h3>
                  <p>
                    Explore channel information, FAQs, policy details, and
                    support routes that describe what to verify before buying.
                  </p>
                  <div className="home-benefit-links">
                    <Link href="/channels">Channel information</Link>
                    <Link href="/faq">FAQs</Link>
                    <Link href="/support">Support</Link>
                  </div>
                </div>
              </article>
            </div>

            {heroPromotion.active && (
              <aside className="home-benefit-offer">
                <div>
                  <span className="eyebrow">Annual-plan benefit</span>
                  <strong>{heroPromotion.title}</strong>
                  <p>
                    Pay for {heroPromotion.paidMonths} months and receive{" "}
                    {heroPromotion.bonusMonths} months free —{" "}
                    {heroPromotion.totalMonths} months total for every available
                    connection option.
                  </p>
                </div>
                <Link className="btn ghost" href="/pricing">
                  Compare annual pricing <ArrowRight size={16} />
                </Link>
              </aside>
            )}
          </div>
        </div>
      </section>

      <section className="section home-works" aria-labelledby="how-iptv-works">
        <div className="shell">
          <div className="section-kicker">
            <div>
              <div className="eyebrow">The technology, without the jargon</div>
              <h2 id="how-iptv-works">How IPTV streaming works.</h2>
            </div>
            <p>
              A useful mental model is a short chain: service, account details,
              player, device, and network.
            </p>
          </div>
          <div className="home-process-grid">
            <article className="home-process-step">
              <span>01</span>
              <Router />
              <h3>The service supplies access</h3>
              <p>
                An authorized service provides the account or playlist details
                needed for its supported setup method.
              </p>
              <Link href="/blog/what-is-iptv">
                Read what IPTV means <ArrowRight />
              </Link>
            </article>
            <article className="home-process-step">
              <span>02</span>
              <ListVideo />
              <h3>The player presents streams</h3>
              <p>
                A player app is the interface. It does not automatically supply
                programming or verify the rights behind a source.
              </p>
              <Link href="/blog/what-is-an-iptv-player">
                Player vs. provider <ArrowRight />
              </Link>
            </article>
            <article className="home-process-step">
              <span>03</span>
              <Wifi />
              <h3>The network carries playback</h3>
              <p>
                The device requests media over the internet. Stability, local
                Wi-Fi, device capability, and the source can all affect
                playback.
              </p>
              <Link href="/blog/m3u-playlists-explained">
                Understand M3U playlists <ArrowRight />
              </Link>
            </article>
          </div>
        </div>
      </section>

      <section
        className="section home-device-section"
        aria-labelledby="home-devices"
      >
        <div className="shell">
          <div className="section-kicker">
            <div>
              <div className="eyebrow">Your screen, your setup path</div>
              <h2 id="home-devices">
                Plan Zenora IPTV setup for the device you already use.
              </h2>
            </div>
            <p>
              Device names are only the starting point. Confirm the model,
              operating-system version, player source, and service requirements.
            </p>
          </div>
          <div className="home-device-grid">
            {devices.map(([name, description, href, icon]) => (
              <Link className="card home-device-card" href={href} key={href}>
                <IconTile name={icon} />
                <span>
                  <h3>{name}</h3>
                  <p>{description}</p>
                </span>
                <ArrowRight />
              </Link>
            ))}
          </div>
          <div className="home-section-foot">
            <Link className="home-text-link" href="/devices">
              Compare all device options <ArrowRight size={15} />
            </Link>
            <Link className="home-text-link" href="/blog/device-compatibility">
              Read the device compatibility guide <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      <section
        className="section section-showcase"
        aria-labelledby="home-channels"
      >
        <div className="shell">
          <div className="section-head">
            <div className="eyebrow">Explore the viewing landscape</div>
            <h2 id="home-channels">
              Live television, sports, films, and series—organized for
              discovery.
            </h2>
            <p>
              Browse the demonstration catalogue to understand the interface,
              then confirm exact availability before purchase.
            </p>
          </div>
          <div className="card showcase">
            <div>
              <h3>See how content categories are presented.</h3>
              <p className="muted">
                The catalogue uses clearly marked demonstration entries and does
                not make unverified channel-availability claims.
              </p>
              <div className="home-inline-actions">
                <Link className="btn ghost" href="/channels">
                  Explore channel information
                </Link>
                <Link className="home-text-link" href="/features">
                  Review Zenora IPTV features <ArrowRight size={14} />
                </Link>
              </div>
            </div>
            <div className="tiles">
              {entertainment.map(([src, alt], index) => (
                <div className={`tile tile-${index}`} key={src}>
                  <Image
                    src={src}
                    alt={alt}
                    fill
                    sizes="(max-width: 600px) 45vw, 18vw"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        className="section home-performance"
        aria-labelledby="streaming-performance"
      >
        <div className="shell home-performance-grid">
          <div className="home-editorial-copy">
            <div className="eyebrow">A calmer way to troubleshoot</div>
            <h2 id="streaming-performance">
              Streaming performance improves when you isolate one variable at a
              time.
            </h2>
            <p>
              Buffering is a symptom rather than a diagnosis. The source,
              account, player, device, local network, or wider route can each
              contribute. Record what happened, change one variable, and retest.
            </p>
            <div className="home-inline-actions">
              <Link className="btn ghost" href="/troubleshooting">
                Open troubleshooting
              </Link>
              <Link className="home-text-link" href="/support">
                Contact support resources <ArrowRight size={14} />
              </Link>
            </div>
          </div>
          <div className="home-diagnostic-list">
            <Link className="card" href="/blog/iptv-buffering-causes">
              <Wifi />
              <span>
                <b>Buffering and connection stability</b>
                <small>Separate source, device, and network causes.</small>
              </span>
              <ArrowRight />
            </Link>
            <Link className="card" href="/blog/ethernet-vs-wifi-streaming">
              <Cable />
              <span>
                <b>Ethernet versus Wi-Fi</b>
                <small>Choose a practical connection for the room.</small>
              </span>
              <ArrowRight />
            </Link>
            <Link className="card" href="/blog/m3u-playlist-not-loading">
              <ListVideo />
              <span>
                <b>Playlist loading problems</b>
                <small>Check format, account, player, and network.</small>
              </span>
              <ArrowRight />
            </Link>
            <Link
              className="card"
              href="/blog/iptv-login-authentication-errors"
            >
              <ShieldCheck />
              <span>
                <b>Login and authentication errors</b>
                <small>
                  Protect credentials while checking account details.
                </small>
              </span>
              <ArrowRight />
            </Link>
          </div>
        </div>
      </section>

      <section className="section home-knowledge" aria-labelledby="home-blog">
        <div className="shell">
          <div className="section-kicker">
            <div>
              <div className="eyebrow">Zenora IPTV Blog</div>
              <h2 id="home-blog">
                Useful reading for decisions, setup, and problem solving.
              </h2>
            </div>
            <p>
              The blog contains {guides.length} topic-focused articles across
              fundamentals, setup, performance, and safety.
            </p>
          </div>
          <div className="home-guide-grid">
            {featuredGuides.map((guide) => (
              <Link
                className="card home-guide-card"
                href={`/blog/${guide.slug}`}
                key={guide.slug}
              >
                <span className="eyebrow">
                  {categories[guide.category as keyof typeof categories].name}
                </span>
                <h3>{guide.title}</h3>
                <p>{guide.description}</p>
                <span className="home-text-link">
                  Read article <ArrowRight size={14} />
                </span>
              </Link>
            ))}
          </div>
          <div className="home-section-foot">
            <Link className="btn ghost" href="/blog">
              Browse all blog articles
            </Link>
          </div>
        </div>
      </section>

      <section className="section home-faq" aria-labelledby="home-faq-title">
        <div className="shell home-faq-grid">
          <div className="section-head">
            <div className="eyebrow">Answers before the next step</div>
            <h2 id="home-faq-title">A few common Zenora IPTV questions.</h2>
            <p>
              Start with device fit, simultaneous connections, setup delivery,
              and current policy information.
            </p>
            <Link className="home-text-link" href="/faq">
              Browse the complete FAQ <ArrowRight size={15} />
            </Link>
          </div>
          <FAQs limit={3} />
        </div>
      </section>

      <CTA />
    </main>
  );
}
