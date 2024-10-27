"use client";

import React, { useState, useEffect } from "react";
import BrushTool from "./Brush/BrushTool";
import ColorPicker from "./Color/ColorPicker";
import OpacitySlider from "./Opacity/OpacitySlider";
import Toolbar from "./Toolbar/Toolbar";

const Whiteboard = () => {
  const [color, setColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(5);
  const [opacity, setOpacity] = useState(1);
  const [background, setBackground] = useState("#ffffff");

  useEffect(() => {
    // 根據背景色調整筆刷色環的顯示
    if (color === background) {
      setColor(background === "#ffffff" ? "#000000" : "#ffffff");
    }
  }, [background, color]);

  return (
    <div style={{ backgroundColor: background, minHeight: "100vh" }}>
      <BrushTool color={color} size={brushSize} opacity={opacity} />
      <Toolbar>
        <ColorPicker setColor={setColor} />
        <OpacitySlider setOpacity={setOpacity} />
        {/* 可以再加入 BrushSelector 讓使用者選擇不同的筆刷圖案 */}
      </Toolbar>
    </div>
  );
};

export default Whiteboard;
