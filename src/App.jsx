import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ThankYou from "./pages/ThankYou";
import ProjectPage from "./pages/ProjectPage";
import Navbar from "./components/Navbar";
import ThemeToggle from "./components/ThemeToggle";
import Loader from "./components/Loader";
import "./App.css";
import "./fonts/fonts.css";

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [showLoader, setShowLoader] = useState(true);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    const updateSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", updateSize);

    return () => {
      window.removeEventListener("resize", updateSize);
    };
  }, []);

useEffect(() => {
  const timeout = setTimeout(() => {
    const initialLoader = document.getElementById("initial-loader");
    if (initialLoader) {
      initialLoader.style.opacity = "0";
      initialLoader.style.transition = "opacity 0.4s ease";
      setTimeout(() => {
        initialLoader.remove();
        setShowLoader(false);
        setFadeIn(true);
      }, 200);
    } else {
      setShowLoader(false);
      setFadeIn(true);
    }
  }, 300);

  return () => clearTimeout(timeout);
}, []);

  return (
    <>
      <div className={`app-wrapper ${fadeIn ? "loaded" : "loading"}`}>
        <Router>
          <Navbar isMobile={isMobile} />
          {!isMobile && <ThemeToggle />}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects/:slug" element={<ProjectPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/thank-you" element={<ThankYou />} />
          </Routes>
        </Router>
        {showLoader && <Loader />}
      </div>
    </>
  );
}

export default App;
