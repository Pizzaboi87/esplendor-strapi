"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Order, Product } from "@/types/types";
import { shortenOrderId } from "@/utils/helpers";
import { TwoLinesName } from "../common";

export const OrderCard = ({ order }: { order: Order }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mb-5 bg-white rounded-tl-xl rounded-br-xl shadow-md overflow-hidden">
      <div className="xs:p-5 py-5 px-3 space-y-6 xs:space-y-4">
        <div className="flex xs:flex-row flex-col justify-between xs:items-center">
          <div className="group relative">
            <h6 className="font-semibold">
              Order {shortenOrderId(order.orderID)}
            </h6>
            <span className="absolute left-0 -bottom-1 scale-0 transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100">
              Complete Order ID: {order.orderID}
            </span>
          </div>
          <p className="text-sm text-gray-500">
            {new Date(order.date).toLocaleDateString()}
          </p>
        </div>

        <div className="space-y-2">
          <p className="text-sm text-gray-600">Shipping Address:</p>
          <p className="font-medium">
            {order.firstName} {order.lastName}
          </p>
          <p className="text-sm">
            {order.address},<br className="xs:hidden block" /> {order.city} -{" "}
            {order.zipCode}, {order.country}
          </p>
        </div>

        <div className="flex flex-col space-y-2">
          <div className="flex 2xs:flex-row flex-col justify-between xs:items-center">
            <p>Total Price:</p>
            <p>€{order.price.toFixed(2)}</p>
          </div>

          <div className="flex 2xs:flex-row flex-col justify-between xs:items-center">
            <p>Discount:</p>
            <p>€{order.discount.toFixed(2)}</p>
          </div>

          <hr className="border-t border-gray-200" />

          <div className="flex 2xs:flex-row flex-col justify-between xs:items-center">
            <p className="font-semibold">Final Price:</p>
            <p className="text-lg font-bold">
              €{(order.price - order.discount).toFixed(2)}
            </p>
          </div>
        </div>

        <button
          className="w-full flex justify-between items-center py-2 px-4 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <span className="font-medium">Order Details</span>
          <Image
            src="/assets/icons/chevron.svg"
            alt="Arrow down"
            width={20}
            height={20}
            className={`transform transition-transform duration-500 ${
              isExpanded ? "rotate-[450deg]" : ""
            }`}
          />
        </button>
      </div>

      <div
        className={`px-5 bg-gray-50 border-t border-gray-200 transition-all ease-in-out duration-500 overflow-hidden ${
          isExpanded ? "opacity-100 max-h-96 pb-5" : "opacity-0 max-h-0"
        }`}
      >
        <h6 className="mt-5 font-semibold mb-3">Products:</h6>
        <div className="space-y-4">
          {order.products.map((product: Product) => {
            const quantityEntry = order.quantity.find(
              (entry) => Object.keys(entry)[0] === product.documentId
            );
            const quantity = quantityEntry
              ? Object.values(quantityEntry)[0]
              : 0;

            return (
              <div
                key={product.documentId}
                className="flex xs:flex-row flex-col xs:space-y-0 space-y-4 xs:items-center xs:space-x-4"
              >
                <Link
                  href={`/products/${product.documentId}`}
                  target="_blank"
                  className="w-fit"
                >
                  <Image
                    src={product.image.formats.thumbnail.url}
                    alt={product.name}
                    width={60}
                    height={60}
                    priority
                    className="rounded-md w-20 h-20"
                  />
                </Link>
                <div className="flex-grow">
                  <p className="font-medium">
                    <TwoLinesName name={product.name} />
                  </p>
                  <p className="text-sm text-gray-600">
                    Color: {product.color.name}
                  </p>
                  <p className="text-sm text-gray-600">Quantity: {quantity}</p>
                </div>
                <p className="font-semibold">€{product.price.toFixed(2)}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
