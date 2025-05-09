"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
require("./Header.css");
var _mondaySdkJs = _interopRequireDefault(require("monday-sdk-js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
//defaultUrl
//matching sequence
//keepediting
//app logo
//app name
//dash url
//documentation link
//const Player = ( {fontCol, bgCol,defaulturl,matchingSequence,ifEditing,logo,appName,dashUrl,docLink} ) => {

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
  const monday = (0, _mondaySdkJs.default)();
  monday.setApiVersion("2023-10");
  const matchingSequence2 = /(?:loom\.com\/share\/|loom\.com\/embed\/)([a-zA-Z0-9]+)/;
  const defaultUrl = defaulturl;
  const id = defaultUrl === null || defaultUrl === void 0 || (_defaultUrl$match = defaultUrl.match(matchingSequence2)) === null || _defaultUrl$match === void 0 ? void 0 : _defaultUrl$match[1];
  const defUrl = defaulturl;
  const [url, setUrl] = (0, _react.useState)('');
  const [width, setWidth] = (0, _react.useState)(600);
  const [height, setHeight] = (0, _react.useState)(400);
  const [embedUrl, setEmbedUrl] = (0, _react.useState)(defUrl);
  const [showWarning, setShowWarning] = (0, _react.useState)(false);
  const [showWarning2, setShowWarning2] = (0, _react.useState)(false);
  const [showdimensionWarning, setShowdimWarning] = (0, _react.useState)(false);
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
  const [cookieConsent, setCookieConsent] = (0, _react.useState)(false); // Initially null to indicate not yet checked
  const [loading, setLoading] = (0, _react.useState)(true);
  const [isConsentFetched, setIsConsentFetched] = (0, _react.useState)(false);
  var iscanva = false;
  if (dashUrl == 'Canva') {
    var iscanva = true;
  }

  // Load the stored cookie consent value when the app loads
  (0, _react.useEffect)(() => {
    monday.storage.getItem('cookieConsent').then(res => {
      var _res$data;
      const value = (_res$data = res.data) === null || _res$data === void 0 ? void 0 : _res$data.value;
      console.log('Stored Cookie Consent:', value);
      setCookieConsent(value !== null && value !== void 0 ? value : false); // default to false if undefined
      setIsConsentFetched(true); // mark as fetched
    });
  }, []);
  const handleAccept = () => {
    setCookieConsent(true);
    monday.storage.setItem('cookieConsent', true).then(() => {
      console.log('Cookie Consent set to true');
    });
  };
  (0, _react.useEffect)(() => {
    setShowWarning(false);
    setShowdimWarning(false);
  }, [embedUrl]);
  (0, _react.useEffect)(() => {
    monday.storage.instance.getItem('url').then(res => {
      var _res$data2;
      const value = (_res$data2 = res.data) === null || _res$data2 === void 0 ? void 0 : _res$data2.value;
      console.log(value);
      setStoredUrl(value !== null && value !== void 0 ? value : ''); // Provide a default value if undefined
    });
    monday.storage.instance.getItem('height').then(res => {
      var _res$data3;
      const value = (_res$data3 = res.data) === null || _res$data3 === void 0 ? void 0 : _res$data3.value;
      console.log(value);
      setStoredHeight(value !== null && value !== void 0 ? value : 0); // Provide a sensible default, e.g., 0 for numbers
    });
    monday.storage.instance.getItem('width').then(res => {
      var _res$data4;
      const value = (_res$data4 = res.data) === null || _res$data4 === void 0 ? void 0 : _res$data4.value;
      console.log(value);
      setStoredWidth(value !== null && value !== void 0 ? value : 0);
    });
    monday.storage.instance.getItem('show').then(res => {
      var _res$data5;
      const value = (_res$data5 = res.data) === null || _res$data5 === void 0 ? void 0 : _res$data5.value;
      console.log(value);
      setStoredShow(value !== null && value !== void 0 ? value : false); // Provide default, e.g., false for booleans
    });
    monday.storage.instance.getItem('submitted').then(res => {
      var _res$data6;
      const value = (_res$data6 = res.data) === null || _res$data6 === void 0 ? void 0 : _res$data6.value;
      console.log(value);
      setStoredSubmitted(value !== null && value !== void 0 ? value : false);
    });
    monday.storage.instance.getItem('showEdit').then(res => {
      var _res$data7;
      const value = (_res$data7 = res.data) === null || _res$data7 === void 0 ? void 0 : _res$data7.value;
      console.log(value);
      setStoredShowEdit(value !== null && value !== void 0 ? value : false);
    });
    if (ifEditing) {
      monday.storage.instance.getItem('isEditing').then(res => {
        var _res$data8;
        const value = (_res$data8 = res.data) === null || _res$data8 === void 0 ? void 0 : _res$data8.value;
        console.log(value);
        setStoredisEditing(value !== null && value !== void 0 ? value : false);
      });
    }
    monday.execute('valueCreatedForUser'); // Value-created event when loading saved state
  }, []);
  (0, _react.useEffect)(() => {
    if (storedurl !== '' && storedurl !== defUrl) {
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
        setShowWarning(true);
        const loomIdMatch = defaultUrl === null || defaultUrl === void 0 ? void 0 : defaultUrl.match(matchingSequence2);
        if (loomIdMatch && (loomIdMatch[1] || loomIdMatch[2])) {
          setEmbedUrl("https://www.loom.com/embed/".concat(loomIdMatch[1], "?autoplay=false"));
        } else {
          setShowWarning(true);
          setEmbedUrl(defUrl);
        }
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
  styles.innerHTML = "\n    @keyframes spin {\n      0% { transform: rotate(0deg); }\n      100% { transform: rotate(360deg); }\n    }\n  ";
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
  function sanitizeInput(url) {
    const cleanUrl = url.trim().replace(/<[^>]*>?/gm, ''); // strips HTML tags
    return cleanUrl;
  }
  const handleUrlChange = event => {
    console.log("The input URL is:", event.target.value);
    const inputUrl = sanitizeInput(event.target.value);
    console.log("The input URL after sanitization is:", inputUrl);
    setUrl(inputUrl);
    monday.storage.instance.setItem("url", inputUrl);
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
        setShowWarning(true);
        setEmbedUrl(defUrl);
      }
      setShowWarning(true);
    }
    if (inputUrl === "") {
      const loomIdMatch = defaultUrl === null || defaultUrl === void 0 ? void 0 : defaultUrl.match(matchingSequence2);
      if (loomIdMatch && (loomIdMatch[1] || loomIdMatch[2])) {
        setEmbedUrl("https://www.loom.com/embed/".concat(loomIdMatch[1], "?autoplay=false"));
        setShowWarning(false);
      } else {
        setShowWarning(true);
        setEmbedUrl(defUrl);
      }
      // setShowWarning(false);
      // setIsValidUrl(false);
      monday.storage.instance.setItem("url", defUrl);
    }
  };
  const DEFAULT_WIDTH = 600;
  const DEFAULT_HEIGHT = 400;
  const handleWidthChange = e => {
    const sanitizedWidth = sanitizeInput(e.target.value);
    setWidth(sanitizedWidth); // Allow user to type freely
  };
  const handleHeightChange = e => {
    const sanitizedHeight = sanitizeInput(e.target.value);
    setHeight(sanitizedHeight); // Allow user to type freely
  };
  const validateWidth = () => {
    if (/^0\d+$/.test(width) || Number(width) < 0) {
      setShowdimWarning(true);
      setShowWarning2(true);
      setWidth(DEFAULT_WIDTH);
    } else {
      setShowdimWarning(false);
      setShowWarning2(false);
      setWidth(width ? Math.max(Number(width), 600) : DEFAULT_WIDTH);
    }
  };
  const validateHeight = () => {
    if (/^0\d+$/.test(height) || Number(height) < 0) {
      setShowdimWarning(true);
      setShowWarning2(true);
      setHeight(DEFAULT_HEIGHT);
    } else {
      setShowdimWarning(false);
      setShowWarning2(false);
      setHeight(height ? Math.max(Number(height), 400) : DEFAULT_HEIGHT);
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
  return /*#__PURE__*/_react.default.createElement("div", null, isConsentFetched && !cookieConsent && /*#__PURE__*/_react.default.createElement("div", {
    className: "cookie-overlay"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "cookie-content"
  }, /*#__PURE__*/_react.default.createElement("h1", null, "Cookie Consent"), /*#__PURE__*/_react.default.createElement("p", null, " We use cookies to enhance your user experience. By using our app, you agree to our use of cookies.", " "), /*#__PURE__*/_react.default.createElement("p", null, /*#__PURE__*/_react.default.createElement("a", {
    href: cookiepolicy
  }, "Learn more.")), /*#__PURE__*/_react.default.createElement("button", {
    className: "accept-button",
    onClick: handleAccept
  }, "Accept Cookies"))), /*#__PURE__*/_react.default.createElement("div", {
    className: "company"
  }, /*#__PURE__*/_react.default.createElement("img", {
    src: logo,
    alt: "Company logo",
    style: {
      height: "50px",
      width: "50px",
      position: "absolute",
      left: "0px"
    }
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "name"
  }, /*#__PURE__*/_react.default.createElement("b", null, /*#__PURE__*/_react.default.createElement("span", {
    style: {
      whiteSpace: "nowrap",
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
    width: /^\d+$/.test(String(width)) && String(width).startsWith("0") && width !== "0" ? 600 : Math.max(600, Number(width) || 600),
    height: /^\d+$/.test(String(height)) && String(height).startsWith("0") && height !== "0" ? 400 : Math.max(400, Number(height) || 400),
    frameBorder: "0",
    allowFullScreen: true,
    title: "Video Player",
    style: {
      marginBottom: "10px",
      marginRight: "0%"
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
  }, "Invalid ", dashUrl, " URL. Please check the link and try again."), showWarning2 && /*#__PURE__*/_react.default.createElement("div", {
    className: "alert alert-danger",
    role: "alert",
    style: {
      margin: "5px",
      width: "600px"
    }
  }, "Enter a valid positive number. Leading zeros are not allowed."), /*#__PURE__*/_react.default.createElement("div", {
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