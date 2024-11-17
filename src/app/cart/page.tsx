import { Cart } from "@/components/pages/Cart";

const CartPage = () => (
  <section className="container mx-auto">
    <Cart />
  </section>
);

export const metadata = {
  title: "Esplend'or Webshop Cart",
  description: "Cart page for the Esplendor Rings Webshop.",
  openGraph: {
    title: "Esplendor Rings Webshop Cart",
    url: "/cart",
  },
};

export default CartPage;
