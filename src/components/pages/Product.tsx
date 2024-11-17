"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { fetchProduct } from "@/utils/globalApi";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { Loading } from "../common/Loading";
import { useFilter } from "@/providers/Filters";
import { formatNumber } from "@/utils/helpers";
import { useCart } from "@/providers/Cart";
import { CartButton } from "../cart/CartButton";
import "animate.css";

export const Product = () => {
  const { addToCart, cart, updateQuantity } = useCart();
  const { documentId } = useParams();
  const navigation = useRouter();
  const { setCategoryFilters, setColorFilters } = useFilter();

  const [isZoomed, setIsZoomed] = useState(false);
  const [preloadedImage, setPreloadedImage] = useState<string | null>(null);

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

  const productInCart = cart.find((item) => item.id === product?.documentId);

  return (
    <div className="grid grid-cols-12 lg:gap-x-24 md:gap-x-10 gap-y-12 container mx-auto">
      {/* Product Image */}
      <div
        className="md:col-span-6 col-span-12 xl:aspect-auto md:aspect-square aspect-auto xl:min-h-[30rem] flex items-center justify-center bg-white rounded-tl-[1rem] rounded-br-[1rem] shadow-md cursor-pointer"
        onClick={handleZoomToggle}
      >
        {product.image?.formats?.small?.url ? (
          <Image
            src={product.image.formats.small.url}
            alt={product.image.name || "Product Image"}
            width={300}
            height={300}
            priority
            className="w-auto h-[80%] object-contain"
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
      <div className="md:col-span-6 col-span-12 flex flex-col">
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
