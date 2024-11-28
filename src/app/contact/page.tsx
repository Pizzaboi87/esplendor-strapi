import { Contact } from "@/components/pages/Contact";
import { mergeOpenGraph } from "@/utils/mergeMetaData";

const ContactPage = () => (
  <section className="container mx-auto pb-12">
    <Contact />
  </section>
);

export const metadata = {
  title: "Contact Us",
  description:
    "Need assistance or have questions? Our dedicated 24/7 customer service team is always here to provide you with seamless support. Reach out to us anytime - we're just a message away!",
  openGraph: mergeOpenGraph({
    title: "Esplendor Rings Contact",
    url: "/contact",
  }),
};

export default ContactPage;
