import React from "react";
import {assets} from "../assets/assets";

const OfferBar = () => {
  return (
    <section className="bg-[#1D232C] text-[#E2E1E1] py-6 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center gap-6">
        
        {/* Image */}
        <div className="w-full md:w-1/2">
          <img
            src={assets.offer1}
            alt="Limited Offer"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Text */}
        <div className="w-full md:w-1/2 text-center md:text-left px-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-2">
            Limited Offer
          </h2>

          <h4 className="text-lg sm:text-xl font-bold mb-4">
            35% OFF on this for the first 30 Customers
          </h4>

          <button className="inline-flex items-center gap-2 bg-white text-[#1D232C] font-semibold px-6 py-3 rounded-lg hover:bg-gray-200 transition">
            Shop Now
            <span>→</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default OfferBar;
