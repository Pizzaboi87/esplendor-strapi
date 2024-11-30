import Image from "next/image";
import { Button } from "../common";

interface BannerSmallProps {
  title: string;
  message: string;
  imageUrl: string;
  imageAlt: string;
  isReversed?: boolean;
  buttonComponent?: React.ReactNode;
  buttonText?: string;
  buttonAction?: () => void;
}

export const BannerSmall = ({
  title,
  message,
  buttonText,
  buttonAction,
  imageUrl,
  imageAlt,
  isReversed = false,
  buttonComponent,
}: BannerSmallProps) => {
  const components = [
    <div
      key="text"
      className="xl:col-span-9 col-span-8 flex flex-col items-center justify-center xl:gap-y-8 sm:gap-y-4 gap-y-8 xs:p-5 px-2 py-10 sm:py-4 lg:py-0"
    >
      <div className="flex flex-col gap-y-3 text-center">
        <h4 className="text-center lg:text-[1.5rem] xl:text-[1.875rem] text-[1.375rem]">
          {title}
        </h4>
        <p className="xl:text-[1.1rem] text-base">{message}</p>
      </div>
      {buttonComponent ? (
        buttonComponent
      ) : (
        <Button type="button" onClick={buttonAction} className="w-auto">
          {buttonText}
        </Button>
      )}
    </div>,
    <Image
      key="image"
      src={imageUrl}
      alt={imageAlt}
      width={250}
      height={250}
      priority
      className={`${
        isReversed ? "rounded-tl-2xl" : "rounded-br-2xl"
      } xl:col-span-3 col-span-4 w-full h-auto object-cover`}
    />,
  ];

  return (
    <div className="w-full bg-white rounded-tl-2xl rounded-br-2xl shadow-md flex flex-col sm:grid grid-cols-12">
      {isReversed ? components.reverse() : components}
    </div>
  );
};
