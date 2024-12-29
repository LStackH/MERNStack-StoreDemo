import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import { fetchProductById, updateProduct } from "../../utility/api";

interface UpdateProductFormProps {
  productId: string;
  onSuccess: () => void;
}

const UpdateProductForm: React.FC<UpdateProductFormProps> = ({
  productId,
  onSuccess,
}) => {
  const { token, isAdmin } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
  });
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const product = await fetchProductById(productId);
        setFormData({
          name: product.name,
          description: product.description,
          price: product.price.toString(),
          stock: product.stock.toString(),
          category: product.category,
        });
        setExistingImages(product.images || []);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setNewImages(Array.from(e.target.files));
    }
  };

  const handleImageDelete = (image: string) => {
    setExistingImages((prev) => prev.filter((img) => img !== image));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAdmin) {
      setError("You are not authorized to update a product.");
      return;
    }

    try {
      const { name, description, price, stock, category } = formData;
      const formDataObject = new FormData();

      formDataObject.append("name", name);
      formDataObject.append("description", description);
      formDataObject.append("price", price);
      formDataObject.append("stock", stock);
      formDataObject.append("category", category);
      formDataObject.append("existingImages", JSON.stringify(existingImages));

      newImages.forEach((image) => formDataObject.append("images", image));

      await updateProduct(productId, formDataObject, token || "");
      toast.success("Product updated successfully!");
      onSuccess();
    } catch (err: any) {
      setError(err.message);
      toast.error("Failed to update product.");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="min-h-screen w-full bg-gray-900 text-gray-200 flex flex-col flex-grow items-center justify-center my-8">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full"
        encType="multipart/form-data"
      >
        <h1 className="text-3xl font-bold text-white mb-6">Update Product</h1>

        {error && <p className="text-red-400 mb-4">{error}</p>}

        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-400 mb-2">
            Name
          </label>
          <input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-400 mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-400 mb-2">
            Price
          </label>
          <input
            id="price"
            name="price"
            type="number"
            step="0.01"
            value={formData.price}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="stock" className="block text-gray-400 mb-2">
            Stock
          </label>
          <input
            id="stock"
            name="stock"
            type="number"
            value={formData.stock}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="category" className="block text-gray-400 mb-2">
            Category
          </label>
          <input
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Existing Images */}
        <div className="mb-4">
          <label className="block text-gray-400 mb-2">Existing Images</label>
          {existingImages.length > 0 ? (
            <div className="space-y-2">
              {existingImages.map((image, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <img
                    src={image}
                    alt={`Image ${index + 1}`}
                    className="w-16 h-16 object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => handleImageDelete(image)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No images available.</p>
          )}
        </div>

        {/* Upload New Images */}
        <div className="mb-4">
          <label htmlFor="images" className="block text-gray-400 mb-2">
            Upload New Images
          </label>
          <input
            id="images"
            type="file"
            multiple
            onChange={handleFileChange}
            className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default UpdateProductForm;
