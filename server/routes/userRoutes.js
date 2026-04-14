const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const { updateProfile } = require("../controllers/userController");
const protect = require("../middleware/authMiddleware");

router.put("/update-profile", protect, upload.single("avatar"), updateProfile);

module.exports = router;
