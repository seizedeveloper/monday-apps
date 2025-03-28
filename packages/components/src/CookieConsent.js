import React, { useState, useEffect } from "react";


const CookieConsent = () => {
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
        <div className="cookie-popup">
          <p>We use cookies to improve your experience.</p>
          <button onClick={acceptCookies}>Accept</button>
        </div>
      )}
    </>
  );
};

export default CookieConsent;
