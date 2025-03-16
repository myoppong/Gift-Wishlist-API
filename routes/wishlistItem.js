import express from "express";
import { addWishlistItem, getWishlistItems, deleteWishlistItem, updateWishlistItem } from "../controllers/wishListItem.js";
import { authenticateUser } from "../middlewares/authMiddleware.js"; 

const wishlistItemRouter = express.Router();

// Define routes with the correct middleware
wishlistItemRouter.post("/wishList",  addWishlistItem);
wishlistItemRouter.get("/",  getWishlistItems);
wishlistItemRouter.delete("/:id", deleteWishlistItem);
wishlistItemRouter.put("/:id", updateWishlistItem);

export default wishlistItemRouter;

