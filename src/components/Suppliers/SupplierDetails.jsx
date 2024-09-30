import React from "react";

const SupplierDetails = ({ supplier }) => {
  return (
    <div className="bg-white shadow-2xl rounded-xl w-full p-8 relative overflow-hidden">
      {/* Header */}
      <h1 className="text-4xl font-extrabold text-green-800 mb-8 text-center">
        {supplier.name}
      </h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Section: Supply Material */}
        <div className="w-full lg:w-2/3">
          <h3 className="text-2xl font-bold text-green-800 mb-4">
            Items Supplied
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {supplier.items.map((item, index) => (
              <div
                key={index}
                className="relative bg-cover bg-center w-34 rounded-xl shadow-lg h-36 flex items-end overflow-hidden" // Adjusted height to h-48
                style={{
                  backgroundImage: `url(${item.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {/* Overlay for the cost and item details */}
                <div className="bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 rounded-b-xl w-full">
                  {" "}
                  {/* Adjusted padding */}
                  <h4 className="text-lg font-semibold text-white">
                    {" "}
                    {/* Adjusted font size */}
                    {item.name}
                  </h4>
                  <p className="text-md text-gray-300">
                    {" "}
                    {/* Adjusted font size */}
                    <strong>Cost:</strong> ${item.price}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <h3 className="text-2xl font-bold text-green-800 mt-8 mb-4">
            Description
          </h3>
          <p className="text-lg text-gray-700 mb-6">{supplier.description}</p>

          <h3 className="text-2xl font-bold text-green-800 mb-4">
            Testimonials
          </h3>
          <ul className="list-none text-lg text-gray-700 leading-relaxed space-y-4">
            {supplier.testimonials.map((testimonial, index) => (
              <li key={index} className="bg-green-100 p-4 rounded-xl shadow-md">
                “{testimonial}”
              </li>
            ))}
          </ul>
        </div>

        {/* Right Section: Contact & Payment Details */}
        <div className="w-full lg:w-1/3">
          <h3 className="text-2xl font-bold text-green-800 mb-4">
            Contact & Details
          </h3>
          <p className="text-lg text-gray-700 mb-4">
            <strong className="text-green-600">Location:</strong>{" "}
            {supplier.location}
          </p>
          <p className="text-lg text-gray-700 mb-4">
            <strong className="text-green-600">Email:</strong>{" "}
            <a
              href={`mailto:${supplier.contact.email}`}
              className="text-green-500 hover:text-green-600 transition duration-300"
            >
              {supplier.contact.email}
            </a>
          </p>
          <p className="text-lg text-gray-700 mb-4">
            <strong className="text-green-600">Phone:</strong>{" "}
            {supplier.contact.phone}
          </p>

          {/* Business Hours */}
          <h3 className="text-2xl font-bold text-green-800 mb-4">
            Business Hours
          </h3>
          <ul className="list-none text-lg text-gray-700 mb-6">
            <li>
              <strong>Mon-Fri:</strong> {supplier.businessHours.mondayToFriday}
            </li>
            <li>
              <strong>Saturday:</strong> {supplier.businessHours.saturday}
            </li>
            <li>
              <strong>Sunday:</strong> {supplier.businessHours.sunday}
            </li>
          </ul>

          {/* Payment Methods */}
          <h3 className="text-2xl font-bold text-green-800 mb-4">
            Payment Methods
          </h3>
          <ul className="list-disc pl-5 text-lg text-gray-700 mb-6">
            {supplier.paymentMethods.map((method, index) => (
              <li key={index}>{method}</li>
            ))}
          </ul>

          <p className="text-lg text-gray-700 mb-4">
            <strong className="text-green-600">Accepted Currencies:</strong>{" "}
            {supplier.acceptedCurrencies.join(", ")}
          </p>

          <h3 className="text-2xl font-bold text-green-800 mb-4">
            Payment Terms
          </h3>
          <ul className="list-disc pl-5 text-lg text-gray-700 mb-6">
            <li>
              <strong>Upfront:</strong> {supplier.termsOfPayment.upfront}
            </li>
            <li>
              <strong>Upon Delivery:</strong>{" "}
              {supplier.termsOfPayment.uponDelivery}
            </li>
            <li>
              <strong>Installments:</strong>{" "}
              {supplier.termsOfPayment.installmentOptions}
            </li>
          </ul>

          {/* Social Media Links */}
          <h3 className="text-2xl font-bold text-green-800 mb-4">Follow Us</h3>
          <div className="flex space-x-4 text-green-600">
            <a
              href={supplier.socialMediaLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>
            <a
              href={supplier.socialMediaLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
            <a
              href={supplier.socialMediaLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierDetails;
