import { privateMetadata } from "../../route-metadata";

export const metadata = privateMetadata(
  "Order Confirmation | Zenora IPTV",
  "Review the Zenora IPTV order-confirmation placeholder and its current integration status.",
);

export default function OrderSuccessLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
