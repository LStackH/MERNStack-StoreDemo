import React, { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextProps {
  isLoggedIn: boolean;
  token: string | null;
  username: string | null;
  cart: string[]; // Array of product ids
  login: (token: string, username: string) => void;
  logout: () => void;
  addToCart: (productId: string) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [cart, setCart] = useState<string[]>([]);

  const login = (token: string, username: string) => {
    setIsLoggedIn(true);
    setToken(token);
    setUsername(username);
    localStorage.setItem("authToken", token); // Save token in localStorage
    localStorage.setItem("username", username); // Save username in localStorage
  };

  const logout = () => {
    setIsLoggedIn(false);
    setToken(null);
    setUsername(null);
    setCart([]);
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");
  };

  const addToCart = (productId: string) => {
    if (productId === "") {
      setCart([]); // Clear the cart
    } else {
      setCart((prevCart) => [...prevCart, productId]); // Add product to cart
    }
    console.log(`Cart updated: ${cart}`);
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, token, username, cart, login, logout, addToCart }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
