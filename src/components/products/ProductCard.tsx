import Image from "next/image";
import { Product } from "@/types/types";
import Link from "next/link";

export const ProductCard = ({ product }: { product: Product }) => (
  <Link
    href={`/products/${product.slug}`}
    passHref
    className="bg-white p-4 rounded-xl shadow-md w-full flex flex-col justify-between min-h-[22rem] overflow-hidden group"
  >
    <Image
      src={product.image.formats.small.url}
      alt={product.name}
      width={300}
      height={200}
      className="w-full h-48 object-cover rounded-md group-hover:scale-125 transition-transform duration-700 ease-in-out"
    />
    <h5 className="text-lg font-semibold mt-2">{product.name}</h5>
    <p className="text-[1.2rem] mt-1">€{product.price}</p>
  </Link>
);
