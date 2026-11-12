import { siteOrigin } from "@/config/site";

export const brand = {
  name: 'Zenora IPTV', domain: siteOrigin, tagline: 'Entertainment, beautifully connected.',
  supportEmail: '', supportHours: 'Support availability is confirmed when you contact the team.',
  currencies: ['USD', 'EUR', 'GBP'], trial: { type: 'paid', duration: '24-hour request', price: null },
  refund: 'Refund policy draft requires authorized approval before publication.',
  contactConfigured: false, paymentConfigured: false,
} as const;
