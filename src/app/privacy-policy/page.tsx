import { Legal } from "@/components/pages";
import { brandMetadata } from "../route-metadata";
export const metadata = brandMetadata(
  "Privacy Policy | Zenora IPTV",
  "Read the Zenora IPTV privacy policy draft and the information it identifies for review before publication.",
  "/privacy-policy",
);
export default function Page() {
  return <Legal title="Privacy policy" />;
}
