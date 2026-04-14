import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

export default function BuyerMarket() {
  const [crops, setCrops] = useState([]);

  useEffect(() => {
    const fetchCrops = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/crops");
        setCrops(data);
      } catch (error) {
        console.error("Error fetching crops:", error);
      }
    };

    fetchCrops();
  }, []);

  return (
    <>
      <Navbar />
      <main className="p-6">
        <h2 className="text-2xl font-semibold mb-4">🛒 Available Crops</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {crops.map(({ _id, title, description, price, quantity, location }) => (
            <div key={_id} className="bg-white shadow rounded-2xl p-4">
              <h3 className="font-bold text-lg mb-1">{title}</h3>
              <p className="mb-1">{description}</p>
              <p><strong>Price:</strong> ₹{price}</p>
              <p><strong>Quantity:</strong> {quantity} kg</p>
              <p><strong>Location:</strong> {location}</p>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
