"use client";

import { Loading } from "@/components/common";
import { SwalMessage } from "@/components/common/SwalMessage";
import { ProductCard, User, UserObj } from "@/types/types";
import { fetchUserByJWT, updateUser } from "@/utils/globalApi";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

interface InitialUserData {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  jwt: string | null;
  setJwt: React.Dispatch<React.SetStateAction<string | null>>;
  login: (userObj: UserObj) => void;
  logout: () => void;
  fetchUserData: (jwt: string) => void;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  wishList: ProductCard[];
  setWishList: React.Dispatch<React.SetStateAction<ProductCard[]>>;
  addItemToWishList: (product: ProductCard) => void;
  removeItemFromWishList: (product: ProductCard) => void;
}

const INITIAL_USER_DATA: InitialUserData = {
  user: null,
  setUser: () => {},
  jwt: null,
  setJwt: () => {},
  login: () => {},
  logout: () => {},
  fetchUserData: () => {},
  isLoading: false,
  setIsLoading: () => {},
  wishList: [],
  setWishList: () => {},
  addItemToWishList: () => {},
  removeItemFromWishList: () => {},
};

interface JwtPayload {
  exp: number; // Expiration timestamp
}

const UserContext = createContext<InitialUserData>(INITIAL_USER_DATA);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [jwt, setJwt] = useState<string | null>(null);
  const [wishList, setWishList] = useState<ProductCard[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Login and logout functions
  const login = (userObj: UserObj) => {
    setUser(userObj.user);
    setWishList(userObj.user.wishlist || []);
    setJwt(userObj.jwt);
    localStorage.setItem("jwt", userObj.jwt);
  };

  const logout = () => {
    router.push("/");
    setIsLoading(true);

    setTimeout(() => {
      setUser(null);
      setWishList([]);
      setJwt(null);
      localStorage.removeItem("jwt");
      setIsLoading(false);
    }, 500);
  };

  // Check if token is expired
  const isTokenExpired = (token: string) => {
    try {
      const { exp } = jwtDecode<JwtPayload>(token);
      return exp * 1000 < Date.now();
    } catch (error) {
      console.error("Error decoding token:", error);
      return true;
    }
  };

  // Fetch user data by JWT
  const fetchUserData = async (jwt: string) => {
    setIsLoading(true);
    try {
      const userData = await fetchUserByJWT(jwt);
      if (userData) {
        setUser(userData);
        setWishList(userData.wishlist || []);
        setJwt(jwt);
      } else {
        SwalMessage({
          title: "Authentication Failed",
          message: "Please log in again.",
        });
        logout();
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      logout();
    } finally {
      setIsLoading(false);
    }
  };

  // Check if token is expired on page load
  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      if (isTokenExpired(jwt)) {
        SwalMessage({
          title: "Session Expired",
          message: "Please sign in again.",
        });
        logout();
      } else {
        fetchUserData(jwt);
      }
    } // eslint-disable-next-line
  }, []);

  // Add item to wishlist
  const addItemToWishList = async (product: ProductCard) => {
    setWishList((prev) => {
      if (prev.some((p) => p.documentId === product.documentId)) {
        return prev;
      }

      const updatedWishlist = [...prev, product];

      if (user && jwt) {
        try {
          // Sync updated wishlist with the server
          const serverWishlist = updatedWishlist.map((p) => p.documentId);
          updateUser(user.id.toString(), { wishlist: serverWishlist }, jwt);
        } catch (error) {
          console.error("Error updating wishlist on server:", error);
        }
      }

      return updatedWishlist;
    });
  };

  // Remove item from wishlist
  const removeItemFromWishList = async (product: ProductCard) => {
    setWishList((prev) => {
      const updatedWishlist = prev.filter(
        (p) => p.documentId !== product.documentId
      );

      if (user && jwt) {
        try {
          // Sync updated wishlist with the server
          const serverWishlist = updatedWishlist.map((p) => p.documentId);
          updateUser(user.id.toString(), { wishlist: serverWishlist }, jwt);
        } catch (error) {
          console.error("Error updating wishlist on server:", error);
        }
      }

      return updatedWishlist;
    });
  };

  // Loading screen
  if (isLoading) {
    return (
      <div className="inset-0 h-screen w-screen flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        jwt,
        setJwt,
        login,
        logout,
        fetchUserData,
        isLoading,
        setIsLoading,
        wishList,
        setWishList,
        addItemToWishList,
        removeItemFromWishList,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
