import Image from "next/image";
import Link from "next/link";

interface RankCardProps {
  imageURL?: string;
  imageID?: string;
  index: number;
}

export const RankCard = ({ imageURL, imageID, index }: RankCardProps) => (
  <div
    className={`${
      index > 5
        ? "white-gold-card"
        : index > 2
        ? "rose-gold-card"
        : "yellow-gold-card"
    } ${
      index === 8
        ? "2xl:col-span-4 col-span-12 mx-auto 2xl:w-full sm:w-1/2 w-full"
        : "2xl:col-span-4 lg:col-span-6 sm:col-span-6 col-span-12"
    }  bg-white rounded-tl-xl rounded-br-xl shadow-md h-[20rem] p-3`}
  >
    <div className="border border-terciary/20 w-full h-full rounded-tl-lg rounded-br-lg relative bg-white">
      {imageURL ? (
        <Link href={`/products/${imageID}`}>
          <Image
            src={imageURL}
            alt="Purchased Item"
            width={200}
            height={200}
            priority
            className="mx-auto object-contain aspect-square w-auto h-full rounded-tl-lg rounded-br-lg"
          />
        </Link>
      ) : (
        <>
          <div className="w-full h-full py-5 px-10">
            <Image
              src="/assets/images/question.webp"
              alt="Question mark"
              width={200}
              height={200}
              priority
              className="mx-auto opacity-40 object-contain aspect-square w-auto h-3/4"
            />
          </div>
          <Image
            src="/logo.png"
            alt="Logo"
            width={200}
            height={200}
            priority
            className="w-[75%] h-auto mx-auto opacity-30 absolute bottom-2 left-0 right-0"
          />
        </>
      )}
    </div>
  </div>
);
