"use client";

import { usePathname } from "next/navigation";
import { noHeaderFooterUrls } from "@/constants";
import { UpperFooter } from "./UpperFooter";
import { LowerFooter } from "./LowerFooter";

export const Footer = () => {
  const pathname = usePathname();

  return (
    <footer className={noHeaderFooterUrls.includes(pathname) ? "hidden" : ""}>
      <UpperFooter />
      <LowerFooter />
    </footer>
  );
};
