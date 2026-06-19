// KonfirmasiPesanan.jsx
import React from "react";

const KonfirmasiPesanan = ({
  username,
  userId,
  server,
  totalDiamond,
  totalHarga,
  metodePembayaran,
  setMetodePembayaran,
  product,
  onClose,
  onSubmit
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white text-black p-6 rounded-lg w-[90%] max-w-md shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Konfirmasi Pesanan</h2>

        <div className="space-y-2 text-sm">
          <p><strong>Username:</strong> {username}</p>
          <p><strong>ID Pengguna:</strong> {userId}</p>
          <p><strong>Server:</strong> {server}</p>
          <p><strong>Jumlah Diamond:</strong> {totalDiamond}</p>
          <p><strong>Total Harga:</strong> Rp {totalHarga.toLocaleString()}</p>
          <p><strong>Produk:</strong> {product}</p>

          <div>
            <label className="block mb-1">Metode Pembayaran</label>
            <select
              className="bg-gray-100 w-full border px-2 py-1 rounded"
              value={metodePembayaran}
              onChange={(e) => setMetodePembayaran(e.target.value)}
            >
              <option value="">-- Pilih --</option>
              <option value="dana">DANA</option>
              <option value="gopay">GoPay</option>
              <option value="qris">QRIS</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-5">
          <button
            className="bg-gray-300 px-4 py-2 rounded"
            onClick={onClose}
          >
            Batal
          </button>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={onSubmit}
            disabled={!metodePembayaran}
          >
            Pesan Sekarang
          </button>
        </div>
      </div>
    </div>
  );
};

export default KonfirmasiPesanan;
