import React, {useEffect, useState} from 'react'
import './App.css'
import './index.css'
import logo from './image/sist-logo.png'
import bgImage from './image/sist-banner.jpg'
import about from './image/about-us.png'
import photo from './image/login-avatar.png'

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
          <a href="#">Home</a>
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

        {/* About Section */}
      <section id="about" className="section about">
        <h2>ABOUT <span className="highlight">US</span></h2>
        <div className='section-items'>
          <img src={about} alt="CAMPUS" />
        <p>
          SIST is the only State Engineering Degree College of Sikkim located at Chisopani, South Sikkim. The institute is affiliated to Central University Sikkim popularly known as Sikkim University. The institute is established in 2018 under RUSA project, and it offers B.Tech in Civil Engineering and Computer Engineering. SIST is AICTE approved state goverment engineering college.
        </p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section contact">
        <h2><span className="highlight">CONTACT</span> US</h2>
        <div className='section-items'>
        <p>
          Address: Chisopani, Jorethang, Sikkim - 737121 <br /><br />
          Phone: <br /> +101-1231-4321 <br />
                +91-78729-64854 <br />
                 +91-89064-91667 <br />
                 +91-89182-58002 <br />
                 +91-70291-52737 <br /><br />
          Email: sist.sikkim@gmail.com
        </p>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2111.0030400787814!2d88.30286463261534!3d27.147800865109033!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e429d6057e8bcf%3A0x5a8ed437159b06d7!2sSikkim%20Institute%20of%20Science%20and%20Technology!5e0!3m2!1sen!2sin!4v1756550273009!5m2!1sen!2sin"></iframe>
        </div>
      </section>

      {/* Developers Section */}
      <section id="developers" className="section developers">
        <h2>DEVELOPED <span className="highlight">BY</span></h2>
        <div className="section-items">
          <div id='asish-shakya' className="developer-items">
            <img src={photo} alt="ASISH SHAKYA" />
            <div className='dev-details'>
              <h2>PROJECT <span className='highlight'>GUIDE</span></h2>
              <h3>ASISH SHAKYA</h3>
              <p>Assistant Professor, Computer Department</p>
              <div className="social-icons">
              <a href="#"><i className="fab fa-facebook"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-github"></i></a>
              <a href="#"><i className="fab fa-linkedin"></i></a>
            </div>
            </div>
          </div>
          <div id='ayush-chettri' className="developer-items">
            <div className='dev-details'>
              <h2>BACK<span className='highlight'>END</span></h2>
              <h3>AYUSH CHETTRI</h3>
              <p>Student, Computer Department</p>
              <div className="social-icons">
              <a href="https://www.facebook.com/rhoni.chhetri/"><i className="fab fa-facebook"></i></a>
              <a href="https://www.instagram.com/ayushchettri47"><i className="fab fa-instagram"></i></a>
              <a href="https://www.github.com/ayushchettri"><i className="fab fa-github"></i></a>
              <a href="https://www.linkedin.com/in/ayush-chettri"><i className="fab fa-linkedin"></i></a>
            </div>
            </div>
            <img src={photo} alt="AYUSH CHETTRI" />
          </div>
          <div id='ashish-sunar' className="developer-items">
            <img src={photo} alt="ASISH SUNAR" />
            <div className='dev-details'>
              <h2>FRONT<span className='highlight'>END</span></h2>
              <h3>ASHISH SUNAR</h3>
              <p>Student, Computer Department</p>
              <div className="social-icons">
              <a href="#"><i className="fab fa-facebook"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-github"></i></a>
              <a href="#"><i className="fab fa-linkedin"></i></a>
            </div>
            </div>
          </div>
          <div id='aakansh-rai' className="developer-items">
            <div className='dev-details'>
              <h2>DATA<span className='highlight'>BASE</span></h2>
              <h3>AAKANSH RAI</h3>
              <p>Student, Computer Department</p>
              <div className="social-icons">
              <a href="#"><i className="fab fa-facebook"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-github"></i></a>
              <a href="#"><i className="fab fa-linkedin"></i></a>
            </div>
            </div>
            <img src={photo} alt="AAKANSH RAI" />
          </div>
        </div>
      </section>

        {/* Footer Section */}
        <footer className="footer">
          <div className="footer1">
            <a className="colege-name" href="https://sist.edu.in/">Sikkim Institute of Science and Technology</a>
            <p className="address">Chisopani, Jorethang, Sikkim- 737121</p>
            <div className="social-icons">
              <a href="https://www.facebook.com/profile.php?id=100057201619385"><i className="fab fa-facebook"></i></a>
              <a href="https://www.instagram.com/sist__college2018"><i className="fab fa-instagram"></i></a>
              <a href="https://www.youtube.com/@sistcollege"><i className="fab fa-youtube"></i></a>
            </div>
          </div>
          <p>&copy; 2025 SIST LMS. All rights reserved.</p>
        </footer>
      </main>
    </div>
  );


}

export default App
