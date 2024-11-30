import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="w-full bg-gray-800 text-white shadow-md fixed mb-6 top-0 left-0 z-10">
      <div className="max-w-[1080px] mx-auto flex justify-between items-center px-6 py-3">
        {/* Logo */}
        <div className="text-2xl font-bold tracking-wide hover:scale-105 transition-transform">
          MyNotes
        </div>

        {/* Navigation Links */}
        <div className="flex gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-lg font-medium px-4 py-2 rounded-lg transition-colors duration-300 ${
                isActive
                  ? " text-white"
                  : "hover:text-white"
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/pastes"
            className={({ isActive }) =>
              `text-lg font-medium px-4 py-2 rounded-lg transition-colors duration-300 ${
                isActive
                  ? " text-white"
                  : " hover:text-white"
              }`
            }
          >
            Notes
          </NavLink>
        </div>

        {/* Additional Options */}
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300">
          Login
        </button>
      </div>
    </div>
  );
};

export default Navbar;
