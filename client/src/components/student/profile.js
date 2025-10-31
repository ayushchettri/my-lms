import React from "react";

const Profile = () => {
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
      </div>
    </div>
  );
};

export default Profile;
