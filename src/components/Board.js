import React, { useEffect, forwardRef } from "react";

import { dev } from "./Utils";

const Board = forwardRef((props, ref) => {
  useEffect(() => {
    const canvas = ref.current;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resizeCanvas, false);
    resizeCanvas();

    return () => {
      window.removeEventListener("resize", resizeCanvas, false);
    };
  }, [ref]);

  return (
    <canvas
      id="board"
      ref={ref}
      style={{
        display: "block",
        border: dev ? "1px solid red" : "none",
        cursor: "none",
        height: "100vh", // 使用 100vh 來確保高度佔滿整個視窗高度
      }}
    />
  );
});

export default Board;
