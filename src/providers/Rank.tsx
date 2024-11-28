"use client";

import { Rank } from "@/types/types";
import { useUser } from "./User";
import { fetchAllQuantity } from "@/utils/globalApi";
import { useQuery } from "@tanstack/react-query";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Loading } from "@/components/common";

interface InitialRankData {
  rank: Rank;
  setRank: React.Dispatch<React.SetStateAction<Rank>>;
  discount: number;
  setDiscount: React.Dispatch<React.SetStateAction<number>>;
  items: { [key: string]: number };
  setItems: React.Dispatch<React.SetStateAction<{ [key: string]: number }>>;
}

const RankContext = createContext<InitialRankData>({
  rank: "newby",
  setRank: () => {},
  discount: 0,
  setDiscount: () => {},
  items: {},
  setItems: () => {},
});

export const RankProvider = ({ children }: { children: React.ReactNode }) => {
  const { jwt, isLoading: isUserLoading } = useUser();
  const [items, setItems] = useState<{ [key: string]: number }>({});
  const [rank, setRank] = useState<Rank>("newby");
  const [discount, setDiscount] = useState<number>(0);

  const { data, isLoading: isRankLoading } = useQuery({
    queryKey: ["items", jwt],
    queryFn: () => fetchAllQuantity(jwt as string),
    enabled: !!jwt,
  });

  // Function to calculate rank (always defined)
  const calculateRank = useCallback(
    (data: { [key: string]: number }) => {
      const total = Object.values(data).reduce((sum, value) => sum + value, 0);

      let newRank: string;
      let newDiscount: number;

      if (total >= 7) {
        newRank = "white";
        newDiscount = 30;
      } else if (total >= 4) {
        newRank = "rose";
        newDiscount = 20;
      } else if (total >= 3) {
        newRank = "yellow";
        newDiscount = 10;
      } else {
        newRank = "newby";
        newDiscount = 0;
      }

      if (newRank !== rank) {
        setRank(newRank as Rank);
        setDiscount(newDiscount);
      }
    },
    [rank, setRank]
  );

  // Update rank when data changes (always defined)
  useEffect(() => {
    if (data) {
      setItems(data);
      calculateRank(data);
    }
  }, [data, calculateRank]);

  if (isRankLoading && !isUserLoading) {
    return (
      <div className="inset-0 h-screen w-screen flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <RankContext.Provider
      value={{
        rank,
        setRank,
        discount,
        setDiscount,
        items,
        setItems,
      }}
    >
      {children}
    </RankContext.Provider>
  );
};

export const useRank = () => {
  const context = useContext(RankContext);
  if (context === undefined) {
    throw new Error("useRank must be used within a RankProvider");
  }
  return context;
};
