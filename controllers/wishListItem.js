import { wishlistItemModel } from "../models/wishListItem.js"; // ✅ Match the correct export


export const addWishlistItem = async (req, res, next) => {
    try {
        console.log("🔍 Incoming request:", req.body);
        console.log("🛠️ Authenticated user:", req.user);  // Check if user is attached

        const { name, price, storeLink } = req.body;
        const userId = req.user?.id; // ✅ Use optional chaining to avoid crashes

        if (!userId) {
            console.error("❌ Error: No user ID found in request.");
            return res.status(401).json({ message: "Unauthorized: No user ID" });
        }

        const newItem = new wishlistItemModel({
            user: userId,
            name,
            price,
            storeLink
        });

        await newItem.save();
        console.log("✅ Wishlist item added successfully:", newItem);
        res.status(201).json({ message: "Wishlist item added", item: newItem });

    } catch (error) {
        console.error("🚨 Server Error:", error);  // ✅ Log full error in the terminal
        res.status(500).json({ message: "Error adding wishlist item", error: error.message });
    }
};


// ✅ Add Wishlist Item

// export const addWishlistItem = async (req, res) => {
//     try {
//         console.log("📥 Incoming Request Body:", req.body);

//         // Extract userId correctly from the request body
//         const { userId, name, price, storeLink } = req.body;

//         if (!userId) {
//             console.log("❌ Error: Missing User ID!");
//             return res.status(400).json({ message: "User ID is required!" });
//         }

//         // Ensure the userId is assigned to the correct model field "user"
//         const newItem = new wishlistItem({
//             user: userId,  // 
//             name,
//             price,
//             storeLink
//         });

//         console.log("🛠 Creating Wishlist Item:", newItem);

//         await newItem.save();
//         console.log("✅ Wishlist Item Saved:", newItem);

//         res.status(201).json({ message: "Wishlist item added", item: newItem });

//     } catch (error) {
//         console.error("❌ Error adding wishlist item:", error);
//         res.status(500).json({ message: "Error adding wishlist item", error: error.message });
//     }
// };





// ✅ Get All Wishlist Items
export const getWishlistItems = async (req, res) => {
    try {
        const userId = req.user.id;

        const items = await wishlistItemModel.find({ user: userId }).populate("user", "username email");
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: "Error fetching wishlist", error: error.message });
    }
};

// ✅ Get Wishlist Item by ID
export const getWishlistItemById = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id; // ✅ Get user ID from token

        // Find item by ID and ensure it belongs to the authenticated user
        const wishlistItem = await wishlistItemModel.findOne({ _id: id, user: userId });

        if (!wishlistItem) {
            return res.status(404).json({ message: "Wishlist item not found" });
        }

        res.status(200).json({ item: wishlistItem });
    } catch (error) {
        console.error("❌ Error fetching wishlist item:", error.message);
        res.status(500).json({ message: "Server Error", error: error.message });
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
