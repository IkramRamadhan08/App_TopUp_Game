# AKS Store — Top Up Game

Platform top-up game dengan integrasi Midtrans Payment Gateway.

## Screenshot

| Beranda | Mobile Legends | Free Fire |
|---------|----------------|-----------|
| ![Beranda](Gambar/1.png) | ![ML](Gambar/2.png) | ![FF](Gambar/3.png) |

| Honor of Kings | Dashboard Admin | Login |
|----------------|-----------------|-------|
| ![HOK](Gambar/4.png) | ![Dashboard](Gambar/5.png) | ![Login](Gambar/6.png) |

## Stack

| Layer | Teknologi |
|-------|-----------|
| Frontend | React 19, Vite, Tailwind CSS |
| Backend | Laravel 11, PHP |
| Database | MySQL |
| Payment | Midtrans Snap (sandbox) |
| Auth | Sanctum token + Google OAuth (opsional) |

## Struktur

```
api-topup/    → Backend API (Laravel)
top-up/       → Frontend (React + Vite)
Gambar/       → Screenshot aplikasi
run.sh        → Menjalankan server (Linux/macOS)
setup.ps1     → Setup pertama (Windows)
run.ps1       → Menjalankan server (Windows)
```

## Prerequisites

- **PHP** 8.1+ ([download](https://windows.php.net/download/))
- **Composer** ([download](https://getcomposer.org/download/))
- **Node.js** 18+ ([download](https://nodejs.org/))
- **MySQL** ([download](https://dev.mysql.com/downloads/installer/))
- **Git** ([download](https://git-scm.com/downloads))

## Setup (Windows)

### 1. Clone & masuk folder
```powershell
git clone https://github.com/IkramRamadhan08/App_TopUp_Game.git
cd App_TopUp_Game
```

### 2. Setup otomatis
Jalankan PowerShell sebagai Administrator lalu:
```powershell
.\setup.ps1
```
Script ini akan:
- Install dependency backend (`composer install`)
- Buat file `.env` dengan konfigurasi Midtrans & database
- Generate `APP_KEY`
- Jalankan migrate & seed database
- Install dependency frontend (`npm install`)
- Memberi tau cara mulai

Atau manual:

### 3. Setup Manual — Backend
```powershell
cd api-topup
copy .env.example .env
# Edit .env — atur DB_DATABASE, DB_USERNAME, DB_PASSWORD
# Lalu tambahkan:

# Midtrans (isi dengan key kamu — lihat panduan di bawah)
MIDTRANS_SERVER_KEY=
MIDTRANS_CLIENT_KEY=
MIDTRANS_IS_PRODUCTION=false
MIDTRANS_IS_SANITIZED=true
MIDTRANS_IS_3DS=true

# Lanjut
composer install
php artisan key:generate
php artisan migrate --seed
php artisan serve --port=8000
```

### 4. Setup Manual — Frontend
```powershell
cd top-up
npm install
npm run dev
```

### 5. Buka
**http://localhost:5173**

Admin login:
- Email: `admin@example.com`
- Password: `admin123`

---

## Menjalankan Server (setelah setup)

### Windows
```powershell
.\run.ps1
```

### Linux / macOS
```bash
./run.sh
```

## Game Tersedia

- **Mobile Legends** — Diamond & Starlight Member
- **Free Fire** — Diamond
- **Honor of Kings** — Token
- **PUBG Mobile** — UC & Royal Pass

## Konfigurasi Payment Gateway (Midtrans)

> AKS Store sudah include key **sandbox** yang aktif. Langsung bisa dipakai untuk testing.

### Cara dapat key sendiri (production)

1. **Daftar akun Midtrans** → https://dashboard.midtrans.com/
2. Login ke dashboard, pilih menu **Settings > Access Keys**
3. Akan ada 2 pasang key:
   - **Sandbox** — untuk testing
   - **Production** — untuk live
4. Copy **Server Key** dan **Client Key**
5. Simpan di `api-topup/.env`:
   ```
   MIDTRANS_SERVER_KEY=Mid-server-xxx_aktual_key_kamu
   MIDTRANS_CLIENT_KEY=Mid-client-xxx_aktual_key_kamu
   MIDTRANS_IS_PRODUCTION=false
   MIDTRANS_IS_SANITIZED=true
   MIDTRANS_IS_3DS=true
   ```
6. Ganti `MIDTRANS_IS_PRODUCTION=true` kalau udah siap production
7. **Testing Sandbox**: pakai kartu kredit `4811 1111 1111 1114` dengan expiry date sembarang (masa depan) dan OTP `112233`

> **Catatan**: Key sandbox yang disertakan di repo ini bisa langsung dipakai. Kalau mau ganti, cukup edit `.env`.

## Konfigurasi Google OAuth (Opsional)

> Google OAuth belum diimplementasikan penuh. Kalau mau dipasang:

1. Buka https://console.cloud.google.com/apis/credentials
2. Buat **OAuth 2.0 Client ID** (Web application)
3. Tambah **Authorized JavaScript origins**: `http://localhost:5173`
4. Tambah **Authorized redirect URIs**: `http://localhost:5173`
5. Copy Client ID
6. Masukkan di frontend:
   - File: `top-up/index.html`
   - Cari baris: `<meta name="google-signin-client_id" content="YOUR_CLIENT_ID">`
   - Ganti `YOUR_CLIENT_ID` dengan Client ID dari Google Console

## Environment Variables Backend (`api-topup/.env`)

| Variable | Wajib? | Deskripsi | Contoh |
|----------|--------|-----------|--------|
| `DB_DATABASE` | ✅ | Nama database MySQL | `api_topup` |
| `DB_USERNAME` | ✅ | User MySQL | `root` |
| `DB_PASSWORD` | ✅ | Password MySQL | |
| `MIDTRANS_SERVER_KEY` | ✅ | Server key Midtrans | `Mid-server-xxx` |
| `MIDTRANS_CLIENT_KEY` | ✅ | Client key Midtrans | `Mid-client-xxx` |
| `MIDTRANS_IS_PRODUCTION` | ✅ | `false` = sandbox, `true` = live | `false` |
| `MIDTRANS_IS_SANITIZED` | | Biarkan `true` | `true` |
| `MIDTRANS_IS_3DS` | | Biarkan `true` | `true` |

## Fitur

- Top-up Multi Game (ML, FF, HOK, PUBG)
- Midtrans Payment Gateway (Snap)
- Admin Dashboard (statistik, transaksi, user)
- Google OAuth Login (opsional)
- Search game
- FAQ interaktif
- Status bayar otomatis dari Midtrans (tidak bisa dimanipulasi)
