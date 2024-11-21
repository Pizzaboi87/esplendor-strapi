import DatePicker from "react-datepicker";
import { forwardRef } from "react";
import { Controller, Control, FieldError } from "react-hook-form";
import { CustomHeader } from "./CustomHeader";
import { format, parseISO } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";

type DateFieldProps = {
  id: string;
  label: string;
  control: Control<any>;
  name: string;
  placeholder?: string;
  error?: FieldError;
  isHided?: boolean;
  isRequired?: boolean;
  className?: string;
};

export const DateField = ({
  id,
  label,
  control,
  name,
  placeholder,
  error,
  isHided = false,
  isRequired = true,
  className,
}: DateFieldProps) => {
  const CustomInput = forwardRef(
    ({ value, onClick }: { value?: string; onClick?: () => void }, ref) => (
      <button
        type="button"
        onClick={onClick}
        ref={ref as React.Ref<HTMLButtonElement>}
        className="w-full px-3 py-[0.625rem] border border-gray-400 bg-gray-50 rounded-md text-left focus:outline-none"
      >
        {value || placeholder || "Select date"}
      </button>
    )
  );
  CustomInput.displayName = "CustomInput";

  return (
    <div className={`${className} ${isHided ? "absolute -z-50" : ""}`}>
      <label htmlFor={id} className="block text-sm mb-1">
        {label} {isRequired && <span className="text-sm text-red-500">*</span>}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <DatePicker
            id={id}
            selected={value ? parseISO(value) : null}
            onChange={(date: Date | null) =>
              onChange(date ? format(date, "yyyy-MM-dd") : "")
            }
            placeholderText={placeholder ?? "Select date"}
            customInput={<CustomInput />}
            wrapperClassName="w-full"
            calendarClassName="bg-white"
            withPortal
            renderCustomHeader={(props) => <CustomHeader {...props} />}
          />
        )}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
    </div>
  );
};
