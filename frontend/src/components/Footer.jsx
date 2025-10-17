import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { MdLocationOn, MdEmail, MdPhone } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="bg-[#0a0a0a] text-gray-300 pt-12 pb-6 px-6 md:px-20">
      {/* 🔹 Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 border-b border-gray-700 pb-10">
        {/* 🔹 About Section */}
        <div>
          <h2 className="text-2xl font-semibold text-white mb-4 tracking-wide">
            AI-TEG Academy
          </h2>
          <p className="text-sm leading-relaxed text-gray-400">
            <span className="text-[#02C6C8] font-medium">AI-TEG Academy</span>,
            is Pakistan’s first integrated training and innovation platform
            dedicated to preparing educators, students, and parents for the age
            of Artificial Intelligence and 21st-century learning. We blend
            technology, psychology, and pedagogy to transform classrooms into
            intelligent ecosystems of creativity, curiosity, and purpose.
          </p>
        </div>

        {/* 🔹 Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4 relative after:content-[''] after:block after:w-12 after:h-[2px] after:bg-[#02C6C8] after:mt-2">
            Quick Links
          </h3>
          <ul className="space-y-3 text-gray-400">
            {[
              { to: "/", label: "Home" },
              { to: "/courses", label: "Courses" },
              { to: "/about", label: "About Us" },
              { to: "/gallery", label: "Gallery" },
              { to: "/faq", label: "FAQs" },
            ].map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="hover:text-[#02C6C8] transition-colors duration-300"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* 🔹 Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4 relative after:content-[''] after:block after:w-12 after:h-[2px] after:bg-[#02C6C8] after:mt-2">
            Contact
          </h3>
          <ul className="space-y-4 text-sm text-gray-400">
            <li className="flex items-center gap-3">
              <MdLocationOn className="text-[#02C6C8] text-lg" />
              <span>Phalia, Punjab, Pakistan</span>
            </li>
            <li className="flex items-center gap-3">
              <MdEmail className="text-[#02C6C8] text-lg" />
              <span>ssanjum67m@gmail.com</span>
            </li>
            <li className="flex items-center gap-3">
              <MdPhone className="text-[#02C6C8] text-lg" />
              <span>+92-341-1599845</span>
            </li>
          </ul>
        </div>

        {/* 🔹 Social Media */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4 relative after:content-[''] after:block after:w-12 after:h-[2px] after:bg-[#02C6C8] after:mt-2">
            Follow Us
          </h3>
          <div className="flex space-x-4 text-xl">
            {[
              { icon: <FaFacebookF />, href: "#" },
              { icon: <FaInstagram />, href: "#" },
              { icon: <FaLinkedinIn />, href: "#" },
            ].map((social, index) => (
              <a
                key={index}
                href={social.href}
                className="text-gray-400 hover:text-[#02C6C8] transition-colors duration-300"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* 🔹 Bottom Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-8 text-sm text-gray-500">
        <p>© {new Date().getFullYear()} AI-TEG Academy. All rights reserved.</p>
        <p className="mt-3 md:mt-0">
          Designed with 💙 by{" "}
          <span className="text-[#02C6C8] font-medium">AI-TEG Academy</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
