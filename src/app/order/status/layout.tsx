import { privateMetadata } from "../../route-metadata";

export const metadata = privateMetadata(
  "Order Status | Zenora IPTV",
  "Use the Zenora IPTV order-status page when secure order lookup is available.",
);

export default function OrderStatusLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
