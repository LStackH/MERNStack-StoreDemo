import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Card from "./Card";
import { fetchProducts } from "../utility/api";
import { Product } from "../types/Product";

const ProductListings: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null);

  // Check if we are on the HomePage
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchProducts();
        setProducts(data);
        setFilteredProducts(data);

        // Extract unique categories from fetched products
        const uniqueCategories = Array.from(
          new Set(data.map((p) => p.category))
        );
        setCategories(uniqueCategories);

        setLoading(false);
      } catch (err) {
        setError((err as Error).message);
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  // Apply filtering and sorting when category or sort order changes
  useEffect(() => {
    let filtered = [...products];

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    // Sort by price
    if (sortOrder === "asc") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "desc") {
      filtered.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(filtered);
  }, [selectedCategory, sortOrder, products]);

  if (loading) return <p className="text-gray-400">Loading products...</p>;
  if (error) return <p className="text-red-400">Error: {error}</p>;

  const displayedProducts = isHomePage
    ? filteredProducts.slice(-3)
    : filteredProducts;

  return (
    <div>
      {!isHomePage && (
        <div className="flex flex-wrap items-center justify-between mb-6">
          <div>
            <label htmlFor="category" className="text-white mr-4">
              Filter by Category:
            </label>
            <select
              id="category"
              value={selectedCategory || ""}
              onChange={(e) => setSelectedCategory(e.target.value || null)}
              className="bg-gray-700 text-white rounded px-4 py-2"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="price" className="text-white mr-4">
              Sort by Price:
            </label>
            <select
              id="price"
              value={sortOrder || ""}
              onChange={(e) =>
                setSortOrder(e.target.value as "asc" | "desc" | null)
              }
              className="bg-gray-700 text-white rounded px-4 py-2"
            >
              <option value="">None</option>
              <option value="asc">Lowest to Highest</option>
              <option value="desc">Highest to Lowest</option>
            </select>
          </div>
        </div>
      )}

      <section className="container mx-auto bg-grey grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {displayedProducts.map((product) => (
          <Card
            key={product._id}
            id={product._id}
            name={product.name}
            description={product.description}
            category={product.category}
            price={product.price}
            createdAt={product.createdAt}
            updatedAt={product.updatedAt}
            previewImage={product.images[0]} // Use the first image as the preview
            onViewDetails={(id) => navigate(`/product/${id}`)}
          />
        ))}
      </section>
    </div>
  );
};

export default ProductListings;
