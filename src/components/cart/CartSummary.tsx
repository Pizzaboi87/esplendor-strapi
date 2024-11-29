"use client";

import Link from "next/link";
import { useCart } from "@/providers/Cart";
import { Button, CheckoutButton, SummarySheet } from "../common";
import { useUser } from "@/providers/User";
import { useRank } from "@/providers/Rank";

interface CartSummaryProps {
  isSomeFieldEmpty: boolean | null;
}

export const CartSummary = ({ isSomeFieldEmpty }: CartSummaryProps) => {
  const { user } = useUser();
  const { cart, total, activeCoupon } = useCart();
  const { discount } = useRank();

  // Calculate the reduced amount based on the coupon or discount
  const couponAmount = (activeCoupon.value as number) * total;
  const discountAmount = couponAmount ? 0 : discount * total;

  return (
    <>
      {cart.length ? (
        <div className="flex flex-col h-fit">
          <SummarySheet {...{ total, discountAmount, couponAmount }} />
          {user && !isSomeFieldEmpty ? (
            <CheckoutButton
              reducedAmount={couponAmount ? couponAmount : discountAmount}
            />
          ) : user ? null : (
            <Link
              href="/sign-in"
              className="xl:w-full md:w-1/2 w-full md:self-end"
            >
              <Button
                type="button"
                className="xl:mt-4 mt-10 xl:w-[97.5%] w-full xl:mx-auto"
              >
                Sign in to Checkout
              </Button>
            </Link>
          )}
        </div>
      ) : null}
    </>
  );
};
