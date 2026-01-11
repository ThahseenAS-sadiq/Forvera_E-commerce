import React from "react";
import { products } from "../assets/assets.js";

const Trending = () => {

  // ✅ Get only bestseller products
  const trendingProducts = products.filter(
    (product) => product.bestseller === true
  );

  // ✅ Duplicate for smooth infinite scroll
  const scrollingProducts = [...trendingProducts, ...trendingProducts];

  return (
    <section className="my-8 overflow-hidden">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 ml-6 md:ml-24">
        Trending Now
      </h2>

      <div className="relative w-full overflow-hidden group">
        <div className="flex gap-5 animate-scroll group-hover:[animation-play-state:paused]">

          {scrollingProducts.map((product, index) => (
            <div key={index} className="flex-shrink-0">
              <img
                src={product.image[0]}
                alt={product.name}
                className="
                  w-[220px] h-[280px]
                  sm:w-[260px] sm:h-[320px]
                  md:w-[280px] md:h-[360px]
                  lg:w-[300px] lg:h-[420px]
                  object-cover rounded-lg
                "
              />
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default Trending;


