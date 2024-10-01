import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import Cart from "./Cart"; 
import { db } from "../../../firebase";
import { collection, getDocs } from "firebase/firestore";
import Layout from '../Layout';
import { motion } from "framer-motion";
import axios from 'axios';


const SupplierList = () => {
  const [selectedProductIds, setSelectedProductIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState([]);
  const [cartVisible, setCartVisible] = useState(false);
  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [randomText, setRandomText] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

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
    function convertArrayToJSON(arr) {
      const result = {};
      
      arr.forEach((item, index) => {
        const key = `prod${index + 1}`;
        result[key] = item;
      });
      
      return result;
    }
  
    if (selectedProductIds.length === 2) {
      const selectedProducts = products.filter((p) =>
        selectedProductIds.includes(p.id)
      );
  
      console.log(selectedProducts);
  
      const jsonResult = convertArrayToJSON(selectedProducts);
      const compareApiReq = JSON.stringify(jsonResult, null, 2);
  
      // Hit the API using Axios
      axios.post('https://bnhjv034-5000.inc1.devtunnels.ms/compare', compareApiReq, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          console.log('API Response:', response.data);
          const match = selectedProducts.find(product => 
            product.name === response.data.selected_product.name && 
            product.cost === response.data.selected_product.cost
        );
          setSelectedProduct(match)
          setRandomText(response.data.summary);
          setModalVisible(true);
        })
        .catch((error) => {
          console.error('There was a problem with the fetch operation:', error);
        });
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

  const closeModal = () => {
    setModalVisible(false);
    setRandomText("");
    setSelectedProduct(null);
    setSelectedProductIds([]);
  };

  return (
    <Layout>
      <div className="w-full h-[90vh] bg-gray-50 p-6">
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

        <div className="h-[85%] invisible-scrollbar overflow-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto scrollbar-hide smooth-scroll">
            {displayedProducts.length > 0 ? (
              displayedProducts.map((product) => (
                <motion.div
                  key={product.id}
                  className={`bg-white shadow-md hover:shadow-lg transition-shadow duration-300 border-2 p-6 rounded-lg cursor-pointer transform ${
                    selectedProductIds.includes(product.id)
                      ? "border-green-500 bg-green-100" 
                      : "border-gray-200"
                  }`}
                  onClick={() => toggleProductSelection(product.id)}
                  layout 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="flex items-center mb-4">
                    <div
                      className={`w-5 h-5 rounded-full border-2 mr-4 ${
                        selectedProductIds.includes(product.id)
                          ? "border-green-500 bg-green-500"
                          : "border-gray-400 bg-white"
                      }`}
                    />
                    <h2 className="text-2xl font-semibold text-gray-800">
                      {product.name}
                    </h2>
                  </div>
                  <p className="text-gray-600 mb-2">
                    <span className="font-semibold">Supplier ID:</span> {product.supplier_id}
                  </p>
                  <p className="text-gray-600 mb-2">
                    <span className="font-semibold">Cost:</span> ₹{product.cost}
                  </p>
                  <p className="text-gray-600 mb-2">
                    <span className="font-semibold">Available:</span> {product.quantity_available}
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
                    className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow transition-colors duration-300 ml-3"
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
                </motion.div>
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

        {modalVisible && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-60">
            <div className="bg-white p-8 rounded-lg shadow-lg w-1/3 max-w-sm">
              <h2 className="text-3xl font-semibold mb-4">Comparison Result</h2>
              <p className="text-gray-700 mb-4">{randomText}</p>
              {selectedProduct && (
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <h3 className="text-lg font-medium mb-2">Selected Product:</h3>
                  <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
                    <h4 className="text-xl font-bold mb-1">{selectedProduct.name}</h4>
                    <p className="text-gray-600 text-lg">Cost: <span className="font-semibold text-green-600">₹{selectedProduct.cost}</span></p>
                  </div>
                  <button
                    className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition duration-300"
                    onClick={() => addToCart(selectedProduct)}
                  >
                    Add to Cart
                  </button>
                </div>
              )}
              <button
                className="mt-4 w-full bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg transition duration-300"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SupplierList;
