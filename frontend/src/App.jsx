import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Applayout from "./components/layout/applayout";
import About from "./pages/About";
import Courses from "./pages/Courses";
import Gallery from "./pages/Gallery";
import Faq from "./pages/Faq";
import Contactus from "./pages/Contactus";

// ✅ Main App
const App = () => {
  const router = createBrowserRouter([
    {
      element: <Applayout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/about", element: <About /> },
        { path: "/courses", element: <Courses /> },
        { path: "/gallery", element: <Gallery /> },
        { path: "/faq", element: <Faq /> },
        { path: "/contact", element: <Contactus /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
