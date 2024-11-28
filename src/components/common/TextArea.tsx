import { FieldError, UseFormRegisterReturn } from "react-hook-form";

type TextAreaProps = {
  id: string;
  label: string;
  register: UseFormRegisterReturn;
  placeholder?: string;
  error?: FieldError;
  isHided?: boolean;
  className?: string;
  rows?: number;
};

export const TextArea = ({
  id,
  label,
  register,
  placeholder,
  error,
  isHided = false,
  className,
  rows = 4,
}: TextAreaProps) => (
  <div className={`${className} ${isHided ? "absolute -z-50" : ""}`}>
    <label htmlFor={id} className="block text-sm mb-1">
      {label} <span className="text-sm text-red-500">*</span>
    </label>
    <textarea
      {...register}
      id={id}
      rows={rows}
      placeholder={placeholder ?? ""}
      className="w-full resize-none px-3 py-[0.625rem] h-36 border border-gray-400 bg-gray-50 rounded-md focus:outline-none focus:border-black"
    />
    {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
  </div>
);
