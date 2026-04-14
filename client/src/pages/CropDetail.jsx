import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const cropData = {
  wheat: {
    name: "Wheat",
    image: "../assets/wheat.webp",
    description: "A cereal grain for bread, pasta, and baked goods.",
  },
  rice: {
    name: "Rice",
    image: "../images/rice2.jpeg",
    description: "Grown in paddies, staple for more than half the world.",
  },
  maize: {
    name: "Maize",
    image: "../images/maize2.jpeg",
    description: "Also known as corn, vital for livestock feed and food.",
  },
  tomato: {
    name: "Tomato",
    image: "../images/tomato2.jpeg",
    description: "Rich in antioxidants, used in salads, sauces, and curries.",
  },
  potato: {
    name: "Potato",
    image: "../images/potato2.jpeg",
    description: "Underground tuber used for fries, curries, and more.",
  },
  sugarcane: {
    name: "Sugarcane",
    image: "../images/sugercan2.jpeg",
    description: "Juicy stalk for sugar, jaggery, and ethanol fuel.",
  }
};

const CropDetail = () => {
  const { cropId } = useParams();
  const navigate = useNavigate();

  const crop = cropData[cropId];

  if (!crop) {
    return (
      <div className="p-6 text-center text-red-600">
        Invalid crop ID or crop not found.
      </div>
    );
  }

  const { name, image, description } = crop;

  return (
    <div className="p-6 min-h-screen bg-green-50">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700"
      >
        ← Back
      </button>

      <h1 className="text-3xl font-bold text-green-700 text-center mb-4">{name}</h1>

      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <img src={image} alt={name} className="w-full h-80 object-cover" />
        <div className="p-6 text-gray-700 text-lg">{description}</div>
      </div>
    </div>
  );
};

export default CropDetail;
