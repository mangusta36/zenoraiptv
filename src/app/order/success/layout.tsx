import { privateMetadata } from "../../route-metadata";

export const metadata = privateMetadata(
  "Order Confirmation | Zenora IPTV",
  "View Zenora IPTV order confirmation information after verified payment processing.",
);

export default function OrderSuccessLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
