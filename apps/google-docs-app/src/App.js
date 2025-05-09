import React, { useState, useEffect } from 'react';
import ViewPage from './viewPage';
import mondaySdk from 'monday-sdk-js';
import { Header } from "@npm-workspace-demo/components"
// import { Header } from "/packages/components/src/index.js"
import logo from './frame2.png';
const App = () => {
  const [url, setUrl] = useState('');
  const [inputUrl, setInputUrl] = useState('');
  const [fontCol, setFontCol] = useState('#ffffff');
  const [bgCol, setBgCol] = useState('#181b34');
  const [view, setView] = useState(false);
  const monday = mondaySdk();

  monday.setApiVersion("2023-10");
  //   monday.get('sessionToken')
  // .then((token) => { 
  //   // send token to backend
  //   // On backend, call jwt.verify(token.data, 'MY_CLIENT_SECRET') 
  // });
  const updateTheme = (theme) => {
    if (theme === "light") {
      setBgCol("#ffffff");
      setFontCol("#000000");
    } else if (theme === "dark") {
      setBgCol("#181b34");
      setFontCol("#ffffff");
    } else if (theme === "black") {
      setBgCol("#111111");
      setFontCol("#ffffff");
    }
  };

  useEffect(() => {
    // Fetch initial context
    monday.get('context').then(res => {

      const isViewOnly = res.data?.user?.isViewOnly;
      setView(isViewOnly);
      console.log("The isviewOnly parameter is set to ", isViewOnly);

      const col = res.data['theme'];
      console.log("Initial theme: ", col);
      updateTheme(col);

    }).catch(err => {
      console.error("Error fetching context: ", err);
    });
    const unsubscribe = monday.listen('context', res => {
      const updatedTheme = res.data['theme'];
      console.log("Updated theme: ", updatedTheme);
      updateTheme(updatedTheme);
    });
    return () => unsubscribe();
  }, []);



  // var isViewOnly = false;
  var defaulturl = 'https://www.loom.com/share/6498b98ac5f0420d81bfdc223f70a607?sid=2f14a612-b0e6-4e4c-bec0-1a814e0457e2';
  var matchingSequence = /\/d\/([a-zA-Z0-9-_]+)/;
  var ifEditing = true;

  var appName = 'Google Docs Embed for monday';
  var dashUrl = 'Google docs';
  var docLink = "https://satisfactiondrivers.com/google-doc-documentation";
  var decodePart1 = 'https://docs.google.com/document/d/';
  var decodePart2 = '/preview';
  var cookiepolicy='https://policies.google.com/privacy'

  const handleInputChange = (event) => {
    setInputUrl(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setUrl(inputUrl);
  };

  return (
    <>
      
      <div className="Container" style={{ backgroundColor: bgCol }}>
        {view ? (
          <ViewPage fontCol={fontCol} bgCol={bgCol} />
        ) : (
          <Header fontCol={fontCol} bgCol={bgCol} defaulturl={defaulturl} matchingSequence={matchingSequence}
           ifEditing={ifEditing} logo={logo} appName={appName} 
          dashUrl={dashUrl} docLink={docLink} decodePart1={decodePart1} decodePart2={decodePart2} cookiepolicy={cookiepolicy} />
        )}



      </div>

    </>
  );
};


export default App;


