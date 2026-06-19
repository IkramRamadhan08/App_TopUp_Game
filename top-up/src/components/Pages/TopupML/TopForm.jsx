import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTransaksi } from "../KonfirmasiPesanan/Transaksi";
import Footer from "../../Footer"

const SnapCheckout = ({ invoiceNumber, snapToken, onStatusCheck }) => {
  useEffect(() => {
    if (window.snap && snapToken) {
      window.snap.pay(snapToken, {
        onSuccess: () => console.log("Pembayaran sukses"),
        onPending: () => console.log("Pembayaran pending"),
        onClose: () => console.log("Snap ditutup"),
      });
    }
  }, [snapToken]);

  return (
    <div className="mt-4 text-center">
      <button
        onClick={onStatusCheck}
        className="bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-600"
      >
        Check Status Sekarang
      </button>
    </div>
  );
};

const TopupForm = ({ gameType = "mobilelegend", gameLogo = "../image/logomlbb.webp" }) => {
  const [jumlah, setJumlah] = useState(1);
  const [hargaPerDiamond, setHargaPerDiamond] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [totalHarga, setTotalHarga] = useState(hargaPerDiamond);
  const [selectedDiamond, setSelectedDiamond] = useState(null);
  const [PerDiamond, setPerDiamond] = useState(0);
  const [totalDiamond, setTotalDiamond] = useState(PerDiamond);
  const [products, setProducts] = useState([]);
  const [metodePembayaran, setMetodePembayaran] = useState("");

  const [id, setId] = useState("");
  const [nama, setNama] = useState("");
  const [server, setServer] = useState("");
  const [nohp, setNohp] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [selectedProductId, setSelectedProductId] = useState(null);
  const selectedProduct = products[selectedDiamond];

  const [snapToken, setSnapToken] = useState(null);
  const [invoiceNumber, setInvoiceNumber] = useState(null);
  const [showSnap, setShowSnap] = useState(false);

  const navigate = useNavigate();

  const tambahJumlah = () => {
    const newJumlah = jumlah + 1;
    setJumlah(newJumlah);
    setTotalHarga(newJumlah * hargaPerDiamond);

    const jumlahDiamond = parseInt(products[selectedDiamond]?.name) || 0;
    setTotalDiamond(newJumlah * jumlahDiamond);
  };

  const kurangJumlah = () => {
    if (jumlah > 1) {
      const newJumlah = jumlah - 1;
      setJumlah(newJumlah);
      setTotalHarga(newJumlah * hargaPerDiamond);

      const jumlahDiamond = parseInt(products[selectedDiamond]?.name) || 0;
      setTotalDiamond(newJumlah * jumlahDiamond);
    }
  };

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get(`http://localhost:8000/api/products?type=${gameType}`);
        setProducts(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    }
    fetchProducts();
  }, [gameType]);

  const username = `${id} (${server})`;
  const userId = id;
  const jumlahDiamond = totalDiamond;

  const handleSelectProduct = (product) => {
    setSelectedProductId(product.id);
    console.log("ID produk yang dipilih:", product.id);
  };

  const handlePesanSekarang = async () => {
    const selectedProduct = products[selectedDiamond];

    const payload = {
      produk_id: selectedProductId,
      produk_type: selectedProduct.type,
      game_id: id,
      server: server,
      nama: nama,
      jumlah: totalDiamond,
      total_harga: totalHarga,
      payment_method: metodePembayaran,
      nohp: nohp
    };

    console.log("Payload yang dikirim:", payload);

    try {
      const res = await axios.post("http://localhost:8000/api/transaksi", payload);
      const { snap_token, invoice } = res.data.data;

      setShowModal(false);
      window.snap.pay(snap_token, {
        onSuccess: function (result) {
          console.log("Pembayaran sukses", result);
          navigate("/invoice", { state: { invoice } });
        },
        onPending: function (result) {
          console.log("Pembayaran pending", result);
          navigate("/invoice", { state: { invoice } });
        },
        onError: function (result) {
          console.error("Error pembayaran", result);
          alert("Terjadi kesalahan saat pembayaran.");
        },
        onClose: function () {
          console.warn("Pengguna menutup Snap sebelum bayar.");
        }
      });
    } catch (err) {
      console.error("Gagal buat transaksi", err);
      if (err.response?.status === 422) {
        alert("Input tidak valid: " + JSON.stringify(err.response.data.errors));
      } else {
        alert("Gagal memproses transaksi.");
      }
    }
  };

  const { invoice, loading, submitTransaksi } = useTransaksi();

  return (
    <div>
      <div className="bg-gradient-to-br from-blue-900 to-blue-600 text-white min-h-screen flex flex-col">
      <header className="bg-black p-4 flex items-center justify-between">
        <div className="flex items-center">
          <img src="https://placehold.co/40x40" alt="Logo" className="mr-4" />
          <input
            type="text"
            placeholder="Cari Game atau Voucher"
            className="bg-gray-800 text-white p-2 rounded w-80"
          />
        </div>
      </header>

      <nav className="bg-gray-800 p-2 flex space-x-4">
        <a href="#" className="text-yellow-400">Topup</a>
        <a href="#" className="text-white">Cek Transaksi</a>
        <a href="#" className="text-white">Leaderboard</a>
        <a href="#" className="text-white">Artikel</a>
        <a href="#" className="text-white">Gift Skin</a>
        <a href="#" className="text-white">Kalkulator</a>
      </nav>

       <div className="bg-blue-700 text-white rounded-t-lg flex items-center">
            <div className="bg-blue-700 rounded-full w-8 h-8 flex items-center justify-center font-bold">1</div>
            <div className="ml-2 font-semibold">Masukkan Data Akun</div>
          </div>

          <div className="bg-slate-950 p-4 rounded-b-lg">
            <div className="flex-row gap-7">
              <div>
                <label className="block text-sm font-medium mb-2">Nama</label>
                <input
                  type="text"
                  placeholder="Ketikkan Nama"
                  className="w-full p-2 rounded bg-gray-600 text-white"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">ID</label>
                <input
                  type="text"
                  placeholder="Ketikkan ID"
                  className="w-full p-2 rounded bg-gray-600 text-white"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Server</label>
                <input
                  type="text"
                  placeholder="Ketikkan Server"
                  className="w-full p-2 rounded bg-gray-600 text-white"
                  value={server}
                  onChange={(e) => setServer(e.target.value)}
                />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <input type="checkbox" id="saveInfo" className="form-checkbox h-5 w-5 text-blue-600" />
              <label htmlFor="saveInfo" className="ml-2 text-sm">Save Informasi Untuk Pembelian Berikut Nya</label>
            </div>
          </div>

      <main className="flex flex-1">
        <div className="bg-slate-700 p-4 w-3/4 space-y-6">
          {/* SECTION 1 - Masukkan Data Akun */}
         

          {/* SECTION 2 - Pilih Nominal */}
          <div>
            <div className="bg-blue-700 text-white rounded-t-lg flex items-center mt-5">
              <div className="bg-blue-700 rounded-full w-8 h-8 flex items-center justify-center font-bold">2</div>
              <div className="ml-2 font-semibold">Pilih Nominal</div>
            </div>
            <h2 className="text-blue-600 mb-1 mt-3">Diamonds</h2>
            <div className="grid grid-cols-2 gap-3">
              {products.map((product, index) => (
              <div
                key={product.id}
                className={`bg-slate-900 p-4 rounded cursor-pointer hover:bg-slate-950 transition ${
                  selectedDiamond === index ? "border-2 border-blue-500" : ""
                }`}
                onClick={() => {
                  const jumlahDiamond = parseInt(product.name);
                  setSelectedDiamond(index);
                  setHargaPerDiamond(product.price || 0);
                  setTotalHarga(jumlah * (product.price || 0));
                  setTotalDiamond(jumlah * (jumlahDiamond || 0));
                  setSelectedProductId(product.id); // penting untuk transaksi
                }}
              >
                <p className="text-lg font-bold">{product.name}</p>
                <p className="text-blue-700 font-semibold">
                  Rp {product.price.toLocaleString()}
                </p>
              </div>
            ))}

            </div>
          </div>


         

          {/* SECTION 5 - Detail Kontak */}
          <div className="bg-gray-700 p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-2">
              <span className="bg-yellow-600 text-black px-2 py-1 rounded mr-2">5</span>
              Detail Kontak
            </h2>
            <label className="block text-sm font-medium mb-1">No. WhatsApp</label>
            <div className="flex items-center space-x-2">
              <span className="bg-gray-600 px-3 py-2 rounded text-white">🇮🇩 +62</span>
              <input
                type="text"
                className="flex-1 p-2 rounded bg-gray-600 text-white focus:outline-none"
                placeholder="8123456789"
                value={nohp}
                onChange={(e) => setNohp(e.target.value)}
              />
            </div>
            <p className="text-xs mt-2 text-gray-300 italic">
              *Nomor ini akan dihubungi jika terjadi masalah
            </p>
            <div className="bg-gray-600 p-3 rounded mt-3 text-sm text-white">
              ℹ️ Jika ada kendala, kami akan menghubungi nomor WA kamu di atas
            </div>
          </div>

          {/* SECTION 6 - Kode Promo */}
          <div className="bg-gray-700 p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-2">
              <span className="bg-yellow-600 text-black px-2 py-1 rounded mr-2">6</span>
              Kode Promo
            </h2>
            <div className="flex space-x-2">
              <input
                type="text"
                className="flex-1 p-2 rounded bg-gray-600 text-white focus:outline-none"
                placeholder="Ketik Kode Promo Kamu"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
              />
              <button className="bg-yellow-600 px-4 py-2 rounded text-black font-semibold hover:bg-yellow-500 transition">
                Gunakan
              </button>
            </div>
            <button className="bg-yellow-800 mt-3 px-4 py-2 rounded text-white text-sm hover:bg-yellow-700 transition flex items-center space-x-2">
              <span>🎫</span>
              <span>Pakai Promo Yang Tersedia</span>
            </button>
          </div>
        </div>

        {/* Sidebar Ringkasan */}
        <div className="w-1/4 sticky top-20 bg-slate-900 p-4 rounded-lg text-white flex flex-col justify-between max-h-[calc(100vh-5rem)] overflow-y-scroll hide-scrollbar">
  <div>
    <div className="my-5">
      <h2 className="text-lg font-bold mb-4">Masukkan Jumlah Pembelian</h2>
      <div className="flex items-center space-x-4 mt-3">
        <button onClick={kurangJumlah} className="px-4 py-2 bg-blue-700 text-black rounded-md hover:bg-blue-400">-</button>
        <input type="text" readOnly value={jumlah} className="w-12 text-center bg-gray-700 text-white rounded-md" />
        <button onClick={tambahJumlah} className="px-4 py-2 bg-blue-700 text-black rounded-md hover:bg-blue-400">+</button>
      </div>
    </div>

    <img src="../image/logomlbb.webp" alt="Mobile Legends Logo" className="h-40 w-40 object-contain mx-auto" />

    <div className="mt-6">
      <h3 className="text-lg font-bold">Diamond Total</h3>
      <p className="text-2xl font-semibold mt-2">{totalDiamond.toLocaleString()}</p>
    </div>

    <div className="mt-6">
      <h3 className="text-lg font-bold">Harga Total</h3>
      <p className="text-2xl font-semibold mt-2">Rp {totalHarga.toLocaleString()}</p>
    </div>
    <button
  onClick={() => setShowModal(true)}
  className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
>
  Pesan
</button>

  </div>

  

 {/* MODAL */}
      {showModal && (
     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
  <div className="bg-gray-900 text-white p-5 rounded-lg w-[90%] max-w-sm shadow-lg">
    {/* Ikon Ceklis */}
    <div className="flex justify-center mb-4">
      <div className="bg-green-500 rounded-full p-2">
        <svg
          className="w-5 h-5 text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
    </div>

    <h2 className="text-center text-base font-semibold mb-1">Konfirmasi Pesanan</h2>
    <p className="text-center text-xs text-gray-300 mb-4">Pastikan data akun dan pilihanmu sudah sesuai.</p>

    {/* Informasi Pesanan */}
    <div className="bg-gray-800 rounded-md p-3 text-sm space-y-1">
      <p><span className="font-semibold">Nama:</span> {nama}</p>
      <p><span className="font-semibold">Produk_type:</span> {selectedProduct.type}</p>
      <p><span className="font-semibold">Username:</span> {username}</p>
      <p><span className="font-semibold">ID Pengguna:</span> {userId}</p>
      <p><span className="font-semibold">Server:</span> {server}</p>
      <p><span className="font-semibold">No HP:</span> {nohp}</p>
      <p><span className="font-semibold">Jumlah Diamond:</span> {totalDiamond}</p>
      <p><span className="font-semibold">Total Harga:</span> Rp {totalHarga.toLocaleString()}</p>

    </div>

    {/* Pilih Metode */}
    <div className="mt-4 text-sm">
      <label className="block mb-1 font-medium">Metode Pembayaran</label>
      <select
        className="bg-gray-700 text-white w-full px-3 py-2 rounded border border-gray-600"
        value={metodePembayaran}
        onChange={(e) => setMetodePembayaran(e.target.value)}
      >
        <option value="">-- Pilih --</option>
        <option value="dana">DANA</option>
        <option value="gopay">GoPay</option>
        <option value="OVO">OVO</option>
        <option value="BCA">BCA</option>
      </select>
    </div>

    {/* Checkbox */}
    <div className="flex items-start mt-3 text-xs text-gray-300">
      <input type="checkbox" className="mr-2 mt-1 accent-blue-500" />
      <label>
        Dengan klik <span className="text-white font-medium">Pesan Sekarang</span>, kamu menyetujui{' '}
        <span className="text-blue-400 underline">Syarat & Ketentuan</span>.
      </label>
    </div>

    {/* Tombol Aksi */}
    <div className="flex justify-end gap-3 mt-5">
      <button
        className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded"
        onClick={() => setShowModal(false)}
      >
        Batal
      </button>
     <button
  type="button"
  className="w-full bg-yellow-500 text-black py-2 rounded-md hover:bg-yellow-600"
  onClick={handlePesanSekarang}
  disabled={loading}
>
  {loading ? "Memproses..." : "Pesan Sekarang"}
</button>
  

    {showSnap && (
        <SnapCheckout
          snapToken={snapToken}
          invoiceNumber={invoiceNumber}
          onStatusCheck={handleCheckStatus}
        />
      )}
    </div>
  </div>
</div>


      )}

     {invoice && (
        <div className="mt-4 p-4 border rounded bg-green-100">
          <p><strong>Invoice:</strong> {invoice.invoice_id}</p>
          <p><strong>Total:</strong> Rp{invoice.total}</p>
          {/* tampilkan informasi lain jika ada */}
        </div>
      )}

      </div>

      
     


      </main>
      
    </div>

    <Footer/>
    </div>
  );
};

export default TopupForm;
