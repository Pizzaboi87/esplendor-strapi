import Image from "next/image";
import Link from "next/link";
import { Button } from "../common";
import { useUser } from "@/providers/User";
import { accountNavItems } from "@/constants";

export const AccountNav = () => {
  const { user, logout } = useUser();
  const { username, email } = user?.user || {};

  return (
    <nav className="col-span-3 flex flex-col gap-y-5 bg-white p-5 shadow-md rounded-tl-xl rounded-br-xl">
      <h5 className="text-[1.6rem] mb-5">Personal Account</h5>
      <div className="flex gap-x-5 mb-10">
        <Image src="/assets/icons/user.svg" alt="User" width={50} height={50} />
        <div className="flex flex-col">
          <p className="font-bold">{username}</p>
          <p>{email}</p>
        </div>
      </div>

      <ul className="flex flex-col space-y-5 mb-5">
        {accountNavItems.map((item) => (
          <li key={item.title}>
            <Link href={item.url} className="flex gap-x-5 items-center">
              <Image
                src={item.icon}
                alt={item.title}
                width={36}
                height={36}
                priority
                className="cursor-pointer"
              />
              <h6 className="font-semibold">{item.title}</h6>
            </Link>
          </li>
        ))}
      </ul>
      <Button type="button" onClick={logout}>
        Sign Out
      </Button>
    </nav>
  );
};
