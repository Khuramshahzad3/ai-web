import React from "react";
import {
  FaBullseye,
  FaEye,
  FaUserTie,
  FaChalkboardTeacher,
} from "react-icons/fa";
import about from "../assets/about.png";

const About = () => {
  return (
    <div className="bg-white text-gray-800">
      {/* 🔹 Hero Section */}
      <section className="bg-gradient-to-b from-white to-gray-100 text-center py-20 px-6 md:px-20">
        <h1 className="text-4xl md:text-5xl font-bold text-[#03347C]  mb-4">
          About <span className="text-[#02C6C8]">AI-TEG Academy</span>
        </h1>
        <p className="text-[#03347C] max-w-3xl mx-auto text-xl font-bold">
          A Project of Australian International Academy, Shalimar Town Campus
        </p>
        <p className="text-gray-600 max-w-3xl mx-auto text-lg">
          We are a forward-thinking institution passionate about blending
          education with technology. AI-TEG Academy is where innovation meets
          learning — helping students and professionals build future-ready
          skills.
        </p>
      </section>

      {/* 🔹 Mission & Vision Section */}
      <section className="py-20 px-6 md:px-20 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="space-y-8">
          <div>
            <h2 className="text-3xl font-semibold text-[#02C6C8] mb-3 flex items-center gap-2">
              <FaBullseye /> Our Core Philosophy
            </h2>
            <p className="text-gray-700 leading-relaxed">
              At AI-TEG Academy, education is not about memorization — it’s
              about transformation. We follow the{" "}
              <span className="font-semibold">"Learn → Create → Apply"</span>{" "}
              model that connects knowledge to real-world innovation.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-semibold text-[#02C6C8] mb-3 flex items-center gap-2">
              <FaEye /> Our Vision
            </h2>
            <p className="text-gray-700 leading-relaxed">
              To make every school a hub of innovation, every teacher a
              tech-empowered mentor, and every student a creator of the future.
            </p>
          </div>
        </div>

        {/* 🔹 Illustration */}
        <div className="flex justify-center">
          <img
            src={about}
            alt="Mission and Vision"
            className="rounded-2xl shadow-lg w-full md:w-4/5"
          />
        </div>
      </section>

      {/* 🔹 Our Team Section */}
      <section className="py-20 px-6 md:px-20 bg-gray-50 text-center">
        <h2 className="text-3xl font-bold text-[#03347C] mb-12">
          Meet Our <span className="text-[#02C6C8]">Leadership Team</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              name: "Yasir Adrees Faisal",
              role: "Director (Strategy & Innovation)",
              icon: (
                <FaUserTie className="text-[#02C6C8] text-5xl mb-4 mx-auto" />
              ),
            },
            {
              name: "Mrs. Taiba Qurrat",
              role: "Director (Training & Curriculum)",
              icon: (
                <FaChalkboardTeacher className="text-[#02C6C8] text-5xl mb-4 mx-auto" />
              ),
            },
            {
              name: "Syed Sohail Anjum",
              role: "Director (AI & Institutional Development)",
              icon: (
                <FaUserTie className="text-[#02C6C8] text-5xl mb-4 mx-auto" />
              ),
            },
          ].map((member, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl border border-gray-200 hover:border-[#02C6C8] shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              {member.icon}
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {member.name}
              </h3>
              <p className="text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
