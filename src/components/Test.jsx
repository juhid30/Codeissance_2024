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
      {
        id: 6,
        name: "Women Empowerment Workshop",
        date: "2024-12-05",
        time: {
          start: "10:00",
          end: "14:00",
        },
        location: {
          address: "303 Equality St, Hope City, Mumbai, India",
          city: "Mumbai",
          state: "Maharashtra",
          country: "India",
          latitude: 19.076,
          longitude: 72.8777,
        },
        image: "https://example.com/images/women-empowerment.jpg",
        description:
          "A workshop dedicated to empowering women through skill development and leadership training.",
        organizer: "Women for Change NGO",
        contactEmail: "info@womenforchange.org",
        registrationLink: "https://example.com/register-women-empowerment",
        additionalDetails: {
          type: "Workshop",
          targetAudience: "Women and Young Adults",
          capacity: 150,
          fees: "Free",
          sponsors: [
            {
              name: "Women Sponsor 1",
              image: "https://example.com/images/women-sponsor1-logo.jpg",
            },
            {
              name: "Women Sponsor 2",
              image: "https://example.com/images/women-sponsor2-logo.jpg",
            },
          ],
        },
      },
      {
        id: 7,
        name: "NGO Fundraising Gala",
        date: "2024-12-10",
        time: {
          start: "18:00",
          end: "21:00",
        },
        location: {
          address: "789 Charity Dr, Fund City, Mumbai, India",
          city: "Mumbai",
          state: "Maharashtra",
          country: "India",
          latitude: 19.076,
          longitude: 72.8777,
        },
        image: "https://example.com/images/fundraising-gala.jpg",
        description:
          "A gala to raise funds for various NGO projects and initiatives.",
        organizer: "Support NGO Foundation",
        contactEmail: "info@supportngo.org",
        registrationLink: "https://example.com/register-fundraising-gala",
        additionalDetails: {
          type: "Fundraising Event",
          targetAudience: "Philanthropists and Sponsors",
          capacity: 200,
          fees: "500 INR",
          sponsors: [
            {
              name: "Charity Sponsor 1",
              image: "https://example.com/images/charity-sponsor1-logo.jpg",
            },
            {
              name: "Charity Sponsor 2",
              image: "https://example.com/images/charity-sponsor2-logo.jpg",
            },
          ],
        },
      },
      {
        id: 8,
        name: "Youth Skill Development Camp",
        date: "2024-12-20",
        time: {
          start: "09:00",
          end: "17:00",
        },
        location: {
          address: "456 Opportunity Rd, Future City, Mumbai, India",
          city: "Mumbai",
          state: "Maharashtra",
          country: "India",
          latitude: 19.076,
          longitude: 72.8777,
        },
        image: "https://example.com/images/skill-development-camp.jpg",
        description:
          "A camp focused on developing life and career skills for youth.",
        organizer: "Skills for Life NGO",
        contactEmail: "info@skillsforlife.org",
        registrationLink:
          "https://example.com/register-youth-skill-development",
        additionalDetails: {
          type: "Workshop",
          targetAudience: "Youth and Young Adults",
          capacity: 250,
          fees: "Free",
          sponsors: [
            {
              name: "Career Sponsor 1",
              image: "https://example.com/images/career-sponsor1-logo.jpg",
            },
            {
              name: "Career Sponsor 2",
              image: "https://example.com/images/career-sponsor2-logo.jpg",
            },
          ],
        },
      },
      {
        id: 9,
        name: "Senior Citizen Support Drive",
        date: "2024-12-25",
        time: {
          start: "10:00",
          end: "13:00",
        },
        location: {
          address: "101 Care St, Help City, Mumbai, India",
          city: "Mumbai",
          state: "Maharashtra",
          country: "India",
          latitude: 19.076,
          longitude: 72.8777,
        },
        image: "https://example.com/images/senior-support-drive.jpg",
        description:
          "A support drive to provide resources and assistance to senior citizens.",
        organizer: "Elder Care NGO",
        contactEmail: "info@eldercare.org",
        registrationLink: "https://example.com/register-senior-support",
        additionalDetails: {
          type: "Support Drive",
          targetAudience: "Senior Citizens",
          capacity: 100,
          fees: "Free",
          sponsors: [
            {
              name: "Senior Sponsor 1",
              image: "https://example.com/images/senior-sponsor1-logo.jpg",
            },
            {
              name: "Senior Sponsor 2",
              image: "https://example.com/images/senior-sponsor2-logo.jpg",
            },
          ],
        },
      },
      {
        id: 10,
        name: "Educational Scholarship Drive",
        date: "2025-01-05",
        time: {
          start: "11:00",
          end: "15:00",
        },
        location: {
          address: "202 Scholarship Ave, Knowledge City, Mumbai, India",
          city: "Mumbai",
          state: "Maharashtra",
          country: "India",
          latitude: 19.076,
          longitude: 72.8777,
        },
        image: "https://example.com/images/scholarship-drive.jpg",
        description:
          "Providing educational scholarships to deserving students from low-income families.",
        organizer: "Education for All NGO",
        contactEmail: "info@educationforall.org",
        registrationLink: "https://example.com/register-scholarship-drive",
        additionalDetails: {
          type: "Charity Event",
          targetAudience: "Students and Families",
          capacity: 200,
          fees: "Free",
          sponsors: [
            {
              name: "Education Sponsor 1",
              image: "https://example.com/images/education-sponsor1-logo.jpg",
            },
            {
              name: "Education Sponsor 2",
              image: "https://example.com/images/education-sponsor2-logo.jpg",
            },
          ],
        },
      },
      {
        id: 11,
        name: "Community Sports Day",
        date: "2025-01-10",
        time: {
          start: "08:00",
          end: "13:00",
        },
        location: {
          address: "303 Unity Park, Play City, Mumbai, India",
          city: "Mumbai",
          state: "Maharashtra",
          country: "India",
          latitude: 19.076,
          longitude: 72.8777,
        },
        image: "https://example.com/images/community-sports-day.jpg",
        description:
          "Join us for a day of sports activities promoting community health and wellness.",
        organizer: "Sports for All NGO",
        contactEmail: "info@sportsforall.org",
        registrationLink: "https://example.com/register-sports-day",
        additionalDetails: {
          type: "Sports Event",
          targetAudience: "Families and Youth",
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
        id: 12,
        name: "Blood Donation Camp",
        date: "2025-01-15",
        time: {
          start: "09:00",
          end: "14:00",
        },
        location: {
          address: "404 Health St, Blood Bank, Mumbai, India",
          city: "Mumbai",
          state: "Maharashtra",
          country: "India",
          latitude: 19.076,
          longitude: 72.8777,
        },
        image: "https://example.com/images/blood-donation-camp.jpg",
        description: "Donate blood and save lives at our blood donation camp.",
        organizer: "Life Savers NGO",
        contactEmail: "info@lifesavers.org",
        registrationLink: "https://example.com/register-blood-donation",
        additionalDetails: {
          type: "Health Event",
          targetAudience: "All Adults",
          capacity: 400,
          fees: "Free",
          sponsors: [
            {
              name: "Blood Sponsor 1",
              image: "https://example.com/images/blood-sponsor1-logo.jpg",
            },
            {
              name: "Blood Sponsor 2",
              image: "https://example.com/images/blood-sponsor2-logo.jpg",
            },
          ],
        },
      },
      {
        id: 13,
        name: "Climate Change Awareness March",
        date: "2025-01-20",
        time: {
          start: "10:00",
          end: "12:00",
        },
        location: {
          address: "505 Eco Rd, Green City, Mumbai, India",
          city: "Mumbai",
          state: "Maharashtra",
          country: "India",
          latitude: 19.076,
          longitude: 72.8777,
        },
        image: "https://example.com/images/climate-change-march.jpg",
        description:
          "Raise awareness on climate change by joining our march across the city.",
        organizer: "Planet Protectors NGO",
        contactEmail: "info@planetprotectors.org",
        registrationLink: "https://example.com/register-climate-march",
        additionalDetails: {
          type: "Awareness Event",
          targetAudience: "Community Members",
          capacity: 500,
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
        id: 14,
        name: "Animal Welfare Campaign",
        date: "2025-01-25",
        time: {
          start: "11:00",
          end: "15:00",
        },
        location: {
          address: "606 Animal Shelter, Love City, Mumbai, India",
          city: "Mumbai",
          state: "Maharashtra",
          country: "India",
          latitude: 19.076,
          longitude: 72.8777,
        },
        image: "https://example.com/images/animal-welfare-campaign.jpg",
        description: "A campaign to promote animal adoption and welfare.",
        organizer: "Animals Matter NGO",
        contactEmail: "info@animalsmatter.org",
        registrationLink: "https://example.com/register-animal-welfare",
        additionalDetails: {
          type: "Awareness Event",
          targetAudience: "Animal Lovers and Families",
          capacity: 200,
          fees: "Free",
          sponsors: [
            {
              name: "Animal Sponsor 1",
              image: "https://example.com/images/animal-sponsor1-logo.jpg",
            },
            {
              name: "Animal Sponsor 2",
              image: "https://example.com/images/animal-sponsor2-logo.jpg",
            },
          ],
        },
      },
      {
        id: 15,
        name: "Mental Health Counseling Sessions",
        date: "2025-02-01",
        time: {
          start: "10:00",
          end: "16:00",
        },
        location: {
          address: "707 Wellness Center, Peace City, Mumbai, India",
          city: "Mumbai",
          state: "Maharashtra",
          country: "India",
          latitude: 19.076,
          longitude: 72.8777,
        },
        image: "https://example.com/images/mental-health-counseling.jpg",
        description:
          "Free mental health counseling sessions for individuals in need.",
        organizer: "Mind Wellness NGO",
        contactEmail: "info@mindwellness.org",
        registrationLink:
          "https://example.com/register-mental-health-counseling",
        additionalDetails: {
          type: "Counseling Event",
          targetAudience: "Adults and Youth",
          capacity: 100,
          fees: "Free",
          sponsors: [
            {
              name: "Mental Health Sponsor 1",
              image: "https://example.com/images/mental-sponsor1-logo.jpg",
            },
            {
              name: "Mental Health Sponsor 2",
              image: "https://example.com/images/mental-sponsor2-logo.jpg",
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
