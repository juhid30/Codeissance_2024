import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // Importing framer-motion
import Layout from "../Layout";

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

  // Animation variants for staggering and button hover effects
  const container = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.2, ease: "easeOut" },
    },
  };

  const item = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  };

  const buttonHover = {
    hover: { scale: 1.1 },
    tap: { scale: 0.95 },
  };

  return (
    <Layout>
      <motion.div
        className="h-[90vh] overflow-auto invisible-scrollbar flex flex-col justify-between bg-gray-100"
        initial="hidden"
        animate="visible"
        variants={container}
      >
        {/* Header Section */}
        <header className="w-full max-w-5xl mx-auto text-center py-12">
          <motion.h1
            className="text-5xl font-extrabold text-green-600 mb-4"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Explore NGO Insights
          </motion.h1>
          <motion.p
            className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Gain actionable insights through interactive maps to support NGO
            decision-making. Discover patterns in literacy, areas of operation,
            and volunteer distribution. Use this information to make more
            targeted interventions and optimize your resources.
          </motion.p>
        </header>

        {/* Main Section */}
        <motion.section
          className="flex-grow w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center bg-white shadow-lg rounded-lg p-10 md:space-x-8 mb-12"
          variants={container}
        >
          {/* Left Column - Description */}
          <motion.div
            className="w-full md:w-1/2 mb-8 md:mb-0"
            variants={item}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">
              Key Insights
            </h2>
            <ul className="text-gray-700 space-y-4 list-disc list-inside text-justify">
              <li>
                <strong className="text-orange-600">Literacy Map:</strong>{" "}
                Pinpoint regions with lower literacy rates and direct
                educational programs where they are most needed.
              </li>
              <li>
                <strong className="text-orange-600">NGO Work Areas Map:</strong>{" "}
                Visualize the geographic distribution of NGO activities, helping
                organizations ensure balanced coverage across different areas.
              </li>
              <li>
                <strong className="text-orange-600">Volunteer Heatmap:</strong>{" "}
                Analyze where volunteer activity is concentrated and discover
                where additional volunteers may be needed.
              </li>
            </ul>
          </motion.div>

          {/* Right Column - Buttons */}
          <motion.div
            className="w-full md:w-1/2 flex flex-col justify-center items-center md:items-center space-y-8"
            variants={container}
          >
            <motion.button
              className="w-full md:w-[50%] py-3 px-6 bg-orange-500 text-white font-semibold rounded-lg shadow-md hover:bg-orange-600"
              variants={item}
              whileHover={buttonHover.hover}
              whileTap={buttonHover.tap}
              onClick={() => handleMapRedirect("literacy")}
            >
              View Literacy Map
            </motion.button>
            <motion.button
              className="w-full md:w-[50%] py-3 px-6 bg-teal-500 text-white font-semibold rounded-lg shadow-md hover:bg-teal-600"
              variants={item}
              whileHover={buttonHover.hover}
              whileTap={buttonHover.tap}
              onClick={() => handleMapRedirect("ngoWork")}
            >
              View NGO Primary Work Areas
            </motion.button>
            <motion.button
              className="w-full md:w-[50%] py-3 px-6 bg-purple-500 text-white font-semibold rounded-lg shadow-md hover:bg-purple-600"
              variants={item}
              whileHover={buttonHover.hover}
              whileTap={buttonHover.tap}
              onClick={() => handleMapRedirect("volunteerHeatmap")}
            >
              View Volunteer Heatmap
            </motion.button>
          </motion.div>
        </motion.section>
      </motion.div>
    </Layout>
  );
};

export default NGOMaps;
