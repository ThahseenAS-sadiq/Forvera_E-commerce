import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets.js';
import RelatedProducts from '../components/RelatedProducts.jsx';
import { toast } from 'react-toastify';

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);

  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');

  /* ================= FETCH PRODUCT ================= */
  useEffect(() => {
    if (products.length > 0) {
      const product = products.find(item => item._id === productId);
      if (product) {
        setProductData(product);
        setImage(product.image?.[0] || '');
        setSize(''); // 🔥 reset size when product changes
      }
    }
  }, [productId, products]);

  /* ================= HANDLE ADD TO CART ================= */
  const handleAddToCart = () => {
    if (!size) {
      toast.error('Please select a size');
      return;
    }

    // ✅ This WILL hit backend & store in MongoDB
    addToCart(productData._id, size);
  };

  if (!productData) return null;

  return (
    <div className="border-t-2 pt-10 mx-20">

      {/* ================= PRODUCT DATA ================= */}
      <div className="flex gap-12 flex-col sm:flex-row">

        {/* Images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll sm:w-[18.7%] w-full">
            {productData.image.map((img, index) => (
              <img
                key={index}
                src={img}
                onClick={() => setImage(img)}
                alt="product"
                className="w-[24%] sm:w-full sm:mb-3 cursor-pointer"
              />
            ))}
          </div>

          <div className="w-full sm:w-[80%]">
            <img src={image} alt="product_img" className="w-full h-auto" />
          </div>
        </div>

        {/* Details */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">
            {productData.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-1 mt-2">
            {[...Array(5)].map((_, i) => (
              <img key={i} src={assets.star_icon} className="w-3" />
            ))}
            <img src={assets.star_dull_icon} className="w-3" />
            <p className="pl-2">(122)</p>
          </div>

          {/* Price */}
          <p className="mt-5 text-3xl font-medium">
            {currency}{productData.price}
          </p>

          {/* Description */}
          <p className="mt-5 text-gray-500 md:w-4/5">
            {productData.description}
          </p>

          {/* Sizes */}
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((s, index) => (
                <button
                  key={index}
                  onClick={() => setSize(s)}
                  className={`border px-4 py-2 transition
                    ${size === s
                      ? 'bg-black text-white'
                      : 'bg-white text-black'
                    }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* ADD TO CART */}
          <button
            disabled={!size}
            onClick={handleAddToCart}
            className={`px-8 py-3 text-sm transition
              ${size
                ? 'bg-black text-white active:bg-gray-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
          >
            ADD TO CART
          </button>

          <hr className="mt-8 sm:w-4/5" />

          {/* Info */}
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original product.</p>
            <p>Cash on delivery available.</p>
            <p>Easy return & exchange within 7 days.</p>
          </div>
        </div>
      </div>

      {/* ================= DESCRIPTION ================= */}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm">Reviews (122)</p>
        </div>

        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>
            This is a premium quality product built for durability,
            comfort, and everyday use.
          </p>
          <p>
            Each product page contains detailed images, size options,
            and pricing for easy purchase.
          </p>
        </div>
      </div>

      {/* ================= RELATED ================= */}
      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  );
};

export default Product;

