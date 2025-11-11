import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user"); // optional, if stored
    navigate("/");
  };

  useEffect(() => {
    const fetchStudentProfile = async () => {
      try {
        // ✅ Get stored user info
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
          console.error("No user found in localStorage");
          return;
        }

        // ✅ Use studentId (NOT user.id)
        const studentId = user.studentId;
        if (!studentId) {
          console.error("❌ studentId missing in localStorage user data");
          return;
        }

        console.log("📡 Fetching student profile for:", studentId);

        const response = await fetch(
          `http://localhost:4000/api/students/${studentId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load student data");
        }

        setStudent(data.data);
      } catch (error) {
        console.error("❌ Error fetching student profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentProfile();
  }, []);

  if (loading) return <p>Loading profile...</p>;
  if (!student) return <p>Failed to load profile</p>;

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
        <h3>{student.user?.name || "Unknown Name"}</h3>
        <p>Registration No: {student.id}</p>
        <p>Username: {student.user?.username || "N/A"}</p>
        <p>Semester: {student.semester || "N/A"}</p>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
