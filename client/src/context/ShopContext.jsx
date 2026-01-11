import React, { createContext, useState, useEffect } from "react";
import { products } from "../assets/assets.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {

  const currency = "₹";
  const delivery_fee = 40;
  const backendURL = import.meta.env.VITE_BACKEND_URL
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [selectedCategory, setSelectedCategory] = useState([]);


  const navigate = useNavigate();

  const { getToken, isSignedIn } = useAuth();

  /* ================= ADD TO CART ================= */
  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Select Product Size");
      return;
    }

    // Optimistic UI update
    setCartItems(prev => {
      const cartData = structuredClone(prev);
      if (!cartData[itemId]) cartData[itemId] = {};
      cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
      return cartData;
    });

    if (isSignedIn) {
      try {
        const token = await getToken();

        const res = await axios.post(
          `${backendURL}/api/cart/add`,
          { itemId, size },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.data.success) {
          setCartItems(res.data.cartItems);
        }

      } catch (error) {
        console.error("ADD TO CART ERROR:", error);
        toast.error("Failed to add item to cart");
      }
    }
  };



  /* ================= CART COUNT (NUMBER ONLY) ================= */
  const getCartCount = () => {
    let total = 0;

    for (const productId in cartItems) {
      for (const size in cartItems[productId]) {
        const qty = cartItems[productId][size];
        if (typeof qty === "number" && qty > 0) {
          total += qty;
        }
      }
    }

    return total; // ✅ Always a number
  };

  /* ================= CART AMOUNT ================= */
  const getCartAmount = () => {
    let totalAmount = 0;

    for (const productId in cartItems) {
      const product = products.find(p => p._id === productId);
      if (!product) continue;

      for (const size in cartItems[productId]) {
        const qty = cartItems[productId][size];
        if (typeof qty === "number" && qty > 0) {
          totalAmount += product.price * qty;
        }
      }
    }

    return totalAmount;
  };


  /* ================= GET PRODUCTS DATA ================= */
  const getProductsData = async () => {
    try {
      const response = await axios.get(`${backendURL}/api/product/list`);

      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("GET PRODUCTS ERROR:", error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getProductsData();
  }, [])

  /* ================= UPDATE QUANTITY ================= */
  const updateQuantity = async (itemId, size, quantity) => {

    // 1️⃣ Update UI immediately (optimistic update)
    setCartItems(prev => {
      const cartData = structuredClone(prev);

      if (cartData[itemId]) {
        if (quantity <= 0) {
          delete cartData[itemId][size];

          if (Object.keys(cartData[itemId]).length === 0) {
            delete cartData[itemId];
          }
        } else {
          cartData[itemId][size] = quantity;
        }
      }

      return cartData;
    });

    // 2️⃣ Sync with backend (Clerk auth)
    if (isSignedIn) {
      try {
        const token = await getToken(); // 🔐 Clerk token

        await axios.post(
          `${backendURL}/api/cart/update`,
          { itemId, size, quantity },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (error) {
        console.error("UPDATE CART ERROR:", error);
        toast.error("Failed to update cart");
      }
    }
  };


  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    setCartItems,
    addToCart,
    getCartCount,
    getCartAmount,
    updateQuantity,
    navigate,
    backendURL,
    selectedCategory,
    setSelectedCategory
  };

  useEffect(() => {
    console.log("Cart Items:", cartItems);
  }, [cartItems]);

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;

