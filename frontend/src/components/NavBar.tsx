import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const { isLoggedIn, username, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const closeDropdown = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null; // Type assertion
      if (target && !target.closest(".user-dropdown")) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("click", closeDropdown);
    return () => document.removeEventListener("click", closeDropdown);
  }, []);

  return (
    <nav className="bg-gray-800 text-white px-6 py-4 shadow-md flex items-center justify-between relative z-10">
      {/* Left Section: Logo */}
      <button
        onClick={() => navigate("/")}
        className="text-xl font-bold hover:text-blue-500 transition"
      >
        E-Store
      </button>

      {/* Center Section: Navigation Links */}
      <div className="flex space-x-6 ml-6">
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

      {/* Right Section: Login/Profile */}
      <div className="flex items-center space-x-4">
        {isLoggedIn ? (
          <div className="relative user-dropdown">
            <button
              onClick={toggleDropdown}
              className="flex items-center space-x-2 hover:text-blue-500 transition"
            >
              {/* Profile Icon */}
              <img
                src="https://via.placeholder.com/32"
                alt="You"
                className="w-8 h-8 rounded-full border border-gray-300"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-5 w-5 transform transition-transform ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 9.707a1 1 0 011.414 0L10 13.414l3.293-3.707a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-gray-700 rounded-md shadow-lg z-20">
                <button
                  onClick={() => navigate("/profile")}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-600"
                >
                  Profile
                </button>
                <button
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-600"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
