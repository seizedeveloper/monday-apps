import React, { useState, useEffect } from 'react';
import ViewPage from './viewPage';
import mondaySdk from 'monday-sdk-js';
import { Header } from "@npm-workspace-demo/components"
// import { Header } from "/packages/components/src/index.js"
import logo from './calendly.png';
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
  var defaulturl = 'https://www.loom.com/share/0a2062def3634911bf5703b067b7be01?sid=45f904d9-5068-4af5-aae0-477d38e1bba2';
  var matchingSequence =/calendly\.com\/([a-zA-Z0-9_-]+)/;
  var ifEditing = false;

  var appName = 'Calendly Embed for monday.com';
  var dashUrl = 'Calendly';
  var docLink = "https://satisfactiondrivers.com/calendly-documentation";
  var decodePart1 = 'https://calendly.com/'
  var decodePart2 =null;
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
          <ViewPage fontCol={fontCol} bgCol={bgCol} appName={appName}  />
        ) : (
          <Header fontCol={fontCol} bgCol={bgCol} defaulturl={defaulturl} matchingSequence={matchingSequence}
           ifEditing={ifEditing} logo={logo} appName={appName} 
          dashUrl={dashUrl} docLink={docLink} decodePart1={decodePart1} decodePart2={decodePart2} cookiepolicy={cookiepolicy}/>
        )}



      </div>

    </>
  );
};


export default App;


