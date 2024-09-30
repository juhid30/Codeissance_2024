import { collection, doc, setDoc } from "firebase/firestore";
import React from "react";
import { db } from "../../firebase";
import { uploadProducts, uploadSuppliers } from "../../utils";

const Test = () => {
  const uploadCampaigns = async () => {
    const campaignEvents = [
      {
        id: 1,
        name: "Community Health Fair",
        date: "2024-10-05",
        time: {
          start: "09:00",
          end: "15:00",
        },
        location: {
          address: "123 Wellness Ave, Health City, Mumbai, India",
          city: "Mumbai",
          state: "Maharashtra",
          country: "India",
          latitude: 19.076,
          longitude: 72.8777,
        },
        image: "https://example.com/images/health-fair.jpg",
        description:
          "Join us for a free health fair offering screenings, health education, and wellness activities.",
        organizer: "Health for All NGO",
        contactEmail: "info@healthforall.org",
        registrationLink: "https://example.com/register-health-fair",
        additionalDetails: {
          type: "Health Awareness",
          targetAudience: "Families and Community Members",
          capacity: 500,
          fees: "Free",
          sponsors: [
            {
              name: "Health Sponsor 1",
              image: "https://example.com/images/health-sponsor1-logo.jpg",
            },
            {
              name: "Health Sponsor 2",
              image: "https://example.com/images/health-sponsor2-logo.jpg",
            },
          ],
        },
      },
      {
        id: 2,
        name: "Environmental Clean-Up Day",
        date: "2024-10-12",
        time: {
          start: "08:00",
          end: "12:00",
        },
        location: {
          address: "456 Green St, Eco City, Mumbai, India",
          city: "Mumbai",
          state: "Maharashtra",
          country: "India",
          latitude: 19.076,
          longitude: 72.8777,
        },
        image: "https://example.com/images/clean-up-day.jpg",
        description:
          "Volunteer with us to clean up local parks and promote environmental awareness.",
        organizer: "Green Planet NGO",
        contactEmail: "info@greenplanet.org",
        registrationLink: "https://example.com/register-clean-up",
        additionalDetails: {
          type: "Volunteer Event",
          targetAudience: "All Ages",
          capacity: 200,
          fees: "Free",
          sponsors: [
            {
              name: "Eco Sponsor 1",
              image: "https://example.com/images/eco-sponsor1-logo.jpg",
            },
            {
              name: "Eco Sponsor 2",
              image: "https://example.com/images/eco-sponsor2-logo.jpg",
            },
          ],
        },
      },
      {
        id: 3,
        name: "Food Distribution Drive",
        date: "2024-11-01",
        time: {
          start: "10:00",
          end: "14:00",
        },
        location: {
          address: "789 Charity Rd, Help City, Mumbai, India",
          city: "Mumbai",
          state: "Maharashtra",
          country: "India",
          latitude: 19.076,
          longitude: 72.8777,
        },
        image: "https://example.com/images/food-distribution.jpg",
        description:
          "Help us distribute food packages to underprivileged families in our community.",
        organizer: "Food for All NGO",
        contactEmail: "info@foodforall.org",
        registrationLink: "https://example.com/register-food-drive",
        additionalDetails: {
          type: "Charity Event",
          targetAudience: "Community Members",
          capacity: 300,
          fees: "Free",
          sponsors: [
            {
              name: "Food Sponsor 1",
              image: "https://example.com/images/food-sponsor1-logo.jpg",
            },
            {
              name: "Food Sponsor 2",
              image: "https://example.com/images/food-sponsor2-logo.jpg",
            },
          ],
        },
      },
      {
        id: 4,
        name: "Mental Health Awareness Workshop",
        date: "2024-11-15",
        time: {
          start: "13:00",
          end: "16:00",
        },
        location: {
          address: "101 Wellness St, Care City, Mumbai, India",
          city: "Mumbai",
          state: "Maharashtra",
          country: "India",
          latitude: 19.076,
          longitude: 72.8777,
        },
        image: "https://example.com/images/mental-health-workshop.jpg",
        description:
          "Join us for an interactive workshop on mental health, featuring guest speakers and resources.",
        organizer: "Mind Matters NGO",
        contactEmail: "info@mindmatters.org",
        registrationLink: "https://example.com/register-mental-health",
        additionalDetails: {
          type: "Awareness Session",
          targetAudience: "Students and Parents",
          capacity: 100,
          fees: "Free",
          sponsors: [
            {
              name: "Health Sponsor 1",
              image: "https://example.com/images/health-sponsor1-logo.jpg",
            },
            {
              name: "Health Sponsor 2",
              image: "https://example.com/images/health-sponsor2-logo.jpg",
            },
          ],
        },
      },
      {
        id: 5,
        name: "Youth Empowerment Summit",
        date: "2024-11-30",
        time: {
          start: "09:00",
          end: "17:00",
        },
        location: {
          address: "202 Empowerment Blvd, Future City, Mumbai, India",
          city: "Mumbai",
          state: "Maharashtra",
          country: "India",
          latitude: 19.076,
          longitude: 72.8777,
        },
        image: "https://example.com/images/youth-summit.jpg",
        description:
          "A summit focused on empowering youth with skills, resources, and opportunities for personal development.",
        organizer: "Youth for Change NGO",
        contactEmail: "info@youthforchange.org",
        registrationLink: "https://example.com/register-youth-summit",
        additionalDetails: {
          type: "Summit",
          targetAudience: "Youth and Young Adults",
          capacity: 300,
          fees: "Free",
          sponsors: [
            {
              name: "Youth Sponsor 1",
              image: "https://example.com/images/youth-sponsor1-logo.jpg",
            },
            {
              name: "Youth Sponsor 2",
              image: "https://example.com/images/youth-sponsor2-logo.jpg",
            },
          ],
        },
      },
    ];

    // Iterate over each campaign event and upload to Firestore
    for (const event of campaignEvents) {
      try {
        const docRef = doc(collection(db, "Campaigns")); // Create a reference for a new document
        await setDoc(docRef, event); // Set the document with the event data
        console.log(`Uploaded: ${event.name}`);
      } catch (error) {
        console.error(`Error uploading ${event.name}:`, error);
      }
    }
  };

  return (
    <>
      <div>
        <h1>Test Component</h1>
        <button onClick={uploadProducts}>Add to Firebase</button>
      </div>
    </>
  );
};

export default Test;
