import React, { useState } from "react";
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const Cart = ({ cart, onClose }) => {
  const [deliveryFee] = useState(16); // Fixed delivery fee
  const [vatRate] = useState(0.2); // VAT rate 20%
  const [quantity, setQuantity] = useState(
    cart.reduce((acc, item) => {
      acc[item.id] = 1; // Initialize quantity for each item
      return acc;
    }, {})
  );

  const handleQuantityChange = (id, increment) => {
    setQuantity((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + increment), // Ensure quantity does not go below 1
    }));
  };

  const handlePayment = async () => {
    const db = getFirestore(); // Initialize Firestore
    const categories = ['food', 'bills', 'entertainment', 'misc'];
    const expenseArray = cart.map(item => {
      const amount = item.cost * (quantity[item.id] || 1);
      const date = new Date().toLocaleDateString('en-GB', {
        day: 'numeric', month: 'long', year: 'numeric'
      });
      let expenseIcon;
      const randomCategory = categories[Math.floor(Math.random() * categories.length)];
  
      // Determine icon based on randomly assigned type
      switch (randomCategory) {
        case 'food':
          expenseIcon = "ri-restaurant-fill text-[20px]";
          break;
        case 'bills':
          expenseIcon = "ri-bill-line text-[20px]";
          break;
        case 'entertainment':
          expenseIcon = "ri-sofa-line text-[20px]";
          break;
        case 'misc':
          expenseIcon = "ri-wallet-line text-[20px]";
          break;
        default:
          expenseIcon = "";
      }
  
      return {
        amount,
        date,
        icon: expenseIcon,
        name: item.name,
        spent: true,
        type: randomCategory, // Assigning random type
      };
    });

    // Upload each expense to Firestore
    try {
      const expensesCollection = collection(db, "Expenses");
      for (const expense of expenseArray) {
        await addDoc(expensesCollection, expense);
      }
      console.log("Expenses uploaded successfully!");
    } catch (error) {
      console.error("Error uploading expenses: ", error);
    }
    
    alert("Payment processed successfully!");
    onClose();
  };

  const calculateSubtotal = () => {
    return cart.reduce((acc, item) => {
      return acc + item.cost * (quantity[item.id] || 1);
    }, 0);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const vat = subtotal * vatRate;
    return subtotal + vat + deliveryFee;
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Shopping Cart ({cart.length})</h2>
        <div className="mb-4">
          {cart.length === 0 ? (
            <p className="text-gray-600">Your cart is empty.</p>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b pb-4 mb-4"
              >
                <div className="flex items-start">
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-20 h-20 object-cover mr-4"
                  />
                  <div>
                    <span className="font-semibold">{item.name}</span>
                    <p className="text-green-600">In Stock</p>
                    <p className="text-gray-600">Color: Space Gray</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={() => handleQuantityChange(item.id, -1)}
                    className="bg-gray-200 rounded px-2"
                  >
                    -
                  </button>
                  <span className="mx-2">{quantity[item.id]}</span>
                  <button
                    onClick={() => handleQuantityChange(item.id, 1)}
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
        <div className="border-t border-gray-300 pt-4">
          <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
          <div className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span>₹{calculateSubtotal().toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Shipping</span>
            <span>₹{deliveryFee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>VAT (20%)</span>
            <span>₹{(calculateSubtotal() * vatRate).toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>₹{calculateTotal().toFixed(2)}</span>
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
