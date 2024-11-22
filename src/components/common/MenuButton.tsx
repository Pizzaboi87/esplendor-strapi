import { useEffect, useRef } from "react";
import "../../styles/menu-button.css";

interface MenuButtonProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MenuButton = ({ isOpen, setIsOpen }: MenuButtonProps) => {
  const checkboxRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.checked = isOpen;
    }
  }, [isOpen]);

  const barStyle =
    "bg-black absolute left-0 right-0 h-[4px] rounded-lg bar-transition";

  return (
    <>
      <input
        type="checkbox"
        id="checkbox"
        ref={checkboxRef}
        onChange={() => setIsOpen(!isOpen)}
        className="hidden"
      />
      <label
        htmlFor="checkbox"
        className="toggle relative w-[40px] h-[34px] cursor-pointer block"
      >
        <div className={`${barStyle} bar--top`} />
        <div className={`${barStyle} bar--middle`} />
        <div className={`${barStyle} bar--bottom`} />
      </label>
    </>
  );
};
