"use client";

import { useUser } from "@/providers/User";
import { Button, Input } from "../common";
import { useForm } from "react-hook-form";
import { SwalMessage, SwalMessageMulti } from "../common/SwalMessage";
import { useQuery } from "@tanstack/react-query";
import { checkCoupon } from "@/utils/globalApi";
import { useState, useEffect } from "react";
import { useCart } from "@/providers/Cart";
import { useRank } from "@/providers/Rank";

export const CouponInput = () => {
  const { user, jwt } = useUser();
  const { discount } = useRank();
  const { setActiveCoupon, activeCoupon } = useCart();
  const [coupon, setCoupon] = useState<string | null>(null);

  // Form validation
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      coupon: "",
    },
  });

  // Check coupon code with the server
  const {
    data: couponCode,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["coupon", coupon],
    queryFn: () => checkCoupon(coupon as string, jwt as string),
    enabled: !!coupon,
  });

  // Handle SwalMessage display
  useEffect(() => {
    // Display SwalMessage when coupon code is valid
    if (!isLoading && typeof couponCode === "object") {
      if (activeCoupon.value) {
        SwalMessageMulti({
          title: "Select Your Discount",
          message: `
            <p class="mb-2">Please select one of the following discounts:</p>
            <p>Old Coupon Discount: <strong>${
              activeCoupon.value * 100
            }%</strong></p>
            <p>New Coupon Discount: <strong>${
              couponCode.value * 100
            }%</strong></p>
        `,
          confirmText: "Use New Coupon",
          denyText: "Use Old Coupon",
        }).then((result) => {
          if (result.isConfirmed) {
            // User chose to use the coupon
            setActiveCoupon(couponCode);
          } else if (result.isDenied) {
            return;
          }
        });
        setCoupon(null);
        setValue("coupon", "");
      } else if (discount) {
        SwalMessageMulti({
          title: "Select Your Discount",
          message: `
            <p class="mb-2">Please select one of the following discounts:</p>
            <p>Golden Loyalty Discount: <strong>${discount * 100}%</strong></p>
            <p>New Coupon Discount: <strong>${
              couponCode.value * 100
            }%</strong></p>
        `,
          confirmText: "Use Coupon",
          denyText: "Use Loyalty",
        }).then((result) => {
          if (result.isConfirmed) {
            // User chose to use the coupon
            setActiveCoupon(couponCode);
          } else if (result.isDenied) {
            // User chose to use loyalty discount
            setActiveCoupon({
              code: "",
              value: 0,
              stripeID: "",
              isActive: false,
              documentId: "",
            });
          }
        });
        setCoupon(null);
        setValue("coupon", "");
      } else {
        SwalMessage({
          title: "Coupon Applied",
          message: `The coupon code has a discount of ${
            couponCode.value * 100
          }%.`,
        }).then(() => setActiveCoupon(couponCode));
        setCoupon(null);
        setValue("coupon", "");
      }
      // Display SwalMessage when coupon code is invalid
    } else if (!isLoading && typeof couponCode === "string") {
      SwalMessage({
        title: "Invalid Coupon",
        message: "The coupon code you entered is not valid.",
      });
      setCoupon(null);
      setValue("coupon", "");
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, couponCode, error]);

  // Handle form submission and coupon code check
  const onSubmit = (data: { coupon: string }) => {
    if (user?.used_coupons?.some((coupon) => coupon.code === data.coupon)) {
      SwalMessage({
        title: "Used Coupon",
        message: "You have already used this coupon code.",
      });
    } else {
      setCoupon(data.coupon);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex items-end justify-between gap-x-3 xl:w-full sm:w-1/2 w-full"
    >
      <Input
        id="coupon"
        label=""
        type="text"
        isRequired={false}
        isUpper={true}
        register={register("coupon", {
          required: false,
        })}
        placeholder="Coupon Code"
        error={errors.coupon}
        className="w-full"
      />
      <Button
        type="submit"
        className="mb-[0.05rem]"
        isLoading={isLoading}
        disabled={isLoading}
        isShort={true}
      >
        Apply
      </Button>
    </form>
  );
};
