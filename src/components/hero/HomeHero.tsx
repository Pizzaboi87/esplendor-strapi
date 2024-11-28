"use client";

import Image from "next/image";
import Link from "next/link";
import { useScrollToTop } from "@/utils/useScrollToTop";

export const HomeHero = () => {
  useScrollToTop();

  return (
    <div className="normal container mx-auto relative">
      <Image
        src="/assets/hero.webp"
        alt="hero"
        width={1920}
        height={1080}
        priority
        className="md:rounded-tl-[2rem] md:rounded-br-[2rem] sm:min-h-0 min-h-[20rem] object-cover"
      />
      <div className="absolute lg:top-1/2 sm:top-1/3 top-1/2 transform xl:translate-x-24 md:translate-x-16 sm:translate-x-10 xs:translate-x-6 translate-x-4 lg:-translate-y-1/2">
        <h1 className="xl:text-[4.5rem] lg:text-[3.5rem] sm:text-[2.5rem] xs:text-[2rem] text-[1.5rem] font-bold">
          Esplend&apos;or
        </h1>
        <p className="font-bonheur_royale xl:text-[3.25rem] lg:text-[2.75rem] sm:text-[1.75rem] text-[2rem] font-thin xl:mb-20 lg:mb-16 md:mb-10 mb-5 xl:mt-5 lg:mt-3 md:-mt-4 sm:mt-0 mt-2">
          Where forever begins
        </p>

        <Link
          href="/shop"
          className="lg:text-[1.5rem] text-base tracking-widest font-[300] text-work uppercase text-white"
        >
          <button className="px-4 lg:py-4 py-[0.625rem] uppercase rounded-md bg-black hover:bg-black/75">
            Shop now
          </button>
        </Link>
      </div>
    </div>
  );
};
