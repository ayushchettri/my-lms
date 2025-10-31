import React from "react";
import Sidebar from "./sidebar";
import { Outlet } from "react-router-dom";
import "./teacher.css";

const Layout = () => {
  return (
    <div className="teacher-layout">
      <Sidebar />
      <main className="teacher-main">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
