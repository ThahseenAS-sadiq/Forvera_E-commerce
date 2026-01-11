import React, { useContext, useState } from 'react';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';
import { useAuth } from "@clerk/clerk-react";


const PlaceOrder = () => {

  const [method, setMethod] = useState('cod');

  const { navigate, backendURL, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext);

  const { getToken, isSignedIn } = useAuth();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''

  });

  const onChangeHandler = (event) => {
    const name = event.target.name
    const value = event.target.value

    setFormData(data => ({ ...data, [name]: value }))
  }

  

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!isSignedIn) {
      alert("Please login to place an order");
      return;
    }

    try {
      const token = await getToken(); // ✅ CLERK TOKEN

      let orderItems = [];

      for (const productId in cartItems) {
        for (const size in cartItems[productId]) {
          if (cartItems[productId][size] > 0) {
            const product = products.find(p => p._id === productId);
            if (product) {
              orderItems.push({
                ...structuredClone(product),
                size,
                quantity: cartItems[productId][size],
              });
            }
          }
        }
      }

      const orderData = {
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
        address: formData,
        paymentMethod: method.toUpperCase(),
      };

      const res = await fetch(`${backendURL}/api/order/place`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ✅ FIXED
        },
        body: JSON.stringify(orderData),
      });

      const data = await res.json();

      if (data.success) {
        setCartItems({});
        navigate("/orders");
      } else {
        alert(data.message);
      }

    } catch (error) {
      console.error("PLACE ORDER ERROR:", error);
      alert("Order failed");
    }
  };


  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row pt-5 sm:pt-14 justify-between gap-4  min-h-[80vh] border-t mx-20'>

      {/*----------------- left side ------------------*/}
      <div className='flex flex-col gap-4 w-full max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>

        <div className='flex gap-3' >
          <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} type="text" placeholder='First name...' className='border border-gray-700 w-full py-1.5 px-3.5 rounded' />
          <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} type="text" placeholder='Last name...' className='border border-gray-700 w-full py-1.5 px-3.5 rounded' />
        </div>
        <input required onChange={onChangeHandler} name='email' value={formData.email} type="email" placeholder='Email...' className='border border-gray-700 w-full py-1.5 px-3.5 rounded' />
        <input required onChange={onChangeHandler} name='street' value={formData.street} type="text" placeholder='Street' className='border border-gray-700 w-full py-1.5 px-3.5 rounded' />

        <div className='flex gap-3' >
          <input required onChange={onChangeHandler} name='city' value={formData.city} type="text" placeholder='City' className='border border-gray-700 w-full py-1.5 px-3.5 rounded' />
          <input required onChange={onChangeHandler} name='state' value={formData.state} type="text" placeholder='State' className='border border-gray-700 w-full py-1.5 px-3.5 rounded' />
        </div>

        <div className='flex gap-3' >
          <input required onChange={onChangeHandler} name='zipcode' value={formData.zipcode} type="number" placeholder='Pincode' className='border border-gray-700 w-full py-1.5 px-3.5 rounded' />
          <input required onChange={onChangeHandler} name='country' value={formData.country} type="text" placeholder='Country' className='border border-gray-700 w-full py-1.5 px-3.5 rounded' />
        </div>

        <input required onChange={onChangeHandler} name='phone' value={formData.phone} type="number" placeholder='PhoneNo' className='border border-gray-700 w-full py-1.5 px-3.5 rounded' />
      </div>

      {/*--------------- Right side--------------- */}
      <div className='mt-8' >
        <div className='mt-8 min-w-80' >
          <CartTotal />
        </div>

        <div>
          <Title text1={'PAYMENT'} text2={'METHOD'} />

          {/* PAYMENT UI */}
          <div className='flex flex-col lg:flex-row gap-3'>

            {/* Stripe */}
            <div
              onClick={() => setMethod('stripe')}
              className='flex items-center gap-3 border px-3 p-2 cursor-pointer'
            >
              <p className={`min-w-3.5 h-3.5 rounded-full border ${method === 'stripe' ? 'bg-green-500' : ''}`}></p>
              <img src={assets.stripe_logo} alt="Stripe" className='h-5 mx-4' />
            </div>

            {/* Razorpay */}
            <div
              onClick={() => setMethod('razorpay')}
              className='flex items-center gap-3 border px-3 p-2 cursor-pointer'
            >
              <p className={`min-w-3.5 h-3.5 rounded-full border ${method === 'razorpay' ? 'bg-green-500' : ''}`}></p>
              <img src={assets.razorpay_logo} alt="Razorpay" className='h-5 mx-4' />
            </div>

            {/* COD */}
            <div
              onClick={() => setMethod('cod')}
              className='flex items-center gap-3 border px-3 p-2 cursor-pointer'
            >
              <p className={`min-w-3.5 h-3.5 rounded-full border ${method === 'cod' ? 'bg-green-500' : ''}`}></p>
              <p className='text-sm text-gray-500 mx-4 font-medium'>CASH ON DELIVERY</p>
            </div>
          </div>

          <div className='w-full text-end mt-8' >
            <button type='submit' className='bg-black text-white px-16 py-3 text-sm' >PLACE ORDER </button>
          </div>
        </div>

      </div>
    </form>
  )
}

export default PlaceOrder;