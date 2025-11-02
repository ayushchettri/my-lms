import React from "react";
import Sidebar from "./sidebar";
import { Outlet } from "react-router-dom";
import "./Admin.css";

const Layout = () => {
  return (
    <div className="admin-layout">
      <Sidebar />
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
