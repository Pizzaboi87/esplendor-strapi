"use client";

import Image from "next/image";
import { useState, useEffect, Fragment } from "react";
import { fetchProduct } from "@/utils/globalApi";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useFilter } from "@/providers/Filters";
import { formatNumber } from "@/utils/helpers";
import { useCart } from "@/providers/Cart";
import { CartButton } from "../cart/CartButton";
import { Loading } from "../common";
import "animate.css";

export const Product = () => {
  const navigation = useRouter();
  const { addToCart, cart, updateQuantity } = useCart();
  const { documentId } = useParams();
  const {
    setCategoryFilters,
    setColorFilters,
    setPrice,
    setSort,
    setStockStatus,
  } = useFilter();

  const [isZoomed, setIsZoomed] = useState(false);
  const [preloadedImage, setPreloadedImage] = useState<string | null>(null);

  // Zoom toggle handler
  const handleZoomToggle = () => {
    setIsZoomed(!isZoomed);
  };

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

  // Preload zoomed image
  useEffect(() => {
    if (product?.image?.formats?.medium?.url) {
      const img = new window.Image();
      img.src = product.image.formats.medium.url;
      img.onload = () => setPreloadedImage(product.image.formats.medium.url);
    }
  }, [product]);

  // Reset filters
  const resetFilters = () => {
    setCategoryFilters([]);
    setSort("updatedAt:desc");
    setPrice("price:asc");
    setStockStatus("all");
  };

  // Event handlers
  const handleFilterSelect = (type: "category" | "color", value: string) => {
    if (type === "category") {
      setCategoryFilters([value]);
      resetFilters();
    } else {
      setColorFilters([value]);
      resetFilters();
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

  // Error handling
  if (error) {
    return (
      <p className="text-red-500">Error loading product: {error.message}</p>
    );
  }

  // No product found
  if (!product) {
    return <p className="text-gray-500">No product found.</p>;
  }

  // Check if product is in cart
  const productInCart = cart.find((item) => item.id === product?.documentId);

  return (
    <div className="grid grid-cols-12 lg:gap-x-24 md:gap-x-10 gap-y-12 container mx-auto">
      {/* Product Image */}
      <div
        className="lg:col-span-6 col-span-12 xl:aspect-auto lg:aspect-square aspect-auto xl:min-h-[30rem] flex items-center justify-center bg-white rounded-tl-[1rem] rounded-br-[1rem] shadow-md cursor-zoom-in"
        onClick={handleZoomToggle}
      >
        {product.image?.formats?.small?.url ? (
          <Image
            src={product.image.formats.small.url}
            alt={product.image.name || "Product Image"}
            width={300}
            height={300}
            priority
            className="w-auto lg:h-[80%] object-contain"
          />
        ) : (
          <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
            No Image Available
          </div>
        )}
      </div>

      {/* Zoom Modal */}
      {isZoomed && preloadedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={handleZoomToggle}
        >
          <Image
            src={preloadedImage}
            alt={product.image.name || "Zoomed Product Image"}
            width={800}
            height={800}
            priority
            className="object-contain rounded-tl-[2rem] rounded-br-[2rem] animate__animated animate__zoomIn"
          />
          <Image
            src="/assets/icons/close.svg"
            alt="close"
            width={36}
            height={36}
            className="absolute top-5 right-5 cursor-pointer"
            onClick={handleZoomToggle}
          />
        </div>
      )}

      {/* Product Details */}
      <div className="lg:col-span-6 col-span-12 flex flex-col">
        <h1 className="block sm:hidden lg:block xl:hidden text-3xl font-bold leading-relaxed">
          {product.name.split("-").map((part: string, index: number) => (
            <Fragment key={index}>
              {part}
              {index < product.name.split("-").length - 1 && <br />}
            </Fragment>
          ))}
        </h1>
        <h1 className="hidden sm:block lg:hidden xl:block text-3xl font-bold">
          {product.name}
        </h1>

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
          Price: €{formatNumber(product.price)}
        </p>

        {/* Description */}
        <p className="text-lg mt-12 leading-10 tracking-tighter">
          {product.description}
        </p>

        {/* Add to Cart */}
        <CartButton
          quantity={productInCart ? productInCart.quantity : 0}
          onAdd={() =>
            addToCart({
              id: product.documentId,
              name: product.name,
              price: product.price,
              quantity: 1,
              image: product.image.formats.small.url,
            })
          }
          onRemove={() =>
            productInCart && productInCart?.quantity > 1
              ? updateQuantity(product.documentId, productInCart.quantity - 1)
              : updateQuantity(product.documentId, 0)
          }
          className="mt-12"
          disabled={!product.isInStock}
        />
      </div>
    </div>
  );
};
