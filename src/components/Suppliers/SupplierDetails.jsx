import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { db } from '../../../firebase';
import { collection, getDocs } from "firebase/firestore";
import { motion } from "framer-motion"; // Import Framer Motion for animations
import Layout from "../Layout";

const SupplierDetails = () => {
  const { supplierId } = useParams();
  const [suppliers, setSuppliers] = useState([]);
  const [supplier, setSupplier] = useState();

  useEffect(() => {
    const fetchSuppliers = async () => {
      const suppliersCollection = collection(db, "Suppliers");
      const supplierSnapshot = await getDocs(suppliersCollection);
      const supplierList = supplierSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSuppliers(supplierList);

      const foundSupplier = supplierList.find(s => s.id === supplierId);
      setSupplier(foundSupplier);
    };

    fetchSuppliers();
  }, [supplierId]);

  if (!supplier) {
    return <div>Loading...</div>;
  }

  console.log(supplier);

  return (
    <Layout>
      <motion.div 
      className="bg-white shadow-lg rounded-xl w-full p-8 sm:p-12 relative overflow-hidden"
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.5 }}
    >
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
        <h1 className="text-3xl font-extrabold text-green-900 mb-4 lg:mb-0">
          {supplier.name} - {supplier.location}
        </h1>
        <span className="text-gray-600 text-lg">Request ID: <strong>{supplierId}</strong></span>
      </div>

      {/* Status Section */}
      <div className="flex justify-between items-center space-x-4 mb-8">
        <div className="flex items-center space-x-2 text-sm">
          <div className="bg-green-300 text-green-800 py-2 px-4 rounded-lg shadow">
            Request Made
          </div>
          <div className="bg-yellow-300 text-yellow-800 py-2 px-4 rounded-lg shadow">
            Inspector Assigned
          </div>
          <div className="bg-orange-300 text-orange-800 py-2 px-4 rounded-lg shadow">
            Vendor Work In Progress
          </div>
          <div className="bg-red-300 text-red-800 py-2 px-4 rounded-lg shadow">
            Final Inspection Pending
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Section: Items Supplied & Description */}
        <div className="w-full lg:w-2/3">
          {/* Items Supplied */}
          <h3 className="text-2xl font-bold text-green-900 mb-6">
            Items Supplied
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
            {supplier.items.map((item, index) => (
              <motion.div
                key={index}
                className="relative bg-cover bg-center w-full rounded-lg shadow-md h-40 flex items-end overflow-hidden"
                style={{
                  backgroundImage: `url(${item.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 rounded-b-lg w-full">
                  <h4 className="text-lg font-semibold text-white">{item.name}</h4>
                  <p className="text-sm text-gray-300"><strong>Cost:</strong> ${item.price}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Description */}
          <h3 className="text-2xl font-bold text-green-900 mb-4">
            Description
          </h3>
          <p className="text-base text-gray-700 mb-8">{supplier.description}</p>

          {/* Testimonials */}
          <h3 className="text-2xl font-bold text-green-900 mb-4">
            Testimonials
          </h3>
          <ul className="list-none text-base text-gray-700 space-y-4">
            {supplier.testimonials.map((testimonial, index) => (
              <li key={index} className="bg-gray-100 p-4 rounded-lg shadow-sm">
                “{testimonial}”
              </li>
            ))}
          </ul>
        </div>

        {/* Right Section: Contact & Payment Details */}
        <div className="w-full lg:w-1/3 bg-gray-50 p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-green-900 mb-6">Contact & Business Hours</h3>

          {/* Contact Details */}
          <p className="text-base text-gray-700 mb-4">
            <strong className="text-green-700">Location:</strong> {supplier.location}
          </p>
          <p className="text-base text-gray-700 mb-4">
            <strong className="text-green-700">Email:</strong>{" "}
            <a href={`mailto:${supplier.contact.email}`} className="text-green-600 hover:text-green-700 transition">
              {supplier.contact.email}
            </a>
          </p>
          <p className="text-base text-gray-700 mb-8">
            <strong className="text-green-700">Phone:</strong> {supplier.contact.phone}
          </p>

          {/* Business Hours */}
          <h4 className="text-lg font-semibold text-green-900 mb-4">Business Hours</h4>
          <ul className="list-none text-base text-gray-700 mb-8">
            <li><strong>Mon-Fri:</strong> {supplier.businessHours.mondayToFriday}</li>
            <li><strong>Saturday:</strong> {supplier.businessHours.saturday}</li>
            <li><strong>Sunday:</strong> {supplier.businessHours.sunday}</li>
          </ul>

          {/* Payment Methods */}
          <h4 className="text-lg font-semibold text-green-900 mb-4">Payment Methods</h4>
          <ul className="list-disc pl-5 text-base text-gray-700 mb-6">
            {supplier.paymentMethods.map((method, index) => (
              <li key={index}>{method}</li>
            ))}
          </ul>

          {/* Accepted Currencies */}
          <p className="text-base text-gray-700 mb-4">
            <strong className="text-green-700">Accepted Currencies:</strong>{" "}
            {supplier.acceptedCurrencies.join(", ")}
          </p>

          {/* Social Media Links */}
          <h4 className="text-lg font-semibold text-green-900 mb-4">Follow Us</h4>
          <div className="flex space-x-4 text-green-600">
            <a href={supplier.socialMediaLinks.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href={supplier.socialMediaLinks.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href={supplier.socialMediaLinks.twitter} target="_blank" rel="noopener noreferrer">Twitter</a>
          </div>
        </div>
      </div>

      {/* Footer Action Buttons */}
      <div className="flex justify-end mt-10">
        <motion.button
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-8 rounded-lg shadow-md"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Contact Supplier
        </motion.button>
      </div>
    </motion.div>
    </Layout>
  );
};

export default SupplierDetails;
