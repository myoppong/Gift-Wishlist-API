import jwt from "jsonwebtoken";
import { userModel } from "../models/user.js";

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    // console.log("🔍 Received Auth Header:", authHeader); // ✅ Log the Authorization header

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1]; // Extract the token
    // console.log("🔑 Extracted Token:", token); // ✅ Log the extracted token

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log("✅ Decoded User:", decoded); // ✅ Log decoded token
        req.user = decoded; // ✅ Attach user info to request
        next();
    } catch (error) {
        console.error("❌ Token verification failed:", error.message);
        res.status(403).json({ message: "Invalid or expired token" });
    }
};

export default authMiddleware;




// export const authenticateUser = async (req, res, next) => {
//     try {
//         const token = req.header("Authorization");
//         console.log("Received Token:", token); // Log the token

//         if (!token) {
//             console.log("No token provided!");
//             return res.status(401).json({ message: "Access Denied. No token provided." });
//         }

//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         console.log("Decoded Token:", decoded); // Log decoded token data

//         req.user = await userModel.findById(decoded.id).select("-password");
//         console.log("Authenticated User:", req.user); // Log user info

//         next();
//     } catch (error) {
//         console.log("Token verification failed:", error.message);
//         res.status(401).json({ message: "Invalid token" });
//     }
// };

