import Image from "next/image";
import { Button, MenuButton } from "../common";
import { useUser } from "@/providers/User";
import { accountNavItems } from "@/constants";
import { useState } from "react";

interface NavProps {
  setSelectedTab: React.Dispatch<React.SetStateAction<number>>;
}

export const AccountNav = ({ setSelectedTab }: NavProps) => {
  const { user, logout } = useUser();
  const { username, email } = user || {};
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Select tab and close nav
  const selectTab = (tabIndex: number) => {
    setSelectedTab(tabIndex);
    setTimeout(() => {
      setIsOpen(false);
    }, 500);
  };

  return (
    <nav
      className={`${
        isOpen ? "h-[32rem]" : "h-[4.5rem] lg:h-[32rem]"
      } 2xl:col-span-3 lg:col-span-4 md:col-span-7 col-span-12 max-h-fit xl:sticky top-5 mb-10 relative flex flex-col gap-y-5 bg-white p-5 shadow-md rounded-tl-xl rounded-br-xl overflow-hidden transition-all duration-500 ease-in-out`}
    >
      <h5 className="xs:text-[1.6rem] text-[1.35rem] pt-1 mb-5 flex gap-2">
        <span className="xs:inline hidden">Personal</span>
        <span className="xs:hidden inline">My</span> Account
      </h5>

      <div className="absolute sm:right-10 right-5 lg:hidden block">
        <MenuButton {...{ isOpen, setIsOpen }} />
      </div>
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
            onClick={() => selectTab(item.tabIndex)}
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
