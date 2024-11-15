import React from "react";

interface RadioButtonProps {
  label: string;
  value: string;
  isSelected: boolean;
  onRadioChange: (value: string) => void;
  groupName: string;
}

export const Radio: React.FC<RadioButtonProps> = ({
  label,
  value,
  isSelected,
  onRadioChange,
  groupName,
}) => {
  const handleRadioChange = () => {
    onRadioChange(value);
  };

  return (
    <label className="flex-1 text-center relative cursor-pointer">
      <input
        type="radio"
        id={`${groupName}-${value}`}
        name={groupName}
        checked={isSelected}
        onChange={handleRadioChange}
        className="hidden"
      />
      <span
        className={`relative z-10 transition-all font-work ${
          isSelected ? "text-white" : "text-dark-500"
        }`}
      >
        {label}
      </span>
    </label>
  );
};
