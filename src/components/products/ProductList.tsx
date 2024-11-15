"use client";

import { useFilter } from "@/providers/Filters";
import { Product } from "@/types/types";
import { API_ENDPOINTS, fetchProducts } from "@/utils/globalApi";
import { useQuery } from "@tanstack/react-query";
import { ProductCard } from "./ProductCard";
import { Loading } from "../common/Loading";

export const ProductList = () => {
  const { categoryFilters, sort } = useFilter();

  // Fetch products from the API
  const {
    data: products,
    error,
    isLoading,
  } = useQuery<Product[], Error>({
    queryKey: ["products", categoryFilters],
    queryFn: async () =>
      await fetchProducts(API_ENDPOINTS.GET_PRODUCTS, categoryFilters),
  });

  if (isLoading)
    return (
      <div className="col-span-9 pb-24">
        <Loading />
      </div>
    );
  if (error) return <p>Error loading products: {error.message}</p>;

  return (
    <div className="col-span-9">
      {products?.length ? (
        <div className="grid grid-cols-3 gap-10">
          {products
            .sort((a, b) => {
              if (sort === "oldest") {
                return new Date(a.updatedAt) > new Date(b.updatedAt) ? 1 : -1;
              } else {
                return new Date(a.updatedAt) < new Date(b.updatedAt) ? 1 : -1;
              }
            })
            .map((product) => (
              <ProductCard key={product.documentId} product={product} />
            ))}
        </div>
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
};
