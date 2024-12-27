import React from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

const ReturnButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)} // Navigate to the previous page
      className="flex items-center space-x-2 mb-4 text-white text-lg hover:text-blue-500 transition"
      title="Go back"
    >
      <IoArrowBack className="w-6 h-6" />
      <span>Return</span>
    </button>
  );
};

export default ReturnButton;
