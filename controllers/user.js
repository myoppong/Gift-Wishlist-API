import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { userModel } from "../models/user.js";
import dotenv from "dotenv";
import { userValidator } from "../validators/validator.js";

dotenv.config();


// export const registerUser = async (req, res) =>{

//     const {error,value} = userValidator.validate(req.body)
//     if(error) {
//         return res.status(400).json({message: error.details[0].message})
//     }
//     console.log(value)
//     const existingUser = await userModel.findOne({email: value.email})
//     console.log("existingUser:", existingUser)

//     if(existingUser){
//         res.status(409).json({message:"user already exist"})
//     } else {
//         const hashedPassword= bcrypt.hash(value.password,12)
//         const newUser= await userModel.create({
//             username: value.username,
//             email:value.email,
//             password: hashedPassword

//         })
//        return res.status(201).json({
//             message:"user created successfully ",
//             data:newUser

//         })
//     }
// }

// Register User
export const registerUser = async (req, res) => {
    try {
      const { username, email, password } = req.body;
  
      // Check if user already exists
      const existingUser = await userModel.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists!" });
      }
  
      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Create new user
      const newUser = new userModel({
        username,
        email,
        password: hashedPassword,
      });
  
      await newUser.save();
  
      console.log(`✅ New user registered: ${username} (${email})`); // ✅ Terminal confirmation

      res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
      console.error("❌ Registration Error:", error.message); // ✅ Log errors in terminal
      res.status(500).json({ message: "Server Error", error: error.message });
    }
  };
  

// Login User
export const loginUser = async (req, res) => {
  try {
    console.log("🔹 Login request received:"); // Log request body

    const { email, password } = req.body;

    // Find user by email
    const user = await userModel.findOne({ email });
    if (!user) {
      console.log("❌ User not found with email:", email);
      return res.status(400).json({ message: "Invalid credentials!" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("❌ Incorrect password for email:", email);
      return res.status(400).json({ message: "Invalid credentials!" });
    }

    // Generate JWT Token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    console.log("✅ User logged in:", user.email); // Log successful login

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("❌ Login error:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

