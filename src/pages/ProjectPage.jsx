import { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { createPortal } from "react-dom";
import { useBackgroundPaths } from "../components/BackgroundPaths";
import projects from "../data/projects";
import "../styles/ProjectPage.css";

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
  const [layoutClass, setLayoutClass] = useState("row-layout");
  const touchStartX = useRef(null);

  const normalizeImage = (img) => {
    if (typeof img === "string") {
      return { src: img, focalX: "center", focalY: "center", zoom: 1 };
    }
    return {
      src: img.src,
      focalX: img.focalX || "center",
      focalY: img.focalY || "center",
      zoom: img.zoom || 1,
    };
  };

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

  useEffect(() => {
    if (!project) return;

    const currentImages = project.slides[currentSlide];
    const imageCount = currentImages.length;

    if (imageCount > 2) {
      setLayoutClass("double-column");
      return;
    }

    if (imageCount === 1) {
      setLayoutClass("single-column");
      return;
    }

    if (imageCount === 2) {
      Promise.all(
        currentImages.map((img) => {
          const { src } = normalizeImage(img);
          return new Promise((resolve) => {
            const image = new Image();
            image.onload = () =>
              resolve(image.width > image.height ? "landscape" : "portrait");
            image.src = src;
          });
        })
      ).then((orientations) => {
        const landscapeCount = orientations.filter(
          (o) => o === "landscape"
        ).length;
        const layout = landscapeCount === 2 ? "column-layout" : "row-layout";
        setLayoutClass(`two-images ${layout}`);
      });
    }
  }, [project, currentSlide]);

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
    <div className="page project" ref={sectionRef}>
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

      <div
        className="project-page-wrapper"
        ref={(el) => (itemRefs.current[0] = el)}
      >
        <div className="project-heading">
          <h2 className="company-name">{parentCompany?.company}</h2>

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
        </div>

        <div className="project-page-grid">
          {project.slides.map((group, slideIndex) => (
            <div key={slideIndex} className="project-slide-group">
              {group.map((img, imgIndex) => {
                const { src, focalX, focalY, zoom } = normalizeImage(img);
                return (
                  <div
                    key={`${slideIndex}-${imgIndex}`}
                    className="project-thumb-wrapper"
                    onClick={() => openCarousel(slideIndex)}
                  >
                    <img
                      src={src}
                      alt={`Slide ${slideIndex + 1} - Image ${imgIndex + 1}`}
                      className="project-thumb"
                      style={{
                        left: `${focalX}`,
                        top: `${focalY}`,
                        transform: `scale(${zoom})`,
                        cursor: `pointer`,
                      }}
                    />
                  </div>
                );
              })}
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

              <div className={`carousel-slide ${layoutClass}`}>
                {project.slides[currentSlide].map((img, idx) => {
                  const { src } = normalizeImage(img);
                  return (
                    <img
                      key={idx}
                      src={src}
                      className="carousel-image"
                      alt={`Slide ${currentSlide + 1} - Item ${idx + 1}`}
                    />
                  );
                })}
              </div>

              {project.slides.length > 1 && (
                <div className="carousel-indicators">
                  {project.slides.map((_, idx) => (
                    <span
                      key={idx}
                      className={`carousel-dot ${
                        currentSlide === idx ? "active" : ""
                      }`}
                      onClick={() => setCurrentSlide(idx)}
                    />
                  ))}
                </div>
              )}

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
