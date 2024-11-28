import { formatNumber } from "@/utils/helpers";

export const SummarySheet = ({
  total,
  discount,
}: {
  total: number;
  discount: number;
}) => {
  const discountAmount = (discount / 100) * total;

  return (
    <div className=" bg-white h-fit p-8 shadow-md rounded-tl-2xl rounded-br-2xl">
      <h2 className="text-lg font-semibold">Cart Summary</h2>

      <span className="flex justify-between mt-4">
        <p className="text-lg">Subtotal:</p>
        <p className="text-lg">€{formatNumber(total)}</p>
      </span>

      {discount && (
        <span className="flex justify-between mt-4">
          <p className="text-lg">
            {discount === 10 ? "Yellow" : discount === 20 ? "Rose" : "White"}{" "}
            Gold Discount:
          </p>
          <p className="text-lg">€-{formatNumber(discountAmount)}</p>
        </span>
      )}

      <span className="flex justify-between mt-4">
        <p className="text-lg">Delivery Charge:</p>
        <p className="text-lg">€0.00</p>
      </span>

      <hr className="border-t border-terciary my-4" />

      <span className="flex justify-between mt-2">
        <p className="text-lg font-semibold">Grand Total:</p>
        <p className="text-lg font-semibold">
          €{formatNumber(total - discountAmount)}
        </p>
      </span>
    </div>
  );
};
