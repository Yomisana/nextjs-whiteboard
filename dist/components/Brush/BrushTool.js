"use strict";

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
var BrushTool = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var color = _ref.color,
    size = _ref.size,
    opacity = _ref.opacity,
    isEraserActive = _ref.isEraserActive;
  var canvasRef = (0, _react.useRef)(null);
  var isDrawing = (0, _react.useRef)(false);
  var cursorRef = (0, _react.useRef)(null);
  var _useState = (0, _react.useState)(size),
    _useState2 = _slicedToArray(_useState, 2),
    dynamicSize = _useState2[0],
    setDynamicSize = _useState2[1];
  var resizeTimeoutRef = (0, _react.useRef)(null);
  (0, _react.useImperativeHandle)(ref, function () {
    return {
      getCanvas: function getCanvas() {
        return canvasRef.current;
      }
    };
  });
  (0, _react.useEffect)(function () {
    var canvas = canvasRef.current;
    var context = canvas.getContext("2d");
    var lastMouseMoveTime = 0;
    var lastMouseX = 0;
    var lastMouseY = 0;
    if (!canvas || !context) return;
    var draw = function draw(e) {
      if (!isDrawing.current) return;
      var rect = canvas.getBoundingClientRect();
      var offsetX = e.clientX - rect.left;
      var offsetY = e.clientY - rect.top;
      context.globalCompositeOperation = isEraserActive ? "destination-out" : "source-over";
      context.lineWidth = dynamicSize;
      context.lineCap = "round";
      context.strokeStyle = isEraserActive ? "rgba(0,0,0,1)" : color;
      context.globalAlpha = opacity;
      context.lineTo(offsetX, offsetY);
      context.stroke();
      context.beginPath();
      context.moveTo(offsetX, offsetY);
    };
    var startDrawing = function startDrawing(e) {
      isDrawing.current = true;
      var rect = canvas.getBoundingClientRect();
      var offsetX = e.clientX - rect.left;
      var offsetY = e.clientY - rect.top;
      context.beginPath();
      context.moveTo(offsetX, offsetY);
    };
    var stopDrawing = function stopDrawing() {
      isDrawing.current = false;
      context.beginPath();
    };
    var updateCursor = function updateCursor(e) {
      var rect = canvas.getBoundingClientRect();
      var offsetX = e.clientX - rect.left;
      var offsetY = e.clientY - rect.top;
      cursorRef.current.style.left = "".concat(offsetX, "px");
      cursorRef.current.style.top = "".concat(offsetY, "px");
      cursorRef.current.style.width = "".concat(dynamicSize, "px");
      cursorRef.current.style.height = "".concat(dynamicSize, "px");
      cursorRef.current.style.border = isEraserActive ? "1px dashed gray" : "1px solid gray";
      cursorRef.current.style.borderRadius = isEraserActive ? "0%" : "50%";
      cursorRef.current.style.backgroundColor = isEraserActive ? "transparent" : color;
      cursorRef.current.style.opacity = isEraserActive ? "1" : opacity;

      // 計算滑鼠移動速度
      var currentTime = Date.now();
      var deltaX = e.clientX - lastMouseX;
      var deltaY = e.clientY - lastMouseY;
      var distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      var timeElapsed = currentTime - lastMouseMoveTime;
      if (timeElapsed > 0) {
        var speed = distance / timeElapsed;
        var newSize = isEraserActive ? size + speed * 10 : size;
        setDynamicSize(Math.min(newSize, size * 3)); // 最大放大到原來大小的3倍

        // 清除之前的縮小延遲
        if (resizeTimeoutRef.current) {
          clearTimeout(resizeTimeoutRef.current);
        }

        // 設置新的縮小延遲
        resizeTimeoutRef.current = setTimeout(function () {
          setDynamicSize(size);
        }, 300); // 300 毫秒後縮小到原來的大小
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
    return function () {
      canvas.removeEventListener("mousedown", startDrawing);
      canvas.removeEventListener("mousemove", draw);
      canvas.removeEventListener("mousemove", updateCursor);
      canvas.removeEventListener("mouseup", stopDrawing);
      canvas.removeEventListener("mouseout", stopDrawing);
    };
  }, [color, size, opacity, isEraserActive, dynamicSize]);
  (0, _react.useEffect)(function () {
    setDynamicSize(size);
  }, [size]);
  return /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/_react["default"].createElement("canvas", {
    ref: canvasRef,
    width: 800,
    height: 600,
    style: {
      border: "1px solid black",
      cursor: "none" // 隱藏系統的滑鼠指標
    }
  }), /*#__PURE__*/_react["default"].createElement("div", {
    ref: cursorRef,
    style: {
      position: "absolute",
      border: "1px solid black",
      borderRadius: "50%",
      pointerEvents: "none",
      transform: "translate(-50%, -50%)"
    }
  }));
});
var _default = exports["default"] = BrushTool;