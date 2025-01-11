import React, { useState } from 'react';

const ProductFilters = ({ categories, onFilterChange }) => {
  const [filters, setFilters] = useState({
    category: 'all',
    priceRange: [0, 1000],
    rating: 0,
    sortBy: 'popularity'
  });

  const handleFilterChange = (newFilters) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  return (
    <div className="space-y-6 p-4 bg-white rounded-lg shadow">
      {/* Sort By Section */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Sort By</h3>
        <select
          value={filters.sortBy}
          onChange={(e) => handleFilterChange({ sortBy: e.target.value })}
          className="w-full p-2 border rounded-lg"
        >
          <option value="popularity">Popularity</option>
          <option value="priceLowToHigh">Price: Low to High</option>
          <option value="priceHighToLow">Price: High to Low</option>
          <option value="newest">Newest First</option>
        </select>
      </div>

      {/* Categories Section */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Categories</h3>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="category"
              value="all"
              checked={filters.category === 'all'}
              onChange={(e) => handleFilterChange({ category: e.target.value })}
              className="mr-2"
            />
            All Categories
          </label>
          {categories.map((category) => (
            <label key={category} className="flex items-center">
              <input
                type="radio"
                name="category"
                value={category}
                checked={filters.category === category}
                onChange={(e) => handleFilterChange({ category: e.target.value })}
                className="mr-2"
              />
              {category}
            </label>
          ))}
        </div>
      </div>

      {/* Price Range Section */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Price Range</h3>
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm text-gray-600 mb-1">Min</label>
              <input
                type="range"
                min="0"
                max="1000"
                value={filters.priceRange[0]}
                onChange={(e) => handleFilterChange({ 
                  priceRange: [
                    parseInt(e.target.value), 
                    Math.max(filters.priceRange[1], parseInt(e.target.value))
                  ] 
                })}
                className="w-full"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm text-gray-600 mb-1">Max</label>
              <input
                type="range"
                min="0"
                max="1000"
                value={filters.priceRange[1]}
                onChange={(e) => handleFilterChange({ 
                  priceRange: [
                    Math.min(filters.priceRange[0], parseInt(e.target.value)),
                    parseInt(e.target.value)
                  ] 
                })}
                className="w-full"
              />
            </div>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>${filters.priceRange[0]}</span>
            <span>${filters.priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Rating Section */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Rating</h3>
        <div className="space-y-2">
          {[4, 3, 2, 1].map((rating) => (
            <label key={rating} className="flex items-center">
              <input
                type="radio"
                name="rating"
                value={rating}
                checked={filters.rating === rating}
                onChange={(e) => handleFilterChange({ rating: Number(e.target.value) })}
                className="mr-2"
              />
              <span className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-sm ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
                  >
                    ★
                  </span>
                ))}
                <span className="ml-2">& up</span>
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Clear Filters Button */}
      <button
        onClick={() => setFilters({
          category: 'all',
          priceRange: [0, 1000],
          rating: 0,
          sortBy: 'popularity'
        })}
        className="w-full py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"
      >
        Clear All Filters
      </button>
    </div>
  );
};
export default ProductFilters;