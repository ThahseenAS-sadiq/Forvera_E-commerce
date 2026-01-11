import express from "express";
import {
  addProduct,
  listProducts,
  removeProduct,
  singleProduct,
} from "../controllers/productController.js";
import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";

const productRouter = express.Router();

/**
 * ADMIN — ADD PRODUCT
 */
productRouter.post(
  "/add",
  adminAuth, // 🔐 protect route
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct
);

/**
 * ADMIN — REMOVE PRODUCT
 */
productRouter.post(
  "/remove",
  adminAuth, // 🔐 admin only
  removeProduct
);

/**
 * USER / ADMIN — GET SINGLE PRODUCT
 */
productRouter.get(
  "/single/:id",
  singleProduct
);

/**
 * USER / ADMIN — LIST PRODUCTS
 */
productRouter.get(
  "/list",
  listProducts
);

export default productRouter;

