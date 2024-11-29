"use client";

import getStripe from "@/utils/get-stripe";
import { useCart } from "@/providers/Cart";
import { useState } from "react";
import { Button } from "./Button";
import { useUser } from "@/providers/User";
import { useRank } from "@/providers/Rank";

interface CheckoutButtonProps {
  reducedAmount: number;
}

export const CheckoutButton = ({ reducedAmount }: CheckoutButtonProps) => {
  const { cart, activeCoupon } = useCart();
  const { user, jwt } = useUser();
  const { stripeID } = useRank();
  const [loading, setLoading] = useState<boolean>(false);

  // Handle function for the checkout button
  const handleClick = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/checkout-sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: cart,
          address: user?.address,
          city: user?.city,
          country: user?.country,
          zipCode: user?.zipCode,
          userId: user?.id,
          firstName: user?.firstName,
          lastName: user?.lastName,
          jwt: jwt,
          coupon: activeCoupon?.stripeID || null,
          couponId: activeCoupon?.documentId || null,
          discount: activeCoupon?.stripeID ? null : stripeID || null,
          reducedAmount,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create checkout session");
      }

      const { stripeSessionId } = await response.json();
      const stripe = await getStripe();
      await stripe?.redirectToCheckout({ sessionId: stripeSessionId });
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      type="button"
      onClick={handleClick}
      disabled={loading}
      isLoading={loading}
      className="xl:mt-4 mt-10 xl:w-[97.5%] md:w-1/2 w-full xl:mx-auto"
    >
      Proceed to Checkout
    </Button>
  );
};
