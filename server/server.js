import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import path from 'path';

import connectDB from './config/mongodb.js';
import connectCloundinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';
import { clerkMiddleware } from "@clerk/express";


// App Config
const app = express();
const port = process.env.PORT || 4000;

connectDB();
connectCloundinary();

// middlewares
app.use(express.json());
app.use(cors());

// ✅ ADD THIS LINE (SERVE UPLOADS FOLDER)
app.use(
  "/uploads",
  express.static(path.join(process.cwd(), "uploads"))
);

// api endpoints
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);

// ✅ THIS LINE IS MANDATORY
app.use(clerkMiddleware());

app.get('/', (req, res) => {
  res.send("API Working...");
});

app.listen(port, () =>
  console.log("Server Started on port: " + port)
);
