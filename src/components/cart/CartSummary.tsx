"use client";

import { useCart } from "@/providers/Cart";
import { Button, CheckoutButton, SummarySheet } from "../common";
import { useRouter } from "next/navigation";
import { useUser } from "@/providers/User";

export const CartSummary = () => {
  const router = useRouter();
  const { user } = useUser();
  const { cart, total } = useCart();

  return (
    <>
      {cart.length ? (
        <div className="col-span-4 flex flex-col sticky top-5 h-fit">
          <SummarySheet total={total} />
          {user ? (
            <CheckoutButton />
          ) : (
            <Button
              type="button"
              className="xl:mt-4 mt-10 xl:w-[97.5%] md:w-1/2 w-full xl:mx-auto"
              onClick={() => router.push("/sign-in")}
            >
              Sign in to Checkout
            </Button>
          )}
        </div>
      ) : null}
    </>
  );
};
