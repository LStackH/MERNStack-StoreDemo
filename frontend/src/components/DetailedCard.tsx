import React, { useEffect, useState } from "react";

interface DetailedCardProps {
  productId: string;
}

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  createdAt: string;
  updatedAt: string;
}

const DetailedCard: React.FC<DetailedCardProps> = ({ productId }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`http://localhost:3000/api/products/${productId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data: Product) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [productId]);

  if (loading) return <p className="text-gray-400 text-center">Loading...</p>;
  if (error) return <p className="text-red-400 text-center">Error: {error}</p>;
  if (!product)
    return <p className="text-gray-400 text-center">Product not found.</p>;

  return (
    <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-white mb-4">{product.name}</h1>
      <p className="text-gray-400 mb-4">{product.description}</p>
      <p className="text-gray-300">
        <strong>Category:</strong> {product.category}
      </p>
      <p className="text-gray-300">
        <strong>Price:</strong> ${product.price.toFixed(2)}
      </p>
      <p className="text-gray-300">
        <strong>Stock:</strong> {product.stock} units available
      </p>
    </div>
  );
};

export default DetailedCard;
