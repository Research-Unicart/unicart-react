import React from "react";
import { Heart, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { products } from "../../data/products";

const ProductCard = ({ id, name, price, image, category, rating }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const productData = products.find((p) => p.id === id);

  const hasVariations = productData?.sizes?.some(
    (size) => size && size.trim().length > 0
  );

  const isOutOfStock = productData.stock <= 0;

  const handleAddToCart = () => {
    if (!hasVariations && !isOutOfStock) {
      addToCart(productData, 1, null);
    }
  };

  const handleShopNow = (e) => {
    e.stopPropagation();

    if (isOutOfStock) {
      return;
    }

    if (hasVariations) {
      navigate(`/single-product/${id}`);
    } else {
      handleAddToCart();
      navigate("/cart");
    }
  };

  const handleCardClick = () => {
    navigate(`/single-product/${id}`);
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow flex flex-col justify-between h-full cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="relative">
        <img src={image} alt={name} className="w-full h-48 object-cover" />
        {isOutOfStock && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm">
            Out of Stock
          </div>
        )}
        <button
          className="absolute top-2 right-2 p-1.5 bg-white rounded-full hover:bg-gray-100"
          onClick={(e) => e.stopPropagation()}
          aria-label="Add to wishlist"
        >
          <Heart className="h-5 w-5 text-gray-600" />
        </button>
      </div>

      <div className="p-4 flex-1">
        <div className="text-sm text-gray-500 mb-1">{category}</div>
        <h3 className="text-lg font-semibold mb-2 line-clamp-2">{name}</h3>

        <div className="flex items-center mb-2">
          {[...Array(5)].map((_, i) => (
            <span
              key={i}
              className={`text-sm ${
                i < rating ? "text-yellow-400" : "text-gray-300"
              }`}
            >
              ★
            </span>
          ))}
        </div>

        <div className="flex justify-between items-center">
          <span className="text-xl font-bold">Rs. {price.toFixed(2)}</span>
        </div>
      </div>

      <div className="flex justify-center m-4">
        <button
          onClick={handleShopNow}
          disabled={isOutOfStock}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
            isOutOfStock
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          <ShoppingCart className="h-4 w-4" />
          {isOutOfStock
            ? "Out of Stock"
            : hasVariations
            ? "View Options"
            : "Shop Now"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
