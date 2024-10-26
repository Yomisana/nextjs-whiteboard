"use client";

import React, { useRef, useState, useEffect } from "react";

const Whiteboard = () => {
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [tool, setTool] = useState("pencil");
  const [size, setSize] = useState(5);
  const [color, setColor] = useState("#000000");
  const [text, setText] = useState("");
  const [theme, setTheme] = useState("light");
  const [selection, setSelection] = useState(null);
  const [startPoint, setStartPoint] = useState(null);
  const [bgColor, setBgColor] = useState("#ffffff");
  const [bgPattern, setBgPattern] = useState("none");
  const [patternSize, setPatternSize] = useState(10);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
    setTheme(prefersDark.matches ? "dark" : "light");

    ctx.strokeStyle = color;
    ctx.lineWidth = size;
    drawBackground(ctx);
  }, [color, bgColor, bgPattern, patternSize]);

  const drawBackground = (ctx) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.globalCompositeOperation = "destination-over";

    if (bgPattern === "dot") {
      ctx.fillStyle = "#ccc";
      for (let x = 0; x < ctx.canvas.width; x += patternSize) {
        for (let y = 0; y < ctx.canvas.height; y += patternSize) {
          ctx.fillRect(x, y, 1, 1);
        }
      }
    } else if (bgPattern === "line") {
      ctx.strokeStyle = "#ccc";
      for (let y = 0; y < ctx.canvas.height; y += patternSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(ctx.canvas.width, y);
        ctx.stroke();
      }
    } else if (bgPattern === "grid") {
      ctx.strokeStyle = "#ccc";
      for (let x = 0; x < ctx.canvas.width; x += patternSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, ctx.canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < ctx.canvas.height; y += patternSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(ctx.canvas.width, y);
        ctx.stroke();
      }
    }

    ctx.globalCompositeOperation = "source-over";
  };

  const startDrawing = (e) => {
    if (tool === "select") {
      setStartPoint({ x: e.clientX, y: e.clientY });
      setSelection({ x: e.clientX, y: e.clientY, width: 0, height: 0 });
    } else {
      setDrawing(true);
      const ctx = canvasRef.current.getContext("2d");
      ctx.beginPath();
      ctx.moveTo(e.clientX, e.clientY);
    }
  };

  const endDrawing = () => {
    setDrawing(false);
    setStartPoint(null);
  };

  const draw = (e) => {
    if (!drawing || tool === "text" || tool === "select") return;
    const ctx = canvasRef.current.getContext("2d");

    if (tool === "eraser") {
      ctx.globalCompositeOperation = "destination-out";
      ctx.lineWidth = size * 2;
    } else {
      ctx.globalCompositeOperation = "source-over";
      ctx.lineWidth = size;
      ctx.strokeStyle = color;
    }

    ctx.lineTo(e.clientX, e.clientY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX, e.clientY);
  };

  const handleMouseMove = (e) => {
    if (drawing) {
      draw(e);
    } else if (startPoint && tool === "select") {
      const newWidth = e.clientX - startPoint.x;
      const newHeight = e.clientY - startPoint.y;
      setSelection({
        x: newWidth < 0 ? e.clientX : startPoint.x,
        y: newHeight < 0 ? e.clientY : startPoint.y,
        width: Math.abs(newWidth),
        height: Math.abs(newHeight),
      });
    }
  };

  const handleDeleteSelection = () => {
    if (!selection) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(selection.x, selection.y, selection.width, selection.height);
    setSelection(null);
  };

  const handleTextAdd = (e) => {
    if (tool === "text" && text) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      ctx.font = `${size * 2}px Arial`;
      ctx.fillStyle = color;
      ctx.fillText(text, e.clientX, e.clientY);
      setText("");
    }
  };

  const handleSave = () => {
    const canvas = canvasRef.current;
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "whiteboard.png";
    link.click();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Delete" || e.key === "Backspace") {
      handleDeleteSelection();
    }
  };

  return (
    <div
      style={{ position: "relative" }}
      onMouseMove={handleMouseMove}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div
        style={{
          position: "fixed",
          bottom: 10,
          left: "50%",
          transform: "translateX(-50%)",
          background: theme === "dark" ? "#333" : "#fff",
          color: theme === "dark" ? "#fff" : "#000",
          padding: "10px",
          borderRadius: "20px",
          zIndex: 1,
          display: "flex",
          flexDirection: "row",
          gap: "20px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <label style={{ cursor: "pointer" }}>
            Pencil
            <input
              type="radio"
              name="tool"
              value="pencil"
              checked={tool === "pencil"}
              onChange={(e) => setTool(e.target.value)}
              style={{ display: "none" }}
            />
          </label>
          <label style={{ cursor: "pointer" }}>
            Eraser
            <input
              type="radio"
              name="tool"
              value="eraser"
              checked={tool === "eraser"}
              onChange={(e) => setTool(e.target.value)}
              style={{ display: "none" }}
            />
          </label>
          <label style={{ cursor: "pointer" }}>
            Select
            <input
              type="radio"
              name="tool"
              value="select"
              checked={tool === "select"}
              onChange={(e) => setTool(e.target.value)}
              style={{ display: "none" }}
            />
          </label>
          <label style={{ cursor: "pointer" }}>
            Text
            <input
              type="radio"
              name="tool"
              value="text"
              checked={tool === "text"}
              onChange={(e) => setTool(e.target.value)}
              style={{ display: "none" }}
            />
          </label>
        </div>
        <label>
          Size:
          <input
            type="range"
            min="1"
            max="20"
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
          />
        </label>
        <label>
          Color:
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </label>
        <label>
          Background Color:
          <input
            type="color"
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
          />
        </label>
        <label>
          Background Pattern:
          <select
            value={bgPattern}
            onChange={(e) => setBgPattern(e.target.value)}
          >
            <option value="none">None</option>
            <option value="dot">Dot</option>
            <option value="line">Line</option>
            <option value="grid">Grid</option>
          </select>
        </label>
        <label>
          Pattern Size:
          <input
            type="range"
            min="5"
            max="50"
            value={patternSize}
            onChange={(e) => setPatternSize(Number(e.target.value))}
          />
        </label>
        {tool === "text" && (
          <input
            type="text"
            placeholder="Enter text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        )}
        <button onClick={handleSave}>Save</button>
      </div>

      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseUp={endDrawing}
        onClick={tool === "text" ? handleTextAdd : null}
        style={{
          border: "1px solid black",
          width: "100%",
          height: "100vh",
          cursor: tool === "select" ? "crosshair" : "default",
        }}
      />

      {selection && (
        <div
          style={{
            position: "absolute",
            left: selection.x,
            top: selection.y,
            width: selection.width,
            height: selection.height,
            border: "2px dashed red",
            pointerEvents: "none",
          }}
        ></div>
      )}
    </div>
  );
};

export default Whiteboard;
