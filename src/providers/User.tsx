"use client";

import { Loading } from "@/components/common";
import { SwalMessage } from "@/components/common/SwalMessage";
import { User, UserObj } from "@/types/types";
import { fetchUserByJWT } from "@/utils/globalApi";
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
}

const INITIAL_USER_DATA = {
  user: null,
  setUser: () => {},
  jwt: null,
  setJwt: () => {},
  login: () => {},
  logout: () => {},
};

interface JwtPayload {
  exp: number; // Expiration timestamp
}

const UserContext = createContext<InitialUserData>(INITIAL_USER_DATA);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [jwt, setJwt] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const login = (userObj: UserObj) => {
    setUser(userObj.user);
    setJwt(userObj.jwt);
    localStorage.setItem("jwt", userObj.jwt);
  };

  const logout = () => {
    setUser(null);
    setJwt(null);
    localStorage.removeItem("jwt");
    router.push("/");
  };

  const isTokenExpired = (token: string) => {
    try {
      const { exp } = jwtDecode<JwtPayload>(token);
      return exp * 1000 < Date.now();
    } catch (error) {
      console.error("Error decoding token:", error);
      return true;
    }
  };

  const fetchUserData = async (jwt: string) => {
    setIsLoading(true);
    try {
      const userData = await fetchUserByJWT(jwt);
      if (userData) {
        setUser(userData);
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

  if (isLoading) {
    return (
      <div className="inset-0 h-screen w-screen flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <UserContext.Provider value={{ user, setUser, jwt, setJwt, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
