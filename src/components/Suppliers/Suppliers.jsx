import React, { useState } from "react";

const SupplierList = () => {
  const [selectedSuppliers, setSelectedSuppliers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState([]);

  // Define supplier list with additional items
  const suppliers = [
    {
      id: 1,
      name: "Supplier A",
      location: "Mumbai",
      cost: 15000,
      items: ["Food Boxes", "Stationery Kits"],
    },
    {
      id: 2,
      name: "Supplier B",
      location: "Delhi",
      cost: 12000,
      items: ["Hygiene Kits", "Paper Bags"],
    },
    {
      id: 3,
      name: "Supplier C",
      location: "Kolkata",
      cost: 18000,
      items: ["First Aid Kits", "Infant Formula", "Blankets"],
    },
    {
      id: 4,
      name: "Supplier D",
      location: "Pune",
      cost: 13000,
      items: ["Toys and Games for Children", "Backpacks"],
    },
    {
      id: 5,
      name: "Supplier E",
      location: "Chennai",
      cost: 14000,
      items: ["Canned Goods", "Blankets", "Paper Bags"],
    },
  ];

  const handleCompare = () => {
    if (selectedSuppliers.length === 2) {
      console.log("Comparing suppliers:", selectedSuppliers);
    } else {
      alert("Please select exactly 2 suppliers to compare.");
    }
  };

  const toggleSupplierSelection = (supplier) => {
    if (selectedSuppliers.includes(supplier)) {
      // Deselecting supplier
      setSelectedSuppliers(selectedSuppliers.filter((s) => s !== supplier));
    } else if (selectedSuppliers.length < 2) {
      // Selecting supplier if less than 2 are selected
      setSelectedSuppliers([...selectedSuppliers, supplier]);
    }
  };

  // Filter suppliers based on search term
  const filteredSuppliers = suppliers.filter((supplier) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      supplier.name.toLowerCase().includes(searchLower) ||
      supplier.items.some((item) => item.toLowerCase().includes(searchLower))
    );
  });

  const addToCart = (supplier) => {
    setCart((prevCart) => {
      if (!prevCart.includes(supplier)) {
        return [...prevCart, supplier];
      }
      return prevCart;
    });
  };

  return (
    <div className="w-full h-screen bg-gray-50 p-6">
      {/* Header section with title, search input, and compare button */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-extrabold text-green-600">
          Supplier Cost Analysis
        </h1>
        <input
          type="text"
          className="border-2 border-gray-300 rounded-md p-3 w-full max-w-md text-gray-700 focus:outline-none focus:border-green-500 transition duration-200"
          placeholder="Search suppliers or items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          onClick={handleCompare}
          className="ml-4 bg-green-600 hover:bg-green-700 text-white p-3 px-6 rounded-full shadow-lg transition-all duration-300"
        >
          Compare
        </button>
      </div>

      {/* Supplier List Section with smooth scroll */}
      <div className="h-[85%] invisible-scrollbar overflow-auto bg-slate-800">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto scrollbar-hide smooth-scroll">
          {filteredSuppliers.length > 0 ? (
            filteredSuppliers.map((supplier) => (
              <div
                key={supplier.id}
                className={`bg-white shadow-md hover:shadow-lg transition-shadow duration-300 border-2 p-6 rounded-lg cursor-pointer transform ${
                  selectedSuppliers.includes(supplier)
                    ? "border-green-500 bg-green-50 scale-105" // Change the background color when selected
                    : "border-gray-200"
                }`}
                onClick={() => {
                  if (
                    selectedSuppliers.length < 2 ||
                    selectedSuppliers.includes(supplier)
                  ) {
                    toggleSupplierSelection(supplier);
                    console.log("HIII");
                  }
                }}
              >
                <div className="flex items-center mb-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent triggering the card click
                      toggleSupplierSelection(supplier);
                    }}
                    className={`bg-green-500 rounded-full h-12 w-12 flex items-center justify-center border-2 ${
                      selectedSuppliers.includes(supplier)
                        ? "border-green-700"
                        : "border-gray-300"
                    }`}
                  >
                    {selectedSuppliers.includes(supplier) ? (
                      <span className="text-white text-xl bg-red-900 font-bold">
                        ✔
                      </span>
                    ) : (
                      <span className="text-white text-xl font-bold">
                        {supplier.name[0]}
                      </span>
                    )}
                  </button>
                  <h2 className="ml-4 text-2xl font-semibold text-gray-800">
                    {supplier.name}
                  </h2>
                </div>
                <p className="text-gray-600 mb-2">
                  <span className="font-semibold">Location:</span>{" "}
                  {supplier.location}
                </p>
                <p className="text-gray-600 mb-2">
                  <span className="font-semibold">Cost:</span> ₹{supplier.cost}
                </p>
                <p className="text-gray-600 mb-2">
                  <span className="font-semibold">Items:</span>{" "}
                  {supplier.items.join(", ")}
                </p>
                <button
                  className="mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow transition-colors duration-300"
                  onClick={() => addToCart(supplier)}
                >
                  Add to Cart
                </button>
                <button
                  className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow transition-colors duration-300"
                  onClick={() =>
                    console.log(`View details of ${supplier.name}`)
                  }
                >
                  View Supplier Details
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-xl font-semibold col-span-3 text-center">
              No suppliers found for the searched item.
            </p>
          )}
        </div>
      </div>

      {/* Cart Icon */}
      <div className="fixed bottom-5 right-5 bg-green-600 p-4 rounded-full shadow-lg transition-all duration-300 hover:bg-green-700">
        <span className="text-white font-bold">{cart.length}</span>
      </div>
    </div>
  );
};

export default SupplierList;
