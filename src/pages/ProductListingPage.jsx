import React, { useState, useEffect } from "react";
import ProductFilters from "../components/Filters/ProductFilters";
import ProductGrid from "../components/Product/ProductGrid";
import Pagination from "../components/Common/Pagination";
import { products as productData } from "../data/products";

const ProductListingPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  console.log(productData);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setProducts(productData);
      setFilteredProducts(productData);
      setLoading(false);
    }, 1000);
  }, []);

  const handleFilterChange = (filters) => {
    setCurrentPage(1);

    let filtered = [...products];

    if (filters.category !== "all") {
      filtered = filtered.filter(
        (product) =>
          product.category.toLowerCase() === filters.category.toLowerCase()
      );
    }

    filtered = filtered.filter(
      (product) =>
        product.price >= filters.priceRange[0] &&
        product.price <= filters.priceRange[1]
    );

    if (filters.rating > 0) {
      filtered = filtered.filter(
        (product) => Math.floor(product.rating) >= filters.rating
      );
    }
    switch (filters.sortBy) {
      case "priceLowToHigh":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "priceHighToLow":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case "popularity":
        filtered.sort((a, b) => b.reviews - a.reviews);
        break;
      default:
        break;
    }

    setFilteredProducts(filtered);
  };
  const categories = [...new Set(products.map((product) => product.category))];

  const priceRange =
    products.length > 0
      ? {
          min: Math.floor(Math.min(...products.map((p) => p.price))),
          max: Math.ceil(Math.max(...products.map((p) => p.price))),
        }
      : { min: 0, max: 1000 };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">All Products</h1>
        <span className="text-gray-600">
          Showing {filteredProducts.length} products
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <aside className="lg:col-span-1">
          <ProductFilters
            categories={categories}
            priceRange={priceRange}
            onFilterChange={handleFilterChange}
          />
        </aside>

        <div className="lg:col-span-3">
          {loading ? (
            <div className="flex justify-center items-center h-96">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <>
              {filteredProducts.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500">
                    No products match your filters.
                  </p>
                </div>
              ) : (
                <>
                  <ProductGrid products={currentProducts} />
                  <div className="mt-8 flex justify-center">
                    <Pagination
                      currentPage={currentPage}
                      totalItems={filteredProducts.length}
                      itemsPerPage={productsPerPage}
                      onPageChange={setCurrentPage}
                    />
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductListingPage;
