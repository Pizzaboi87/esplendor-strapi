"use client";

import { Rank } from "@/types/types";
import { useUser } from "./User";
import { createContext, useContext, useEffect, useState } from "react";
import { Loading } from "@/components/common";
import { useQuery } from "@tanstack/react-query";
import { fetchAllQuantity } from "@/utils/globalApi";

interface InitialRankData {
  rank: Rank;
  discount: number;
  stripeID: string | null;
  items: { [key: string]: number };
  setItems: React.Dispatch<React.SetStateAction<{ [key: string]: number }>>;
}

const RankContext = createContext<InitialRankData>({
  rank: "newby",
  discount: 0,
  stripeID: null,
  items: {},
  setItems: () => {},
});

export const RankProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, jwt, isLoading: isUserLoading } = useUser();
  const [items, setItems] = useState<{ [key: string]: number }>({});
  const [rank, setRank] = useState<Rank>("newby");
  const [discount, setDiscount] = useState<number>(0);
  const [stripeID, setStripeID] = useState<string | null>(null);

  const { data, isLoading: isRankLoading } = useQuery({
    queryKey: ["items", jwt],
    queryFn: () => fetchAllQuantity(jwt as string),
    enabled: !!jwt,
  });

  // Set items from the server
  useEffect(() => {
    if (data) {
      setItems(data);
    }
  }, [data]);

  // Function to determine rank, discount, and stripeID
  useEffect(() => {
    if (user && user.discount) {
      const { name, value, stripeID: id } = user.discount;

      // Determine the rank based on discount name
      let newRank: Rank = "newby";

      if (name === "White Gold Discount") {
        newRank = "white";
      } else if (name === "Rose Gold Discount") {
        newRank = "rose";
      } else if (name === "Yellow Gold Discount") {
        newRank = "yellow";
      }

      setRank(newRank);
      setDiscount(value);
      setStripeID(id || null);
    } else {
      setRank("newby");
      setDiscount(0);
      setStripeID(null);
    }
  }, [user]);

  if (!isUserLoading && isRankLoading) {
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
        discount,
        stripeID,
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
