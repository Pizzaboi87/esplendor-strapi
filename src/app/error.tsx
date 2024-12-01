"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/common";
import { useScrollToTop } from "@/utils/useScrollToTop";

const Error = ({ error, reset }: { error: Error; reset: () => void }) => {
  useScrollToTop();

  return (
    <section className="container mx-auto flex flex-col lg:grid grid-cols-12 md:px-12 px-2 lg:pt-40 md:pt-24 pt-12 md:pb-60 pb-24">
      <div className="col-span-6 h-full flex items-center">
        <Image
          src="/assets/images/error.webp"
          alt="404"
          width={500}
          height={500}
          priority
          className="lg:w-full md:w-3/4 sm:w-3/5 w-full mx-auto mb-12 md:mb-0 h-auto col-span-5"
        />
      </div>
      <div className="col-span-6 flex flex-col items-center justify-between h-3/4 md:pt-5 gap-y-5">
        <h1 className="lg:text-4xl font-bold text-center xs:text-[2.625rem] text-[2rem]">
          Unexpected Error
        </h1>
        <h3 className="text-center text-[1.25rem] lg:text-[1.4rem]">
          Something went wrong
        </h3>
        <p className="sm:text-[1.1rem] text-[0.9rem] leading-tighter tracking-wide text-center">
          We can&apos;t seem to process your request.{" "}
          <br className="hidden sm:block" />
          Unfortunately the following error occurred:{" "}
          <br className="hidden sm:block" />
          {error.message}
        </p>
        <div className="flex mt-5 gap-x-5">
          <Link href="/">
            <Button type="button">Return Home</Button>
          </Link>
          <Button type="button" onClick={reset}>
            Try It Again
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Error;
