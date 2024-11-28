import Select from "react-select";
import countryList from "react-select-country-list";
import { useMemo } from "react";
import { Controller, Control, FieldError } from "react-hook-form";

type CountryFieldProps = {
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

export const CountryField = ({
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
}: CountryFieldProps) => {
  const options = useMemo(() => countryList().getData(), []);

  return (
    <div className={`${className} ${isHided ? "absolute -z-50" : ""}`}>
      <label htmlFor={id} className="block text-sm mb-1">
        {label} {isRequired && <span className="text-sm text-red-500">*</span>}
      </label>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field: { onChange, value } }) => (
          <Select
            inputId={id}
            options={options}
            value={options.find((option) => option.value === value)}
            onChange={(option) => onChange(option ? option.value : "")}
            placeholder={placeholder ?? "Select a country"}
            className="react-select-container"
            classNamePrefix="react-select"
            styles={{
              control: (provided) => ({
                ...provided,
                borderColor: "#9CA3AF",
                backgroundColor: "#f9fafb",
                borderRadius: "0.375rem",
                minHeight: "2.75rem",
                boxShadow: "none",
                "&:hover": {
                  borderColor: "#6B7280",
                },
              }),
              valueContainer: (provided) => ({
                ...provided,
                padding: "0.3125rem 0.75rem",
              }),
              input: (provided) => ({
                ...provided,
                margin: "0",
                padding: "0",
              }),
              indicatorSeparator: () => ({
                display: "none",
              }),
              dropdownIndicator: (provided) => ({
                ...provided,
                color: "#6B7280",
              }),
              menu: (provided) => ({
                ...provided,
                borderRadius: "0.375rem",
                boxShadow:
                  "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
              }),
              option: (provided, state) => ({
                ...provided,
                backgroundColor: state.isSelected
                  ? "#4B5563"
                  : state.isFocused
                  ? "#F3F4F6"
                  : "white",
                color: state.isSelected ? "white" : "#1F2937",
                "&:active": {
                  backgroundColor: "#E5E7EB",
                },
              }),
            }}
          />
        )}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
    </div>
  );
};
