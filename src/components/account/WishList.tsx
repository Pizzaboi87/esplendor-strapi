"use client";

import { useScrollToTop } from "@/utils/useScrollToTop";
import { BannerSmall, ProductCard } from "../common";
import { useUser } from "@/providers/User";
import { useFilter } from "@/providers/Filters";
import { useRouter } from "next/navigation";

export const WishList = () => {
  useScrollToTop();

  const router = useRouter();
  const { resetFilters } = useFilter();
  const { wishList } = useUser();

  // Shop now button handler
  const handleShopNow = () => {
    resetFilters();
    router.push("/shop");
  };

  return (
    <div className="2xl:col-span-9 lg:col-span-8 col-span-12 p-5">
      <h5 className="mb-5">Your Wishlist</h5>
      {wishList.length ? (
        <div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-10">
          {wishList.map((product) => (
            <ProductCard key={product.documentId} product={product} />
          ))}
        </div>
      ) : (
        <BannerSmall
          title="Empty Wishlist"
          message="Your wishlist is currently empty - start adding your favorite products to make it truly yours!"
          buttonText="Shop Now"
          buttonAction={handleShopNow}
          imageUrl="/assets/images/wish.webp"
          imageAlt="Empty Wishlist"
          isReversed={false}
        />
      )}
    </div>
  );
};
