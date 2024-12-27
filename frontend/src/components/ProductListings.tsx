import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Card from "./Card";

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

interface ProductListingsProps {
  fetchUrl?: string; // URL to fetch products from
}

const ProductListings: React.FC<ProductListingsProps> = ({ fetchUrl }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (fetchUrl) {
      setLoading(true);
      fetch(fetchUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data: Product[]) => {
          setProducts(data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [fetchUrl]);

  // Check if we are on the HomePage
  const isHomePage = location.pathname === "/";

  // Limit products to the latest 3 if on the HomePage
  const displayedProducts = isHomePage
    ? products.slice(products.length - 3, products.length)
    : products;

  if (loading) return <p className="text-gray-400">Loading products...</p>;
  if (error) return <p className="text-red-400">Error: {error}</p>;

  return (
    <section className="container mx-auto bg-grey grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {displayedProducts.map((product) => (
        <Card
          key={product._id}
          id={product._id}
          name={product.name}
          description={product.description}
          onViewDetails={(id) => navigate(`/product/${id}`)}
        />
      ))}
    </section>
  );
};

export default ProductListings;
