import Image from "next/image";
import Link from "next/link";
import { Button } from "../common";
import { useQuery } from "@tanstack/react-query";
import { fetchHighlightedProducts } from "@/utils/globalApi";

export const Highlight = () => {
  // Fetch highlighted products
  const { data, isLoading } = useQuery({
    queryKey: ["highlights"],
    queryFn: fetchHighlightedProducts,
  });

  // Loading state for the cards
  const renderLoadingCards = () => (
    <div className="grid md:grid-cols-3 gap-6">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="bg-gray-50 rounded-tl-xl rounded-br-xl shadow-md overflow-hidden animate-pulse"
        >
          <div className="h-48 bg-gray-100 w-full" />
          <div className="p-4">
            <div className="h-6 bg-gray-100 rounded w-3/4 mb-2" />
            <div className="h-10 bg-gray-100 rounded w-full" />
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="mb-12">
      <h5 className="font-semibold mb-4">Highlighted Products</h5>
      {isLoading ? (
        renderLoadingCards()
      ) : (
        <div className="grid xl:grid-cols-3 sm:grid-cols-2 gap-6">
          {data?.map((highlight, index) => (
            <div
              key={highlight.title}
              className={`${
                index === 2
                  ? "sm:col-span-2 xl:col-span-1 col-span-1 mx-auto xl:w-full sm:w-1/2 w-full"
                  : ""
              } bg-white rounded-tl-xl rounded-br-xl shadow-md overflow-hidden`}
            >
              <Image
                src={highlight.product.image.formats.small.url}
                alt={highlight.title}
                width={300}
                height={300}
                priority
                className="object-contain h-48 w-full"
              />
              <div className="p-4">
                <h3 className="text-lg text-center font-semibold mb-2">
                  {highlight.title}
                </h3>
                <Link href={`/products/${highlight.product.documentId}`}>
                  <Button type="button" className="w-full mt-5">
                    Learn more
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
