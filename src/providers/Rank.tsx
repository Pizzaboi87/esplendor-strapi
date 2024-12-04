"use client";

import { Rank } from "@/types/types";
import { useUser } from "./User";
import { createContext, useContext, useEffect, useState } from "react";
import { Loading } from "@/components/common";
import { useQuery } from "@tanstack/react-query";
import { fetchAllQuantity, updateUser } from "@/utils/globalApi";

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
  const { user, jwt, fetchUserData, isLoading: isUserLoading } = useUser();
  const [items, setItems] = useState<{ [key: string]: number }>({});
  const [isLoading, setIsLoading] = useState(false);

  // Mappings for name -> rank and name -> id
  const discountNameToRank: Record<string, Rank> = {
    "Yellow Gold Discount": "yellow",
    "Rose Gold Discount": "rose",
    "White Gold Discount": "white",
  };

  const discountNameToId: Record<string, string> = {
    "Yellow Gold Discount": "1",
    "Rose Gold Discount": "3",
    "White Gold Discount": "5",
  };

  // Fetch all items purchased by the user
  const { data, isLoading: isRankLoading } = useQuery({
    queryKey: ["items", jwt],
    queryFn: () => fetchAllQuantity(jwt as string),
    enabled: !!jwt,
  });

  // Update the user rank based on the number of items purchased
  const updateUserRank = async (data: { [key: string]: number }) => {
    const currentPurchasedItems = Object.values(data).reduce(
      (sum, value) => sum + value,
      0
    );

    // Rank thresholds
    const rankThresholds = [
      { rank: "white" as Rank, minItems: 9, discountId: "5" },
      { rank: "rose" as Rank, minItems: 6, discountId: "3" },
      { rank: "yellow" as Rank, minItems: 3, discountId: "1" },
    ];

    // Find the applicable rank based on the number of items purchased
    const applicableRank = rankThresholds.find(
      (threshold) => currentPurchasedItems >= threshold.minItems
    );

    // Get the current discount ID from the user context
    const currentDiscountId =
      user?.discount?.name && discountNameToId[user.discount.name];

    if (!applicableRank || currentDiscountId === applicableRank.discountId)
      return;

    try {
      setIsLoading(true);
      await updateUser(
        user?.id as string,
        { discount: applicableRank.discountId },
        jwt as string
      );
      fetchUserData(jwt as string); // Fetch updated user data
    } catch (error) {
      console.error("Error updating user rank:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Update the user rank and items when the data is fetched
  useEffect(() => {
    if (data) {
      updateUserRank(data);
      setItems(data);
    } // eslint-disable-next-line
  }, [data]);

  // Determine the current rank from the user context
  const currentRank: Rank =
    user?.discount?.name && discountNameToRank[user.discount.name]
      ? discountNameToRank[user.discount.name]
      : "newby";

  if (isUserLoading || isLoading || isRankLoading) {
    return (
      <div className="inset-0 h-screen w-screen flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <RankContext.Provider
      value={{
        rank: currentRank,
        discount: user?.discount?.value || 0,
        stripeID: user?.discount?.stripeID || null,
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
