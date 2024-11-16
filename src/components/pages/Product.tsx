"use client";

import Image from "next/image";
import { fetchProduct } from "@/utils/globalApi";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { Loading } from "../common/Loading";
import { Button } from "../common";
import { useFilter } from "@/providers/Filters";

export const Product = () => {
  const { documentId } = useParams();
  const navigation = useRouter();
  const { setCategoryFilters, setColorFilters } = useFilter();

  // Fetch product data
  const {
    data: product,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["product", documentId],
    queryFn: () => fetchProduct(documentId as string),
    enabled: !!documentId, // Prevent fetch if documentId is undefined
  });

  // Event handlers
  const handleFilterSelect = (type: "category" | "color", value: string) => {
    if (type === "category") {
      setCategoryFilters([value]);
      setColorFilters([]);
    } else {
      setColorFilters([value]);
      setCategoryFilters([]);
    }
    navigation.push("/shop");
  };

  // Render logic
  if (isLoading) {
    return (
      <div className="pb-24">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-red-500">Error loading product: {error.message}</p>
    );
  }

  if (!product) {
    return <p className="text-gray-500">No product found.</p>;
  }

  return (
    <div className="grid grid-cols-12 gap-24">
      {/* Product Image */}
      <div className="col-span-6 min-h-[30rem] flex items-center justify-center bg-white rounded-tl-[1rem] rounded-br-[1rem] shadow-md">
        {product.image?.formats?.small?.url ? (
          <Image
            src={product.image.formats.small.url}
            alt={product.image.name || "Product Image"}
            width={300}
            height={300}
            className="w-auto h-[80%] object-contain"
          />
        ) : (
          <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
            No Image Available
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="col-span-6 flex flex-col">
        <h1 className="text-3xl font-bold">{product.name}</h1>

        {/* Categories and Color Filters */}
        <div className="flex items-center mt-5 flex-wrap gap-2">
          {product.categories.map((category) => (
            <span
              key={category.name}
              className="text-sm bg-primary text-dark-500 px-2 py-1 rounded-md cursor-pointer"
              onClick={() => handleFilterSelect("category", category.name)}
            >
              {category.name}
            </span>
          ))}
          <span className="text-sm text-gray-500">|</span>
          <span
            className="text-sm bg-primary text-dark-500 px-2 py-1 rounded-md cursor-pointer"
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
          Price: €{product.price}
        </p>

        {/* Description */}
        <p className="text-lg mt-12 leading-10 tracking-tighter">
          {product.description}
        </p>

        {/* Add to Cart */}
        <Button
          type="button"
          disabled={false}
          isLoading={false}
          children="Add to Cart"
          className="mt-12"
        />
      </div>
    </div>
  );
};
