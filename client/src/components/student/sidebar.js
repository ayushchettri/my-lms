import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="student-sidebar">
      <h2 className="sidebar-logo">SIST <span>LMS</span></h2>
      <nav className="sidebar-nav">
        <NavLink to="/student/dashboard" end className="nav-item">
          🏠 Dashboard
        </NavLink>
        <NavLink to="/student/attendance" className="nav-item">
          📊 Attendance
        </NavLink>
        <NavLink to="/student/courses" className="nav-item">
          📚 Courses
        </NavLink>
        <NavLink to="/student/assignments" className="nav-item">
          📝 Assignments
        </NavLink>
        <NavLink to="/student/profile" className="nav-item">
          ⚙️ Profile
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;

