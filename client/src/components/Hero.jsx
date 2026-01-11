import { useState } from "react";
import slide1 from "../assets/slider_img1.avif";
import slide2 from "../assets/slider_img2.png";
import slide3 from "../assets/slider_img3.avif";

const slides = [slide1, slide2, slide3];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      {/* HERO CONTAINER */}
      <div className="relative w-full overflow-hidden">

        {/* SLIDER TRACK */}
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${current * 100}vw)` }}
        >
          {slides.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`slide-${index}`}
              className="w-screen h-[60vh] sm:h-[65vh] md:h-[75vh] lg:h-[80vh] object-cover object-top flex-shrink-0" />
          ))}
        </div>

        {/* TEXT OVERLAY */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white z-10 px-4">
          <h1 className="font-bold text-[7vw] sm:text-[6vw] md:text-[4vw] lg:text-[3vw]">
            Level up your style with our
          </h1>

          <h4 className="mt-2 text-[4vw] sm:text-[3.5vw] md:text-[2vw] lg:text-[1.6vw]">
            Winter Collections
          </h4>

          <button className="mt-5 bg-white text-gray-900 px-6 py-3 sm:px-8 sm:py-3 rounded-full font-semibold text-sm sm:text-base hover:bg-gray-100 transition ">
            Shop Now <i className="fa-solid fa-arrow-right ml-2"></i>
          </button>
        </div>

        {/* LEFT ARROW */}
        <button
          onClick={prevSlide}
          className=" absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 text-white text-[8vw] sm:text-[6vw] md:text-[4vw] lg:text-[3vw] z-20 " >
          <i className="fa-solid fa-angle-left"></i>
        </button>

        {/* RIGHT ARROW */}
        <button
          onClick={nextSlide}
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 text-white text-[8vw] sm:text-[6vw] md:text-[4vw] lg:text-[3vw] z-20" >
          <i className="fa-solid fa-angle-right"></i>
        </button>
      </div>

      {/* DOTS */}
      <div className="flex justify-center gap-3 py-4 -mt-28 sm:-mt-24">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition ${
              current === index
                ? "bg-black scale-125"
                : "bg-black/40"
            }`}
          />
        ))}
      </div>
    </>
  );
};

export default Hero;
