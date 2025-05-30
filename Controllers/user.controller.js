import User from "../Models/user.schema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Register a new user || signup the user

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    console.log(hashPassword);
    const newUser = new User({ username, email, password: hashPassword });
    await newUser.save();
    res
      .status(200)
      .json({ message: "User Registered Successfully", data: newUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//login user

export const loginUser = async (req,res) => {
  try {
    const { username, email,} = req.body;
    const user = await User.findOne({email})
    if(!user){
      return res.status(404).json({message: "user not found"})
    }
    const passwordMatch = await bcrypt.compare(password,user.password)
    if(!passwordMatch){
      return res.status(404).json({message: "invalid password"})
    }
    const token = jwt.sign({_id:user._id},process.env.JWT_SECRET, {expiresIn:"1hr"});
    user.token = token;
    await user.save();
    res
      .status(200)
      .json({ message: "User Loggedin Successfully", token:token });

    } catch (error) {
    res.status(500).json({ message: error.message });
  }
}