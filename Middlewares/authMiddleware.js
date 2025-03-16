import jwt from "jsonwebtoken";
import { userModel } from "../models/user.js";

export const authenticateUser = async (req, res, next) => {
    try {
        const token = req.header("Authorization");
        console.log("Received Token:", token); // Log the token

        if (!token) {
            console.log("No token provided!");
            return res.status(401).json({ message: "Access Denied. No token provided." });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded Token:", decoded); // Log decoded token data

        req.user = await userModel.findById(decoded.id).select("-password");
        console.log("Authenticated User:", req.user); // Log user info

        next();
    } catch (error) {
        console.log("Token verification failed:", error.message);
        res.status(401).json({ message: "Invalid token" });
    }
};

