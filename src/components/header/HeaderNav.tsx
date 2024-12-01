import Image from "next/image";
import Link from "next/link";
import { headerNavItems } from "@/constants";
import { useCart } from "@/providers/Cart";
import { useUser } from "@/providers/User";
import { Button } from "../common";

export const HeaderNav = () => {
  const { cart, isUpdateLoading: isLoading } = useCart();
  const { user } = useUser();

  return (
    <ul
      className={`${
        user
          ? "ml-10 gap-x-4 gap-y-4 px-0 justify-evenly"
          : "gap-x-0 gap-y-2 px-4 justify-between"
      } flex flex-wrap md:px-0 xs:gap-x-8 items-center md:justify-end`}
    >
      {headerNavItems.map((item, index) => {
        return (
          <li key={index}>
            <Link
              href={item.url}
              className="xs:text-[1.1rem] text-base text-work"
            >
              {item.title}
            </Link>
          </li>
        );
      })}
      {user ? (
        <Link href="/account" className="xs:text-[1.1rem] text-base text-work">
          Account
        </Link>
      ) : null}
      <li className={`${isLoading ? "" : "group"} w-10 h-10 relative mb-2`}>
        <p
          className={`${
            isLoading ? "hidden" : ""
          } group-hover:scale-0 transition-all duration-500 ease-in-out absolute text-dark-500 inline left-1/2 -translate-x-1/2 -top-3 font-bold`}
        >
          {cart.length > 0
            ? cart.reduce((total, item) => total + item.quantity, 0)
            : ""}
        </p>
        <Link
          href={isLoading ? "#" : "/cart"}
          className="w-full h-full flex items-end justify-center"
        >
          <Image
            src={
              isLoading
                ? "/assets/icons/download.svg"
                : "/assets/icons/cart.svg"
            }
            alt="cart-icon"
            width={36}
            height={36}
            priority
            className="w-auto h-8 group-hover:scale-0 transition-all duration-500 ease-in-out"
          />
          <p className="group-hover:scale-100 scale-0 absolute xs:text-[1.1rem] text-base mb-[0.2rem] text-work transition-all duration-500 ease-in-out">
            Cart
          </p>
        </Link>
      </li>
      <li>
        {!user ? (
          <Link href="/sign-in">
            <Button
              type="button"
              className="tracking-widest xs:w-auto w-[85vw]"
            >
              Sign in
            </Button>
          </Link>
        ) : null}
      </li>
    </ul>
  );
};
