import { useRef } from "react";
import { useBackgroundPaths } from "../components/BackgroundPaths";
import '../styles/About.css';

export default function About() {
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
          <h1 className="about-heading">About Me</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam congue
            malesuada velit eget mollis. Praesent vehicula lorem eget bibendum
            cursus. Quisque at augue ante. Vestibulum metus dui, varius vel
            mauris sit amet, consequat finibus dolor. Pellentesque at gravida
            odio. Aliquam tristique consequat magna, ac malesuada augue
            fringilla in. Nunc vitae elit dolor. Curabitur fringilla iaculis
            ante, sit amet sagittis libero. Nunc in sodales erat. Class aptent
            taciti sociosqu ad litora torquent per conubia nostra, per inceptos
            himenaeos. Duis et ipsum varius, sodales purus non, vehicula orci.
            Phasellus ut enim nec purus tristique semper. Nam id ornare arcu.
            Aliquam porta, nisi vel aliquet mollis, ex diam mattis dolor, eu
            rutrum quam turpis ac metus. Maecenas commodo lacinia purus in
            finibus. Sed bibendum eget augue in mattis.
          </p>
        </div>
      </div>
    </div>
  );
}
