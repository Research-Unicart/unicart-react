import React, { useState, useEffect } from "react";
import { User, Package, LogOut, LogIn, UserPlus } from "lucide-react";
import { Tab } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { orderService, productService } from "../services/api";
import { useAuth } from "../context/AuthContext";

const UserProfile = () => {
  const navigate = useNavigate();
  const { user, logout, loading: authLoading } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState({});
  const [error, setError] = useState(null);

  const calculateOrderTotal = (order) => {
    const subtotal = order.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const shipping = order.paymentMethod === "express" ? 20 : 10;
    const tax = subtotal * 0.1;
    return subtotal + shipping + tax;
  };

  useEffect(() => {
    const fetchOrders = async () => {
      if (user) {
        try {
          setLoading(true);
          const response = await orderService.getUserOrders(user.user.id);
          setOrders(response);
        } catch (err) {
          console.error("Error fetching orders:", err);
          setError("Failed to fetch orders");
        } finally {
          setLoading(false);
        }
      }
    };

    if (!authLoading) {
      fetchOrders();
    }
  }, [user, authLoading]);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const productDetailsMap = {};

        const productIds = [
          ...new Set(
            orders.flatMap((order) => order.items.map((item) => item.productId))
          ),
        ];

        await Promise.all(
          productIds.map(async (productId) => {
            const productData = await productService.getProductById(productId);
            productDetailsMap[productId] = productData;
          })
        );

        setProducts(productDetailsMap);
      } catch (err) {
        console.error("Error fetching product details:", err);
        setError("Failed to fetch product details");
      }
    };

    if (orders.length > 0) {
      fetchProductDetails();
    }
  }, [orders]);

  const handleLogout = async () => {
    try {
      logout();
      navigate("/login");
    } catch (err) {
      setError("Logout failed");
    }
  };

  if (authLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded m-4">
        {error}
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Welcome</h1>
          <div className="flex space-x-4">
            <button
              onClick={() => navigate("/login")}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              <LogIn className="w-4 h-4" />
              <span>Login</span>
            </button>
            <button
              onClick={() => navigate("/register")}
              className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              <UserPlus className="w-4 h-4" />
              <span>Register</span>
            </button>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6 text-center">
          <h2 className="text-xl mb-4">
            Please login or register to access your profile
          </h2>
          <p className="text-gray-600">
            Create an account to track your orders and manage your profile
            information.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Account</h1>
        <button
          onClick={handleLogout}
          className="flex items-center space-x-2 text-red-600 hover:text-red-800"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>

      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-gray-100 p-1 mb-6">
          <Tab
            className={({ selected }) =>
              `w-full py-2.5 text-sm font-medium leading-5 rounded-lg
            ${
              selected
                ? "bg-white text-blue-600 shadow"
                : "text-gray-700 hover:bg-white/[0.12] hover:text-blue-600"
            } flex items-center justify-center space-x-2`
            }
          >
            <User className="w-4 h-4" />
            <span>Profile</span>
          </Tab>
          <Tab
            className={({ selected }) =>
              `w-full py-2.5 text-sm font-medium leading-5 rounded-lg
            ${
              selected
                ? "bg-white text-blue-600 shadow"
                : "text-gray-700 hover:bg-white/[0.12] hover:text-blue-600"
            } flex items-center justify-center space-x-2`
            }
          >
            <Package className="w-4 h-4" />
            <span>Orders</span>
          </Tab>
        </Tab.List>

        <Tab.Panels>
          <Tab.Panel>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Profile Details</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-500">Full Name</label>
                  <p className="font-medium">{user?.user?.name}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Email</label>
                  <p className="font-medium">{user?.user?.email}</p>
                </div>
              </div>
            </div>
          </Tab.Panel>

          <Tab.Panel>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-6">Order History</h2>
              {orders.length > 0 ? (
                <div className="space-y-6">
                  {orders.map((order) => (
                    <div key={order.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-4">
                        <div>
                          <h3 className="font-semibold">
                            Order #{order.orderId}
                          </h3>
                          <p className="text-sm text-gray-500">
                            Placed on{" "}
                            {new Date(
                              order.orderCreatedAt
                            ).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">
                            Rs. {calculateOrderTotal(order).toFixed(2)}
                          </p>
                          <span
                            className={`inline-block px-2 py-1 text-sm rounded-full 
                            ${
                              order.status === "Delivered"
                                ? "bg-green-100 text-green-800"
                                : order.status === "Processing"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {order.status}
                          </span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        {order.items.map((item, index) => (
                          <div
                            key={index}
                            className="flex justify-between text-sm"
                          >
                            <div className="flex-1">
                              <span className="font-medium">
                                {products[item?.productId]?.[0]?.name ||
                                  "Product not available"}
                              </span>
                              <span className="ml-2 text-gray-500">
                                x{item.quantity}
                              </span>
                            </div>
                            <span>
                              Rs. {(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center">
                  You don't have any orders yet.
                </p>
              )}
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default UserProfile;
