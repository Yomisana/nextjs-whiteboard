"use client";

import React, { useState, useRef } from "react";
import BrushTool from "./Brush/BrushTool";
import ColorPicker from "./Color/ColorPicker";
import OpacitySlider from "./Opacity/OpacitySlider";
import Toolbar from "./Toolbar/Toolbar";

const Whiteboard = () => {
  const canvasRef = useRef(null);
  // Default color is black
  const [color, setColor] = useState("#000000");
  // Default brush size is 5
  const [brushSize, setBrushSize] = useState(5);
  // Default opacity is 1
  const [opacity, setOpacity] = useState(1);

  const [isEraserActive, setIsEraserActive] = useState(false);

  const handleClearCanvas = () => {
    console.log("Clearing canvas");
    const canvas = canvasRef.current.getCanvas();
    if (canvas) {
      const context = canvas.getContext("2d");
      context.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  const handleSaveCanvas = () => {
    const canvas = canvasRef.current.getCanvas();
    if (canvas) {
      const link = document.createElement("a");
      // link.download = "drawing.png";
      // get date and time for the file name
      const date = new Date();
      const dateString = date.toISOString().slice(0, 10);
      const timeString = date.toLocaleTimeString();
      link.download = `drawing-${dateString}-${timeString}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    }
  };

  const handleBrushSizeChange = (size) => {
    setBrushSize(Math.max(size, 1));
  };

  return (
    <div style={{ backgroundColor: "#ffffff", minHeight: "100vh" }}>
      <BrushTool
        ref={canvasRef}
        color={isEraserActive ? "rgba(0,0,0,0)" : color}
        size={brushSize}
        opacity={opacity}
      />
      <Toolbar>
        <ColorPicker setColor={setColor} />
        <div>
          <span>opacity</span>
          <OpacitySlider setOpacity={setOpacity} />
        </div>
        <div>
          <span>brush size</span>
          <input
            type="range"
            value={brushSize}
            onChange={(e) => handleBrushSizeChange(Number(e.target.value))}
            min="1"
            max="50" // 你可以根據需要調整最大值
          />
        </div>

        <button onClick={() => setIsEraserActive(!isEraserActive)}>
          {isEraserActive ? "Switch to Pen" : "Switch to Eraser"}
        </button>
        <button onClick={handleClearCanvas}>Clear</button>
        <button onClick={handleSaveCanvas}>Save</button>
      </Toolbar>
    </div>
  );
};

export default Whiteboard;
