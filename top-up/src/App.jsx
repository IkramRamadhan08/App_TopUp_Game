import { Routes, Route } from "react-router-dom";

// Pages
import Home from './Home';
import DiamondMl from "./components/Pages/TopupML/DiamondMl";
import Login from './admin/views/pages/login/Login';
import Register from './admin/views/pages/register/Register';
import DefaultLayout from "./admin/layout/DefaultLayout";
import DiamonEpep from "./components/Pages/TopupEpep/DiamonEpep";
import DiamonHok from "./components/Pages/TopupHok/DiamonHok";

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
      <Route path="/DiamonHok" element={< DiamonHok/>} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/invoice" element={<Invoice />} />

      {/* Admin Routes with layout */}
      <Route path="*" element={<DefaultLayout />}>
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="referensi/tabel" element={<RefensiTables />} />
       <Route path="referensi/Transaksi" element={<TransaksiPage />} />
       <Route path="referensi/Product" element={<ProductTable />} />
       <Route path="referensi/User" element={< User/>} />
    </Route>

      {/* Fallback 404 */}
      {/* <Route path="*" element={<h1>404 - Page Not Found</h1>} /> */}
    </Routes>
  );
}
