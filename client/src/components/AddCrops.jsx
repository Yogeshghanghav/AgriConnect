import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddCrop = () => {
  const [crop, setCrop] = useState({
    name: "",
    image: "",
    description: "",
    quantity: "",
    location: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setCrop({ ...crop, [e.target.name]: e.target.value });
  };

  // ✅ handleSubmit must be async
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!crop.name || !crop.description) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      const response = await axios.get("http://localhost:5000/api/crops", crop);
      if (response.status !== 200){
        throw new Error("Failed to fetch crops");

      }
      // submit the crop data
      await axios.post("http://localhost:5000/api/crops", crop);
      setCrop({
        name:" ",
        image:" ",
        description:" ",
        quantity:"",
        location:""
      })
      //show success message
      
      toast.success("✅ Crop submitted successfully!");
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      toast.error("❌ Error submitting crop.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Add New Crop</h2>
      <ToastContainer position="top-center" />

      {submitted && (
        <p className="mb-4 text-green-600 font-medium">
          Crop added successfully!
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Crop Name"
          value={crop.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={crop.image}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={crop.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={crop.quantity}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={crop.location}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Add Crop
        </button>
      </form>
    </div>
  );
};

export default AddCrop;