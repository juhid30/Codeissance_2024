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
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50">
      <h2 className="text-4xl font-bold text-green-700 mb-10">
        Explore NGO Insights
      </h2>
      <div className="space-y-5">
        <button
          className="w-60 py-3 px-6 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 hover:scale-105 transform transition-all duration-300"
          onClick={() => handleMapRedirect("literacy")}
        >
          View Literacy Map
        </button>
        <button
          className="w-60 py-3 px-6 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 hover:scale-105 transform transition-all duration-300"
          onClick={() => handleMapRedirect("ngoWork")}
        >
          View NGO Primary Work Areas
        </button>
        <button
          className="w-60 py-3 px-6 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 hover:scale-105 transform transition-all duration-300"
          onClick={() => handleMapRedirect("volunteerHeatmap")}
        >
          View Volunteer Heatmap
        </button>
      </div>
    </div>
  );
};

export default NGOMaps;
