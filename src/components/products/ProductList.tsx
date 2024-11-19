"use client";

import { useState, useEffect } from "react";
import { useQueries } from "@tanstack/react-query";
import { useFilter } from "@/providers/Filters";
import { ProductCard } from "./ProductCard";
import { getProductsWithSize } from "@/utils/globalApi";
import { Button, Loading } from "../common";

export const ProductList = () => {
  const { categoryFilters, colorFilters, price, sort, stockStatus } =
    useFilter();
  const [products, setProducts] = useState<any[]>([]);
  const [start, setStart] = useState<number>(0);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const ITEMS_PER_PAGE = 12;

  // Fetch products and the total number of products
  const [productsSizeQuery, productsQuery] = useQueries({
    queries: getProductsWithSize(
      categoryFilters,
      colorFilters,
      start,
      price,
      sort,
      stockStatus
    ),
  });

  // Total number of products
  const totalProducts = productsSizeQuery.data || 0;
  const isLoadingInitial =
    productsSizeQuery.isLoading || productsQuery.isLoading;
  const error = productsSizeQuery.error || productsQuery.error;

  // Reset products and start when filters or sort change
  useEffect(() => {
    setProducts([]);
    setStart(0);
  }, [categoryFilters, colorFilters, sort, price, stockStatus]);

  // Add new products to the list
  useEffect(() => {
    if (productsQuery.data) {
      setProducts((prev) => {
        const newProducts = Array.isArray(productsQuery.data)
          ? productsQuery.data.filter(
              (product) =>
                !prev.some((p) => p.documentId === product.documentId)
            )
          : [];
        return [...prev, ...newProducts];
      });
      setIsLoadingMore(false);
    }
  }, [productsQuery.data]);

  // Load more products when the "Load More" button is clicked
  const loadMore = () => {
    setIsLoadingMore(true);
    setStart((prev) => prev + ITEMS_PER_PAGE);
  };

  // Loading state
  if (isLoadingInitial && products.length === 0) {
    return (
      <div className="xl:col-span-9 col-span-8 xl:pb-24">
        <Loading />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <p className="text-red-500">
        Error loading products: {error.message || "Unknown error"}
      </p>
    );
  }

  return (
    <div className="xl:col-span-9 col-span-8">
      {products.length ? (
        <div className="flex flex-col">
          <div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-10">
            {products.map((product) => (
              <ProductCard key={product.documentId} product={product} />
            ))}
          </div>

          <div
            className={`${
              products.length <
              (typeof totalProducts === "number" ? totalProducts : 0)
                ? "visible"
                : "invisible"
            } flex justify-center mt-12 w-1/2 mx-auto`}
          >
            <Button
              type="button"
              onClick={loadMore}
              disabled={isLoadingMore}
              isLoading={isLoadingMore}
              className="text-white px-4 py-2 xl:w-1/2 w-full"
            >
              Load More
            </Button>
          </div>
        </div>
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
};
