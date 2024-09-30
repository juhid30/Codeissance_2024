// utils.js

import { getFirestore, collection, addDoc } from "firebase/firestore";
import { products } from "./data";
import { suppliers } from "./data";
// Initialize Firestore
const db = getFirestore();

export async function uploadProducts() {
  const productsCollection = collection(db, "Products");

  for (const product of products) {
    try {
      // Add each product as a new document
      const docRef = await addDoc(productsCollection, product);
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding product document: ", e);
    }
  }
}

export async function uploadSuppliers() {
  const suppliersCollection = collection(db, "Suppliers");

  for (const supplier of suppliers) {
    try {
      // Add each supplier as a new document
      const docRef = await addDoc(suppliersCollection, supplier);
      console.log("Supplier document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding supplier document: ", e);
    }
  }
}

// Call the functions to upload products and suppliers
// uploadProducts();
// uploadSuppliers();
