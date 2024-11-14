"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

type CategoryCardProps = {
  category: {
    title: string;
    image: string;
  };
};

export const CategoryCard = ({ category }: CategoryCardProps) => {
  //const { setCategoryFilters } = useFilter();
  const navigation = useRouter();

  const handleSelect = (categoryId: string) => {
    //setCategoryFilters([categoryId]);
    navigation.push("/products");
  };

  return (
    <div
      className="group relative min-h-[22.5rem] w-full flex items-end justify-center pb-5 sm:px-5 px-2 cursor-pointer overflow-hidden rounded-xl text-decoration-none"
      onClick={() => handleSelect(category.title)}
    >
      <Image
        src={category.image}
        alt={category.title}
        layout="fill"
        objectFit="cover"
        className="absolute top-0 left-0 w-full h-full transition-transform duration-700 ease-in-out group-hover:scale-125"
      />

      <p className="relative py-5 tracking-wide w-full text-center bg-white group-hover:bg-white/80 rounded-xl">
        {category.title}
      </p>
    </div>
  );
};
