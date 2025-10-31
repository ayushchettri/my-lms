import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="teacher-sidebar">
      <h2 className="sidebar-logo">SIST <span>LMS</span></h2>
      <nav className="sidebar-nav">
        <NavLink to="/teacher/dashboard" className="nav-item">🏠 Dashboard</NavLink>
        <NavLink to="/teacher/attendance" className="nav-item">📊 Attendance</NavLink>
        <NavLink to="/teacher/courses" className="nav-item">📚 Courses</NavLink>
        <NavLink to="/teacher/assignments" className="nav-item">📝 Assignments</NavLink>
        <NavLink to="/teacher/profile" className="nav-item">⚙️ Profile</NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
