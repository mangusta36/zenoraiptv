import type { Connections, DurationId } from "@/config/pricing";
import { connectionOptions } from "@/config/pricing";

export const heroPromotion = {
  id: "annual-bonus",
  title: "12 Months + 2 Months FREE",
  paidMonths: 12,
  bonusMonths: 2,
  totalMonths: 14,
  eligibleConnectionCounts: connectionOptions,
  active: true,
  checkoutPlanId: "12",
} as const;

export const isAnnualBonusEligible = (
  duration: DurationId,
  connections: Connections,
) =>
  heroPromotion.active &&
  duration === heroPromotion.checkoutPlanId &&
  heroPromotion.eligibleConnectionCounts.includes(connections);
