import { months, years } from "@/constants";
import { getYear, getMonth } from "date-fns";

type CustomHeaderProps = {
  date: Date;
  changeYear: (year: number) => void;
  changeMonth: (month: number) => void;
  decreaseMonth: () => void;
  increaseMonth: () => void;
  prevMonthButtonDisabled: boolean;
  nextMonthButtonDisabled: boolean;
};

export const CustomHeader = ({
  date,
  changeYear,
  changeMonth,
  decreaseMonth,
  increaseMonth,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled,
}: CustomHeaderProps) => (
  <div className="m-2 mt-4 flex justify-center items-center">
    <button
      onClick={decreaseMonth}
      disabled={prevMonthButtonDisabled}
      className="w-8 h-8 group mr-4 border-2 hover:bg-white transition-all ease-in-out duration-500 border-white rounded-full"
    >
      <p className="text-white text-[1.1rem] group-hover:text-black">{"<"}</p>
    </button>
    <select
      value={getYear(date)}
      onChange={({ target: { value } }) => changeYear(Number(value))}
      className="mx-2 px-2 py-2 border border-gray-300 rounded-md outline-none"
    >
      {years.map((year) => (
        <option key={year} value={year}>
          {year}
        </option>
      ))}
    </select>
    <select
      value={months[getMonth(date)]}
      onChange={({ target: { value } }) => changeMonth(months.indexOf(value))}
      className="mx-2 px-2 py-2 border border-gray-300 rounded-md outline-none"
    >
      {months.map((month) => (
        <option key={month} value={month}>
          {month}
        </option>
      ))}
    </select>
    <button
      onClick={increaseMonth}
      disabled={nextMonthButtonDisabled}
      className="w-8 h-8 group ml-4 border-2 hover:bg-white transition-all ease-in-out duration-500 border-white rounded-full"
    >
      <p className="text-white text-[1.1rem] group-hover:text-black">{">"}</p>
    </button>
  </div>
);
