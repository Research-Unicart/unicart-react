import React from "react";
import { Heart, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

const ProductCard = ({ id, name, price, image, category, rating }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    addToCart({ id, name, price, image }, 1);
  };

  const handleShopNow = (e) => {
    e.stopPropagation();
    handleAddToCart();
    navigate("/cart");
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow flex flex-col justify-between h-full"
      onClick={() => navigate(`/single-product/${id}`)}
    >
      <div className="relative">
        <img src={image} alt={name} className="w-full h-48 object-cover" />
        <button
          className="absolute top-2 right-2 p-1.5 bg-white rounded-full hover:bg-gray-100"
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
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <ShoppingCart className="h-4 w-4" />
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
