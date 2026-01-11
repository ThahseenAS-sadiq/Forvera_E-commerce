import React, { useContext, useMemo } from "react";
import { ShopContext } from "../context/ShopContext";

const NewArrival = () => {
  const { products } = useContext(ShopContext);

  // ✅ Get latest products dynamically
  const newArrivals = useMemo(() => {
    return [...products]
      .sort((a, b) => b.date - a.date) // latest first
      .slice(0, 4); // show only 4
  }, [products]);

  return (
    <section className="py-16 px-5">
      <div className="max-w-[1200px] mx-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">
            New Arrivals
          </h2>
        </div>

        {/* Image Grid */}
        <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
          {newArrivals.map((product) => (
            <div
              key={product._id}
              className="group overflow-hidden rounded-lg"
            >
              <div className="relative">
                <img
                  src={product.image[0]}
                  alt={product.name}
                  className="
                    w-full h-[260px] object-cover
                    transition-transform duration-500
                    group-hover:scale-105
                  "
                />

                {/* NEW badge */}
                <span className="absolute top-3 left-3 bg-black/80 text-white text-xs px-3 py-1 rounded">
                  NEW
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default NewArrival;

