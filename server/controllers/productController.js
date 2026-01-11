import productModel from "../models/productModel.js";
import { v2 as cloudinary } from "cloudinary";

const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
    } = req.body;

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.json({ success: false, message: "Images required" });
    }

    const imageUrls = [];

    for (const files of Object.values(req.files)) {
      for (const file of files) {
        const result = await cloudinary.uploader.upload(
          `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
          { folder: "products" }
        );
        imageUrls.push(result.secure_url);
      }
    }

    const product = await productModel.create({
      name,
      description,
      price,
      category,
      subCategory,
      sizes: JSON.parse(sizes),
      bestseller: bestseller === "true" || bestseller === true,
      image: imageUrls,
      date: Date.now(),
    });

    res.status(201).json({
      success: true,
      message: "Product added successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


//fuction for list products
const listProducts = async (req, res) => {

  try {
    const products = await productModel.find({});
    res.json({ success: true, products })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message, })
  }

}

//fuction for remove products
const removeProduct = async (req, res) => {

  try {

    await productModel.findByIdAndDelete(req.body.id)
    res.json({ success: true, message: "Products Removed" })

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message, })
  }

}

//fuction for single products
const singleProduct = async (req, res) => {

  try {
    const { productId } = req.body
    const product = await productModel.findById(productId)
    res.json({ success: true, product })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message, })
  }

}

export { addProduct, listProducts, removeProduct, singleProduct };