"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { ProductDetails } from "@/types/types";

export const ProductImage = ({ product }: { product: ProductDetails }) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [preloadedImage, setPreloadedImage] = useState<string | null>(null);

  // Preload zoomed image
  useEffect(() => {
    if (product.image?.formats?.medium?.url) {
      const img = new window.Image();
      img.src = product.image.formats.medium.url;
      img.onload = () => setPreloadedImage(product.image.formats.medium.url);
    }
  }, [product.image?.formats?.medium?.url]);

  return (
    <>
      {/* Main product image */}
      <div
        className="lg:col-span-6 col-span-12 xl:aspect-auto lg:aspect-square aspect-auto xl:min-h-[30rem] flex items-center justify-center bg-white rounded-tl-[1rem] rounded-br-[1rem] shadow-md cursor-zoom-in"
        onClick={() => setIsZoomed(!isZoomed)}
      >
        {product.image?.formats?.small?.url ? (
          <Image
            src={product.image.formats.small.url}
            alt={product.image.name || "Product Image"}
            width={300}
            height={300}
            priority
            className="w-auto lg:h-[80%] h-auto object-contain"
          />
        ) : (
          <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
            No Image Available
          </div>
        )}
      </div>

      {/* Zoom modal */}
      {isZoomed && preloadedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setIsZoomed(false)}
        >
          <Image
            src={preloadedImage}
            alt={product.image.name || "Zoomed Product Image"}
            width={800}
            height={800}
            priority
            className="object-contain rounded-tl-[2rem] rounded-br-[2rem] animate__animated animate__zoomIn"
          />
        </div>
      )}
    </>
  );
};
