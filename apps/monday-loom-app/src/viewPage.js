import React from 'react';
import './App.css';
import logo from './logoApp_new.png'
const ViewPage = ({fontCol, bgCol}) => {
  return (
    <div>
    <div className='center-container'>
<p style={{ height:"29px", color:fontCol }}>As a viewer,  you are unable to use the Loom app for Monday.</p>

</div>
<img className='viewimg' src={logo} style={{ height:"70px",width:"70px"}}></img>
</div>
  );
};

export default ViewPage;
