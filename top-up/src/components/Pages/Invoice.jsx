import React from 'react';
import { useLocation} from 'react-router-dom';
import useState from 'react'

const Invoice = () => {
  const location = useLocation();
  const data = location.state?.invoice;
  

  if (!data) return <p className="text-center text-red-500 mt-10">Data invoice tidak tersedia.</p>;

  

  // Fungsi untuk menentukan warna status
  const getStatusColor = (status) => {
    switch (status?.toUpperCase()) {
      case 'SETTLEMENT': return 'text-green-400';
      case 'PENDING': return 'text-yellow-400';
      case 'EXPIRE':
      case 'CANCEL':
      case 'FAILED': return 'text-red-400';
      default: return 'text-white';
    }
  };

  return (
    <div className="bg-[#0d1117] text-white min-h-screen px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">
          Invoice <span className="text-yellow-400">#{data.invoice_number}</span>
        </h1>

        <div className="grid md:grid-cols-2 gap-6 bg-[#1a1f2b] p-6 rounded-xl">
          {/* Informasi Akun */}
          <div className="space-y-2">
            <h2 className="text-xl font-semibold mb-2">Informasi Akun</h2>
            <p><strong>Nickname:</strong> {data.nickname || '-'}</p>
            <p><strong>Nama:</strong> {data.nama}</p>
            <p><strong>Tipe produk:</strong> {data. produk_type}</p>
            <p><strong>ID Game:</strong> {data.game_id}</p>
            <p><strong>Server:</strong> {data.server}</p>
            <p><strong>No HP:</strong> {data.nohp}</p>
            <p><strong>Jumlah Diamond:</strong> {data.jumlah}</p>
          </div>

          {/* Informasi Pembayaran */}
          <div className="space-y-2">
            <h2 className="text-xl font-semibold mb-2">Informasi Pembayaran</h2>
            <p><strong>Metode:</strong> {data.payment_method?.toUpperCase()}</p>
            <p><strong>Status Pembayaran:</strong> <span className={getStatusColor(data.status_pembayaran)}>{data.status_pembayaran}</span></p>
            <p><strong>Status Transaksi:</strong> <span className="text-yellow-400">{data.status_transaksi}</span></p>
            <p><strong>Total Harga:</strong> Rp {Number(data.total_harga).toLocaleString()}</p>
          </div>
        </div>

        {/* QR atau Info Tambahan */}
        <div className="text-center mt-10">
          <h2 className="text-xl font-semibold mb-4">QR Pembayaran</h2>
          <img src="/image/qris.png" alt="QR Pembayaran" className="mx-auto w-48 h-48 rounded-md bg-white p-2" />
          <a
            href="/image/qris.png"
            download={`qris-${data.invoice_number}.png`}
            className="mt-4 inline-block bg-yellow-500 hover:bg-yellow-600 text-black py-2 px-4 rounded-md"
          >
            Unduh Kode QR
          </a>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
