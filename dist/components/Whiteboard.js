"use strict";
"use client";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var Whiteboard = function Whiteboard() {
  var canvasRef = (0, _react.useRef)(null);
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    drawing = _useState2[0],
    setDrawing = _useState2[1];
  var _useState3 = (0, _react.useState)("pencil"),
    _useState4 = _slicedToArray(_useState3, 2),
    tool = _useState4[0],
    setTool = _useState4[1];
  var _useState5 = (0, _react.useState)(5),
    _useState6 = _slicedToArray(_useState5, 2),
    size = _useState6[0],
    setSize = _useState6[1];
  var _useState7 = (0, _react.useState)("#000000"),
    _useState8 = _slicedToArray(_useState7, 2),
    color = _useState8[0],
    setColor = _useState8[1];
  var _useState9 = (0, _react.useState)(""),
    _useState10 = _slicedToArray(_useState9, 2),
    text = _useState10[0],
    setText = _useState10[1];
  var _useState11 = (0, _react.useState)("light"),
    _useState12 = _slicedToArray(_useState11, 2),
    theme = _useState12[0],
    setTheme = _useState12[1];
  var _useState13 = (0, _react.useState)(null),
    _useState14 = _slicedToArray(_useState13, 2),
    selection = _useState14[0],
    setSelection = _useState14[1];
  var _useState15 = (0, _react.useState)(null),
    _useState16 = _slicedToArray(_useState15, 2),
    startPoint = _useState16[0],
    setStartPoint = _useState16[1];
  var _useState17 = (0, _react.useState)("#ffffff"),
    _useState18 = _slicedToArray(_useState17, 2),
    bgColor = _useState18[0],
    setBgColor = _useState18[1];
  var _useState19 = (0, _react.useState)("none"),
    _useState20 = _slicedToArray(_useState19, 2),
    bgPattern = _useState20[0],
    setBgPattern = _useState20[1];
  (0, _react.useEffect)(function () {
    var canvas = canvasRef.current;
    var ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // 設置主題
    var prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
    setTheme(prefersDark.matches ? "dark" : "light");

    // 設置初始畫布狀態
    ctx.strokeStyle = color;
    ctx.lineWidth = size;
    drawBackground(ctx);
    window.addEventListener("resize", handleResize);
    return function () {
      return window.removeEventListener("resize", handleResize);
    };
  }, [color, bgColor, bgPattern]);
  var handleResize = function handleResize() {
    var canvas = canvasRef.current;
    var ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drawBackground(ctx);
  };
  var drawBackground = function drawBackground(ctx) {
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    if (bgPattern === "dot") {
      for (var x = 0; x < ctx.canvas.width; x += 10) {
        for (var y = 0; y < ctx.canvas.height; y += 10) {
          ctx.fillStyle = "#ccc";
          ctx.fillRect(x, y, 1, 1);
        }
      }
    } else if (bgPattern === "line") {
      ctx.strokeStyle = "#ccc";
      ctx.beginPath();
      for (var _y = 0; _y < ctx.canvas.height; _y += 10) {
        ctx.moveTo(0, _y);
        ctx.lineTo(ctx.canvas.width, _y);
      }
      ctx.stroke();
    } else if (bgPattern === "grid") {
      ctx.strokeStyle = "#ccc";
      for (var _x = 0; _x < ctx.canvas.width; _x += 10) {
        ctx.beginPath();
        ctx.moveTo(_x, 0);
        ctx.lineTo(_x, ctx.canvas.height);
        ctx.stroke();
      }
      for (var _y2 = 0; _y2 < ctx.canvas.height; _y2 += 10) {
        ctx.beginPath();
        ctx.moveTo(0, _y2);
        ctx.lineTo(ctx.canvas.width, _y2);
        ctx.stroke();
      }
    }
  };
  var startDrawing = function startDrawing(e) {
    if (tool === "select") {
      setStartPoint({
        x: e.clientX,
        y: e.clientY
      });
      setSelection({
        x: e.clientX,
        y: e.clientY,
        width: 0,
        height: 0
      });
    } else {
      setDrawing(true);
      var ctx = canvasRef.current.getContext("2d");
      ctx.beginPath();
      ctx.moveTo(e.clientX, e.clientY);
    }
  };
  var endDrawing = function endDrawing() {
    setDrawing(false);
    setStartPoint(null);
  };
  var draw = function draw(e) {
    if (!drawing || tool === "text" || tool === "select") return;
    var ctx = canvasRef.current.getContext("2d");
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
  var handleMouseMove = function handleMouseMove(e) {
    if (drawing) {
      draw(e);
    } else if (startPoint && tool === "select") {
      var newWidth = e.clientX - startPoint.x;
      var newHeight = e.clientY - startPoint.y;
      setSelection({
        x: newWidth < 0 ? e.clientX : startPoint.x,
        y: newHeight < 0 ? e.clientY : startPoint.y,
        width: Math.abs(newWidth),
        height: Math.abs(newHeight)
      });
    }
  };
  var handleDeleteSelection = function handleDeleteSelection() {
    if (!selection) return;
    var canvas = canvasRef.current;
    var ctx = canvas.getContext("2d");
    ctx.clearRect(selection.x, selection.y, selection.width, selection.height);
    setSelection(null);
  };
  var handleTextAdd = function handleTextAdd(e) {
    if (tool === "text" && text) {
      var canvas = canvasRef.current;
      var ctx = canvas.getContext("2d");
      ctx.font = "".concat(size * 2, "px Arial");
      ctx.fillStyle = color;
      ctx.fillText(text, e.clientX, e.clientY);
      setText("");
    }
  };
  var handleSave = function handleSave() {
    var canvas = canvasRef.current;
    var link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "whiteboard.png";
    link.click();
  };
  var handleKeyDown = function handleKeyDown(e) {
    if (e.key === "Delete" || e.key === "Backspace") {
      handleDeleteSelection();
    }
  };
  return /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      position: "relative"
    },
    onMouseMove: handleMouseMove,
    onKeyDown: handleKeyDown,
    tabIndex: 0
  }, /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      position: "absolute",
      top: 10,
      left: 10,
      background: theme === "dark" ? "#333" : "#fff",
      color: theme === "dark" ? "#fff" : "#000",
      padding: "10px",
      borderRadius: "8px",
      zIndex: 1,
      display: "flex",
      flexDirection: "column",
      gap: "10px"
    }
  }, /*#__PURE__*/_react["default"].createElement("label", null, "Tool:", /*#__PURE__*/_react["default"].createElement("select", {
    value: tool,
    onChange: function onChange(e) {
      return setTool(e.target.value);
    }
  }, /*#__PURE__*/_react["default"].createElement("option", {
    value: "pencil"
  }, "Pencil"), /*#__PURE__*/_react["default"].createElement("option", {
    value: "eraser"
  }, "Eraser"), /*#__PURE__*/_react["default"].createElement("option", {
    value: "select"
  }, "Select"), /*#__PURE__*/_react["default"].createElement("option", {
    value: "text"
  }, "Text"))), /*#__PURE__*/_react["default"].createElement("label", null, "Size:", /*#__PURE__*/_react["default"].createElement("input", {
    type: "range",
    min: "1",
    max: "20",
    value: size,
    onChange: function onChange(e) {
      return setSize(Number(e.target.value));
    }
  })), /*#__PURE__*/_react["default"].createElement("label", null, "Color:", /*#__PURE__*/_react["default"].createElement("input", {
    type: "color",
    value: color,
    onChange: function onChange(e) {
      return setColor(e.target.value);
    }
  })), /*#__PURE__*/_react["default"].createElement("label", null, "Background Color:", /*#__PURE__*/_react["default"].createElement("input", {
    type: "color",
    value: bgColor,
    onChange: function onChange(e) {
      return setBgColor(e.target.value);
    }
  })), /*#__PURE__*/_react["default"].createElement("label", null, "Background Pattern:", /*#__PURE__*/_react["default"].createElement("select", {
    value: bgPattern,
    onChange: function onChange(e) {
      return setBgPattern(e.target.value);
    }
  }, /*#__PURE__*/_react["default"].createElement("option", {
    value: "none"
  }, "None"), /*#__PURE__*/_react["default"].createElement("option", {
    value: "dot"
  }, "Dot"), /*#__PURE__*/_react["default"].createElement("option", {
    value: "line"
  }, "Line"), /*#__PURE__*/_react["default"].createElement("option", {
    value: "grid"
  }, "Grid"))), tool === "text" && /*#__PURE__*/_react["default"].createElement("input", {
    type: "text",
    placeholder: "Enter text",
    value: text,
    onChange: function onChange(e) {
      return setText(e.target.value);
    }
  }), /*#__PURE__*/_react["default"].createElement("button", {
    onClick: handleSave
  }, "Save")), /*#__PURE__*/_react["default"].createElement("canvas", {
    ref: canvasRef,
    onMouseDown: startDrawing,
    onMouseUp: endDrawing,
    onClick: tool === "text" ? handleTextAdd : null,
    style: {
      border: "1px solid black",
      width: "100%",
      height: "100vh",
      cursor: tool === "select" ? "crosshair" : "default"
    }
  }), selection && /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      position: "absolute",
      left: selection.x,
      top: selection.y,
      width: selection.width,
      height: selection.height,
      border: "2px dashed red",
      pointerEvents: "none"
    }
  }));
};
var _default = exports["default"] = Whiteboard;