import React, { useEffect, useState } from "react";
import {
  Star,
  ShoppingCart,
  Heart,
  Share2,
  ShoppingBasket,
} from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { products } from "../data/products";

const SingleProductPage = () => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("M");

  const { id } = useParams();
  const navigate = useNavigate();
  const { cart, addToCart, updateQuantity } = useCart();

  const product = products.find((p) => p.id === parseInt(id));

  useEffect(() => {
    const existingItem = cart.find(
      (item) => item.id === product.id && item.size === selectedSize
    );
    if (existingItem) {
      setQuantity(existingItem.quantity);
    } else {
      setQuantity(1);
    }
  }, [cart, product.id, selectedSize]);

  const handleQuantityChange = (newQuantity) => {
    const updatedQuantity = Math.max(1, newQuantity);
    setQuantity(updatedQuantity);

    const existingItem = cart.find(
      (item) => item.id === product.id && item.size === selectedSize
    );
    if (existingItem) {
      updateQuantity(product.id, updatedQuantity);
    }
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedSize);
    navigate("/cart");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="aspect-square rounded-lg overflow-hidden">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            {product.images.slice(1).map((image, idx) => (
              <div
                key={idx}
                className="aspect-square rounded-lg overflow-hidden"
              >
                <img
                  src={image}
                  alt={`${product.name} view ${idx + 2}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="flex items-center mt-2 space-x-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, idx) => (
                  <Star
                    key={idx}
                    className={`w-5 h-5 ${
                      idx < Math.floor(product.rating)
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-600">{product.reviews} reviews</span>
            </div>
          </div>

          <div className="text-2xl font-bold">Rs. {product.price}</div>

          <div>
            <h3 className="font-semibold mb-2">Select Size</h3>
            <div className="flex space-x-4">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 rounded-lg border ${
                    selectedSize === size
                      ? "border-blue-600 bg-blue-50 text-blue-600"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-end  space-x-10">
            <div>
              <h3 className="font-semibold mb-2">Quantity</h3>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => handleQuantityChange(quantity - 1)}
                  className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50"
                >
                  -
                </button>
                <span className="w-12 text-center">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(quantity + 1)}
                  className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={handleBuyNow}
              className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center justify-center space-x-2"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Shop Now</span>
            </button>
            <button className="p-3 rounded-lg border border-gray-300 hover:bg-gray-50">
              <Heart className="w-5 h-5" />
            </button>
            <button className="p-3 rounded-lg border border-gray-300 hover:bg-gray-50">
              <Share2 className="w-5 h-5" />
            </button>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Product Specifications</h3>
            <ul className="list-disc list-inside space-y-2">
              {product.specs.map((spec, idx) => (
                <li key={idx} className="text-gray-600">
                  {spec}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Description</h3>
            <p className="text-gray-600">{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProductPage;
