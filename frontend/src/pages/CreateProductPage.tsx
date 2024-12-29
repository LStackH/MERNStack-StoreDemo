import React from "react";
import { useNavigate } from "react-router-dom";
import CreateProductForm from "../components/Forms/CreateProductForm";

const CreateProductPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate("/products");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col flex-grow items-center justify-center my-8">
      <CreateProductForm onSuccess={handleSuccess} />
    </div>
  );
};

export default CreateProductPage;
