import { heroPromotion, isAnnualBonusEligible } from "@/config/promotions";
import {
  durations,
  formatPrice,
  priceFor,
  type Connections,
  type DurationId,
} from "@/config/pricing";

export const whatsapp = {
  displayNumber: "+212 753 936 672",
  number: "212753936672",
  baseUrl: "https://wa.me/212753936672",
} as const;

export function whatsappUrl(message: string) {
  const url = new URL(whatsapp.baseUrl);
  url.searchParams.set("text", message);
  return url.toString();
}

export function pricingWhatsAppUrl(
  duration: DurationId,
  connections: Connections,
) {
  const plan = durations.find((item) => item.id === duration)!;
  const price = formatPrice(priceFor(duration, connections));
  const planLabel = isAnnualBonusEligible(duration, connections)
    ? heroPromotion.title
    : plan.label;
  const annualBonusDetails = isAnnualBonusEligible(duration, connections)
    ? `\nPaid plan: ${heroPromotion.paidMonths} months\nBonus: ${heroPromotion.bonusMonths} free months\nTotal subscription duration: ${heroPromotion.totalMonths} months`
    : "";
  return whatsappUrl(
    `Hello Zenora IPTV!\nI'd like to order:\nPlan: ${planLabel}${annualBonusDetails}\nConnections: ${connections}\nPrice: $${price}`,
  );
}

export const renewalWhatsAppUrl = () =>
  whatsappUrl(
    "Hello Zenora IPTV, I am an existing customer and would like assistance renewing my subscription.",
  );

export const supportWhatsAppUrl = () =>
  whatsappUrl(
    "Hello Zenora IPTV, I would like assistance with my service or setup.",
  );

export const trialWhatsAppUrl = () =>
  whatsappUrl(
    "Hello Zenora IPTV, I would like to ask about the paid trial option.",
  );

export const trialRequestWhatsAppUrl = () =>
  whatsappUrl(
    "Hello Zenora IPTV!\nI'd like to request a trial.\nPlease help me get started.",
  );
