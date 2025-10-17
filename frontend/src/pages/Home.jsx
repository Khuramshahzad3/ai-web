import React, { useEffect, useState } from "react";
import home from "../assets/Homeimg.png";
import home1 from "../assets/2ndhome.png";
import home2 from "../assets/4th.jpeg";
import { Link, useNavigate } from "react-router-dom";
import {
  FaBrain,
  FaRobot,
  FaLaptopCode,
  FaUsersCog,
  FaGlobeAmericas,
  FaChalkboardTeacher,
  FaSchool,
  FaCertificate,
  FaLanguage,
} from "react-icons/fa";
import Contactus from "./Contactus";
import Robotics1 from "../assets/Robotics1.jpeg";
import Robotics2 from "../assets/Robotics2.jpeg";
import Robotics3 from "../assets/Robotics3.jpeg";

const HERO_SLIDES = [
  { image: home },
  { image: home1 },
  { image: home2 },
];

const Home = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  // Keeping fade, but we'll apply it differently to the content or ensure the background is black

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === HERO_SLIDES.length - 1 ? 0 : prev + 1
      );
    }, 4000); 

    return () => clearInterval(interval);
  }, []);
  

  return (
    <>
      <section 
        className="relative h-[600px] md:h-screen flex items-center justify-center overflow-hidden bg-black" // 👈 ADDED bg-black HERE
      >
        {/* Map through all slides and position them absolutely */}
        {HERO_SLIDES.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out`}
            style={{
              backgroundImage: `url(${slide.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              // Use opacity based on the currentSlide index
              opacity: index === currentSlide ? 1 : 0, 
            }}
          >
            {/* The image overlay remains */}
            <div className="absolute inset-0 bg-black opacity-50"></div>
          </div>
        ))}
        
        {/* The content overlay stays the same and is always visible */}
        <div className="relative z-10 text-white text-center px-6 md:px-16 space-y-6 max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight shadow-text">
            Where <span className="text-[#02C6C8]">Learning</span> Meets{" "}
            <span className="text-[#02C6C8]">Technology</span> &{" "}
            <span className="text-[#02C6C8]">Innovation</span>
          </h1>

          <p className="text-xl md:text-2xl font-light max-w-2xl mx-auto shadow-text">
            Join a thriving community of{" "}
            <span className="font-semibold text-[#02C6C8]">
              100+ passionate learners
            </span>{" "}
            who are unlocking their potential through hands-on, industry-focused
            courses designed to shape the innovators of tomorrow.
          </p>

          <button
            onClick={() => navigate("/courses")}
            className="mt-6 px-10 py-4 bg-[#02C6C8] hover:bg-[#00b1b3] text-white text-lg font-bold rounded-xl shadow-2xl hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            Explore Courses
          </button>
        </div>
      </section>

      {/* --- The rest of your component remains unchanged --- */}
      
      {/* Language Mastery Section */}
      <section className="py-20 px-6 md:px-20 text-center">
        <div className="max-w-4xl mx-auto">
          <span className="block text-[#02C6C8] uppercase tracking-wide text-sm font-semibold mb-3">
            Global Opportunities
          </span>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Language Mastery: <span className="text-[#02C6C8]">IELTS Prep</span>
          </h2>

          <p className="text-gray-700 text-lg mb-8 leading-relaxed">
            Unlock your potential for <b>global education and migration</b> with
            our expert-led IELTS preparation program. We provide targeted
            training in all four modules—Listening, Reading, Writing, and
            Speaking—to ensure you achieve your target band score.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Targeted Modules",
                desc: "Specialized coaching for Academic and General Training.",
              },
              {
                title: "Certified Tutors",
                desc: "Learn from IELTS certified and experienced language experts.",
              },
              {
                title: "Mock Tests",
                desc: "Regular full-length mock tests under exam conditions.",
              },
            ].map((card, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-xl shadow-lg border border-[#02C6C8] hover:bg-[#f3fffe] transition duration-300"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {card.title}
                </h3>
                <p className="text-sm text-gray-600">{card.desc}</p>
              </div>
            ))}
          </div>

          <a
            href="https://australianacademies.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#02C6C8] text-white px-8 py-3 rounded-full text-lg font-medium shadow-lg hover:bg-[#00b1b3] hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 mt-12"
          >
            Start Your IELTS Journey
          </a>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-6 md:px-20 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12">
          Why Choose <span className="text-[#02C6C8]">AI-TEG Academy?</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              icon: <FaBrain className="text-5xl text-[#02C6C8] mb-4" />,
              title: "AI-Powered Education",
              desc: "Integrating Artificial Intelligence with modern teaching methods to prepare future innovators.",
            },
            {
              icon: <FaRobot className="text-5xl text-[#02C6C8] mb-4" />,
              title: "Robotics & Automation",
              desc: "Hands-on robotics training to develop real-world problem-solving and creative engineering skills.",
            },
            {
              icon: <FaLaptopCode className="text-5xl text-[#02C6C8] mb-4" />,
              title: "Practical Coding Skills",
              desc: "Learn programming through interactive, project-based modules designed for all skill levels.",
            },
            {
              icon: <FaUsersCog className="text-5xl text-[#02C6C8] mb-4" />,
              title: "Mentorship & Support",
              desc: "Continuous guidance from certified instructors and industry professionals throughout your journey.",
            },
            {
              icon: <FaGlobeAmericas className="text-5xl text-[#02C6C8] mb-4" />,
              title: "Global Learning Standards",
              desc: "Globally inspired curriculum that combines innovation, creativity, and practical expertise.",
            },
            {
              icon: <FaLanguage className="text-5xl text-[#02C6C8] mb-4" />,
              title: "Language Skills",
              desc: "Master key global languages like English for academic and professional success.",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl border border-gray-200 hover:border-[#02C6C8] shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="flex justify-center">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Our Impact */}
      <section className="py-20 px-6 md:px-20 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Our <span className="text-[#02C6C8]">Impact</span>
        </h2>
        <p className="text-gray-700 max-w-3xl mx-auto mb-12 text-lg">
          We are proud to be driving change across Pakistan’s education sector
          by combining innovation, ethics, and technology for sustainable
          growth.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-left">
          {[
            {
              icon: <FaSchool className="text-[#02C6C8] text-4xl mb-3" />,
              text: "Partnered with leading schools across Punjab for robotics integration.",
            },
            {
              icon: (
                <FaChalkboardTeacher className="text-[#02C6C8] text-4xl mb-3" />
              ),
              text: "Trained hundreds of teachers in AI and future-ready skills.",
            },
            {
              icon: <FaRobot className="text-[#02C6C8] text-4xl mb-3" />,
              text: "Developed custom STEM kits and national-level training modules.",
            },
            {
              icon: <FaCertificate className="text-[#02C6C8] text-4xl mb-3" />,
              text: "Recognized for merging faith, ethics, and technology into holistic education.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl border border-gray-200 hover:border-[#02C6C8] shadow-md hover:shadow-lg transition duration-300 hover:-translate-y-2"
            >
              <div className="flex justify-center">{item.icon}</div>
              <p className="text-gray-700">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Flagship Course Section */}
      <section className="py-20 px-6 md:px-20 text-center">
        <div className="max-w-6xl mx-auto text-black">
          <span className="block text-[#02C6C8] uppercase tracking-wide text-sm font-semibold mb-3">
            Explore Our
          </span>

          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Our <span className="text-[#02C6C8]">Flagship</span> Course
          </h2>

          <p className="text-black text-lg mb-2 leading-relaxed font-semibold">
            Modern Robotics for Young Innovators (Grades 1-8)
          </p>

          <p className="text-gray-700 text-lg mb-8 leading-relaxed">
            Join our most demanding and popular course which dives deep into the
            'Perceive - Evaluate - Execute' model. Students build advanced,
            hands-on robotics kits, mastering coding, AI fundamentals, and
            complex problem-solving skills to become the innovators of tomorrow.
          </p>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[Robotics1, Robotics2, Robotics3].map((img, i) => (
              <Link
                key={i}
                className="block text-left bg-white p-4 rounded-xl shadow-lg border-2 border-transparent hover:border-[#02C6C8] transition duration-300 hover:-translate-y-1"
              >
                <img
                  src={img}
                  alt={`Robotics Image ${i + 1}`}
                  className="w-full h-auto rounded-lg mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold text-gray-900">
                  {i === 0
                    ? "Robotics + Coding (Grades 1-3)"
                    : i === 1
                    ? "Modern Robotics (Grades 4-8)"
                    : "Hands-on STEM Kits"}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {i === 0
                    ? "Foundational STEM learning for young innovators."
                    : i === 1
                    ? "Perceive - Evaluate - Execute: Advanced concepts."
                    : "The complete physical kit for real-world application."}
                </p>
              </Link>
            ))}
          </div>

          <Link
            to="/courses"
            className="inline-block bg-[#02C6C8] text-white px-8 py-3 rounded-full text-lg font-medium shadow-lg hover:bg-[#00b1b3] hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 mt-12"
          >
            View All Courses & Kits
          </Link>
        </div>
      </section>

      <section>
        <Contactus />
      </section>
    </>
  );
};

export default Home;