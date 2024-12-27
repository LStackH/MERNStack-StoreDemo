import React from "react";
import { useParams } from "react-router-dom";
import DetailedCard from "../components/DetailedCard";
import ReturnButton from "../components/ReturnButton";

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get the product ID from the URL

  return (
    <div className="container mx-auto px-4 py-12">
      <ReturnButton></ReturnButton>
      {id ? <DetailedCard productId={id} /> : <p>Product ID not found.</p>}
    </div>
  );
};

export default ProductPage;
