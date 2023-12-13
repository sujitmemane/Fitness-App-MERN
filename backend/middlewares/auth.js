import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const  authMiddleware = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Please provide a valid token",
      });
    }

    const token = authorization.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Token is missing",
      });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedToken) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Invalid token",
      });
    }

    const { _id } = decodedToken;
    const user = await User.findOne({ _id }).select({ _id });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: User not found",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Authentication Error:", error);
    res.status(401).json({
      success: false,
      message: "Unauthorized: Invalid token or authentication error",
    });
  }
};


