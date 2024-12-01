"use client";

import { CartItem, CouponType } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useUser } from "./User";
import { fetchCartByJWT, updateCart } from "@/utils/globalApi";
import { SwalMessageMulti } from "@/components/common/SwalMessage";

interface InitialCartData {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  activeCoupon: CouponType;
  setActiveCoupon: React.Dispatch<React.SetStateAction<CouponType>>;
  addToCart: (product: CartItem) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  total: number;
  isUpdateLoading: boolean;
}

const CartContext = createContext<InitialCartData>({
  cart: [],
  setCart: () => {},
  activeCoupon: {
    code: "",
    value: 0,
    stripeID: "",
    isActive: false,
    documentId: "",
  },
  setActiveCoupon: () => {},
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  total: 0,
  isUpdateLoading: false,
});

// Global timer for debounce functionality
let updateTimer: NodeJS.Timeout | null = null;

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const { jwt } = useUser();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartId, setCartId] = useState<string>("");
  const [isUpdateLoading, setIsUpdateLoading] = useState<boolean>(false);
  const [isHydrated, setIsHydrated] = useState<boolean>(false);
  const [activeCoupon, setActiveCoupon] = useState<CouponType>({
    code: "",
    value: 0,
    stripeID: "",
    isActive: false,
    documentId: "",
  });

  // Fetch cart data from the server
  const { data, isLoading } = useQuery({
    queryKey: ["cart", jwt],
    queryFn: () => fetchCartByJWT(jwt as string),
    enabled: !!jwt,
  });

  // Ensure cart is always an array
  const safeCart = useMemo(() => (Array.isArray(cart) ? cart : []), [cart]);

  // Handle user login: sync or merge carts if needed
  useEffect(() => {
    if (jwt && !isLoading) {
      const localCart = localStorage.getItem("cart");
      const parsedLocalCart = localCart
        ? (JSON.parse(localCart) as CartItem[])
        : [];

      if (parsedLocalCart.length > 0) {
        if (
          data &&
          Array.isArray(data.cart_items) &&
          data.cart_items.length > 0
        ) {
          // Conflict: Both localStorage and server have carts
          SwalMessageMulti({
            title: "Saved Cart",
            message:
              "You have a saved cart in our system. Do you want to keep the current cart or the saved cart?",
            denyText: "Saved Cart",
            confirmText: "Current Cart",
          }).then((result) => {
            if (result.isConfirmed) {
              setIsUpdateLoading(true);
              // User chose local cart
              updateCart(jwt, data.documentId, parsedLocalCart)
                .then(() => {
                  localStorage.removeItem("cart");
                  setCart(parsedLocalCart); // Update cart state with local cart
                })
                .catch((error) =>
                  console.error("Failed to sync local cart with server:", error)
                )
                .finally(() => setIsUpdateLoading(false));
            } else if (result.isDenied) {
              // User chose server cart
              localStorage.removeItem("cart"); // Clear localStorage
              setCart(data.cart_items); // Use server cart
            }
          });
        } else {
          // No conflict: Server cart is empty
          updateCart(jwt, cartId, parsedLocalCart)
            .then(() => {
              localStorage.removeItem("cart");
            })
            .catch((error) =>
              console.error("Failed to sync local cart with server:", error)
            );
        }
      }
    }
  }, [jwt, isLoading, data, cartId]);

  useEffect(() => {
    if (data) {
      // For logged-in users, load cart from server
      setCartId(data.documentId);
      setCart(Array.isArray(data.cart_items) ? data.cart_items : []);
    } else if (!jwt) {
      // For non-logged-in users, load cart from localStorage
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
      setIsHydrated(true);
    }
  }, [data, jwt]);

  // Save cart to localStorage only if the user is not logged in
  useEffect(() => {
    if (!jwt && isHydrated) {
      localStorage.setItem("cart", JSON.stringify(safeCart));
    }
  }, [safeCart, jwt, isHydrated]);

  // Sync the cart state with the server, always using the most recent cart state
  const syncCartWithServer = async (currentCart: CartItem[]) => {
    if (jwt && cartId) {
      try {
        await updateCart(jwt, cartId, currentCart); // Send the provided cart state
      } catch (error) {
        console.error("Failed to sync cart with server:", error);
      }
    }
  };

  // Start or restart the debounce timer, passing the latest cart state
  const startSyncTimer = (updatedCart: CartItem[]) => {
    if (updateTimer) {
      clearTimeout(updateTimer);
    }
    updateTimer = setTimeout(() => syncCartWithServer(updatedCart), 3000); // 3-second debounce
  };

  // Add product to cart
  const addToCart = (product: CartItem) => {
    const updatedCart = safeCart.map((item) =>
      item.id === product.id
        ? { ...item, quantity: item.quantity + product.quantity }
        : item
    );

    if (!safeCart.find((item) => item.id === product.id)) {
      updatedCart.push(product);
    }

    setCart(updatedCart);
    if (jwt) {
      startSyncTimer(updatedCart); // Start debounce timer for server sync
    }
  };

  // Update product quantity in cart
  const updateQuantity = (productId: string, quantity: number) => {
    const updatedCart =
      quantity <= 0
        ? safeCart.filter((item) => item.id !== productId)
        : safeCart.map((item) =>
            item.id === productId ? { ...item, quantity } : item
          );

    setCart(updatedCart);
    if (jwt) {
      startSyncTimer(updatedCart); // Start debounce timer for server sync
    }
  };

  // Remove product from cart
  const removeFromCart = (id: string) => {
    const updatedCart = safeCart.filter((item) => item.id !== id);
    setCart(updatedCart);

    if (jwt) {
      if (updateTimer) {
        clearTimeout(updateTimer); // Clear the timer if a removal occurs
      }
      syncCartWithServer(updatedCart); // Immediately sync the cart
    }
  };

  // Calculate total price
  const total = safeCart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart: safeCart,
        setCart,
        activeCoupon,
        setActiveCoupon,
        addToCart,
        removeFromCart,
        updateQuantity,
        total,
        isUpdateLoading,
      }}
    >
      {isHydrated || jwt ? children : null}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
