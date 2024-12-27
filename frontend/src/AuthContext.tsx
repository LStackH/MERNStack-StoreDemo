import React, { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextProps {
  isLoggedIn: boolean;
  token: string | null;
  username: string | null;
  login: (token: string, username: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);

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
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, token, username, login, logout }}
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
