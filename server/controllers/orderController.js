import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";


const placeOrder = async (req, res) => {
  try {
    // 🔐 Clerk middleware must set this
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: User not authenticated",
      });
    }

    const { items, amount, address, paymentMethod } = req.body;

    // ✅ Validate request body
    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }

    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid order amount",
      });
    }

    if (!address) {
      return res.status(400).json({
        success: false,
        message: "Address is required",
      });
    }

    // ✅ Find user using Clerk ID
    const user = await userModel.findOne({ clerkId: userId });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const orderData = {
      userId,
      customer: {
        name: `${address.firstName} ${address.lastName}`,
        email: address.email,
        phone: address.phone,
      },
      items,
      amount,
      address,
      paymentMethod,
      payment: false,
      status: "Placed",
      date: Date.now(),
    };

    await orderModel.create(orderData);

    // ✅ Clear cart
    user.cartItems = {};
    await user.save();

    return res.status(201).json({
      success: true,
      message: "Order placed successfully",
    });

  } catch (error) {
    console.error("PLACE ORDER ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while placing order",
    });
  }
};


// placing orders using Stripe Method 
const placeOrderStripe = async (req, res) => {

}

// placing orders using Razorpay Method 
const placeOrderRazorpay = async (req, res) => {

}

/* ================= ADMIN: GET ALL ORDERS ================= */
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("ADMIN ORDERS ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================= USER + ADMIN ORDERS (UNIFIED) ================= */
const userOrders = async (req, res) => {
  try {
    const userId = req.userId;

    const orders = await orderModel.find({ userId });

    res.json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


/* ================= ADMIN: UPDATE ORDER STATUS ================= */
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    if (!orderId || !status) {
      return res.status(400).json({
        success: false,
        message: "OrderId and status are required",
      });
    }

    await orderModel.findByIdAndUpdate(orderId, { status });

    return res.status(200).json({
      success: true,
      message: "Order status updated successfully",
    });

  } catch (error) {
    console.error("UPDATE STATUS ERROR:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorpay,
  allOrders,
  userOrders,
  updateStatus,
};