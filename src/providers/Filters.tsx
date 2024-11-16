"use client";

import { createContext, useContext, useState } from "react";

interface InitialFilterData {
  categoryFilters: string[];
  setCategoryFilters: React.Dispatch<React.SetStateAction<string[]>>;
  colorFilters: string[];
  setColorFilters: React.Dispatch<React.SetStateAction<string[]>>;
  sort: string;
  setSort: React.Dispatch<React.SetStateAction<string>>;
  resetFilters: () => void;
}

const INITIAL_FILTER_DATA = {
  categoryFilters: [],
  setCategoryFilters: () => {},
  colorFilters: [],
  setColorFilters: () => {},
  sort: "",
  setSort: () => "",
  resetFilters: () => {},
};

const FilterContext = createContext<InitialFilterData>(INITIAL_FILTER_DATA);

export const FilterProvider = ({ children }: { children: React.ReactNode }) => {
  const [categoryFilters, setCategoryFilters] = useState<string[]>([]);
  const [colorFilters, setColorFilters] = useState<string[]>([]);
  const [sort, setSort] = useState<string>("latest");

  const resetFilters = () => {
    setColorFilters([]);
    setCategoryFilters([]);
    setSort("latest");
  };

  return (
    <FilterContext.Provider
      value={{
        categoryFilters,
        setCategoryFilters,
        colorFilters,
        setColorFilters,
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
