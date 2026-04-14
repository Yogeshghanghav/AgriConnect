import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
    }
  });

  return (
    <div className="bg-green-50 min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="bg-green-700 text-white py-20 px-6 text-center">
        <motion.img
          src="../images/herofarmer.png"
          alt="AgriConnect Hero"
          className="mx-auto mb-6 w-110 h-80 object-cover rounded-xl"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        />
        <motion.div
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to AgriConnect
          </h1>
          <p className="text-xl md:text-2xl">
            Your smart farming companion
          </p>
        </motion.div>
      </div>

      {/* Quick Navigation */}
      <div className="flex flex-col md:flex-row justify-center gap-6 py-12 px-4">
        <CardLink to="/crops" icon="🌾" title="Crops" desc="Explore or add crops" />
        <CardLink to="/weather" icon="☀️" title="Weather" desc="Check local forecast" />
        <CardLink to="/market" icon="🛒" title="Market" desc="Current market prices" />
      </div>

      {/* About Section */}
      <div className="px-6 py-12 bg-white text-center">
        <h2 className="text-3xl font-bold text-green-800 mb-4">
          Why AgriConnect?
        </h2>
        <p className="text-gray-700 max-w-2xl mx-auto">
          AgriConnect helps farmers and agricultural enthusiasts make informed
          decisions. From crop suggestions to weather forecasts and market
          prices — it’s all in one place!
        </p>
      </div>

      {/* Footer */}
      <footer className="bg-green-700 text-white text-center py-4 mt-auto">
        <p>© {new Date().getFullYear()} AgriConnect. All rights reserved.</p>
      </footer>
    </div>
  );
};

// ✅ Reusable card component
const CardLink = ({ to, icon, title, desc }) => (
  <a
    href={to}
    className="bg-white shadow-lg rounded-xl p-6 text-center w-60 hover:shadow-xl transition"
  >
    <h2 className="text-green-700 font-bold text-xl mb-2">{icon} {title}</h2>
    <p className="text-gray-600">{desc}</p>
  </a>
);

export default Home;
