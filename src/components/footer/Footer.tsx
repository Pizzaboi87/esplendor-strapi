"use client";

import { usePathname } from "next/navigation";
import { noHeaderFooterUrls } from "@/constants";
import { FooterContent } from "./FooterContent";

export const Footer = () => {
  const pathname = usePathname();

  return (
    <footer className={noHeaderFooterUrls.includes(pathname) ? "hidden" : ""}>
      <FooterContent />
    </footer>
  );
};
