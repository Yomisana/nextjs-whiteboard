"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var Toolbar = function Toolbar(_ref) {
  var children = _ref.children;
  return /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      position: "fixed",
      bottom: "20px",
      left: "50%",
      transform: "translateX(-50%)",
      display: "flex",
      padding: "10px",
      background: "rgba(255, 255, 255, 0.9)",
      borderRadius: "8px",
      boxShadow: "0 0 10px rgba(0,0,0,0.2)"
    }
  }, children);
};
var _default = exports["default"] = Toolbar;