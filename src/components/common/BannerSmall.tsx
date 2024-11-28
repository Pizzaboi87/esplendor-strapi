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
      className="xl:col-span-9 col-span-8 flex flex-col items-center justify-center gap-y-8 xs:p-5 px-2 py-10"
    >
      <div className="flex flex-col gap-y-3 text-center">
        <h4 className="text-center">{title}</h4>
        <p>{message}</p>
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
