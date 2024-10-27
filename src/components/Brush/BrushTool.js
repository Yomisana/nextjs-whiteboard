import React, {
  useImperativeHandle,
  useRef,
  useEffect,
  forwardRef,
} from "react";

const BrushTool = forwardRef(
  ({ color, size, opacity, isEraserActive }, ref) => {
    const canvasRef = useRef(null);
    const isDrawing = useRef(false);
    const cursorRef = useRef(null);

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

        context.globalCompositeOperation = isEraserActive
          ? "destination-out"
          : "source-over";
        context.lineWidth = size;
        context.lineCap = "round";
        context.strokeStyle = isEraserActive ? "rgba(0,0,0,1)" : color;
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

      const updateCursor = (e) => {
        const rect = canvas.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const offsetY = e.clientY - rect.top;
        cursorRef.current.style.left = `${offsetX}px`;
        cursorRef.current.style.top = `${offsetY}px`;
        cursorRef.current.style.width = `${size}px`;
        cursorRef.current.style.height = `${size}px`;
      };

      canvas.addEventListener("mousedown", startDrawing);
      canvas.addEventListener("mousemove", draw);
      canvas.addEventListener("mousemove", updateCursor);
      canvas.addEventListener("mouseup", stopDrawing);
      canvas.addEventListener("mouseout", stopDrawing);

      return () => {
        canvas.removeEventListener("mousedown", startDrawing);
        canvas.removeEventListener("mousemove", draw);
        canvas.removeEventListener("mousemove", updateCursor);
        canvas.removeEventListener("mouseup", stopDrawing);
        canvas.removeEventListener("mouseout", stopDrawing);
      };
    }, [color, size, opacity, isEraserActive]);

    return (
      <div style={{ position: "relative" }}>
        <canvas
          ref={canvasRef}
          width={800}
          height={600}
          style={{
            border: "1px solid black",
          }}
        />
        <div
          ref={cursorRef}
          style={{
            position: "absolute",
            border: "1px solid black",
            borderRadius: "50%",
            pointerEvents: "none",
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>
    );
  }
);

export default BrushTool;
