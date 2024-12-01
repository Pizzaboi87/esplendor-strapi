"use client";

import Link from "next/link";
import "animate.css";

interface CartButtonProps {
  quantity?: number;
  onAdd?: () => void;
  onRemove?: () => void;
  className?: string;
  disabled?: boolean;
}

export const CartButton = ({
  quantity = 0,
  onAdd,
  onRemove,
  className = "",
  disabled = false,
}: CartButtonProps) => (
  <div
    className={`flex items-center rounded-md ${className} ${
      disabled ? "opacity-50" : ""
    }`}
  >
    {quantity > 0 ? (
      <div className="w-full mx-auto sm:mx-0 rounded-md flex items-center justify-between gap-x-[0.1rem] animate__animated animate__pulse">
        <button
          onClick={onRemove}
          disabled={disabled}
          className="bg-black hover:scale-105 hover:translate-x-[-0.1rem] transition-all duration-500 ease-in-out rounded-l-md text-white py-[0.625rem] px-4 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Remove from cart"
        >
          <p>-</p>
        </button>
        <Link href="/cart" className="w-full">
          <div className="w-full flex uppercase items-center justify-center font-medium bg-black hover:bg-black/80 text-white py-[0.625rem] px-6">
            View in Cart: {quantity}
          </div>
        </Link>
        <button
          onClick={onAdd}
          disabled={disabled}
          className="bg-black hover:scale-105 hover:translate-x-[0.1rem] transition-all duration-500 ease-in-out rounded-r-md text-white py-[0.625rem] px-4 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Add to cart"
        >
          <p>+</p>
        </button>
      </div>
    ) : (
      <button
        onClick={onAdd}
        disabled={disabled}
        className="w-full mx-auto sm:mx-0 uppercase bg-black text-white py-[0.625rem] px-4 rounded-md hover:bg-black/80 focus:outline-none disabled:opacity-50 transition-colors disabled:cursor-not-allowed animate__animated animate__fadeIn"
      >
        Add to Cart
      </button>
    )}
  </div>
);
