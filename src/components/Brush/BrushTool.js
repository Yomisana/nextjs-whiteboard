import React, {
  useImperativeHandle,
  useRef,
  useEffect,
  forwardRef,
  useState,
} from "react";

const BrushTool = forwardRef(
  ({ color, size, opacity, isEraserActive }, ref) => {
    const canvasRef = useRef(null);
    const isDrawing = useRef(false);
    const cursorRef = useRef(null);
    const [dynamicSize, setDynamicSize] = useState(size);
    const resizeTimeoutRef = useRef(null);

    useImperativeHandle(ref, () => ({
      getCanvas: () => canvasRef.current,
    }));

    useEffect(() => {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      let lastMouseMoveTime = 0;
      let lastMouseX = 0;
      let lastMouseY = 0;

      if (!canvas || !context) return;

      const draw = (e) => {
        if (!isDrawing.current) return;
        const rect = canvas.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const offsetY = e.clientY - rect.top;

        context.globalCompositeOperation = isEraserActive
          ? "destination-out"
          : "source-over";
        context.lineWidth = dynamicSize;
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
        cursorRef.current.style.width = `${dynamicSize}px`;
        cursorRef.current.style.height = `${dynamicSize}px`;
        cursorRef.current.style.border = isEraserActive
          ? "1px dashed gray"
          : "1px solid gray";
        cursorRef.current.style.borderRadius = isEraserActive ? "0%" : "50%";
        cursorRef.current.style.backgroundColor = isEraserActive
          ? "transparent"
          : color;
        cursorRef.current.style.opacity = isEraserActive ? "1" : opacity;

        const currentTime = Date.now();
        const deltaX = e.clientX - lastMouseX;
        const deltaY = e.clientY - lastMouseY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        const timeElapsed = currentTime - lastMouseMoveTime;

        if (timeElapsed > 0) {
          const speed = distance / timeElapsed;
          const newSize = isEraserActive ? size + speed * 10 : size;
          setDynamicSize(Math.min(newSize, size * 3));

          if (resizeTimeoutRef.current) {
            clearTimeout(resizeTimeoutRef.current);
          }

          resizeTimeoutRef.current = setTimeout(() => {
            setDynamicSize(size);
          }, 300);
        }

        lastMouseX = e.clientX;
        lastMouseY = e.clientY;
        lastMouseMoveTime = currentTime;
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
    }, [color, size, opacity, isEraserActive, dynamicSize]);

    useEffect(() => {
      setDynamicSize(size);
    }, [size]);

    useEffect(() => {
      console.log(`auto resize canvas`);
      const canvas = canvasRef.current;
      const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };

      resizeCanvas();
      window.addEventListener("resize", resizeCanvas);

      return () => {
        window.removeEventListener("resize", resizeCanvas);
      };
    }, []);

    return (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <canvas
          ref={canvasRef}
          style={{
            border: "1px solid black",
            cursor: "none",
            width: "100%",
            height: "100%",
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
