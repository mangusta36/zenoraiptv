import Link from "next/link";
import {
  CTA,
  FAQs,
  PageHero,
  Pricing,
  ChannelExplorer,
  ContactForm,
  WhatsAppAction,
} from "@/components/site";
import {
  renewalWhatsAppUrl,
  supportWhatsAppUrl,
  trialWhatsAppUrl,
} from "@/config/contact";
import { IconTile, type IconName } from "@/components/icons";
const descriptions: Record<string, string> = {
  features:
    "A closer look at the flexible, device-ready Zenora IPTV experience.",
  devices: "Find a compatible screen and move from device to setup guidance.",
  about:
    "A thoughtful entertainment experience built around choice, compatibility and support.",
  support:
    "Start with the right guide or reach out with a clearly described issue.",
  troubleshooting:
    "Search common configuration questions before escalating to support.",
};
export function Standard({
  kind,
  title,
  children,
}: {
  kind: string;
  title: string;
  children?: React.ReactNode;
}) {
  const visual: IconName[] =
    kind === "support"
      ? ["help", "troubleshooting", "message", "email", "support", "global"]
      : [
          "streaming",
          "multiDevice",
          "duration",
          "setup",
          "connections",
          "recommended",
        ];
  return (
    <>
      <PageHero eyebrow={kind.toUpperCase()} title={title}>
        {descriptions[kind] || "A clear next step in your Zenora IPTV journey."}
      </PageHero>
      <main className="section">
        <div className="shell">
          {children || (
            <>
              <div className="grid setup-grid">
                {[
                  "A more seamless experience",
                  "Built for compatible devices",
                  "Flexible by design",
                  "Guidance when you need it",
                  "A considered subscription",
                  "Ready when you are",
                ].map((x, i) => (
                  <article className="card device" key={x}>
                    <IconTile name={visual[i]} />
                    <span className="eyebrow">0{i + 1}</span>
                    <h3>{x}</h3>
                    <p className="muted">
                      Zenora is designed to make plan choice, configuration, and
                      help easier to navigate.
                    </p>
                  </article>
                ))}
              </div>
              {kind === "support" && (
                <div className="page-link-row support-whatsapp">
                  <WhatsAppAction href={supportWhatsAppUrl()}>
                    Get support on WhatsApp
                  </WhatsAppAction>
                  <Link className="btn ghost" href="/troubleshooting">
                    Open troubleshooting
                  </Link>
                </div>
              )}
              <CTA />
            </>
          )}
        </div>
      </main>
    </>
  );
}
export function Devices() {
  const devices: [string, string, string, IconName][] = [
    [
      "Smart TVs",
      "Samsung and LG smart television setup guidance.",
      "/setup/smart-tv",
      "smartTv",
    ],
    [
      "Fire TV Stick",
      "Bring the experience to your Fire TV compatible setup.",
      "/setup/firestick",
      "fireTv",
    ],
    [
      "Android",
      "Guidance for Android televisions and mobile devices.",
      "/setup/android",
      "phone",
    ],
    [
      "iPhone & iPad",
      "Use a compatible iOS application.",
      "/setup/ios",
      "phone",
    ],
    [
      "Windows & macOS",
      "Configure a compatible desktop application.",
      "/setup/windows",
      "laptop",
    ],
    [
      "MAG",
      "Portal configuration concepts for MAG devices.",
      "/setup/mag",
      "mag",
    ],
    [
      "Apple TV",
      "Apple TV guidance for supported app choices.",
      "/setup/apple-tv",
      "appleTv",
    ],
  ];
  return (
    <>
      <PageHero
        eyebrow="Compatibility"
        title="Choose your screen. Keep your flow."
      >
        Compatible-device guidance for the viewing experience you prefer.
      </PageHero>
      <main className="section">
        <div className="shell">
          <div className="grid setup-grid">
            {devices.map(([label, description, href, icon]) => (
              <Link className="card device" href={href} key={label}>
                <IconTile name={icon} />
                <h3>{label}</h3>
                <p className="muted">{description}</p>
                <span className="pill">View guide</span>
              </Link>
            ))}
          </div>
          <CTA />
        </div>
      </main>
    </>
  );
}
const deviceOptions: [string, string, string, IconName, string][] = [
  [
    "Smart TVs",
    "Check the TV platform and official app availability before choosing a player.",
    "/setup/smart-tv",
    "smartTv",
    "TV platform",
  ],
  [
    "Fire TV Stick",
    "Confirm the Fire OS model, region, and official player availability.",
    "/setup/firestick",
    "fireTv",
    "Streaming device",
  ],
  [
    "Android",
    "Android TVs, boxes, phones, and tablets can have different store support.",
    "/setup/android",
    "phone",
    "TV and mobile",
  ],
  [
    "Apple TV",
    "Confirm App Store player availability for the exact Apple TV setup.",
    "/setup/apple-tv",
    "appleTv",
    "Streaming device",
  ],
  [
    "iPhone & iPad",
    "Use an App Store player that supports the supplied connection details.",
    "/setup/ios",
    "phone",
    "Mobile",
  ],
  [
    "Windows",
    "A desktop player can be useful for personal viewing or careful diagnosis.",
    "/setup/windows",
    "laptop",
    "Computer",
  ],
  [
    "macOS",
    "Check the player’s supported playlist-import flow on your Mac.",
    "/setup/mac",
    "laptop",
    "Computer",
  ],
  [
    "MAG",
    "Confirm the model before using the portal details supplied for an account.",
    "/setup/mag",
    "mag",
    "Set-top box",
  ],
];

function Breadcrumbs({ current }: { current: string }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://zenoraiptv.tv/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: current,
        item: `https://zenoraiptv.tv/${current.toLowerCase()}`,
      },
    ],
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <nav className="breadcrumbs shell" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <span>{current}</span>
      </nav>
    </>
  );
}

export function DevicesPage() {
  return (
    <main>
      <Breadcrumbs current="Devices" />
      <PageHero
        eyebrow="Device compatibility"
        title="Find the device setup path that fits your screen."
      >
        Use this compatibility overview to compare device categories, then
        confirm your exact model, operating system, player source, and account
        requirements before subscribing.
      </PageHero>
      <section className="section">
        <div className="shell">
          <div className="section-kicker">
            <div>
              <div className="eyebrow">Choose by device category</div>
              <h2>Compatibility starts with the device you already own.</h2>
            </div>
            <p>
              A supported category is not a guarantee that every model, app,
              region, or software version will work. Start with the documented
              route for your device.
            </p>
          </div>
          <div className="grid setup-grid">
            {deviceOptions.map(([name, description, href, icon, type]) => (
              <article className="card device device-option" key={href}>
                <IconTile name={icon} />
                <span className="pill">{type}</span>
                <h3>{name}</h3>
                <p className="muted">{description}</p>
                <Link className="device-link" href={href}>
                  Check {name} setup <span aria-hidden="true">→</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section device-checks">
        <div className="shell split-panel">
          <div>
            <div className="eyebrow">Before you subscribe</div>
            <h2>Confirm the complete compatibility chain.</h2>
            <p className="muted">
              A compatible device is one part of the setup. Check the exact
              device model and software, a legitimate player source, a stable
              network, and the connection format supported by the service.
            </p>
          </div>
          <ol>
            <li>
              Identify the exact device model and operating-system version.
            </li>
            <li>
              Check that a legitimate player is available from its official
              source.
            </li>
            <li>
              Review whether your chosen plan has the simultaneous connections
              you need.
            </li>
          </ol>
        </div>
      </section>
      <section className="section">
        <div className="shell page-link-row">
          <Link className="btn primary" href="/setup">
            Go to the setup directory
          </Link>
          <Link className="btn ghost" href="/pricing">
            Compare new subscription plans
          </Link>
          <Link className="page-text-link" href="/blog/device-compatibility">
            Read the device compatibility guide{" "}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}

export function SetupDirectory() {
  return (
    <main>
      <Breadcrumbs current="Setup" />
      <PageHero
        eyebrow="Setup directory"
        title="Choose your device, then follow the right setup guide."
      >
        This directory helps prospective and existing customers find the
        documented installation path for their device. Detailed steps remain on
        the device-specific guides.
      </PageHero>
      <section className="section">
        <div className="shell">
          <div className="section-kicker">
            <div>
              <div className="eyebrow">Select your device</div>
              <h2>Start with the screen or device in front of you.</h2>
            </div>
            <p>
              Choose one route to avoid mixing instructions for different
              platforms, app stores, and configuration methods.
            </p>
          </div>
          <div className="grid setup-grid">
            {deviceOptions.map(([name, description, href, icon, type]) => (
              <Link
                className="card device device-option"
                href={href}
                key={href}
              >
                <IconTile name={icon} />
                <span className="pill">{type}</span>
                <h3>Set up on {name}</h3>
                <p className="muted">{description}</p>
                <span className="device-link">
                  Open setup guide <span aria-hidden="true">→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="section setup-onboarding">
        <div className="shell onboarding-grid">
          <article className="card onboarding-card">
            <div className="eyebrow">Prepare first</div>
            <h2>Have these basics ready.</h2>
            <ol>
              <li>Your exact device model and current software version.</li>
              <li>
                A stable internet connection and a legitimate player from its
                official source.
              </li>
              <li>
                The account or connection details supplied through a verified
                Zenora process.
              </li>
            </ol>
          </article>
          <article className="card onboarding-card">
            <div className="eyebrow">Player and service</div>
            <h2>They are different parts of the setup.</h2>
            <p>
              A player application displays a stream on your device. A service
              supplies the account or connection details. Installing a player
              does not itself provide programming or verify the rights behind a
              source.
            </p>
            <Link
              className="page-text-link"
              href="/blog/what-is-an-iptv-player"
            >
              Understand player vs. provider <span aria-hidden="true">→</span>
            </Link>
          </article>
          <article className="card onboarding-card">
            <div className="eyebrow">Configuration overview</div>
            <h2>Follow the format your player supports.</h2>
            <p>
              Documented setup routes may use an M3U playlist, Xtream Codes, or
              portal details. Enter only the exact details supplied for your
              account, and do not share playlist URLs or credentials publicly.
            </p>
            <Link
              className="page-text-link"
              href="/blog/m3u-playlists-explained"
            >
              Read about M3U playlists <span aria-hidden="true">→</span>
            </Link>
          </article>
        </div>
      </section>
      <section className="section">
        <div className="shell split-panel">
          <div>
            <div className="eyebrow">If setup does not work</div>
            <h2>Change one thing at a time.</h2>
            <p className="muted">
              Record the exact error, player version, device, and network before
              retrying. That makes it easier to distinguish a player, account,
              device, or connection issue.
            </p>
          </div>
          <div className="page-link-stack">
            <Link href="/troubleshooting">
              Open troubleshooting <span aria-hidden="true">→</span>
            </Link>
            <Link href="/blog/m3u-playlist-not-loading">
              Diagnose a playlist that will not load{" "}
              <span aria-hidden="true">→</span>
            </Link>
            <Link href="/support">
              Find the right support resource <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
export function Channels() {
  return (
    <>
      <PageHero
        eyebrow="Catalogue"
        title="Explore your entertainment landscape."
      >
        This searchable directory uses clearly marked demonstration entries;
        verify exact channels, languages, and availability with Zenora.
      </PageHero>
      <main className="section">
        <div className="shell">
          <ChannelExplorer />
          <CTA />
        </div>
      </main>
    </>
  );
}
function PricingValue() {
  return (
    <section
      className="pricing-value-section"
      aria-labelledby="pricing-included"
    >
      <div>
        <div className="eyebrow">What’s included with Zenora IPTV</div>
        <h2 id="pricing-included">
          A clearer path from plan choice to informed setup.
        </h2>
        <p>
          Choose a duration and connection count first, then use the documented
          resources that match your device and next step.
        </p>
      </div>
      <div className="pricing-value-list">
        <article>
          <span>01</span>
          <div>
            <h3>Clear plan variables</h3>
            <p>
              See duration, simultaneous-stream count, and price together before
              continuing.
            </p>
          </div>
        </article>
        <article>
          <span>02</span>
          <div>
            <h3>Device-aware guidance</h3>
            <p>
              Use compatibility checks and setup directories for documented
              device paths.
            </p>
          </div>
        </article>
        <article>
          <span>03</span>
          <div>
            <h3>Resources when you need them</h3>
            <p>
              Explore channel information, troubleshooting guides, FAQs, and
              available support routes.
            </p>
          </div>
        </article>
        <div className="pricing-value-links">
          <Link href="/devices">
            Check device compatibility <span aria-hidden="true">→</span>
          </Link>
          <Link href="/blog">
            Browse practical articles <span aria-hidden="true">→</span>
          </Link>
          <Link href="/channels">
            Explore channel information <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
function PricingFaq() {
  return (
    <section
      className="section pricing-faq"
      aria-labelledby="pricing-faq-title"
    >
      <div className="section-head">
        <div className="eyebrow">Pricing questions</div>
        <h2 id="pricing-faq-title">Choose with the right expectations.</h2>
      </div>
      <div className="faq">
        <details>
          <summary>How should I choose a connection count?</summary>
          <p>
            Choose the number of streams that may play at the same time. A
            connection is not simply the number of devices you own.
          </p>
        </details>
        <details>
          <summary>How is annual pricing handled?</summary>
          <p>
            Every available annual connection option includes 12 paid months
            plus 2 free months, for 14 months total access at the displayed
            12-month price.
          </p>
        </details>
        <details>
          <summary>Which devices can I use?</summary>
          <p>
            Check the{" "}
            <Link href="/devices">device compatibility directory</Link> before
            choosing a plan. Exact model, software version, player availability,
            and account requirements still matter.
          </p>
        </details>
        <details>
          <summary>When does activation guidance arrive?</summary>
          <p>
            The public site describes setup details as following verified
            payment confirmation. The checkout preview does not accept payment
            or create an order.
          </p>
        </details>
        <details>
          <summary>Where can I get setup or renewal help?</summary>
          <p>
            Use the <Link href="/setup">setup directory</Link> for device
            guidance, <Link href="/troubleshooting">troubleshooting</Link> for a
            symptom, and <Link href="/renew">renewal guidance</Link> for an
            existing subscription.
          </p>
        </details>
        <details>
          <summary>What about refunds?</summary>
          <p>
            Read the <Link href="/refund-policy">refund policy</Link> before
            relying on eligibility. The page describes conditional seven-day
            refunds where a technical issue cannot be resolved and requires
            final approved terms.
          </p>
        </details>
      </div>
    </section>
  );
}
export function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="New subscription pricing"
        title="Compare a new Zenora IPTV subscription."
      >
        Choose a duration and the number of simultaneous connections for a new
        subscription. Prices update before you continue to checkout.
      </PageHero>
      <main className="section">
        <div className="shell">
          <div className="section-head">
            <div className="eyebrow">Plan selection</div>
            <h2>Choose a duration and connection count.</h2>
            <p>
              Prices update before you continue, so you can review the complete
              new-subscription selection.
            </p>
          </div>
          <Pricing detailed />
          <PricingValue />
          <PricingFaq />
          <section className="section">
            <div className="section-head">
              <div className="eyebrow">Before you choose</div>
              <h2>Simple choices. Clear expectations.</h2>
              <p>
                Already have a Zenora subscription? Use the renewal guidance
                instead of starting a new subscription checkout.
              </p>
              <Link className="page-text-link" href="/renew">
                Review renewal guidance <span aria-hidden="true">→</span>
              </Link>
            </div>
            <FAQs />
          </section>
        </div>
      </main>
      <CTA />
    </>
  );
}
export function FaqPage() {
  return (
    <>
      <PageHero eyebrow="Help center" title="Answers, made easy to find.">
        Searchable support is being prepared. Start with the most common
        subscription and setup answers below.
      </PageHero>
      <main className="section">
        <div className="shell">
          <FAQs />
          <CTA />
        </div>
      </main>
    </>
  );
}
export function RenewPage() {
  return (
    <main>
      <Breadcrumbs current="Renew" />
      <PageHero
        eyebrow="Existing customer renewal"
        title="Renew an existing Zenora IPTV subscription with the right details."
      >
        This page is for existing customers—not for starting a new subscription.
        A verified self-service renewal or payment flow is not currently
        configured on this site.
      </PageHero>
      <section className="section">
        <div className="shell onboarding-grid">
          <article className="card onboarding-card">
            <div className="eyebrow">Before you ask for renewal help</div>
            <h2>Identify your existing plan.</h2>
            <p>
              Keep the subscription email, the plan duration, connection count,
              and the approximate expiry date available. Do not send passwords,
              payment credentials, playlist URLs, or portal details through an
              unverified channel.
            </p>
          </article>
          <article className="card onboarding-card">
            <div className="eyebrow">Renewal is not a new purchase</div>
            <h2>Start with your current subscription details.</h2>
            <p>
              A new-subscription checkout creates a fresh selection; it is not
              presented as a renewal tool. If you are unsure whether a
              subscription is still active, use verified support before choosing
              a new plan.
            </p>
          </article>
          <article className="card onboarding-card">
            <div className="eyebrow">If details are missing</div>
            <h2>Use verified support guidance.</h2>
            <p>
              Check the original subscription email first. If you still cannot
              identify the plan, prepare the non-sensitive account context and
              follow the site’s support guidance.
            </p>
          </article>
        </div>
      </section>
      <section className="section">
        <div className="shell split-panel">
          <div>
            <div className="eyebrow">Current renewal capability</div>
            <h2>Renewal requires support-assisted confirmation.</h2>
            <p className="muted">
              There is no verified self-service renewal API, payment form, or
              completed-renewal confirmation in this implementation. Use
              WhatsApp to request assistance; do not send passwords, payment
              credentials, playlist URLs, or portal details.
            </p>
          </div>
          <div className="page-link-stack">
            <WhatsAppAction href={renewalWhatsAppUrl()}>
              Ask for renewal assistance
            </WhatsAppAction>
            <Link className="btn ghost" href="/support">
              Review support resources
            </Link>
            <Link className="page-text-link" href="/pricing">
              Need a new subscription? Compare plans{" "}
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
      <section className="section renew-faq">
        <div className="shell">
          <div className="section-head">
            <div className="eyebrow">Renewal questions</div>
            <h2>Before you continue.</h2>
          </div>
          <div className="faq">
            <details>
              <summary>Can I renew through checkout?</summary>
              <p>
                No. Checkout is a new-subscription selection flow and its
                payment integration is not configured.
              </p>
            </details>
            <details>
              <summary>
                What should I share when asking for renewal help?
              </summary>
              <p>
                Use only a verified route and share non-sensitive account
                context such as the subscription email and plan details. Do not
                share passwords, payment credentials, playlist URLs, or portal
                details.
              </p>
            </details>
            <details>
              <summary>
                What if I cannot find my original subscription details?
              </summary>
              <p>
                Check the original email first, then use the support guidance to
                determine the appropriate verified next step.
              </p>
            </details>
          </div>
        </div>
      </section>
    </main>
  );
}
export function Contact({ trial = false }) {
  const whatsappHref = trial ? trialWhatsAppUrl() : supportWhatsAppUrl();
  return (
    <>
      <PageHero
        eyebrow={trial ? "Paid trial request" : "Contact support"}
        title={trial ? "Try it thoughtfully." : "Let’s make setup simpler."}
      >
        {trial
          ? "Zenora advertises a paid 24-hour trial request. Terms and price require confirmation before proceeding."
          : "Use WhatsApp for a direct support or setup question. The contact form remains a demonstration and does not send a message."}
      </PageHero>
      <main className="section">
        <div className="shell" style={{ maxWidth: 720 }}>
          <WhatsAppAction href={whatsappHref}>
            {trial
              ? "Ask about the paid trial on WhatsApp"
              : "Chat with Zenora IPTV on WhatsApp"}
          </WhatsAppAction>
          <ContactForm trial={trial} />
          <p className="notice" style={{ marginTop: 18 }}>
            The form below is demonstration-only. Use the WhatsApp action above
            for a direct inquiry; do not send passwords, payment credentials,
            playlist URLs, or portal details.
          </p>
        </div>
      </main>
    </>
  );
}
export function Setup({ device, steps }: { device: string; steps: string[] }) {
  return (
    <>
      <PageHero eyebrow="Setup guide" title={`Set up on ${device}.`}>
        Use legitimate compatible applications and the subscription details sent
        after verified payment. Never share your credentials publicly.
      </PageHero>
      <main className="section">
        <div className="shell">
          <div
            className="grid"
            style={{
              gridTemplateColumns: "minmax(0,1.5fr) minmax(260px,.75fr)",
            }}
          >
            <article className="card" style={{ padding: 28 }}>
              <div className="eyebrow">Before you begin</div>
              <h2>Keep it simple, step by step.</h2>
              {steps.map((x, i) => (
                <div
                  key={x}
                  style={{
                    display: "flex",
                    gap: 16,
                    padding: "18px 0",
                    borderTop: "1px solid var(--line)",
                  }}
                >
                  <span className="pill">0{i + 1}</span>
                  <div>
                    <b>{x}</b>
                    <p className="muted">
                      Follow the application’s documented method for M3U
                      playlists, Xtream Codes, or portal details where
                      supported.
                    </p>
                  </div>
                </div>
              ))}
            </article>
            <aside className="card device">
              <IconTile name="help" />
              <h3>Need help?</h3>
              <p className="muted">
                Check troubleshooting or contact the Zenora team with your
                device and application details.
              </p>
              <Link className="btn ghost" href="/troubleshooting">
                Troubleshooting
              </Link>
            </aside>
          </div>
          <CTA />
        </div>
      </main>
    </>
  );
}
export function Legal({ title }: { title: string }) {
  return (
    <>
      <PageHero eyebrow="Legal" title={title}>
        Draft presentation only. This policy requires review and approval by
        Zenora’s authorized legal representative before publication.
      </PageHero>
      <main className="section">
        <article className="shell legal">
          <h2>Important review notice</h2>
          <p>
            This page is a structured legal-content placeholder. It does not
            create a contract, provide legal advice, or replace the business’s
            verified policy.
          </p>
          <h2>Information and use</h2>
          <p>
            Use of Zenora services, plan availability, support delivery, and
            applicable conditions should be described in final approved terms.
            Customers should review their selected plan and device compatibility
            before purchase.
          </p>
          <h2>Payments and refunds</h2>
          <p>
            The public website references a conditional seven-day refund policy
            where a technical issue cannot be resolved. Eligibility, exclusions,
            timing, and the request process must be confirmed in the official
            approved policy.
          </p>
          <h2>Contact</h2>
          <p>
            Add a verified privacy or support contact in the centralized brand
            configuration before publishing this page.
          </p>
        </article>
      </main>
    </>
  );
}
