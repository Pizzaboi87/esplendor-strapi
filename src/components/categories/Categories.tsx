"use client";

import { CategoryCard } from "./CategoryCard";
import { useQuery } from "@tanstack/react-query";
import { fetchCategoryCards } from "@/utils/globalApi";
import { useRouter } from "next/navigation";
import { useFilter } from "@/providers/Filters";

export const Categories = () => {
  const { resetFilters } = useFilter();
  const navigation = useRouter();

  // Fetch categories from the API
  const {
    data: categories,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategoryCards,
  });

  // Handle view all categories
  const handleViewAll = () => {
    resetFilters();
    navigation.push("/shop");
  };

  return (
    <section className="container mx-auto mt-24">
      <div className="flex flex-col sm:flex-row gap-y-5 justify-between mb-12">
        <h2 className="md:text-[2rem] md:leading-[2.5rem] text-[1.625rem] leading-[2rem]">
          Shop by Categories
        </h2>
        <p
          onClick={() => handleViewAll()}
          className="text-black hover:underline underline-offset-8 cursor-pointer"
        >
          View All
        </p>
      </div>

      <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-7">
        {isLoading ? (
          [...Array(6)].map((_, index) => (
            <div
              key={index}
              className="animate-pulseStrong bg-gray-200 h-[22.5rem] w-full rounded-md"
            />
          ))
        ) : error ? (
          <p className="text-red-500">
            {error.message || "An error occurred while fetching categories."}
          </p>
        ) : (categories ?? []).length > 0 ? (
          (categories ?? [])
            .sort((a, b) => (a.name || "").localeCompare(b.name || ""))
            .map((category) => (
              <CategoryCard key={category.documentId} category={category} />
            ))
        ) : (
          <p>No categories found</p>
        )}
      </div>
    </section>
  );
};
