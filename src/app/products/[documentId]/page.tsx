import { Product } from "@/components/pages/Product";
import { RelatedProducts } from "@/components/products/RelatedProducts";

const ProductPage = () => (
  <section>
    <Product />
    <RelatedProducts />
  </section>
);

export const metadata = {
  title: "Product Details",
  description:
    "Find the perfect ring for your special day with Esplendor Rings.",
  openGraph: {
    title: "Esplendor Rings Product Details",
    url: "/products/",
  },
};

export default ProductPage;
