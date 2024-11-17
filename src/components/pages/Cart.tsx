import { BackToShopping } from "../cart/BackToShopping";
import { CartList } from "../cart/CartList";
import { CartSummary } from "../cart/CartSummary";

export const Cart = () => (
  <div className="grid grid-cols-12">
    <div className="col-span-12 flex flex-col xl:grid grid-cols-12 gap-y-10 md:gap-x-10 mb-32 h-fit relative">
      <CartList />
      <CartSummary />
    </div>
    <BackToShopping />
  </div>
);
