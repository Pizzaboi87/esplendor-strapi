"use client";

import { useUser } from "@/providers/User";
import { AccountNav } from "../account/AccountNav";

export const Account = () => {
  const { user } = useUser();

  if (!user) {
    return <div>You are not logged in.</div>;
  }

  return (
    <div className="grid grid-cols-12">
      <AccountNav />
    </div>
  );
};
