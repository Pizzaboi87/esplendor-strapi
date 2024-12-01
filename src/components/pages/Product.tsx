"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchProduct } from "@/utils/globalApi";
import { useParams } from "next/navigation";
import { Loading } from "../common";
import { useScrollToTop } from "@/utils/useScrollToTop";
import { ProductImage } from "../product/ProductImage";
import { ProductDetails } from "../product/ProductDetails";
import { ProductActions } from "../product/ProductActions";

export const Product = () => {
  useScrollToTop();
  const { documentId } = useParams();

  // Fetch product data using React Query
  const {
    data: product,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["product", documentId],
    queryFn: () => fetchProduct(documentId as string),
    enabled: !!documentId,
  });

  // Handle loading state
  if (isLoading) return <Loading />;

  // Handle errors
  if (error || !product) throw new Error("Product data not found");

  // Main layout for product
  return (
    <div className="grid grid-cols-12 xl:gap-x-24 lg:gap-x-14 md:gap-x-10 gap-y-12 container mx-auto">
      <ProductImage product={product} />
      <ProductDetails product={product}>
        <ProductActions product={product} />
      </ProductDetails>
    </div>
  );
};
