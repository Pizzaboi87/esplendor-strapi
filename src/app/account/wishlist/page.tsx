import { WishList } from "@/components/account/WishList";
import { mergeOpenGraph } from "@/utils/mergeMetaData";

const WishListPage = () => <WishList />;

export const metadata = {
  title: "Wishlist",
  description:
    "Page for Esplendor Rings registered customers to view their wishlist.",
  openGraph: mergeOpenGraph({
    title: "Esplendor Rings Wishlist",
    url: "/account/wishlist",
  }),
};

export default WishListPage;
