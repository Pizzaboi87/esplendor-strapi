"use client";

import { formatNumber } from "@/utils/helpers";
import { ProductDetails as ProductDetailsType } from "@/types/types";
import { TwoLinesName } from "../common";
import { useFilter } from "@/providers/Filters";
import { useRouter } from "next/navigation";

interface ProductDetailsProps {
  product: ProductDetailsType;
  children: React.ReactNode;
}

export const ProductDetails = ({ product, children }: ProductDetailsProps) => {
  const router = useRouter();
  const {
    setCategoryFilters,
    setSort,
    setPrice,
    setStockStatus,
    setColorFilters,
  } = useFilter();

  // Reset filters
  const resetFilters = () => {
    setCategoryFilters([]);
    setSort("updatedAt:desc");
    setPrice("price:asc");
    setStockStatus("all");
  };

  // Handle filter selection
  const handleFilterSelect = (type: "category" | "color", value: string) => {
    if (type === "category") {
      resetFilters();
      setCategoryFilters([value]);
    } else {
      resetFilters();
      setColorFilters([value]);
    }
    router.push("/shop");
  };

  return (
    <div className="lg:col-span-6 col-span-12 flex flex-col">
      {/* Product Name */}
      <h1 className="block sm:hidden lg:block xl:hidden text-3xl font-bold leading-relaxed">
        <TwoLinesName name={product.name} />
      </h1>
      <h1 className="hidden sm:block lg:hidden xl:block text-3xl font-bold">
        {product.name}
      </h1>

      {/* Categories and Color Filters */}
      <div className="flex items-center mt-5 flex-wrap gap-2">
        {product.categories.map((category) => (
          <span
            key={category.name}
            className="text-sm bg-primary px-2 py-1 rounded-md cursor-pointer"
            onClick={() => handleFilterSelect("category", category.name)}
          >
            {category.name}
          </span>
        ))}
        <span className="text-sm text-gray-500">|</span>
        <span
          className="text-sm bg-primary px-2 py-1 rounded-md cursor-pointer"
          onClick={() => handleFilterSelect("color", product.color.name)}
        >
          {product.color.name}
        </span>
        <span className="text-sm text-gray-500">|</span>
        <p className="text-gray-500">
          {product.isInStock ? "In stock" : "Pre-order"}
        </p>
      </div>

      {/* Price */}
      <p className="mt-10 text-[1.3rem] font-semibold">
        Price: €{formatNumber(product.price)}
      </p>

      {/* Description */}
      <p className="text-lg mt-12 leading-10 tracking-tighter">
        {product.description}
      </p>

      {/* Children */}
      {children}
    </div>
  );
};
