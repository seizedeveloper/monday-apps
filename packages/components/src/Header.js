import React, { useState, useEffect, useRef } from 'react';
import './Header.css';
import CookieConsent from "./CookieConsent";
import {resetCookiesOnUninstall } from "./storageService";
import mondaySdk from "monday-sdk-js";
import DOMPurify from 'dompurify';


const monday = mondaySdk();
monday.setApiVersion("2023-10");


const Header = ({ fontCol, bgCol, defaulturl, matchingSequence, ifEditing, logo, appName, dashUrl, docLink, decodePart1, decodePart2, cookiepolicy }) => {

  const matchingSequence2 = /(?:loom\.com\/share\/|loom\.com\/embed\/)([a-zA-Z0-9]+)/;

  const defaultUrl = defaulturl;
  const id = defaultUrl?.match(matchingSequence2)?.[1];
  const defUrl = defaulturl;
  const DEFAULT_WIDTH = 600;
  const DEFAULT_HEIGHT = 400;

  const [url, setUrl] = useState('');
  const [width, setWidth] = useState(DEFAULT_WIDTH);
  const [height, setHeight] = useState(DEFAULT_HEIGHT);
  const [embedUrl, setEmbedUrl] = useState(defUrl);
  const [showWarning, setShowWarning] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isValidUrl, setIsValidUrl] = useState(false);
  const iframeRef = useRef(null);
  const timeoutRef = useRef(null);
  const [storedurl, setStoredUrl] = useState(defUrl);
  const [storedheight, setStoredHeight] = useState("");
  const [storedwidth, setStoredWidth] = useState("");
  const [storedshow, setStoredShow] = useState("");
  const [storedsubmitted, setStoredSubmitted] = useState("");
  const [storedshowEdit, setStoredShowEdit] = useState("");
  const [storedisEditing, setStoredisEditing] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");
  const [loading, setLoading] = useState(true);
  // const [cookieConsent, setCookieConsent] = useState(null); // Initially null to indicate not yet checked
  // const [showPopup, setShowPopup] = useState(false);
  
  useEffect(() => {
    resetCookiesOnUninstall();
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

  useEffect(() => {
    setShowWarning(false);
}, [embedUrl]);

useEffect(() => {
    monday.storage.instance.getItem('url').then(res => {
        let value = res.data?.value;
        console.log(value);
        value = DOMPurify.sanitize(value ?? ''); // Sanitize user input
        setStoredUrl(value);
    });

    monday.storage.instance.getItem('height').then(res => {
      let value = res.data?.value;
      value = DOMPurify.sanitize(value ?? ''); // Sanitize input
      value = parseInt(value, 10);
      setStoredHeight(isNaN(value) ? 400 : value); // Ensure valid number
  });

  monday.storage.instance.getItem('width').then(res => {
    let value = res.data?.value;
    value = DOMPurify.sanitize(value ?? ''); // Sanitize input
    value = parseInt(value, 10);
    setStoredWidth(isNaN(value) ? 600 : value);
});

    monday.storage.instance.getItem('show').then(res => {
        let value = res.data?.value;
        console.log(value);
        setStoredShow(value ?? false);
    });

    monday.storage.instance.getItem('submitted').then(res => {
        let value = res.data?.value;
        console.log(value);
        setStoredSubmitted(value ?? false);
    });

    monday.storage.instance.getItem('showEdit').then(res => {
        let value = res.data?.value;
        console.log(value);
        setStoredShowEdit(value ?? false);
    });

    if (ifEditing) {
        monday.storage.instance.getItem('isEditing').then(res => {
            const value = res.data?.value;
            console.log(value);
            setStoredisEditing(value ?? false);
        });
    }

    monday.execute('valueCreatedForUser');  // Value-created event when loading saved state
}, []);



useEffect(() => {
  if (storedurl !== '' && storedurl !== defUrl) {
    setUrl(storedurl);
    const loomIdMatch = storedurl?.match(matchingSequence);

    if (loomIdMatch && (loomIdMatch[1] || loomIdMatch[2])) {
      if (iscanva && loomIdMatch[2] && loomIdMatch[1]) {
        const embedId = loomIdMatch[2];
        setEmbedUrl(`https://www.canva.com/design/${loomIdMatch[1]}/${embedId}/view?embed`);
      }
      else {
        const id = loomIdMatch[1] || loomIdMatch[2];
        setEmbedUrl(`${decodePart1}${id}${decodePart2 ?? ''}`);
      }
      setShowWarning(false);
    } else {
      setShowWarning(true);
         
         const loomIdMatch = defaultUrl?.match(matchingSequence2);
         if (loomIdMatch && (loomIdMatch[1] || loomIdMatch[2])) {
 
           setEmbedUrl(`https://www.loom.com/embed/${loomIdMatch[1]}?autoplay=false`);
           
         } else {
           setShowWarning(true);
           setEmbedUrl(defUrl);
         }
    }

    monday.execute('valueCreatedForUser');  // Value-created event when URL is successfully set

  }
  else {
    setUrl(defaultUrl);
    const loomIdMatch = defaultUrl?.match(matchingSequence2);
    if (loomIdMatch && (loomIdMatch[1] || loomIdMatch[2])) {
      
      setEmbedUrl(`https://www.loom.com/embed/${loomIdMatch[1]}?autoplay=false`);
      setShowWarning(false);
    } else {
      setShowWarning(true);
      setEmbedUrl(defUrl);
    }
  }
}, [storedurl]);

useEffect(() => {
  if (storedheight) {
    setHeight(parseInt(storedheight, 10));
  }
}, [storedheight]);

useEffect(() => {
  if (storedwidth) {
    setWidth(parseInt(storedwidth, 10));
  }
}, [storedwidth]);

useEffect(() => {
  if (storedshow) {
    setShow(storedshow);
  }
}, [storedshow]);

useEffect(() => {
  if (storedsubmitted) {
    setSubmitted(storedsubmitted);
    monday.execute('valueCreatedForUser');  // Value-created event when content is submitted
  }
}
  , [storedsubmitted]);

useEffect(() => {
  if (storedshowEdit) {
    setShowEdit(storedshowEdit); 
    monday.execute('valueCreatedForUser');  // Value-created event when edit mode is accessed
  }
}, [storedshowEdit]);

useEffect(() => {
  if (storedisEditing) {
    setIsEditing(storedisEditing);
    if (storedisEditing) {
      const loomIdMatch = url?.match(matchingSequence);
      if (loomIdMatch && (loomIdMatch[1] || loomIdMatch[2])) {
        if (iscanva && loomIdMatch[2]) {
          const embedId = loomIdMatch[2];
          setEmbedUrl(`https://www.canva.com/design/${loomIdMatch[1]}/${embedId}/view?embed`);
        }else {
             const id = loomIdMatch[1] || loomIdMatch[2];
 
             setEmbedUrl(`${decodePart1}${id}/edit`) || setEmbedUrl(`https://www.loom.com/embed/${id}?autoplay=false`);
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
styles.innerHTML = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(styles);
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
  
    return () => clearTimeout(timer); // Cleanup in case component unmounts
  }, [embedUrl]);

useEffect(() => {
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

const handleUrlChange = (event) => {
  const inputUrl = DOMPurify.sanitize(event.target.value);
    setUrl(inputUrl);
    monday.storage.instance.setItem("url", inputUrl);
    // localStorage.setItem('url', inputUrl) ;
    // setUrlSetting(false) ; 
    const loomIdMatch = inputUrl?.match(matchingSequence);

    if (loomIdMatch && (loomIdMatch[1] || loomIdMatch[2])) {

      if (iscanva && loomIdMatch[2] && loomIdMatch[1]) {
        const embedId = loomIdMatch[2];
        setEmbedUrl(`https://www.canva.com/design/${loomIdMatch[1]}/${embedId}/view?embed`);
      }
      else {
        const id = loomIdMatch[1] || loomIdMatch[2];
        setEmbedUrl(`${decodePart1}${id}${decodePart2 ?? ''}`);
      }
      // setShow(false);
      setShowWarning(false);
      setIsEditing(false);
      setIsValidUrl(true);
    } else {

      const loomIdMatch = defaultUrl?.match(matchingSequence2);
      if (loomIdMatch && (loomIdMatch[1] || loomIdMatch[2])) {

        setEmbedUrl(`https://www.loom.com/embed/${loomIdMatch[1]}?autoplay=false`);
        setShowWarning(false);
      } else {
        setWarningMessage(`Invalid ${dashUrl} URL. Please check the link and try again.`);
        setShowWarning(true);
        setEmbedUrl(defUrl);
      }
      // setEmbedUrl(defUrl);
      setWarningMessage(`Invalid ${dashUrl} URL. Please check the link and try again.`);
      setShowWarning(true);
      // setIsValidUrl(false);

    }
    if (inputUrl === "") {
      const loomIdMatch = defaultUrl?.match(matchingSequence2);
      if (loomIdMatch && (loomIdMatch[1] || loomIdMatch[2])) {

        setEmbedUrl(`https://www.loom.com/embed/${loomIdMatch[1]}?autoplay=false`);
        setShowWarning(false);
      } else {
        setWarningMessage(`Invalid ${dashUrl} URL. Please check the link and try again.`);
        setShowWarning(true);
        setEmbedUrl(defUrl);
      }
      // setShowWarning(false);
      // setIsValidUrl(false);
      monday.storage.instance.setItem("url", defUrl);
    }
  };

  const handleWidthChange = (e) => {
    const sanitizedValue = DOMPurify.sanitize(e.target.value);
    setWidth(sanitizedValue);
    setShowWarning(false);
  };
  
  const handleHeightChange = (e) => {
    const sanitizedValue = DOMPurify.sanitize(e.target.value);
    setHeight(sanitizedValue);
    setShowWarning(false);
  };
  
  const isValidPositiveInteger = (value) => {
    const sanitized = DOMPurify.sanitize(value);
    const trimmed = sanitized.trim();
    // Reject if it's not a number, negative, or has leading zeros (except "0" itself)
    return /^[1-9]\d*$/.test(trimmed);
  };
  
  const validateWidth = () => {
    const trimmed = String(DOMPurify.sanitize(width)).trim();
  
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
    const trimmed = String(DOMPurify.sanitize(height)).trim();
  
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
      const slideIdMatch = url?.match(matchingSequence);
      if (slideIdMatch && slideIdMatch[1]) {
        setEmbedUrl(`${decodePart1}${slideIdMatch[1]}/edit`);
      }
    } else {
      const slideIdMatch = url?.match(matchingSequence);
      if (slideIdMatch && slideIdMatch[1]) {
        setEmbedUrl(`${decodePart1}${slideIdMatch[1]}/preview`);
      }
    }
  };


  return (
    <div >
   
   <CookieConsent cookiepolicy={cookiepolicy} />

      {(<div className="company">
        <img src={logo} alt="Company logo" style={{ height: "50px", width: "50px" }} />
        <div className="name" >
          <b><span style={{ height: "19px", color: fontCol }}>{appName}</span></b>
          <span style={{ height: "16px", textAlign: "left", color: fontCol }}> by Satisfaction Drivers</span>
        </div>
      </div>)}



      {embedUrl && (
        <div
          onMouseEnter={() => {
            if (submitted) {
              setShowEdit(true);
              monday.storage.instance.setItem("showEdit", showEdit);
            }
          }}
          onMouseLeave={() => {
            if (submitted) {
              setShowEdit(false);
              monday.storage.instance.setItem("showEdit", showEdit);
            }
          }}
          style={{ position: 'relative', width: 'auto', height: 'auto' }}>
          {loading && (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100px',
        }}
      >
        <div
          style={{
            width: '40px',
            height: '40px',
            border: '4px solid rgb(255, 255, 255)',
            borderTop: '4px solid #000',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
          }}
        />
      </div>
      )}
          <iframe
            ref={iframeRef}
            src={embedUrl}
            width={
              /^\d+$/.test(String(width)) && /^0\d+$/.test(String(width))  // Check if it starts with 0 but isn't just "0"
                ? 600
                : Math.max(600, Number(width) || 600)
            }
            height={
              /^\d+$/.test(String(height)) && /^0\d+$/.test(String(height)) 
                ? 400
                : Math.max(400, Number(height) || 400)
            }
            
            frameBorder="0"
            allowFullScreen
            title="Video Player"
            style={{ marginBottom: "10px" }}
          ></iframe>




          {submitted && !show && showEdit && (
            <i class="fa-solid fa-pen-to-square fa-xl" onClick={() => {
              setShow(true);
              monday.storage.instance.setItem("show", show);
            }} style={{
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
              color: 'black',
            }}></i>
          )}

        </div>
      )}

      {ifEditing && show && !showWarning && (embedUrl != defUrl) && (<>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={toggleEditMode}
          style={{
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
          }}
          onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
          onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <div
            style={{
              width: '30px',
              height: '15px',
              backgroundColor: isEditing ? 'white' : '#C7C7CC',
              borderRadius: '15px',
              position: 'relative',
              marginRight: '10px',
              transition: 'background-color 0.3s ease',
            }}
          >
            <div
              style={{
                width: '13px',
                height: '13px',
                backgroundColor: isEditing ? '#007AFF' : 'white',
                borderRadius: '50%',
                position: 'absolute',
                top: '1px',
                left: isEditing ? '15px' : '1px',
                transition: 'left 0.3s ease',
                boxShadow: '0 2px 5px rgba(0,0,0,0.15)',
              }}
            ></div>
          </div>
          {isEditing ? "Edit" : "View"}
        </button>
        <br /></>
      )}
      {ifEditing && !submitted && !showWarning && (embedUrl != defUrl) && (<>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={toggleEditMode}
          style={{
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
          }}
          onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
          onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <div
            style={{
              width: '30px',
              height: '15px',
              backgroundColor: isEditing ? 'white' : '#C7C7CC',
              borderRadius: '15px',
              position: 'relative',
              marginRight: '10px',
              transition: 'background-color 0.3s ease',
            }}
          >
            <div
              style={{
                width: '13px',
                height: '13px',
                backgroundColor: isEditing ? '#007AFF' : 'white',
                borderRadius: '50%',
                position: 'absolute',
                top: '1px',
                left: isEditing ? '15px' : '1px',
                transition: 'left 0.3s ease',
                boxShadow: '0 2px 5px rgba(0,0,0,0.15)',
              }}
            ></div>
          </div>
          {isEditing ? "Edit" : "View"}
        </button>
        <br /></>
      )}
      {!submitted && (
        <div style={{ display: "flex", justifyContent: "center", width: "600px", position: "sticky", left: "29%" }}>
          <label style={{ color: fontCol }}>
            {dashUrl} URL:
            <input
              type="text"
              value={((url === defaultUrl) || (url === defUrl)) ? "" : url}
              onChange={handleUrlChange}
            />
          </label>
          <label style={{ color: fontCol }}>
            Width:
            <input
              type="number"
              value={width}
              onChange={handleWidthChange}  // Allows typing
              onBlur={validateWidth}        // Validates after user finishes typing
              style={{ marginLeft: "10px" }}
            />
          </label>

          <label style={{ color: fontCol }}>
            Height:
            <input
              type="number"
              value={height}
              onChange={handleHeightChange} // Allows typing
              onBlur={validateHeight}       // Validates after user finishes typing
              style={{ marginLeft: "10px" }}
            />
          </label>

          <button
            type="button"
            className="btn btn-primary"
            onClick={() => { if (!showWarning && url) { setSubmitted(true); setShow(false); setShowEdit(false); monday.storage.instance.setItem("show", show); monday.storage.instance.setItem("submitted", submitted); monday.storage.instance.setItem("showEdit", showEdit); } }}
            style={{ height: "42px", marginTop: "36px", marginLeft: "80px", width: "100px" }}
          >
            Done
          </button>
        </div>
      )}

      {show && (
        <div style={{ display: "flex", justifyContent: "center", width: "600px", position: "sticky", left: "29%" }}>
          <label style={{ color: fontCol }}>
            {dashUrl} URL:
            <input
              type="text"
              value={((url === defaultUrl) || (url === defUrl)) ? "" : url}
              onChange={handleUrlChange}
              style={{ marginLeft: "10px" }}
            />
          </label>
          <label style={{ color: fontCol }}>
            Width:
            <input
              type="number"
              value={width}
              onChange={handleWidthChange}
              onBlur={validateWidth}
              style={{ marginLeft: "10px" }}
            />
          </label>
          <label style={{ color: fontCol }}>
            Height:
            <input
              type="number"
              value={height}
              onChange={handleHeightChange}
              onBlur={validateHeight}
              style={{ marginLeft: "10px" }}
            />
          </label>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => { if (!showWarning && url) setShow(false); setShowEdit(false); monday.storage.instance.setItem("show", show); monday.storage.instance.setItem("showEdit", showEdit); }}
            style={{ height: "42px", marginTop: "36px", marginLeft: "80px", width: "100px" }}
          >
            Done
          </button>
        </div>
      )}

      {showWarning && (
        <div className="alert alert-danger" role="alert" style={{ margin: "5px", width: "600px" }}>
          {warningMessage}
        </div>
      )}


      {(<div className="details">
        <div className="info">
          <div >
            <h4 style={{ textAlign: "left", height: "36px" }}>Additional information</h4>
            <p style={{ height: "60px", marginBottom: "16px", marginTop: "16px", textAlign: "left" }}>Explore additional resources to learn how to set up and utilize app.</p>
            <button type="button" class="btn btn-primary" style={{ width: "140px", marginTop: "10px" }}><a href={docLink} target='_blank'>Documentation</a></button>

          </div>
          <div>
            <h4 style={{ textAlign: "left", height: "36px" }}>Premium support</h4>
            <p style={{ height: "60px", marginBottom: "16px", marginTop: "16px", textAlign: "left" }}>Our dedicated team is available to assist you with any questions or concerns. Feel free to reach out!</p>
            <button type="button" class="btn btn-primary" style={{ width: "180px", marginTop: "10px", textAlign: "center" }}><a href="https://satisfactiondrivers.com/contact-us" target='_blank'>Premium Support</a></button>
          </div>
        </div>
      </div>)}


    </div>
  );
};



export default Header;