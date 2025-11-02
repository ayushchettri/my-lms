import React from "react";

const Dashboard = () => {
  return (
    <div className="dashboard-page">
      <header className="page-header">
        <h2>Admin Dashboard</h2>
        <p>Welcome back, <strong>Administrator</strong> 👋</p>
      </header>

      <section className="dashboard-stats">
        <div className="stat-card">
          <h3>👩‍🎓 Total Students</h3>
          <p>39</p>
        </div>
        <div className="stat-card">
          <h3>👨‍🏫 Total Teachers</h3>
          <p>7</p>
        </div>
        <div className="stat-card">
          <h3>📚 Total Courses</h3>
          <p>8</p>
        </div>
      </section>

      <section className="admin-overview">
        <h3>System Overview</h3>
        <ul>
          <li>Attendance reports accessible by semester</li>
          <li>Course creation and teacher assignment</li>
          <li>Full visibility of LMS activities</li>
        </ul>
      </section>
    </div>
  );
};

export default Dashboard;
