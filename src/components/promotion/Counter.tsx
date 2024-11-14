"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const StatBox = ({ label, value }: { label: string; value: number }) => (
  <li className="py-4 xl:px-6 px-4 border border-1 rounded-md">
    <h4 className="!font-extrabold">{value}</h4>
    <p>{label}</p>
  </li>
);

export const Counter = () => {
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

      <Link
        href="/shop"
        className="lg:text-[1.5rem] flex justify-center md:justify-normal text-base tracking-widest font-[300] text-work uppercase text-white"
      >
        <button className="px-4 lg:py-4 py-[0.625rem] w-full sm:w-[50%] md:w-auto mb-10 md:mb-0 uppercase rounded-md bg-black hover:bg-black/75">
          Shop now
        </button>
      </Link>
    </>
  );
};
