import Hero from "../components/Hero";
import ProductListings from "../components/ProductListings";

const HomePage = () => {
  return (
    <div className="flex flex-col flex-grow bg-gradient-to-r from-sky-500 to-indigo-500 min-h-screen">
      {/* Hero Section */}
      <div className="py-12">
        <Hero />
      </div>

      {/* Latest Products Section */}
      <section className="relative my-8 mx-10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-800 opacity-70 rounded-lg"></div>
        <div className="relative bg-gray-800 bg-opacity-70 rounded-lg p-8 shadow-lg backdrop-blur-sm animate-fadeIn">
          <h3 className="text-2xl font-semibold text-white mb-6">
            Latest Products
          </h3>
          <ProductListings />
        </div>
      </section>
    </div>
  );
};

export default HomePage;
