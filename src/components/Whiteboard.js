"use client";

import React, { useState, useRef } from "react";

import "./global.css";

import Background from "./Background";
import Board from "./Board";
import Headerbar from "./Headerbar";
// import BrushTool from "./Brush/BrushTool";
// import ColorPicker from "./Color/ColorPicker";
// import OpacitySlider from "./Opacity/OpacitySlider";
// import Toolbar from "./Toolbar/Toolbar";

import { filename, dev } from "./Utils";

const Whiteboard = () => {
  const canvasRef = useRef(null);

  // const handleClearCanvas = () => {
  //   const canvas = canvasRef.current;
  //   if (canvas) {
  //     const context = canvas.getContext("2d");
  //     context.clearRect(0, 0, canvas.width, canvas.height);
  //   }
  // };

  // const handleSaveCanvas = () => {
  //   const canvas = canvasRef.current;
  //   if (canvas) {
  //     const link = document.createElement("a");
  //     link.download = `${filename}`;
  //     link.href = canvas.toDataURL("image/png");
  //     link.click();
  //   }
  // };

  // v2
  // TODO: 開發思路
  // !1. Background 只是一個背景，不需要任何 props
  // !2. Board 就只是呼叫 Canvas 並回傳
  // 3. CanvasController 可以控制 canvas 移動、縮放、旋轉、清除、儲存、載入
  // 4. BrushTool 是一個 canvas，可以畫畫 (畫筆、橡皮擦、顏色、透明度、大小)

  return (
    <Background color={`var(--board-background${dev ? "-dev" : ""})`}>
      {/* header menu bar
        // TODO:
        // - [X] add board name
        // - [X] add status text
        // - [X] add menu button
        //  - [X] add menu items
        //   - [X] add create button
        //   - [X] add save  file button
        //   - [X] add read file button
        //   - [X] add clear button
        //   - [X] listen to window shortcut key
      */}
      <Headerbar canvasRef={canvasRef} />
      <Board ref={canvasRef} />
      {/* docker above Board using fixed to show i guess now... */}
    </Background>
  );
};

export default Whiteboard;
