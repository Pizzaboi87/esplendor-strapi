import { footerNavItems, inclusions } from "@/constants";
import Image from "next/image";
import Link from "next/link";

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
      <div className="container mx-auto normal py-10 flex sm:flex-row flex-col justify-between sm:items-center items-start gap-y-10">
        <div className="">
          <Link href="/">
            <Image src="/logo-white.png" alt="logo" width={240} height={50} />
          </Link>
          <p className="text-primary mt-3 text-[0.8rem] sm:text-base">
            ⓒ 2024 Esplend'or - All rights reserved.
          </p>
        </div>

        <div className="px-2 flex sm:gap-x-24 gap-x-10 items-center justify-between">
          {footerNavItems.map((item) => (
            <Link key={item.label} href={item.url} className={""}>
              <Image
                src={item.icon}
                alt={item.label}
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
