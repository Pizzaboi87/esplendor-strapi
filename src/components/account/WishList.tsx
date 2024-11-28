"use client";

import { useScrollToTop } from "@/utils/useScrollToTop";

export const WishList = () => {
  useScrollToTop();

  return (
    <div className="h-full 2xl:col-span-9 lg:col-span-8 col-span-12 p-5">
      <h1 className="text-3xl font-bold">Wishlist</h1>
      <p className="text-xl">Coming soon...</p>
    </div>
  );
};
