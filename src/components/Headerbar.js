import React, { useState, useEffect } from "react";

import { saveBoard } from "./Utils";

export default function Headerbar({ canvasRef }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const fileButtonMapping = {
    create: {
      text: "創建",
      comment: "cause Ctrl + N & Ctrl + Shift + N is already used by browser",
      hotkey: "Ctrl + Alt + Shift + N",
      handler: () => {
        // 處理創建
        console.log("創建");
      },
    },
    save: {
      text: "儲存",
      hotkey: "Ctrl + S",
      handler: () => {
        // 處理保存文件
        console.log("save board as image :D");
        saveBoard(canvasRef.current);
      },
    },
    read: {
      text: "讀取",
      hotkey: "Ctrl + O",
      handler: () => {
        // 處理讀取文件
        console.log("讀取");
      },
    },
    clear: {
      text: "清除",
      comment:
        "I can't believe someone could be bored, or accidentally hit Ctrl + Alt + Shift + D four simultaneous keystrokes when they didn't want to, resulting in clearing the entire panel, and if you do... have a grudge against me.. .you are a fool(Can use Ctrl + Z to undo but...you close the tab...that...ok...)",
      hotkey: "Ctrl + Alt + Shift + D",
      handler: () => {
        // 處理清除
        console.log("清除");
      },
    },
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      const { ctrlKey, altKey, shiftKey, key } = event;
      const hotkey = `${ctrlKey ? "Ctrl + " : ""}${altKey ? "Alt + " : ""}${
        shiftKey ? "Shift + " : ""
      }${key.toUpperCase()}`;

      Object.values(fileButtonMapping).forEach((button) => {
        if (button.hotkey === hotkey) {
          event.preventDefault();
          button.handler();
        }
      });
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        // gap: "10px",
        padding: "10px",
        // make sure the headerbar is on top of everything
        position: "fixed", // 固定在視窗頂部
        top: 0,
        left: 0,
        width: "100%",
        backgroundColor: "white", // 背景色，避免內容重疊時看不清
        zIndex: 1000, // 確保在所有元件上面
      }}
    >
      <div
        id="headerbar"
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: "10px",
          // padding: "10px",
        }}
      >
        {/* menu button */}
        <button id="file_button" onClick={toggleMenu}>
          ☰
        </button>

        {menuOpen && (
          <div
            // style={}
            // flex , column , gap
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              padding: "10px",
              position: "absolute",
              top: "32px",
              left: "25px",
              backgroundColor: "white",
              zIndex: 1000,
            }}
          >
            {Object.values(fileButtonMapping).map((e, index) => (
              <button key={index} onClick={e.handler}>
                {e.text}
              </button>
            ))}
          </div>
        )}

        {/* 文件名輸入框 */}
        <input
          type="text"
          placeholder="未命名的白板"
          value={"未命名的白板"}
          id="filename"
        />

        {/* 狀態文本 */}
        <div id="file_status" style={{ color: "black" }}>
          status :D
        </div>
      </div>
      <div style={{ color: "black" }}>
        spilt here, here will be settings place
      </div>
    </div>
  );
}
