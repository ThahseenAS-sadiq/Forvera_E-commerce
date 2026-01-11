import React from "react";
import { assets } from "../assets/assets";

const brands1 = [
  assets.b5,
  assets.b2,
  assets.b3,
  assets.b4,
  assets.b1,
  assets.b8,
  assets.b1,
  assets.b2,
  assets.b5,
  assets.b8,
  assets.b3,
  assets.b6,
  assets.b1,
];

const brands2 = [
  assets.b6,
  assets.b7,
  assets.b8,
  assets.b9,
  assets.b10,
  assets.b11,
  assets.b7,
  assets.b8,
  assets.b2,
  assets.b5,
  assets.b8,
  assets.b3,
  assets.b10,
  assets.b11,
  assets.b9,
];

const Brand = () => {
  return (
    <section className="w-full py-12 overflow-hidden my-20">
      {/* Heading */}
      <h1 className="text-center text-2xl font-bold mb-10">Brands</h1>

      {/* Marquee Left */}
      <div className="marquee mb-10">
        <div className="track marquee-left">
          {brands1.map((img, i) => (
            <img key={i} src={img} alt="brand" />
          ))}
        </div>
      </div>

      {/* Marquee Right */}
      <div className="marquee">
        <div className="track marquee-right">
          {brands2.map((img, i) => (
            <img key={i} src={img} alt="brand" />
          ))}
        </div>
      </div>

      {/* Minimal CSS only for animation */}
      <style>
        {`
          .marquee {
            display: flex;
            overflow: hidden;
            width: 100%;
            mask-image: linear-gradient(to right, transparent, black, transparent);
          }

          .track {
            display: flex;
            gap: 70px;
            width: max-content;
            animation: scroll 18s linear infinite;
          }

          .marquee-left {
            animation-name: scrollLeft;
          }

          .marquee-right {
            animation-name: scrollRight;
          }

          .track img {
            height: 90px;
            filter: grayscale(100%);
            opacity: 0.8;
            transition: all 0.3s ease;
          }

          .track img:hover {
            filter: grayscale(0%);
            opacity: 1;
          }

          .marquee:hover .track {
            animation-play-state: paused;
          }

          @keyframes scrollLeft {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }

          @keyframes scrollRight {
            from { transform: translateX(-50%); }
            to { transform: translateX(0); }
          }

          /* Responsive */
          @media (max-width: 1024px) {
            .track { gap: 50px; }
            .track img { height: 50px; }
          }

          @media (max-width: 768px) {
            .track { gap: 40px; }
            .track img { height: 40px; }
          }

          @media (max-width: 480px) {
            .track { gap: 25px; }
            .track img { height: 30px; }
          }
        `}
      </style>
    </section>
  );
};

export default Brand;
