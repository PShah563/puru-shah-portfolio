import React, { useEffect, useState, useRef } from "react";
import "../styles/Landing.css";

function Landing() {
  const logoRef = useRef(null);
  const [scale, setScale] = useState(1);

  function getZoomRatio() {
  return window.outerWidth / window.innerWidth;
}

  useEffect(() => {
    const updateScale = () => {
      const maxWidth = 800;
      const zoomRatio = getZoomRatio();

      if (!logoRef.current) return;

      const containerWidth = logoRef.current.getBoundingClientRect().width;
      const clampedWidth = Math.min(containerWidth, maxWidth);
      const normalizedWidth = clampedWidth / zoomRatio;
      const scaleValue = normalizedWidth / maxWidth;

      setScale(Math.min(scaleValue, 1));
    };

    requestAnimationFrame(() => setTimeout(updateScale, 0));
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  return (
    <section className="landing" id="home">
      <div ref={logoRef} className="logo-wrapper">
        <div className="logo-static" style={{ "--scale": scale }}>
          <h1 className="part p">P</h1>
          <h1 className="part firstname">uru</h1>
          <h1 className="part s">S</h1>
          <h1 className="part lastname">hah</h1>
          <h2 className="part subheading">GRAPHIC DESIGNER</h2>
          <div className="email">
            <a href="mailto:purumc563@gmail.com">PURUMC563@GMAIL.COM</a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Landing;
