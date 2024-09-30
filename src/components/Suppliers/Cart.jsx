import React, { useState } from "react";

const Cart = ({ cart, onClose }) => {
  const [deliveryFee] = useState(20); // Set a fixed delivery fee
  const [quantity, setQuantity] = useState(
    cart.reduce((acc, supplier) => {
      acc[supplier.id] = 1; // Initialize quantity for each item
      return acc;
    }, {})
  );

  const handleQuantityChange = (id, increment) => {
    setQuantity((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + increment), // Ensure quantity does not go below 1
    }));
  };

  const handlePayment = () => {
    alert("Payment processed successfully!");
    onClose();
  };

  const calculateTotal = () => {
    const productTotal = cart.reduce((acc, supplier) => {
      return acc + supplier.cost * (quantity[supplier.id] || 1);
    }, 0);
    return productTotal + deliveryFee;
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-green-50 rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-2xl font-bold mb-4">My Cart ({cart.length})</h2>
        <div className="mb-4">
          <p className="font-semibold">Choose All Product</p>
          {cart.length === 0 ? (
            <p className="text-gray-600">Your cart is empty.</p>
          ) : (
            cart.map((supplier) => (
              <div
                key={supplier.id}
                className="flex justify-between items-center mb-3"
              >
                <div>
                  <span className="font-semibold">{supplier.name}</span>
                  <p className="text-gray-600">Price: ₹{supplier.cost}</p>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={() => handleQuantityChange(supplier.id, -1)}
                    className="bg-gray-200 rounded px-2"
                  >
                    -
                  </button>
                  <span className="mx-2">{quantity[supplier.id]}</span>
                  <button
                    onClick={() => handleQuantityChange(supplier.id, 1)}
                    className="bg-gray-200 rounded px-2"
                  >
                    +
                  </button>
                  <button className="ml-2 text-red-500">🗑️</button>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="border-t border-gray-300 mt-4 pt-4">
          <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
          <div className="flex justify-between">
            <span>Delivery Fee</span>
            <span>₹{deliveryFee}</span>
          </div>
          <div className="flex justify-between font-bold">
            <span>Total Amount</span>
            <span>₹{calculateTotal()}</span>
          </div>
        </div>
        <button
          onClick={handlePayment}
          className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow transition-colors duration-300"
        >
          Checkout
        </button>
        <button
          onClick={onClose}
          className="mt-2 w-full text-gray-500 underline"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Cart;
