import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Header from './Header'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Header />
  </React.StrictMode>
);
// export {default as Header} from './Header'
export { Header }; 