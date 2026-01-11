import React, { useContext, useState } from "react";
import { assets } from "../assets/assets.js";
import { NavLink, Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext.jsx";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { FaBox } from "react-icons/fa";
import { useUser } from "@clerk/clerk-react";

const Navbar = () => {

  const [open, setOpen] = useState(false);
  const { setShowSearch, getCartCount } = useContext(ShopContext);

  const { user } = useUser();
  const isAdmin = user?.publicMetadata?.role === "admin";

  return (
    <div className="sticky top-0 z-40 bg-white flex items-center justify-between py-5 font-medium px-5">

      {/* Logo */}
      <Link to="/">
        <img src={assets.logo} className="w-36" alt="logo" />
      </Link>

      {/* Desktop Links */}
      <ul className="hidden sm:flex gap-8 text-md text-gray-700">

        {[
          { name: "Home", to: "/" },
          { name: "Collection", to: "/collection" },
          { name: "About", to: "/about" },
          { name: "Contact", to: "/contact" },
        ].map((link) => (
          <NavLink
            key={link.name}
            to={link.to}
            className={({ isActive }) =>
              `flex flex-col items-center transition-colors duration-300
         ${isActive ? "text-pink-900" : "hover:text-pink-950"}`
            }
          >
            {({ isActive }) => (
              <>
                <p>{link.name}</p>
                <span
                  className={`
              mt-1 h-[2px] w-6 rounded-full transition-all duration-300
              ${isActive ? "bg-pink-900 opacity-100" : "opacity-0"}
            `}
                />
              </>
            )}
          </NavLink>
        ))}

        <NavLink
          to="/admin"
          className={({ isActive }) =>
            `px-3 py-1 text-xs font-semibold rounded-full transition
    ${isActive
              ? "bg-pink-900 text-white"
              : "bg-pink-100 text-pink-900 hover:bg-pink-200"
            }`
          }
        >
          Admin
        </NavLink>


        {/* Anchor links (no underline) */}
        <a href="#new_arrivals" className="hover:text-pink-300 transition">
          New Arrival
        </a>

        <a href="#trending" className="hover:text-pink-300 transition">
          Trending
        </a>

      </ul>



      {/* Right Icons */}
      <div className="flex items-center gap-6">

        <img
          src={assets.search_icon}
          className="w-5 cursor-pointer"
          onClick={() => setShowSearch(true)}
          alt="search"
        />

        {/* Auth */}
        <SignedOut>
          <Link to="/login">
            <img src={assets.profile_icon} className="w-5 cursor-pointer" alt="login" />
          </Link>
        </SignedOut>

        <SignedIn>
          <UserButton afterSignOutUrl="/">
            <UserButton.MenuItems>
              <UserButton.Link
                label="My Orders"
                href="/orders"
                labelIcon={<FaBox size={16} />}
              />
            </UserButton.MenuItems>
          </UserButton>
        </SignedIn>

        {/* Cart */}
        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} className="w-5 cursor-pointer" alt="cart" />
          <p className="absolute -top-2 -right-2 bg-pink-900 text-white rounded-full w-5 h-5 flex items-center justify-center">
            {getCartCount()}
          </p>
        </Link>

        <img
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden"
          onClick={() => setOpen(true)}
          alt="menu"
        />
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="fixed inset-0 bg-black/40 z-50">
          <div className="fixed left-0 top-0 w-72 h-full bg-white p-5">
            <img src={assets.logo} className="w-28 mb-6" alt="logo" />

            <div className="flex flex-col gap-4 text-lg">
              <NavLink to="/" onClick={() => setOpen(false)}>Home</NavLink>
              <a href="#new_arrivals" onClick={() => setOpen(false)}>New Arrival</a>
              <a href="#trending" onClick={() => setOpen(false)}>Trending</a>
              <NavLink to="/collection" onClick={() => setOpen(false)}>Collection</NavLink>
              <NavLink to="/cart" onClick={() => setOpen(false)}>Cart</NavLink>
              <NavLink to="/contact" onClick={() => setOpen(false)}>Contact</NavLink>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;

