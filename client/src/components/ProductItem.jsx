import { Link } from "react-router-dom";
import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);

  return (
    <Link to={`/product/${id}`} className="text-gray-700 cursor-pointer block">
      
      {/* IMAGE WRAPPER (FIXED SIZE) */}
      <div className="w-full h-[260px] bg-gray-100 overflow-hidden rounded-lg">
        <img
          src={image[0]}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* PRODUCT INFO */}
      <p className="pt-3 pb-1 text-sm truncate">
        {name}
      </p>

      <p className="text-sm font-medium">
        {currency}{price}
      </p>

    </Link>
  );
};

export default ProductItem;
