import React, { useState } from "react";
import Sidebar from "./sidebar";
import { Outlet } from "react-router-dom";
import "./Student.css";

const StudentLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="student-layout">
      {/* Toggle button for small screens */}
      <button
        className="sidebar-toggle"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        ☰
      </button>

      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} toggle={() => setSidebarOpen(false)} />

      {/* Main content */}
      <main className="main-content" onClick={() => setSidebarOpen(false)}>
        <Outlet />
      </main>
    </div>
  );
};

export default StudentLayout;
