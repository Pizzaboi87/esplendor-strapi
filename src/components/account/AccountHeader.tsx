import { MenuButton } from "../common";

export const AccountHeader: React.FC<{
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ isOpen, setIsOpen }) => {
  const headerClasses = "xs:text-[1.6rem] text-[1.35rem] pt-1 mb-5 flex gap-2";
  const responsiveText = (
    <>
      <span className="xs:inline hidden">Personal</span>
      <span className="xs:hidden inline">My</span> Account
    </>
  );

  return (
    <>
      {/* Responsive Toggle Header */}
      <h5
        className={`lg:hidden ${headerClasses} cursor-pointer`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {responsiveText}
      </h5>

      {/* Static Header for Large Screens */}
      <h5 className={`lg:flex hidden ${headerClasses}`}>{responsiveText}</h5>

      {/* Menu Button */}
      <div className="absolute sm:right-10 right-5 lg:hidden 2xs:block hidden">
        <MenuButton isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
    </>
  );
};
