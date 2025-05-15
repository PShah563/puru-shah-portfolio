import { useRef } from "react";
import { useBackgroundPaths } from "../components/BackgroundPaths";
import '../styles/About.css';

export default function ThankYou() {
  const sectionRef = useRef(null);
  const svgRef = useRef(null);
  const svgRef2 = useRef(null);
  const itemRefs = useRef([null]);

  useBackgroundPaths({
    svgRef,
    svgRef2,
    sectionRef,
    itemRefs,
    projects: [{}],
    verticalStartOffset: 122,
    verticalStartOffset2: 168,
    finalVerticalOffset: 0,
  });

  return (
    <div className="page about" ref={sectionRef}>
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

      <div className="about-wrapper" ref={(el) => (itemRefs.current[0] = el)}>
        <div className="about-content">
          <h1 className="about-heading">Message received.</h1>
          <p>
            I will get back to you soon!
          </p>
        </div>
      </div>
    </div>
  );
}
