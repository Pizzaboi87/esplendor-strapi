import { FieldError, UseFormRegisterReturn } from "react-hook-form";

type InputProps = {
  id: string;
  label: string;
  type: "text" | "email" | "password";
  register: UseFormRegisterReturn;
  placeholder?: string;
  error?: FieldError;
  isHided?: boolean;
  className?: string;
};

export const Input = ({
  id,
  label,
  type,
  register,
  placeholder,
  error,
  isHided = false,
  className,
}: InputProps) => (
  <div className={`${className} ${isHided ? "absolute -z-50" : ""}`}>
    <label htmlFor={id} className="block text-sm mb-1">
      {label} <span className="text-sm text-red-500">*</span>
    </label>
    <input
      type={type}
      {...register}
      placeholder={placeholder ?? ""}
      className="w-full px-3 py-[0.625rem] border border-gray-400 bg-gray-50 rounded-md focus:outline-none focus:border-black"
    />
    {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
  </div>
);
