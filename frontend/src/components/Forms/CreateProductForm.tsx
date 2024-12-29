import React, { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import { createProduct } from "../../utility/api";

interface CreateProductFormProps {
  onSuccess: () => void;
}

const CreateProductForm: React.FC<CreateProductFormProps> = ({ onSuccess }) => {
  const { token, isAdmin } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
  });
  const [images, setImages] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAdmin) {
      setError("You are not authorized to create a product.");
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

      images.forEach((image) => formDataObject.append("images", image));

      await createProduct(formDataObject, token || "");
      toast.success("Product created successfully!");
      onSuccess(); // Trigger success action
    } catch (err: any) {
      setError(err.message);
      toast.error("Failed to create product!");
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-900 text-gray-200 flex flex-col flex-grow items-center justify-center my-8">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full"
        encType="multipart/form-data"
      >
        <h1 className="text-3xl font-bold text-white mb-6">Create Product</h1>

        {error && <p className="text-red-400 mb-4">{error}</p>}

        {/* Name */}
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

        {/* Description */}
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

        {/* Price */}
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

        {/* Stock */}
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

        {/* Category */}
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

        {/* Images */}
        <div className="mb-4">
          <label htmlFor="images" className="block text-gray-400 mb-2">
            Images
          </label>
          <input
            id="images"
            type="file"
            multiple
            onChange={handleFileChange}
            className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Create Product
        </button>
      </form>
    </div>
  );
};

export default CreateProductForm;
