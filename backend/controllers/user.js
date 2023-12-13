import User from "../models/user.js";
import jwt from "jsonwebtoken";

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: '3d' });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    const token = createToken(user._id);

    res.json({
      success: true,
      message: "Login Successful",
      user: { token, username: user?.name, user_id: user?._id },
    });
  } catch (error) {
    res.status(401).json({ success: false, message: error?.message });
  }
};

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.register(name, email, password);
    const token = createToken(user?.id);
    res.json({
      success: true,
      message: "Registration Successful",
      user: { token, username: user?.name, user_id: user?.id },
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error?.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json({ success: true, message: "All Users", users: users });
  } catch (error) {
    res.status(500).json({ success: false, message: error?.message });
  }
};
