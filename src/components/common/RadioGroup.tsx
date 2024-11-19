import { Radio } from "./Radio";

interface RadioGroupProps {
  options: {
    label: string;
    value: string;
  }[];
  selectedValue: string;
  onChange: (value: string) => void;
  groupName: string;
}

export const RadioGroup = ({
  options,
  selectedValue,
  onChange,
  groupName,
}: RadioGroupProps) => {
  const selectedIndex = options.findIndex(
    (option) => option.value === selectedValue
  );

  // CSS for RadioGroup component
  const styles = `
    .filter-switch-${groupName} .background {
        width: calc(100% / ${options.length});
        left: calc(${selectedIndex} * (100% / ${options.length}));
        transition: left 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
  `;

  return (
    <div
      className={`filter-switch-${groupName} relative flex items-center h-[2rem] md:w-[75%] sm:w-full w-[95%] border-2 border-dark-500 rounded-full overflow-hidden`}
    >
      <style>{styles}</style>
      <span className="absolute h-9 bg-dark-500 top-0 background"></span>
      {options.map((option) => (
        <Radio
          key={option.value}
          label={option.label}
          value={option.value}
          isSelected={selectedValue === option.value}
          onRadioChange={onChange}
          groupName={groupName}
        />
      ))}
    </div>
  );
};
