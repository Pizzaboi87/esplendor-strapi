import { Filters } from "@/components/categories/Filters";
import { ProductList } from "@/components/products/ProductList";

const ShopPage = () => {
  return (
    <div className="container mx-auto grid grid-cols-12 pb-48">
      <Filters />
      <ProductList />
    </div>
  );
};

export default ShopPage;
