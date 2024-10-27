import React, {
  useImperativeHandle,
  useRef,
  useEffect,
  forwardRef,
} from "react";

const BrushTool = forwardRef(({ color, size, opacity }, ref) => {
  const canvasRef = useRef(null);
  const isDrawing = useRef(false);

  useImperativeHandle(ref, () => ({
    getCanvas: () => canvasRef.current,
  }));

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if (!canvas || !context) return;

    const draw = (e) => {
      if (!isDrawing.current) return;
      const rect = canvas.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const offsetY = e.clientY - rect.top;

      context.globalCompositeOperation =
        color === "rgba(0,0,0,0)" ? "destination-out" : "source-over";
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
      isDrawing.current = true;
      const rect = canvas.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const offsetY = e.clientY - rect.top;
      context.beginPath();
      context.moveTo(offsetX, offsetY);
    };

    const stopDrawing = () => {
      isDrawing.current = false;
      context.beginPath();
    };

    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mouseout", stopDrawing);

    return () => {
      canvas.removeEventListener("mousedown", startDrawing);
      canvas.removeEventListener("mousemove", draw);
      canvas.removeEventListener("mouseup", stopDrawing);
      canvas.removeEventListener("mouseout", stopDrawing);
    };
  }, [color, size, opacity]);

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={600}
      style={{ border: "1px solid black" }}
    />
  );
});

export default BrushTool;
