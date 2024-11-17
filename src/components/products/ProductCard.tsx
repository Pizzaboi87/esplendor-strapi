import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { ProductCard as ProductCardType } from "@/types/types";
import { formatNumber } from "@/utils/helpers";

export const ProductCard = ({ product }: { product: ProductCardType }) => (
  <Link
    href={`/products/${product.documentId}`}
    passHref
    className="bg-white p-4 rounded-xl shadow-md w-full flex flex-col justify-between min-h-[22rem] group"
  >
    <div className="w-full h-48 overflow-hidden">
      <Image
        src={product.image.formats.small.url}
        alt={product.name}
        width={300}
        height={300}
        className="w-full h-full object-contain rounded-md group-hover:scale-125 transition-transform duration-700 ease-in-out"
      />
    </div>
    <h5 className="text-lg font-semibold mt-2">
      {product.name.split("-").map((part: string, index: number) => (
        <Fragment key={index}>
          {part}
          {index < product.name.split("-").length - 1 && <br />}
        </Fragment>
      ))}
    </h5>
    <div className="flex justify-between items-center">
      <p className="text-[1.2rem] mt-1">€{formatNumber(product.price)}</p>
      <p className="text-gray-400 text-sm">
        {product.isInStock ? "In Stock" : "Pre-order"}
      </p>
    </div>
  </Link>
);
