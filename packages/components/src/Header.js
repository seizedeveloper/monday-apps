import React, { useState, useEffect, useRef } from 'react';
import './Header.css';
import mondaySdk from 'monday-sdk-js';

//defaultUrl
//matching sequence
//keepediting
//app logo
//app name
//dash url
//documentation link
//const Player = ( {fontCol, bgCol,defaulturl,matchingSequence,ifEditing,logo,appName,dashUrl,docLink} ) => {


const Header = ({ fontCol, bgCol, defaulturl, matchingSequence, ifEditing, logo, appName, dashUrl, docLink, decodePart1,decodePart2, cookiepolicy }) => {

  const monday = mondaySdk();
  monday.setApiVersion("2023-10");

  const matchingSequence2=/(?:loom\.com\/share\/|loom\.com\/embed\/)([a-zA-Z0-9]+)/;
  
  const defaultUrl = defaulturl;
  const id = defaultUrl?.match(matchingSequence2)?.[1];
  const defUrl = defaulturl;

  const [url, setUrl] = useState('');
  const [width, setWidth] = useState(600);
  const [height, setHeight] = useState(400);
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
  const [cookieConsent, setCookieConsent] = useState(true); // Initially null to indicate not yet checked
 var iscanva= false;
 if (dashUrl=='Canva'){
  var iscanva = true;
}

  // Load the stored cookie consent value when the app loads
  useEffect(() => {
    
    
    monday.storage.getItem('cookieConsent').then((res) => {
      const value = res.data?.value;
      console.log('Stored Cookie Consent:', value);
      setCookieConsent(value ?? false); // Default to false if undefined
    });
  }, []);

  const handleAccept = () => {
    setCookieConsent(true);
    monday.storage.setItem('cookieConsent', true).then(() => {
      console.log('Cookie Consent set to true');
    });
  };


  useEffect(() => {
    setShowWarning(false);
  }, [embedUrl]);
  useEffect(() => {
    monday.storage.instance.getItem('url').then(res => {
      const value = res.data?.value;
      console.log(value);
      setStoredUrl(value ?? ''); // Provide a default value if undefined
    });

    monday.storage.instance.getItem('height').then(res => {
      const value = res.data?.value;
      console.log(value);
      setStoredHeight(value ?? 0); // Provide a sensible default, e.g., 0 for numbers
    });

    monday.storage.instance.getItem('width').then(res => {
      const value = res.data?.value;
      console.log(value);
      setStoredWidth(value ?? 0);
    });

    monday.storage.instance.getItem('show').then(res => {
      const value = res.data?.value;
      console.log(value);
      setStoredShow(value ?? false); // Provide default, e.g., false for booleans
    });


    monday.storage.instance.getItem('submitted').then(res => {
      const value = res.data?.value;
      console.log(value);
      setStoredSubmitted(value ?? false);
    });

    monday.storage.instance.getItem('showEdit').then(res => {
      const value = res.data?.value;
      console.log(value);
      setStoredShowEdit(value ?? false);
    });
    if(ifEditing){
    monday.storage.instance.getItem('isEditing').then(res => {
      const value = res.data?.value;
      console.log(value);
      setStoredisEditing(value ?? false);
    });}
    monday.execute('valueCreatedForUser');  // Value-created event when loading saved state
  }, []);



  useEffect(() => {
    if (storedurl) {
      setUrl(storedurl);
      const loomIdMatch = storedurl?.match(matchingSequence);

      if (loomIdMatch && (loomIdMatch[1]|| loomIdMatch[2])) {
        if( iscanva && loomIdMatch[2] && loomIdMatch[1]){
          const embedId = loomIdMatch[2];
          setEmbedUrl(`https://www.canva.com/design/${loomIdMatch[1]}/${embedId}/view?embed`);
        }
        else{
          const id = loomIdMatch[1] || loomIdMatch[2];  
        setEmbedUrl(`${decodePart1}${id}${decodePart2 ?? ''}`);}
        setShowWarning(false);
      } else {
        // setShowWarning(true);
        setEmbedUrl(defUrl);
      }

      monday.execute('valueCreatedForUser');  // Value-created event when URL is successfully set

    }
    else {
      setUrl(defaultUrl);
      const loomIdMatch = defaultUrl?.match(matchingSequence2);
      if (loomIdMatch && (loomIdMatch[1]|| loomIdMatch[2])) {
        
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
        if (loomIdMatch && (loomIdMatch[1]|| loomIdMatch[2])) {
          if( iscanva && loomIdMatch[2]){
            const embedId = loomIdMatch[2];
            setEmbedUrl(`https://www.canva.com/design/${loomIdMatch[1]}/${embedId}/view?embed`);
          }
          else{
            const id = loomIdMatch[1] || loomIdMatch[2];  
        
          setEmbedUrl(`${decodePart1}${id}/edit`) || setEmbedUrl(`https://www.loom.com/embed/${id}?autoplay=false`);}
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
    const inputUrl = event.target.value;
    setUrl(inputUrl);
    monday.storage.instance.setItem("url", inputUrl);
    // localStorage.setItem('url', inputUrl) ;
    // setUrlSetting(false) ; 
    const loomIdMatch = inputUrl?.match(matchingSequence);
    if (loomIdMatch && (loomIdMatch[1]|| loomIdMatch[2])) {

      if( iscanva && loomIdMatch[2] && loomIdMatch[1]){
        const embedId = loomIdMatch[2];
        setEmbedUrl(`https://www.canva.com/design/${loomIdMatch[1]}/${embedId}/view?embed`);
      }
      else{
      const id = loomIdMatch[1] || loomIdMatch[2];  
        setEmbedUrl(`${decodePart1}${id}${decodePart2 ?? ''}`);}
      // setShow(false);
      setShowWarning(false);
      setIsEditing(false);
      setIsValidUrl(true);
    } else {
      setShowWarning(true);
      setIsValidUrl(false);
      setEmbedUrl(defUrl);
    }
    if (inputUrl === "") {
      setShowWarning(false);
      setIsValidUrl(false);
      monday.storage.instance.setItem("url", defUrl);
    }
  };

  const handleWidthChange = (event) => {
    const value = parseInt(event.target.value, 10);
    // setWidthSetting(false) ;
    // setWidth(value > 0 ? value : 600);
    setWidth(value);
    // localStorage.setItem('width', value) ;
    monday.storage.instance.setItem("width", value);
  };

  const handleHeightChange = (event) => {
    const value = parseInt(event.target.value, 10);
    // setHeightSetting(false) ;
    // setHeight(value > 0 ? value : 400);
    setHeight(value);
    // localStorage.setItem('height', value) ;
    monday.storage.instance.setItem("height", value);
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
      {!cookieConsent && (
        <div className="cookie-overlay">
          <div className="cookie-content">
            <h1>Cookie Consent</h1>
            <p> We use cookies to enhance your user experience. By using our app,
              you agree to our use of cookies.{" "}</p>
            <p><a href={cookiepolicy} >Learn more.</a></p>
            <button className="accept-button" onClick={handleAccept}>
              Accept Cookies
            </button>
          </div>
        </div>
      )}




      { (<div className="company">
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
          style={{ position: 'relative', width: '100%', height: 'auto' }}>
          <iframe
            ref={iframeRef}
            src={embedUrl}
            width={width > 0 ? width : 600}
            height={height > 0 ? height : 400}
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
              onChange={handleWidthChange}
              style={{ marginLeft: "10px" }}
            />
          </label>
          <label style={{ color: fontCol }}>
            Height:
            <input
              type="number"
              value={height}
              onChange={handleHeightChange}
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
              style={{ marginLeft: "10px" }}
            />
          </label>
          <label style={{ color: fontCol }}>
            Height:
            <input
              type="number"
              value={height}
              onChange={handleHeightChange}
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
          Invalid {dashUrl} URL. Please check the link and try again.
        </div>
      )}

      { (<div className="details">
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