"use client";

import { CouponType } from "@/types/types";
import { createContext, useContext, useEffect, useState } from "react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface InitialCartData {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  activeCoupon: CouponType;
  setActiveCoupon: React.Dispatch<React.SetStateAction<CouponType>>;
  addToCart: (product: CartItem) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  total: number;
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
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isHydrated, setIsHydrated] = useState<boolean>(false);
  const [activeCoupon, setActiveCoupon] = useState<CouponType>({
    code: "",
    value: 0,
    stripeID: "",
    isActive: false,
    documentId: "",
  });

  // Cart hydration from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
    setIsHydrated(true);
  }, []);

  // Cart persistence to localStorage
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, isHydrated]);

  // Add product to cart
  const addToCart = (product: CartItem) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        );
      }
      return [...prevCart, product];
    });
  };

  // Update product quantity in cart
  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    } else {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  // Calculate total price
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        activeCoupon,
        setActiveCoupon,
        addToCart,
        removeFromCart: (id) =>
          setCart((prevCart) => prevCart.filter((item) => item.id !== id)),
        updateQuantity,
        total,
      }}
    >
      {isHydrated ? children : null}
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
