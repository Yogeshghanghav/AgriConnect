import React, { useEffect, useState } from "react";
import axios from "axios";

const MyCrops = () => {
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  useEffect(() => {
    if (!user || !user._id) {
      setError("User not logged in.");
      setLoading(false);
      return;
    }

    axios
      .get(`http://localhost:5000/api/crops/user/${user._id}`)
      .then((res) => setCrops(res.data))
      .catch((err) => {
        console.error("❌ Error fetching crops:", err);
        setError("Failed to load your crops.");
      })
      .finally(() => setLoading(false));
  });

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My Crops</h2>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {crops.map((crop) => (
          <div key={crop._id} className="border p-4 rounded shadow">
            <h3 className="font-semibold text-lg">{crop.name}</h3>
            <p>Quantity: {crop.quantity}kg</p>
            <p>Price: ₹{crop.price}</p>
            <p>Location: {crop.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyCrops;
