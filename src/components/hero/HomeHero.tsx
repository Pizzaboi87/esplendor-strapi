import Image from "next/image";
import Link from "next/link";

export const HomeHero = () => (
  <div className="normal container mx-auto relative">
    <Image
      src="/assets/hero.webp"
      alt="hero"
      width={1920}
      height={1080}
      priority
      className="md:rounded-tl-[2rem] md:rounded-br-[2rem] sm:min-h-0 min-h-[20rem] object-cover"
    />
    <div className="absolute top-1/2 transform md:translate-x-24 xs:translate-x-10 translate-x-4 sm:-translate-y-1/2">
      <h1 className="lg:text-[4.5rem] md:text-[3rem] xs:text-[2rem] text-[1.5rem] font-bold">
        Esplend&apos;or
      </h1>
      <p className="font-bonheur_royale lg:text-[3.25rem] text-[2rem] font-thin lg:mb-20 md:mb-10 mb-5 lg:mt-5 md:-mt-2 mt-2">
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
