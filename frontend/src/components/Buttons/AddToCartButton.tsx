import React from "react";
import { useAuth } from "../../context/AuthContext";
import { CgShoppingCart } from "react-icons/cg";

interface AddToCartButtonProps {
  productId: string;
  onAddToCart: (productId: string) => void; // Callback to handle adding to cart
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  productId,
  onAddToCart,
}) => {
  const { isLoggedIn } = useAuth();

  const handleAddToCart = () => {
    if (isLoggedIn) {
      onAddToCart(productId);
    } else {
      alert("You need to be logged in to add items to your cart.");
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      className={`flex items-center gap-2 px-2 py-2 rounded ${
        isLoggedIn
          ? "bg-emerald-700 text-white hover:bg-emerald-800 transition"
          : "bg-gray-500 text-gray-300 cursor-not-allowed"
      }`}
      disabled={!isLoggedIn}
    >
      <CgShoppingCart size={20} />
      <span className="text-sm">
        {isLoggedIn ? "Add to Cart" : "Login to Add Cart"}
      </span>
    </button>
  );
};

export default AddToCartButton;
