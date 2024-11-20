"use client";

import { useRouter } from "next/navigation";
import { CartList } from "../cart/CartList";
import { CartSummary } from "../cart/CartSummary";
import { useFilter } from "@/providers/Filters";
import { Banner } from "../common";

export const Cart = () => {
  const router = useRouter();
  const { resetFilters } = useFilter();

  // Reset filters and navigate to the shop page
  const shopAndReset = () => {
    resetFilters();
    router.push("/shop");
  };

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-12 flex flex-col xl:grid grid-cols-12 gap-y-10 md:gap-x-10 mb-32 h-fit relative">
        <CartList />
        <CartSummary />
      </div>
      <Banner
        firstOnClick={shopAndReset}
        isReverse={false}
        image="/assets/images/continue.webp"
        title="Continue Shopping"
        text="Continue to explore our unique collection of rings and find the perfect one for you."
        firstButtonText="Back to Shopping"
      />
    </div>
  );
};
