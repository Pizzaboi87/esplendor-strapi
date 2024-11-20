"use client";

import { useUser } from "@/providers/User";
import { Button } from "../common";

export const Account = () => {
  const { user, logout } = useUser();

  if (!user) {
    return <div>You are not logged in.</div>;
  }

  return (
    <div>
      <Button type="button" onClick={logout}>
        Sign Out
      </Button>
    </div>
  );
};
