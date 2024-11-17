"use client";

import Image from "next/image";
import { Button } from "../common";
import { useRouter } from "next/navigation";
import { useFilter } from "@/providers/Filters";

export const BackToShopping = () => {
  const router = useRouter();
  const { resetFilters } = useFilter();

  const shopAndReset = () => {
    resetFilters();
    router.push("/shop");
  };

  return (
    <div className="col-span-12 grid grid-cols-12 items-center bg-white rounded-tl-2xl rounded-br-2xl shadow-lg mb-28">
      <Image
        src="/assets/images/continue.webp"
        alt="Continue Shopping"
        width={400}
        height={400}
        className="xl:col-span-3 sm:col-span-5 col-span-12 w-full h-auto aspect-square rounded-tl-2xl"
      />
      <div className="xl:col-span-9 sm:col-span-7 col-span-12 flex flex-col lg:py-10 py-8 xl:px-40 md:px-12 px-4 items-center">
        <h2 className="mb-5 text-center xl:text-[3rem] lg:text-[2rem] sm:text-[1.5rem] text-[1.25rem]">
          Continue Shopping
        </h2>
        <p className="xl:text-[1.25rem] lg:text-[1rem] text-[0.9rem] text-center leading-loose tracking-wide mb-10">
          Continue to explore our unique collection of rings and find the
          perfect one for you.
        </p>
        <Button
          type="button"
          onClick={shopAndReset}
          className="w-full md:w-auto"
        >
          Back to Shopping
        </Button>
      </div>
    </div>
  );
};
