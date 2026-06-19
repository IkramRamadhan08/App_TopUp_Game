import React from "react";

const Navbar = () => {
  return (
   
    <nav className="bg-blue-900 text-white p-4 flex items-center justify-between fixed top-0 w-full z-50 shadow-lg opacity-95">
    <div className="flex items-center">
      <img src="https://placehold.co/40x40" alt="Hadi Store Logo" className="h-10 w-10" />
      <input
        type="text"
        placeholder="Cari Game atau Voucher"
        className="ml-4 h-9 w-full p-2 rounded-lg border bg-gray-800 text-white"
      />
    </div>
    <div className="flex items-center space-x-4">
      <a href="#" className="hover:underline">Topup</a>
      <a href="#" className="hover:underline">Cek Transaksi</a>
      <div className="flex items-center space-x-2">
        <img src="https://placehold.co/20x20" alt="Indonesia Flag" className="h-5 w-5" />
        <span>ID</span>
      </div>
      <a href="#" className="hover:underline">Masuk</a>
      <a href="#" className="hover:underline">Daftar</a>
    </div>
</nav>

  );
};

export default Navbar;
