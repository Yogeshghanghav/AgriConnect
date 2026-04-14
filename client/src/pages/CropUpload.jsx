import { useState } from "react";
import axios from "axios";

export default function CropUpload() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    quantity: "",
    price: "",
    location: "",
    image: "",
  });

  const { title, description, quantity, price, location, image } = formData;

  const handleChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const farmerId = "660f9d6e4f6c8c1234567890";

      const cropData = { ...formData, farmer: farmerId };

      await axios.post("http://localhost:5000/api/crops", cropData);

      alert("Crop uploaded successfully!");
      setFormData({
        title: "",
        description: "",
        quantity: "",
        price: "",
        location: "",
        image: "",
      });
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Crop upload failed");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">🌾 Upload New Crop</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          value={title}
          onChange={handleChange}
          className="w-full border p-2"
          placeholder="Crop Title"
          required
        />
        <textarea
          name="description"
          value={description}
          onChange={handleChange}
          className="w-full border p-2"
          placeholder="Description"
        />
        <input
          name="quantity"
          type="number"
          value={quantity}
          onChange={handleChange}
          className="w-full border p-2"
          placeholder="Quantity (kg)"
          required
        />
        <input
          name="price"
          type="number"
          value={price}
          onChange={handleChange}
          className="w-full border p-2"
          placeholder="Price (₹)"
          required
        />
        <input
          name="location"
          value={location}
          onChange={handleChange}
          className="w-full border p-2"
          placeholder="Location"
          required
        />
        <input
          name="image"
          value={image}
          onChange={handleChange}
          className="w-full border p-2"
          placeholder="Image URL (optional)"
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white font-semibold py-2 rounded hover:bg-green-700 transition"
        >
          Upload Crop
        </button>
      </form>
    </div>
  );
}
