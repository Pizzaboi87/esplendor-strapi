import { Categories } from "@/components/categories/Categories";
import { HomeHero } from "@/components/hero/HomeHero";
import { Promotion } from "@/components/promotion/Promotion";

const Home = () => (
  <section>
    <HomeHero />
    <Categories />
    <Promotion />
  </section>
);

export const metadata = {
  title: "Espelendor Rings - Home",
  description:
    "Find the perfect ring for your special day with Esplendor Rings.",
  openGraph: {
    title: "Esplendor Rings Home",
    url: "/",
  },
};

export default Home;
