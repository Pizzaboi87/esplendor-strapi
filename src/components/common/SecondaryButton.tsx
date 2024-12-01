import React from "react";

type SecondaryButtonProps = {
  type: "button" | "submit" | "reset";
  disabled?: boolean;
  isLoading?: boolean;
  isShort?: boolean;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

export const SecondaryButton = ({
  type,
  disabled = false,
  isLoading = false,
  isShort = false,
  children,
  className = "",
  onClick,
}: SecondaryButtonProps) => (
  <button
    type={type}
    disabled={disabled || isLoading}
    onClick={onClick}
    className={`${className} flex items-center justify-center gap-2 uppercase bg-white text-black border border-gray-400 py-[0.625rem] px-4 rounded-md hover:bg-gray-100 focus:outline-none disabled:opacity-50`}
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
