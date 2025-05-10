import React, { useRef, useEffect } from "react";
import ProjectItem from "./ProjectItem";
import projects from "../data/projects";
import "../styles/Projects.css";

function Projects() {
  const itemRefs = useRef([]);
  const sectionRef = useRef();
  const svgRef = useRef();
  const svgRef2 = useRef();

  useEffect(() => {
    const drawPaths = () => {
      const svg = svgRef.current;
      const svg2 = svgRef2.current;
      const section = sectionRef.current;
      if (!svg || !svg2 || !section) return;

      const width = section.offsetWidth;
      const height = section.offsetHeight;

      // Apply shared size and clear
      [svg, svg2].forEach((s) => {
        s.setAttribute("width", width);
        s.setAttribute("height", height);
        s.setAttribute("viewBox", `0 0 ${width} ${height}`);
        while (s.firstChild) s.removeChild(s.firstChild);
      });

      // Layout config
      const containerWidth =
        sectionRef.current?.getBoundingClientRect().width || 800;

      let inset, inset2;

      if (containerWidth <= 768) {
        inset = Math.min(Math.max(containerWidth * 0.08, 20), 60);
        inset2 = Math.min(Math.max(containerWidth * 0.1, 16), 48);
      } else {
        inset = Math.min(Math.max(containerWidth * 0.2, 40), 150);
        inset2 = Math.min(Math.max(containerWidth * 0.165, 32), 100);
      }

      const radius = 16;
      const verticalStartOffset = 119;
      const verticalStartOffset2 = 161;
      const headingOffset = 21;
      const headingOffset2 = 62;
      const leftX = inset;
      const rightX = width - inset;
      const left2X = inset2;
      const right2X = width - inset2;

      // Path 1 — original direction
      let path1 = "";
      let currentX1 = rightX;
      let currentY1 = verticalStartOffset;
      path1 += `M ${currentX1},0 V ${currentY1}`;

      // Path 2 — mirrored direction
      let path2 = "";
      let currentX2 = left2X;
      let currentY2 = verticalStartOffset2;
      path2 += `M ${currentX2},0 V ${currentY2}`;

      itemRefs.current.forEach((el, i) => {
        if (!el) return;

        const elTop = el.offsetTop;
        const elHeight = el.offsetHeight;

        const nextEl = itemRefs.current[i + 1];
        const nextHeadingY = nextEl
          ? nextEl.offsetTop + headingOffset
          : elTop + elHeight;

        const nextHeadingY2 = nextEl
          ? nextEl.offsetTop + headingOffset2
          : elTop + elHeight + 40;

        const goingRight = i % 2 === 0;

        // For path1 (your original path)
        const targetX1 = goingRight ? leftX : rightX;
        const arcDir1 = goingRight ? -1 : 1;
        const sweepFlag1 = goingRight ? 0 : 1;

        path1 += `A ${radius} ${radius} 0 0 ${sweepFlag1} ${
          currentX1 + arcDir1
        },${currentY1}`;
        currentX1 += arcDir1;

        const horizontalEndX1 = targetX1 - arcDir1 * radius;
        path1 += `H ${horizontalEndX1}`;
        currentX1 = horizontalEndX1;

        path1 += `A ${radius} ${radius} 0 0 ${sweepFlag1} ${targetX1},${
          currentY1 + radius
        }`;
        currentX1 = targetX1;
        currentY1 += radius;

        const verticalEndY1 = nextHeadingY - radius;
        path1 += `V ${verticalEndY1}`;
        currentY1 = verticalEndY1;

        const bottomArcTargetX1 = targetX1 - arcDir1 * radius;
        const bottomArcTargetY1 = nextHeadingY;
        path1 += `A ${radius} ${radius} 0 0 ${sweepFlag1} ${bottomArcTargetX1},${bottomArcTargetY1}`;
        currentX1 = bottomArcTargetX1;
        currentY1 = bottomArcTargetY1;

        // For path2 (mirrored path)
        const targetX2 = goingRight ? right2X : left2X;
        const arcDir2 = goingRight ? 1 : -1; // flipped
        const sweepFlag2 = goingRight ? 1 : 0; // flipped

        path2 += `A ${radius} ${radius} 0 0 ${sweepFlag2} ${
          currentX2 + arcDir2
        },${currentY2}`;
        currentX2 += arcDir2;

        const horizontalEndX2 = targetX2 - arcDir2 * radius;
        path2 += `H ${horizontalEndX2}`;
        currentX2 = horizontalEndX2;

        path2 += `A ${radius} ${radius} 0 0 ${sweepFlag2} ${targetX2},${
          currentY2 + radius
        }`;
        currentX2 = targetX2;
        currentY2 += radius;

        const verticalEndY2 = nextHeadingY2 - radius;
        path2 += `V ${verticalEndY2}`;
        currentY2 = verticalEndY2;

        const bottomArcTargetX2 = targetX2 - arcDir2 * radius;
        const bottomArcTargetY2 = nextHeadingY2;
        path2 += `A ${radius} ${radius} 0 0 ${sweepFlag2} ${bottomArcTargetX2},${bottomArcTargetY2}`;
        currentX2 = bottomArcTargetX2;
        currentY2 = bottomArcTargetY2;
      });

      // Tail logic (same as before for path1)
      const finalDir1 = currentX1 === leftX ? 1 : -1;
      const finalSweep1 = finalDir1 === 1 ? 1 : 0;
      const finalArcX1 = currentX1 + finalDir1;
      const finalArcY1 = currentY1;
      path1 += `A ${radius} ${radius} 0 0 ${finalSweep1} ${finalArcX1},${finalArcY1}`;
      currentX1 = finalArcX1;

      const tailEndX1 = leftX;
      path1 += `H ${tailEndX1}`;
      const curveDownX1 = tailEndX1 + finalDir1;
      const curveDownY1 = currentY1;
      path1 += `A ${radius} ${radius} 0 0 ${
        finalDir1 === 0 ? 1 : 0
      } ${curveDownX1},${curveDownY1}`;
      currentX1 = curveDownX1;
      currentY1 = curveDownY1;

      const tailEndY1 = currentY1 + verticalStartOffset;
      path1 += `V ${tailEndY1}`;
      currentY1 = tailEndY1;

      // Tail logic for path2 (mirrored direction)
      const finalDir2 = currentX2 === right2X ? -1 : 1;
      const finalSweep2 = finalDir2 === 1 ? 1 : 0;
      const finalArcX2 = currentX2 + finalDir2;
      const finalArcY2 = currentY2;
      path2 += `A ${radius} ${radius} 0 0 ${finalSweep2} ${finalArcX2},${finalArcY2}`;
      currentX2 = finalArcX2;

      const tailEndX2 = right2X;
      path2 += `H ${tailEndX2}`;
      const curveDownX2 = tailEndX2 + finalDir2;
      const curveDownY2 = currentY2;
      path2 += `A ${radius} ${radius} 0 0 ${
        finalDir2 === 0 ? 1 : 0
      } ${curveDownX2},${curveDownY2}`;
      currentX2 = curveDownX2;
      currentY2 = curveDownY2;

      const tailEndY2 = currentY2 + verticalStartOffset2;
      path2 += `V ${tailEndY2}`;
      currentY2 = tailEndY2;

      // Create path elements
      const createPath = (d, stroke = "#3c3b3a", width) => {
        const p = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "path"
        );
        p.setAttribute("d", d);
        p.setAttribute("fill", "none");
        p.setAttribute("stroke", stroke);
        p.setAttribute("stroke-width", width);
        p.setAttribute("stroke-linecap", "round");
        p.setAttribute("stroke-linejoin", "round");
        return p;
      };

      svg.appendChild(createPath(path1, "#3c3b3a", 23)); // primary
      svg2.appendChild(createPath(path2, "#947f57", 16)); // mirrored gold
    };

    requestAnimationFrame(drawPaths); // initial draw

    // Redraw on resize
    window.addEventListener("resize", drawPaths);

    // Clean up listener
    return () => {
      window.removeEventListener("resize", drawPaths);
    };
  }, [projects]);

  return (
    <section className="projects-section" ref={sectionRef}>
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
