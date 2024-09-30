import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import Cart from "./Cart"; // Import the Cart component
import { db } from "../../../firebase";
import { collection, getDocs } from "firebase/firestore";

const SupplierList = () => {
  const [selectedProductIds, setSelectedProductIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState([]);
  const [cartVisible, setCartVisible] = useState(false);
  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]); // State to hold supplier list

  const navigate = useNavigate(); // Initialize useNavigate for navigation

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

  // Fetch suppliers from Firestore
  useEffect(() => {
    const fetchSuppliers = async () => {
      const suppliersCollection = collection(db, "Suppliers");
      const supplierSnapshot = await getDocs(suppliersCollection);
      const supplierList = supplierSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSuppliers(supplierList); // Store suppliers in state
    };

    fetchSuppliers();
  }, []);

  const handleCompare = () => {
    if (selectedProductIds.length === 2) {
      const selectedProducts = products.filter((p) =>
        selectedProductIds.includes(p.id)
      );
      console.log("Comparing products:", selectedProducts);
    } else {
      alert("Please select exactly 2 products to compare.");
    }
  };

  const toggleProductSelection = (productId) => {
    if (selectedProductIds.includes(productId)) {
      setSelectedProductIds(
        selectedProductIds.filter((id) => id !== productId)
      );
    } else if (selectedProductIds.length < 2) {
      setSelectedProductIds([...selectedProductIds, productId]);
    }
  };

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

  const toggleCart = () => {
    setCartVisible(!cartVisible);
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
                onClick={() => toggleProductSelection(product.id)}
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
                    const supplier = suppliers.find(
                      (sup) => sup.id === product.supplier_id
                    );
                    if (supplier) {
                      navigate(`/supplier-details/${supplier.id}`, {
                        state: { supplier }, // Pass supplier as state
                      });
                    } else {
                      alert("Supplier not found.");
                    }
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

      {cartVisible && <Cart cart={cart} onClose={toggleCart} />}
    </div>
  );
};

export default SupplierList;
