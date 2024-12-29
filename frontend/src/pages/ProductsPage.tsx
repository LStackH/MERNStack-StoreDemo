import ProductListings from "../components/ProductListings";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function ProductsPage() {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  return (
    <section className="flex flex-col flex-grow bg-gray-800 rounded-lg p-8 shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white mb-6">All Products</h1>
        {isAdmin && (
          <button
            onClick={() => navigate("/products/create")}
            className="bg-green-800 text-white px-4 py-2 rounded hover:bg-green-900 transition"
          >
            Create Product
          </button>
        )}
      </div>

      <ProductListings />
    </section>
  );
}

export default ProductsPage;
