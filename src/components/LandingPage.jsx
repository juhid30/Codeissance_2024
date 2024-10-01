import React from "react";
import { motion } from "framer-motion";
// import { useHistory } from "react-router-dom";
import Layout from "./Layout";
import logo from "../assets/logo.png";
function LandingPage() {
  //   const history = useHistory(); // useHistory for navigation

  return (
    <Layout>
      <div className="bg-gradient-to-r bg-green-50 min-h-[90vh] flex items-center justify-center">
        <div className="flex flex-row max-w-6xl mx-auto w-full p-6">
          {/* Hero Section */}
          <motion.div
            className="flex flex-col justify-center w-1/2 text-center text-green-900 p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <motion.h1
              className="text-5xl font-extrabold mb-4"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              Udaan
            </motion.h1>
            <motion.p
              className="text-xl mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              Bridging the gap between education and opportunity. Our NGO aims
              to empower students and transform lives through education.
            </motion.p>
            <div className="flex justify-center space-x-6">
              <motion.button
                className="bg-green-400 text-green-900 py-4 px-8 rounded-lg shadow-md hover:bg-green-500 transition-transform transform hover:scale-105"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                // onClick={() => history.push("/courses")}
              >
                Contact Us
              </motion.button>
              <motion.button
                className="bg-green-400 text-green-900 py-4 px-8 rounded-lg shadow-md hover:bg-green-500 transition-transform transform hover:scale-105"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                // onClick={() => history.push("/how-it-works")}
              >
                About Us
              </motion.button>
            </div>
          </motion.div>

          {/* Image Section */}
          <motion.div
            className="w-1/2 flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <img
              src={logo} // Replace with the actual image URL
              alt="Udaan Initiative"
              className="rounded-lg shadow-lg max-w-full h-auto"
            />
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}

export default LandingPage;
