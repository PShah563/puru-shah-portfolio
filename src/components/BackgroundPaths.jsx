import { useEffect } from "react";

export function useBackgroundPaths({
  svgRef,
  svgRef2,
  sectionRef,
  itemRefs,
  projects,
  verticalStartOffset = 223,
  verticalStartOffset2 = 269.5,
  headingOffset = 55,
  headingOffset2 = 121,
  finalVerticalOffset = 70,
}) {
  useEffect(() => {
    const drawPaths = () => {
      const svg = svgRef.current;
      const svg2 = svgRef2.current;
      const section = sectionRef.current;
      if (!svg || !svg2 || !section) return;

      const width = section.offsetWidth;
      const height = section.offsetHeight;

      [svg, svg2].forEach((s) => {
        s.setAttribute("width", width);
        s.setAttribute("height", height);
        s.setAttribute("viewBox", `0 0 ${width} ${height}`);
        while (s.firstChild) s.removeChild(s.firstChild);
      });

      const containerWidth = section.getBoundingClientRect().width || 800;

      let inset, inset2;

      if (containerWidth <= 768) {
        inset = 10;
        inset2 = 10;
      } else {
        inset = Math.min(Math.max(containerWidth * 0.2, 40), 1500);
        inset2 = Math.min(Math.max(containerWidth * 0.165, 32), 1000);
      }

      document.documentElement.style.setProperty('--inset', `${inset}px`);
      document.documentElement.style.setProperty('--inset2', `${inset2}px`);


      const radius = 32;
      const leftX = inset;
      const rightX = width - inset;
      const left2X = inset2;
      const right2X = width - inset2;

      let path1 = "";
      let currentX1 = rightX;
      let currentY1 = verticalStartOffset;
      path1 += `M ${currentX1 + radius},0  V ${currentY1 - radius}`;

      let path2 = "";
      let currentX2 = left2X;
      let currentY2 = verticalStartOffset2;
      path2 += `M ${currentX2 - radius},0  V ${currentY2 - radius}`;

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
        const isLast = i === itemRefs.current.length - 1;

        // Path 1
        const targetX1 = goingRight ? leftX : rightX;
        const arcDir1 = goingRight ? -1 : 1;
        const sweepFlag1 = goingRight ? 0 : 1;

        path1 += `A ${radius} ${radius} 0 0 1 ${
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

        const verticalEndY1 =
          (isLast ? nextHeadingY + finalVerticalOffset : nextHeadingY) - radius;
        path1 += `V ${verticalEndY1}`;
        currentY1 = verticalEndY1;

        const adjustedNextHeadingY = isLast
          ? nextHeadingY + finalVerticalOffset
          : nextHeadingY;
        path1 += `A ${radius} ${radius} 0 0 ${sweepFlag1} ${
          targetX1 - arcDir1 * radius
        },${adjustedNextHeadingY}`;
        currentX1 = targetX1 - arcDir1 * radius;
        currentY1 = adjustedNextHeadingY;

        // Path 2
        const targetX2 = goingRight ? right2X : left2X;
        const arcDir2 = goingRight ? 1 : -1;
        const sweepFlag2 = goingRight ? 1 : 0;

        path2 += `A ${radius} ${radius} 0 0 0 ${
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

        const verticalEndY2 =
          (isLast ? nextHeadingY2 + finalVerticalOffset : nextHeadingY2) -
          radius;
        path2 += `V ${verticalEndY2}`;
        currentY2 = verticalEndY2;

        const adjustedNextHeadingY2 = isLast
          ? nextHeadingY2 + finalVerticalOffset
          : nextHeadingY2;
        path2 += `A ${radius} ${radius} 0 0 ${sweepFlag2} ${
          targetX2 - arcDir2 * radius
        },${adjustedNextHeadingY2}`;
        currentX2 = targetX2 - arcDir2 * radius;
        currentY2 = adjustedNextHeadingY2;
      });

      // Tails
      const tail1 = () => {
        const isEven = (itemRefs.current.length - 1) % 2 === 0;
        const tailSideX = isEven ? rightX : leftX;
        const finalDir = currentX1 < tailSideX ? 1 : -1;
        const sweep = finalDir === 1 ? 1 : 0;

        path1 += `A ${radius} ${radius} 0 0 ${sweep} ${
          currentX1 + finalDir
        },${currentY1}`;
        currentX1 += finalDir;

        path1 += `H ${tailSideX - radius}`;
        path1 += `A ${radius} ${radius} 0 0 1 ${
          tailSideX + finalDir
        },${currentY1 + radius}`;
        path1 += `V ${currentY1 + verticalStartOffset * 20}`;
      };

      const tail2 = () => {
        const isEven = (itemRefs.current.length - 1) % 2 === 0;
        const tailSideX = isEven ? left2X : right2X;
        const finalDir = currentX2 < tailSideX ? 1 : -1;
        const sweep = finalDir === 1 ? 1 : 0;

        path2 += `A ${radius} ${radius} 0 0 ${sweep} ${
          currentX2 + finalDir
        },${currentY2}`;
        currentX2 += finalDir;

        path2 += `H ${tailSideX + radius}`;
        path2 += `A ${radius} ${radius} 0 0 0 ${
          tailSideX + finalDir
        },${currentY2 + radius}`;
        path2 += `V ${currentY2 + verticalStartOffset2 * 20}`;
      };

      tail1();
      tail2();

      const createPath = (d, stroke = "var(--heading-bg)", width) => {
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

      svg.appendChild(createPath(path1, "var(--heading-bg)", 23));
      svg2.appendChild(createPath(path2, "#947f57", 16));
    };

    requestAnimationFrame(drawPaths);
    const observer = new ResizeObserver(() => {
      drawPaths();
    });

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [
    projects,
    verticalStartOffset,
    verticalStartOffset2,
    headingOffset,
    headingOffset2,
    finalVerticalOffset,
  ]);
}
