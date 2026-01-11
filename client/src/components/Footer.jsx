import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white text-gray-800">
      {/* Top section */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold mb-4">
              FORVERA<span className="text-pink-500">.</span>
            </h2>
            <p className="text-gray-600 leading-relaxed max-w-sm">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of type
              and scrambled it to make a type specimen book.
            </p>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-4 uppercase">
              Company
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li className="hover:text-black cursor-pointer">Home</li>
              <li className="hover:text-black cursor-pointer">About us</li>
              <li className="hover:text-black cursor-pointer">Delivery</li>
              <li className="hover:text-black cursor-pointer">Privacy policy</li>
            </ul>
          </div>

          {/* Get in touch */}
          <div>
            <h3 className="text-lg font-semibold mb-4 uppercase">
              Get in Touch
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li>+1-000-000-0000</li>
              <li>Forvera.fashion@gmail.com</li>
              <li className="hover:text-black cursor-pointer">Instagram</li>
            </ul>
          </div>

        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200"></div>

      {/* Bottom bar */}
      <hr />
      <div className="text-center py-4 text-sm text-gray-600">
        Copyright 2026 © Forvera.com - All Right Reserved.
      </div>
    </footer>
  );
};

export default Footer;
