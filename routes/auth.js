import express from "express";
import { registerUser, loginUser } from "../controllers/user.js";

const authRouter = express.Router();

authRouter.post("/register", registerUser); // Ensure this matches Postman
authRouter.post("/login", loginUser);

export default authRouter;
