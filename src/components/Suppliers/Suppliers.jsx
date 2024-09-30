import React, { useEffect, useState } from "react";
import Cart from "./Cart"; // Import the Cart component
import SupplierDetails from "./SupplierDetails"; // Import the SupplierDetails component
import { db } from "../../../firebase";
import { collection, getDocs } from "firebase/firestore";

const SupplierList = () => {
  const [selectedProductIds, setSelectedProductIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState([]);
  const [cartVisible, setCartVisible] = useState(false); // State to manage cart visibility
  const [products, setProducts] = useState([]); // State to hold products
  const [supplierDetails, setSupplierDetails] = useState(null); // State to hold supplier details
  const [supplierDetailsVisible, setSupplierDetailsVisible] = useState(false); // State to manage supplier details visibility

  // Fetch products from Firestore
  useEffect(() => {
    const fetchProducts = async () => {
      const productsCollection = collection(db, "Products");
      const productSnapshot = await getDocs(productsCollection);
      const productList = productSnapshot.docs.map((doc) => ({
        id: doc.data().id,
        name: doc.data().name,
        cost: doc.data().cost,
        description: doc.data().description,
        image_url: doc.data().image_url,
        quantity_available: doc.data().quantity_available,
        supplier_id: doc.data().supplier_id,
      }));
      setProducts(productList);
    };

    fetchProducts();
  }, []);

  // Fetch supplier details based on supplier ID
  const fetchSupplierDetails = async (supplierId) => {
    try {
      const suppliersCollection = collection(db, "Suppliers"); // Ensure collection name is correct
      const supplierSnapshot = await getDocs(suppliersCollection);

      // Log the data of the first document for debugging
      if (supplierSnapshot.docs.length > 0) {
        console.log("First Supplier Data:", supplierSnapshot.docs[0].data());
      }

      // Map through the document snapshots to extract data
      const suppliers = supplierSnapshot.docs.map((doc) => {
        const data = doc.data(); // Get document data
        console.log("Supplier Document ID:", doc.id); // Log the document ID
        console.log("Supplier Data:", data); // Log the data for each document

        return {
          id: doc.id, // Use the document ID directly
          ...data, // Spread the document data into an object
        };
      });

      console.log("All Suppliers:", suppliers); // Log all suppliers

      // Find the supplier with the given ID
      const supplier = suppliers.find((supplier) => supplier.id === supplierId);

      if (supplier) {
        setSupplierDetails(supplier);
        setSupplierDetailsVisible(true);
      } else {
        alert("Supplier not found.");
      }
    } catch (error) {
      console.error("Error fetching suppliers:", error); // Log any errors
    }
  };

  const handleCompare = () => {
    if (selectedProductIds.length === 2) {
      const selectedProducts = products.filter((p) =>
        selectedProductIds.includes(p.id)
      );
      console.log("Comparing products:", selectedProducts);
      // You can open a modal or display results here
    } else {
      alert("Please select exactly 2 products to compare.");
    }
  };

  const toggleProductSelection = (productId) => {
    if (selectedProductIds.includes(productId)) {
      // Deselect the product
      setSelectedProductIds(
        selectedProductIds.filter((id) => id !== productId)
      );
    } else if (selectedProductIds.length < 2) {
      // Select the product if less than 2 are selected
      setSelectedProductIds([...selectedProductIds, productId]);
    }
  };

  // Filter products based on search term
  const filteredProducts = products.filter((product) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      product.name.toLowerCase().includes(searchLower) ||
      product.description.toLowerCase().includes(searchLower)
    );
  });

  const displayedProducts =
    filteredProducts.length > 0
      ? filteredProducts
      : products.filter((product) => selectedProductIds.includes(product.id));

  const addToCart = (product) => {
    setCart((prevCart) => {
      if (!prevCart.includes(product)) {
        return [...prevCart, product];
      }
      return prevCart;
    });
  };

  // Function to toggle the visibility of the cart
  const toggleCart = () => {
    setCartVisible(!cartVisible);
  };

  // Function to close supplier details
  const closeSupplierDetails = () => {
    setSupplierDetailsVisible(false);
    setSupplierDetails(null);
  };

  return (
    <div className="w-full h-screen bg-gray-50 p-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-extrabold text-green-600">
          Supplier Product Analysis
        </h1>
        <input
          type="text"
          className="border-2 border-gray-300 rounded-md p-3 w-full max-w-md text-gray-700 focus:outline-none focus:border-green-500 transition duration-200"
          placeholder="Search products..."
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

      <div className="h-[85%] invisible-scrollbar overflow-auto bg-slate-800">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto scrollbar-hide smooth-scroll">
          {displayedProducts.length > 0 ? (
            displayedProducts.map((product) => (
              <div
                key={product.id}
                className={`bg-white shadow-md hover:shadow-lg transition-shadow duration-300 border-2 p-6 rounded-lg cursor-pointer transform ${
                  selectedProductIds.includes(product.id)
                    ? "border-gray-200 bg-green-100 scale-100"
                    : "border-gray-200"
                }`}
                onClick={() => toggleProductSelection(product.id)} // Select card on click
              >
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedProductIds.includes(product.id)}
                    onChange={() => toggleProductSelection(product.id)}
                    className="mr-4"
                  />
                  <h2 className="text-2xl font-semibold text-gray-800">
                    {product.name}
                  </h2>
                </div>
                <p className="text-gray-600 mb-2">
                  <span className="font-semibold">Supplier ID:</span>{" "}
                  {product.supplier_id}
                </p>
                <p className="text-gray-600 mb-2">
                  <span className="font-semibold">Cost:</span> ₹{product.cost}
                </p>
                <p className="text-gray-600 mb-2">
                  <span className="font-semibold">Available:</span>{" "}
                  {product.quantity_available}
                </p>
                <button
                  className="mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow transition-colors duration-300"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product);
                  }}
                >
                  Add to Cart
                </button>
                <button
                  className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow transition-colors duration-300"
                  onClick={(e) => {
                    e.stopPropagation();
                    fetchSupplierDetails(product.supplier_id); // Fetch supplier details on click
                  }}
                >
                  View Supplier Details
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-xl font-semibold col-span-3 text-center">
              No products found for the searched term.
            </p>
          )}
        </div>
      </div>

      <div className="fixed bottom-5 right-5 bg-green-600 p-4 rounded-full shadow-lg transition-all duration-300 hover:bg-green-700">
        <span className="text-white font-bold" onClick={toggleCart}>
          {cart.length}
        </span>
      </div>

      {/* Conditionally render the Cart component */}
      {cartVisible && <Cart cart={cart} onClose={toggleCart} />}

      {/* Conditionally render the SupplierDetails component */}
      {supplierDetailsVisible && (
        <SupplierDetails
          supplier={supplierDetails}
          onClose={closeSupplierDetails}
        />
      )}
    </div>
  );
};

export default SupplierList;
