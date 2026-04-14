const express = require("express");
const router = express.Router();
const {
  createCrop,
  getAllCrops,
  getCropsByUser,
    deleteCrop, 
     updateCrop,

} = require("../controllers/cropController");

router.get("/all", getAllCrops);
router.get("/user/:id", getCropsByUser);
router.post("/add", createCrop);
router.delete("/:id", deleteCrop);
router.put("/:id", updateCrop);


module.exports = router;
