// src/layouts/AdminLayout.jsx
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="admin-layout">
      <aside>Sidebar Admin</aside>
      <div className="content">
        <header>Navbar Admin</header>
        <Outlet />
      </div>
    </div>
  );
}
