import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import AddToCartButton from "./AddToCartButton";
import { fetchProductById } from "../utility/api";
import { Product } from "../types/Product";

interface DetailedCardProps {
  productId: string;
}

const DetailedCard: React.FC<DetailedCardProps> = ({ productId }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { addToCart } = useAuth();

  useEffect(() => {
    const getProduct = async () => {
      try {
        setLoading(true);
        const data = await fetchProductById(productId); // Use centralized API function
        setProduct(data);
        setLoading(false);
      } catch (err) {
        setError((err as Error).message);
        setLoading(false);
      }
    };

    getProduct();
  }, [productId]);

  if (loading) return <p className="text-gray-400 text-center">Loading...</p>;
  if (error) return <p className="text-red-400 text-center">Error: {error}</p>;
  if (!product)
    return <p className="text-gray-400 text-center">Product not found.</p>;

  // Convert strings to Date objects
  const createdAt = new Date(product.createdAt);
  const updatedAt = new Date(product.updatedAt);

  return (
    <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-white mb-4">{product.name}</h1>
      <p className="text-gray-400 mb-4">{product.description}</p>
      <p className="text-gray-300">
        <strong>Category:</strong> {product.category}
      </p>
      <p className="text-gray-300">
        <strong>Price:</strong> €{product.price.toFixed(2)}
      </p>
      <p className="text-gray-300">
        <strong>Stock:</strong> {product.stock} units available
      </p>
      <div className="mt-4 opacity-80">
        <p className="text-gray-300">
          <strong>Created: </strong> {createdAt.toLocaleDateString()}
        </p>
        <p className="text-gray-300">
          <strong>Last Updated: </strong> {updatedAt.toLocaleDateString()}
        </p>
      </div>
      <div className="mt-4">
        <AddToCartButton productId={product._id} onAddToCart={addToCart} />
      </div>
    </div>
  );
};

export default DetailedCard;
