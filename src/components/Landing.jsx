import React from "react";
import { useTheme } from "../contexts/ThemeContext";
import "../styles/Landing.css";

function Landing() {
  const { theme } = useTheme();

  return (
    <section className="landing" id="home">
      <div className="logo-wrapper">
        <div className="logo-static">
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
