import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const crops = [
  {
    name: "Wheat",
    image: "../images/wheat.jpg",
    description: "A major cereal grain used to make bread, pasta, and more.",
  },
  {
    name: "Rice",
    image: "../images/rice.jpeg",
    description: "A staple food grown in water-logged fields, essential in many diets.",
  },
  {
    name: "Maize",
    image: "../images/maize.png",
    description: "Also known as corn, used for food, fodder, and industrial products.",
  },
  {
    name: "Tomato",
    image: "../images/tomato.jpeg",
    description: "A juicy red fruit used in salads and cooking.",
  },
  {
    name: "Potato",
    image: "../images/potato.jpeg",
    description: "A root vegetable that is a staple in many diets.",
  },
  {
    name: "Sugarcane",
    image: "../images/Sugercan.jpeg",
    description: "Used to make sugar and ethanol fuel.",
  },
];

const Crops = () => {
  const [search, setSearch] = useState("");

  const filteredCrops = crops.filter(({ name }) =>
    name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-400 min-h-screen">
      <h1 className="text-3xl font-bold text-black-800 mb-4 text-center">Available Crops</h1>

      {/* 🔍 Search Input */}
      <div className="max-w-md mx-auto mb-6">
        <input
          type="text"
          placeholder="Search crops..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 rounded-xl border border-green-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* 📦 Crop Cards */}
      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
        {filteredCrops.length > 0 ? (
          filteredCrops.map(({ name, image, description }) => (
            <Link to={`/crop/${name.toLowerCase()}`} key={name}>
              <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition">
                <img src={image} alt={name} className="h-48 w-full object-cover" />
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-green-700">{name}</h2>
                  <p className="text-sm text-gray-600 mt-2">{description}</p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">No crops found</p>
        )}
      </div>
    </div>
  );
};

export default Crops;
