import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./admin/ProtectedRoute";

// Pages
import Home from './Home';
import DiamondMl from "./components/Pages/TopupML/DiamondMl";
import Login from './admin/views/pages/login/Login';
import Register from './admin/views/pages/register/Register';
import DefaultLayout from "./admin/layout/DefaultLayout";
import DiamonEpep from "./components/Pages/TopupEpep/DiamonEpep";
import DiamonHok from "./components/Pages/TopupHok/DiamonHok";
import DiamondPubg from "./components/Pages/TopupPubg/DiamondPubg";

// Admin pages
import Dashboard from "./admin/views/dashboard/Dashboard";
import RefensiTables from "./admin/views/referensi/RefensiTables"
import Invoice from "./components/Pages/Invoice";
import TransaksiPage from "./admin/views/referensi/Transaksi";
import ProductTable from "./admin/views/referensi/Products";
import User from "./admin/views/referensi/User";

export default function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/DiamondMl" element={<DiamondMl />} />
      <Route path="/DiamondEpep" element={<DiamonEpep />} />
      <Route path="/DiamonHok" element={<DiamonHok />} />
      <Route path="/DiamondPubg" element={<DiamondPubg />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/invoice" element={<Invoice />} />

      {/* Protected Admin Routes */}
      <Route path="/dashboard" element={<ProtectedRoute><DefaultLayout /></ProtectedRoute>}>
        <Route index element={<Dashboard />} />
      </Route>
      <Route path="/referensi" element={<ProtectedRoute><DefaultLayout /></ProtectedRoute>}>
        <Route path="tabel" element={<RefensiTables />} />
        <Route path="Transaksi" element={<TransaksiPage />} />
        <Route path="Product" element={<ProductTable />} />
        <Route path="User" element={<User />} />
      </Route>
    </Routes>
  );
}
