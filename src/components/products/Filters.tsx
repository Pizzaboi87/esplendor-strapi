"use client";

import { useFilter } from "@/providers/Filters";
import { useQuery } from "@tanstack/react-query";
import { fetchFilters } from "@/utils/globalApi";
import { Checkbox, RadioGroup } from "../common";

export const Filters = () => {
  const {
    sort,
    setSort,
    price,
    setPrice,
    stockStatus,
    setStockStatus,
    categoryFilters,
    setCategoryFilters,
    colorFilters,
    setColorFilters,
  } = useFilter();

  // Function to handle toggling of filters
  const handleToggle = (
    value: string,
    currentValues: string[],
    setValues: (values: string[]) => void
  ) => {
    setValues(
      currentValues.includes(value)
        ? currentValues.filter((item) => item !== value)
        : [...currentValues, value]
    );
  };

  // Fetch filters
  const {
    data: filters,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["filters"],
    queryFn: fetchFilters,
  });

  // Render filters
  const renderFilters = (
    items: any[],
    selectedItems: string[],
    handler: (name: string) => void
  ) =>
    items.map((item) => (
      <Checkbox
        key={item.name}
        label={item.name}
        value={item.name}
        isSelected={selectedItems.includes(item.name)}
        onClickHandler={handler}
      />
    ));

  // Render loading skeletons
  const renderLoadingSkeletons = (count: number) =>
    [...Array(count)].map((_, index) => (
      <div
        key={index}
        className="animate-pulseStrong bg-gray-200 h-8 w-[80%] rounded-md mb-2"
      />
    ));

  // Render error message
  const renderErrorMessage = (error: any) => (
    <p className="text-red-500">
      {error?.message || "An error occurred while fetching filters."}
    </p>
  );

  return (
    <div className="xl:col-span-3 col-span-4 relative pl-5 md:pl-0 min-w-[20rem]">
      <div className="sticky top-10 sm:grid grid-cols-2 flex md:flex flex-col gap-x-5 sm:px-10 md:px-0">
        <div>
          <h6 className="mb-2 text-base">Product Categories</h6>
          <div className="mb-4">
            {isLoading
              ? renderLoadingSkeletons(6)
              : error
              ? renderErrorMessage(error)
              : renderFilters(
                  filters?.categories ?? [],
                  categoryFilters,
                  (name) =>
                    handleToggle(name, categoryFilters, setCategoryFilters)
                )}
          </div>

          <hr className="border-t border-gray-300 mb-4 mr-[30%]" />

          <h6 className="mb-2 text-base">Colors</h6>
          <div className="mb-3">
            {isLoading
              ? renderLoadingSkeletons(3)
              : error
              ? renderErrorMessage(error)
              : renderFilters(filters?.colors ?? [], colorFilters, (name) =>
                  handleToggle(name, colorFilters, setColorFilters)
                )}
          </div>
        </div>

        <div>
          <hr className="border-t border-gray-300 mb-4 mr-[30%]" />

          <h6 className="mb-2 text-base">Date Added:</h6>
          <RadioGroup
            options={[
              { label: "Newest", value: "updatedAt:desc" },
              { label: "Oldest", value: "updatedAt:asc" },
            ]}
            selectedValue={sort}
            onChange={setSort}
            groupName="sort"
          />

          <h6 className="mb-2 mt-4 text-base">Price:</h6>
          <RadioGroup
            options={[
              { label: "Ascending", value: "price:asc" },
              { label: "Descending", value: "price:desc" },
            ]}
            selectedValue={price}
            onChange={setPrice}
            groupName="price"
          />

          <h6 className="mb-2 mt-4 text-base">Stock Status:</h6>
          <RadioGroup
            options={[
              { label: "All", value: "all" },
              { label: "In Stock", value: "inStock" },
            ]}
            selectedValue={stockStatus}
            onChange={setStockStatus}
            groupName="stock"
          />
        </div>
      </div>
    </div>
  );
};
