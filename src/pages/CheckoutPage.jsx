import React, { useState } from 'react';
import { CreditCard, ShoppingBag } from 'lucide-react';

const CheckoutPage = () => {
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('credit');

  const cartItems = [
    {
      id: 1,
      name: "Wireless Headphones",
      price: 99.99,
      quantity: 1,
      image: "/api/placeholder/100/100"
    }
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = shippingMethod === 'express' ? 20 : 10;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Order submitted');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Checkout</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Contact Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="First Name"
                required
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <input
                type="text"
                placeholder="Last Name"
                required
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <input
              type="email"
              placeholder="Email Address"
              required
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              required
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Shipping Address</h2>
            <input
              type="text"
              placeholder="Street Address"
              required
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              type="text"
              placeholder="Apartment, suite, etc. (optional)"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <div className="grid grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="City"
                required
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <input
                type="text"
                placeholder="State"
                required
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <input
                type="text"
                placeholder="ZIP Code"
                required
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Shipping Method</h2>
            <div className="space-y-2">
              <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="shipping"
                  value="standard"
                  checked={shippingMethod === 'standard'}
                  onChange={(e) => setShippingMethod(e.target.value)}
                  className="mr-4"
                />
                <div className="flex-1">
                  <div className="font-semibold">Standard Shipping</div>
                  <div className="text-sm text-gray-600">4-5 business days</div>
                </div>
                <div className="font-semibold">$10.00</div>
              </label>
              
              <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="shipping"
                  value="express"
                  checked={shippingMethod === 'express'}
                  onChange={(e) => setShippingMethod(e.target.value)}
                  className="mr-4"
                />
                <div className="flex-1">
                  <div className="font-semibold">Express Shipping</div>
                  <div className="text-sm text-gray-600">2-3 business days</div>
                </div>
                <div className="font-semibold">$20.00</div>
              </label>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Payment Method</h2>
            <div className="space-y-4">
              <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="payment"
                  value="credit"
                  checked={paymentMethod === 'credit'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-4"
                />
                <CreditCard className="w-6 h-6 mr-4" />
                <span className="font-semibold">Credit Card</span>
              </label>

              {paymentMethod === 'credit' && (
                <div className="space-y-4 p-4 border rounded-lg">
                  <input
                    type="text"
                    placeholder="Card Number"
                    required
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <div className="grid grid-cols-3 gap-4">
                    <input
                      type="text"
                      placeholder="MM/YY"
                      required
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <input
                      type="text"
                      placeholder="CVV"
                      required
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <input
                      type="text"
                      placeholder="ZIP Code"
                      required
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="border rounded-lg p-6 space-y-6 sticky top-4">
            <h2 className="text-xl font-semibold">Order Summary</h2>
            
            <div className="space-y-4">
              {cartItems.map(item => (
                <div key={item.id} className="flex space-x-4">
                  <div className="w-16 h-16 rounded-lg overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.name}</h3>
                    <div className="text-sm text-gray-600">Quantity: {item.quantity}</div>
                    <div className="font-semibold">${item.price}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="h-px bg-gray-200 my-2" />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 flex items-center justify-center space-x-2"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Place Order</span>
            </button>

            <p className="text-sm text-gray-600 text-center">
              Your payment information is encrypted and secure
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;