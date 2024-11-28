import { Membership } from "@/components/account/Membership";
import { mergeOpenGraph } from "@/utils/mergeMetaData";

const MembershipPage = () => <Membership />;

export const metadata = {
  title: "Golden Loyalty",
  description:
    "Golden Loyalty Membership page for Esplendor Rings registered customers.",
  openGraph: mergeOpenGraph({
    title: "Esplendor Rings Golden Loyalty Membership",
    url: "/account/loyalty",
  }),
};

export default MembershipPage;
