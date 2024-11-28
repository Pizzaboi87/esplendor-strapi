import Image from "next/image";
import { Button } from "../common";
import { useUser } from "@/providers/User";
import { accountNavItems } from "@/constants";
import { useState } from "react";
import { AccountHeader } from "./AccountHeader";
import { useRank } from "@/providers/Rank";
import { useRouter } from "next/navigation";

export const AccountNav = () => {
  const router = useRouter();
  const { user, logout } = useUser();
  const { rank } = useRank();
  const { username, email } = user || {};
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Selecting the menu option
  const selectMenu = (url: string) => {
    router.push(url);
    setIsOpen(false);
  };

  return (
    <nav
      className={`${isOpen ? "h-[32rem]" : "h-[4.5rem] lg:h-[32rem]"} ${
        rank === "newby"
          ? "bg-white"
          : rank === "rose"
          ? "rose-gold"
          : rank === "yellow"
          ? "yellow-gold"
          : "white-gold"
      } 2xl:col-span-3 lg:col-span-4 md:col-span-7 col-span-12 max-h-fit lg:sticky top-5 lg:mb-5 mb-16 relative flex flex-col gap-y-5 p-5 shadow-md rounded-tl-xl rounded-br-xl overflow-hidden transition-all duration-500 ease-in-out`}
    >
      <AccountHeader isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="flex gap-x-5 mb-10">
        <Image
          src="/assets/icons/user.svg"
          alt="User"
          width={50}
          height={50}
          className="aspect-square xs:block hidden"
        />
        <div className="flex flex-col">
          <p className="font-bold">{username}</p>
          <p>{email}</p>
        </div>
      </div>

      <ul className="flex flex-col space-y-5 mb-5">
        {accountNavItems.map((item) => (
          <li
            key={item.title}
            className="flex gap-x-5 items-center w-fit cursor-pointer group"
            onClick={() => selectMenu(item.url)}
          >
            <Image
              src={item.icon}
              alt={item.title}
              width={36}
              height={36}
              priority
              className="cursor-pointer group-hover:animate-rollOnce"
            />
            <h6 className="font-semibold group-hover:underline underline-offset-8">
              {item.title}
            </h6>
          </li>
        ))}
      </ul>
      <Button
        type="button"
        onClick={logout}
        className="md:w-full sm:w-2/3 w-full mx-auto"
      >
        Sign Out
      </Button>
    </nav>
  );
};
