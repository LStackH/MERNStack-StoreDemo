import React, { useState } from "react";

interface ImagesSectionProps {
  images: string[];
}

const ImagesSection: React.FC<ImagesSectionProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleCloseOverlay = () => {
    setSelectedImage(null); // Close the overlay
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).id === "overlay-background") {
      handleCloseOverlay(); // Close if clicked on background
    }
  };

  return (
    <div className="relative">
      {/* Image Slider */}
      <div className="flex overflow-x-auto space-x-4 pb-4">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Product Image ${index + 1}`}
            className="w-32 h-32 my-1 mx-1 object-cover rounded-md cursor-pointer hover:shadow-xl hover:scale-105 transition"
            onClick={() => setSelectedImage(image)}
          />
        ))}
      </div>

      {/* Overlay/Modal for Larger Image */}
      {selectedImage && (
        <div
          id="overlay-background"
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={handleOverlayClick}
        >
          <div className="relative">
            {/* Close Button */}
            <button
              onClick={handleCloseOverlay}
              className="absolute top-4 right-4 bg-gray-700 text-white text-2xl rounded-full px-2 hover:bg-gray-800 transition"
            >
              &times;
            </button>
            <img
              src={selectedImage}
              alt="Selected Product"
              className="max-w-full max-h-screen object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImagesSection;
