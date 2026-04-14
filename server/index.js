const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const cropRoutes = require("./routes/cropRoutes");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174"]
}));
app.use(express.json());
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));
app.use("/api/auth", authRoutes);
app.get("/", (req, res) => {
  res.send("AgriConnect Backend Running");
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
