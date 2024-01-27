const User = require("../models/user");

const createUser = async (req, res, next) => {
  try {
    const { fullname, phoneNumber, isBuyer, isSeller } = req.body;

    const newUser = new User({ fullname, phoneNumber, isBuyer, isSeller });
    await newUser.save();

    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    next(error);
  }
};

const updateUserRole = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const { isBuyer, isSeller } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update user roles
    if (isBuyer !== undefined) {
      user.isBuyer = isBuyer;
    }

    if (isSeller !== undefined) {
      user.isSeller = isSeller;
    }

    await user.save();

    res.json({ message: "User roles updated successfully", user });
  } catch (error) {
    next(error);
  }
};

const getUserProfile = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ user });
  } catch (error) {
    next(error);
  }
};

module.exports = { createUser, updateUserRole, getUserProfile };
