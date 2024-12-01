"use client";

import { CartButton } from "../cart/CartButton";
import { SecondaryButton } from "../common";
import { useCart } from "@/providers/Cart";
import { useUser } from "@/providers/User";
import {
  ProductDetails as ProductDetailsType,
  ProductCard,
} from "@/types/types";

interface ProductActionsProps {
  product: ProductDetailsType;
}

export const ProductActions = ({ product }: ProductActionsProps) => {
  const { addToCart, updateQuantity, cart } = useCart();
  const { wishList, addItemToWishList, removeItemFromWishList } = useUser();

  const productInCart = cart.find((item) => item.id === product.documentId);
  const productInWishList = wishList.some(
    (item) => item.documentId === product.documentId
  );

  // Handle wishlist click
  const handleWishlistClick = () => {
    const productCard: ProductCard = {
      name: product.name,
      documentId: product.documentId,
      price: product.price,
      updatedAt: product.updatedAt,
      isInStock: product.isInStock,
      image: product.image,
    };

    if (productInWishList) {
      removeItemFromWishList(productCard);
    } else {
      addItemToWishList(productCard);
    }
  };

  return (
    <div className="flex xl:flex-row lg:flex-col sm:flex-row flex-col gap-y-5 gap-x-10 mt-12 items-center justify-between">
      {/* Add to Cart */}
      <CartButton
        quantity={productInCart ? productInCart.quantity : 0}
        disabled={!product.isInStock}
        className="w-full"
        onAdd={() =>
          addToCart({
            id: product.documentId,
            name: product.name,
            price: product.price,
            quantity: 1,
            image: product.image.formats.small.url,
          })
        }
        onRemove={() =>
          productInCart
            ? updateQuantity(product.documentId, productInCart.quantity - 1)
            : updateQuantity(product.documentId, 0)
        }
      />

      {/* Add to Wishlist */}
      <SecondaryButton
        type="button"
        className="w-full"
        onClick={handleWishlistClick}
      >
        {productInWishList ? "Remove from Wishlist" : "Add to Wishlist"}
      </SecondaryButton>
    </div>
  );
};
