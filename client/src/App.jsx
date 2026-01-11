import React from 'react'
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home.jsx'
import Collection from './pages/Collection.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Login from './pages/Login.jsx'
import Cart from './pages/Cart.jsx'
import Product from './pages/Product.jsx'
import Orders from './pages/Orders.jsx'
import PlaceOrder from './pages/PlaceOrder.jsx'
import Search from './pages/Search.jsx'
import Register from "./pages/Register.jsx";

import AdminRoutes from './routes/AdminRoutes.jsx'
import UserLayout from "./layouts/UserLayout";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {



  return (
    <>
      <ToastContainer />

      <Routes>

        {/* 👤 USER ROUTES (WITH USER LAYOUT) */}
        <Route element={<UserLayout />}>
          <Route path='/' element={<Home />} />
          <Route path='/collection' element={<Collection />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/login' element={<Login />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/product/:productId' element={<Product />} />
          <Route path='/search' element={<Search />} />
          <Route path='/signup' element={<Register />} />

          {/* 🔐 Protected user pages */}
          <Route
            path='/orders'
            element={
              <>
                <SignedIn>
                  <Orders />
                </SignedIn>
                <SignedOut>
                  <RedirectToSignIn />
                </SignedOut>
              </>
            }
          />

          <Route
            path='/place-order'
            element={
              <>
                <SignedIn>
                  <PlaceOrder />
                </SignedIn>
                <SignedOut>
                  <RedirectToSignIn />
                </SignedOut>
              </>
            }
          />
        </Route>

        {/* 🛠️ ADMIN ROUTES (NO USER NAVBAR / FOOTER) */}
        <Route path='/admin/*' element={<AdminRoutes />} />

      </Routes>
    </>
  )
}

export default App;
