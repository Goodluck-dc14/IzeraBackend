// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const {
  createUser,
  updateUserRole,
  getUserProfile,
} = require("../controllers/UserController");

router.post("/users", createUser);
router.patch("/users/:userId", updateUserRole);
router.get("/users/:userId", getUserProfile);

module.exports = router;
