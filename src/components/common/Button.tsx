import React from "react";

type ButtonProps = {
  type: "button" | "submit" | "reset";
  disabled?: boolean;
  isLoading?: boolean;
  isShort?: boolean;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

export const Button = ({
  type,
  disabled = false,
  isLoading = false,
  isShort = false,
  children,
  className = "",
  onClick,
}: ButtonProps) => (
  <button
    type={type}
    disabled={disabled || isLoading}
    onClick={onClick}
    className={`${className} flex items-center justify-center gap-2 uppercase bg-black text-white py-[0.625rem] px-4 rounded-md hover:bg-black/80 focus:outline-none disabled:opacity-50`}
  >
    {isLoading && (
      <div
        className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-e-transparent align-[-0.125em]"
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    )}
    <span>
      {isLoading && isShort
        ? "Loading"
        : isLoading
        ? "Please wait..."
        : children}
    </span>
  </button>
);
