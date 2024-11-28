"use client";

import { useUser } from "@/providers/User";
import { Highlight } from "../account/Highlight";
import { Contact } from "../account/Contact";
import { WhyChoose } from "../account/WhyChoose";
import { useScrollToTop } from "@/utils/useScrollToTop";
import { Articles } from "../account/Articles";

export const Account = () => {
  useScrollToTop();
  const { user } = useUser();

  return (
    <div className="h-full 2xl:col-span-9 lg:col-span-8 col-span-12 md:p-5">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold mb-6">
          Welcome back{user?.firstName ? ", " + user.firstName : ""}!
        </h1>
        <Highlight />
        <WhyChoose />
        <Articles />
        <Contact />
      </div>
    </div>
  );
};
