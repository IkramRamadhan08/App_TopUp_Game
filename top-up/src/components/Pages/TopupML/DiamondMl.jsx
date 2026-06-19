import React from "react";
import Navbar from "../../Nav";
import TopupForm from "./TopForm";

const DiamondMl = () => {
  return (

    <div>
      <div>  
    <Navbar/>
    </div>

    
    <main className="relative">
      <img src="../image/banner2.png" alt="Mobile Legends Banner" className="w-full" />
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
        <div className="text-center">
          <img src="../image/logomlbb.webp" alt="Character Image" className="inline-block" />
          <div className="bg-yellow-500 p-4 rounded-lg mt-4">
            <h1 className="text-2xl font-bold">Beli Weekly Diamond Pass dan beli Skin Favorit kamu...</h1>
            <p className="text-lg">BERSAMA HADI STORE</p>
            <p className="text-4xl font-bold">this is Hadi Store</p>
          </div>
        </div>
      </div>
    </main>
  
    <section className="bg-gray-900 text-white p-8">
      <div className="flex items-center">
        <img src="https://placehold.co/100x100" alt="Mobile Legends Logo" className="h-24 w-24" />
        <div className="ml-4">
          <h2 className="text-2xl font-bold">MOBILE LEGENDS</h2>
          <p>Moonton</p>
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
              <span className="ml-2">Diamond</span>
            </div>
          </div>
        </div>
      </div>
    </section>
    <TopupForm
          gameType="mobilelegend"
          gameLogo="../image/logomlbb.webp"
        />

        <div className="bg-gray-800 text-white p-4 rounded-lg mt-6">
  <h2 className="text-lg font-semibold mb-2 border-b border-gray-600 pb-1">Deskripsi Mobile Legends</h2>
  <p className="text-sm leading-relaxed">
    Top up Diamond Mobile Legends harga paling murah. Cara topup :
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

export default DiamondMl;
