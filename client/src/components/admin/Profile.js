import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminProfile = () => {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      navigate("/");
      return;
    }

    const fetchAdminProfile = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/api/admins/${storedUser.id}`
        );
        setAdmin(res.data.data);
      } catch (error) {
        console.error("❌ Error fetching admin profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminProfile();
  }, [navigate]);

  if (loading) return <p>Loading profile...</p>;
  if (!admin) return <p>Profile not found.</p>;

  return (
    <div className="profile-page">
      <header className="page-header">
        <h2>Admin Profile</h2>
      </header>

      <div className="profile-card">
        <img
          src="https://via.placeholder.com/100"
          alt="Profile"
          className="profile-avatar"
        />
        <h3>{admin.name || "Admin"}</h3>
        <p>Username: {admin.username}</p>
        <p>Role: {admin.role}</p>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminProfile;
