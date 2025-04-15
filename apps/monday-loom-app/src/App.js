import React, { useState, useEffect } from 'react';
import ViewPage from './viewPage';
import mondaySdk from 'monday-sdk-js';
import { Header } from "@npm-workspace-demo/components"
import logo from './logoApp_new.png';

const App = () => {
  const [url, setUrl] = useState('');
  const [inputUrl, setInputUrl] = useState('');
  const [fontCol, setFontCol] = useState('#ffffff');
  const [bgCol, setBgCol] = useState('#181b34');
  const [view, setView]=useState(false);
  const monday = mondaySdk();


  var defaulturl = 'https://www.loom.com/share/41f37898926845b797fca215f04ce57c?sid=a2748109-4a75-406b-94bb-0e6d7ad47a73';
  var matchingSequence = /(?:loom\.com\/share\/|loom\.com\/embed\/)([a-zA-Z0-9]+)/;
  var ifEditing = false;

  var appName = 'Loom Embed For monday';
  var dashUrl = 'Video';
  var docLink = "https://satisfactiondrivers.com/loom-integration-for-monday-documentation";
  var decodePart1 = 'https://www.loom.com/embed/';
  var decodePart2 = '?autoplay=false';
  var cookiepolicy='https://policies.google.com/privacy'


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


  const handleInputChange = (event) => {
    setInputUrl(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setUrl(inputUrl);
  };

  return (
    <>
      {/* <div className="company">
        <img src={logo} alt="Company logo" style={{ height:"56px",width:"56px"}}/>
        <div className="name">
          <b><span style={{ height:"19px"}}>Loom Integration for monday.com</span></b>
          <span style={{ height:"16px"}}> by Satisfaction Drivers</span>
        </div>
    </div> */}
      <div className="Container" style={{ backgroundColor: bgCol }}>
        {view ? (
          <ViewPage fontCol={fontCol} bgCol={bgCol} appName={appName}/>
        ) : (
         <Header fontCol={fontCol} bgCol={bgCol} defaulturl={defaulturl} matchingSequence={matchingSequence}
                    ifEditing={ifEditing} logo={logo} appName={appName} 
                   dashUrl={dashUrl} docLink={docLink} decodePart1={decodePart1} decodePart2={decodePart2} cookiepolicy={cookiepolicy} />
        )}



      </div>
      {/* <div className="details">
      <div className="info">
        <div >
          <h4>Additional information</h4>
          <p style={{ height:"60px", marginBottom:"16px", marginTop:"16px"}}>Discover more resources on how to set up and use the app (incl. videos and troubleshooting guides).</p>
          <button type="button" class="btn btn-primary" style={{width:"140px"}}><a href="">Documentation</a></button>

        </div>
        <div>
          <h4>Get premium support</h4>
          <p style={{ height:"60px", marginBottom:"16px", marginTop:"16px"}}>Our support team is ready to help you out with any questions. Do not hesitate to contact us!</p>
          <button type="button" class="btn btn-primary" style={{width:"140px"}}><a href="">Support</a></button>
        </div>
      </div>
    </div> */}
    </>
  );
};

// export const bgCol = bgCol ;
// export const fontCol = fontCol ;
// export const setCol = () =>{
//   document.documentElement.style.setProperty('--bg-col', bgCol);
// }
export default App;


