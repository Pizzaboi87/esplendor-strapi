"use client";

import getStripe from "@/utils/get-stripe";
import { useCart } from "@/providers/Cart";
import { useState } from "react";
import { Button } from "./Button";

export const CheckoutButton = () => {
  const { cart } = useCart();
  const [loading, setLoading] = useState<boolean>(false);

  // Create a Checkout Session with the selected items
  const handleClick = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/checkout-sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items: cart }),
      });

      if (!response.ok) {
        throw new Error("Failed to create checkout session");
      }

      const { id } = await response.json();
      const stripe = await getStripe();
      await stripe?.redirectToCheckout({ sessionId: id });
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
