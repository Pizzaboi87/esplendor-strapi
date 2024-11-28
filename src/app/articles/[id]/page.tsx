import Article from "@/components/pages/Article";
import { mergeOpenGraph } from "@/utils/mergeMetaData";

const ArticlePage = () => (
  <section>
    <Article />
  </section>
);

export const metadata = {
  title: "Article Page",
  description: "Article page for Esplendor Rings.",
  openGraph: mergeOpenGraph({
    title: "Esplendor Rings Article",
    url: "/articles/[id]",
  }),
};

export default ArticlePage;
