import React from "react";
import Navbar from "../../Nav";
import TopupForm from "../TopupML/TopForm";

const DiamondPubg = () => {
  return (
    <div>
      <div>
        <Navbar />
      </div>

      <main className="relative">
        <img src="../image/pubg.webp" alt="PUBG Banner" className="w-full" />
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <div className="text-center">
            <div className="bg-yellow-500 p-4 rounded-lg mt-4">
              <h1 className="text-2xl font-bold">Top Up UC PUBG Mobile</h1>
              <p className="text-lg">BERSAMA AKS Store</p>
              <p className="text-4xl font-bold">Murah & Cepat</p>
            </div>
          </div>
        </div>
      </main>

      <section className="bg-gray-900 text-white p-8">
        <div className="flex items-center">
          <img src="../image/pubg.webp" alt="PUBG Logo" className="h-24 w-24 rounded" />
          <div className="ml-4">
            <h2 className="text-2xl font-bold">PUBG MOBILE</h2>
            <p>Tencent Games</p>
            <div className="flex items-center space-x-4 mt-2">
              <div className="flex items-center">
                <i className="fas fa-check-circle text-yellow-500"></i>
                <span className="ml-2">Proses Cepat</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-comments text-blue-500"></i>
                <span className="ml-2">Layanan Chat 24/7</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-gem text-blue-500"></i>
                <span className="ml-2">UC</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TopupForm gameType="pubg" gameLogo="../image/pubg.webp" />

      <div className="bg-gray-800 text-white p-4 rounded-lg mt-6">
        <h2 className="text-lg font-semibold mb-2 border-b border-gray-600 pb-1">Deskripsi PUBG Mobile</h2>
        <p className="text-sm leading-relaxed">
          Top up UC PUBG Mobile harga paling murah. Cara topup :
          <br />1) Masukkan Data Akun
          <br />2) Pilih Nominal
          <br />3) Masukkan jumlah
          <br />4) Pilih Pembayaran
          <br />5) Tulis Kode Promo (jika ada)
          <br />6) Masukkan No WhatsApp
          <br />7) Klik Order Now & lakukan Pembayaran
          <br />8) Produk otomatis masuk ke akun game anda
        </p>
      </div>
    </div>
  );
};

export default DiamondPubg;
