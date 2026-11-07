"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  connectionOptions,
  durations,
  formatPrice,
  type Connections,
  priceFor,
  type DurationId,
} from "@/config/pricing";
import { heroPromotion, isAnnualBonusEligible } from "@/config/promotions";
import { pricingWhatsAppUrl } from "@/config/contact";

export default function Checkout() {
  const query = useSearchParams();
  const requestedDuration = query.get("duration");
  const duration = (
    durations.some((item) => item.id === requestedDuration)
      ? requestedDuration
      : "12"
  ) as DurationId;
  const requestedConnections = Number(query.get("connections"));
  const connections = (
    connectionOptions.some((option) => option === requestedConnections)
      ? requestedConnections
      : 1
  ) as Connections;
  const selectedDuration = durations.find((item) => item.id === duration)!;
  const hasAnnualBonus = isAnnualBonusEligible(duration, connections);

  return (
    <main className="page-hero">
      <div className="shell">
        <div className="eyebrow">Checkout preview</div>
        <h1>
          Review your <span className="gradient">selection.</span>
        </h1>
        <div className="grid checkout-grid">
          <form
            className="card form"
            onSubmit={(event) => event.preventDefault()}
          >
            <div className="notice">
              Payment integration is not configured. This checkout does not
              accept payment or create an order.
            </div>
            <h2>Your details</h2>
            {[
              ["Full name", "text"],
              ["Email", "email"],
              ["Confirm email", "email"],
              ["Country", "text"],
            ].map((field) => (
              <div className="field" key={field[0]}>
                <label>{field[0]}</label>
                <input required type={field[1]} />
              </div>
            ))}
            <div className="field">
              <label>Device type (optional)</label>
              <select>
                <option>Not selected</option>
                <option>Smart TV</option>
                <option>Fire TV</option>
                <option>Android</option>
              </select>
            </div>
            <div className="field">
              <label>Message (optional)</label>
              <textarea />
            </div>
            <label className="muted checkout-terms">
              <input required type="checkbox" /> I agree to the approved terms
              when they are published.
            </label>
            <button className="btn primary checkout-payment" disabled>
              Payment integration pending
            </button>
          </form>
          <aside className="card device checkout-summary">
            <span className="eyebrow">Order summary</span>
            <h2>Zenora IPTV</h2>
            <p className="checkout-plan-name">
              {hasAnnualBonus ? heroPromotion.title : selectedDuration.label}
            </p>
            <div className="checkout-summary-details">
              {hasAnnualBonus ? (
                <>
                  <p>Paid plan: {heroPromotion.paidMonths} months</p>
                  <p>Bonus: {heroPromotion.bonusMonths} free months</p>
                  <p>
                    Total subscription duration: {heroPromotion.totalMonths}{" "}
                    months
                  </p>
                </>
              ) : (
                <p>Subscription duration: {selectedDuration.label}</p>
              )}
              <p>
                Selected connections: {connections} connection
                {connections > 1 ? "s" : ""}
              </p>
            </div>
            <div className="amount">
              ${formatPrice(priceFor(duration, connections))}
            </div>
            <p className="muted">USD total · unchanged plan price</p>
            <a
              className="btn whatsapp-action"
              href={pricingWhatsAppUrl(duration, connections)}
              target="_blank"
              rel="noreferrer"
            >
              Ask about this selection on WhatsApp
            </a>
            <Link className="btn ghost" href="/pricing">
              Change selection
            </Link>
          </aside>
        </div>
      </div>
    </main>
  );
}
