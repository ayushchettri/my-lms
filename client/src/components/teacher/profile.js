import React from "react";

const Profile = () => {
  return (
    <div className="profile-page">
      <header className="page-header">
        <h2>Teacher Profile</h2>
      </header>

      <div className="profile-card">
        <img
          src="https://via.placeholder.com/100"
          alt="Profile"
          className="profile-avatar"
        />
        <h3>Prof. Sharma</h3>
        <p>Department: Computer Science</p>
        <p>Email: sharma@sist.edu.in</p>
        <p>Experience: 8 years</p>
        <button className="edit-btn">Edit Profile</button>
      </div>
    </div>
  );
};

export default Profile;
