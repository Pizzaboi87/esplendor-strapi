import { Categories } from "@/components/categories/Categories";
import { HomeHero } from "@/components/hero/HomeHero";
import { Promotion } from "@/components/promotion/Promotion";

const Home = () => (
  <>
    <HomeHero />
    <Categories />
    <Promotion />
  </>
);

export default Home;
