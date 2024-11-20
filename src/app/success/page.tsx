import { Success } from "@/components/pages/Success";
import { mergeOpenGraph } from "@/utils/mergeMetaData";
import { Metadata } from "next";

const SuccessPage = () => (
  <section className="container mx-auto">
    <Success />
  </section>
);

export const metadata: Metadata = {
  title: "Successfull Purchase",
  description: "Successfull Purchase page of Esplendor Rings.",
  openGraph: mergeOpenGraph({
    title: "Successfull Purchase",
    url: "/success",
  }),
};

export default SuccessPage;
