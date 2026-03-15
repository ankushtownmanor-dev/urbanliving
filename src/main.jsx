// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// import ReactGA from "react-ga4";

// ReactGA.initialize("G-FPLVT7TZ2L");

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )



import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ReactGA from "react-ga4";
import OneSignal from "react-onesignal";

ReactGA.initialize("G-FPLVT7TZ2L");
OneSignal.init({
  appId: "94be9ed7-5b37-41b7-bcf3-0903cce5cf2c",
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
