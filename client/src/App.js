import React, {useEffect, useState} from 'react'
import './App.css'
import './index.css'
import sistLogo from './image/sist-logo.png'
import aicte from './image/AICTE.png'
import rusa from './image/RUSA-ED.png'
import su from './image/SU.png'
import signIn from './image/login-avatar.png'

export function App () {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div id="container">
      {/* Top Navigation */}
      <nav id="topNav">
        <div id="topAddress">
          <p>Address: Chisopani, Jorethang, Sikkim-737121</p>
          <p>Phone: +91 6294787509</p>
        </div>
        <button id="sign-in">Sign In</button>
      </nav>

      {/* Mid Navigation */}
      <div id="midNav">
        <div className="logo-group">
          <img src={sistLogo} alt="SIST-LOGO" />
        </div>
        <div className="logo-group">
          <img src={aicte} alt="AICTE" />
          <img src={su} alt="SU" />
          <img src={rusa} alt="RUSA-ED" />
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav id="bottomNav">
        {/* Hamburger for Mobile */}
        <div
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Menu */}
        <ul className={menuOpen ? "active" : ""}>
          <li><a href="#">HOME</a></li>
          <li><a href="#">ABOUT US</a></li>
          <li><a href="#">CONTACT US</a></li>
          <li><a href="#">DEVELOPER</a></li>
        </ul>
      </nav>

      {/* Main Section */}
      <div id="main">
        <button>
          <img src={signIn} alt="SIGN IN" />
          SIGN IN
        </button>
      </div>
    </div>
  );

}

export default App
