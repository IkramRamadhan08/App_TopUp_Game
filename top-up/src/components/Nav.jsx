import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ search = "", onSearch }) => {
  const navigate = useNavigate();

  return (
    <nav className="bg-blue-900 text-white p-4 flex items-center justify-between fixed top-0 w-full z-50 shadow-lg opacity-95">
      <Link to="/" className="flex items-center">
        <img src="/image/AKS.jpeg" alt="AKS Store Logo" className="h-14 w-auto" />
      </Link>
      <input
        type="text"
        placeholder="Cari Game atau Voucher"
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        className="ml-4 h-9 max-w-md w-full p-2 rounded-lg border bg-gray-800 text-white"
      />
      <div className="flex items-center space-x-4">
        <button
          onClick={() => {
            if (window.location.pathname === '/') {
              document.getElementById('games')?.scrollIntoView({ behavior: 'smooth' });
            } else {
              navigate('/');
            }
          }}
          className="hover:underline"
        >Topup</button>
        <Link to="/invoice" className="hover:underline">Cek Transaksi</Link>
        <div className="flex items-center space-x-2">
          <img src="https://flagcdn.com/id.svg" alt="Indonesia Flag" className="h-6 w-6" />
          <span>ID</span>
        </div>
        <Link to="/login" className="hover:underline">Masuk</Link>
        <Link to="/register" className="hover:underline">Daftar</Link>
      </div>
    </nav>
  );
};

export default Navbar;
