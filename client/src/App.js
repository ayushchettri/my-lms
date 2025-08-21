import React, {useEffect, useState} from 'react'
import './App.css'
import './index.css'
import sistLogo from './image/sist-logo.png'
import aicte from './image/AICTE.png'
import rusa from './image/RUSA-ED.png'
import su from './image/SU.png'
import signIn from './image/login-avatar.png'

function App() {

  const [backendData, setBackendData] = useState([{}])
  useEffect(()=>{
    fetch("/api").then(
      response => response.json()
    ).then(
      data => {
        setBackendData(data)
      }
    )
  }, [])
  return (
    <div id="container">
      <nav id="topNav">
        <span id="topAddress"><p>Address: Chisopani, Jorethang, Sikkim-737121</p><p>Phone: +91 6294787509</p></span>
        <span>
          <button id="sign-in">Sign In</button>

        </span>
      </nav>
      <div id="midNav">
        <div id="sist-logo">
          <img src={sistLogo} alt="SIST-LOGO" />
        </div>
        <div id="three-logo">
          <img src={aicte} alt="AICTE" />
          <img src={su} alt="SU" />
          <img src={rusa} alt="RUSA-ED" />
        </div>
      </div>
      <nav id="bottomNav">
        <ul>
          <li><a href="#">HOME</a></li>
          <li><a href="#">ABOUT US</a></li>
          <li><a href="#">CONTACT US</a></li>
          <li><a href="#">DEVELOPER</a></li>
        </ul>
      </nav>
      <div id="main">
        <button><img src={signIn} alt="SIGN IN" />SIGN IN</button>
      </div>
    </div>
  )
}

export default App
