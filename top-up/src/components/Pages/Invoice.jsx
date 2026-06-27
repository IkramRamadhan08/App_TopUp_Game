import React, { useState, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import axios from 'axios';

const Invoice = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [data, setData] = useState(location.state?.invoice || null);
  const [invoiceInput, setInvoiceInput] = useState(searchParams.get('order_id') || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchInvoice = async (invoiceNumber) => {
    if (!invoiceNumber) return;
    setLoading(true);
    setError('');
    try {
      const res = await axios.get(`/api/cek-status/${invoiceNumber}`);
      setData(res.data.data);
    } catch {
      setError('Invoice tidak ditemukan');
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const orderId = searchParams.get('order_id');
    if (orderId) {
      setInvoiceInput(orderId);
      fetchInvoice(orderId);
    }
  }, [searchParams]);

  const getStatusColor = (status) => {
    switch (status?.toUpperCase()) {
      case 'SETTLEMENT': case 'PAID': return 'text-green-400';
      case 'PENDING': return 'text-yellow-400';
      case 'EXPIRE': case 'CANCEL': case 'FAILED': return 'text-red-400';
      default: return 'text-white';
    }
  };

  if (!data) {
    return (
      <div className="bg-[#0d1117] text-white min-h-screen px-6 py-10">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Cek Transaksi</h1>
          <input
            type="text"
            placeholder="Masukkan nomor invoice (INV-...)"
            value={invoiceInput}
            onChange={(e) => setInvoiceInput(e.target.value)}
            className="w-full p-3 rounded bg-gray-800 text-white border border-gray-600 mb-4"
          />
          <button
            onClick={() => fetchInvoice(invoiceInput)}
            disabled={loading || !invoiceInput}
            className="bg-yellow-500 text-black px-6 py-2 rounded font-semibold hover:bg-yellow-600 disabled:opacity-50"
          >
            {loading ? 'Mencari...' : 'Cari'}
          </button>
          {error && <p className="text-red-400 mt-4">{error}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0d1117] text-white min-h-screen px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">
          Invoice <span className="text-yellow-400">#{data.invoice_number}</span>
        </h1>

        <div className="grid md:grid-cols-2 gap-6 bg-[#1a1f2b] p-6 rounded-xl">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold mb-2">Informasi Akun</h2>
            <p><strong>Nama:</strong> {data.nama}</p>
            <p><strong>Tipe produk:</strong> {data.produk_type}</p>
            <p><strong>ID Game:</strong> {data.game_id}</p>
            <p><strong>Server:</strong> {data.server}</p>
            <p><strong>No HP:</strong> {data.nohp}</p>
            <p><strong>Jumlah:</strong> {data.jumlah}</p>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-semibold mb-2">Informasi Pembayaran</h2>
            <p><strong>Metode:</strong> {data.payment_method?.toUpperCase()}</p>
            <p><strong>Status Pembayaran:</strong> <span className={getStatusColor(data.status_pembayaran)}>{data.status_pembayaran}</span></p>
            <p><strong>Status Transaksi:</strong> <span className="text-yellow-400">{data.status_transaksi}</span></p>
            <p><strong>Total Harga:</strong> Rp {Number(data.total_harga).toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
