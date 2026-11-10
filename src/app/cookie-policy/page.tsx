import { Legal } from "@/components/pages";
import { brandMetadata } from "../route-metadata";
export const metadata = brandMetadata(
  "Cookie Policy | Zenora IPTV",
  "Read the Zenora IPTV cookie policy draft and the information identified for authorized review.",
  "/cookie-policy",
  true,
);
export default function Page() {
  return <Legal title="Cookie policy" />;
}
