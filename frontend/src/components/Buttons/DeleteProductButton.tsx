import React, { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import { deleteProduct } from "../../utility/api";

interface DeleteProductButtonProps {
  productId: string;
  onDeleteSuccess: () => void; // Callback to trigger actions after successful delete
}

const DeleteProductButton: React.FC<DeleteProductButtonProps> = ({
  productId,
  onDeleteSuccess,
}) => {
  const [confirming, setConfirming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { isLoggedIn, token } = useAuth();

  const handleDelete = async () => {
    if (!isLoggedIn || !token) {
      alert("You must be logged in to delete a product.");
      return;
    }

    try {
      await deleteProduct(productId, token); // Call the centralized API function
      toast.success("Product deleted successfully.");
      onDeleteSuccess(); // Trigger any actions after successful delete
    } catch (err: any) {
      setError(err.message);
      toast.error("Failed to delete product!");
    }
  };

  return (
    <div className="mt-4">
      {error && <p className="text-red-400">{error}</p>}
      {!confirming ? (
        <button
          onClick={() => setConfirming(true)}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Delete Product
        </button>
      ) : (
        <div className="flex items-center space-x-4">
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Confirm
          </button>
          <button
            onClick={() => setConfirming(false)}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default DeleteProductButton;
