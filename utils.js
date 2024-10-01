// utils.js

import { getFirestore, collection, addDoc } from "firebase/firestore";
import { products } from "./data";
import { suppliers } from "./data";
import { eventDetails } from "./public/constants/eventDetails";


// Initialize Firestore
const db = getFirestore();
// utils.js
// utils.js

// Function to tokenize text and return unique tokens
const tokenizeText = (text) => {
  return new Set(text.toLowerCase().split(/\W+/)); // Tokenize and lower case
};

// Function to calculate relevance score based on keyword matches
const calculateRelevanceScore = (userInterests, eventDetails) => {
  const userInterestTokens = tokenizeText(userInterests.join(" "));
  const eventTokens = tokenizeText(
    `${eventDetails.name} ${eventDetails.description}`
  );

  // Initialize a score variable
  let relevanceScore = 0;

  // Weight for different positions (can be adjusted as needed)
  const titleWeight = 2; // Higher weight for title matches
  const descriptionWeight = 1; // Lower weight for description matches

  // Calculate relevance score based on matches in the name
  userInterestTokens.forEach((token) => {
    if (eventDetails.name.toLowerCase().includes(token)) {
      relevanceScore += titleWeight; // Add title weight for name matches
    }
    if (eventDetails.description.toLowerCase().includes(token)) {
      relevanceScore += descriptionWeight; // Add description weight for description matches
    }
  });

  return relevanceScore; // Return the calculated relevance score
};

// Function to get top 5 recommended events using custom scoring
export const getTop5CampaignsCustom = (userInterests, campaignEvents) => {
  // Map events with their relevance scores
  const eventsWithScores = campaignEvents.map((event) => {
    const relevanceScore = calculateRelevanceScore(userInterests, event);
    return { ...event, relevanceScore };
  });

  // Sort events by relevance score in descending order
  const sortedEvents = eventsWithScores.sort(
    (a, b) => b.relevanceScore - a.relevanceScore
  );

  // Return the top 5 events
  return sortedEvents.slice(0, 5);
};

// // Example usage
// const userInterests = ["Health", "Volunteer", "Charity"];
// const campaignEvents = [
//   // Example campaign events go here
// ];
// const top5Events = getTop5CampaignsNLP(userInterests, campaignEvents);

// console.log(top5Events);

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

export async function uploadCampaigns() {
  const campaignColection = collection(db, "Campaigns");

  for (const camp of eventDetails) {
    try {
      // Add each supplier as a new document
      const docRef = await addDoc(campaignColection, camp);
      console.log("Supplier document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding supplier document: ", e);
    }
  }
}

// Call the functions to upload products and suppliers
// uploadProducts();
// uploadSuppliers();
