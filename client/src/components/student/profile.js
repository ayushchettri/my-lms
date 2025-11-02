import React from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="profile-page">
      <header className="page-header">
        <h2>Profile / Settings</h2>
      </header>

      <div className="profile-card">
        <img
          src="https://via.placeholder.com/100"
          alt="Profile"
          className="profile-avatar"
        />
        <h3>Ayush Chettri</h3>
        <p>Registration No: 22CSEC34</p>
        <p>Email: ayushchettri@sist.edu.in</p>
        <p>Semester: 7</p>

        <button className="edit-btn">Edit Profile</button>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Profile;
