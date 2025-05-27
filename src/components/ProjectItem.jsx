import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useTheme } from "../contexts/ThemeContext";
import "../styles/ProjectItem.css";

function ProjectItem({ company, projects, website, logo, index }) {
  const [carouselProject, setCarouselProject] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const touchStartX = useRef(null);
  const isEven = index % 2 === 0;
  const { theme } = useTheme();

  const openCarousel = (project) => {
    setCarouselProject(project);
    setCurrentSlide(0);
  };

  const closeCarousel = () => setCarouselProject(null);

  const nextSlide = () => {
    if (!carouselProject) return;
    setCurrentSlide((prev) => (prev + 1) % carouselProject.slides.length);
  };

  const prevSlide = () => {
    if (!carouselProject) return;
    setCurrentSlide(
      (prev) =>
        (prev - 1 + carouselProject.slides.length) %
        carouselProject.slides.length
    );
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (deltaX > 50) prevSlide();
    else if (deltaX < -50) nextSlide();
    touchStartX.current = null;
  };

  useEffect(() => {
    const handleKey = (e) => {
      if (!carouselProject) return;
      if (e.key === "ArrowRight") nextSlide();
      else if (e.key === "ArrowLeft") prevSlide();
      else if (e.key === "Escape") closeCarousel();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [carouselProject]);

  return (
    <div className={`project-item ${isEven ? "even" : "odd"}`}>
      <div className="project-heading">
        <h2 className={`company-name`}>{company}</h2>
        {website ? (
          <a
            className={`website`}
            href={`https://${website}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {website}
          </a>
        ) : (
          <p>&nbsp;</p>
        )}
      </div>
      {logo && (
        <div className={`project-logo-container`}>
          <img
            src={`${logo}_${theme}.png`}
            alt={`project logo`}
            className="project-logo"
          />
        </div>
      )}
      <div className={`project-grid`}>
        {projects.map((proj, idx) => {
          const openLink = (e) => {
            e.stopPropagation();
            if (proj.link) {
              window.location.href = proj.link;
            }
          };
          const handleClick = () => {
            openCarousel(proj);
          };

          return (
            <div
              key={idx}
              className="project-link"
              onClick={proj.link ? openLink : handleClick}
              style={{ cursor: proj.link ? "pointer" : "zoom-in" }}
            >
              <div className="project-thumb-wrapper">
                <img
                  src={proj.thumbnail}
                  alt={proj.title}
                  className="project-thumb"
                  style={{
                    top: proj.focalY || "auto",
                    left: proj.focalX || "auto",
                    transform: `scale(${proj.zoom || 1})`,
                  }}
                />
              </div>
              <span
                className={`project-title ${proj.link ? "haslink" : ""}`}
                onClick={openLink}
              >
                {proj.title}
              </span>
            </div>
          );
        })}
      </div>

      {carouselProject &&
        createPortal(
          <div
            className="carousel-overlay"
            onClick={closeCarousel}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="carousel-content"
              onClick={(e) => e.stopPropagation()}
            >
              {carouselProject.slides.length > 1 && (
                <button onClick={prevSlide} className="carousel-arrow left">
                  ‹
                </button>
              )}

              <div
                className={`carousel-slide ${
                  carouselProject.slides[currentSlide].length <= 2
                    ? "single-column"
                    : "double-column"
                }`}
              >
                {carouselProject.slides[currentSlide].map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    className="carousel-image"
                    alt={`Slide ${idx + 1}`}
                  />
                ))}
              </div>

              {carouselProject.slides.length > 1 && (
                <button onClick={nextSlide} className="carousel-arrow right">
                  ›
                </button>
              )}
              <button className="close-btn" onClick={closeCarousel}>
                ✕
              </button>
            </div>
          </div>,
          document.getElementById("root")
        )}
    </div>
  );
}

export default ProjectItem;
