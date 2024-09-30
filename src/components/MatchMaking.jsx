import React, { useEffect, useState } from "react";
import { getTop5CampaignsCustom } from "../../utils";

const MatchMaking = () => {
  // State to store the top 5 recommended events
  const [topEvents, setTopEvents] = useState([]);

  useEffect(() => {
    // Sample test data for user interests
    const testUserInterests = ["Health", "Volunteer", "Charity"];

    // Sample campaign events data
    const testCampaignEvents = [
      {
        name: "Health Awareness Campaign",
        description: "A campaign to spread health awareness.",
        additionalDetails: {
          type: "Health",
          targetAudience: "Volunteers",
        },
      },
      {
        name: "Charity Run",
        description: "A charity run to raise funds for the needy.",
        additionalDetails: {
          type: "Charity",
          targetAudience: "Runners",
        },
      },
      {
        name: "Environmental Cleanup",
        description: "Join us to clean up our environment.",
        additionalDetails: {
          type: "Environment",
          targetAudience: "Volunteers",
        },
      },
      {
        name: "Blood Donation Camp",
        description: "Donate blood to save lives.",
        additionalDetails: {
          type: "Health",
          targetAudience: "Donors",
        },
      },
      {
        name: "Community Gardening",
        description: "Help plant trees and create green spaces.",
        additionalDetails: {
          type: "Environment",
          targetAudience: "Gardeners",
        },
      },
      {
        name: "Food Bank Volunteer",
        description: "Assist in distributing food to the needy.",
        additionalDetails: {
          type: "Charity",
          targetAudience: "Volunteers",
        },
      },
    ];

    // Get the top 5 recommended events using the custom algorithm
    const top5Events = getTop5CampaignsCustom(
      testUserInterests,
      testCampaignEvents
    );

    // Update the state with the top 5 events
    setTopEvents(top5Events);
  }, []);

  return (
    <div>
      <h2>Top 5 Recommended Events</h2>
      <ul>
        {topEvents.length > 0 ? (
          topEvents.map((event, index) => (
            <li key={index}>
              <strong>{event.name}</strong> - Relevance Score:{" "}
              {event.relevanceScore}
              <p>{event.description}</p>
            </li>
          ))
        ) : (
          <p>No events found.</p>
        )}
      </ul>
    </div>
  );
};

export default MatchMaking;
