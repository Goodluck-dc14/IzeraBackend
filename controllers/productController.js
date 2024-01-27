const Product = require("../models/product");
const User = require("../models/user");
const cloudinary = require("../middleware/cloudinary");

const createProduct = async (req, res, next) => {
  try {
    const { name, category, description, price, address, image } = req.body;

    const sellerId = req.params.userId;

    // Verify if the seller (user) exists
    const seller = await User.findById(sellerId);

    if (!seller) {
      return res.status(404).json({ error: "Seller not found" });
    }

    const files = req.file;

    if (!files) {
      return res.status(400).json({ error: "Image is required" });
    }

    const result = await cloudinary.uploads(files.path, "Images");

    // Create a new product and reference the seller
    const newProduct = new Product({
      name,
      category,
      description,
      price,
      address,
      seller: seller._id,
      image: result.url,
    });

    // Save the product
    await newProduct.save();

    // Add the product reference to the seller's products array
    seller.products.push(newProduct._id);
    await seller.save();

    res
      .status(201)
      .json({ message: "Product created successfully", product: newProduct });
  } catch (error) {
    next(error);
  }
};

const getProductDetails = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findById(productId).populate(
      "seller",
      "fullname phoneNumber"
    );

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json({ product });
  } catch (error) {
    next(error);
  }
};

module.exports = { createProduct, getProductDetails };
