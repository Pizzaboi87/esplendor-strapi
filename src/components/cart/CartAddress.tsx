import Image from "next/image";
import Link from "next/link";
import { useUser } from "@/providers/User";
import { Button } from "../common";

interface CartAddressProps {
  isSomeFieldEmpty: boolean | null;
}

export const CartAddress = ({ isSomeFieldEmpty }: CartAddressProps) => {
  const { user } = useUser();

  // If user is not logged in, return null
  if (!user) {
    return null;
  }

  // Destructure user object
  const { firstName, lastName, country, city, address, zipCode } = user;

  return (
    <div className="flex flex-col gap-y-5 p-8 border-b border-gray-200 h-fit bg-white shadow-md rounded-tl-xl rounded-br-xl">
      {isSomeFieldEmpty ? (
        <>
          <h2 className="text-lg font-semibold">Shipping Address</h2>
          <Link href="/account/personal">
            <Button type="button" className="w-full">
              Add Address
            </Button>
          </Link>
        </>
      ) : (
        <>
          <Link href="/account">
            <Image
              src="/assets/icons/edit.svg"
              alt="Edit Address"
              width={24}
              height={24}
              className="absolute top-5 right-5 cursor-pointer hover:scale-125 transition-all duration-500 ease-in-out"
            />
          </Link>
          <h2 className="text-lg font-semibold">Shipping Address</h2>
          <div className="flex flex-col gap-y-2">
            <p className="text-lg">
              {firstName} {lastName}
            </p>
            <p className="text-lg">{address}</p>
            <p className="text-lg">
              {city}, {country}, {zipCode}
            </p>
          </div>
        </>
      )}
    </div>
  );
};
