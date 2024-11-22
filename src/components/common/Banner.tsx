import Image from "next/image";
import { Button } from "../common";

type TextProps = {
  firstOnClick: () => void;
  secondOnClick?: () => void;
  title: string;
  text: string;
  firstButtonText: string;
  secondButtonText?: string;
};

type ImageProps = {
  isReverse: boolean;
  image: string;
};

type BannerProps = ImageProps & TextProps;

// Image part of the banner
const ImagePart = ({ isReverse, image }: ImageProps) => (
  <Image
    src={image}
    alt="banner-image"
    width={400}
    height={400}
    priority
    className={`${
      isReverse ? "rounded-br-2xl" : "rounded-tl-2xl"
    } xl:col-span-3 md:col-span-6 lg:col-span-5 col-span-12 w-full aspect-square h-full`}
  />
);

// Text part of the banner
const TextPart = ({
  firstOnClick,
  secondOnClick,
  title,
  text,
  firstButtonText,
  secondButtonText,
}: TextProps) => (
  <div className="xl:col-span-9 md:col-span-6 lg:col-span-7 col-span-12 flex flex-col lg:py-10 py-8 xl:px-36 md:px-12 px-4 items-center">
    <h2 className="mb-5 text-center xl:text-[2.75rem] lg:text-[2rem] sm:text-[1.5rem] text-[1.25rem]">
      {title}
    </h2>
    <p className="xl:text-[1.25rem] lg:text-[1rem] text-[0.9rem] text-center leading-loose tracking-wide mb-10">
      {text}
    </p>
    <div className="flex lg:flex-row flex-col items-center justify-center lg:gap-x-10 lg:gap-y-0 gap-y-5">
      <Button type="button" onClick={firstOnClick} className="w-full md:w-auto">
        {firstButtonText}
      </Button>

      {/* Second Button if needed */}
      {secondButtonText ? (
        <Button
          type="button"
          onClick={secondOnClick}
          className="w-full md:w-auto"
        >
          {secondButtonText}
        </Button>
      ) : null}
    </div>
  </div>
);

// Banner component with image and text parts
export const Banner = ({
  firstOnClick,
  secondOnClick,
  isReverse,
  title,
  text,
  firstButtonText,
  secondButtonText,
  image,
}: BannerProps) => {
  const components = [
    <ImagePart key="image" {...{ isReverse, image }} />,
    <TextPart
      key="text"
      {...{
        firstOnClick,
        firstButtonText,
        secondOnClick,
        secondButtonText,
        title,
        text,
      }}
    />,
  ];

  return (
    <div className="col-span-12 grid grid-cols-12 items-center bg-white rounded-tl-2xl rounded-br-2xl shadow-lg mb-28">
      {isReverse ? components.reverse() : components}
    </div>
  );
};
