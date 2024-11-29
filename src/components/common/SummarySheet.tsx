import { formatNumber } from "@/utils/helpers";
import { CouponInput } from "../cart/CouponInput";
import { useUser } from "@/providers/User";
import { useRank } from "@/providers/Rank";

interface SummarySheetProps {
  total: number;
  discountAmount: number;
  couponAmount: number;
}

export const SummarySheet = ({
  total,
  discountAmount,
  couponAmount,
}: SummarySheetProps) => {
  const { user } = useUser();
  const { rank } = useRank();

  return (
    <div className=" bg-white h-fit p-8 shadow-md rounded-tl-2xl rounded-br-2xl">
      <h2 className="text-lg font-semibold">Cart Summary</h2>

      <span className="flex justify-between mt-4">
        <p className="text-lg">Subtotal:</p>
        <p className="text-lg">€{formatNumber(total)}</p>
      </span>

      <span className="flex justify-between mt-4">
        <p className="text-lg">Delivery Charge:</p>
        <p className="text-lg">€0.00</p>
      </span>

      {discountAmount || couponAmount ? (
        <hr className="border-t border-terciary my-4" />
      ) : null}

      {discountAmount && !couponAmount ? (
        <span className="flex justify-between mt-4">
          <p className="text-lg">
            {rank[0].toUpperCase() + rank.slice(1)} Gold Discount:
          </p>
          <p className="text-lg">€-{formatNumber(discountAmount)}</p>
        </span>
      ) : null}

      {couponAmount ? (
        <span className="flex justify-between mt-4">
          <p className="text-lg">Coupon Code:</p>
          <p className="text-lg">€-{formatNumber(couponAmount)}</p>
        </span>
      ) : null}

      <hr className="border-t border-2 border-terciary my-4" />

      <span className="flex justify-between mt-2 mb-5">
        <p className="text-lg font-semibold">Grand Total:</p>
        <p className="text-lg font-semibold">
          €{formatNumber(total - discountAmount - couponAmount)}
        </p>
      </span>

      {user && <CouponInput />}
    </div>
  );
};
