# 🎮 Aplikasi Top-Up

Aplikasi Top-Up adalah platform untuk melakukan transaksi layanan digital. Proyek ini terbagi menjadi dua bagian utama: Frontend dan Backend API.

## 📸 Alur Penggunaan & Tampilan Aplikasi

Berikut adalah rincian antarmuka aplikasi berdasarkan alur penggunaannya:

### 1. Halaman Beranda
Halaman utama yang menampilkan daftar layanan, promo, atau game yang tersedia untuk top-up.
<img src="Gambar/1.png" width="600" alt="Halaman Beranda" style="margin: 10px 0; border-radius: 8px; border: 1px solid #ddd;" />

### 2. Pemilihan Kategori Produk
Pengguna dapat memilih kategori atau jenis item spesifik dari layanan digital yang diinginkan.
<img src="Gambar/2.png" width="600" alt="Pemilihan Kategori" style="margin: 10px 0; border-radius: 8px; border: 1px solid #ddd;" />

### 3. Pengisian Detail Pesanan
Formulir untuk memasukkan data yang diperlukan (contoh: ID akun/Nomor tujuan) dan memilih nominal top-up.
<img src="Gambar/3.png" width="600" alt="Detail Pesanan" style="margin: 10px 0; border-radius: 8px; border: 1px solid #ddd;" />

### 4. Konfirmasi Pembelian
Ringkasan pesanan untuk memastikan detail transaksi sudah benar sebelum melanjutkan ke pembayaran.
<img src="Gambar/4.png" width="600" alt="Konfirmasi Pembelian" style="margin: 10px 0; border-radius: 8px; border: 1px solid #ddd;" />

### 5. Riwayat Transaksi / Dashboard
Menampilkan status pesanan (pending/success/failed) dan riwayat aktivitas akun.
<img src="Gambar/5.png" width="600" alt="Riwayat Transaksi" style="margin: 10px 0; border-radius: 8px; border: 1px solid #ddd;" />

### 6. Integrasi Midtrans Payment Gateway
Tampilan antarmuka pembayaran (**Payment Page**) yang telah terintegrasi penuh dengan **Midtrans**, sehingga memungkinkan pengguna memilih berbagai metode pembayaran yang aman secara otomatis.
<img src="Gambar/6.png" width="600" alt="Integrasi Midtrans" style="margin: 10px 0; border-radius: 8px; border: 1px solid #ddd;" />

## 🚀 Struktur Direktori

- **`api-topup/`**: Backend server (dibangun menggunakan framework Laravel/PHP).
- **`top-up/`**: Frontend web client (dibangun menggunakan React JS dan Vite).

## 🛠️ Cara Menjalankan

### Backend (API)
Buka terminal dan jalankan perintah berikut di dalam folder `api-topup`:
```bash
cd api-topup
# Pastikan sudah menjalankan composer install dan mengatur .env
php artisan serve
```

### Frontend
Buka terminal baru dan jalankan perintah berikut di dalam folder `top-up`:
```bash
cd top-up
# Pastikan dependensi sudah terinstal dengan npm install
npm run dev
```
