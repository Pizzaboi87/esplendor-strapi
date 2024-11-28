"use client";

import { AccountNav } from "@/components/account/AccountNav";
import { Rules } from "@/components/account/Rules";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "@/providers/User";
import { Banner } from "@/components/common";

const AccountLayout = ({ children }: { children: React.ReactNode }) => {
  const { jwt } = useUser();
  const router = useRouter();
  const pathName = usePathname();

  // If the user is not logged in, show the banner
  if (!jwt) {
    return (
      <section className="container mx-auto">
        <Banner
          firstButtonText="Return Home"
          firstOnClick={() => router.push("/")}
          secondButtonText="Sign In Now"
          secondOnClick={() => router.push("/sign-in")}
          isReverse={true}
          title="Sign in required"
          text="Please sign in to access your account."
          image="/assets/images/notlogged.webp"
        />
      </section>
    );
  }

  // If the user is logged in, show the account layout
  return (
    <section className="container grid grid-cols-12 pb-10">
      <div className="col-span-12 grid grid-cols-12 lg:gap-x-5 pb-5">
        <AccountNav />
        {children}
      </div>
      {pathName === "/account/loyalty" && <Rules />}
    </section>
  );
};

export default AccountLayout;
