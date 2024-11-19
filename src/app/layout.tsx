import type { Metadata } from "next";
import { Aboreto, Work_Sans, Bonheur_Royale } from "next/font/google";
import { Header } from "@/components/header/Header";
import { Footer } from "@/components/footer/Footer";
import { Providers } from "@/providers";
import "../styles/globals.css";

const aboreto = Aboreto({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-aboreto",
});

const work = Work_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  variable: "--font-work",
});

const bonheur_royale = Bonheur_Royale({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-bonheur-royale",
});

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body
        className={`${aboreto.variable} ${work.variable} ${bonheur_royale.variable}`}
      >
        <Providers>
          <main>
            <Header />
            {children}
            <Footer />
          </main>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;

export const metadata: Metadata = {
  title: "Esplendor Rings",
  description: "Esplend'or Rings - Where forever begins",
  creator: "Peter Weiser",
};
