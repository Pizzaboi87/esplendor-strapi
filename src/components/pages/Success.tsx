"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Banner } from "../common";
import { useCart } from "@/providers/Cart";
import { useEffect } from "react";
import { useScrollToTop } from "@/utils/useScrollToTop";

export const Success = () => {
  useScrollToTop();
  const searchParams = useSearchParams();
  const session_id = searchParams.get("session_id");

  const router = useRouter();
  const { emptyCart } = useCart();

  useEffect(() => {
    if (session_id) {
      emptyCart();
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session_id]);

  return (
    <div className="pt-20">
      {session_id ? (
        <Banner
          isReverse={true}
          image="/assets/images/order.webp"
          title="Successful Purchase"
          text="Thank you for your purchase. Your order is being processed by our team and will be on its way to you soon."
          firstButtonText="Return to Home"
          firstOnClick={() => router.push("/")}
          secondButtonText="View Orders"
          secondOnClick={() => router.push("/account/orders")}
        />
      ) : (
        <Banner
          isReverse={true}
          image="/assets/images/missing.webp"
          title="Missing Order?"
          text="We couldn't find any ongoing order process or something went wrong. Please contact our support team for further assistance."
          firstButtonText="Return to Home"
          firstOnClick={() => router.push("/")}
        />
      )}
    </div>
  );
};
