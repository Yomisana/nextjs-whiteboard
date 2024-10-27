"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";

const Whiteboard = () => {
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [tool, setTool] = useState("pencil");
  const [size, setSize] = useState(5);
  const [color, setColor] = useState("#000000");
  const [text, setText] = useState("");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [bgPattern, setBgPattern] = useState("none");
  const [patternSize, setPatternSize] = useState(10);
  const [selection, setSelection] = useState(null);
  const [startPoint, setStartPoint] = useState(null);
  const [cursorSize, setCursorSize] = useState({ x: 0, y: 0 });
  const [fps, setFps] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener("resize", handleResize);
    restoreDrawing();
    updateCanvas();

    const animationLoop = window.requestAnimationFrame(trackFPS);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.cancelAnimationFrame(animationLoop);
    };
  }, [bgColor, bgPattern, patternSize]);

  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const tempImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drawBackground(ctx);
    ctx.putImageData(tempImage, 0, 0);
  }, [bgColor, bgPattern, patternSize]);

  const drawBackground = useCallback(
    (ctx) => {
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      ctx.save();
      ctx.fillStyle = "#999";
      switch (bgPattern) {
        case "dot":
          for (let x = 0; x < ctx.canvas.width; x += patternSize * 2) {
            for (let y = 0; y < ctx.canvas.height; y += patternSize * 2) {
              ctx.beginPath();
              ctx.arc(
                x + patternSize,
                y + patternSize,
                patternSize / 2,
                0,
                Math.PI * 2
              );
              ctx.fill();
            }
          }
          break;
        case "line":
          ctx.strokeStyle = "#999";
          ctx.lineWidth = patternSize / 5;
          for (let y = 0; y < ctx.canvas.height; y += patternSize * 2) {
            ctx.beginPath();
            ctx.moveTo(0, y + patternSize);
            ctx.lineTo(ctx.canvas.width, y + patternSize);
            ctx.stroke();
          }
          break;
        case "grid":
          ctx.strokeStyle = "#999";
          ctx.lineWidth = patternSize / 10;
          for (let x = 0; x < ctx.canvas.width; x += patternSize * 2) {
            ctx.beginPath();
            ctx.moveTo(x + patternSize, 0);
            ctx.lineTo(x + patternSize, ctx.canvas.height);
            ctx.stroke();
          }
          for (let y = 0; y < ctx.canvas.height; y += patternSize * 2) {
            ctx.beginPath();
            ctx.moveTo(0, y + patternSize);
            ctx.lineTo(ctx.canvas.width, y + patternSize);
            ctx.stroke();
          }
          break;
        default:
          break;
      }
      ctx.restore();
    },
    [bgPattern, patternSize, bgColor]
  );

  const updateCanvas = useCallback(() => {
    const ctx = canvasRef.current.getContext("2d");
    drawBackground(ctx);
    restoreDrawing();
  }, [drawBackground]);

  const startDrawing = useCallback(
    (e) => {
      if (tool === "select") {
        setStartPoint({ x: e.clientX, y: e.clientY });
        setSelection({ x: e.clientX, y: e.clientY, width: 0, height: 0 });
      } else {
        setDrawing(true);
        const ctx = canvasRef.current.getContext("2d");
        ctx.beginPath();
        ctx.moveTo(e.clientX, e.clientY);
      }
    },
    [tool]
  );

  const endDrawing = useCallback(() => {
    setDrawing(false);
    if (tool !== "text") setText("");
    saveDrawingState();
  }, [tool]);

  const draw = useCallback(
    (e) => {
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
    },
    [drawing, tool, size, color]
  );

  const handleMouseMove = useCallback(
    (e) => {
      if (drawing) draw(e);

      if (startPoint && tool === "select") {
        const newWidth = e.clientX - startPoint.x;
        const newHeight = e.clientY - startPoint.y;
        setSelection({
          x: newWidth < 0 ? e.clientX : startPoint.x,
          y: newHeight < 0 ? e.clientY : startPoint.y,
          width: Math.abs(newWidth),
          height: Math.abs(newHeight),
        });
      }
      if (tool === "pencil" || tool === "eraser") {
        setCursorSize({ x: e.clientX, y: e.clientY });
      }
    },
    [drawing, draw, startPoint, tool]
  );

  const handleClick = useCallback(
    (e) => {
      if (tool === "text") {
        const ctx = canvasRef.current.getContext("2d");
        ctx.fillStyle = color;
        ctx.font = `${size * 2}px Arial`;
        ctx.fillText(text, e.clientX, e.clientY);
        setText("");
        saveDrawingState();
      }
    },
    [tool, color, size, text]
  );

  const handleDeleteSelection = useCallback(() => {
    if (!selection) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = bgColor;
    ctx.fillRect(selection.x, selection.y, selection.width, selection.height);

    drawBackground(ctx); // Redraw background
    setSelection(null);
  }, [selection, bgColor, drawBackground]);

  const restoreDrawing = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const savedDrawing = localStorage.getItem("savedDrawing");
    if (savedDrawing) {
      const img = new Image();
      img.onload = () => ctx.drawImage(img, 0, 0);
      img.src = savedDrawing;
    }
  }, []);

  const saveDrawingState = useCallback(() => {
    const canvas = canvasRef.current;
    const drawingData = canvas.toDataURL();
    localStorage.setItem("savedDrawing", drawingData);
  }, []);

  const handleSave = useCallback(() => {
    const canvas = canvasRef.current;
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "whiteboard.png";
    link.click();
  }, []);

  const trackFPS = useCallback((timestamp) => {
    const now = window.performance.now();
    let frames = 0;
    const elapsed = now - (timestamp || window.performance.now());
    frames++;
    if (elapsed > 1000) {
      const fps = Math.round((frames / (elapsed / 1000)) * 100) / 100;
      setFps(fps);
      frames = 0;
    }
    requestAnimationFrame(trackFPS);
  }, []);

  const handleKeyDown = useCallback(
    (e) => {
      if ((e.key === "Delete" || e.key === "Backspace") && tool === "select") {
        handleDeleteSelection();
      }
    },
    [tool, handleDeleteSelection]
  );

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
          background: "#fff",
          color: "#000",
          padding: "10px",
          borderRadius: "20px",
          zIndex: 1,
          display: "flex",
          flexDirection: "row",
          gap: "20px",
          boxShadow: "0 0 10px rgba(0,0,0,0.5)",
        }}
      >
        <label>
          Pencil
          <input
            type="radio"
            name="tool"
            value="pencil"
            checked={tool === "pencil"}
            onChange={(e) => setTool(e.target.value)}
          />
        </label>
        <label>
          Eraser
          <input
            type="radio"
            name="tool"
            value="eraser"
            checked={tool === "eraser"}
            onChange={(e) => setTool(e.target.value)}
          />
        </label>
        <label>
          Select
          <input
            type="radio"
            name="tool"
            value="select"
            checked={tool === "select"}
            onChange={(e) => setTool(e.target.value)}
          />
        </label>
        <label>
          Text
          <input
            type="radio"
            name="tool"
            value="text"
            checked={tool === "text"}
            onChange={(e) => setTool(e.target.value)}
          />
        </label>
        <label>
          Size:
          <input
            type="range"
            min="1"
            max="50"
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
          Background:
          <input
            type="color"
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
          />
        </label>
        <label>
          Pattern:
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
            min="1"
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
        <div>FPS: {fps}</div>
      </div>

      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseUp={endDrawing}
        onMouseMove={handleMouseMove}
        onClick={handleClick}
        style={{
          border: "1px solid black",
          width: "100%",
          height: "100vh",
          cursor: tool === "select" ? "crosshair" : "default",
        }}
      />

      {(tool === "pencil" || tool === "eraser") && !drawing && (
        <div
          style={{
            position: "absolute",
            left: cursorSize.x - size,
            top: cursorSize.y - size,
            width: size * 2,
            height: size * 2,
            border: "1px solid rgba(0,0,0,0.5)",
            borderRadius: "50%",
            pointerEvents: "none",
          }}
        ></div>
      )}

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
