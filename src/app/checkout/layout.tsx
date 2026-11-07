import { privateMetadata } from "../route-metadata";

export const metadata = privateMetadata(
  "Checkout | Zenora IPTV",
  "Review a Zenora IPTV plan selection before using an approved checkout integration.",
);

export default function CheckoutLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
