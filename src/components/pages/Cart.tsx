"use client";

import { useRouter } from "next/navigation";
import { CartList } from "../cart/CartList";
import { CartSummary } from "../cart/CartSummary";
import { useFilter } from "@/providers/Filters";
import { Banner } from "../common";
import { CartAddress } from "../cart/CartAddress";
import { useCart } from "@/providers/Cart";
import { useUser } from "@/providers/User";
import { User } from "@/types/types";
import { addressFields } from "@/constants";
import { useScrollToTop } from "@/utils/useScrollToTop";

export const Cart = () => {
  useScrollToTop();
  const router = useRouter();
  const { cart } = useCart();
  const { user } = useUser();
  const { resetFilters } = useFilter();

  // Reset filters and navigate to the shop page
  const shopAndReset = () => {
    resetFilters();
    router.push("/shop");
  };

  // Check if any address field is empty
  const isSomeFieldEmpty =
    user && addressFields.some((field) => !(user as User)[field]);

  return (
    <div className="grid grid-cols-12">
      {cart.length ? (
        <div className="col-span-12 flex flex-col xl:grid grid-cols-12 gap-y-10 md:gap-x-10 mb-14 h-full relative">
          <CartList />
          <div
            className={`${
              cart.length > 3 ? "xl:mb-12 xl:sticky top-5" : "xl:mb-24"
            } col-span-4 flex flex-col gap-y-10 h-fit`}
          >
            <CartAddress {...{ isSomeFieldEmpty }} />
            <CartSummary {...{ isSomeFieldEmpty }} />
          </div>
        </div>
      ) : (
        <div className="col-span-12 flex items-center justify-center h-80">
          <p className="text-2xl">Your cart is empty.</p>
        </div>
      )}
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
