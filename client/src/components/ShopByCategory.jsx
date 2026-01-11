import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";

const categories = [
  { name: "Men", image: assets.c2 },
  { name: "Women", image: assets.n4 },
  { name: "Kids", image: assets.ck },
  { name: "Accessories", image: assets.n1 },
];

const ShopByCategory = () => {
  const { setSelectedCategory, navigate } = useContext(ShopContext);

  const handleCategoryClick = (category) => {
    setSelectedCategory([category]);   // ✅ set filter
    navigate("/collection");           // ✅ go to Collection
  };

  return (
    <section className="py-12 bg-white ml-6">
      <div className="w-[90%] mx-auto">
        <h2 className="text-center text-3xl font-bold mb-12">
          Shop by Category
        </h2>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat) => (
            <div
              key={cat.name}
              onClick={() => handleCategoryClick(cat.name)}
              className="cursor-pointer group rounded-lg overflow-hidden"
            >
              <div className="relative h-[260px] overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <h3 className="text-white text-2xl font-bold">
                    {cat.name}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ShopByCategory;



