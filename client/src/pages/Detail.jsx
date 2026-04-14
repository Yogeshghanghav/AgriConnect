import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

export default function FarmerDashboard() {
  // State to hold the crops data
  // and filter it based on the logged-in farmer

  const [crops, setCrops] = useState([]);
  // Assuming user data is stored in localStorage after login
  // You might want to replace this with a more secure method
  // of managing user state, like using context or Redux
  // For this example, we'll assume user data is stored as a JSON string
  // and contains an 'id' field for the farmer
  // Adjust this according to your actual user management logic
  // Fetching user data from localStorage
  // This is a simple example; in a real app, you might use context or Redux
  // to manage user state more securely
  // Assuming user data is stored in localStorage after login
  // You might want to replace this with a more secure method
  // of managing user state, like using context or Redux
  // For this example, we'll assume user data is stored as a JSON string
  // and contains an 'id' field for the farmer
  // Adjust this according to your actual user management logic
  // Fetching user data from localStorage
  // This is a simple example; in a real app, you might use context or Redux

  // to manage user state more securely
  // Assuming user data is stored in localStorage after login
  // You might want to replace this with a more secure method
  // of managing user state, like using context or Redux
  // For this example, we'll assume user data is stored as a JSON string
  // and contains an 'id' field for the farmer
  // Adjust this according to your actual user management logic
  // Fetching user data from localStorage
  // This is a simple example; in a real app, you might use context or Redux
  // to manage user state more securely
  // Assuming user data is stored in localStorage after login
  // You might want to replace this with a more secure method
  // of managing user state, like using context or Redux
  // For this example, we'll assume user data is stored as a JSON string
  // and contains an 'id' field for the farmer
  // Adjust this according to your actual user management logic
  // Fetching user data from localStorage
  // This is a simple example; in a real app, you might use context or Redux
  // to manage user state more securely
  // Assuming user data is stored in localStorage after login
  // You might want to replace this with a more secure method
  // of managing user state, like using context or Redux
  // For this example, we'll assume user data is stored as a JSON string
  // and contains an 'id' field for the farmer
  // Adjust this according to your actual user management logic
  // Fetching user data from localStorage
  // This is a simple example; in a real app, you might use context or Redux
  // to manage user state more securely
  // For this example, we'll assume user data is stored as a JSON string
  // and contains an 'id' field for the farmer
  // Adjust this according to your actual user management logic
  // For this example, we'll assume user data is stored as a JSON string
  // and contains an 'id' field for the farmer
  // Adjust this according to your actual user management logic

  const user = JSON.parse(localStorage.getItem("user"));


  useEffect(() => {

    const fetchCrops = async () => {

      try {

        const res = await axios.get("http://localhost:5000/api/crops");

        const userCrops = res.data.filter(crop => crop.farmer === user.id);

        setCrops(userCrops);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCrops();

  }, [user.id]);

  return (
    <>
      <Navbar />
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-4">🌾 My Crops</h2>
        {crops.length === 0 ? (
          <p>No crops uploaded yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {crops.map(crop => (
              <div key={crop._id} className="bg-white shadow-md p-4 rounded">
                <h3 className="text-lg font-bold">{crop.title}</h3>
                <p>{crop.description}</p>
                <p>Qty: {crop.quantity} kg</p>
                <p>Price: ₹{crop.price}</p>
                <p>Location: {crop.location}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
