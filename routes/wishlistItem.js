import express from "express";
import { addWishlistItem, getWishlistItems,getWishlistItemById, deleteWishlistItem, updateWishlistItem } from "../controllers/wishListItem.js";
import authMiddleware from "../Middlewares/authMiddleware.js"; // ✅ No curly braces {}

const wishlistItemRouter = express.Router();

// ✅ Protect routes by adding authMiddleware
wishlistItemRouter.post("/wishList", authMiddleware, addWishlistItem);
wishlistItemRouter.get("/wishList", authMiddleware, getWishlistItems); // ✅ Fetch all wishlists
wishlistItemRouter.get("/wishList/:id", authMiddleware, getWishlistItemById); // ✅ Fetch wishlist by ID
wishlistItemRouter.delete("/:id", authMiddleware, deleteWishlistItem);
wishlistItemRouter.put("/:id", authMiddleware, updateWishlistItem);

export default wishlistItemRouter;


