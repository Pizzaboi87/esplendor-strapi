import type { Metadata } from "next";
import { Aboreto, Work_Sans, Bonheur_Royale } from "next/font/google";
import "../styles/globals.css";
import { Header } from "@/components/header/Header";
import { Footer } from "@/components/footer/Footer";

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
        <main>
          <Header />
          {children}
          <Footer />
        </main>
      </body>
    </html>
  );
};

export default RootLayout;

export const metadata: Metadata = {
  title: "Esplend'or Rings",
  description: "Esplend'or Rings - Where forever begins",
};
