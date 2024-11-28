import Image from "next/image";
import Link from "next/link";
import { footerNavItems, inclusions } from "@/constants";

export const FooterContent = () => (
  <>
    <div className="container mx-auto normal">
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-10 py-10 xl:px-0 px-5">
        {inclusions.map((inclusion) => (
          <li key={inclusion.title}>
            <Image
              src={inclusion.icon}
              alt={inclusion.title}
              width={50}
              height={50}
              className={"pb-5"}
            />

            <h5>{inclusion.title}</h5>
            <p>{inclusion.description}</p>
          </li>
        ))}
      </ul>
    </div>

    <div className="bg-black">
      <div className="container mx-auto normal py-10 flex md:flex-row flex-col justify-between items-center gap-y-10">
        <div className="">
          <Link href="/">
            <Image
              src="/logo-white.png"
              alt="logo"
              width={240}
              height={50}
              className="w-auto h-auto"
            />
          </Link>
          <p className="text-primary text-[0.8rem] sm:text-base pl-2 mt-5">
            ⓒ 2024 Esplend&apos;or - All rights reserved.
          </p>
          <div className="flex flex-col sm:flex-row justify-between sm:gap-x-10 md:gap-x-5 lg:gap-x-10 bg-black sm:space-y-0 space-y-2 px-2 mt-5">
            <Link href="/" className="text-primary text-[0.8rem] sm:text-base">
              Terms and Conditions
            </Link>
            <Link href="/" className="text-primary text-[0.8rem] sm:text-base">
              Privacy Policy
            </Link>
            <Link
              href="/contact"
              className="text-primary text-[0.8rem] sm:text-base"
            >
              Contact Us
            </Link>
          </div>
        </div>

        <div className="px-2 flex sm:gap-x-24 gap-x-10 items-center justify-between">
          {footerNavItems.map((item) => (
            <Link key={item.title} href={item.url} className={""}>
              <Image
                src={item.icon}
                alt={item.title}
                width={36}
                height={36}
                className="hover:scale-125 transition-all duration-300 ease-in-out"
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  </>
);
