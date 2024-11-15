"use client";

import { createContext, useContext, useState } from "react";

interface InitialFilterData {
  categoryFilters: string[];
  setCategoryFilters: React.Dispatch<React.SetStateAction<string[]>>;
  sort: string;
  setSort: React.Dispatch<React.SetStateAction<string>>;
  resetFilters: () => void;
}

const INITIAL_FILTER_DATA = {
  categoryFilters: [],
  setCategoryFilters: () => {},
  sort: "",
  setSort: () => "",
  resetFilters: () => {},
};

const FilterContext = createContext<InitialFilterData>(INITIAL_FILTER_DATA);

export const FilterProvider = ({ children }: { children: React.ReactNode }) => {
  const [categoryFilters, setCategoryFilters] = useState<string[]>([]);
  const [sort, setSort] = useState<string>("latest");

  const resetFilters = () => {
    setCategoryFilters([]);
    setSort("latest");
  };

  return (
    <FilterContext.Provider
      value={{
        categoryFilters,
        setCategoryFilters,
        sort,
        setSort,
        resetFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => useContext(FilterContext);
