import React, { useEffect, useState } from 'react'
import { backendURL } from '../../routes/AdminRoutes'
import { toast } from 'react-toastify'
import axios from 'axios'

const List = ({token}) => {

  const [list, setList] = useState([])

  const fetchList = async () => { 
    try {
      const response = await axios.get(backendURL + '/api/product/list')

      if (response.data.success) {
        setList(response.data.products)
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const removeProduct = async (id) => {
    try {

      const response = await axios.post(backendURL + '/api/product/remove', {id}, {headers:{token}})

      if(response.data.success){
        toast.success(response.data.message)
        await fetchList();
      }else{
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  return (
    <>
      <p className='mb-2 font-semibold'>All Product List</p>

      <div className='flex flex-col gap-2'>

        {/* Table Header */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center text-sm bg-gray-100 py-2 px-2 border">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>

        {/* Product Rows */}
        {list.map((item) => (
          <div
            key={item._id}
            className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 text-sm border px-2 py-2"
          >
            <img
              src={item.image?.[0]}
              alt="product"
              className="w-16 h-16 object-cover"
            />

            <p>{item.name}</p>
            <p>{item.category}</p>

            {/* ✅ FIXED PRICE */}
            <p>₹{item.price}</p>

            <p onClick={() => removeProduct(item._id)} className="cursor-pointer text-red-600 font-bold">X</p>
          </div>
        ))}

      </div>
    </>
  )
}

export default List
