import { Account } from "@/components/pages/Account";

const AccountPage = () => (
  <section className="container mx-auto">
    <Account />
  </section>
);

export default AccountPage;

export const metadata = {
  title: "Account Page",
  description: "Account page for Esplendor Rings registered customers.",
  openGraph: {
    title: "Esplendor Rings Account",
    url: "/",
  },
};
