import { Orders } from "@/components/account/Orders";
import { mergeOpenGraph } from "@/utils/mergeMetaData";

const OrdersPage = () => <Orders />;

export const metadata = {
  title: "Previous Orders",
  description:
    "Page for Esplendor Rings registered customers to view their orders.",
  openGraph: mergeOpenGraph({
    title: "Esplendor Rings Previous Orders",
    url: "/account/orders",
  }),
};

export default OrdersPage;
