import Image from "next/image";
import Link from "next/link";
import { headerNavItems } from "@/constants";
import { useCart } from "@/providers/Cart";

export const HeaderNav = () => {
  const { cart } = useCart();

  return (
    <ul className="flex flex-wrap px-2 md:px-0 gap-x-8 gap-y-4 items-center md:justify-end justify-center">
      {headerNavItems.map((item, index) => {
        return (
          <li key={index}>
            <Link href={item.url} className="text-[1.1rem] text-work">
              {item.title}
            </Link>
          </li>
        );
      })}
      <li className="w-10 h-10 relative mb-2 group">
        <p className="group-hover:scale-0 transition-all duration-500 ease-in-out absolute text-dark-500 inline left-1/2 -translate-x-1/2 -top-3 font-bold">
          {cart.length > 0
            ? cart.reduce((total, item) => total + item.quantity, 0)
            : ""}
        </p>
        <Link
          href="/cart"
          className="w-full h-full flex items-end justify-center"
        >
          <Image
            src="/assets/icons/cart.svg"
            alt="Cart"
            width={36}
            height={36}
            priority
            className="w-auto h-8 group-hover:scale-0 transition-all duration-500 ease-in-out"
          />
          <p className="group-hover:scale-100 scale-0 absolute text-[1.1rem] mb-[0.2rem] text-work transition-all duration-500 ease-in-out">
            Cart
          </p>
        </Link>
      </li>
      <li>
        <Link
          href="/sign-in"
          className="text-[1rem] tracking-widest font-[300] text-work uppercase text-white"
        >
          <button className="px-6 py-[0.625rem] uppercase rounded-md bg-black hover:bg-black/75">
            Sign in
          </button>
        </Link>
      </li>
    </ul>
  );
};
