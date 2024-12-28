import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { CgShoppingCart } from "react-icons/cg";
import { fetchProductById } from "../utility/api";

interface Product {
  _id: string;
  name: string;
  price: number;
}

const ShoppingCart: React.FC = () => {
  const { cart, addToCart, isLoggedIn } = useAuth();
  const [cartDetails, setCartDetails] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const fetchCartDetails = async () => {
      try {
        const data = await Promise.all(
          cart.map((id) => fetchProductById(id)) // Use centralized API function
        );
        setCartDetails(data);
      } catch (error) {
        console.error("Error fetching cart details:", error);
      }
    };

    if (cart.length > 0) {
      fetchCartDetails();
    } else {
      setCartDetails([]);
    }
  }, [cart]);

  const handleClearCart = () => {
    if (window.confirm("Are you sure you want to clear your cart?")) {
      addToCart(""); // Clears the cart by passing an empty value
    }
  };

  const handlePurchase = () => {
    alert("Purchase functionality coming soon!");
  };

  return (
    <div className="relative">
      {/* Shopping Cart Icon */}
      <button
        onClick={() => setIsCartOpen((prev) => !prev)}
        className="flex items-center gap-1 px-2 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        <CgShoppingCart size={24} />
        <span>Cart ({cart.length})</span>
      </button>

      {/* Dropdown Cart */}
      {isCartOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-gray-800 text-white rounded-md shadow-lg z-20">
          <div className="p-4">
            <h3 className="text-lg font-semibold">Shopping Cart</h3>
            {cartDetails.length === 0 ? (
              <p className="text-gray-400 mt-4">Your cart is empty.</p>
            ) : (
              <ul className="mt-4 space-y-2">
                {cartDetails.map((item) => (
                  <li
                    key={item._id}
                    className="flex justify-between items-center border-b border-gray-700 pb-2"
                  >
                    <span>{item.name}</span>
                    <span className="text-gray-400">
                      ${item.price.toFixed(2)}
                    </span>
                  </li>
                ))}
              </ul>
            )}

            {cartDetails.length > 0 && (
              <div className="mt-4 flex justify-between">
                <button
                  onClick={handlePurchase}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                >
                  Purchase
                </button>
                <button
                  onClick={handleClearCart}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                >
                  Clear Cart
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
