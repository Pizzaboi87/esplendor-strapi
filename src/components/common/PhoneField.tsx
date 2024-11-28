import PhoneInput from "react-phone-input-2";
import { Controller, Control, FieldError } from "react-hook-form";
import "react-phone-input-2/lib/style.css";

type PhoneFieldProps = {
  id: string;
  label: string;
  control: Control<any>;
  name: string;
  placeholder?: string;
  error?: FieldError;
  isHided?: boolean;
  isRequired?: boolean;
  className?: string;
  rules?: Record<string, unknown>;
};

export const PhoneField = ({
  id,
  label,
  control,
  name,
  placeholder,
  error,
  rules,
  isHided = false,
  isRequired = true,
  className,
}: PhoneFieldProps) => (
  <div className={`${className} ${isHided ? "absolute -z-50" : ""}`}>
    <label htmlFor={id} className="block text-sm mb-1">
      {label} {isRequired && <span className="text-sm text-red-500">*</span>}
    </label>
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, value } }) => (
        <PhoneInput
          country={"us"}
          value={value}
          onChange={onChange}
          inputProps={{
            id: id,
            placeholder: placeholder ?? "Enter phone number",
          }}
          containerClass="w-full"
          inputClass="w-full h-[2.75rem] border border-gray-400 bg-gray-50 rounded-md focus:outline-none focus:border-black pl-16"
          buttonClass="absolute border border-gray-400 bg-gray-50 border-r rounded-l-md px-2 flex items-center justify-center"
          dropdownClass="bg-white rounded-md"
        />
      )}
    />
    {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
  </div>
);
