"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var OpacitySlider = function OpacitySlider(_ref) {
  var setOpacity = _ref.setOpacity;
  return /*#__PURE__*/_react["default"].createElement("input", {
    type: "range",
    min: "0",
    max: "1",
    step: "0.1",
    onChange: function onChange(e) {
      return setOpacity(parseFloat(e.target.value));
    }
  });
};
var _default = exports["default"] = OpacitySlider;