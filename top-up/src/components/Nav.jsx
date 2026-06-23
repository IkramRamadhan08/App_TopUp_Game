import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ search = "", onSearch }) => {
  const navigate = useNavigate();

  return (
    <nav className="bg-blue-900 text-white p-4 flex items-center justify-between fixed top-0 w-full z-50 shadow-lg opacity-95">
      <Link to="/" className="flex items-center">
        <img src="https://placehold.co/40x40" alt="AKS Store Logo" className="h-10 w-10" />
      </Link>
      <input
        type="text"
        placeholder="Cari Game atau Voucher"
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        className="ml-4 h-9 max-w-md w-full p-2 rounded-lg border bg-gray-800 text-white"
      />
      <div className="flex items-center space-x-4">
        <Link to="/" className="hover:underline">Topup</Link>
        <Link to="/invoice" className="hover:underline">Cek Transaksi</Link>
        <div className="flex items-center space-x-2">
          <img src="https://placehold.co/20x20" alt="Indonesia Flag" className="h-5 w-5" />
          <span>ID</span>
        </div>
        <Link to="/login" className="hover:underline">Masuk</Link>
        <Link to="/register" className="hover:underline">Daftar</Link>
      </div>
    </nav>
  );
};

export default Navbar;
