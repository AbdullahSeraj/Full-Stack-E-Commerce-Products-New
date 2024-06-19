const User = require("../models/User");

const getAllUsers = async (req, res) => {
  const users = await User.find().select("-password").lean();
  if (!users.length) {
    return res.status(400).json({ message: "No users found" });
  }
  res.json(users);
};

const getOneUser = async (req, res) => {
  const userId = req.params.userId;
  const user = await User.findById(userId).select("-password").lean();
  if (!user) {
    return res.status(404).json({ msg: "User not found" });
  }
  res.json(user);
};

const getUser = async (req, res) => {
  const userId = req.user;
  const user = await User.findById(userId).select("-password").lean();
  if (!user) {
    return res.status(404).json({ msg: "User not found" });
  }
  res.json(user);
};

const updateRole = async (req, res) => {
  const userId = req.params.userId;
  const { role } = req.body;

  try {
    const updateUser = await User.findByIdAndUpdate(
      userId,
      { role },
      { new: true }
    );

    res.json(updateUser);
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
};

module.exports = { getAllUsers, getUser, updateRole, getOneUser };
