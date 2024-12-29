import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import UpdateProductForm from "../components/Forms/UpdateProductForm";

const UpdateProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate(`/product/${id}`); // Redirect to product details
  };

  if (!id) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900 text-gray-200">
        <p>Invalid Product ID</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col flex-grow items-center justify-center my-8">
      <UpdateProductForm productId={id} onSuccess={handleSuccess} />
    </div>
  );
};

export default UpdateProductPage;
