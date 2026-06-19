import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Edit3, Trash2 } from 'lucide-react';


const TransaksiPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // jumlah item per halaman

  const [transaksi, setTransaksi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [editData, setEditData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  

  const [form, setForm] = useState({
    nama: '',
    game_id: '',
    produk_type: '',
    server: '',
    jumlah: '',
    total_harga: '',
    payment_method: '',
    status_pembayaran: 'UNPAID',
    status_transaksi: 'PENDING',
  });

  // ✅ Fetch Data
  const fetchTransaksi = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get('http://localhost:8000/api/transaksi');
      setTransaksi(res.data);
    } catch (error) {
      console.error('Gagal memuat data transaksi', error);
    } finally {
      setIsLoading(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransaksi();
  }, []);

  // ✅ Handle Input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editData) {
        await axios.put(`http://localhost:8000/api/transaksi/${editData.id}`, form);
      } else {
        await axios.post('http://localhost:8000/api/transaksi', form);
      }

      setForm({
        nama: '',
        game_id: '',
        produk_type: '',
        server: '',
        jumlah: '',
        total_harga: '',
        payment_method: '',
        status_pembayaran: 'UNPAID',
        status_transaksi: 'PENDING',
      });
      setEditData(null);
      fetchTransaksi(); // ✅ Refresh setelah simpan
    } catch (err) {
      console.error('Gagal menyimpan data transaksi', err);
    }
  };

  // // ✅ Edit
  // const handleEdit = (data) => {
  //   setEditData(data);
  //   setForm(data);
  // };

  // ✅ Hapus
  const handleDelete = async (id) => {
    if (!window.confirm('Yakin ingin menghapus transaksi ini?')) return;
    try {
      await axios.delete(`http://localhost:8000/api/transaksi/${id}`);
      alert('Transaksi berhasil dihapus.');
      fetchTransaksi(); // ✅ Auto-refresh
    } catch (error) {
      console.error('Gagal menghapus transaksi:', error);
      alert('Gagal menghapus transaksi.');
    }
  };

  // Filter data sesuai search
const filteredTransaksi = transaksi.filter((t) =>
  t.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
  t.game_id.includes(searchTerm) ||
  t.payment_method.toLowerCase().includes(searchTerm.toLowerCase())
);

// Pagination
const totalPages = Math.ceil(filteredTransaksi.length / itemsPerPage);
const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentItems = filteredTransaksi.slice(indexOfFirstItem, indexOfLastItem);

const handleEdit = (data) => {
  setEditData(data);
  setForm(data);
  setIsEditing(true);
};

const getBadgeClass = (status, type) => {
  if (type === "bayar") {
    switch (status.toUpperCase()) {
      case "PAID": return "bg-green-100 text-green-700";
      case "UNPAID": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  }

  if (type === "transaksi") {
    switch (status.toUpperCase()) {
      case "SUCCESS": return "bg-green-100 text-green-700";
      case "PENDING": return "bg-yellow-100 text-yellow-700";
      case "FAILED": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  }

  return "bg-gray-100 text-gray-700";
};




  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Data Transaksi</h2>

      {/* Form */}
      {isEditing && (
  <form className="bg-white shadow rounded p-4 mb-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <input name="nama" value={form.nama} onChange={handleChange} placeholder="Nama" className="p-2 border rounded" />
          <input name="game_id" value={form.game_id} onChange={handleChange} placeholder="Game ID" className="p-2 border rounded" />
          <input name="produk_type" value={form.produk_type} onChange={handleChange} placeholder="Produk Type" className="p-2 border rounded" />
          <input name="server" value={form.server} onChange={handleChange} placeholder="Server" className="p-2 border rounded" />
          <input name="jumlah" value={form.jumlah} onChange={handleChange} placeholder="Jumlah" type="number" className="p-2 border rounded" />
          <input name="total_harga" value={form.total_harga} onChange={handleChange} placeholder="Total Harga" type="number" className="p-2 border rounded" />
          <input name="payment_method" value={form.payment_method} onChange={handleChange} placeholder="Metode Pembayaran" className="p-2 border rounded" />
          <select name="status_pembayaran" value={form.status_pembayaran} onChange={handleChange} className="p-2 border rounded">
            <option value="UNPAID">UNPAID</option>
            <option value="PAID">PAID</option>
          </select>
          <select name="status_transaksi" value={form.status_transaksi} onChange={handleChange} className="p-2 border rounded">
            <option value="PENDING">PENDING</option>
            <option value="SUCCESS">SUCCESS</option>
            <option value="FAILED">FAILED</option>
          </select>
        </div>
        <button type="submit" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          {editData ? 'Update' : 'Tambah'} Transaksi
        </button>

        {isEditing && (
  <button
    type="button"
    onClick={() => {
      setIsEditing(false);
      setEditData(null);
      setForm({
        nama: '', game_id: '', produk_type: '', server: '',
        jumlah: '', total_harga: '', payment_method: '',
        status_pembayaran: 'UNPAID', status_transaksi: 'PENDING'
      });
    }}
    className="mt-2 ml-4 px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
  >
    Batal
  </button>
)}

      </form>

    )}

      {/* Table */}
      {isLoading ? (
        <div className="text-center py-6">Memuat data transaksi...</div>
      ) : (
        <div className="overflow-x-auto max-w-full shadow rounded">
             <div className="flex items-center border rounded px-3 py-1 mb-4 w-full max-w-md bg-white shadow-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Cari Nama / Game ID / Metode"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // reset ke halaman 1 saat filter
              }}
              className="ml-2 outline-none w-full text-sm"
            />
          </div>


         <table className="w-full table-fixed bg-white rounded shadow">
    <thead className="bg-blue-800 text-white">
      <tr>
        <th className="py-2 px-4 w-28">Aksi</th>
        <th className="py-2 px-4 w-32">Nama</th>
        <th className="py-2 px-4 w-32">No Hp</th>
        <th className="py-2 px-4 w-36">Game ID</th>
        <th className="py-2 px-4 w-36">Tipe Produk</th>
        <th className="py-2 px-4 w-28">Server</th>
        <th className="py-2 px-4 w-24">Jumlah</th>
        <th className="py-2 px-4 w-32">Total Harga</th>
        <th className="py-2 px-4 w-28">Metode</th>
        <th className="py-2 px-4 w-28">Status Bayar</th>
        <th className="py-2 px-4 w-28">Status</th>
      </tr>
    </thead>
    <tbody>
      {currentItems.map((t) => (
        <tr key={t.id} className="border-b hover:bg-gray-100 text-sm">
           <td className="py-2 px-4 flex gap-2">
            <button onClick={() => handleEdit(t)} className="text-blue-600 hover:text-blue-800">
              <Edit3 size={18} />
            </button>
            <button onClick={() => handleDelete(t.id)} className="text-red-600 hover:text-red-800">
              <Trash2 size={18} />
            </button>
          </td>
          <td className="py-2 px-4 truncate">{t.nama}</td>
          <td className="py-2 px-4 truncate">{t.nohp}</td>
          <td className="py-2 px-4 truncate">{t.game_id}</td>
          <td className="py-2 px-4 truncate">{t.produk_type}</td>
          <td className="py-2 px-4 truncate">{t.server}</td>
          <td className="py-2 px-4 truncate">{t.jumlah}</td>
          <td className="py-2 px-4 truncate">Rp {parseInt(t.total_harga).toLocaleString()}</td>
          <td className="py-2 px-4 truncate">{t.payment_method}</td>
          <td className="py-2 px-4">
            <span className={`px-2 py-1 rounded text-xs font-semibold ${getBadgeClass(t.status_pembayaran, "bayar")}`}>
              {t.status_pembayaran}
            </span>
          </td>

          <td className="py-2 px-4">
            <span className={`px-2 py-1 rounded text-xs font-semibold ${getBadgeClass(t.status_transaksi, "transaksi")}`}>
              {t.status_transaksi}
            </span>
          </td>
          <td className="py-2 px-4 space-x-2">
          </td>
        </tr>
      ))}
    </tbody>
  </table>
  <div className="flex justify-center mt-4 gap-2">
  <button
    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
    disabled={currentPage === 1}
    className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
  >
    Prev
  </button>

  {[...Array(totalPages)].map((_, idx) => (
    <button
      key={idx}
      onClick={() => setCurrentPage(idx + 1)}
      className={`px-3 py-1 rounded ${currentPage === idx + 1 ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
    >
      {idx + 1}
    </button>
  ))}

  <button
    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
    disabled={currentPage === totalPages}
    className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
  >
    Next
  </button>
</div>

  </div>
      )}
    </div>
  );
};

export default TransaksiPage;
