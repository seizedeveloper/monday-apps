"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
require("./Header.css");
var _CookieConsent = _interopRequireDefault(require("./CookieConsent"));
var _storageService = require("./storageService");
var _mondaySdkJs = _interopRequireDefault(require("monday-sdk-js"));
var _dompurify = _interopRequireDefault(require("dompurify"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const monday = (0, _mondaySdkJs.default)();
monday.setApiVersion("2023-10");
const Header = _ref => {
  var _defaultUrl$match;
  let {
    fontCol,
    bgCol,
    defaulturl,
    matchingSequence,
    ifEditing,
    logo,
    appName,
    dashUrl,
    docLink,
    decodePart1,
    decodePart2,
    cookiepolicy
  } = _ref;
  const matchingSequence2 = /(?:loom\.com\/share\/|loom\.com\/embed\/)([a-zA-Z0-9]+)/;
  const defaultUrl = defaulturl;
  const id = defaultUrl === null || defaultUrl === void 0 || (_defaultUrl$match = defaultUrl.match(matchingSequence2)) === null || _defaultUrl$match === void 0 ? void 0 : _defaultUrl$match[1];
  const defUrl = defaulturl;
  const DEFAULT_WIDTH = 600;
  const DEFAULT_HEIGHT = 400;
  const [url, setUrl] = (0, _react.useState)('');
  const [width, setWidth] = (0, _react.useState)(DEFAULT_WIDTH);
  const [height, setHeight] = (0, _react.useState)(DEFAULT_HEIGHT);
  const [embedUrl, setEmbedUrl] = (0, _react.useState)(defUrl);
  const [showWarning, setShowWarning] = (0, _react.useState)(false);
  const [submitted, setSubmitted] = (0, _react.useState)(false);
  const [show, setShow] = (0, _react.useState)(false);
  const [showEdit, setShowEdit] = (0, _react.useState)(false);
  const [isEditing, setIsEditing] = (0, _react.useState)(false);
  const [isValidUrl, setIsValidUrl] = (0, _react.useState)(false);
  const iframeRef = (0, _react.useRef)(null);
  const timeoutRef = (0, _react.useRef)(null);
  const [storedurl, setStoredUrl] = (0, _react.useState)(defUrl);
  const [storedheight, setStoredHeight] = (0, _react.useState)("");
  const [storedwidth, setStoredWidth] = (0, _react.useState)("");
  const [storedshow, setStoredShow] = (0, _react.useState)("");
  const [storedsubmitted, setStoredSubmitted] = (0, _react.useState)("");
  const [storedshowEdit, setStoredShowEdit] = (0, _react.useState)("");
  const [storedisEditing, setStoredisEditing] = (0, _react.useState)(false);
  const [warningMessage, setWarningMessage] = (0, _react.useState)("");
  const [loading, setLoading] = (0, _react.useState)(true);
  // const [cookieConsent, setCookieConsent] = useState(null); // Initially null to indicate not yet checked
  // const [showPopup, setShowPopup] = useState(false);

  (0, _react.useEffect)(() => {
    (0, _storageService.resetCookiesOnUninstall)();
  }, []);

  // useEffect(() => {
  //   async function init() {
  //     await checkAppInstallation();  // Ensure the app installation is checked first
  //     const hasConsent = await checkCookieConsent();
  //     setShowPopup(!hasConsent);  // Show popup if consent is not given
  //   }

  //   init();
  // }, []);

  // const handleAccept = async () => {
  //   await setCookieConsent();
  //   setShowPopup(false);
  // };

  var iscanva = false;
  if (dashUrl == 'Canva') {
    var iscanva = true;
  }
  (0, _react.useEffect)(() => {
    setShowWarning(false);
  }, [embedUrl]);
  (0, _react.useEffect)(() => {
    monday.storage.instance.getItem('url').then(res => {
      var _res$data, _value;
      let value = (_res$data = res.data) === null || _res$data === void 0 ? void 0 : _res$data.value;
      console.log(value);
      value = _dompurify.default.sanitize((_value = value) !== null && _value !== void 0 ? _value : ''); // Sanitize user input
      setStoredUrl(value);
    });
    monday.storage.instance.getItem('height').then(res => {
      var _res$data2, _value2;
      let value = (_res$data2 = res.data) === null || _res$data2 === void 0 ? void 0 : _res$data2.value;
      value = _dompurify.default.sanitize((_value2 = value) !== null && _value2 !== void 0 ? _value2 : ''); // Sanitize input
      value = parseInt(value, 10);
      setStoredHeight(isNaN(value) ? 400 : value); // Ensure valid number
    });
    monday.storage.instance.getItem('width').then(res => {
      var _res$data3, _value3;
      let value = (_res$data3 = res.data) === null || _res$data3 === void 0 ? void 0 : _res$data3.value;
      value = _dompurify.default.sanitize((_value3 = value) !== null && _value3 !== void 0 ? _value3 : ''); // Sanitize input
      value = parseInt(value, 10);
      setStoredWidth(isNaN(value) ? 600 : value);
    });
    monday.storage.instance.getItem('show').then(res => {
      var _res$data4;
      let value = (_res$data4 = res.data) === null || _res$data4 === void 0 ? void 0 : _res$data4.value;
      console.log(value);
      setStoredShow(value !== null && value !== void 0 ? value : false);
    });
    monday.storage.instance.getItem('submitted').then(res => {
      var _res$data5;
      let value = (_res$data5 = res.data) === null || _res$data5 === void 0 ? void 0 : _res$data5.value;
      console.log(value);
      setStoredSubmitted(value !== null && value !== void 0 ? value : false);
    });
    monday.storage.instance.getItem('showEdit').then(res => {
      var _res$data6;
      let value = (_res$data6 = res.data) === null || _res$data6 === void 0 ? void 0 : _res$data6.value;
      console.log(value);
      setStoredShowEdit(value !== null && value !== void 0 ? value : false);
    });
    if (ifEditing) {
      monday.storage.instance.getItem('isEditing').then(res => {
        var _res$data7;
        let value = (_res$data7 = res.data) === null || _res$data7 === void 0 ? void 0 : _res$data7.value;
        console.log(value);
        setStoredisEditing(value !== null && value !== void 0 ? value : false);
      });
    }
    monday.execute('valueCreatedForUser'); // Value-created event when loading saved state
  }, []);
  (0, _react.useEffect)(() => {
    if (storedurl) {
      setUrl(storedurl);
      const loomIdMatch = storedurl === null || storedurl === void 0 ? void 0 : storedurl.match(matchingSequence);
      if (loomIdMatch && (loomIdMatch[1] || loomIdMatch[2])) {
        if (iscanva && loomIdMatch[2] && loomIdMatch[1]) {
          const embedId = loomIdMatch[2];
          setEmbedUrl("https://www.canva.com/design/".concat(loomIdMatch[1], "/").concat(embedId, "/view?embed"));
        } else {
          const id = loomIdMatch[1] || loomIdMatch[2];
          setEmbedUrl("".concat(decodePart1).concat(id).concat(decodePart2 !== null && decodePart2 !== void 0 ? decodePart2 : ''));
        }
        setShowWarning(false);
      } else {
        // setShowWarning(true);
        setEmbedUrl(defUrl);
      }
      monday.execute('valueCreatedForUser'); // Value-created event when URL is successfully set
    } else {
      setUrl(defaultUrl);
      const loomIdMatch = defaultUrl === null || defaultUrl === void 0 ? void 0 : defaultUrl.match(matchingSequence2);
      if (loomIdMatch && (loomIdMatch[1] || loomIdMatch[2])) {
        setEmbedUrl("https://www.loom.com/embed/".concat(loomIdMatch[1], "?autoplay=false"));
        setShowWarning(false);
      } else {
        setShowWarning(true);
        setEmbedUrl(defUrl);
      }
    }
  }, [storedurl]);
  (0, _react.useEffect)(() => {
    if (storedheight) {
      setHeight(parseInt(storedheight, 10));
    }
  }, [storedheight]);
  (0, _react.useEffect)(() => {
    if (storedwidth) {
      setWidth(parseInt(storedwidth, 10));
    }
  }, [storedwidth]);
  (0, _react.useEffect)(() => {
    if (storedshow) {
      setShow(storedshow);
    }
  }, [storedshow]);
  (0, _react.useEffect)(() => {
    if (storedsubmitted) {
      setSubmitted(storedsubmitted);
      monday.execute('valueCreatedForUser'); // Value-created event when content is submitted
    }
  }, [storedsubmitted]);
  (0, _react.useEffect)(() => {
    if (storedshowEdit) {
      setShowEdit(storedshowEdit);
      monday.execute('valueCreatedForUser'); // Value-created event when edit mode is accessed
    }
  }, [storedshowEdit]);
  (0, _react.useEffect)(() => {
    if (storedisEditing) {
      setIsEditing(storedisEditing);
      if (storedisEditing) {
        const loomIdMatch = url === null || url === void 0 ? void 0 : url.match(matchingSequence);
        if (loomIdMatch && (loomIdMatch[1] || loomIdMatch[2])) {
          if (iscanva && loomIdMatch[2]) {
            const embedId = loomIdMatch[2];
            setEmbedUrl("https://www.canva.com/design/".concat(loomIdMatch[1], "/").concat(embedId, "/view?embed"));
          } else {
            const id = loomIdMatch[1] || loomIdMatch[2];
            setEmbedUrl("".concat(decodePart1).concat(id, "/edit")) || setEmbedUrl("https://www.loom.com/embed/".concat(id, "?autoplay=false"));
          }
        }
      }
    }
  }, [storedisEditing]);
  const resetTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      if (!showWarning && url) {
        setShow(false);
        monday.storage.instance.setItem("show", show);
        setSubmitted(true);
        monday.storage.instance.setItem("submitted", submitted);
      }
    }, 10000); // 10 second
  };
  const styles = document.createElement("style");
  styles.innerHTML = "\n  @keyframes spin {\n    0% { transform: rotate(0deg); }\n    100% { transform: rotate(360deg); }\n  }\n";
  document.head.appendChild(styles);
  (0, _react.useEffect)(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer); // Cleanup in case component unmounts
  }, [embedUrl]);
  (0, _react.useEffect)(() => {
    resetTimeout();
    const handleActivity = () => {
      resetTimeout();
    };

    // Listen for keypresses and mouse movements to detect activity
    window.addEventListener('keydown', handleActivity);
    window.addEventListener('mousemove', handleActivity);
    return () => {
      // Clean up event listeners on unmount
      window.removeEventListener('keydown', handleActivity);
      window.removeEventListener('mousemove', handleActivity);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [show, submitted, showWarning]);
  const handleUrlChange = event => {
    const inputUrl = _dompurify.default.sanitize(event.target.value);
    setUrl(inputUrl);
    monday.storage.instance.setItem("url", inputUrl);
    // localStorage.setItem('url', inputUrl) ;
    // setUrlSetting(false) ; 
    const loomIdMatch = inputUrl === null || inputUrl === void 0 ? void 0 : inputUrl.match(matchingSequence);
    if (loomIdMatch && (loomIdMatch[1] || loomIdMatch[2])) {
      if (iscanva && loomIdMatch[2] && loomIdMatch[1]) {
        const embedId = loomIdMatch[2];
        setEmbedUrl("https://www.canva.com/design/".concat(loomIdMatch[1], "/").concat(embedId, "/view?embed"));
      } else {
        const id = loomIdMatch[1] || loomIdMatch[2];
        setEmbedUrl("".concat(decodePart1).concat(id).concat(decodePart2 !== null && decodePart2 !== void 0 ? decodePart2 : ''));
      }
      // setShow(false);
      setShowWarning(false);
      setIsEditing(false);
      setIsValidUrl(true);
    } else {
      const loomIdMatch = defaultUrl === null || defaultUrl === void 0 ? void 0 : defaultUrl.match(matchingSequence2);
      if (loomIdMatch && (loomIdMatch[1] || loomIdMatch[2])) {
        setEmbedUrl("https://www.loom.com/embed/".concat(loomIdMatch[1], "?autoplay=false"));
        setShowWarning(false);
      } else {
        setWarningMessage("Invalid ".concat(dashUrl, " URL. Please check the link and try again."));
        setShowWarning(true);
        setEmbedUrl(defUrl);
      }
      // setEmbedUrl(defUrl);
      setWarningMessage("Invalid ".concat(dashUrl, " URL. Please check the link and try again."));
      setShowWarning(true);
      // setIsValidUrl(false);
    }
    if (inputUrl === "") {
      const loomIdMatch = defaultUrl === null || defaultUrl === void 0 ? void 0 : defaultUrl.match(matchingSequence2);
      if (loomIdMatch && (loomIdMatch[1] || loomIdMatch[2])) {
        setEmbedUrl("https://www.loom.com/embed/".concat(loomIdMatch[1], "?autoplay=false"));
        setShowWarning(false);
      } else {
        setWarningMessage("Invalid ".concat(dashUrl, " URL. Please check the link and try again."));
        setShowWarning(true);
        setEmbedUrl(defUrl);
      }
      // setShowWarning(false);
      // setIsValidUrl(false);
      monday.storage.instance.setItem("url", defUrl);
    }
  };
  const handleWidthChange = e => {
    const sanitizedValue = _dompurify.default.sanitize(e.target.value);
    setWidth(sanitizedValue);
    setShowWarning(false);
  };
  const handleHeightChange = e => {
    const sanitizedValue = _dompurify.default.sanitize(e.target.value);
    setHeight(sanitizedValue);
    setShowWarning(false);
  };
  const isValidPositiveInteger = value => {
    const sanitized = _dompurify.default.sanitize(value);
    const trimmed = sanitized.trim();
    // Reject if it's not a number, negative, or has leading zeros (except "0" itself)
    return /^[1-9]\d*$/.test(trimmed);
  };
  const validateWidth = () => {
    const trimmed = String(_dompurify.default.sanitize(width)).trim();
    if (!isValidPositiveInteger(trimmed)) {
      console.log("Invalid width detected!");
      if (!showWarning) {
        setWarningMessage("Enter a valid positive number. Leading zeros are not allowed.");
        setShowWarning(true);
      }
      setWidth(DEFAULT_WIDTH.toString());
    } else {
      setShowWarning(false);
      setWidth(Number(trimmed).toString());
    }
  };
  const validateHeight = () => {
    const trimmed = String(_dompurify.default.sanitize(height)).trim();
    if (!isValidPositiveInteger(trimmed)) {
      console.log("Invalid height detected!");
      if (!showWarning) {
        setWarningMessage("Enter a valid positive number. Leading zeros are not allowed.");
        setShowWarning(true);
      }
      setHeight(DEFAULT_HEIGHT.toString());
    } else {
      setShowWarning(false);
      setHeight(Number(trimmed).toString());
    }
  };
  const toggleEditMode = () => {
    const newEditMode = !isEditing;
    setIsEditing(newEditMode);
    monday.storage.instance.setItem("isEditing", newEditMode);
    if (newEditMode) {
      const slideIdMatch = url === null || url === void 0 ? void 0 : url.match(matchingSequence);
      if (slideIdMatch && slideIdMatch[1]) {
        setEmbedUrl("".concat(decodePart1).concat(slideIdMatch[1], "/edit"));
      }
    } else {
      const slideIdMatch = url === null || url === void 0 ? void 0 : url.match(matchingSequence);
      if (slideIdMatch && slideIdMatch[1]) {
        setEmbedUrl("".concat(decodePart1).concat(slideIdMatch[1], "/preview"));
      }
    }
  };
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_CookieConsent.default, {
    cookiepolicy: cookiepolicy
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "company"
  }, /*#__PURE__*/_react.default.createElement("img", {
    src: logo,
    alt: "Company logo",
    style: {
      height: "50px",
      width: "50px"
    }
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "name"
  }, /*#__PURE__*/_react.default.createElement("b", null, /*#__PURE__*/_react.default.createElement("span", {
    style: {
      height: "19px",
      color: fontCol
    }
  }, appName)), /*#__PURE__*/_react.default.createElement("span", {
    style: {
      height: "16px",
      textAlign: "left",
      color: fontCol
    }
  }, " by Satisfaction Drivers"))), embedUrl && /*#__PURE__*/_react.default.createElement("div", {
    onMouseEnter: () => {
      if (submitted) {
        setShowEdit(true);
        monday.storage.instance.setItem("showEdit", showEdit);
      }
    },
    onMouseLeave: () => {
      if (submitted) {
        setShowEdit(false);
        monday.storage.instance.setItem("showEdit", showEdit);
      }
    },
    style: {
      position: 'relative',
      width: 'auto',
      height: 'auto'
    }
  }, loading && /*#__PURE__*/_react.default.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100px'
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      width: '40px',
      height: '40px',
      border: '4px solid rgb(255, 255, 255)',
      borderTop: '4px solid #000',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    }
  })), /*#__PURE__*/_react.default.createElement("iframe", {
    ref: iframeRef,
    src: embedUrl,
    width: /^\d+$/.test(String(width)) && /^0\d+$/.test(String(width)) // Check if it starts with 0 but isn't just "0"
    ? 600 : Math.max(600, Number(width) || 600),
    height: /^\d+$/.test(String(height)) && /^0\d+$/.test(String(height)) ? 400 : Math.max(400, Number(height) || 400),
    frameBorder: "0",
    allowFullScreen: true,
    title: "Video Player",
    style: {
      marginBottom: "10px"
    }
  }), submitted && !show && showEdit && /*#__PURE__*/_react.default.createElement("i", {
    class: "fa-solid fa-pen-to-square fa-xl",
    onClick: () => {
      setShow(true);
      monday.storage.instance.setItem("show", show);
    },
    style: {
      width: "40px",
      height: "40px",
      position: 'absolute',
      bottom: '75px',
      right: '0',
      zIndex: 10,
      // marginTop: '20px',
      paddingTop: '18px',
      paddingLeft: '5px',
      zIndex: 10,
      backgroundColor: '#f1f3f4f2',
      borderRadius: "40px",
      color: 'black'
    }
  })), ifEditing && show && !showWarning && embedUrl != defUrl && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("button", {
    type: "button",
    className: "btn btn-secondary",
    onClick: toggleEditMode,
    style: {
      // position: 'absolute',
      // bottom: '18px',
      // right: '140px',
      zIndex: 10,
      padding: '3px 6px',
      borderRadius: '20px',
      backgroundColor: isEditing ? '#0d6efd' : '#E5E5EA',
      color: isEditing ? 'white' : 'black',
      border: 'none',
      boxShadow: '0 2px 5px rgba(0,0,0,0.15)',
      fontSize: '16px',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      outline: 'none',
      display: 'flex',
      alignItems: 'center',
      margin: 'auto'
    },
    onMouseDown: e => e.currentTarget.style.transform = 'scale(0.95)',
    onMouseUp: e => e.currentTarget.style.transform = 'scale(1)'
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      width: '30px',
      height: '15px',
      backgroundColor: isEditing ? 'white' : '#C7C7CC',
      borderRadius: '15px',
      position: 'relative',
      marginRight: '10px',
      transition: 'background-color 0.3s ease'
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      width: '13px',
      height: '13px',
      backgroundColor: isEditing ? '#007AFF' : 'white',
      borderRadius: '50%',
      position: 'absolute',
      top: '1px',
      left: isEditing ? '15px' : '1px',
      transition: 'left 0.3s ease',
      boxShadow: '0 2px 5px rgba(0,0,0,0.15)'
    }
  })), isEditing ? "Edit" : "View"), /*#__PURE__*/_react.default.createElement("br", null)), ifEditing && !submitted && !showWarning && embedUrl != defUrl && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("button", {
    type: "button",
    className: "btn btn-secondary",
    onClick: toggleEditMode,
    style: {
      // position: 'absolute',
      // bottom: '18px',
      // right: '140px',
      zIndex: 10,
      padding: '3px 6px',
      borderRadius: '20px',
      backgroundColor: isEditing ? '#0d6efd' : '#E5E5EA',
      color: isEditing ? 'white' : 'black',
      border: 'none',
      boxShadow: '0 2px 5px rgba(0,0,0,0.15)',
      fontSize: '16px',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      outline: 'none',
      display: 'flex',
      alignItems: 'center',
      margin: 'auto'
    },
    onMouseDown: e => e.currentTarget.style.transform = 'scale(0.95)',
    onMouseUp: e => e.currentTarget.style.transform = 'scale(1)'
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      width: '30px',
      height: '15px',
      backgroundColor: isEditing ? 'white' : '#C7C7CC',
      borderRadius: '15px',
      position: 'relative',
      marginRight: '10px',
      transition: 'background-color 0.3s ease'
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      width: '13px',
      height: '13px',
      backgroundColor: isEditing ? '#007AFF' : 'white',
      borderRadius: '50%',
      position: 'absolute',
      top: '1px',
      left: isEditing ? '15px' : '1px',
      transition: 'left 0.3s ease',
      boxShadow: '0 2px 5px rgba(0,0,0,0.15)'
    }
  })), isEditing ? "Edit" : "View"), /*#__PURE__*/_react.default.createElement("br", null)), !submitted && /*#__PURE__*/_react.default.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      width: "600px",
      position: "sticky",
      left: "29%"
    }
  }, /*#__PURE__*/_react.default.createElement("label", {
    style: {
      color: fontCol
    }
  }, dashUrl, " URL:", /*#__PURE__*/_react.default.createElement("input", {
    type: "text",
    value: url === defaultUrl || url === defUrl ? "" : url,
    onChange: handleUrlChange
  })), /*#__PURE__*/_react.default.createElement("label", {
    style: {
      color: fontCol
    }
  }, "Width:", /*#__PURE__*/_react.default.createElement("input", {
    type: "number",
    value: width,
    onChange: handleWidthChange // Allows typing
    ,
    onBlur: validateWidth // Validates after user finishes typing
    ,
    style: {
      marginLeft: "10px"
    }
  })), /*#__PURE__*/_react.default.createElement("label", {
    style: {
      color: fontCol
    }
  }, "Height:", /*#__PURE__*/_react.default.createElement("input", {
    type: "number",
    value: height,
    onChange: handleHeightChange // Allows typing
    ,
    onBlur: validateHeight // Validates after user finishes typing
    ,
    style: {
      marginLeft: "10px"
    }
  })), /*#__PURE__*/_react.default.createElement("button", {
    type: "button",
    className: "btn btn-primary",
    onClick: () => {
      if (!showWarning && url) {
        setSubmitted(true);
        setShow(false);
        setShowEdit(false);
        monday.storage.instance.setItem("show", show);
        monday.storage.instance.setItem("submitted", submitted);
        monday.storage.instance.setItem("showEdit", showEdit);
      }
    },
    style: {
      height: "42px",
      marginTop: "36px",
      marginLeft: "80px",
      width: "100px"
    }
  }, "Done")), show && /*#__PURE__*/_react.default.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      width: "600px",
      position: "sticky",
      left: "29%"
    }
  }, /*#__PURE__*/_react.default.createElement("label", {
    style: {
      color: fontCol
    }
  }, dashUrl, " URL:", /*#__PURE__*/_react.default.createElement("input", {
    type: "text",
    value: url === defaultUrl || url === defUrl ? "" : url,
    onChange: handleUrlChange,
    style: {
      marginLeft: "10px"
    }
  })), /*#__PURE__*/_react.default.createElement("label", {
    style: {
      color: fontCol
    }
  }, "Width:", /*#__PURE__*/_react.default.createElement("input", {
    type: "number",
    value: width,
    onChange: handleWidthChange,
    onBlur: validateWidth,
    style: {
      marginLeft: "10px"
    }
  })), /*#__PURE__*/_react.default.createElement("label", {
    style: {
      color: fontCol
    }
  }, "Height:", /*#__PURE__*/_react.default.createElement("input", {
    type: "number",
    value: height,
    onChange: handleHeightChange,
    onBlur: validateHeight,
    style: {
      marginLeft: "10px"
    }
  })), /*#__PURE__*/_react.default.createElement("button", {
    type: "button",
    className: "btn btn-primary",
    onClick: () => {
      if (!showWarning && url) setShow(false);
      setShowEdit(false);
      monday.storage.instance.setItem("show", show);
      monday.storage.instance.setItem("showEdit", showEdit);
    },
    style: {
      height: "42px",
      marginTop: "36px",
      marginLeft: "80px",
      width: "100px"
    }
  }, "Done")), showWarning && /*#__PURE__*/_react.default.createElement("div", {
    className: "alert alert-danger",
    role: "alert",
    style: {
      margin: "5px",
      width: "600px"
    }
  }, warningMessage), /*#__PURE__*/_react.default.createElement("div", {
    className: "details"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "info"
  }, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("h4", {
    style: {
      textAlign: "left",
      height: "36px"
    }
  }, "Additional information"), /*#__PURE__*/_react.default.createElement("p", {
    style: {
      height: "60px",
      marginBottom: "16px",
      marginTop: "16px",
      textAlign: "left"
    }
  }, "Explore additional resources to learn how to set up and utilize app."), /*#__PURE__*/_react.default.createElement("button", {
    type: "button",
    class: "btn btn-primary",
    style: {
      width: "140px",
      marginTop: "10px"
    }
  }, /*#__PURE__*/_react.default.createElement("a", {
    href: docLink,
    target: "_blank"
  }, "Documentation"))), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("h4", {
    style: {
      textAlign: "left",
      height: "36px"
    }
  }, "Premium support"), /*#__PURE__*/_react.default.createElement("p", {
    style: {
      height: "60px",
      marginBottom: "16px",
      marginTop: "16px",
      textAlign: "left"
    }
  }, "Our dedicated team is available to assist you with any questions or concerns. Feel free to reach out!"), /*#__PURE__*/_react.default.createElement("button", {
    type: "button",
    class: "btn btn-primary",
    style: {
      width: "180px",
      marginTop: "10px",
      textAlign: "center"
    }
  }, /*#__PURE__*/_react.default.createElement("a", {
    href: "https://satisfactiondrivers.com/contact-us",
    target: "_blank"
  }, "Premium Support"))))));
};
var _default = exports.default = Header;