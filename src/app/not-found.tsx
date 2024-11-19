import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/common";
import { Metadata } from "next";

const NotFound = () => (
  <section className="container mx-auto flex flex-col lg:grid grid-cols-12 md:px-12 px-2 lg:pt-40 md:pt-24 pt-12 md:pb-60 pb-24">
    <div className="col-span-6 h-full flex items-center">
      <Image
        src="/assets/images/404.webp"
        alt="404"
        width={500}
        height={500}
        className="lg:w-full md:w-3/4 sm:w-3/5 w-full mx-auto mb-12 md:mb-0 h-auto col-span-5"
      />
    </div>
    <div className="col-span-6 flex flex-col items-center justify-between h-3/4 md:pt-5 gap-y-5">
      <h1 className="lg:text-6xl font-bold text-center">Error 404</h1>
      <h3 className="text-center text-[1.25rem] lg:text-[1.4rem]">
        Something is missing
      </h3>
      <p className="sm:text-[1.1rem] text-[0.9rem] leading-tighter tracking-wide text-center">
        We can't seem to find the page you're looking for.{" "}
        <br className="hidden sm:block" />
        Please check the URL or return to the home page.{" "}
        <br className="hidden sm:block" />
        If you think something is broken, please contact us.
      </p>
      <Link href="/" className="mt-5">
        <Button type="button">Return Home</Button>
      </Link>
    </div>
  </section>
);

export default NotFound;

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "Error 404: Page Not Found",
};
