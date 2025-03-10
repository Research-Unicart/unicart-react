import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import ProductListingPage from "./pages/ProductListingPage";
import SingleProductPage from "./pages/SingleProductPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import { CartProvider } from "./context/CartContext";
import ThankYouPage from "./pages/ThankYouPage";
import ComingSoonPage from "./pages/ComingSoonPage";
import UserProfile from "./pages/UserProfile";
import { AuthProvider } from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <AuthProvider>
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
            <Route path="/" element={<MainLayout />}>
              <Route index element={<HomePage />} />
              <Route path="/products" element={<ProductListingPage />} />
              <Route
                path="/single-product/:id"
                element={<SingleProductPage />}
              />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/thank-you" element={<ThankYouPage />} />
              <Route path="*" element={<ComingSoonPage />} />
              <Route path="/profile" element={<UserProfile />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </CartProvider>
    </AuthProvider>
  );
}

export default App;
