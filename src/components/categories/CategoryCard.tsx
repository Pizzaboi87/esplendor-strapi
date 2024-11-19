"use client";

import Image from "next/image";
import { CategoryCard as CategoryCardType } from "@/types/types";
import { useRouter } from "next/navigation";
import { useFilter } from "@/providers/Filters";

type CategoryCardProps = {
  category: CategoryCardType;
};

export const CategoryCard = ({ category }: CategoryCardProps) => {
  const { setCategoryFilters, setColorFilters, setSort } = useFilter();
  const navigation = useRouter();

  // Handle category selection
  const handleSelect = (categoryId: string) => {
    setSort("updatedAt:desc");
    setColorFilters([]);
    setCategoryFilters([categoryId]);
    navigation.push("/shop");
  };

  return (
    <div
      className="group relative min-h-[22.5rem] w-full flex items-end justify-center pb-5 sm:px-5 px-2 cursor-pointer overflow-hidden rounded-xl text-decoration-none"
      onClick={() => handleSelect(category.name)}
    >
      <Image
        src={category.icon.formats.small.url}
        alt={category.name}
        width={300}
        height={300}
        priority
        className="object-cover absolute top-0 left-0 w-full h-full transition-transform duration-700 ease-in-out group-hover:scale-125"
      />

      <p className="relative py-5 tracking-wide w-full text-center bg-white group-hover:bg-white/80 rounded-xl">
        {category.name}
      </p>
    </div>
  );
};
