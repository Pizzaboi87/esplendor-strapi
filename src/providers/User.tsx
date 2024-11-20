"use client";

import { Loading } from "@/components/common";
import { SwalMessage } from "@/components/common/SwalMessage";
import { User } from "@/types/types";
import { fetchUserByJWT } from "@/utils/globalApi";
import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";

interface InitialUserData {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  login: (user: User) => void;
  logout: () => void;
}

const INITIAL_USER_DATA = {
  user: null,
  setUser: () => {},
  login: () => {},
  logout: () => {},
};

interface JwtPayload {
  exp: number; // Expiration timestamp
}

const UserContext = createContext<InitialUserData>(INITIAL_USER_DATA);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Login function
  const login = (user: User) => {
    setUser(user);
    localStorage.setItem("jwt", user.jwt);
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("jwt");
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
        setUser({ ...userData, jwt });
      } else {
        logout();
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      logout();
    } finally {
      setIsLoading(false);
    }
  };

  // Check if user is logged in
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
    }
  }, []);

  // Show loading screen while fetching user data
  if (isLoading) {
    return (
      <div className="inset-0 h-screen w-screen flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <UserContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
