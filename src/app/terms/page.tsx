import { Legal } from "@/components/pages";
import { brandMetadata } from "../route-metadata";
export const metadata = brandMetadata(
  "Terms of Service | Zenora IPTV",
  "Review the Zenora IPTV terms and conditions draft, including the areas requiring authorized business review.",
  "/terms",
  true,
);
export default function Page() {
  return <Legal title="Terms & conditions" />;
}
