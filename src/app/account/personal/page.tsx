import { Personal } from "@/components/account/Personal";
import { mergeOpenGraph } from "@/utils/mergeMetaData";

const PersonalPage = () => <Personal />;

export const metadata = {
  title: "Personal Details",
  description:
    "Page for Esplendor Rings registered customers to view and edit their personal details.",
  openGraph: mergeOpenGraph({
    title: "Esplendor Rings Personal Details",
    url: "/account/personal",
  }),
};

export default PersonalPage;
