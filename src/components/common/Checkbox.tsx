import { ChangeEvent, useState } from "react";

interface CheckboxProps {
  label: string;
  value: string;
  isSelected: boolean;
  onClickHandler: (value: string) => void;
}

export const Checkbox = ({
  label,
  value,
  isSelected,
  onClickHandler,
}: CheckboxProps) => {
  const [isChecked, setIsChecked] = useState<boolean>(isSelected);

  // Handle checkbox change
  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
    onClickHandler(value);
  };

  return (
    <>
      <style>{styles}</style>
      <label className="checkbox-wrapper cursor-pointer flex items-center gap-x-2 w-fit">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
          className="hidden"
        />
        <svg
          viewBox="0 0 80 80"
          height="1.75em"
          width="1.75em"
          className="overflow-visible"
        >
          <path
            d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
            pathLength="575.0541381835938"
            className="path checkbox-wrapper--path"
          />
        </svg>
        <p className="pb-2 text-[1.1rem]">{label}</p>
      </label>
    </>
  );
};

// CSS for Checkbox component
const styles = `
.checkbox-wrapper--path {
  fill: none;
  stroke: rgb(62, 37, 34);
  stroke-width: 4;
  stroke-linecap: round;
  stroke-linejoin: round;
  transition: stroke-dasharray 0.5s ease, stroke-dashoffset 0.5s ease;
  stroke-dasharray: 241 9999999;
  stroke-dashoffset: 0;
}

.checkbox-wrapper input:checked ~ svg .path {
  stroke-dasharray: 70.5096664428711 9999999;
  stroke-dashoffset: -262.2723388671875;
}
`;
