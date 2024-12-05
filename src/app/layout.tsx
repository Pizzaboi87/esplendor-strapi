import type { Metadata } from "next";
import { Aboreto, Work_Sans, Bonheur_Royale } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
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
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
      <GoogleAnalytics gaId="G-WZP1JSHTVJ" />
    </html>
  );
};

export default RootLayout;

export const metadata: Metadata = {
  title: "Esplendor Rings",
  description: "Esplend'or Rings - Where forever begins",
  creator: "Peter Weiser",
  metadataBase: new URL("https://esplendor-rings.vercel.app"),
  openGraph: {
    type: "website",
    siteName: "Esplendor Rings",
    title: "Esplendor Rings",
    description: "Wedding and engagement rings by Esplendor Rings",
    url: "https://esplendor-rings.vercel.app",
    images: [
      {
        url: "/web-image.webp",
        width: 1200,
        height: 630,
        alt: "Esplendor Rings - Wedding and Engagement Rings",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Esplendor Rings",
    description: "Wedding and engagement rings by Esplendor Rings",
    creator: "@weiser_peter",
    images: [
      {
        url: "/web-image.webp",
        alt: "Esplendor Rings - Wedding and Engagement Rings",
      },
    ],
  },
};
