import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from '../pages/about/About';
import Contact from '../pages/contact/Contact';
import Portfolio from "../pages/portfolio/Portfolio";
import Resume from "../pages/resume/Resume";
import Blog from "../pages/blog/Blog";
import Sidebar from "../components/sidebar/Sidebar";
import Navbar from "../components/navbar/Navbar";
export default function Routing() {
  return (
    <>
      <main>
        <Sidebar />

        <BrowserRouter>
          <div className="main-content">
            <Navbar />

            <Routes>
              <Route path="/" element={<About />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/resume" element={<Resume />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<h1>404 Not Found</h1>} />
            </Routes>
          </div>
        </BrowserRouter>
      </main>
    </>
  );
}
