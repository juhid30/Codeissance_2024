import { collection, doc, setDoc } from "firebase/firestore";
import React from "react";
import { db } from "../../firebase";

const Test = () => {
  const uploadCampaigns = async () => {
    const campaignEvents = [
      {
        id: 1,
        name: "Scholarship Awareness Webinar",
        date: "2024-10-15",
        time: {
          start: "15:00",
          end: "17:00",
        },
        location: {
          address: "123 Education St, Knowledge City, Mumbai, India",
          city: "Mumbai",
          state: "Maharashtra",
          country: "India",
          latitude: 19.076,
          longitude: 72.8777,
        },
        image: "https://example.com/images/scholarship-webinar.jpg",
        description:
          "An informative webinar on available scholarships for underprivileged students and how to apply for them.",
        organizer: "Educational Empowerment Foundation",
        contactEmail: "info@educationfoundation.org",
        registrationLink: "https://example.com/register",
        additionalDetails: {
          type: "Webinar",
          targetAudience: "High School Students",
          capacity: 100,
          fees: "Free",
          sponsors: [
            {
              name: "Sponsor 1",
              image: "https://example.com/images/sponsor1-logo.jpg",
            },
            {
              name: "Sponsor 2",
              image: "https://example.com/images/sponsor2-logo.jpg",
            },
          ],
        },
      },
      {
        id: 2,
        name: "Virtual Tutoring Workshop",
        date: "2024-10-22",
        time: {
          start: "10:00",
          end: "12:00",
        },
        location: {
          address: "456 Learning Lane, Study Town, Mumbai, India",
          city: "Mumbai",
          state: "Maharashtra",
          country: "India",
          latitude: 19.076,
          longitude: 72.8777,
        },
        image: "https://example.com/images/tutoring-workshop.jpg",
        description:
          "A hands-on workshop offering virtual tutoring techniques for mentors working with underprivileged students.",
        organizer: "Learn Together Initiative",
        contactEmail: "support@learntogether.org",
        registrationLink: "https://example.com/register-tutoring",
        additionalDetails: {
          type: "Workshop",
          targetAudience: "Volunteer Mentors",
          capacity: 50,
          fees: "Free",
          sponsors: [
            {
              name: "Sponsor A",
              image: "https://example.com/images/sponsorA-logo.jpg",
            },
            {
              name: "Sponsor B",
              image: "https://example.com/images/sponsorB-logo.jpg",
            },
          ],
        },
      },
      {
        id: 3,
        name: "College Readiness Seminar",
        date: "2024-10-30",
        time: {
          start: "14:00",
          end: "16:00",
        },
        location: {
          address: "789 Education Blvd, Career City, Mumbai, India",
          city: "Mumbai",
          state: "Maharashtra",
          country: "India",
          latitude: 19.076,
          longitude: 72.8777,
        },
        image: "https://example.com/images/college-readiness-seminar.jpg",
        description:
          "A seminar to help students prepare for college applications and interviews.",
        organizer: "Future Leaders Academy",
        contactEmail: "info@futureleadersacademy.org",
        registrationLink: "https://example.com/register-college",
        additionalDetails: {
          type: "Seminar",
          targetAudience: "High School Students",
          capacity: 75,
          fees: "Free",
          sponsors: [
            {
              name: "Sponsor X",
              image: "https://example.com/images/sponsorX-logo.jpg",
            },
            {
              name: "Sponsor Y",
              image: "https://example.com/images/sponsorY-logo.jpg",
            },
          ],
        },
      },
      {
        id: 4,
        name: "STEM Career Fair",
        date: "2024-11-05",
        time: {
          start: "09:00",
          end: "17:00",
        },
        location: {
          address: "321 Career Ave, Tech Park, Mumbai, India",
          city: "Mumbai",
          state: "Maharashtra",
          country: "India",
          latitude: 19.076,
          longitude: 72.8777,
        },
        image: "https://example.com/images/stem-career-fair.jpg",
        description:
          "Connect with industry professionals and explore career opportunities in STEM fields.",
        organizer: "Tech for Tomorrow",
        contactEmail: "contact@techfortomorrow.org",
        registrationLink: "https://example.com/register-stem-fair",
        additionalDetails: {
          type: "Career Fair",
          targetAudience: "College Students and Graduates",
          capacity: 200,
          fees: "Free",
          sponsors: [
            {
              name: "Tech Sponsor 1",
              image: "https://example.com/images/tech-sponsor1-logo.jpg",
            },
            {
              name: "Tech Sponsor 2",
              image: "https://example.com/images/tech-sponsor2-logo.jpg",
            },
          ],
        },
      },
      {
        id: 5,
        name: "Financial Literacy Workshop",
        date: "2024-11-12",
        time: {
          start: "11:00",
          end: "13:00",
        },
        location: {
          address: "234 Money St, Wealth City, Mumbai, India",
          city: "Mumbai",
          state: "Maharashtra",
          country: "India",
          latitude: 19.076,
          longitude: 72.8777,
        },
        image: "https://example.com/images/financial-literacy-workshop.jpg",
        description:
          "Learn essential financial skills and budgeting techniques for students.",
        organizer: "Smart Finance Initiative",
        contactEmail: "info@smartfinance.org",
        registrationLink: "https://example.com/register-financial-literacy",
        additionalDetails: {
          type: "Workshop",
          targetAudience: "High School Students and Young Adults",
          capacity: 40,
          fees: "Free",
          sponsors: [
            {
              name: "Finance Co",
              image: "https://example.com/images/finance-co-logo.jpg",
            },
            {
              name: "Banking Partner",
              image: "https://example.com/images/banking-partner-logo.jpg",
            },
          ],
        },
      },
      {
        id: 6,
        name: "Coding Bootcamp for Beginners",
        date: "2024-11-20",
        time: {
          start: "09:00",
          end: "15:00",
        },
        location: {
          address: "987 Code St, Dev City, Mumbai, India",
          city: "Mumbai",
          state: "Maharashtra",
          country: "India",
          latitude: 19.076,
          longitude: 72.8777,
        },
        image: "https://example.com/images/coding-bootcamp.jpg",
        description:
          "A free coding bootcamp for students interested in learning programming basics.",
        organizer: "Code for Change",
        contactEmail: "info@codeforchange.org",
        registrationLink: "https://example.com/register-coding-bootcamp",
        additionalDetails: {
          type: "Bootcamp",
          targetAudience: "Aspiring Programmers",
          capacity: 30,
          fees: "Free",
          sponsors: [
            {
              name: "Tech Partner 1",
              image: "https://example.com/images/tech-partner1-logo.jpg",
            },
            {
              name: "Tech Partner 2",
              image: "https://example.com/images/tech-partner2-logo.jpg",
            },
          ],
        },
      },
      {
        id: 7,
        name: "Mental Health Awareness Session",
        date: "2024-11-27",
        time: {
          start: "16:00",
          end: "18:00",
        },
        location: {
          address: "654 Wellness Ave, Health City, Mumbai, India",
          city: "Mumbai",
          state: "Maharashtra",
          country: "India",
          latitude: 19.076,
          longitude: 72.8777,
        },
        image: "https://example.com/images/mental-health-session.jpg",
        description:
          "A session aimed at raising awareness about mental health issues among students.",
        organizer: "Wellness Foundation",
        contactEmail: "info@wellnessfoundation.org",
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
        id: 8,
        name: "Cultural Festival for Youth",
        date: "2024-12-05",
        time: {
          start: "12:00",
          end: "20:00",
        },
        location: {
          address: "321 Culture Blvd, Arts City, Mumbai, India",
          city: "Mumbai",
          state: "Maharashtra",
          country: "India",
          latitude: 19.076,
          longitude: 72.8777,
        },
        image: "https://example.com/images/cultural-festival.jpg",
        description:
          "A vibrant festival showcasing various cultural performances and activities for youth.",
        organizer: "Youth Cultural Collective",
        contactEmail: "info@youthculturalcollective.org",
        registrationLink: "https://example.com/register-cultural-festival",
        additionalDetails: {
          type: "Festival",
          targetAudience: "All Ages",
          capacity: 500,
          fees: "Free",
          sponsors: [
            {
              name: "Culture Partner 1",
              image: "https://example.com/images/culture-partner1-logo.jpg",
            },
            {
              name: "Culture Partner 2",
              image: "https://example.com/images/culture-partner2-logo.jpg",
            },
          ],
        },
      },
      {
        id: 9,
        name: "Community Sports Day",
        date: "2024-12-12",
        time: {
          start: "09:00",
          end: "17:00",
        },
        location: {
          address: "456 Sport St, Fitness City, Mumbai, India",
          city: "Mumbai",
          state: "Maharashtra",
          country: "India",
          latitude: 19.076,
          longitude: 72.8777,
        },
        image: "https://example.com/images/sports-day.jpg",
        description:
          "A day of fun sports activities for the community to promote health and wellness.",
        organizer: "Community Sports Initiative",
        contactEmail: "info@communitysportsinitiative.org",
        registrationLink: "https://example.com/register-sports-day",
        additionalDetails: {
          type: "Sports Event",
          targetAudience: "Families and Individuals",
          capacity: 300,
          fees: "Free",
          sponsors: [
            {
              name: "Sports Sponsor 1",
              image: "https://example.com/images/sports-sponsor1-logo.jpg",
            },
            {
              name: "Sports Sponsor 2",
              image: "https://example.com/images/sports-sponsor2-logo.jpg",
            },
          ],
        },
      },
      {
        id: 10,
        name: "Tech Innovation Summit",
        date: "2024-12-20",
        time: {
          start: "10:00",
          end: "16:00",
        },
        location: {
          address: "789 Tech Lane, Innovation City, Mumbai, India",
          city: "Mumbai",
          state: "Maharashtra",
          country: "India",
          latitude: 19.076,
          longitude: 72.8777,
        },
        image: "https://example.com/images/tech-innovation-summit.jpg",
        description:
          "A summit focused on the latest innovations in technology and their impact on society.",
        organizer: "Tech Innovators Network",
        contactEmail: "info@techinnovatorsnetwork.org",
        registrationLink: "https://example.com/register-tech-summit",
        additionalDetails: {
          type: "Summit",
          targetAudience: "Tech Enthusiasts and Professionals",
          capacity: 200,
          fees: "Free",
          sponsors: [
            {
              name: "Tech Company 1",
              image: "https://example.com/images/tech-company1-logo.jpg",
            },
            {
              name: "Tech Company 2",
              image: "https://example.com/images/tech-company2-logo.jpg",
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
        <button onClick={uploadCampaigns}>Add to Firebase</button>
      </div>
    </>
  );
};

export default Test;
