import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TeacherProfile = () => {
  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  useEffect(() => {
    const fetchTeacherProfile = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
          console.error("No user found in localStorage");
          return;
        }

        const teacherId = user.teacherId;
        if (!teacherId) {
          console.error("❌ teacherId missing in localStorage user data");
          return;
        }

        console.log("📡 Fetching teacher profile for:", teacherId);

        const response = await fetch(
          `http://localhost:4000/api/teachers/${teacherId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load teacher profile");
        }

        setTeacher(data.data);
      } catch (error) {
        console.error("❌ Error fetching teacher profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeacherProfile();
  }, []);

  if (loading) return <p>Loading profile...</p>;
  if (!teacher) return <p>Failed to load teacher profile</p>;

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
        <h3>{teacher.user?.name || "Unknown Name"}</h3>
        <p>Teacher Code: {teacher.id}</p>
        <p>Username: {teacher.user?.username || "N/A"}</p>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default TeacherProfile;
