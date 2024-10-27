"use strict";
"use client";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _BrushTool = _interopRequireDefault(require("./Brush/BrushTool"));
var _ColorPicker = _interopRequireDefault(require("./Color/ColorPicker"));
var _OpacitySlider = _interopRequireDefault(require("./Opacity/OpacitySlider"));
var _Toolbar = _interopRequireDefault(require("./Toolbar/Toolbar"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var Whiteboard = function Whiteboard() {
  var _useState = (0, _react.useState)("#000000"),
    _useState2 = _slicedToArray(_useState, 2),
    color = _useState2[0],
    setColor = _useState2[1];
  var _useState3 = (0, _react.useState)(5),
    _useState4 = _slicedToArray(_useState3, 2),
    brushSize = _useState4[0],
    setBrushSize = _useState4[1];
  var _useState5 = (0, _react.useState)(1),
    _useState6 = _slicedToArray(_useState5, 2),
    opacity = _useState6[0],
    setOpacity = _useState6[1];
  var _useState7 = (0, _react.useState)("#ffffff"),
    _useState8 = _slicedToArray(_useState7, 2),
    background = _useState8[0],
    setBackground = _useState8[1];
  (0, _react.useEffect)(function () {
    // 根據背景色調整筆刷色環的顯示
    if (color === background) {
      setColor(background === "#ffffff" ? "#000000" : "#ffffff");
    }
  }, [background, color]);
  return /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      backgroundColor: background,
      minHeight: "100vh"
    }
  }, /*#__PURE__*/_react["default"].createElement(_BrushTool["default"], {
    color: color,
    size: brushSize,
    opacity: opacity
  }), /*#__PURE__*/_react["default"].createElement(_Toolbar["default"], null, /*#__PURE__*/_react["default"].createElement(_ColorPicker["default"], {
    setColor: setColor
  }), /*#__PURE__*/_react["default"].createElement(_OpacitySlider["default"], {
    setOpacity: setOpacity
  })));
};
var _default = exports["default"] = Whiteboard;