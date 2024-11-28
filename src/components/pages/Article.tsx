"use client";

import Image from "next/image";
import { fetchArticle } from "@/utils/globalApi";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Loading } from "../common";
import { useScrollToTop } from "@/utils/useScrollToTop";
import "animate.css";

const Article = () => {
  useScrollToTop();
  const { id } = useParams();
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  // Fetch article data
  const {
    data: article,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["article", id],
    queryFn: () => fetchArticle(id as string),
    enabled: !!id,
  });

  // Zoom toggle handler
  const handleZoomToggle = (imageUrl?: string) => {
    setZoomedImage(imageUrl || null);
    setIsZoomed(!isZoomed);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="inset-0 h-screen w-screen flex items-center justify-center -mt-36">
        <Loading />
      </div>
    );
  }

  // Error state
  if (isError || !article) {
    return <div>Error loading article. Please try again later.</div>;
  }

  // Destructure article data
  const { title, author, updatedAt, content, excerpt, images } = article;

  // Render content with inline images
  const renderContentWithImages = () => {
    const mergedContent: any[] = [];
    let imageCounter = 0;

    content.forEach((block, index) => {
      mergedContent.push(block);

      // Add image after every 4th block
      if ((index + 1) % 4 === 0 && imageCounter < images.length) {
        mergedContent.push({
          type: "image",
          url: images[imageCounter].formats?.medium?.url || null,
        });
        imageCounter++;
      }
    });

    // Render blocks
    return mergedContent.map((block, index) => {
      if (block.type === "image" && block.url) {
        return (
          <div
            key={`image-${index}`}
            className={`my-5 mx-auto w-full sm:w-1/2 lg:w-1/3 ${
              index % 2 === 0 ? "float-right ml-10" : "float-left mr-10"
            } cursor-zoom-in`}
            onClick={() => handleZoomToggle(block.url)}
          >
            <Image
              src={block.url}
              alt={`Article Image ${index}`}
              width={400}
              height={400}
              className="rounded-lg shadow-lg object-cover"
            />
          </div>
        );
      }

      // Render text blocks
      switch (block.type) {
        case "heading":
          return (
            <h2
              key={`heading-${index}`}
              className={`text-${
                block.level === 1 ? "3xl" : "2xl"
              } font-bold mt-10 mb-2`}
            >
              {block.children.map((child: any) => child.text).join("")}
            </h2>
          );
        case "paragraph":
          return (
            <p
              key={`paragraph-${index}`}
              className="text-lg leading-relaxed mb-4"
            >
              {block.children.map((child: any, childIndex: number) =>
                child.bold ? (
                  <strong key={childIndex}>{child.text}</strong>
                ) : (
                  child.text
                )
              )}
            </p>
          );
        case "list":
          return (
            <ul
              key={`list-${index}`}
              className={`list-${
                block.format === "unordered" ? "disc" : "decimal"
              } list-inside mb-4 text-lg`}
            >
              {block.children.map((listItem: any, listItemIndex: number) => (
                <li key={listItemIndex}>{listItem.children[0].text}</li>
              ))}
            </ul>
          );
        default:
          return null;
      }
    });
  };

  return (
    <div className="container mx-auto px-4 pt-8 pb-24 bg-white rounded-lg shadow-lg">
      {/* Title and Metadata */}
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        <p className="text-sm text-gray-600">
          By <span className="font-semibold">{author}</span> |{" "}
          {new Date(updatedAt).toLocaleDateString()}
        </p>
      </header>

      {/* Excerpt */}
      <section className="mb-8">
        <p className="italic text-lg text-gray-700">{excerpt}</p>
      </section>

      {/* Content with inline images */}
      <article className="clearfix">{renderContentWithImages()}</article>

      {/* Zoom Modal */}
      {isZoomed && zoomedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => handleZoomToggle()}
        >
          <Image
            src={zoomedImage}
            alt="Zoomed Image"
            width={800}
            height={800}
            className="object-contain rounded-lg animate__animated animate__zoomIn"
          />
          <Image
            src="/assets/icons/close.svg"
            alt="Close"
            width={36}
            height={36}
            priority
            className="absolute top-5 right-5 cursor-pointer"
            onClick={() => handleZoomToggle()}
          />
        </div>
      )}
    </div>
  );
};

export default Article;
