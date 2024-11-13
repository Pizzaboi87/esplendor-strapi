import { headerNavItems } from "@/constants";
import Link from "next/link";

export const HeaderNav = () => {
  return (
    <ul className="flex flex-wrap px-10 md:px-0 gap-x-8 gap-y-4 items-center md:justify-end justify-center">
      {headerNavItems.map((item, index) => {
        return (
          <li key={index}>
            <Link href={item.url} className="text-[1.1rem] text-work">
              {item.title}
            </Link>
          </li>
        );
      })}
      <li>
        <Link
          href="/sign-in"
          className="text-[1rem] tracking-widest font-[300] text-work uppercase text-white"
        >
          <button className="px-6 py-[0.625rem] rounded-md bg-black hover:bg-black/75">
            Sign in
          </button>
        </Link>
      </li>
    </ul>
  );
};
