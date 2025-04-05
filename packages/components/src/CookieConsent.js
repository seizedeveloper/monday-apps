import React, { useState, useEffect } from "react";


const CookieConsent = ( {cookiepolicy} ) => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
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

  return (
    <>
      {showPopup && (
  <div className="cookie-overlay">
    <div className="cookie-content">
    <h1>Cookie Consent</h1>
            <p> We use cookies to enhance your user experience. By using our app,
              you agree to our use of cookies.{" "}</p>
            <p><a href={cookiepolicy} >Learn more.</a></p>
      <button className="accept-button" onClick={acceptCookies}>Accept Cookies</button>
    </div>
  </div>
)}

    </>
  );
};

export default CookieConsent;
