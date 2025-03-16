import express from 'express';
import dotenv from "dotenv";
import { connect } from 'mongoose';
import wishlistItemRouter from './routes/wishlistItem.js';
import userRouter from './routes/user.js';
import authRouter from "./routes/auth.js";

dotenv.config();  // Load environment variables

// Check if MONGO_URI is loaded
if (!process.env.MONGO_URI) {
    console.error("❌ MONGO_URI is not defined. Check your .env file.");
    process.exit(1);
}

// Connect to MongoDB
await connect(process.env.MONGO_URI);
console.log("✅ MongoDB Connected Successfully");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(authRouter);
app.use(userRouter);
app.use(wishlistItemRouter);

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
