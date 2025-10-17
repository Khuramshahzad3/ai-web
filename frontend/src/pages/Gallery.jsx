import React from "react";

import image3 from "../assets/3rd.jpeg";
import image4 from "../assets/4th.jpeg";
import image5 from "../assets/5th.jpeg";
import image6 from "../assets/6th.jpeg";
import image7 from "../assets/7th.jpeg";
import image8 from "../assets/8th.jpeg";

// Array to easily map the images
const officeImages = [
  {
    id: 1,
    src: image3,
    alt: "Close-up of AI-TEC Academy building entrance, showing the main gate",
  },
  { id: 2, src: image4, alt: "Exterior view of AI-TEC Academy " },
  { id: 3, src: image5, alt: "Class room in Ai-Teg Academy" },
  {
    id: 4,
    src: image6,
    alt: "Spacious classroom at AI-TEC Academy featuring a dark color palette and a wall-mounted screen.",
  }, // This is the third image in the visible row
  {
    id: 5,
    src: image7,
    alt: "Bright and professional reception or student waiting area.",
  },
  {
    id: 6,
    src: image8,
    alt: "Administrative workspace or faculty office in the Ai-Teg Academy.",
  },
];

const Gallery = () => {
  return (
    // Outer container for padding and centering the gallery
    <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      {/* Title */}
      <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 text-center mb-12">
        Our Office Spaces
      </h2>

      {/* Responsive Grid Container */}
      <div
        className="grid 
                   grid-cols-1            /* Default: 1 column */
                   sm:grid-cols-2         /* On small screens (640px+): 2 columns */
                   md:grid-cols-3         /* On medium screens (768px+): 3 columns */
                   gap-6 md:gap-8         /* Spacing between grid items */
      "
      >
        {/* Map over the images to render them */}
        {officeImages.map((image) => (
          <div
            key={image.id}
            // Group classes for hover effects
            className="group relative overflow-hidden rounded-xl shadow-xl 
                       transition-all duration-500 ease-in-out
                       hover:shadow-2xl hover:scale-[1.03]
                       aspect-square"
          >
            <img
              src={image.src}
              alt={image.alt}
              // *** EAGER LOADING: By omitting the 'loading' attribute, the image loads immediately. ***
              // Use fetchpriority="high" for the first image only, as a performance hint.
              fetchpriority={image.id === 1 ? "high" : "auto"}
              // Image styling
              className="w-full h-full object-cover object-center 
                         transition-transform duration-500 ease-in-out
                         group-hover:scale-110"
            />

            {/* Subtle Overlay and Caption */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent 
                         transition-opacity duration-300 opacity-0 group-hover:opacity-100"
            >
              <p className="absolute bottom-4 left-4 text-white text-lg font-semibold">
                {image.alt}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
