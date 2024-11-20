"use client";

import { useCart } from "@/providers/Cart";
import { formatNumber } from "@/utils/helpers";
import { Button } from "../common";
import { useRouter } from "next/navigation";
import { useUser } from "@/providers/User";

export const CartSummary = () => {
  const router = useRouter();
  const { user } = useUser();
  const { cart, total } = useCart();

  // Redirect to the checkout page
  const checkoutHandler = () => {
    user ? router.push("/checkout") : router.push(`/sign-in?redirect=/cart`);
  };

  return (
    <>
      {cart.length ? (
        <div className="col-span-4 flex flex-col sticky top-5 h-fit">
          <div className=" bg-white h-fit p-8 shadow-md rounded-tl-2xl rounded-br-2xl">
            <h2 className="text-lg font-semibold">Cart Summary</h2>

            <span className="flex justify-between mt-4">
              <p className="text-lg">Subtotal:</p>
              <p className="text-lg">€{formatNumber(total)}</p>
            </span>

            <span className="flex justify-between mt-4">
              <p className="text-lg">Delivery Charge:</p>
              <p className="text-lg">€0.00</p>
            </span>

            <hr className="border-t border-terciary my-4" />

            <span className="flex justify-between mt-2">
              <p className="text-lg font-semibold">Grand Total:</p>
              <p className="text-lg font-semibold">€{formatNumber(total)}</p>
            </span>
          </div>
          <Button
            type="button"
            className="xl:mt-4 mt-10 xl:w-[97.5%] md:w-1/2 w-full xl:mx-auto"
            onClick={checkoutHandler}
          >
            {user ? "Proceed to Checkout" : "Sign in to Checkout"}
          </Button>
        </div>
      ) : null}
    </>
  );
};
