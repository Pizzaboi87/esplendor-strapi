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
  const { cart, total } = useCart();
  const { discount, rank } = useRank();

  return (
    <>
      {cart.length ? (
        <div className="flex flex-col h-fit">
          <SummarySheet {...{ discount, rank, total }} />
          {user && !isSomeFieldEmpty ? (
            <CheckoutButton />
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
