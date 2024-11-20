import type { Metadata } from "next";

const defaultOpenGraph: Metadata["openGraph"] = {
    type: "website",
    url: "https://esplendor-rings.vercel.app",
    title: "Esplendor Rings",
    description: "Wedding and engagement rings by Esplendor Rings",
    siteName: "Esplendor Rings",
    countryName: "Hungary",
    locale: "en_US",
    emails: ["esplendorrings@gmail.com"],
    images: [
        {
            url: "/web-image.webp",
        },
    ],
};

export const mergeOpenGraph = (
    og?: Metadata["openGraph"]
): Metadata["openGraph"] => {
    return {
        ...defaultOpenGraph,
        ...og,
        images: defaultOpenGraph.images,
    };
};
