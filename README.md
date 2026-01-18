# Forvera E-Commerce 🛍️

🌐 **Live Frontend:**  
https://forvera-e-commerce-xxv6.vercel.app/

⚙️ **Live Backend (Render):**  
https://forvera-backend.onrender.com/

Forvera is a **full-stack MERN e-commerce application** with **User and Admin panels**, built using **React, Node.js, Express, MongoDB**, and **Clerk Authentication**.  
The backend is deployed on **Render**, and the frontend is deployed on **Vercel**.

---

## 🚀 Features

### 👤 User Features
- User authentication using **Clerk**
- Browse products dynamically from backend
- Product filtering & search
- Add to cart with size selection
- Update cart quantity
- Place orders
- View user orders

### 🧑‍💼 Admin Panel Features
- Admin login with JWT authentication
- Add products with multiple images
- Upload images using **Cloudinary**
- Manage products (add / remove)
- View all orders
- Update order status
- Secure admin-only APIs

---

## 🛠️ Tech Stack

### Frontend
- React
- React Router
- Context API
- Axios
- Clerk Authentication
- React Toastify

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT (Admin Authentication)
- Multer (Image upload)
- Cloudinary (Image storage)

---

## 📁 Project Structure
E-COMMERCE/
├── client/
│ └── src/
│ ├── components/
│ │ ├── admin/
│ │ ├── Navbar.jsx
│ │ ├── Footer.jsx
│ │ └── ProductItem.jsx
│ ├── context/
│ │ └── ShopContext.jsx
│ └── pages/
│
├── server/
│ ├── config/
│ │ ├── mongodb.js
│ │ └── cloudinary.js
│ ├── controllers/
│ │ ├── productController.js
│ │ ├── cartController.js
│ │ ├── orderController.js
│ │ └── userController.js
│ ├── middleware/
│ │ ├── auth.js
│ │ ├── adminAuth.js
│ │ ├── clerkAuth.js
│ │ └── multer.js
│ ├── models/
│ │ ├── productModel.js
│ │ ├── userModel.js
│ │ └── orderModel.js
│ ├── routes/
│ │ ├── productRoute.js
│ │ ├── cartRoute.js
│ │ ├── orderRoute.js
│ │ └── userRoute.js
│ ├── uploads/
│ ├── server.js
│ └── .env


---

## 🔐 Authentication & Authorization

- **Users**: Authenticated using **Clerk**
- **Admins**: Authenticated using **JWT**
- Role-based route protection using middleware
- Secure token-based API access

---

## 🖼️ Image Handling

- Images uploaded by Admin using **Multer**
- Stored in **Cloudinary**
- Only image URLs are saved in MongoDB
- Frontend dynamically displays images from backend

---

## 📡 API Endpoints

### Product APIs
| Method | Endpoint | Access |
|------|---------|-------|
| GET | `/api/product/list` | Public |
| GET | `/api/product/single/:id` | Public |
| POST | `/api/product/add` | Admin |
| POST | `/api/product/remove` | Admin |

### Cart APIs
| Method | Endpoint | Access |
|------|---------|-------|
| POST | `/api/cart/add` | User |
| POST | `/api/cart/update` | User |
| POST | `/api/cart/get` | User |

### Order APIs
| Method | Endpoint | Access |
|------|---------|-------|
| POST | `/api/order/place` | User |
| GET | `/api/order/user` | User |
| POST | `/api/order/list` | Admin |
| POST | `/api/order/status` | Admin |

---

## 🔄 Data Flow (Admin → User)

1. Admin adds product → image uploaded to Cloudinary
2. Product saved in MongoDB
3. Frontend fetches products via API
4. Collection page UI updates dynamically
5. Cart & pricing remain in sync

---

## 🧠 Architecture

- Follows **MVC architecture**
- Separation of concerns:
  - Routes → Endpoints
  - Controllers → Logic
  - Models → Database
  - Middleware → Security & validation
- Scalable & maintainable design

---

## ⚙️ Environment Variables

### Backend `.env`
PORT=4000
MONGODB_URL=your_mongodb_url
JWT_SECRET=your_jwt_secret
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
CLERK_SECRET_KEY=your_clerk_secret

### Frontend `.env`
VITE_BACKEND_URL=http://localhost:4000  or render 
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key

---

## 📌 Future Enhancements

- 💳 **Payment Gateway Integration**  
  Integration of **Stripe / Razorpay** for secure online payments.

- ⭐ **Product Reviews & Ratings**  
  Users can review and rate products.

- 📊 **Admin Analytics Dashboard**  
  Visual insights for sales, revenue, and user activity.

- 🚚 **Order Tracking System**  
  Live order status updates for users.

- ❤️ **Wishlist Feature**  
  Save products for later purchase.

---

## 🤖 AI-Powered Product Management (Planned)

- When an admin uploads a product image, an **AI system** will:
  - Analyze the product image
  - Auto-generate **product name**
  - Generate **product description**
  - Suggest category and tags
- Reduces manual effort and improves listing quality.

---

## 🏬 Multi-Store Marketplace System (Planned)

- Introduce **Store Accounts** in addition to Admin and Users.
- Stores can:
  - Register with a unique store name
  - Add products under their store
- Admin approval workflow:
  - Admin reviews and approves store registration
  - Admin reviews and approves store-added products
- Once approved:
  - Products are published to users
  - Orders are associated with the respective store

This will convert the platform into a **multi-vendor marketplace** similar to Amazon or Flipkart.

---

## 👨‍💻 Author

**Thahseen A.S**  
Final Year AIML Student  
MERN Stack Developer  

---
