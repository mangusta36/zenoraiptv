"use client";
import Link from "next/link";
import { type KeyboardEvent, useEffect, useState } from "react";
import {
  BookOpen,
  Check,
  Clapperboard,
  ListVideo,
  Menu,
  MessageCircle,
  Sparkles,
  Server,
  Tv,
  Monitor,
  Smartphone,
  CircleHelp,
  Headphones,
  CreditCard,
  X,
} from "lucide-react";
import { nav } from "@/config/navigation";
import {
  connectionOptions,
  durations,
  formatPrice,
  type Connections,
  priceFor,
} from "@/config/pricing";
import { heroPromotion, isAnnualBonusEligible } from "@/config/promotions";
import {
  pricingWhatsAppUrl,
  supportWhatsAppUrl,
  trialRequestWhatsAppUrl,
} from "@/config/contact";
import { IconTile, type IconName } from "@/components/icons";
export const Icon = ({ name }: { name: string }) => {
  const C =
    (
      {
        tv: Tv,
        devices: Monitor,
        phone: Smartphone,
        support: Headphones,
        help: CircleHelp,
        payment: CreditCard,
      } as Record<string, typeof Tv>
    )[name] || Sparkles;
  return <C size={22} />;
};
export function Header() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);
  const toggleFromKeyboard = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setOpen((value) => !value);
    }
  };
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <header className="nav">
        <div className="shell nav-inner">
          <Link className="brand" href="/">
            <i />
            ZENORA IPTV
          </Link>
          <nav className="nav-links" aria-label="Primary navigation">
            {nav.map((n) => (
              <Link key={n.href} href={n.href}>
                {n.label}
              </Link>
            ))}
          </nav>
          <a
            className="btn primary desktop-cta"
            href={trialRequestWhatsAppUrl()}
            target="_blank"
            rel="noreferrer"
          >
            Get Trial
          </a>
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            aria-controls="mobile-navigation"
            aria-expanded={open}
            className="menu"
            onClick={() => setOpen(!open)}
            onKeyDown={toggleFromKeyboard}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </header>
      <nav
        id="mobile-navigation"
        aria-label="Mobile navigation"
        className={"mobile-panel " + (open ? "open" : "")}
      >
        {nav.map((n) => (
          <Link onClick={() => setOpen(false)} key={n.href} href={n.href}>
            {n.label}
          </Link>
        ))}
        <a
          onClick={() => setOpen(false)}
          className="btn primary"
          href={trialRequestWhatsAppUrl()}
          target="_blank"
          rel="noreferrer"
        >
          Get Trial
        </a>
      </nav>
    </>
  );
}
export function PageHero({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="page-hero">
      <div className="shell">
        <div className="eyebrow">{eyebrow}</div>
        <h1>{title}</h1>
        <p>{children}</p>
      </div>
    </section>
  );
}
export function WhatsAppAction({
  href = supportWhatsAppUrl(),
  children = "Chat on WhatsApp",
  className = "btn whatsapp-action",
}: {
  href?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <a className={className} href={href} target="_blank" rel="noreferrer">
      <MessageCircle aria-hidden="true" size={17} />
      {children}
    </a>
  );
}
export function Pricing({
  showAnnualOffer = true,
  detailed = false,
}: {
  showAnnualOffer?: boolean;
  detailed?: boolean;
}) {
  const [connections, setConnections] = useState<Connections>(1);
  const selectedLabel = `${connections} simultaneous connection${connections > 1 ? "s" : ""}`;
  const planBenefits = [
    "26,000+ live TV channels",
    "100,000+ movies and series",
    "HD, Full HD, and 4K options where available",
    `${connections} simultaneous stream${connections > 1 ? "s" : ""} in this plan`,
    "Smart TV and streaming-device guidance",
    "Fire TV and Android TV setup guides",
    "Mobile and desktop setup paths",
    "Device compatibility checks",
    "M3U, Xtream Codes, and portal setup concepts",
    "Setup guidance after verified payment",
    "Troubleshooting resources",
    "Renewal assistance for existing customers",
  ];
  return (
    <>
      <section
        className={
          "pricing-selector" + (detailed ? " pricing-selector-detailed" : "")
        }
        aria-labelledby="connection-selector-title"
      >
        {detailed && (
          <div className="pricing-selector-copy">
            <span className="eyebrow">Step 1</span>
            <h3 id="connection-selector-title">
              How many devices will need a stream?
            </h3>
            <p>
              A connection is one simultaneous stream, not simply a device you
              own. Choose the allowance that matches your household’s concurrent
              viewing.
            </p>
          </div>
        )}
        {!detailed && (
          <span className="sr-only" id="connection-selector-title">
            Choose simultaneous connections
          </span>
        )}
        <div
          className="pricing-controls"
          role="group"
          aria-labelledby="connection-selector-title"
        >
          {connectionOptions.map((n) => (
            <button
              key={n}
              className={"tab " + (n === connections ? "active" : "")}
              type="button"
              aria-pressed={n === connections}
              onClick={() => setConnections(n)}
            >
              {n} {n === 1 ? "Device" : "Devices"}
            </button>
          ))}
        </div>
        {detailed && (
          <p className="pricing-selection-status" aria-live="polite">
            Showing every duration with <strong>{selectedLabel}</strong>.
          </p>
        )}
      </section>
      <div className={"grid prices" + (detailed ? " pricing-plan-grid" : "")}>
        {durations.map((d) => {
          const hasAnnualBonus = isAnnualBonusEligible(d.id, connections);
          const planName = hasAnnualBonus ? heroPromotion.title : d.label;
          return (
            <article
              key={d.id}
              className={"card price " + (d.id === "12" ? "popular" : "")}
            >
              <div className="price-labels">
                {d.id === "12" && <span className="pill">Most popular</span>}
                {showAnnualOffer && hasAnnualBonus && (
                  <span className="pricing-annual-offer">
                    {heroPromotion.totalMonths} months total
                  </span>
                )}
              </div>
              <p className="price-kicker">
                {hasAnnualBonus
                  ? `${heroPromotion.paidMonths} months paid plan`
                  : `${d.label} access`}
              </p>
              <h3>{planName}</h3>
              <div className="amount">
                ${formatPrice(priceFor(d.id, connections))}
              </div>
              <p className="muted">
                USD · {connections} simultaneous stream
                {connections > 1 ? "s" : ""}
              </p>
              {detailed && (
                <p className="price-value">
                  {hasAnnualBonus
                    ? `${heroPromotion.paidMonths} paid months + ${heroPromotion.bonusMonths} free months = ${heroPromotion.totalMonths} months total.`
                    : "Choose the duration that fits your planning horizon."}
                </p>
              )}
              <ul
                className="price-inclusions"
                aria-label={`Included with ${planName}`}
              >
                {detailed ? (
                  <>
                    {hasAnnualBonus && (
                      <li>
                        <Check size={13} /> {heroPromotion.totalMonths} months
                        total: {heroPromotion.paidMonths} paid +{" "}
                        {heroPromotion.bonusMonths} free
                      </li>
                    )}
                    {planBenefits.map((benefit) => (
                      <li key={benefit}>
                        <Check size={13} /> {benefit}
                      </li>
                    ))}
                  </>
                ) : (
                  <>
                    <li>
                      <Check size={13} /> {connections} simultaneous stream
                      {connections > 1 ? "s" : ""}
                    </li>
                    <li>
                      <Check size={13} />{" "}
                      {hasAnnualBonus
                        ? `${heroPromotion.totalMonths} months total: ${heroPromotion.paidMonths} paid + ${heroPromotion.bonusMonths} free`
                        : `${d.label} subscription duration`}
                    </li>
                  </>
                )}
              </ul>
              {!detailed && (
                <div
                  className="pricing-card-benefits"
                  aria-label="Service benefits included with every plan"
                >
                  <span>
                    <Tv aria-hidden="true" />
                    26,000+ Live Channels
                  </span>
                  <span>
                    <Clapperboard aria-hidden="true" />
                    100,000+ Movies &amp; Series
                  </span>
                  <span>
                    <Sparkles aria-hidden="true" />
                    4K &amp; Full HD Options
                  </span>
                </div>
              )}
              <a
                className="btn primary"
                style={{ width: "100%" }}
                href={pricingWhatsAppUrl(d.id, connections)}
                target="_blank"
                rel="noreferrer"
                aria-label={`Choose Plan: ${planName}, ${connections} ${connections === 1 ? "device" : "devices"} on WhatsApp`}
              >
                Choose Plan
              </a>
            </article>
          );
        })}
      </div>
      {detailed && (
        <section
          className="pricing-comparison"
          aria-labelledby="plan-comparison-title"
        >
          <div className="section-head">
            <div className="eyebrow">Plan comparison</div>
            <h3 id="plan-comparison-title">
              Every duration, with the same selected connection allowance.
            </h3>
            <p>
              Only billing duration, the configured total, and the annual bonus
              vary here.
            </p>
          </div>
          <div
            className="pricing-comparison-scroll"
            tabIndex={0}
            aria-label="Plan comparison table"
          >
            <table>
              <caption>
                Configured Zenora new-subscription options for {selectedLabel}.
              </caption>
              <thead>
                <tr>
                  <th scope="col">Paid plan</th>
                  <th scope="col">Configured total</th>
                  <th scope="col">Connections</th>
                  <th scope="col">Promotion</th>
                </tr>
              </thead>
              <tbody>
                {durations.map((d) => {
                  const hasAnnualBonus = isAnnualBonusEligible(
                    d.id,
                    connections,
                  );
                  return (
                    <tr key={d.id}>
                      <th scope="row">{d.label}</th>
                      <td>${formatPrice(priceFor(d.id, connections))}</td>
                      <td>{connections} simultaneous</td>
                      <td>
                        {hasAnnualBonus
                          ? `${heroPromotion.bonusMonths} months free · ${heroPromotion.totalMonths} months total`
                          : "—"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      )}
      <aside
        className="pricing-shared-benefits"
        aria-labelledby="pricing-benefits-title"
      >
        <div className="pricing-shared-intro">
          <span className="eyebrow">Included with every plan</span>
          <h2 id="pricing-benefits-title">
            Everything You Need for a Better Entertainment Experience
          </h2>
          <p>
            Service figures and features apply across plan durations; content,
            device, and connection conditions can affect availability.
          </p>
        </div>
        <div className="pricing-shared-list">
          <Link href="/channels">
            <Tv aria-hidden="true" />
            <span>
              <b>26,000+ Live Channels</b>
              <small>100,000+ VOD titles, including movies and series.</small>
            </span>
          </Link>
          <Link href="/blog/improve-streaming-quality">
            <Server aria-hidden="true" />
            <span>
              <b>4K &amp; Full HD Options</b>
              <small>
                Optimized Streaming Servers; availability depends on content,
                device, and connection.
              </small>
            </span>
          </Link>
          <Link href="/devices">
            <Monitor aria-hidden="true" />
            <span>
              <b>Works With Supported Devices</b>
              <small>
                Review compatibility, then follow the appropriate setup path.
              </small>
            </span>
          </Link>
          <Link href="/setup">
            <BookOpen aria-hidden="true" />
            <span>
              <b>Activation and setup guidance</b>
              <small>
                Follow the documented route for your device after verified
                payment.
              </small>
            </span>
          </Link>
          <Link href="/renew">
            <Headphones aria-hidden="true" />
            <span>
              <b>Renewal assistance</b>
              <small>
                Existing customers can use the dedicated renewal guidance.
              </small>
            </span>
          </Link>
          <div className="pricing-resource-links">
            <Link href="/setup">
              <BookOpen aria-hidden="true" /> Setup guides
            </Link>
            <Link href="/blog?category=performance">
              <ListVideo aria-hidden="true" /> Troubleshooting resources
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
export const FAQs = ({ limit }: { limit?: number }) => (
  <div className="faq">
    {[
      [
        "What devices can I use?",
        "Zenora’s public site references Smart TVs, Android, Fire TV, MAG and compatible M3U or portal applications. Consult the appropriate setup guide before ordering.",
      ],
      [
        "How many devices can stream at once?",
        "Select one to six simultaneous connections before checkout. A connection means a stream used at the same time.",
      ],
      [
        "Is there a free trial?",
        "No. Zenora advertises a paid trial request. Availability and pricing must be confirmed with support.",
      ],
      [
        "When will I receive setup details?",
        "The public site says details are sent after payment confirmation. This redesign does not claim an automated payment integration is active.",
      ],
      [
        "What is the refund policy?",
        "The public website mentions conditional seven-day refunds where a technical issue cannot be resolved. Review the official policy before relying on it.",
      ],
    ]
      .slice(0, limit)
      .map(([q, a]) => (
        <details key={q}>
          <summary>{q}</summary>
          <p>{a}</p>
        </details>
      ))}
  </div>
);
export function CTA() {
  return (
    <section className="section">
      <div
        className="shell card"
        style={{
          padding: "clamp(30px,6vw,75px)",
          background:
            "radial-gradient(circle at 80% 10%,#20d4df36,transparent 26%),radial-gradient(circle at 10% 100%,#705cff46,transparent 35%),#111b2b",
        }}
      >
        <div className="eyebrow">A more considered way to watch</div>
        <h2
          style={{
            fontSize: "clamp(34px,5vw,64px)",
            letterSpacing: "-.06em",
            maxWidth: 700,
          }}
        >
          Ready for a better entertainment experience?
        </h2>
        <Link className="btn primary" href="/pricing">
          View pricing
        </Link>{" "}
        <Link className="btn ghost" href="/contact">
          Contact support
        </Link>
      </div>
    </section>
  );
}
export function ContactForm({ trial = false }: { trial?: boolean }) {
  const [sent, setSent] = useState(false);
  return (
    <form
      className="card form"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      {sent ? (
        <div className="notice">
          This form is in demonstration mode. No message was sent; please
          configure a secure server-side contact integration before publishing.
        </div>
      ) : (
        <>
          <div className="field">
            <label>Full name</label>
            <input required placeholder="Your name" />
          </div>
          <div className="field">
            <label>Email</label>
            <input required type="email" placeholder="you@example.com" />
          </div>
          {trial && (
            <div className="field">
              <label>Device type</label>
              <select required>
                <option value="">Choose a device</option>
                <option>Smart TV</option>
                <option>Fire TV</option>
                <option>Android</option>
                <option>Other</option>
              </select>
            </div>
          )}
          {!trial && (
            <div className="field">
              <label>Subject</label>
              <input required placeholder="How can we help?" />
            </div>
          )}
          <div className="field">
            <label>Message</label>
            <textarea required placeholder="Tell us a little more" />
          </div>
          <button className="btn primary" type="submit">
            {trial ? "Request trial" : "Send message"}
          </button>
        </>
      )}
    </form>
  );
}
export function ChannelExplorer() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const data: [string, string, string, IconName][] = [
    ["Global Sports", "Sports", "International", "sports"],
    ["Metro News", "News", "United States", "global"],
    ["Cinema Select", "Movies", "International", "movies"],
    ["Family Loop", "Kids", "United Kingdom", "tv"],
    ["Sound City", "Music", "International", "streaming"],
    ["World Stories", "Documentaries", "France", "global"],
    ["Evening Mix", "Entertainment", "Canada", "streaming"],
    ["Europa Live", "International", "Germany", "global"],
  ];
  const shown = data.filter(
    (x) =>
      (category === "All" || x[1] === category) &&
      x.join(" ").toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <>
      <div className="pricing-controls">
        <input
          aria-label="Search demo catalogue"
          style={{
            flex: "1",
            minWidth: 200,
            background: "#0c1422",
            border: "1px solid var(--line)",
            borderRadius: 12,
            color: "white",
            padding: 12,
          }}
          placeholder="Search demonstration catalogue"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {[
          "All",
          "Sports",
          "News",
          "Movies",
          "Kids",
          "Music",
          "Documentaries",
          "Entertainment",
          "International",
        ].map((x) => (
          <button
            className={"tab " + (x === category ? "active" : "")}
            key={x}
            onClick={() => setCategory(x)}
          >
            {x}
          </button>
        ))}
      </div>
      <div className="grid setup-grid">
        {shown.map((x) => (
          <article className="card device" key={x[0]}>
            <IconTile name={x[3]} />
            <span className="pill">Demonstration data</span>
            <h3>{x[0]}</h3>
            <p className="muted">
              {x[1]} · {x[2]}
            </p>
          </article>
        ))}
      </div>
      {!shown.length && (
        <div className="notice">
          No demonstration entries match those filters. Clear the search to
          explore the sample catalogue.
        </div>
      )}
    </>
  );
}
