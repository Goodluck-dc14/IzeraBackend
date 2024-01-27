// routes/productRoutes.js
const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const {
  createProduct,
  getProductDetails,
} = require("../controllers/ProductController");

router.route("/products/:userId").post(upload.single("image"), createProduct);

router.get("/products/:productId", getProductDetails);

module.exports = router;
