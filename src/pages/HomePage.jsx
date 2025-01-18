import React from "react";
import { ChevronRight } from "lucide-react";
import { products } from "../data/products";
import ProductCard from "../components/Product/ProductCard";

const HomePage = () => {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="relative h-96 bg-gray-900 rounded-xl overflow-hidden">
        <img
          src="/images/20.jpg"
          alt="Hero"
          className="w-full h-full object-cover opacity-75"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-4">Summer Sale</h1>
            <p className="text-xl mb-6">Up to 50% off on selected items</p>
            <button className="bg-blue-600 px-6 py-3 rounded-lg hover:bg-blue-700">
              Shop Now
            </button>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Featured Products</h2>
          <a
            href="/products"
            className="text-blue-600 hover:text-blue-700 flex items-center"
          >
            View All <ChevronRight className="h-4 w-4 ml-1" />
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {products.slice(0, 12).map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-gray-100 rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Subscribe to Our Newsletter</h2>
        <p className="text-gray-600 mb-6">
          Get updates about new products and special offers
        </p>
        <div className="max-w-md mx-auto flex">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-2 rounded-l-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button className="bg-blue-600 text-white px-6 py-2 rounded-r-lg hover:bg-blue-700">
            Subscribe
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
