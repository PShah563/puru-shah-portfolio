import { createContext, useContext, useState, useRef } from "react";

const AnimatedGridContext = createContext();

export function AnimatedGridProvider({ gridId = 0, children }) {
  const [hovered, setHovered] = useState({ gridId: null, index: null });
  const itemRefs = useRef({});

  const setHoveredIndex = (gridId, index) => {
    setHovered({ gridId, index });
  };

  if (!itemRefs.current[gridId]) {
    itemRefs.current[gridId] = [];
  }

  return (
    <AnimatedGridContext.Provider
      value={{
        hovered,
        setHoveredIndex,
        itemRefs: itemRefs.current[gridId],
        gridId,
      }}
    >
      {children}
    </AnimatedGridContext.Provider>
  );
}

export function useAnimatedGrid() {
  return useContext(AnimatedGridContext);
}
