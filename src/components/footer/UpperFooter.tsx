import Image from "next/image";
import { upperFooterIcons } from "@/constants";

export const UpperFooter = () => (
  <div className="container mx-auto normal">
    <ul className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10 py-10 xl:px-0 xs:px-5 px-2">
      {upperFooterIcons.map((inclusion) => (
        <li
          key={inclusion.title}
          className="flex xs:flex-col xs:gap-y-5 sm:justify-center md:justify-start justify-start gap-x-5 items-center"
        >
          <div className="rounded-full flex-shrink-0 border-[3px] sm:w-20 w-14 sm:h-20 h-14 p-[0.5rem] flex items-center justify-center border-dark-500">
            <Image
              src={inclusion.icon}
              alt={inclusion.title}
              width={50}
              height={50}
              priority
              className="object-contain h-auto w-[85%]"
            />
          </div>

          <div className="text-center text-dark-500 space-y-2">
            <h5 className="md:text-[1.5rem]">{inclusion.title}</h5>
            <p className="text-base">{inclusion.description}</p>
          </div>
        </li>
      ))}
    </ul>
  </div>
);
