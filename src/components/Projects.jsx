import React, { useRef } from "react";
import ProjectItem from "./ProjectItem";
import projects from "../data/projects";
import personalProjects from "../data/personalProjects";
import { useBackgroundPaths } from "./BackgroundPaths";
import "../styles/Projects.css";

function Projects() {
  const isMobile = window.innerWidth <= 768;

  const allProjects = [...projects, ...personalProjects]; // Still needed for path drawing
  const itemRefs = useRef([]);
  const sectionRef = useRef();
  const svgRef = useRef();
  const svgRef2 = useRef();

  useBackgroundPaths({
    svgRef,
    svgRef2,
    sectionRef,
    itemRefs,
    projects: allProjects,
    verticalStartOffset: isMobile ? 174.5 : 223,
    verticalStartOffset2: isMobile ? 220 : 269.5,
  });

  return (
    <section id="projects" className="projects-section" ref={sectionRef}>
      <div className="projects-heading">
        <h1>PORTFOLIO</h1>
      </div>

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

      {/* Render main projects */}
      {projects.map((item, idx) => (
        <div
          key={`main-${idx}`}
          className="project-wrapper"
          ref={(el) => (itemRefs.current[idx] = el)}
        >
          <ProjectItem
            company={item.company}
            website={item.website || ""}
            logo={item.logo || ""}
            projects={item.projects}
            index={idx}
          />
        </div>
      ))}

      {/* Section heading */}
      <div className="projects-heading">
        <h1>PERSONAL PROJECTS</h1>
      </div>

      {/* Render personal projects */}
      {personalProjects.map((item, pIdx) => {
        const globalIndex = projects.length + pIdx;
        return (
          <div
            key={`personal-${pIdx}`}
            className="project-wrapper"
            ref={(el) => (itemRefs.current[globalIndex] = el)}
          >
            <ProjectItem
              company={item.company}
              website={item.website || ""}
              logo={item.logo || ""}
              projects={item.projects}
              index={globalIndex}
            />
          </div>
        );
      })}
    </section>
  );
}

export default Projects;
