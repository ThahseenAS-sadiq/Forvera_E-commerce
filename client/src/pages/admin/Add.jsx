import React, { useState } from 'react'
import axios from "axios"
import { assets } from '../../assets/admin_assets/assets.js'
import { backendURL } from "../../routes/AdminRoutes.jsx"
import { toast } from 'react-toastify'

const Add = ({ token }) => {

  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(
        `${backendURL}/api/product/add`,
        formData,
        {
          headers: {
            token: token, // ✅ THIS IS CRITICAL
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);

        setName("");
        setDescription("");
        setPrice("");
        setSizes([]);
        setBestseller(false);
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
      } else {
        toast.error(response.data.message);
      }

    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };


  return (
    <form
      onSubmit={onSubmitHandler}
      className='flex flex-col items-start gap-3 w-full'
    >

      {/* Upload Images */}
      <div>
        <p className='mb-2'>Upload Images</p>

        <div className='flex gap-3'>
          {[image1, image2, image3, image4].map((img, i) => (
            <label
              key={i}
              htmlFor={`image${i + 1}`}
              className='w-24 h-24 border border-dashed border-gray-400 flex items-center justify-center cursor-pointer rounded-md overflow-hidden'
            >
              <img
                src={!img ? assets.upload_area : URL.createObjectURL(img)}
                alt="upload"
                className='w-full h-full object-cover'
              />

              <input
                type="file"
                hidden
                id={`image${i + 1}`}
                accept="image/*"
                onChange={(e) => {
                  const setters = [setImage1, setImage2, setImage3, setImage4];
                  setters[i](e.target.files[0]);
                }}
              />
            </label>
          ))}
        </div>
      </div>


      {/* Name */}
      <div className='w-full'>
        <p className='mb-2'>Product name</p>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className='w-full max-w-[500px] px-3 py-2'
          type="text"
          placeholder='Type here...'
          required
        />
      </div>

      {/* Description */}
      <div className='w-full'>
        <p className='mb-2'>Product description</p>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className='w-full max-w-[500px] px-3 py-2'
          placeholder='Write content here...'
          required
        />
      </div>

      {/* Category / Subcategory / Price */}
      <div className='flex flex-col sm:flex-row gap-4 w-full items-end'>

        <div className='sm:w-[200px] w-full'>
          <p className='mb-2'>Product Category</p>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className='w-full px-3 py-2'
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
            <option value="Accessories">Accessories</option>
          </select>
        </div>

        <div className='sm:w-[200px] w-full'>
          <p className='mb-2'>Sub Category</p>
          <select
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
            className='w-full px-3 py-2'
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
            <option value="Shoe">Shoe</option>
            <option value="Bag">Bag</option>
            <option value="Watch">Watch</option>
          </select>
        </div>

        <div className='sm:w-[120px] w-full'>
          <p className='mb-2'>Product Price</p>
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className='w-full px-3 py-2'
            type="text"
            placeholder='25'
          />
        </div>

      </div>

      {/* Sizes */}
      <div>
        <p>Product Size</p>
        <div className='flex gap-3'>
          {["S", "M", "L", "XL", "XXL"].map(size => (
            <p
              key={size}
              onClick={() =>
                setSizes(prev =>
                  prev.includes(size)
                    ? prev.filter(item => item !== size)
                    : [...prev, size]
                )
              }
              className={`${sizes.includes(size) ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}
            >
              {size}
            </p>
          ))}
        </div>
      </div>

      {/* Bestseller */}
      <div className='flex gap-2 mt-2'>
        <input
          type="checkbox"
          id='bestseller'
          checked={bestseller}
          onChange={() => setBestseller(prev => !prev)}
        />
        <label htmlFor="bestseller" className='cursor-pointer'>
          Add To Bestseller
        </label>
      </div>

      <button
        type="submit"
        className='bg-black text-white py-3 w-28 mt-4'
      >
        ADD
      </button>

    </form>
  )
}

export default Add;