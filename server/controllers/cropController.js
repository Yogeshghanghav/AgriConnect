const Crop = require("../models/Crop");

// ✅ Add a new crop (with validation)
const createCrop = async (req, res) => {
  const { name, quantity, price, location, userId } = req.body;

  if (!name || !quantity || !price || !location || !userId) {
    return res.status(400).json({ message: "All fields including userId are required." });
  }

  try {
    const newCrop = new Crop({ name, quantity, price, location, userId });
    await newCrop.save();
    res.status(201).json(newCrop);
  } catch (err) {
    console.error("❌ Error saving crop:", err);
    res.status(500).json({ message: "Failed to add crop" });
  }
};

// ✅ Get all crops (for buyer market)
const getAllCrops = async (req, res) => {
  try {
    const crops = await Crop.find().populate("userId", "email");
    res.status(200).json(crops);
  } catch (err) {
    console.error("❌ Error fetching all crops:", err);
    res.status(500).json({ message: "Failed to fetch crops" });
  }
};

// ✅ Get crops by specific user (for farmer profile)
const getCropsByUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const crops = await Crop.find({ userId });
    res.status(200).json(crops);
  } catch (err) {
    console.error("❌ Error fetching user crops:", err);
    res.status(500).json({ message: "Failed to fetch user crops" });
  }
};

// ✅ Delete a crop by ID
const deleteCrop = async (req, res) => {
  try {
    const cropId = req.params.id;
    await Crop.findByIdAndDelete(cropId);
    res.status(200).json({ message: "Crop deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting crop:", err);
    res.status(500).json({ message: "Failed to delete crop" });
  }
};

// ✅ Update a crop by ID
const updateCrop = async (req, res) => {
  try {
    const cropId = req.params.id;
    const updatedData = req.body;

    const updatedCrop = await Crop.findByIdAndUpdate(cropId, updatedData, {
      new: true,
    });

    if (!updatedCrop) {
      return res.status(404).json({ message: "Crop not found" });
    }

    res.status(200).json(updatedCrop);
  } catch (err) {
    console.error("❌ Error updating crop:", err);
    res.status(500).json({ message: "Failed to update crop" });
  }
};

// ✅ Export all controller functions
module.exports = {
  createCrop,
  getAllCrops,
  getCropsByUser,
  deleteCrop,
  updateCrop,
};
