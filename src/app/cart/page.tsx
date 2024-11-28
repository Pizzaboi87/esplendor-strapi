import { Cart } from "@/components/pages/Cart";
import { mergeOpenGraph } from "@/utils/mergeMetaData";

const CartPage = () => (
  <section className="container mx-auto">
    <Cart />
  </section>
);

export const metadata = {
  title: "Your Cart",
  description: "Cart page for the Esplendor Rings Webshop.",
  openGraph: mergeOpenGraph({
    title: "Esplendor Rings Webshop Cart",
    url: "/cart",
  }),
};

export default CartPage;
