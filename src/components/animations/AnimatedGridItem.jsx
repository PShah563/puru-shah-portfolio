import { motion } from "framer-motion";
import { useRef, useEffect } from "react";
import { useAnimatedGrid } from "../../contexts/AnimatedGridContext";

export default function AnimatedGridItem({
  children,
  index,
  className = "",
  baseScale = 1,
  hoverScale = 1.15,
  transition = { type: "spring", stiffness: 170, damping: 20 },
  distance = 20,
  style = {},
  ...props
}) {
  const ref = useRef(null);
  const { hovered, setHoveredIndex, itemRefs, gridId } = useAnimatedGrid();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      itemRefs[index] = ref.current;
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [index]);

  const isHovered = hovered.gridId === gridId && hovered.index === index;

  let offsetX = 0;
  let offsetY = 0;

  if (
    hovered.gridId === gridId &&
    hovered.index !== null &&
    hovered.index !== index
  ) {
    const thisEl = ref.current;
    const hoveredEl = itemRefs[hovered.index];

    if (thisEl && hoveredEl) {
      const rect1 = thisEl.getBoundingClientRect();
      const rect2 = hoveredEl.getBoundingClientRect();

      const x1 = rect1.left + rect1.width / 2;
      const y1 = rect1.top + rect1.height / 2;
      const x2 = rect2.left + rect2.width / 2;
      const y2 = rect2.top + rect2.height / 2;

      const angle = Math.atan2(y1 - y2, x1 - x2);
      offsetX = Math.cos(angle) * distance;
      offsetY = Math.sin(angle) * distance;
    }
  }

  return (
    <motion.div
      ref={ref}
      layout
      layoutId={`grid-item-${gridId}-${index}`}
      onMouseEnter={() => setHoveredIndex(gridId, index)}
      onMouseLeave={() => setHoveredIndex(null, null)}
      animate={{
        scale: isHovered ? hoverScale : baseScale,
        x: offsetX,
        y: offsetY,
        zIndex: isHovered ? 1000 : 1,
      }}
      transition={transition}
      className={className}
      style={{
        willChange: "transform",
        backfaceVisibility: "hidden",
        transformStyle: "preserve-3d",
        ...style,
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
