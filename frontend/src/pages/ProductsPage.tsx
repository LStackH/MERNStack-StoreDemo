import ProductListings from "../components/ProductListings";

function ProductsPage() {
  return (
    <section className="flex flex-col flex-grow bg-gray-800 rounded-lg p-8 shadow-lg">
      <h1 className="text-3xl font-bold text-white mb-6">All Products</h1>
      <ProductListings />
    </section>
  );
}

export default ProductsPage;
