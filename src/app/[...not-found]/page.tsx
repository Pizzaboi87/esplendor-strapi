import { NotFound } from "@/components/pages/NotFound";
import { mergeOpenGraph } from "@/utils/mergeMetaData";

const NotFoundPage = () => <NotFound />;

export const metadata = {
  title: "Page Not Found",
  description: "Missing page error 404.",
  openGraph: mergeOpenGraph({
    title: "Page Not Found",
    url: "/404",
  }),
};

export default NotFoundPage;
