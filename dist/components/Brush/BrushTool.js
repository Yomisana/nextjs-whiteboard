"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var BrushTool = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var color = _ref.color,
    size = _ref.size,
    opacity = _ref.opacity;
  var canvasRef = (0, _react.useRef)(null);
  var isDrawing = (0, _react.useRef)(false);
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
    if (!canvas || !context) return;
    var draw = function draw(e) {
      if (!isDrawing.current) return;
      var rect = canvas.getBoundingClientRect();
      var offsetX = e.clientX - rect.left;
      var offsetY = e.clientY - rect.top;
      context.globalCompositeOperation = color === "rgba(0,0,0,0)" ? "destination-out" : "source-over";
      context.lineWidth = size;
      context.lineCap = "round";
      context.strokeStyle = color;
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
    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mouseout", stopDrawing);
    return function () {
      canvas.removeEventListener("mousedown", startDrawing);
      canvas.removeEventListener("mousemove", draw);
      canvas.removeEventListener("mouseup", stopDrawing);
      canvas.removeEventListener("mouseout", stopDrawing);
    };
  }, [color, size, opacity]);
  return /*#__PURE__*/_react["default"].createElement("canvas", {
    ref: canvasRef,
    width: 800,
    height: 600,
    style: {
      border: "1px solid black"
    }
  });
});
var _default = exports["default"] = BrushTool;