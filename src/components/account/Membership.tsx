"use client";

import { useRank } from "@/providers/Rank";
import { RankCard } from "./RankCard";
import { useQuery } from "@tanstack/react-query";
import { fetchPurchasedProducts } from "@/utils/globalApi";
import { Loading } from "../common";
import { useScrollToTop } from "@/utils/useScrollToTop";

export const Membership = () => {
  useScrollToTop();
  const { items } = useRank();

  // Fetching the purchased products
  const { data, isLoading } = useQuery({
    queryKey: ["user-items", Object.keys(items)],
    queryFn: () => fetchPurchasedProducts(Object.keys(items)),
    enabled: !!Object.keys(items).length,
  });

  // Collecting the images and IDs
  const images = [];
  if (data) {
    for (const [documentId, count] of Object.entries(items)) {
      const product = data.find((item) => item.documentId === documentId);
      if (product) {
        const imageUrl = product.image.formats.small.url;
        for (let i = 0; i < count; i++) {
          images.push({ imageID: documentId, imageURL: imageUrl });
        }
      }
    }
  }

  // At least 9 cards are needed
  while (images.length < 9) {
    images.push({ imageID: null, imageURL: null });
  }

  return (
    <div className="h-full 2xl:col-span-9 lg:col-span-8 col-span-12 md:p-5">
      {isLoading ? (
        <div className="pb-24 h-full 2xl:col-span-9 lg:col-span-8 col-span-12 xs:p-5">
          <Loading />
        </div>
      ) : (
        <>
          <h5 className="mb-5">Golden Loyalty - Membership Program</h5>
          <div className="grid grid-cols-12 gap-5">
            {images.slice(0, 9).map(({ imageID, imageURL }, index) => (
              <RankCard
                key={index}
                index={index}
                imageID={imageID || undefined}
                imageURL={imageURL || undefined}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
