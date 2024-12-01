"use client";

import { useUser } from "@/providers/User";
import { fetchOrdersByJWT } from "@/utils/globalApi";
import { useQuery } from "@tanstack/react-query";
import { BannerSmall, Loading } from "../common";
import { OrderCard } from "./OrderCard";
import { useFilter } from "@/providers/Filters";
import { useRouter } from "next/navigation";
import { useScrollToTop } from "@/utils/useScrollToTop";

export const Orders = () => {
  useScrollToTop();
  const router = useRouter();
  const { jwt } = useUser();
  const { resetFilters } = useFilter();

  // Shop now button handler
  const handleShopNow = () => {
    resetFilters();
    router.push("/shop");
  };

  // Fetch orders by JWT
  const {
    data: orders = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ["user-orders", jwt],
    queryFn: () => fetchOrdersByJWT(jwt as string),
    enabled: !!jwt,
  });

  // Loading state
  if (isLoading) {
    return (
      <div className="pb-24 h-full 2xl:col-span-9 lg:col-span-8 col-span-12 xs:p-5">
        <Loading />
      </div>
    );
  }

  // Error handling
  if (error) throw new Error("Error during fetching orders");

  return (
    <div className="h-full 2xl:col-span-9 lg:col-span-8 col-span-12 sm:p-5">
      <h5 className="mb-5">Previous Orders</h5>
      {orders.length === 0 ? (
        <BannerSmall
          title="No orders found"
          message="You haven't placed any orders yet."
          buttonText="Shop Now"
          buttonAction={handleShopNow}
          imageUrl="/assets/images/purple.webp"
          imageAlt="No orders"
          isReversed={false}
        />
      ) : (
        orders.map((order) => <OrderCard key={order.orderID} order={order} />)
      )}
    </div>
  );
};
