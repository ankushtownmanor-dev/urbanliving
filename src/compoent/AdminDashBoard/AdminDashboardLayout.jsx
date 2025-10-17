import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import "./AdminDashboardLayout.css";

const AdminDashboardLayout = () => {
  return (
    <div className="admin-dashboard-layout">
      <Sidebar />
      <div className="admin-dashboard-content">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
