import React, { useState } from 'react';
import { backendURL } from '../../routes/AdminRoutes';
import axios from 'axios';
import { toast } from 'react-toastify';


 const Login = ({setToken}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSumbitHandler = async (e) => {
        try {
            e.preventDefault();
            const response = await axios.post(backendURL + '/api/user/admin', {email, password})

            if (response.data.success) {
                setToken(response.data.token)
            }
            else{
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

  return (
    <div className='min-h-screen flex items-center justify-center w-full' >
        <div className='bg-white shadow-md rounded-lg px-8 py-6 max-w-md'>
            <h1 className='text-2xl font-bold mb-4'>Admin Panel</h1>
            <form onSubmit={onSumbitHandler} >
                <div className='mb-3 min-w-72'>
                    <p className='text-sm font-medium mb-2 text-gray-700'>Email Address</p>
                    <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" placeholder='your@email' className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none  ' />
                </div>
                <div className='mb-3 min-w-72'>
                    <p className='text-sm font-medium mb-2 text-gray-700'>Password</p>
                    <input onChange={(e)=>setPassword(e.target.value)} value={password} type="text" placeholder='your@email' className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none  ' />
                </div>
                <button className='w-full text-white bg-black py-2 px-4 rounded-md mt-4' >Login</button>
            </form>
        </div>
    </div>
  )
}

export default Login;
