import { Legal } from "@/components/pages";
import { brandMetadata } from "../route-metadata";
export const metadata = brandMetadata(
  "Refund Policy | Zenora IPTV",
  "Read the Zenora IPTV refund policy draft and confirm approved eligibility and process details before publication.",
  "/refund-policy",
);
export default function Page() {
  return <Legal title="Refund policy" />;
}
