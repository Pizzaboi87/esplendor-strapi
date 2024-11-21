"use client";

import Link from "next/link";
import Image from "next/image";

import { usePathname } from "next/navigation";
import { noHeaderFooterUrls } from "@/constants";
import { HeaderNav } from "./HeaderNav";

export const Header = () => {
  const pathname = usePathname();

  return (
    <nav
      className={`
        ${
          noHeaderFooterUrls.includes(pathname) ? "hidden" : "normal"
        } flex justify-center sm:justify-between gap-y-5 items-center container mx-auto py-10 flex-wrap`}
    >
      <Link href="/">
        <Image
          src="/logo.png"
          alt="logo"
          width={240}
          height={50}
          priority
          className="sm:w-auto w-[75%] h-auto sm:mx-0 mx-auto"
        />
      </Link>

      <HeaderNav />
    </nav>
  );
};
