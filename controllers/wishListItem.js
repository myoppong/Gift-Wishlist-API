import { wishlistItem } from "../models/wishListItem.js"; // ✅ Match the correct export


// ✅ Add Wishlist Item

export const addWishlistItem = async (req, res) => {
    try {
        console.log("📥 Incoming Request Body:", req.body);

        // Extract userId correctly from the request body
        const { userId, name, price, storeLink } = req.body;

        if (!userId) {
            console.log("❌ Error: Missing User ID!");
            return res.status(400).json({ message: "User ID is required!" });
        }

        // Ensure the userId is assigned to the correct model field "user"
        const newItem = new wishlistItem({
            user: userId,  // 
            name,
            price,
            storeLink
        });

        console.log("🛠 Creating Wishlist Item:", newItem);

        await newItem.save();
        console.log("✅ Wishlist Item Saved:", newItem);

        res.status(201).json({ message: "Wishlist item added", item: newItem });

    } catch (error) {
        console.error("❌ Error adding wishlist item:", error);
        res.status(500).json({ message: "Error adding wishlist item", error: error.message });
    }
};






// ✅ Get Wishlist Items for a User
export const getWishlistItems = async (req, res, next) => {
    try {
        const userId = req.user.id;

        const items = await wishlistItemModel.find({ user: userId }).populate("user", "username email");
        res.status(200).json(items);

    } catch (error) {
        res.status(500).json({ message: "Error fetching wishlist", error: error.message });
    }
};

// ✅ Delete Wishlist Item
export const deleteWishlistItem = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const item = await wishlistItemModel.findOneAndDelete({ _id: id, user: userId });

        if (!item) {
            return res.status(404).json({ message: "Item not found or not authorized" });
        }

        res.status(200).json({ message: "Wishlist item deleted" });

    } catch (error) {
        res.status(500).json({ message: "Error deleting wishlist item", error: error.message });
    }
};

// ✅ Update Wishlist Item (optional)
export const updateWishlistItem = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const { name, price, storeLink } = req.body;

        const updatedItem = await wishlistItemModel.findOneAndUpdate(
            { _id: id, user: userId },
            { name, price, storeLink },
            { new: true }
        );

        if (!updatedItem) {
            return res.status(404).json({ message: "Item not found or not authorized" });
        }

        res.status(200).json({ message: "Wishlist item updated", item: updatedItem });

    } catch (error) {
        res.status(500).json({ message: "Error updating wishlist item", error: error.message });
    }
};
