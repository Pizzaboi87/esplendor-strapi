import Link from "next/link";
import { useRank } from "@/providers/Rank";

export const Rules = () => {
  const { items, rank } = useRank();

  return (
    <div className="bg-white col-span-12 mt-10 rounded-tl-2xl rounded-br-2xl shadow-md xl:px-10 xl:py-6 md:p-6 px-2 py-5">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Golden Loyalty <span className="hidden md:inline">-</span>
        <br className="block md:hidden" /> Membership Program
      </h2>
      <p className="text-gray-700 tracking-wide leading-relaxed mb-6">
        Welcome to the <strong>Golden Loyalty Membership Program</strong>, where
        your dedication to excellence is rewarded with timeless privileges.{" "}
        <br className="xl:block hidden" /> As a valued member, your journey with{" "}
        <strong>Esplend&apos;or</strong> is adorned with exclusive benefits,
        designed to honor your loyalty.
      </p>

      <div className="bg-gray-100 rounded-md md:p-5 px-2 py-5 mt-5 text-center">
        <p className="md:text-lg text-[0.9rem] text-gray-700">
          You have purchased a total of <br className="block 2xs:hidden" />
          <strong className="text-gray-900">
            {Object.values(items).reduce((sum, value) => sum + value, 0)}
          </strong>{" "}
          products.
        </p>
        <p className="md:text-lg text-[0.9rem] text-gray-700 mt-2">
          Your current Membership Level:{" "}
          <strong
            className={`${
              rank === "yellow"
                ? "text-yellow-500"
                : rank === "rose"
                ? "text-rose-500"
                : rank === "white"
                ? "text-gray-500"
                : "text-gray-700"
            } font-semibold`}
          >
            {rank !== "newby"
              ? rank.charAt(0).toUpperCase().concat(rank.slice(1)) + " Gold"
              : "Aspiring Member"}
          </strong>
        </p>
        <p className="md:text-lg text-[0.9rem] text-gray-700 mt-2">
          Your current Lifetime Discount:{" "}
          <strong
            className={`${
              rank === "yellow"
                ? "text-yellow-500"
                : rank === "rose"
                ? "text-rose-500"
                : rank === "white"
                ? "text-gray-500"
                : "text-gray-700"
            } font-semibold`}
          >
            {rank === "newby"
              ? "0%"
              : rank === "yellow"
              ? "10%"
              : rank === "rose"
              ? "20%"
              : "30%"}
          </strong>
        </p>
      </div>

      <table className="lg:w-[80%] w-full lg:mx-auto table-auto border-collapse mb-6 text-gray-700 mt-8 hidden md:table">
        <thead>
          <tr>
            <th className="border-b-2 border-gray-300 py-2 w-2/6 text-left font-semibold">
              Status
            </th>
            <th className="border-b-2 border-gray-300 py-2 w-3/6 text-left font-semibold">
              Purchases
            </th>
            <th className="border-b-2 border-gray-300 py-2 w-1/6 text-left font-semibold">
              Lifetime Discount
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-3 border-b border-gray-200 text-yellow-500 font-semibold">
              Yellow Gold
            </td>
            <td className="py-3 border-b border-gray-200">
              3 exquisite purchases
            </td>
            <td className="py-3 border-b border-gray-200">10%</td>
          </tr>
          <tr>
            <td className="py-3 border-b border-gray-200 text-rose-500 font-semibold">
              Rose Gold
            </td>
            <td className="py-3 border-b border-gray-200">
              6 remarkable purchases
            </td>
            <td className="py-3 border-b border-gray-200">20%</td>
          </tr>
          <tr>
            <td className="py-3 border-b border-gray-200 text-gray-500 font-semibold">
              White Gold
            </td>
            <td className="py-3 border-b border-gray-200">
              9 extraordinary purchases
            </td>
            <td className="py-3 border-b border-gray-200">30%</td>
          </tr>
        </tbody>
      </table>

      <div className="md:hidden">
        <div className="rounded-md py-4 mb-4 mt-4">
          <h3 className="text-yellow-500 font-semibold mb-2">Yellow Gold</h3>
          <p className="text-gray-700">
            Purchases: <br className="block 2xs:hidden" />
            <strong>3 exquisite purchases</strong>
          </p>
          <p className="text-gray-700">
            Lifetime Discount: <strong>10%</strong>
          </p>
        </div>
        <div className="rounded-md py-4 mb-4">
          <h3 className="text-rose-500 font-semibold mb-2">Rose Gold</h3>
          <p className="text-gray-700">
            Purchases: <br className="block 2xs:hidden" />
            <strong>6 remarkable purchases</strong>
          </p>
          <p className="text-gray-700">
            Lifetime Discount: <strong>20%</strong>
          </p>
        </div>
        <div className="rounded-md py-4 mb-4">
          <h3 className="text-gray-500 font-semibold mb-2">White Gold</h3>
          <p className="text-gray-700">
            Purchases: <br className="block 2xs:hidden" />
            <strong>9 extraordinary purchases</strong>
          </p>
          <p className="text-gray-700">
            Lifetime Discount: <strong>30%</strong>
          </p>
        </div>
      </div>

      <p className="text-gray-700 tracking-wide leading-relaxed">
        Once achieved, your status is <strong>eternal</strong>, ensuring that
        every future acquisition is accompanied by unparalleled benefits.{" "}
        <br className="xl:block hidden" />
        Elevate your Esplend&apos;or journey today and indulge in the rewards of
        timeless luxury.
      </p>

      <p className="text-sm text-gray-500 mt-6 text-justify">
        Please note that the <strong>Golden Loyalty Membership Program</strong>{" "}
        is subject to change at the discretion of{" "}
        <strong>Esplend&apos;or</strong>. Discounts and membership benefits are
        non-transferable and applicable exclusively to purchases made directly
        through our platform. In the event of updates or modifications to the
        program, members will be notified promptly. By participating in this
        program, you agree to our{" "}
        <Link href="/" className="hover:underline underline-offset-4">
          Terms & Conditions
        </Link>
        .
      </p>
    </div>
  );
};
