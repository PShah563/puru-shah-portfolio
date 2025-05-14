import { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { createPortal } from "react-dom";
import { useBackgroundPaths } from "../components/BackgroundPaths";
import projects from "../data/projects";
import '../styles/ProjectPage.css';

export default function ProjectPage() {
  const { slug } = useParams();
  const svgRef = useRef(null);
  const svgRef2 = useRef(null);
  const sectionRef = useRef(null);
  const itemRefs = useRef([]);

  const [project, setProject] = useState(null);
  const [parentCompany, setParentCompany] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [carouselOpen, setCarouselOpen] = useState(false);
  const touchStartX = useRef(null);

  useEffect(() => {
    for (const company of projects) {
      for (const proj of company.projects) {
        if (proj.slug === slug) {
          setProject(proj);
          setParentCompany(company);
          return;
        }
      }
    }
  }, [slug]);

  useBackgroundPaths({
    svgRef,
    svgRef2,
    sectionRef,
    itemRefs,
    projects: project ? [project] : [],
    verticalStartOffset: 122,
    verticalStartOffset2: 168,
  });

  const openCarousel = (index) => {
    setCurrentSlide(index);
    setCarouselOpen(true);
  };

  const closeCarousel = () => setCarouselOpen(false);

  const nextSlide = () => {
    if (!project) return;
    setCurrentSlide((prev) => (prev + 1) % project.slides.length);
  };

  const prevSlide = () => {
    if (!project) return;
    setCurrentSlide(
      (prev) => (prev - 1 + project.slides.length) % project.slides.length
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
      if (!carouselOpen) return;
      if (e.key === "ArrowRight") nextSlide();
      else if (e.key === "ArrowLeft") prevSlide();
      else if (e.key === "Escape") closeCarousel();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [carouselOpen, project]);

  if (!project) {
    return (
      <div className="page project">
        <h1>Project Not Found</h1>
      </div>
    );
  }

  return (
    <div className="page project" ref={sectionRef} >
      <svg
        ref={svgRef}
        className="line-background"
        preserveAspectRatio="none"
      />
      <svg
        ref={svgRef2}
        className="line-background-accent"
        preserveAspectRatio="none"
      />

      <div className="project-page-wrapper" ref={(el) => (itemRefs.current[0] = el)}>
        <h2 className="company-name">
          {parentCompany?.company}
        </h2>

        {parentCompany?.website && (
          <a
            className="website"
            href={`https://${parentCompany.website}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {parentCompany.website}
          </a>
        )}

        <div className="project-page-grid">
          {project.slides.map((group, index) => (
            <div
              key={index}
              className="project-thumb-wrapper"
              onClick={() => openCarousel(index)}
            >
              <img
                src={group[0]}
                alt={`Slide ${index + 1}`}
                className="project-thumb"
              />
            </div>
          ))}
        </div>
      </div>

      {carouselOpen &&
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
              <button onClick={prevSlide} className="carousel-arrow left">
                ‹
              </button>

              <div
                className={`carousel-slide ${
                  project.slides[currentSlide].length <= 2
                    ? "single-column"
                    : "double-column"
                }`}
              >
                {project.slides[currentSlide].map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    className="carousel-image"
                    alt={`Slide ${currentSlide + 1} - Item ${idx + 1}`}
                  />
                ))}
              </div>

              <button onClick={nextSlide} className="carousel-arrow right">
                ›
              </button>
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
