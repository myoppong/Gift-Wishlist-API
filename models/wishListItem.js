import { Schema, model } from "mongoose";

const wishlistItemSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Changed userId → user
    name: { type: String, required: true },
    price: { type: Number },
    storeLink: { type: String }
}, { timestamps: true });

export const wishlistItemModel = model('wishlistItem', wishlistItemSchema);

