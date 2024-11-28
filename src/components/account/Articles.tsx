import Link from "next/link";
import { fetchArticles } from "@/utils/globalApi";
import { useQuery } from "@tanstack/react-query";
import { BannerSmall, Button } from "../common";
import { useWindowWidth } from "@/utils/useWindowWidth";

export const Articles = () => {
  const windowWidth = useWindowWidth();

  // Fetch articles data
  const { data, isLoading } = useQuery({
    queryKey: ["articles"],
    queryFn: () => fetchArticles(),
  });

  if (isLoading) {
    return (
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Latest Articles</h2>
        <div className="flex flex-col gap-y-8">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="w-full bg-gray-50 animate-pulse rounded-tl-2xl rounded-br-2xl shadow-md flex flex-col sm:grid grid-cols-12"
            >
              <div className="xl:col-span-9 col-span-8 flex flex-col items-center justify-center gap-y-8 xs:p-5 px-2 py-10">
                <div className="flex flex-col gap-y-3 text-center">
                  <div className="h-6 bg-gray-100 w-3/4 mx-auto rounded" />
                  <div className="h-4 bg-gray-100 w-1/2 mx-auto rounded" />
                </div>
              </div>
              <div className="xl:col-span-3 col-span-4 bg-gray-100 w-full h-48 rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">Latest Articles</h2>
      <div className="flex flex-col gap-y-8">
        {data?.map((article, index) => (
          <BannerSmall
            key={index}
            title={article.title}
            message={article.excerpt}
            imageUrl={article.coverImage?.formats.small.url || ""}
            imageAlt={article.title}
            isReversed={index % 2 === 0 || windowWidth < 640}
            buttonComponent={
              <Link href={`/articles/${article.documentId}`}>
                <Button type="button">Read Article</Button>
              </Link>
            }
          />
        ))}
      </div>
    </div>
  );
};
