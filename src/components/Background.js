import React from "react";

const Background = ({ color = "gray", children }) => {
  // pattern mapping
  const patternMapping = {
    // dot 30 x 30
    dot: {
      backgroundImage: `radial-gradient(circle, rgba(107, 107, 107, 1) 2px, transparent 1px)`,
      // backgroundSize: "30px 30px",
      // backgroundPosition: "0 0, 25px 25px",
    },
    // grid 15 x 15 | 500% 70 x 70
    grid: {
      backgroundImage: `
        repeating-linear-gradient(0deg, rgba(36, 36, 36, 1) 0px, rgba(255, 255, 255, 1) 1px, transparent 1px, transparent 72px),
        repeating-linear-gradient(90deg, rgba(36, 36, 36, 1) 0px, rgba(255, 255, 255, 1) 1px, transparent 1px, transparent 72px)
      `,
      // backgroundSize: "15 15px",
      // backgroundSize: "70px 70px",
      // backgroundPosition: "0 0, 25px 25px",
    },
  };

  return (
    <div
      style={{
        backgroundColor: color,
        // TODO patternMapping
        // ...patternMapping.dot,
        ...patternMapping.grid,
        //
        // browser default things disable for better experience
        overflow: "hidden",
        // user can't ctrl + scroll to zoom
        touchAction: "none",
      }}
    >
      {children}
    </div>
  );
};

export default Background;
