import express from "express";
import {
  placeOrder, 
  allOrders,
  userOrders,
  updateStatus,
  placeOrderStripe,
  placeOrderRazorpay,

} from "../controllers/orderController.js";

import authUser from "../middleware/auth.js";
import adminAuth from "../middleware/adminAuth.js";

const orderRouter = express.Router();

// USER
orderRouter.post("/place", authUser, placeOrder);
orderRouter.post("/userorders", authUser, userOrders);

// USER
orderRouter.get("/user", authUser, userOrders);

// ADMIN (can fetch all OR by userId)
orderRouter.get("/admin", adminAuth, userOrders);


//Payment Features
orderRouter.post("/stripe", adminAuth, placeOrderStripe);
orderRouter.post("/razorpay", adminAuth, updateStatus);

// ADMIN
orderRouter.post("/list", adminAuth, allOrders);
orderRouter.post("/status", adminAuth, updateStatus);

export default orderRouter;



