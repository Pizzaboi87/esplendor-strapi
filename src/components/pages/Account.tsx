"use client";

import { useUser } from "@/providers/User";
import { AccountNav } from "../account/AccountNav";
import { Banner } from "../common";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Personal } from "../account/Personal";
import { Orders } from "../account/Orders";
import { Items } from "../account/Items";
import { WishList } from "../account/WishList";

export const Account = () => {
  const { user } = useUser();
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState<number>(0);

  // Redirect to sign in page if user is not logged in
  if (!user) {
    return (
      <Banner
        title="Sign in required"
        text="Please sign in to view your account."
        firstButtonText="Return Home"
        firstOnClick={() => router.push("/")}
        secondButtonText="Sign In"
        secondOnClick={() => router.push("/sign-in")}
        image="/assets/images/notlogged.webp"
        isReverse
      />
    );
  }

  // Handle rendering for selected tab
  const renderTabContent = () => {
    switch (selectedTab) {
      case 0:
        return <Personal />;
      case 1:
        return <Orders />;
      case 2:
        return <Items />;
      case 3:
        return <WishList />;
    }
  };

  return (
    <div className="grid grid-cols-12 lg:gap-x-5 pb-10">
      <AccountNav {...{ setSelectedTab }} />
      {renderTabContent()}
    </div>
  );
};
