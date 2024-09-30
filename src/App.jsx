import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Test from "./components/Test";
import MapTest from "./components/MapTest";
import Heatmap from "./components/MapTest";
import PermissionLetterGenerator from "./components/AIGrantLetter";
import SupplierList from "./components/Suppliers/Suppliers";
import SupplierDetails from "./components/Suppliers/SupplierDetails";

function App() {
  const supplier = {
    id: 4,
    name: "Home Comforts",
    location: "Houston, TX",
    items: [
      {
        name: "Blankets",
        price: 100, // Cost in USD
        image:
          "https://m.media-amazon.com/images/I/71QETt3mlAL._AC_SL1500_.jpg", // Image of a blanket
      },
      {
        name: "Sleeping Bags",
        price: 200,
        image:
          "https://m.media-amazon.com/images/I/81Q8FDiMHoL._AC_SL1500_.jpg", // Image of a sleeping bag
      },
      {
        name: "Pillows",
        price: 50,
        image:
          "https://m.media-amazon.com/images/I/81mPUSyI8DL._AC_SL1500_.jpg", // Image of a pillow
      },
      {
        name: "Mattresses",
        price: 500,
        image:
          "https://m.media-amazon.com/images/I/71I2Z5U-p8L._AC_SL1500_.jpg", // Image of a mattress
      },
      {
        name: "Comforters",
        price: 150,
        image:
          "https://m.media-amazon.com/images/I/71ig2VsmhXL._AC_SL1500_.jpg", // Image of a comforter
      },
    ],
    description:
      "Home Comforts supplies essential items for comfort and warmth, ensuring the highest quality for long-lasting use. We specialize in providing durable, comfortable, and affordable bedding materials.",
    contact: {
      email: "info@homecomforts.com",
      phone: "+1-555-333-4444",
    },
    rating: 4.5, // Average rating out of 5
    testimonials: [
      "Great service and products!",
      "Highly recommend Home Comforts for their quality!",
      "Products were delivered on time and exceeded expectations.",
      "Excellent customer support. Will order again.",
    ],
    yearsInBusiness: 10, // Years of experience in the business
    deliveryOptions: ["Standard Shipping", "Express Shipping", "Local Pickup"],
    paymentMethods: ["Credit Card", "PayPal", "Bank Transfer"],
    acceptedCurrencies: ["USD", "EUR", "GBP"], // Supported currencies
    paymentGateways: ["Stripe", "PayPal", "Square"], // Payment gateways used
    termsOfPayment: {
      upfront: "50% deposit required at the time of order",
      uponDelivery: "Remaining 50% due upon delivery",
      installmentOptions: "Flexible payment plans available for large orders",
    },
    businessHours: {
      mondayToFriday: "9:00 AM - 6:00 PM",
      saturday: "10:00 AM - 4:00 PM",
      sunday: "Closed",
    },
    socialMediaLinks: {
      facebook: "https://facebook.com/homecomforts",
      instagram: "https://instagram.com/homecomforts",
      twitter: "https://twitter.com/homecomforts",
    },
  };

  return (
    <>
      <div className="w-[100%] min-h-[100vh]">
        {/* <SupplierDetails supplier={supplier} /> */}
        <SupplierList />
        {/* <PermissionLetterGenerator /> */}
        {/* <Heatmap /> */}
        {/* <Test /> */}
      </div>
    </>
  );
}

export default App;
