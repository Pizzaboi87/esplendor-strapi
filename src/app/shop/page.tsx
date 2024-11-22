import { Filters } from "@/components/products/Filters";
import { ProductList } from "@/components/products/ProductList";
import { mergeOpenGraph } from "@/utils/mergeMetaData";

const ShopPage = () => (
  <section className="container mx-auto flex flex-col gap-y-12 md:grid grid-cols-12 pb-24">
    <Filters />
    <ProductList />
  </section>
);

export const metadata = {
  title: "Esplend'or Webshop",
  description:
    "Find the perfect ring for your special day with Esplendor Rings.",
  openGraph: mergeOpenGraph({
    title: "Esplendor Rings Webshop",
    url: "/shop",
  }),
};

export default ShopPage;
