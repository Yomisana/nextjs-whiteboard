"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var ColorPicker = function ColorPicker(_ref) {
  var setColor = _ref.setColor;
  return /*#__PURE__*/_react["default"].createElement("input", {
    type: "color",
    onChange: function onChange(e) {
      return setColor(e.target.value);
    }
  });
};
var _default = exports["default"] = ColorPicker;