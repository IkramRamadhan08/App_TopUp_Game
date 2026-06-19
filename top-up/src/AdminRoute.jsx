// src/routes/AdminRoutes.jsx
import React from "react"
import { Outlet, Route, Routes } from "react-router-dom"
import Home from "./admin/pages/Dashboard/Dashboard"
import AppLayout from "./admin/layout/AppLayout"

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/admin" element={<AppLayout />}>
        <Route index element={<Home />} />
        {/* Tambahkan route admin lain di sini */}
      </Route>
    </Routes>
  )
}

export default AdminRoutes
