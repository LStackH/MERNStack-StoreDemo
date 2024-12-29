import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ShoppingCart from "./ShoppingCart";
import ProfileDropdown from "./ProfileDropdown";

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  return (
    <nav className="bg-gray-800 text-white shadow-md flex items-center justify-between relative z-10">
      {/* Left Section: Logo + Navigation */}
      <div className="flex items-center space-x-8">
        {/* Logo with borders and shadow */}
        <div className="px-6 py-3 bg-gray-800 border border-gray-900 shadow-lg rounded-md">
          <button
            onClick={() => navigate("/")}
            className="text-xl font-bold text-white hover:text-blue-500 transition"
          >
            E-Store
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-6">
          <button
            onClick={() => navigate("/")}
            className="hover:text-blue-500 transition"
          >
            Home
          </button>
          <button
            onClick={() => navigate("/products")}
            className="hover:text-blue-500 transition"
          >
            Products
          </button>
        </div>
      </div>

      {/* Right Section: Cart + Profile/Login */}
      <div className="flex items-center space-x-4">
        {isLoggedIn ? (
          <>
            <ShoppingCart />
            <ProfileDropdown />
          </>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-blue-500 text-white px-4 py-2 mr-2 rounded hover:bg-blue-600 transition"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
