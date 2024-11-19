"use client";

import { createContext, useContext, useState } from "react";

interface InitialFilterData {
  categoryFilters: string[];
  setCategoryFilters: React.Dispatch<React.SetStateAction<string[]>>;
  colorFilters: string[];
  setColorFilters: React.Dispatch<React.SetStateAction<string[]>>;
  price: string;
  setPrice: React.Dispatch<React.SetStateAction<string>>;
  sort: string;
  setSort: React.Dispatch<React.SetStateAction<string>>;
  stockStatus: string;
  setStockStatus: React.Dispatch<React.SetStateAction<string>>;
  resetFilters: () => void;
}

const INITIAL_FILTER_DATA = {
  categoryFilters: [],
  setCategoryFilters: () => {},
  colorFilters: [],
  setColorFilters: () => {},
  price: "",
  setPrice: () => "",
  sort: "",
  setSort: () => "",
  stockStatus: "all",
  setStockStatus: () => {},
  resetFilters: () => {},
};

const FilterContext = createContext<InitialFilterData>(INITIAL_FILTER_DATA);

export const FilterProvider = ({ children }: { children: React.ReactNode }) => {
  const [categoryFilters, setCategoryFilters] = useState<string[]>([]);
  const [colorFilters, setColorFilters] = useState<string[]>([]);
  const [price, setPrice] = useState<string>("price:asc");
  const [sort, setSort] = useState<string>("updatedAt:desc");
  const [stockStatus, setStockStatus] = useState<string>("all");

  // Function to reset all filters
  const resetFilters = () => {
    setColorFilters([]);
    setCategoryFilters([]);
    setSort("updatedAt:desc");
    setPrice("price:asc");
    setStockStatus("all");
  };

  return (
    <FilterContext.Provider
      value={{
        categoryFilters,
        setCategoryFilters,
        colorFilters,
        setColorFilters,
        price,
        setPrice,
        sort,
        setSort,
        stockStatus,
        setStockStatus,
        resetFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => useContext(FilterContext);
