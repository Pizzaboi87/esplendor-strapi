"use client";

import { useFilter } from "@/providers/Filters";
import { useQuery } from "@tanstack/react-query";
import { Checkbox } from "../common/Checkbox";
import { RadioGroup } from "../common/RadioGroup";
import { fetchFilters } from "@/utils/globalApi";

export const Filters = () => {
  const {
    sort,
    setSort,
    categoryFilters,
    setCategoryFilters,
    colorFilters,
    setColorFilters,
  } = useFilter();

  // Handle category filters
  const handleCategories = (categoryName: string) => {
    if (categoryFilters.includes(categoryName)) {
      setCategoryFilters(categoryFilters.filter((id) => id !== categoryName));
    } else {
      setCategoryFilters([...categoryFilters, categoryName]);
    }
  };

  // Handle color filters
  const handleColors = (colorName: string) => {
    if (colorFilters.includes(colorName)) {
      setColorFilters(colorFilters.filter((id) => id !== colorName));
    } else {
      setColorFilters([...colorFilters, colorName]);
    }
  };

  // Handle sort filters
  const handleSort = (value: string) => setSort(value);

  // Fetch filters (categories and colors) from the API
  const {
    data: filters,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["filters"],
    queryFn: fetchFilters,
  });

  return (
    <div className="xl:col-span-3 col-span-4 relative pl-5 md:pl-0">
      <div className="sticky top-10">
        <h6 className="mb-2 text-[1.1rem]">Product Categories</h6>
        <div className="mb-4">
          {isLoading ? (
            [...Array(6)].map((_, index) => (
              <div
                key={index}
                className="animate-pulseStrong bg-gray-200 h-8 w-[80%] rounded-md mb-2"
              />
            ))
          ) : error ? (
            <p className="text-red-500">
              {error.message || "An error occurred while fetching filters."}
            </p>
          ) : (
            (filters?.categories ?? []).map((category) => {
              const isSelected = categoryFilters.includes(category.name);

              return (
                <Checkbox
                  key={category.name}
                  label={category.name}
                  value={category.name}
                  isSelected={isSelected}
                  onClickHandler={handleCategories}
                />
              );
            })
          )}
        </div>

        <hr className="border-t border-gray-300 my-4 mr-[30%]" />

        <h6 className="mb-2 text-[1.1rem]">Colors</h6>
        <div className="mb-4">
          {isLoading ? (
            [...Array(3)].map((_, index) => (
              <div
                key={index}
                className="animate-pulseStrong bg-gray-200 h-8 w-[80%] rounded-md mb-2"
              />
            ))
          ) : error ? (
            <p className="text-red-500">
              {error.message || "An error occurred while fetching filters."}
            </p>
          ) : (
            (filters?.colors ?? []).map((color) => {
              const isSelected = colorFilters.includes(color.name);

              return (
                <Checkbox
                  key={color.name}
                  label={color.name}
                  value={color.name}
                  isSelected={isSelected}
                  onClickHandler={handleColors}
                />
              );
            })
          )}
        </div>

        <hr className="border-t border-gray-300 my-4 mr-[30%]" />

        <h6 className="mb-2 text-[1.1rem]">Sort By:</h6>
        <RadioGroup
          options={[
            { label: "Latest", value: "latest" },
            { label: "Oldest", value: "oldest" },
          ]}
          selectedValue={sort}
          onChange={handleSort}
          groupName="sort"
        />
      </div>
    </div>
  );
};
