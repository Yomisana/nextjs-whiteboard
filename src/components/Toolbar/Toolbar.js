import React from "react";

const Toolbar = ({ children }) => {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        padding: "10px",
        background: "rgba(255, 255, 255, 0.9)",
        borderRadius: "8px",
        boxShadow: "0 0 10px rgba(0,0,0,0.2)",
      }}
    >
      {children}
    </div>
  );
};

export default Toolbar;
