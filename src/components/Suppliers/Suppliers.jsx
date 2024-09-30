import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cart from "./Cart";
import { db } from "../../../firebase";
import { collection, getDocs } from "firebase/firestore";

const SupplierList = () => {
  const [selectedProductIds, setSelectedProductIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState([]);
  const [cartVisible, setCartVisible] = useState(false);
  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  const navigate = useNavigate();

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

  useEffect(() => {
    const fetchSuppliers = async () => {
      const suppliersCollection = collection(db, "Suppliers");
      const supplierSnapshot = await getDocs(suppliersCollection);
      const supplierList = supplierSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSuppliers(supplierList);
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
        <h1 className="text-4xl font-bold text-green-600">Supplier Product Analysis</h1>
        <input
          type="text"
          className="border border-gray-300 rounded-md p-3 w-full max-w-md text-gray-700 focus:outline-none focus:border-green-500 transition duration-200"
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

      <div className="h-[85%] overflow-auto bg-slate-100 p-4 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedProducts.length > 0 ? (
            displayedProducts.map((product) => (
              <div
                key={product.id}
                className={`bg-white shadow-md hover:shadow-lg transition-shadow duration-300 rounded-lg p-4 cursor-pointer flex flex-col justify-between`}
              >
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    {product.name}
                  </h2>
                  <p className="text-gray-600 mb-2">
                    <span className="font-semibold">Supplier ID:</span> {product.supplier_id}
                  </p>
                  <p className="text-gray-600 mb-2">
                    <span className="font-semibold">Cost:</span> ₹{product.cost}
                  </p>
                  <p className="text-gray-600 mb-4">
                    <span className="font-semibold">Available:</span> {product.quantity_available}
                  </p>
                  <button
                    className="mt-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow transition-colors duration-300"
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
                          state: { supplier },
                        });
                      } else {
                        alert("Supplier not found.");
                      }
                    }}
                  >
                    View Supplier Details
                  </button>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedProductIds.includes(product.id)}
                    onChange={() => toggleProductSelection(product.id)}
                    className="mr-2"
                  />
                  <span className="text-gray-600">Select</span>
                </div>
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
