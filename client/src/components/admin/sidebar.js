import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="admin-sidebar">
      <h2 className="sidebar-logo">SIST <span>LMS</span></h2>
      <nav className="sidebar-nav">
        <NavLink to="/admin/dashboard" className="nav-item">🏠 Dashboard</NavLink>
        <NavLink to="/admin/attendance" className="nav-item">📊 Attendance</NavLink>
        <NavLink to="/admin/courses" className="nav-item">📚 Courses</NavLink>
        <NavLink to="/admin/teachers" className="nav-item">🧑‍🏫 Teachers</NavLink>
        <NavLink to="/admin/students" className="nav-item">🧑‍🎓 Students</NavLink>
        <NavLink to="/admin/profile" className="nav-item">⚙️ Profile</NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
