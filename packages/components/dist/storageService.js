"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setCookieConsent = exports.resetCookiesOnUninstall = exports.checkCookieConsent = void 0;
var _mondaySdkJs = _interopRequireDefault(require("monday-sdk-js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const monday = (0, _mondaySdkJs.default)();
monday.setApiVersion("2023-10");
const COOKIE_KEY = "cookieConsent";

// Check if running inside monday.com
const isMondayEnv = () => window.location !== window.parent.location;
const checkCookieConsent = async () => {
  try {
    if (isMondayEnv()) {
      var _res$data;
      const res = await monday.storage.getItem(COOKIE_KEY);
      return (res === null || res === void 0 || (_res$data = res.data) === null || _res$data === void 0 ? void 0 : _res$data.value) === "true";
    } else {
      return localStorage.getItem(COOKIE_KEY) === "true";
    }
  } catch (error) {
    console.error("Error fetching cookie consent:", error);
    return false;
  }
};
exports.checkCookieConsent = checkCookieConsent;
const setCookieConsent = async () => {
  try {
    if (isMondayEnv()) {
      await monday.storage.setItem(COOKIE_KEY, "true");
    } else {
      localStorage.setItem(COOKIE_KEY, "true");
    }
  } catch (error) {
    console.error("Error setting cookie consent:", error);
  }
};
exports.setCookieConsent = setCookieConsent;
const resetCookiesOnUninstall = () => {
  try {
    monday.listen("context", async res => {
      var _res$data2;
      if (!(res !== null && res !== void 0 && (_res$data2 = res.data) !== null && _res$data2 !== void 0 && _res$data2.instanceId)) {
        console.log("App uninstalled. Resetting cookies...");
        await monday.storage.deleteItem(COOKIE_KEY);
      }
    });

    // Local testing: Clear localStorage when user manually clears storage
    if (!isMondayEnv()) {
      window.addEventListener("beforeunload", () => {
        localStorage.removeItem(COOKIE_KEY);
      });
    }
  } catch (error) {
    console.error("Error resetting cookies on uninstall:", error);
  }
};
exports.resetCookiesOnUninstall = resetCookiesOnUninstall;