import React, { useState } from "react";
import { HashLink } from 'react-router-hash-link';
import "../styles/Navbar.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <nav className="navbar">
      <a href="#home" className="nav-logo">
        <img className="nav-logo" src="/logo.png" />
      </a>

      <button
        className={`hamburger ${isOpen ? "active" : ""}`}
        onClick={toggleMenu}
      >
        ☰
      </button>

      <ul className={`nav-links ${isOpen ? "open" : ""}`} onClick={toggleMenu}>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <HashLink smooth to="/#projects">
            Projects
          </HashLink>
        </li>
        <li>
          <a href="/about">About</a>
        </li>
        <li>
          <a href="/contact">Contact</a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
