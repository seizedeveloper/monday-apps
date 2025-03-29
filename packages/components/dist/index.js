"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
Object.defineProperty(exports, "Header", {
  enumerable: true,
  get: function () {
    return _Header.default;
  },
});
var _react = _interopRequireDefault(require("react"));
var _client = _interopRequireDefault(require("react-dom/client"));
require("./index.css");
var _Header = _interopRequireDefault(require("./Header"));
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : { default: e };
}
const root = _client.default.createRoot(document.getElementById("root"));
root.render(
  /*#__PURE__*/ _react.default.createElement(
    _react.default.StrictMode,
    null,
    /*#__PURE__*/ _react.default.createElement(_Header.default, null)
  )
);
// export {default as Header} from './Header'
