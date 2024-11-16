type ButtonProps = {
  type: "button" | "submit" | "reset";
  disabled?: boolean;
  isLoading?: boolean;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

export const Button: React.FC<ButtonProps> = ({
  type,
  disabled,
  isLoading,
  children,
  className,
  onClick,
}) => (
  <button
    type={type}
    disabled={disabled}
    onClick={onClick}
    className={`${className} md:w-1/2 w-full uppercase bg-black text-white py-[0.625rem] px-4 rounded-md hover:bg-black/80 focus:outline-none disabled:opacity-50`}
  >
    {isLoading ? "Loading..." : children}
  </button>
);
