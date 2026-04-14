import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const AddOrEditCrop = () => {
  const { cropId } = useParams(); // If editing
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    price: "",
    location: "",
    image: null,
  });

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (cropId) {
      axios.get(`http://localhost:5000/api/crops/${cropId}`)
        .then(res => {
          const { name, quantity, price, location } = res.data;
          setFormData({ name, quantity, price, location, image: null });
        })
        .catch(err => console.error("Error loading crop:", err));
    }
  }, [cropId]);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("name", formData.name);
    form.append("quantity", formData.quantity);
    form.append("price", formData.price);
    form.append("location", formData.location);
    form.append("userId", user._id);
    if (formData.image) form.append("image", formData.image);

    try {
      if (cropId) {
        await axios.put(`http://localhost:5000/api/crops/${cropId}`, form);
        alert("Crop updated successfully!");
      } else {
        await axios.post("http://localhost:5000/api/crops", form);
        alert("Crop added successfully!");
      }
      navigate("/my-crops");
    } catch (err) {
      alert("Failed to submit crop data.",err);
    }
  };

  return (
    <div className="min-h-screen bg-green-50 flex justify-center items-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-xl space-y-4"
        encType="multipart/form-data"
      >
        <h2 className="text-2xl font-bold text-center text-green-700">
          {cropId ? "✏️ Edit Crop" : "🌱 Add New Crop"}
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Crop Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded"
        />

        <input
          type="number"
          name="quantity"
          placeholder="Quantity in kg"
          value={formData.quantity}
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded"
        />

        <input
          type="number"
          name="price"
          placeholder="Price per kg"
          value={formData.price}
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded"
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded"
        />

        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className="w-full"
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          {cropId ? "Update Crop" : "Add Crop"}
        </button>
      </form>
    </div>
  );
};

export default AddOrEditCrop;
