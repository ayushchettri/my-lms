import React from "react";
import Sidebar from "./sidebar";
import { Outlet } from "react-router-dom";
import "./Student.css";

const Layout = () => {
  return (
    <div className="student-layout">
      <Sidebar />
      <main className="student-main">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
