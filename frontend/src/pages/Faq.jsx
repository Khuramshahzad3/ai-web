import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const navigate = useNavigate();

  const faqs = [
     {
      question: "What programs and courses do you offer?",
      answer:
        "AI-TEG Academy offers diverse programs including AI & Digital Literacy, STEM and Robotics Education, Teacher Capacity Building, Emotional Intelligence Training, and AI-driven Consultancy for Schools. Each course is designed to promote creativity, innovation, and real-world application.",
    },
    {
      question: "Who can enroll in AI-TEG Academy programs?",
      answer:
        "Our programs are open to educators, school leaders, parents, and students from all academic backgrounds who wish to understand and apply Artificial Intelligence and modern educational practices effectively.",
    },
    {
      question: "Do you offer certifications for your courses?",
      answer:
        "Yes! Upon successful completion of any program, participants receive an official certification from AI-TEG Academy, recognized by leading educational and technology partners.",
    },
    {
      question: "Does AI-TEG Academy collaborate with schools?",
      answer:
        "Absolutely! We work closely with schools through our EQM (Educational Quality Management) framework, curriculum design consultancy, leadership training, and customized teacher development programs.",
    },
  ];

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 text-gray-900 min-h-screen py-20 px-6 md:px-20">
      {/* 🔹 Page Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Frequently Asked <span className="text-[#02C6C8]">Questions</span>
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Have questions? We’ve got you covered! Explore some of the most
          commonly asked questions by our students and community.
        </p>
      </div>

      {/* 🔹 FAQ Section */}
      <div className="max-w-3xl mx-auto space-y-5">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className={`border rounded-2xl shadow-sm transition-all duration-300 hover:shadow-md ${
                isOpen ? "border-[#02C6C8]" : "border-gray-200"
              }`}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full flex justify-between items-center p-5 text-left focus:outline-none"
              >
                <h3
                  className={`text-lg font-semibold transition-colors duration-300 ${
                    isOpen ? "text-green-600" : "text-gray-800"
                  }`}
                >
                  {faq.question}
                </h3>
                <FaChevronDown
                  className={`text-gray-500 transition-transform duration-300 ${
                    isOpen ? "rotate-180 text-green-600" : ""
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-500 ${
                  isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="px-5 pb-5 text-gray-700 border-t border-gray-200 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* 🔹 Contact Section */}
      <div className="text-center mt-24">
        <h2 className="text-2xl font-semibold mb-3 text-gray-800">
          Still have questions?
        </h2>
        <p className="text-gray-600 mb-6 max-w-lg mx-auto">
          Our support team is ready to help you with anything you need. Reach
          out today — we’d love to hear from you.
        </p>
        <button
          onClick={() => navigate("/contact")}
          className="bg-[#02C6C8] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#01b3b5] shadow-md hover:shadow-lg transition-all duration-300"
        >
          Contact Us
        </button>
      </div>
    </div>
  );
};

export default Faq;
