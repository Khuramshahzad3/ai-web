import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import mainLogo from "../assets/Logo.png";
import headerLogo1 from "../assets/Header1.png";
import headerLogo2 from "../assets/header2.png";

const Headers = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Courses", path: "/courses" },
    { name: "Gallery", path: "/gallery" },
    { name: "FAQ", path: "/faq" },
  ];

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="bg-white sticky top-0 z-50 shadow-md transition-all duration-300">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        
        {/* 🔹 Logo Section (3 logos side by side) */}
        <Link to="/" className="flex items-center space-x-3">
          <img
            src={headerLogo1}
            alt="Header Logo 1"
            className="h-10 w-auto object-contain"
          />
          <img
            src={mainLogo}
            alt="Main Logo"
            className="h-12 w-auto object-contain"
          />
          <img
            src={headerLogo2}
            alt="Header Logo 2"
            className="h-10 w-auto object-contain"
          />
        </Link>

        {/* 🔹 Desktop Navigation */}
        <nav className="hidden md:flex space-x-8 text-base font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`relative transition-colors duration-300 ${
                location.pathname === link.path
                  ? "text-[#02C6C8]"
                  : "text-gray-700"
              } hover:text-[#02C6C8]`}
            >
              {link.name}
              <span
                className={`absolute left-0 -bottom-1 h-[2px] bg-[#02C6C8] transition-all duration-300 ${
                  location.pathname === link.path
                    ? "w-full"
                    : "w-0 hover:w-full"
                }`}
              ></span>
            </Link>
          ))}
        </nav>

        {/* 🔹 Contact Button (Desktop) */}
        <Link
          to="/contact"
          className="border border-[#02C6C8] text-[#02C6C8] px-5 py-2 rounded-full font-medium hover:bg-[#02C6C8] hover:text-white transition duration-300"
        >
          Contact Us
        </Link>

        {/* 🔹 Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-2xl text-gray-700 focus:outline-none"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* 🔹 Mobile Navigation Menu */}
      <div
        className={`md:hidden bg-white shadow-md absolute top-[72px] left-0 w-full transition-all duration-300 ease-in-out ${
          menuOpen
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible -translate-y-5"
        }`}
      >
        <nav className="flex flex-col items-center space-y-4 py-5 text-lg font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={closeMenu}
              className={`relative transition-colors duration-300 ${
                location.pathname === link.path
                  ? "text-[#02C6C8]"
                  : "text-gray-700"
              } hover:text-[#02C6C8]`}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Headers;
