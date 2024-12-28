import React from "react";
import { useAuth } from "../context/AuthContext";
import AddToCartButton from "./AddToCartButton";

interface CardProps {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  onViewDetails: (id: string) => void;
}

const Card: React.FC<CardProps> = ({
  id,
  name,
  description,
  category,
  price,
  onViewDetails,
}) => {
  const { addToCart } = useAuth();

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength
      ? `${text.substring(0, maxLength)}...`
      : text;
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition">
      <h4 className="text-xl font-semibold text-white">{name}</h4>
      <p className="text-gray-400">{truncateText(description, 50)}</p>
      <div className="mt-4">
        <p className="text-gray-300">
          <strong>Category:</strong> {category}
        </p>
        <p className="text-gray-300">
          <strong>Price:</strong> €{price.toFixed(2)}
        </p>
      </div>
      <button
        onClick={() => onViewDetails(id)}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        View Details
      </button>
      <div className="mt-4">
        <AddToCartButton productId={id} onAddToCart={addToCart} />
      </div>
    </div>
  );
};

export default Card;
