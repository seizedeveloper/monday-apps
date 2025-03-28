"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const CookieConsent = () => {
  const [showPopup, setShowPopup] = (0, _react.useState)(false);
  (0, _react.useEffect)(() => {
    // Debugging logs
    console.log("Checking stored cookie consent...");
    const storedConsent = localStorage.getItem("cookieConsent");
    console.log("Stored Cookie Consent:", storedConsent);
    if (storedConsent === "true") {
      setShowPopup(false);
    } else {
      setShowPopup(true);
    }
  }, []);
  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "true");
    setShowPopup(false);
  };
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, showPopup && /*#__PURE__*/_react.default.createElement("div", {
    className: "cookie-popup"
  }, /*#__PURE__*/_react.default.createElement("p", null, "We use cookies to improve your experience."), /*#__PURE__*/_react.default.createElement("button", {
    onClick: acceptCookies
  }, "Accept")));
};
var _default = exports.default = CookieConsent;