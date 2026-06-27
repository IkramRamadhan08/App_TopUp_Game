# AKS Store — Top Up Game

Platform top-up game (Free Fire, Mobile Legends, Honor of Kings, PUBG) dengan integrasi Midtrans Payment Gateway.

## Cara Pakai

> **⚠️ PENTING:** Jangan double-click file `.sh` — itu script Linux, bakal kebuka Notepad doang.  
> Gunakan **PowerShell** (klik kanan > Run with PowerShell) untuk file `.ps1`.

### Windows
```powershell
git clone https://github.com/IkramRamadhan08/App_TopUp_Game.git
cd App_TopUp_Game
.\setup.ps1    # 1x aja (install semua + seed data)
.\run.ps1      # jalanin server tiap mau pake
```

### Linux / macOS
```bash
git clone https://github.com/IkramRamadhan08/App_TopUp_Game.git
cd App_TopUp_Game
chmod +x setup.sh run.sh
./setup.sh
./run.sh
```

Buka **http://localhost:5173**

### Admin Login
- Email: `admin@example.com`
- Password: `admin123`

## Prerequisites

- **PHP** 8.1+ — https://windows.php.net/download/
- **Composer** — https://getcomposer.org/download/
- **Node.js** 18+ — https://nodejs.org/
- **MySQL** (atau XAMPP) — https://dev.mysql.com/downloads/

> **XAMPP user**: cukup start MySQL aja dari XAMPP Control Panel.

## Troubleshooting Database (DB Kosong)

Kalo abis jalanin `setup.ps1` tapi database kosong (gak ada tabel), berarti MySQL gagal connect. Ikutin ini:

### 1. Pastikan MySQL sudah jalan
- **XAMPP**: buka XAMPP Control Panel → klik **Start** pada MySQL
- **MySQL standalone**: buka Services (`services.msc`) → cari **MySQL** → pastikan statusnya **Running**

### 2. Cek file `api-topup/.env`
Buka file **`api-topup/.env`** di Notepad/VS Code, pastikan baris ini sesuai:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=api_topup
DB_USERNAME=root
DB_PASSWORD=
```

> **Catatan**: default XAMPP pake `root` tanpa password. Kalo MySQL kamu pake password, isi di `DB_PASSWORD`.

### 3. Jalanin migration manual
Buka **PowerShell** di folder `api-topup/` lalu jalanin:

```powershell
php artisan migrate --seed --force
```

Kalo sukses, bakal muncul daftar tabel: `products`, `users`, `transaksi`, dll.

### 4. Reset database dari awal (opsional)
```powershell
php artisan migrate:fresh --seed --force
```
Ini bakal hapus semua tabel, bikin ulang, dan isi data contoh.

### 5. Setelah migration sukses
Jalanin ulang `.\run.ps1` dari root folder, buka `http://localhost:5173`.

## Stack

| Layer | Teknologi |
|-------|-----------|
| Frontend | React 19, Vite, Tailwind CSS |
| Backend | Laravel 11, PHP |
| Database | MySQL |
| Payment | Midtrans Snap (sandbox) |
| Auth | Sanctum token + Google OAuth |

## Struktur Folder

```
api-topup/    → Backend API (Laravel)
top-up/       → Frontend (React + Vite)
Gambar/       → Screenshot
setup.ps1     → Setup Windows
setup.sh      → Setup Linux/macOS
run.ps1       → Jalankan server (Windows)
run.sh        → Jalankan server (Linux/macOS)
```

## Screenshot

| Beranda | Mobile Legends | Free Fire |
|---------|----------------|-----------|
| ![Beranda](Gambar/1.png) | ![ML](Gambar/2.png) | ![FF](Gambar/3.png) |

| Honor of Kings | Dashboard Admin | Login |
|----------------|-----------------|-------|
| ![HOK](Gambar/4.png) | ![Dashboard](Gambar/5.png) | ![Login](Gambar/6.png) |

## Game Tersedia

- **Mobile Legends** — Diamond & Starlight Member
- **Free Fire** — Diamond
- **Honor of Kings** — Token
- **PUBG Mobile** — UC & Royal Pass

## Google OAuth

Project ini udah pake Google Login, Client ID disimpan di file `.env`.

### Cara Setup Google OAuth (buat project sendiri)

1. Buka [Google Cloud Console](https://console.cloud.google.com/)
2. Buat project baru atau pilih project yang udah ada
3. Ke **APIs & Services** > **Credentials**
4. Klik **Create Credentials** > **OAuth client ID**
5. Pilih **Web application**
6. Di **Authorized JavaScript origins** tambahin:
   - `http://localhost:5173`
7. Di **Authorized redirect URIs** tambahin:
   - `http://localhost:5173`
8. Klik **Create**, bakal dapet **Client ID**
9. Ganti Client ID di 2 file:
   - **`api-topup/.env`** → `GOOGLE_CLIENT_ID=isi_disini`
   - **`top-up/.env`** → `VITE_GOOGLE_CLIENT_ID=isi_disini`

### Cara Kerja Google Login
- Frontend pake [Google Identity Services (GIS)](https://accounts.google.com/gsi/client)
- Token ID dikirim ke backend via `POST /api/admin/google-login`
- Backend verify pake `google/apiclient`, kalau valid bikin/session user + kasih token Sanctum

## Midtrans

Buat akun di https://dashboard.midtrans.com/, ambil **Server Key** & **Client Key** dari menu Settings > Access Keys, lalu isi di `api-topup/.env`.

## Environment Variables

### `api-topup/.env` (Backend)

| Variable | Fungsi | Default |
|----------|--------|---------|
| `DB_DATABASE` | Nama database | `api_topup` |
| `DB_USERNAME` | User MySQL | `root` |
| `DB_PASSWORD` | Password MySQL | *(kosong)* |
| `MIDTRANS_SERVER_KEY` | Server key Midtrans | *(sandbox)* |
| `MIDTRANS_CLIENT_KEY` | Client key Midtrans | *(sandbox)* |
| `GOOGLE_CLIENT_ID` | Client ID Google OAuth | *(isi dari Google Console)* |

### `top-up/.env` (Frontend)

| Variable | Fungsi | Default |
|----------|--------|---------|
| `VITE_GOOGLE_CLIENT_ID` | Client ID Google OAuth | *(sama dengan backend)* |
