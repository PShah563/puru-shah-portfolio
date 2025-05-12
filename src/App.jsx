import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ThemeToggle from "./components/ThemeToggle.jsx";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import ProjectPage from "./pages/ProjectPage.jsx";
import './App.css';
import './fonts/fonts.css';

function App() {
  return (
    <Router>
      <Navbar />
      <ThemeToggle />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects/:slug" element={<ProjectPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;
