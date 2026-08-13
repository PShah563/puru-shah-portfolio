import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "../contexts/ThemeContext";
import "../styles/Landing.css";

function Landing() {
  const { theme } = useTheme();
  const logoRef = useRef(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      if (!logoRef.current) return;

      const maxWidth = 800;
      const zoomRatio = window.outerWidth / window.innerWidth;
      const containerWidth = logoRef.current.getBoundingClientRect().width;
      const normalizedWidth = Math.min(containerWidth, maxWidth) / zoomRatio;

      setScale(Math.min(normalizedWidth / maxWidth, 1));
    };

    requestAnimationFrame(() => setTimeout(updateScale, 0));
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  return (
    <section className="landing" id="home">
      <div ref={logoRef} className="logo-wrapper">
        <div className="logo-static" style={{ "--scale": scale }}>
          <img
            className="landing-logo"
            src={theme === "dark" ? "/Main%20logo%20Dark.png" : "/Main%20logo%20Light.png"}
            alt="Puru Shah Design Portfolio"
          />
          <div className="email">
            <a href="mailto:purumc563@gmail.com">PURUMC563@GMAIL.COM</a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Landing;
