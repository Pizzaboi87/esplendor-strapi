import { Categories } from "@/components/categories/Categories";
import { HomeHero } from "@/components/hero/HomeHero";
import { Promotion } from "@/components/promotion/Promotion";
import { mergeOpenGraph } from "@/utils/mergeMetaData";

const Home = () => (
  <section>
    <HomeHero />
    <Categories />
    <Promotion />
  </section>
);

export const metadata = {
  title: "Espelendor Rings",
  description:
    "Find the perfect ring for your special day with Esplendor Rings.",
  openGraph: mergeOpenGraph({
    title: "Esplendor Rings",
    url: "/",
  }),
};

export default Home;
