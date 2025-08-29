import React, {useEffect, useState} from 'react'
import './App.css'
import './index.css'
import logo from './image/sist-logo.png'
import bgImage from './image/sist-banner.jpg'

export function App () {
  const [menuOpen, setMenuOpen] = useState(false);
    return (
    <div className="container">
      {/* Navbar */}
      <header className="navbar">
        {/* Logo */}
        <div className="logo-section">
          <img src={logo} alt="Logo" className="logo" />
        </div>

        {/* Menu */}
        <nav className="menu">
          <a href="#home">Home</a>
          <a href="#about">About Us</a>
          <a href="#contact">Contact Us</a>
          <a href="#developers">Developers</a>
          <button className="login-btn">Login</button>
        </nav>
      </header>

      {/* Title */}
      <main className="main-section">
        <h1 className="title">
          SIST <span className="highlight">LMS</span>
        </h1>

        {/* Background Image Section */}
        <div className="image-container">
          <img src={bgImage} alt="Campus" className="main-image" />
          <button className="overlay-login-btn">Login</button>
        </div>

        {/* Footer Section */}
        <footer className="footer">
          <div className="footer1">
            <p className="college-name">Sikkim Institute of Science and Technology</p>
            <p className="address">Chisopani, Jorethang, Sikkim- 737121</p>
            <div className="social-icons">
              <a href="https://www.facebook.com/profile.php?id=100057201619385"><i className="fab fa-facebook"></i></a>
              <a href="https://www.instagram.com/sist__college2018"><i className="fab fa-instagram"></i></a>
            </div>
          </div>
          

          {/* Topics */}
          <div className="footer2">
            <p>Topic</p>
            <a href="https://sist.edu.in">About Us</a>
            <a href="#">Contact Us</a>
            <a href="#">Developers</a>
          </div>
        </footer>
      </main>
    </div>
  );


}

export default App
