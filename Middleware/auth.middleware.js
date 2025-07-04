import jwt from "jsonwebtoken";
import User from "../Models/user.schema.js";
import dotenv from "dotenv";

dotenv.config();

export const authMiddleware = async (req, res, next) => {
  //const token = req.header("Authorization");
  const token = req.headers.authorization?.split(" ")[1]; //split('')[1]= bearer token

  if (!token) {
    return res.status(404).json({ message: "Token missing" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //console.log("decoded", decoded);
    req.user = decoded;
    console.log("req.user:decoded", req.user);
    //const user = await User.findById(req.user._id);
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
  export const adminMiddleware = async (req, res, next) => {
    if (req.user.role !== "admin") {
      return res
        .status(404)
        .json({ message: "Access denied only admin can view" });
    }
    next();
}
