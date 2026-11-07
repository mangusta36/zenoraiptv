import Link from "next/link";
import {
  ArrowRight,
  Check,
  Crown,
  Diamond,
  Film,
  Globe2,
  Headphones,
  MonitorSmartphone,
  Play,
  Radio,
  Settings2,
} from "lucide-react";
import { heroPromotion } from "@/config/promotions";
import { trialRequestWhatsAppUrl } from "@/config/contact";
const stats = [
  { Icon: Radio, title: "Live TV", copy: "Explore live viewing" },
  { Icon: Film, title: "Movies & Series", copy: "Entertainment library" },
  { Icon: Globe2, title: "Worldwide", copy: "International viewing" },
  { Icon: MonitorSmartphone, title: "All devices", copy: "Compatible setup" },
  { Icon: Settings2, title: "Easy setup", copy: "Guides when needed" },
];
export function HeroCinematic() {
  const promotionHref = `/checkout?duration=${heroPromotion.checkoutPlanId}&connections=1`;
  return (
    <section className="cinematic-hero">
      <picture className="hero-background">
        <source
          media="(max-width: 900px)"
          srcSet="/images/cinematic-living-room-mobile.webp"
        />
        <img
          src="/images/cinematic-living-room-desktop.webp"
          alt=""
          width="1600"
          height="900"
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
      </picture>
      <div className="room-vignette" />
      <div className="shell cinematic-wrap cinematic-simple">
        <div className="hero-left">
          <div className="hero-badge">
            <i /> THE FUTURE OF ENTERTAINMENT
          </div>
          <h1>
            <span>Zenora IPTV.</span>
            <br />
            One Premium
            <br />
            Experience.
          </h1>
          <p>
            Live television, movies, and series on your favorite compatible
            devices, with flexible plans and dedicated setup support.
          </p>
          <div className="cinematic-actions">
            <Link className="cinematic-primary" href="/pricing">
              Get Started <ArrowRight size={18} />
            </Link>
            <a
              className="cinematic-secondary"
              href={trialRequestWhatsAppUrl()}
              target="_blank"
              rel="noreferrer"
            >
              <Play size={14} fill="currentColor" /> Get Trial
            </a>
          </div>
          <div className="hero-benefits">
            <div>
              <Diamond />
              <b>Plan clarity</b>
              <small>Duration • connections</small>
            </div>
            <div>
              <MonitorSmartphone />
              <b>Device guidance</b>
              <small>Documented setup</small>
            </div>
            <div>
              <Headphones />
              <b>Support resources</b>
              <small>Guides • FAQs</small>
            </div>
          </div>
        </div>
        <div className="hero-offer">
          <Link href={promotionHref} className="offer-banner">
            <span className="offer-label">
              <Crown size={14} /> Annual subscription offer
            </span>
            <strong>
              <span>{heroPromotion.paidMonths} Months</span>
              <b>+ {heroPromotion.bonusMonths} Months FREE</b>
            </strong>
            <span className="offer-total">
              <Check size={16} /> {heroPromotion.totalMonths} months total
              access
            </span>
            <span className="offer-cta">
              Explore Annual Plans <ArrowRight size={15} />
            </span>
          </Link>
          <div className="offer-list">
            {[
              "Included viewing access",
              "Compatible devices",
              "Premium viewing experience",
            ].map((item) => (
              <span key={item}>
                <Check /> {item}
              </span>
            ))}
          </div>
        </div>
        <div className="hero-stats">
          {stats.map(({ Icon, title, copy }) => (
            <div key={title}>
              <Icon />
              <b>{title}</b>
              <small>{copy}</small>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
