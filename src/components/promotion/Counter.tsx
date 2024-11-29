"use client";

import { useEffect, useState } from "react";
import { Button } from "../common";
import { useRouter } from "next/navigation";

const StatBox = ({ label, value }: { label: string; value: number }) => (
  <li className="py-4 xl:px-6 px-4 border border-1 rounded-md">
    <h4 className="!font-extrabold">{value}</h4>
    <p>{label}</p>
  </li>
);

export const Counter = () => {
  const router = useRouter();
  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Update countdown every second
  useEffect(() => {
    // Get the end of the current month
    const getEndOfMonth = () => {
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth();
      const lastDay = new Date(year, month + 1, 0);
      lastDay.setHours(24, 0, 0, 0);

      return lastDay;
    };

    // Update countdown
    const updateCountdown = () => {
      const now = new Date();
      const endOfMonth = getEndOfMonth();
      const remainingTime = endOfMonth.getTime() - now.getTime();

      if (remainingTime > 0) {
        const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
        const hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((remainingTime / (1000 * 60)) % 60);
        const seconds = Math.floor((remainingTime / 1000) % 60);

        setTime({ days, hours, minutes, seconds });
      } else {
        setTime({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <ul className="grid md:grid-cols-4 grid-cols-2 mb-10 gap-4 xl:gap-10">
        <StatBox label="Days" value={time.days} />
        <StatBox label="Hours" value={time.hours} />
        <StatBox label="Minutes" value={time.minutes} />
        <StatBox label="Seconds" value={time.seconds} />
      </ul>
      <div className="flex sm:flex-row flex-col justify-between w-full xl:gap-10 lg:gap-4 sm:gap-4 gap-10 mb-10">
        <Button
          type="button"
          onClick={() => router.push("/shop")}
          className="sm:w-[95%] w-full h-12"
        >
          Shop Now
        </Button>

        <div className="border-1 border w-full h-12 rounded-md flex items-center justify-center">
          <p className="font-bold text-center">Use this code: XMAS2024</p>
        </div>
      </div>
    </>
  );
};
