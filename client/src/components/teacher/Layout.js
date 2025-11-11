import React, { useState } from "react";
import Sidebar from "./sidebar";
import { Outlet } from "react-router-dom";
import "./teacher.css";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="teacher-layout">
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
      <main className="teacher-main" onClick={() => setSidebarOpen(false)}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
