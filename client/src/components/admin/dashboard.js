import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminDashboard = () => {
  const [adminName, setAdminName] = useState("");
  const [stats, setStats] = useState({
    students: 0,
    teachers: 0,
    courses: 0,
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.name) {
      setAdminName(storedUser.name);
    }

    const fetchStats = async () => {
      try {
        const [studentRes, teacherRes, courseRes] = await Promise.all([
          axios.get("http://localhost:4000/api/students"),
          axios.get("http://localhost:4000/api/teachers"),
          axios.get("http://localhost:4000/api/courses"),
        ]);
        console.log(studentRes);
        setStats({
          students: studentRes.data.data?.length || 0,
          teachers: teacherRes.data.data?.length || 0,
          courses: courseRes.data.data?.length || 0,
        });
      } catch (error) {
        console.error("❌ Error fetching dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <p>Loading dashboard...</p>;

  return (
    <div className="dashboard-page">
      <header className="page-header">
        <h2>Admin Dashboard</h2>
        <p>
          Welcome back, <strong>{adminName || "Administrator"}</strong> 👋
        </p>
      </header>

      <section className="dashboard-stats">
        <div className="stat-card" onClick={() => navigate(`/admin/students`)}>
          <h3>👩‍🎓 Total Students</h3>
          <p>{stats.students}</p>
        </div>
        <div className="stat-card" onClick={() => navigate(`/admin/teachers`)}>
          <h3>👨‍🏫 Total Teachers</h3>
          <p>{stats.teachers}</p>
        </div>
        <div className="stat-card" onClick={() => navigate(`/admin/courses`)}>
          <h3>📚 Total Courses</h3>
          <p>{stats.courses}</p>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
