import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import "./Admin.css";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className={`admin-layout ${sidebarOpen ? "sidebar-open" : ""}`}>
      <div
        className={`menu-toggle`}
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        ☰
      </div>

      <aside className={`admin-sidebar ${sidebarOpen ? "active" : ""}`}>
        <h2 className="sidebar-logo">
          SIST<span>LMS</span>
        </h2>
        <nav className="sidebar-nav">
        <NavLink to="/admin/dashboard" className="nav-item">🏠 Dashboard</NavLink>
        <NavLink to="/admin/attendance" className="nav-item">📊 Attendance</NavLink>
        <NavLink to="/admin/courses" className="nav-item">📚 Courses</NavLink>
        <NavLink to="/admin/teachers" className="nav-item">🧑‍🏫 Teachers</NavLink>
        <NavLink to="/admin/students" className="nav-item">🧑‍🎓 Students</NavLink>
        <NavLink to="/admin/profile" className="nav-item">⚙️ Profile</NavLink>
        </nav>
      </aside>

      {/* Overlay for mobile */}
      <div
        className={`sidebar-overlay ${sidebarOpen ? "active" : ""}`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
