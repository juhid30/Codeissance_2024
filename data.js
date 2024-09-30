const suppliers = [
  // {
  //   id: "supplier_001",
  //   name: "Mumbai Essentials",
  //   location: "Mumbai, Maharashtra",
  //   description: "Your one-stop shop for essential products in Mumbai.",
  //   contact: {
  //     email: "info@mumbaicentral.com",
  //     phone: "+91-22-1234-5678",
  //   },
  //   rating: 4.5,
  //   testimonials: [
  //     "Fantastic service and quick delivery!",
  //     "Highly recommend for quality products.",
  //   ],
  //   yearsInBusiness: 8,
  //   deliveryOptions: ["Standard Shipping", "Express Shipping"],
  //   paymentMethods: ["Credit Card", "Debit Card", "PayPal"],
  //   acceptedCurrencies: ["INR", "USD"],
  //   paymentGateways: ["Razorpay", "PayPal"],
  //   termsOfPayment: {
  //     upfront: "Full payment required at the time of order",
  //   },
  //   businessHours: {
  //     mondayToFriday: "9:00 AM - 6:00 PM",
  //     saturday: "10:00 AM - 4:00 PM",
  //     sunday: "Closed",
  //   },
  //   socialMediaLinks: {
  //     facebook: "https://facebook.com/mumbaicentral",
  //     instagram: "https://instagram.com/mumbaicentral",
  //     twitter: "https://twitter.com/mumbaicentral",
  //   },
  // },
  // {
  //   id: "supplier_002",
  //   name: "Eco Mumbai",
  //   location: "Mumbai, Maharashtra",
  //   description: "Specializing in eco-friendly and sustainable products.",
  //   contact: {
  //     email: "support@ecomumbai.com",
  //     phone: "+91-22-2345-6789",
  //   },
  //   rating: 4.8,
  //   testimonials: [
  //     "Great selection of eco-friendly products!",
  //     "Fast shipping and excellent customer support!",
  //   ],
  //   yearsInBusiness: 5,
  //   deliveryOptions: ["Standard Shipping", "Local Pickup"],
  //   paymentMethods: ["Credit Card", "PayPal"],
  //   acceptedCurrencies: ["INR"],
  //   paymentGateways: ["Razorpay"],
  //   termsOfPayment: {
  //     upfront: "Full payment required at the time of order",
  //   },
  //   businessHours: {
  //     mondayToFriday: "9:00 AM - 5:00 PM",
  //     saturday: "Closed",
  //     sunday: "Closed",
  //   },
  //   socialMediaLinks: {
  //     facebook: "https://facebook.com/ecomumbai",
  //     instagram: "https://instagram.com/ecomumbai",
  //     twitter: "https://twitter.com/ecomumbai",
  //   },
  // },
  // {
  //   id: "supplier_003",
  //   name: "Office Supplies Mumbai",
  //   location: "Mumbai, Maharashtra",
  //   description: "Providing all the essentials for your office needs.",
  //   contact: {
  //     email: "info@officesuppliesmumbai.com",
  //     phone: "+91-22-3456-7890",
  //   },
  //   rating: 4.2,
  //   testimonials: [
  //     "A one-stop shop for office supplies!",
  //     "Great pricing and customer service!",
  //   ],
  //   yearsInBusiness: 15,
  //   deliveryOptions: ["Standard Shipping", "Next Day Delivery"],
  //   paymentMethods: ["Credit Card", "Bank Transfer"],
  //   acceptedCurrencies: ["INR", "USD"],
  //   paymentGateways: ["PayPal"],
  //   termsOfPayment: {
  //     upfront: "Full payment required at the time of order",
  //   },
  //   businessHours: {
  //     mondayToFriday: "9:00 AM - 7:00 PM",
  //     saturday: "10:00 AM - 4:00 PM",
  //     sunday: "Closed",
  //   },
  //   socialMediaLinks: {
  //     facebook: "https://facebook.com/officesuppliesmumbai",
  //     twitter: "https://twitter.com/officesuppliesmumbai",
  //   },
  // },
  // {
  //   id: "supplier_004",
  //   name: "Mumbai Groceries",
  //   location: "Mumbai, Maharashtra",
  //   description: "Your trusted source for fresh groceries and pantry staples.",
  //   contact: {
  //     email: "info@mumbaigroceries.com",
  //     phone: "+91-22-4567-8901",
  //   },
  //   rating: 4.6,
  //   testimonials: [
  //     "Always fresh and delivered on time!",
  //     "Excellent variety of products!",
  //   ],
  //   yearsInBusiness: 12,
  //   deliveryOptions: ["Home Delivery", "Store Pickup"],
  //   paymentMethods: ["Credit Card", "UPI"],
  //   acceptedCurrencies: ["INR"],
  //   paymentGateways: ["Razorpay"],
  //   termsOfPayment: {
  //     upfront: "Full payment required at the time of order",
  //   },
  //   businessHours: {
  //     mondayToFriday: "8:00 AM - 8:00 PM",
  //     saturday: "8:00 AM - 6:00 PM",
  //     sunday: "Closed",
  //   },
  //   socialMediaLinks: {
  //     facebook: "https://facebook.com/mumbaigroceries",
  //     instagram: "https://instagram.com/mumbaigroceries",
  //   },
  // },
  {
    id: "supplier_005",
    name: "Mumbai Essentials",
    location: "Mumbai, Maharashtra",
    description: "Your one-stop shop for essential products in Mumbai.",
    contact: {
      email: "info@mumbaicentral.com",
      phone: "+91-22-1234-5678",
    },
    rating: 4.5,
    testimonials: [
      "Fantastic service and quick delivery!",
      "Highly recommend for quality products.",
    ],
    yearsInBusiness: 8,
    deliveryOptions: ["Standard Shipping", "Express Shipping"],
    paymentMethods: ["Credit Card", "Debit Card", "PayPal"],
    acceptedCurrencies: ["INR", "USD"],
    paymentGateways: ["Razorpay", "PayPal"],
    termsOfPayment: {
      upfront: "Full payment required at the time of order",
    },
    businessHours: {
      mondayToFriday: "9:00 AM - 6:00 PM",
      saturday: "10:00 AM - 4:00 PM",
      sunday: "Closed",
    },
    socialMediaLinks: {
      facebook: "https://facebook.com/mumbaicentral",
      instagram: "https://instagram.com/mumbaicentral",
      twitter: "https://twitter.com/mumbaicentral",
    },
  },
  {
    id: "supplier_006",
    name: "Eco Mumbai",
    location: "Mumbai, Maharashtra",
    description: "Specializing in eco-friendly and sustainable products.",
    contact: {
      email: "support@ecomumbai.com",
      phone: "+91-22-2345-6789",
    },
    rating: 4.8,
    testimonials: [
      "Great selection of eco-friendly products!",
      "Fast shipping and excellent customer support!",
    ],
    yearsInBusiness: 5,
    deliveryOptions: ["Standard Shipping", "Local Pickup"],
    paymentMethods: ["Credit Card", "PayPal"],
    acceptedCurrencies: ["INR"],
    paymentGateways: ["Razorpay"],
    termsOfPayment: {
      upfront: "Full payment required at the time of order",
    },
    businessHours: {
      mondayToFriday: "9:00 AM - 5:00 PM",
      saturday: "Closed",
      sunday: "Closed",
    },
    socialMediaLinks: {
      facebook: "https://facebook.com/ecomumbai",
      instagram: "https://instagram.com/ecomumbai",
      twitter: "https://twitter.com/ecomumbai",
    },
  },
  {
    id: "supplier_007",
    name: "Office Supplies Mumbai",
    location: "Mumbai, Maharashtra",
    description: "Providing all the essentials for your office needs.",
    contact: {
      email: "info@officesuppliesmumbai.com",
      phone: "+91-22-3456-7890",
    },
    rating: 4.2,
    testimonials: [
      "A one-stop shop for office supplies!",
      "Great pricing and customer service!",
    ],
    yearsInBusiness: 15,
    deliveryOptions: ["Standard Shipping", "Next Day Delivery"],
    paymentMethods: ["Credit Card", "Bank Transfer"],
    acceptedCurrencies: ["INR", "USD"],
    paymentGateways: ["PayPal"],
    termsOfPayment: {
      upfront: "Full payment required at the time of order",
    },
    businessHours: {
      mondayToFriday: "9:00 AM - 7:00 PM",
      saturday: "10:00 AM - 4:00 PM",
      sunday: "Closed",
    },
    socialMediaLinks: {
      facebook: "https://facebook.com/officesuppliesmumbai",
      twitter: "https://twitter.com/officesuppliesmumbai",
    },
  },
  {
    id: "supplier_008",
    name: "Mumbai Groceries",
    location: "Mumbai, Maharashtra",
    description: "Your trusted source for fresh groceries and pantry staples.",
    contact: {
      email: "info@mumbaigroceries.com",
      phone: "+91-22-4567-8901",
    },
    rating: 4.6,
    testimonials: [
      "Always fresh and delivered on time!",
      "Excellent variety of products!",
    ],
    yearsInBusiness: 12,
    deliveryOptions: ["Home Delivery", "Store Pickup"],
    paymentMethods: ["Credit Card", "UPI"],
    acceptedCurrencies: ["INR"],
    paymentGateways: ["Razorpay"],
    termsOfPayment: {
      upfront: "Full payment required at the time of order",
    },
    businessHours: {
      mondayToFriday: "8:00 AM - 8:00 PM",
      saturday: "8:00 AM - 6:00 PM",
      sunday: "Closed",
    },
    socialMediaLinks: {
      facebook: "https://facebook.com/mumbaigroceries",
      instagram: "https://instagram.com/mumbaigroceries",
    },
  },
  // New suppliers for NGO work
  {
    id: "supplier_009",
    name: "NGO Support Services",
    location: "Thane, Maharashtra",
    description: "Providing essential services and supplies for NGOs.",
    contact: {
      email: "info@ngosupport.com",
      phone: "+91-22-5678-9101",
    },
    rating: 4.7,
    testimonials: [
      "Excellent resources for our NGO!",
      "Very supportive and reliable service.",
    ],
    yearsInBusiness: 10,
    deliveryOptions: ["Standard Shipping", "Local Pickup"],
    paymentMethods: ["Credit Card", "UPI"],
    acceptedCurrencies: ["INR"],
    paymentGateways: ["Razorpay"],
    termsOfPayment: {
      upfront: "Full payment required at the time of order",
    },
    businessHours: {
      mondayToFriday: "9:00 AM - 6:00 PM",
      saturday: "Closed",
      sunday: "Closed",
    },
    socialMediaLinks: {
      facebook: "https://facebook.com/ngosupport",
      instagram: "https://instagram.com/ngosupport",
    },
  },
  {
    id: "supplier_010",
    name: "Sustainable Development Supplies",
    location: "Navi Mumbai, Maharashtra",
    description:
      "Specializing in supplies for sustainable development projects.",
    contact: {
      email: "contact@sustainablesupplies.com",
      phone: "+91-22-6789-1234",
    },
    rating: 4.9,
    testimonials: [
      "Great for eco-friendly initiatives!",
      "Highly recommended for sustainability projects.",
    ],
    yearsInBusiness: 6,
    deliveryOptions: ["Home Delivery", "Standard Shipping"],
    paymentMethods: ["Credit Card", "PayPal"],
    acceptedCurrencies: ["INR"],
    paymentGateways: ["Razorpay"],
    termsOfPayment: {
      upfront: "Full payment required at the time of order",
    },
    businessHours: {
      mondayToFriday: "9:00 AM - 5:00 PM",
      saturday: "Closed",
      sunday: "Closed",
    },
    socialMediaLinks: {
      facebook: "https://facebook.com/sustainablesupplies",
      instagram: "https://instagram.com/sustainablesupplies",
    },
  },
  {
    id: "supplier_011",
    name: "Community Outreach Supplies",
    location: "Mumbai, Maharashtra",
    description: "Providing supplies for community outreach programs.",
    contact: {
      email: "info@communityoutreach.com",
      phone: "+91-22-7890-1234",
    },
    rating: 4.5,
    testimonials: [
      "Very supportive in our outreach efforts!",
      "Reliable and timely service.",
    ],
    yearsInBusiness: 7,
    deliveryOptions: ["Local Pickup", "Standard Shipping"],
    paymentMethods: ["Credit Card", "Bank Transfer"],
    acceptedCurrencies: ["INR"],
    paymentGateways: ["PayPal"],
    termsOfPayment: {
      upfront: "Full payment required at the time of order",
    },
    businessHours: {
      mondayToFriday: "10:00 AM - 6:00 PM",
      saturday: "Closed",
      sunday: "Closed",
    },
    socialMediaLinks: {
      facebook: "https://facebook.com/communityoutreach",
      instagram: "https://instagram.com/communityoutreach",
    },
  },
  {
    id: "supplier_012",
    name: "Educational Resources Mumbai",
    location: "Mumbai, Maharashtra",
    description: "Specializing in educational supplies for NGOs.",
    contact: {
      email: "info@edu-resources.com",
      phone: "+91-22-8901-2345",
    },
    rating: 4.6,
    testimonials: [
      "Great range of educational materials!",
      "Very helpful for our educational programs.",
    ],
    yearsInBusiness: 9,
    deliveryOptions: ["Standard Shipping", "Home Delivery"],
    paymentMethods: ["Credit Card", "UPI"],
    acceptedCurrencies: ["INR"],
    paymentGateways: ["Razorpay"],
    termsOfPayment: {
      upfront: "Full payment required at the time of order",
    },
    businessHours: {
      mondayToFriday: "9:00 AM - 5:00 PM",
      saturday: "Closed",
      sunday: "Closed",
    },
    socialMediaLinks: {
      facebook: "https://facebook.com/edu-resources",
      instagram: "https://instagram.com/edu-resources",
    },
  },
  {
    id: "supplier_013",
    name: "Health & Wellness Supplies",
    location: "Mumbai, Maharashtra",
    description: "Supplying health and wellness products for NGOs.",
    contact: {
      email: "info@healthwellness.com",
      phone: "+91-22-9012-3456",
    },
    rating: 4.8,
    testimonials: [
      "Essential supplies for our health initiatives!",
      "Outstanding service and product range.",
    ],
    yearsInBusiness: 4,
    deliveryOptions: ["Standard Shipping", "Local Pickup"],
    paymentMethods: ["Credit Card", "Bank Transfer"],
    acceptedCurrencies: ["INR"],
    paymentGateways: ["PayPal"],
    termsOfPayment: {
      upfront: "Full payment required at the time of order",
    },
    businessHours: {
      mondayToFriday: "9:00 AM - 5:00 PM",
      saturday: "Closed",
      sunday: "Closed",
    },
    socialMediaLinks: {
      facebook: "https://facebook.com/healthwellness",
      instagram: "https://instagram.com/healthwellness",
    },
  },
  {
    id: "supplier_014",
    name: "Women's Empowerment Supplies",
    location: "Mumbai, Maharashtra",
    description: "Focused on empowering women through essential supplies.",
    contact: {
      email: "info@womensempowerment.com",
      phone: "+91-22-0123-4567",
    },
    rating: 4.7,
    testimonials: [
      "Supportive and impactful supplies for women!",
      "Excellent service and quick delivery.",
    ],
    yearsInBusiness: 3,
    deliveryOptions: ["Home Delivery", "Standard Shipping"],
    paymentMethods: ["Credit Card", "UPI"],
    acceptedCurrencies: ["INR"],
    paymentGateways: ["Razorpay"],
    termsOfPayment: {
      upfront: "Full payment required at the time of order",
    },
    businessHours: {
      mondayToFriday: "10:00 AM - 6:00 PM",
      saturday: "Closed",
      sunday: "Closed",
    },
    socialMediaLinks: {
      facebook: "https://facebook.com/womensempowerment",
      instagram: "https://instagram.com/womensempowerment",
    },
  },
];

// data.js
const products = [
  {
    id: "prod_011",
    name: "Emergency Blankets",
    category: "Shelter and Clothing",
    description: "Lightweight and compact emergency blankets for warmth.",
    cost: 15.0,
    supplier_id: "supplier_001",
    quantity_available: 200,
    image_url: "http://example.com/images/emergency_blankets.jpg",
  },
  {
    id: "prod_012",
    name: "Water Purification Tablets",
    category: "Health and Hygiene",
    description: "Tablets that purify water for safe drinking.",
    cost: 5.0,
    supplier_id: "supplier_002",
    quantity_available: 500,
    image_url: "http://example.com/images/water_purification_tablets.jpg",
  },
  {
    id: "prod_013",
    name: "Solar Lanterns",
    category: "Safety and Emergency",
    description: "Rechargeable solar lanterns for light during emergencies.",
    cost: 30.0,
    supplier_id: "supplier_003",
    quantity_available: 100,
    image_url: "http://example.com/images/solar_lanterns.jpg",
  },
  {
    id: "prod_014",
    name: "First Aid Supplies",
    category: "Health and Hygiene",
    description: "Basic first aid supplies for minor injuries.",
    cost: 20.0,
    supplier_id: "supplier_001",
    quantity_available: 150,
    image_url: "http://example.com/images/first_aid_supplies.jpg",
  },
  {
    id: "prod_015",
    name: "Educational Kits",
    category: "Educational Supplies",
    description: "Kits with books, stationery, and learning materials.",
    cost: 25.0,
    supplier_id: "supplier_002",
    quantity_available: 300,
    image_url: "http://example.com/images/educational_kits.jpg",
  },
  {
    id: "prod_016",
    name: "Hygiene Kits",
    category: "Health and Hygiene",
    description: "Basic hygiene kits for personal care.",
    cost: 10.0,
    supplier_id: "supplier_004",
    quantity_available: 250,
    image_url: "http://example.com/images/hygiene_kits.jpg",
  },
  {
    id: "prod_017",
    name: "Non-Perishable Food Packs",
    category: "Food and Nutrition",
    description: "Nutritious non-perishable food items for families.",
    cost: 40.0,
    supplier_id: "supplier_001",
    quantity_available: 150,
    image_url: "http://example.com/images/non_perishable_food_packs.jpg",
  },
  {
    id: "prod_018",
    name: "Children's Clothing",
    category: "Shelter and Clothing",
    description: "Warm clothing for children in need.",
    cost: 20.0,
    supplier_id: "supplier_003",
    quantity_available: 100,
    image_url: "http://example.com/images/childrens_clothing.jpg",
  },
  {
    id: "prod_019",
    name: "Mobile Charging Stations",
    category: "Safety and Emergency",
    description: "Portable solar-powered charging stations.",
    cost: 100.0,
    supplier_id: "supplier_002",
    quantity_available: 50,
    image_url: "http://example.com/images/mobile_charging_stations.jpg",
  },
  {
    id: "prod_020",
    name: "Bedding Sets",
    category: "Shelter and Clothing",
    description: "Complete bedding sets for comfort and warmth.",
    cost: 50.0,
    supplier_id: "supplier_004",
    quantity_available: 75,
    image_url: "http://example.com/images/bedding_sets.jpg",
  },
];

export { suppliers, products };
