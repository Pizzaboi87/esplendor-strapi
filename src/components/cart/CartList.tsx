"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/providers/Cart";
import { formatNumber } from "@/utils/helpers";
import { Fragment } from "react";

export const CartList = () => {
  const { cart, updateQuantity, removeFromCart } = useCart();

  return (
    <>
      {cart.length ? (
        <div className="col-span-8 flex flex-col gap-y-5">
          {cart.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-12 gap-y-5 md:pl-5 sm:pl-2 pl-5 py-4 border-b border-gray-200 h-fit bg-white shadow-md rounded-tl-xl rounded-br-xl"
            >
              {/* Product Image and Name */}
              <div className="sm:col-span-5 col-span-12 flex xs:flex-row flex-col xs:items-center md:gap-8 gap-2">
                {/* Product Image */}
                <Link href={`/products/${item.id}`}>
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={144}
                    height={144}
                    className="xs:w-36 w-full xs:h-36 h-auto object-cover"
                  />
                </Link>

                {/* Product Name and Price */}
                <div className="flex flex-col gap-y-2">
                  <Link href={`/products/${item.id}`}>
                    <p className="md:text-lg sm:text-[0.9rem] text-base font-semibold leading-tight hover:text-black/50 transition-all duration-300 ease-in-out">
                      {item.name
                        .split("-")
                        .map((part: string, index: number) => (
                          <Fragment key={index}>
                            {part}
                            {index < item.name.split("-").length - 1 && <br />}
                          </Fragment>
                        ))}
                    </p>
                  </Link>
                  <p className="text-gray-500 xs:block hidden">€{item.price}</p>
                </div>
              </div>
              {/* Quantity, Remove and Total */}
              <div className="sm:col-span-7 col-span-12 flex xs:flex-row flex-col gap-y-3 sm:justify-evenly justify-between xs:items-center">
                {/* Quantity Increase and Decrease */}
                <div className="flex gap-x-10">
                  <div className="flex w-32 items-center justify-between py-3 px-2">
                    <Image
                      src="/assets/icons/minus.svg"
                      alt="Remove from cart"
                      width={28}
                      height={28}
                      className="cursor-pointer hover:scale-125 transition-all duration-500 ease-in-out"
                      onClick={() => {
                        updateQuantity(item.id, item.quantity - 1);
                      }}
                    />
                    <p className="text-lg font-semibold">{item.quantity}</p>
                    <Image
                      src="/assets/icons/plus.svg"
                      alt="Remove from cart"
                      width={28}
                      height={28}
                      className="cursor-pointer hover:scale-125 transition-all duration-500 ease-in-out"
                      onClick={() => {
                        updateQuantity(item.id, item.quantity + 1);
                      }}
                    />
                  </div>

                  {/* Remove from Cart */}
                  <Image
                    src="/assets/icons/trash.svg"
                    alt="Remove from cart"
                    width={24}
                    height={24}
                    className="cursor-pointer hover:black-to-red transition-all duration-500 ease-in-out"
                    onClick={() => {
                      removeFromCart(item.id);
                    }}
                  />
                </div>

                {/* Price Section */}
                <div className="flex flex-col gap-y-1 w-28">
                  <p className="text-dark-500 text-[1.15rem]">
                    €{formatNumber(item.price * item.quantity)}
                  </p>
                  <p className="text-gray-500 text-sm">
                    €{formatNumber(item.price)} x {item.quantity}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="col-span-12 flex items-center justify-center h-80">
          <p className="text-2xl">Your cart is empty.</p>
        </div>
      )}
    </>
  );
};
