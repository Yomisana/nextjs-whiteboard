import React, { useRef, useEffect, useState } from "react";

const BrushTool = ({ color, size, opacity }) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if (!canvas || !context) return;

    const draw = (e) => {
      if (!isDrawing) return;
      const rect = canvas.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const offsetY = e.clientY - rect.top;

      context.lineWidth = size;
      context.lineCap = "round";
      context.strokeStyle = color;
      context.globalAlpha = opacity;
      context.lineTo(offsetX, offsetY);
      context.stroke();
      context.beginPath();
      context.moveTo(offsetX, offsetY);
    };

    const startDrawing = (e) => {
      setIsDrawing(true);
      const rect = canvas.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const offsetY = e.clientY - rect.top;
      context.beginPath();
      context.moveTo(offsetX, offsetY);
    };

    const stopDrawing = () => {
      setIsDrawing(false);
      context.closePath();
    };

    // 使用帶有事件對象的事件處理器
    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mouseleave", stopDrawing);

    return () => {
      canvas.removeEventListener("mousedown", startDrawing);
      canvas.removeEventListener("mousemove", draw);
      canvas.removeEventListener("mouseup", stopDrawing);
      canvas.removeEventListener("mouseleave", stopDrawing);
    };
  }, [color, size, opacity, isDrawing]);

  return (
    <canvas
      ref={canvasRef}
      style={{ border: "1px solid black" }}
      width={800}
      height={600}
    />
  );
};

export default BrushTool;
