import React from "react";

const marketData = [
  {
    crop: "Wheat",
    price: "₹22/kg",
    location: "Pune",
    availability: "5000 kg",
    trend: "rising",
    date: "2025-06-17",
  },
  {
    crop: "Rice",
    price: "₹28/kg",
    location: "Nashik",
    availability: "3000 kg",
    trend: "falling",
    date: "2025-06-17",
  },
  {
    crop: "Tomato",
    price: "₹12/kg",
    location: "Ahmednagar",
    availability: "1200 kg",
    trend: "stable",
    date: "2025-06-17",
  },
  {
    crop: "Onion",
    price: "₹18/kg",
    location: "Solapur",
    availability: "2500 kg",
    trend: "rising",
    date: "2025-06-17",
  },
  {
    crop: "Sugarcane",
    price: "₹34/ton",
    location: "Kolhapur",
    availability: "800 tons",
    trend: "falling",
    date: "2025-06-17",
  },
  {
    crop: "Potato",
    price: "₹16/kg",
    location: "Nagpur",
    availability: "4000 kg",
    trend: "stable",
    date: "2025-06-17",
  },
];

const getTrendColor = (trend) => {
  switch (trend) {
    case "rising":
      return "text-green-600";
    case "falling":
      return "text-red-600";
    default:
      return "text-yellow-600";
  }
};

const Market = () => {
  return (
    <div className="min-h-screen bg-green-50 p-6">
      <h1 className="text-3xl font-bold text-green-800 text-center mb-6">
        🛒 Market Prices
      </h1>

      <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {marketData.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md p-5 text-left hover:shadow-lg transition"
          >
            <h2 className="text-2xl font-semibold text-green-700 mb-2">
              {item.crop}
            </h2>
            <p className="text-gray-700 font-medium">💰 Price: {item.price}</p>
            <p className="text-gray-600">📍 Mandi: {item.location}</p>
            <p className="text-gray-600">📦 Available: {item.availability}</p>
            <p className={getTrendColor(item.trend)}>📈 Trend: {item.trend}</p>
            <p className="text-gray-400 text-sm mt-2">📅 {item.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Market;