import React, { useState, useEffect } from "react";
import ProductFilters from "../components/Filters/ProductFilters";
import ProductGrid from "../components/Product/ProductGrid";
import Pagination from "../components/Common/Pagination";

const ProductListingPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;
  
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const mockProducts = [
    {
      id: 1,
      name: "Wireless Headphones",
      price: 99.99,
      image: "/images/wallpaper (13).jpg",
      category: "Electronics",
      rating: 4,
    },
  ];

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setProducts(mockProducts);
      setLoading(false);
    }, 1000);
  }, []);

  const handleAddToCart = (id) => {
    console.log(`Adding product ${id} to cart`);
  };

  const handleFilterChange = (filters) => {
    console.log("Filters changed:", filters);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">All Products</h1>
        <span className="text-gray-600">
          Showing {products.length} products
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters Sidebar */}
        <aside className="lg:col-span-1">
          <ProductFilters
            categories={["Electronics", "Clothing", "Books", "Home"]}
            onFilterChange={handleFilterChange}
          />
        </aside>

        {/* Product Grid */}
        <div className="lg:col-span-3">
          {loading ? (
            <div className="flex justify-center items-center h-96">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <>
              <ProductGrid
                products={currentProducts}
                onAddToCart={handleAddToCart}
              />
              {/* Pagination */}
              <div className="mt-8 flex justify-center">
                <Pagination
                  currentPage={currentPage}
                  totalItems={products.length}
                  itemsPerPage={productsPerPage}
                  onPageChange={setCurrentPage}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductListingPage;
