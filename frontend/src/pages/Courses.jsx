import React from "react";
import AIpro from "../assets/AI & Digital Literacy Programs.png";
import TeacherCert from "../assets/TeacherCert.png";
import ParentCert from "../assets/ParentCert.png";
import EQM from "../assets/EQM.png";
import AIS from "../assets/AIS.png";

const Courses = () => {
  const [showdesc, setShowdesc] = React.useState(null);

  const programs = [
    {
      icon: <img src={AIpro} alt="AI & Digital Literacy Programs" />,
      title: "AI & Digital Literacy Programs",
      desc: "Empowering educators and students with practical AI tools — including ChatGPT, MagicSchool AI, Canva AI, Fetchy, and more. Participants learn prompt engineering, digital creativity, and automation skills essential for the modern world.",
    },
    // {
    //   icon: <FaRobot className="text-5xl text-[#02C6C8] mb-4" />,
    //   title: "STEM & Robotics Education (Grades 1–8)",
    //   desc: "Creators of Pakistan’s first comprehensive robotics textbook series: “Perceive – Evaluate – Execute: Modern Robotics for Young Innovators”. Each book is paired with Robotics Kits and teacher training. Students learn coding, electronics, and design through practical projects — making science a living experience.",
    // },
    {
      icon: <img src={TeacherCert} alt="Teacher Capacity-Building & Certification" />,
      title: "Teacher Capacity-Building & Certification",
      desc: "AI-TEG Academy designs immersive Teacher Training Workshops on AI in education, differentiated teaching, classroom management, emotional intelligence, and innovative assessment. Each program includes certification and practical implementation plans.",
    },
    {
      icon: <img src={ParentCert} alt="Mindful Parenting & Family Engagement" />,
      title: "Mindful Parenting & Family Engagement",
      desc: "Our Parenting Certification Program helps families understand emotional growth, discipline, and digital balance in the modern age. We bridge home and school relationships to create emotionally intelligent learners.",
    },
    {
      icon: <img src={EQM} alt="EQM – Educational Quality Management System" />,
      title: "EQM – Educational Quality Management System",
      desc: "AI-TEG Academy offers a 134-Point Quality Framework to help schools maintain excellence across academics, administration, and environment. Our EQM audits, 360° management reviews, and dashboards ensure measurable growth and sustainable quality improvement.",
    },
    {
      icon: <img src={AIS} alt="AI-Driven Consultancy for Schools" />,
      title: "AI-Driven Consultancy for Schools",
      desc: "From curriculum design to leadership training — we help schools integrate AI, Robotics, and Future Skills strategically. Our consultancy includes curriculum digitization, teacher analytics, branding strategies, and AI-assisted academic planning tools.",
    },
  ];

  return (
    <section className="bg-gray-50 py-20 px-6 md:px-20 text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">
        Our <span className="text-[#02C6C8]">Programs & Courses</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {programs.map((course, index) => (
          <div
            key={index}
            onClick={() => setShowdesc(showdesc === index ? null : index)}
            className={`rounded-2xl border shadow-md transition-all duration-300 hover:-translate-y-2 cursor-pointer overflow-hidden ${
              showdesc === index
                ? "p-8 bg-[#02C6C8] text-white hover:shadow-xl"
                : "bg-white border-gray-200 hover:border-[#02C6C8] hover:shadow-xl"
            }`}
          >
            <div
              className={`transition-all duration-300 transform ${
                showdesc === index
                  ? "opacity-0 translate-y-4 absolute"
                  : "opacity-100 translate-y-0 relative"
              }`}
            >
              <div className="w-full h-48 overflow-hidden">{course.icon}</div>
              <h3 className="text-xl mt-3 font-semibold text-gray-900 mb-3">
                {course.title}
              </h3>
            </div>

            <div
              className={`transition-all duration-300 transform ${
                showdesc === index
                 ? "opacity-100 max-h-60"
                    : "opacity-0 max-h-0"
              }`}
            >
              {showdesc === index && (
             <p className="text-base md:text-lg leading-relaxed text-white px-1">
                  {course.desc}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Courses;
