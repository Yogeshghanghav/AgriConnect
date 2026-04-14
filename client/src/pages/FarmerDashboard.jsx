import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FarmerDashboard = () => {
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const fetchCrops = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/crops/user/${user._id}`);
      setCrops(res.data);
    } catch (err) {
      setError("Failed to load your crops.",err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (cropId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this crop?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/crops/${cropId}`);
      setCrops((prevCrops) => prevCrops.filter((c) => c._id !== cropId));
    } catch (err) {
      alert("Failed to delete crop",err);
    }
  };

  useEffect(() => {
    if (!user || !user._id) {
      setError("User not logged in.");
      setLoading(false);
      return;
    }
    fetchCrops();
  }, []);

  return (
    <div className="min-h-screen bg-green-50 p-6">
      <h2 className="flex justify-center text-3xl font-bold mb-8 text-green-700">
        👨‍🌾 Farmer Dashboard
      </h2>

      {/* Farmer Info Card */}
      {user && (
        <div className="flex justify-center mb-8">
          <div className="bg-white border border-green-300 shadow-lg rounded-lg p-6 w-full max-w-md text-center">
            <h2 className="text-2xl font-bold text-green-700 mb-2">👨‍🌾 Farmer Info</h2>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>ID:</strong> {user._id}</p>
          </div>
        </div>
      )}

      {/* Loader & Error */}
      {loading && <p>Loading crops...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Crop Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {crops.map((crop) => (
          <div key={crop._id} className="bg-white shadow-md rounded-lg p-4 border border-green-200">
            <h3 className="text-xl font-semibold text-green-800">{crop.name}</h3>
            <p className="text-sm text-gray-600">📦 Quantity: {crop.quantity} kg</p>
            <p className="text-sm text-gray-600">💰 Price: ₹{crop.price}</p>
            <p className="text-sm text-gray-600">📍 Location: {crop.location}</p>

            <div className="mt-4 flex justify-between">
              <button
                onClick={() => navigate(`/edit-crop/${crop._id}`)}
                className="bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-600"
              >
                ✏️ Edit
              </button>
              <button
                onClick={() => handleDelete(crop._id)}
                className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
              >
                🗑️ Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FarmerDashboard;
