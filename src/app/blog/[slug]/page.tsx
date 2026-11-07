import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { categories, guideBySlug, guides } from "@/data/guides";
import { ScrollableTable } from "@/components/scrollable-table";
import { articleResearch } from "@/data/article-research";
import { articleRelationships, clusterJourneys } from "@/data/topic-architecture";

export function generateStaticParams() {
  return guides.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = guideBySlug(slug);
  const image = article?.hero?.src;
  const description = article ? `Get clear guidance on ${article.keyword}, practical checks, and a safer next step.` : "";
  return article
    ? {
        title: { absolute: article.title },
        description,
        alternates: { canonical: `/blog/${article.slug}` },
        openGraph: {
          type: "article",
          title: `${article.title} | Zenora IPTV`,
          description,
          publishedTime: article.updated,
          modifiedTime: article.updated,
          url: `/blog/${article.slug}`,
          images: image ? [{ url: image, alt: article.hero?.alt ?? article.title }] : undefined,
        },
        twitter: {
          card: "summary_large_image",
          title: `${article.title} | Zenora IPTV`,
          description,
          images: image ? [image] : undefined,
        },
      }
    : { title: "Article not found" };
}

const visuals: Record<string, { src: string; alt: string; caption?: string }> = {
  "what-is-iptv": { src: "/images/guides/iptv-living-room-editorial.webp", alt: "Modern living room with an abstract television glow" },
  "device-compatibility": { src: "/images/guides/streaming-device-network-editorial.webp", alt: "Generic streaming device and router on a media console" },
  "iptv-troubleshooting": { src: "/images/guides/streaming-device-network-editorial.webp", alt: "Generic streaming device and router on a media console" },
  "improve-streaming-quality": { src: "/images/guides/streaming-device-network-editorial.webp", alt: "Generic streaming device and router on a media console" },
};

const practical: Record<string, [string, string[]]> = {
  fundamentals: ["Use this knowledge now", ["Identify the service, player, and device as three separate parts of your setup.", "Keep playlist URLs and account tokens private—treat them like passwords.", "Move to the device guide only after you know what the service actually supports."]],
  setup: ["Before you install", ["Confirm the exact device model and software version.", "Use the official store or an app publisher’s documented source.", "Save the player version and any error message before contacting support."]],
  performance: ["A better troubleshooting habit", ["Change one variable per test so the result is meaningful.", "Write down the time, network type, device, and exact error.", "Compare with one known-good legal stream before resetting everything."]],
  safety: ["A safer next step", ["Read renewal and refund terms before you pay.", "Use unique credentials and enable MFA when it is offered.", "Pause if a download, payment request, or rights claim cannot be verified."]],
};

const categoryLinks: Record<string, { href: string; label: string }[]> = {
  fundamentals: [
    { href: "/blog/device-compatibility", label: "Check device compatibility" },
    { href: "/blog/choosing-an-iptv-subscription", label: "Compare subscription terms" },
  ],
  setup: [
    { href: "/devices", label: "View supported-device guidance" },
    { href: "/setup", label: "Open the setup hub" },
  ],
  performance: [
    { href: "/troubleshooting", label: "Open troubleshooting guidance" },
    { href: "/blog/improve-streaming-quality", label: "Improve streaming quality" },
  ],
  safety: [
    { href: "/privacy-policy", label: "Read the privacy policy" },
    { href: "/contact", label: "Contact Zenora IPTV" },
  ],
};

const fallbackFaq: Record<string, [string, string]> = {
  fundamentals: ["What is the safest next step after learning the basics?", "Confirm the exact device, player, service terms, and supported connection format before entering credentials or changing settings."],
  setup: ["What should I record before asking for setup help?", "Record the exact device model, operating-system version, player version, connection type, and the complete non-sensitive error message. Do not send passwords or playlist tokens."],
  performance: ["What should I record before asking for troubleshooting help?", "Record the affected title, time and time zone, device and player version, network type, exact symptom, and the result of one controlled comparison. Keep credentials private."],
  safety: ["What should I verify before I continue?", "Use the service’s published terms, a verified app source, and an official support route. Pause when payment, privacy, or content-rights information cannot be verified."],
};

const tableOverrides: Record<string, { heading: string; caption: string; headers: string[]; rows: string[][] }> = {
  "what-is-iptv": {
    heading: "What each part of an IPTV setup does",
    caption: "Use the component that matches the symptom before changing settings.",
    headers: ["Component", "Its job", "What it cannot prove"],
    rows: [
      ["Authorized service", "Makes programming and account access available under its own terms.", "That every player or device will support its documented format."],
      ["Player app", "Reads a supported connection format and presents media on a device.", "That a source has distribution rights or an account is active."],
      ["Viewing device", "Runs the player and decodes the delivered media.", "That the local network or upstream delivery path is healthy."],
      ["Home network", "Connects the device to the media path.", "That a particular service, account, or title is available."],
    ],
  },
  "m3u-playlists-explained": {
    heading: "M3U terms at a glance",
    caption: "A playlist, a manifest, and an account each have different roles.",
    headers: ["Term", "What it usually contains", "Safe handling"],
    rows: [
      ["M3U playlist", "Text entries that point a player to media locations.", "Treat a private URL as sensitive if it includes an account token."],
      ["M3U8 manifest", "An HLS playlist that can reference media segments and variants.", "Use only the format and address supplied by the authorized service."],
      ["EPG data", "Schedule metadata for a player interface.", "A guide loading does not prove that video playback will work."],
      ["Player", "Software that reads a supported format.", "Install it from its verified publisher or device store."],
    ],
  },
  "device-compatibility": {
    heading: "Compatibility checks before you configure a player",
    caption: "Confirm the exact combination rather than relying on a device family name.",
    headers: ["Check", "Question to answer", "Why it matters"],
    rows: [
      ["Device model", "Which exact hardware and operating-system version do you own?", "App listings and media capability can vary within one product family."],
      ["Player availability", "Is the official player listing available for this device and region?", "A similar phone or TV app may not be built for the same interface."],
      ["Service format", "Which documented sign-in or playlist format is supported?", "A compatible device does not make every connection method interchangeable."],
      ["Baseline playback", "Can the device play a known-good authorized stream on this network?", "It separates general device or network issues from a new configuration."],
    ],
  },
  "fire-tv-setup-checklist": {
    heading: "Fire TV setup checks before entering service details",
    caption: "Record the exact model and software version; Fire TV capability is model-specific.",
    headers: ["Check", "Why it matters", "Safe next step"],
    rows: [
      ["Model and Fire OS", "Store availability and player support can vary across Fire TV devices and releases.", "Read the model and Fire OS version in Settings before choosing a player."],
      ["Player source", "A player is an interface, and publisher support still matters.", "Use the Amazon Appstore or a documented publisher listing."],
      ["Network baseline", "A Wi-Fi issue can look like an account problem.", "Test another trusted app before changing the Fire TV configuration."],
      ["Account details", "Playlist URLs and tokens can grant access.", "Enter only supplied details and never post them publicly."],
    ],
  },
  "iptv-troubleshooting": {
    heading: "Choose the next diagnostic test from the symptom",
    caption: "Change one variable at a time so a result points to a likely layer.",
    headers: ["Symptom", "First controlled check", "Avoid"],
    rows: [
      ["One title fails", "Compare a second authorized title on the same device and network.", "Resetting every device before recording the exact error."],
      ["All playback fails on one network", "Test a known-good app and then a different trusted connection if practical.", "Assuming a speed test alone proves the media path is healthy."],
      ["One device is affected", "Check updates, storage, heat, and player version on that device.", "Deleting account details before preserving the symptom."],
      ["Login or guide data fails", "Confirm account status and the documented format with the authorized service.", "Pasting tokens into public validators or support forums."],
    ],
  },
  "improve-streaming-quality": {
    heading: "Improve streaming quality with controlled comparisons",
    caption: "A stable baseline is more useful than changing several settings at once.",
    headers: ["Observation", "Check first", "What the result suggests"],
    rows: [
      ["Playback quality drops on Wi-Fi", "Retest near the router with the same device and title.", "Distance or interference may be relevant, but the result is not proof by itself."],
      ["One device looks worse", "Compare the exact player version, updates, storage, and display settings.", "The device or app may differ from the working setup."],
      ["Only one title is affected", "Try another authorized title without changing the network.", "The affected delivery path or entitlement may be different."],
      ["Problems recur at a time of day", "Record household traffic and repeat one comparison at that time.", "Local demand, routing, or upstream conditions may be involved."],
    ],
  },
  "iptv-security-privacy": {
    heading: "Protect an IPTV account and device",
    caption: "Keep account access, app sources, and payment information separate.",
    headers: ["Area", "Safer practice", "Reason"],
    rows: [
      ["Credentials", "Use a unique password and enable MFA when a service offers it.", "Limits the impact of a reused or exposed password."],
      ["Playlist addresses", "Treat a tokenized URL as private account access.", "A copied address can expose an account even without a password."],
      ["App installs", "Use a verified device store or documented publisher source.", "Reduces the risk of unknown packages and unsupported updates."],
      ["Payments", "Review terms and use a traceable, legitimate payment route.", "Makes billing and refund questions easier to resolve."],
    ],
  },
  "choosing-an-iptv-subscription": {
    heading: "Compare an IPTV subscription before you pay",
    caption: "Write down published terms instead of relying on a channel-count headline.",
    headers: ["Question", "Evidence to look for", "Why it matters"],
    rows: [
      ["Will it work on my device?", "Exact supported device, app, region, and connection format.", "A broad platform claim is not the same as compatibility with your model."],
      ["What am I buying?", "Price, billing duration, connection limit, renewal terms, and refund policy.", "Makes the total offer comparable before payment."],
      ["Is the content authorized?", "A clear business identity and an explanation of availability in your location.", "Delivery technology alone does not establish programming rights."],
      ["Where can I get help?", "A documented support route and a safe way to share non-sensitive diagnostics.", "Support is more useful when the route and scope are clear."],
    ],
  },
  "what-is-an-iptv-player": {
    heading: "What an IPTV player can and cannot do",
    caption: "A player is the interface between a documented connection format and a viewing device.",
    headers: ["Player task", "What to confirm", "What it does not establish"],
    rows: [
      ["Read a supported format", "The service’s documented sign-in, portal, or playlist method.", "That any arbitrary link is safe or authorized."],
      ["Present video and guide data", "The official listing supports your exact device and region.", "That an account includes a specific title or guide."],
      ["Maintain app settings", "Publisher updates and privacy details where available.", "That reinstalling resolves account or upstream issues."],
      ["Report an error", "The full non-sensitive message, version, and device model.", "The root cause without a controlled comparison."],
    ],
  },
  "android-tv-google-tv-iptv": {
    heading: "Android TV and Google TV setup checks",
    caption: "Confirm the device interface and the publisher-supported app before configuration.",
    headers: ["Check", "Question", "Safe action"],
    rows: [
      ["Operating-system interface", "Is this Android TV/Google TV rather than a phone-oriented Android device?", "Use a TV-compatible app listing and remote-friendly interface."],
      ["App source", "Does the publisher provide an official Play Store listing for this device?", "Avoid unknown packages offered as compatibility shortcuts."],
      ["Device updates", "Are system and player updates current?", "Update before treating a general platform issue as a service failure."],
      ["Connection format", "Which fields does the authorized service document?", "Enter only supplied details and keep tokens private."],
    ],
  },
  "iptv-buffering-causes": {
    heading: "Match buffering symptoms to the next test",
    caption: "A speed test is one observation, not a diagnosis of the entire playback path.",
    headers: ["What you observe", "Possible layer", "Least disruptive next test"],
    rows: [
      ["Only one title pauses", "Source, encoding, or account-specific delivery.", "Compare another authorized title on the same device and network."],
      ["All apps fail on Wi-Fi", "Signal, interference, router load, or internet access.", "Try a known-good app and then one controlled location or connection change."],
      ["One device pauses", "Device resources, heat, player version, or settings.", "Update, cool, and retest the same title without changing other variables."],
      ["Quality changes before a pause", "Adaptive playback reacting to changing conditions.", "Record time and network type; do not assume a fixed bitrate rule applies."],
    ],
  },
  "ethernet-vs-wifi-streaming": {
    heading: "Choose Ethernet or Wi-Fi from the actual constraint",
    caption: "A wired test can isolate wireless conditions, but it cannot prove every upstream condition is healthy.",
    headers: ["Situation", "Useful comparison", "What not to conclude"],
    rows: [
      ["Device is far from the router", "Retest closer to the router with the same title.", "That proximity alone identifies every cause of a pause."],
      ["A supported wired adapter is available", "Compare the same device and title over Ethernet.", "That Ethernet fixes account, player, or source issues."],
      ["Several household devices stream at once", "Pause one large download for a single test.", "That one quiet test guarantees peak-hour performance."],
      ["Only one title fails", "Compare a second authorized title before changing the connection.", "That Wi-Fi is responsible for a title-specific problem."],
    ],
  },
  "samsung-smart-tv-iptv": {
    heading: "Samsung TV checks before configuring a player",
    caption: "Use the TV model and region-specific app availability, not an assumption based on the brand.",
    headers: ["Check", "Why it matters", "Safe next step"],
    rows: [
      ["Exact TV model", "App support can vary by model year and platform release.", "Record the model and software version from TV settings."],
      ["Official app listing", "A compatible app must be available in the relevant store and region.", "Verify the publisher and listing before installing."],
      ["Network baseline", "A general connection issue can resemble a player problem.", "Test a known-good app before entering account details."],
      ["Connection format", "Services can document different supported methods.", "Use only supplied fields and keep account tokens private."],
    ],
  },
  "apple-tv-iptv-compatibility": {
    heading: "Apple TV compatibility checks",
    caption: "Confirm the tvOS app and the authorized service’s documented connection format.",
    headers: ["Check", "Question", "Why it matters"],
    rows: [
      ["tvOS and model", "Is the device updated and is the app available for this Apple TV?", "App support and media capabilities depend on the actual hardware and software."],
      ["Player source", "Is the app from its verified App Store publisher?", "A player’s presence does not validate an entered source."],
      ["HLS playback", "Does a known-good authorized stream play on the same network?", "It provides a baseline before changing service-specific settings."],
      ["Account details", "Which documented format does the service support?", "Avoid guessing fields or sharing tokenized addresses."],
    ],
  },
  "iptv-epg-not-working": {
    heading: "Diagnose an EPG problem separately from video playback",
    caption: "Guide metadata and media delivery are related but independent parts of a viewing setup.",
    headers: ["Symptom", "First check", "Interpret carefully"],
    rows: [
      ["Video works but schedule is blank", "Confirm the service supplies guide data for that account and region.", "A working stream does not guarantee an EPG mapping."],
      ["Times are offset", "Check device time zone and the guide’s documented time basis.", "Do not edit account data before recording the offset."],
      ["Only some channels lack listings", "Compare channel identifiers and the service’s guide coverage.", "A partial guide is not necessarily a player failure."],
      ["Nothing updates", "Check the player’s documented refresh behavior and network baseline.", "Repeated refreshes cannot create missing upstream data."],
    ],
  },
  "m3u-playlist-not-loading": {
    heading: "Check an M3U playlist load failure safely",
    caption: "Preserve the exact error and keep tokenized addresses out of public tools.",
    headers: ["Symptom", "Controlled check", "Avoid"],
    rows: [
      ["Playlist will not import", "Confirm the documented format and recheck the supplied address privately.", "Pasting a private URL into a public validator."],
      ["List imports but entries fail", "Try one known-good authorized entry and note the exact message.", "Assuming the player, account, and network failed for the same reason."],
      ["One device cannot load it", "Compare player version and support for the documented format.", "Changing the address before preserving the original error."],
      ["It stopped after working", "Check account status and test a second authorized device or network if practical.", "Reinstalling immediately and losing diagnostic evidence."],
    ],
  },
  "iptv-black-screen-no-sound": {
    heading: "Separate a black screen from an audio or app failure",
    caption: "The controls, audio state, and behavior on another title help narrow the next step.",
    headers: ["Observation", "First check", "Possible layer"],
    rows: [
      ["Controls respond but picture is black", "Try another authorized title without changing output settings.", "Source, decoding, or display negotiation may differ."],
      ["Audio continues without video", "Record the device, player version, and title before restarting.", "Rendering or decoding may be involved, not only bandwidth."],
      ["No sound on every app", "Check TV/receiver output and a known-good app.", "The system audio path may be independent of the player."],
      ["One title has no sound", "Compare a second title with the same configuration.", "The media track or source may be specific to that title."],
    ],
  },
  "fire-tv-vs-android-tv": {
    heading: "Compare Fire TV and Android TV without assuming equivalence",
    caption: "Choose the platform that supports the exact player, update path, and remote experience you need.",
    headers: ["Decision factor", "Fire TV question", "Android TV/Google TV question"],
    rows: [
      ["App availability", "Is the official listing available for this Fire TV model and region?", "Is the TV-oriented Play Store listing available for this device?"],
      ["Software support", "Which Fire OS or platform release does the device use?", "Which Android TV/Google TV version and manufacturer updates apply?"],
      ["Setup method", "Does the service document a compatible Fire TV player and format?", "Does it document an Android TV/Google TV player and format?"],
      ["Baseline test", "Can a known-good authorized app play reliably?", "Can the same comparison be made on the Android TV device?"],
    ],
  },
  "iptv-login-authentication-errors": {
    heading: "Handle login and authentication errors without exposing credentials",
    caption: "The exact message and account state are more useful than repeated reinstalls.",
    headers: ["Symptom", "Safe check", "Keep private"],
    rows: [
      ["Incorrect credentials", "Re-enter the supplied details once and confirm the account’s documented status.", "Passwords, activation codes, and tokenized URLs."],
      ["Account not recognized", "Confirm the player uses the exact documented connection format.", "Screenshots containing account data or payment information."],
      ["Login works elsewhere only", "Compare device time, player version, and supported device status.", "Assuming a reinstall renews or changes an account."],
      ["Repeated authentication prompt", "Record the error and contact the authorized service privately.", "Third-party account checkers or public forums."],
    ],
  },
};

export default async function BlogArticle({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = guideBySlug(slug);
  if (!article) notFound();
  const related = article.related.map(guideBySlug).filter(Boolean);
  const visual = article.hero ?? visuals[article.slug];
  const note = practical[article.category];
  const table = article.table ? (tableOverrides[article.slug] ?? article.table) : undefined;
  const articleFaqs = article.faqs.length >= 3 ? article.faqs : [...article.faqs, fallbackFaq[article.category]];
  const articleUrl = `https://zenoraiptv.tv/blog/${article.slug}`;
  const researchFindings = articleResearch[article.slug] ?? [];
  const relationship = articleRelationships[article.slug];
  const journey = relationship ? clusterJourneys[relationship.cluster] : undefined;
  const linkedGuides = (slugs: string[]) => slugs.map(guideBySlug).filter(Boolean);
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        headline: article.title,
        description: article.description,
        author: { "@type": "Organization", name: "Zenora IPTV", url: "https://zenoraiptv.tv" },
        datePublished: article.updated,
        dateModified: article.updated,
        mainEntityOfPage: articleUrl,
        image: visual ? [`https://zenoraiptv.tv${visual.src}`] : undefined,
        publisher: { "@type": "Organization", name: "Zenora IPTV", url: "https://zenoraiptv.tv" },
      },
      { "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "Blog", item: "https://zenoraiptv.tv/blog" },
        { "@type": "ListItem", position: 2, name: categories[article.category as keyof typeof categories].name, item: `https://zenoraiptv.tv/blog?category=${article.category}` },
        { "@type": "ListItem", position: 3, name: article.title, item: articleUrl },
      ] },
      ...(articleFaqs.length ? [{
        "@type": "FAQPage",
        mainEntity: articleFaqs.map(([name, text]) => ({ "@type": "Question", name, acceptedAnswer: { "@type": "Answer", text } })),
      }] : []),
    ],
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <section className="article-head"><div className="shell">
        <div className="breadcrumbs"><Link href="/blog">Blog</Link><span aria-hidden="true">/</span><Link href={`/blog?category=${article.category}`}>{categories[article.category as keyof typeof categories].name}</Link></div>
        <div className="eyebrow">{article.intent} · Updated {new Date(`${article.updated}T12:00:00Z`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</div>
        <h1>{article.title}</h1><p>{article.summary}</p><div className="article-meta">Editorial guide <span>•</span> {article.read}</div>
        {visual && <figure className="article-feature-image"><Image src={visual.src} alt={visual.alt} width={1200} height={630} priority sizes="(max-width: 900px) 100vw, 900px" /><figcaption>{visual.caption ?? "Illustrative editorial image. It does not depict a specific player, service, or device model."}</figcaption></figure>}
      </div></section>
      <section className="section article-wrap"><div className="shell article-layout">
        <aside className="toc" aria-label="Table of contents"><strong>In this article</strong>{article.sections.map((section, index) => <a href={`#s${index}`} key={section.heading}>{section.heading}</a>)}<a href="#faq">FAQs</a><a href="#sources">Sources</a></aside>
        <article className="article-body">
          <p className="article-answer-first">This guide explains <strong>{article.keyword}</strong> with practical, rights-aware checks you can use before changing a player, device, account, or network setting.</p>
          <aside className="practical-note"><span className="eyebrow">Practical takeaway</span><h2>{note[0]}</h2><ol>{note[1].map((item) => <li key={item}>{item}</li>)}</ol></aside>
          {relationship && journey && <aside className="practical-note topic-journey" aria-label="Editorial learning path">
            <span className="eyebrow">{journey.name}</span>
            <h2>Use this guide in the right order.</h2>
            <p>{journey.summary}</p>
            <p><strong>This page answers:</strong> {relationship.primaryQuery}. <span className="muted">It is not the primary guide for {relationship.excludedQuery}.</span></p>
            <div className="topic-journey-links">
              {relationship.pillar !== article.slug && <Link href={`/blog/${relationship.pillar}`}>Cluster starting point: {guideBySlug(relationship.pillar)?.title}</Link>}
              {linkedGuides(relationship.prerequisites).map((item) => <Link href={`/blog/${item!.slug}`} key={item!.slug}>Read first: {item!.title}</Link>)}
              {relationship.successor && <Link href={`/blog/${relationship.successor}`}>Next: {guideBySlug(relationship.successor)?.title}</Link>}
              {linkedGuides(relationship.crossCluster).map((item) => <Link href={`/blog/${item!.slug}`} key={item!.slug}>Related decision: {item!.title}</Link>)}
            </div>
          </aside>}
          {article.sections.map((section, index) => {
            const links = section.links ?? (index < 2 ? [categoryLinks[article.category][index]] : []);
            return <section id={`s${index}`} tabIndex={-1} key={section.heading}><span className="section-number">0{index + 1}</span><h2>{section.heading}</h2>{section.figure && <figure className="article-section-image"><Image src={section.figure.src} alt={section.figure.alt} width={800} height={500} sizes="(max-width: 900px) 100vw, 760px" />{section.figure.caption && <figcaption>{section.figure.caption}</figcaption>}</figure>}{section.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{index === 1 && researchFindings.length > 0 ? <aside className="practical-note article-research"><h3>Verified delivery details</h3><ul>{researchFindings.map((finding) => <li key={finding.href}>{finding.claim} <a href={finding.href} target="_blank" rel="noreferrer">{finding.sourceLabel}</a> <span className="muted">({finding.sourceDate})</span></li>)}</ul></aside> : null}{links.length ? <p className="article-context-links">{links.map((link, linkIndex) => <span key={link.href}>{linkIndex > 0 && " · "}<Link href={link.href}>{link.label}</Link></span>)}</p> : null}</section>;
          })}
          {table && <section className="article-table"><h2 id={`${article.slug}-table-heading`}>{table.heading ?? `${article.keyword}: practical checks`}</h2><ScrollableTable labelId={`${article.slug}-table-heading`}><table><caption>{table.caption}</caption><thead><tr>{table.headers.map((header) => <th scope="col" key={header}>{header}</th>)}</tr></thead><tbody>{table.rows.map((row) => <tr key={row[0]}>{row.map((cell) => <td key={cell}>{cell}</td>)}</tr>)}</tbody></table></ScrollableTable></section>}
          <section id="faq" tabIndex={-1}><span className="section-number">FAQ</span><h2>Frequently asked questions</h2>{articleFaqs.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</section>
          <section className="sources" id="sources" tabIndex={-1}><span className="section-number">Sources</span><h2>Sources and further reading</h2><ul>{article.sources.map((source) => <li key={source.href}><a href={source.href} target={source.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">{source.label}</a></li>)}</ul></section>
          <p className="article-context-links">For a clear next step, visit <Link href="/">Zenora IPTV</Link> to compare the relevant device guidance, plan information, and support resources before proceeding.</p>
        </article>
      </div></section>
      <section className="section related"><div className="shell"><div className="section-head"><div className="eyebrow">Continue reading</div><h2>Related articles</h2></div><div className="guide-grid">{related.map((item) => item && <Link className="card guide-card" href={`/blog/${item.slug}`} key={item.slug}><span className="eyebrow">{categories[item.category as keyof typeof categories].name}</span><h3>{item.title}</h3><p>{item.description}</p><span className="guide-arrow">Read article →</span></Link>)}</div></div></section>
    </main>
  );
}
