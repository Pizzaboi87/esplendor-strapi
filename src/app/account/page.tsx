import { Account } from "@/components/pages/Account";
import { mergeOpenGraph } from "@/utils/mergeMetaData";

const AccountPage = () => (
  <section className="container mx-auto">
    <Account />
  </section>
);

export const metadata = {
  title: "Account Page",
  description: "Account page for Esplendor Rings registered customers.",
  openGraph: mergeOpenGraph({
    title: "Esplendor Rings Account",
    url: "/account",
  }),
};

export default AccountPage;
