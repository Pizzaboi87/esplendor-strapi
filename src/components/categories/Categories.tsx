import Link from "next/link";

import { CategoryCard } from "./CategoryCard";
import { categories } from "@/constants";

export const Categories = () => (
  <section className="container mx-auto mt-24">
    <div className="flex justify-between mb-12">
      <h3>Shop by Categories</h3>

      <Link
        href="/products"
        className="text-black hover:underline underline-offset-8"
      >
        View All
      </Link>
    </div>

    <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1  gap-7">
      {categories
        .sort((a, b) => a.title.localeCompare(b.title))
        .map((category) => (
          <CategoryCard key={category.title} category={category} />
        ))}
    </div>
  </section>
);
