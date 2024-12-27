import { useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="bg-gray-800 text-gray-400 py-4 opacity-70 w-full">
      <div className="container mx-auto flex flex-col items-center space-y-4 sm:flex-row sm:justify-between sm:space-y-0">
        {/* Store Name */}
        <button
          onClick={() => navigate("/")}
          className="text-xl font-bold hover:text-blue-500 transition"
        >
          E-Store
        </button>

        {/* Navigation Links */}
        <div className="flex space-x-6">
          <button
            onClick={() => navigate("/products")}
            className="hover:text-blue-500 transition"
          >
            All Products
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
