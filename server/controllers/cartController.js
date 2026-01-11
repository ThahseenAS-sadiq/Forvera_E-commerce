import userModel from "../models/userModel.js";

const addToCart = async (req, res) => {
  try {
    console.log("ADD TO CART HIT");
    console.log("USER:", req.userId);
    console.log("BODY:", req.body);

    const clerkUserId = req.userId;
    const { itemId, size } = req.body;

    if (!itemId || !size) {
      return res.status(400).json({
        success: false,
        message: "ItemId and size are required",
      });
    }

    let user = await userModel.findOne({ clerkId: clerkUserId });

    if (!user) {
      user = await userModel.create({
        clerkId: clerkUserId,
        cartItems: {},
      });
    }

    // 🔥 SAFETY INITIALIZATION
    if (!user.cartItems) {
      user.cartItems = {};
    }

    if (!user.cartItems[itemId]) {
      user.cartItems[itemId] = {};
    }

    if (!user.cartItems[itemId][size]) {
      user.cartItems[itemId][size] = 0;
    }

    user.cartItems[itemId][size] += 1;

    user.markModified("cartItems");
    await user.save();

    console.log("SAVED CART:", user.cartItems);

    return res.status(200).json({
      success: true,
      cartItems: user.cartItems,
    });

  } catch (error) {
    console.error("ADD TO CART ERROR:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


/* ================= UPDATE CART ================= */
const updateCart = async (req, res) => {
  try {
    const clerkUserId = req.userId;
    const { itemId, size, quantity } = req.body;

    if (!itemId || !size || quantity === undefined) {
      return res.status(400).json({
        success: false,
        message: "ItemId, size, and quantity are required",
      });
    }

    const user = await userModel.findOne({ clerkId: clerkUserId });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // 🔥 ALWAYS USE cartItems
    if (!user.cartItems) {
      user.cartItems = {};
    }

    if (!user.cartItems[itemId]) {
      return res.status(400).json({
        success: false,
        message: "Item not in cart",
      });
    }

    if (quantity <= 0) {
      delete user.cartItems[itemId][size];

      if (Object.keys(user.cartItems[itemId]).length === 0) {
        delete user.cartItems[itemId];
      }
    } else {
      user.cartItems[itemId][size] = quantity;
    }

    user.markModified("cartItems");
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Cart updated",
      cartItems: user.cartItems,
    });

  } catch (error) {
    console.error("UPDATE CART ERROR:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


/* ================= GET USER CART ================= */
const getUserCart = async (req, res) => {
  try {
    const clerkUserId = req.userId;

    const user = await userModel.findOne({ clerkId: clerkUserId });

    return res.status(200).json({
      success: true,
      cartItems: user?.cartItems || {},
    });

  } catch (error) {
    console.error("GET CART ERROR:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export { addToCart, updateCart, getUserCart };


