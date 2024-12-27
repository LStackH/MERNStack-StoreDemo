import React from "react";

interface CardProps {
  id: string;
  name: string;
  description: string;
  onViewDetails: (id: string) => void;
}

const Card: React.FC<CardProps> = ({
  id,
  name,
  description,
  onViewDetails,
}) => {
  return (
    <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-4 rounded-lg shadow-md hover:shadow-lg transition transform hover:scale-105">
      <h4 className="text-xl font-semibold text-white">{name}</h4>
      <p className="text-gray-400">{description}</p>
      <button
        onClick={() => onViewDetails(id)}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        View Details
      </button>
    </div>
  );
};

export default Card;
