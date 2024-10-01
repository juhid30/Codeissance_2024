import React from "react";
import { useNavigate } from "react-router-dom";

const NGOMaps = () => {
  const navigate = useNavigate();

  const handleMapRedirect = (mapType) => {
    switch (mapType) {
      case "literacy":
        navigate("/literacy-map");
        break;
      case "ngoWork":
        navigate("/ngo-work-map");
        break;
      case "volunteerHeatmap":
        navigate("/volunteer-heatmap");
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-100">
      {/* Header Section */}
      <header className="w-full max-w-5xl mx-auto text-center py-12">
        <h1 className="text-5xl font-extrabold text-orange-600 mb-4">
          Explore NGO Insights
        </h1>
        <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto">
          Gain actionable insights through interactive maps to support NGO
          decision-making. Discover patterns in literacy, areas of operation,
          and volunteer distribution. Use this information to make more targeted
          interventions and optimize your resources.
        </p>
      </header>

      {/* Main Section */}
      <section className="w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center bg-white shadow-lg rounded-lg p-10 md:space-x-8 mb-12 md:mb-0">
        {/* Left Column - Description */}
        <div className="w-full md:w-1/2 mb-8 md:mb-0">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">
            Key Insights
          </h2>
          <ul className="text-gray-700 space-y-4 list-disc list-inside">
            <li>
              <strong className="text-orange-600">Literacy Map:</strong>{" "}
              Pinpoint regions with lower literacy rates and direct educational
              programs where they are most needed. Understanding literacy levels
              allows NGOs to allocate resources effectively, ensuring their
              efforts improve the overall education system. This data helps NGOs
              partner with local governments, strategize school interventions,
              and design adult literacy programs tailored to the community’s
              needs.
            </li>
            <li>
              <strong className="text-orange-600">NGO Work Areas Map:</strong>{" "}
              Visualize the geographic distribution of NGO activities, helping
              organizations ensure balanced coverage across different areas.
              This map is essential for understanding where specific programs
              like healthcare, education, or sanitation are concentrated.
              Identifying gaps in service ensures no area is underserved while
              also avoiding overlap with other NGOs operating in the same
              region.
            </li>
            <li>
              <strong className="text-orange-600">Volunteer Heatmap:</strong>{" "}
              Analyze where volunteer activity is concentrated, and discover
              where additional volunteers may be needed. The heatmap provides
              insights into the density and effectiveness of volunteer efforts.
              It helps NGOs recognize areas with volunteer shortages or
              surpluses, allowing for better allocation of human resources. By
              understanding volunteer distribution, organizations can optimize
              recruitment strategies and improve local engagement.
            </li>
          </ul>
        </div>

        {/* Right Column - Buttons */}
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-end space-y-4">
          <button
            className="w-full md:w-auto py-3 px-6 bg-orange-500 text-white font-semibold rounded-lg shadow-md hover:bg-orange-600 hover:scale-105 transform transition-all duration-300"
            onClick={() => handleMapRedirect("literacy")}
          >
            View Literacy Map
          </button>
          <button
            className="w-full md:w-auto py-3 px-6 bg-orange-500 text-white font-semibold rounded-lg shadow-md hover:bg-orange-600 hover:scale-105 transform transition-all duration-300"
            onClick={() => handleMapRedirect("ngoWork")}
          >
            View NGO Primary Work Areas
          </button>
          <button
            className="w-full md:w-auto py-3 px-6 bg-orange-500 text-white font-semibold rounded-lg shadow-md hover:bg-orange-600 hover:scale-105 transform transition-all duration-300"
            onClick={() => handleMapRedirect("volunteerHeatmap")}
          >
            View Volunteer Heatmap
          </button>
        </div>
      </section>
    </div>
  );
};

export default NGOMaps;
