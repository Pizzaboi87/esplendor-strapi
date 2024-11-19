"use client";

import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";

import { fetchRelatedProducts } from "@/utils/globalApi";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { Fragment, useEffect } from "react";
import { formatNumber } from "@/utils/helpers";

export const RelatedProducts = () => {
  const { documentId } = useParams();

  // Fetch related products from the API
  const {
    data: relatedProducts = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ["relatedProducts", documentId],
    queryFn: () => fetchRelatedProducts(documentId as string),
    enabled: !!documentId,
  });

  // Embla Carousel configuration
  const [emblaRef, embla] = useEmblaCarousel({
    align: "start",
    loop: true,
    slidesToScroll: 1,
  });

  // If the related products array has more than one item, double it
  const loopedProducts =
    relatedProducts.length > 1
      ? [...relatedProducts, ...relatedProducts]
      : relatedProducts;

  // Reinitialize Embla Carousel when related products change
  useEffect(() => {
    if (embla) {
      embla.reInit();
    }
  }, [embla, relatedProducts]);

  // Render loading, error, or related products
  if (isLoading) {
    return <p className="text-center">Loading related products...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error loading products.</p>;
  }

  if (!relatedProducts.length) {
    return (
      <p className="text-center text-gray-500">No related products found.</p>
    );
  }

  return (
    <div className="w-full lg:px-12 my-24">
      <div className="w-full relative mx-auto">
        <div className="container mx-auto mb-5">
          <h4>Recommended for you</h4>
        </div>
        <button
          onClick={() => embla && embla.scrollPrev()}
          className="hidden md:block absolute left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 w-12 h-12 shadow-lg z-10"
          aria-label="Previous slide"
        >
          &#8592;
        </button>
        <div
          ref={emblaRef}
          className="overflow-hidden lg:max-w-[86%] md:max-w-[80%] mx-auto"
        >
          <div className="flex flex-[0_0_100%]">
            {loopedProducts.map((product, index) => (
              <Link
                key={`${product.documentId}-${index}`}
                href={`/products/${product.documentId}`}
                className="flex-shrink-0 w-full md:w-1/2 xl:w-1/3 px-2"
              >
                <div className="bg-white rounded-2xl shadow-md p-4 my-2 group">
                  <div className="w-full h-60 overflow-hidden flex items-center justify-center">
                    <Image
                      src={product.image.formats.small.url}
                      alt={product.name}
                      width={300}
                      height={200}
                      priority
                      className="object-contain w-auto h-full group-hover:scale-125 transition-transform duration-700 ease-in-out"
                    />
                  </div>
                  <h5 className="text-lg font-semibold mt-2">
                    {product.name
                      .split("-")
                      .map((part: string, idx: number) => (
                        <Fragment key={idx}>
                          {part}
                          {idx < product.name.split("-").length - 1 && <br />}
                        </Fragment>
                      ))}
                  </h5>
                  <p className="text-[1.2rem] mt-1">
                    €{formatNumber(product.price)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <button
          onClick={() => embla && embla.scrollNext()}
          className="hidden md:block absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 w-12 h-12 shadow-lg z-10"
          aria-label="Next slide"
        >
          &#8594;
        </button>

        <div className="md:hidden flex items-center justify-evenly mt-5">
          <button
            onClick={() => embla && embla.scrollPrev()}
            className="bg-white rounded-full p-3 w-16 h-16 shadow-lg z-10"
            aria-label="Previous slide"
          >
            &#8592;
          </button>
          <button
            onClick={() => embla && embla.scrollNext()}
            className="bg-white rounded-full p-3 w-16 h-16 shadow-lg z-10"
            aria-label="Next slide"
          >
            &#8594;
          </button>
        </div>
      </div>
    </div>
  );
};
