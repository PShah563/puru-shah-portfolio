import React, { useRef, useEffect } from "react";
import ProjectItem from "./ProjectItem";
import projects from "../data/projects";
import { useBackgroundPaths } from "./BackgroundPaths";
import "../styles/Projects.css";

function Projects() {
  const itemRefs = useRef([]);
  const sectionRef = useRef();
  const svgRef = useRef();
  const svgRef2 = useRef();

useBackgroundPaths({
  svgRef,
  svgRef2,
  sectionRef,
  itemRefs,
  projects,
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
      {projects.map((item, idx) => (
        <div
          key={idx}
          className="project-wrapper"
          ref={(el) => (itemRefs.current[idx] = el)}
        >
          <ProjectItem
            key={idx}
            company={item.company}
            website={item.website ? item.website : ""}
            projects={item.projects}
          />
        </div>
      ))}
    </section>
  );
}

export default Projects;
