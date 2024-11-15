"use client";

import { useFilter } from "@/providers/Filters";
import { CategoryName } from "@/types/types";
import { API_ENDPOINTS, fetchFromApi } from "@/utils/globalApi";
import { useQuery } from "@tanstack/react-query";
import { Checkbox } from "../common/Checkbox";
import { RadioGroup } from "../common/RadioGroup";

export const Filters = () => {
  const { sort, setSort, categoryFilters, setCategoryFilters } = useFilter();

  // Handle category filters
  const handleCategories = (categoryName: string) => {
    if (categoryFilters.includes(categoryName)) {
      setCategoryFilters(categoryFilters.filter((id) => id !== categoryName));
    } else {
      setCategoryFilters([...categoryFilters, categoryName]);
    }
  };

  // Handle sort filters
  const handleSort = (value: string) => setSort(value);

  // Fetch categories from the API
  const {
    data: categories,
    error,
    isLoading,
  } = useQuery<CategoryName[], Error>({
    queryKey: ["category-names"],
    queryFn: async () => await fetchFromApi(API_ENDPOINTS.GET_CATEGORY_NAMES),
  });

  return (
    <div className="col-span-3">
      <div>
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
              {error.message || "An error occurred while fetching categories."}
            </p>
          ) : (
            (categories ?? []).map((category) => {
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
