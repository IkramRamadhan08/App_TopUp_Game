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
| Auth | Sanctum token + Google OAuth |

## Struktur

```
api-topup/    → Backend API (Laravel)
top-up/       → Frontend (React + Vite)
Gambar/       → Screenshot aplikasi
run.sh        → Menjalankan server
```

## Cara Jalankan

### 1. Backend
```bash
cd api-topup
cp .env.example .env   # atur koneksi database
composer install
php artisan migrate --seed
php artisan serve --port=8000
```

### 2. Frontend
```bash
cd top-up
npm install
npm run dev
```

Akses: `http://localhost:5173`

## Game Tersedia

- **Mobile Legends** — Diamond & Starlight Member
- **Free Fire** — Diamond
- **Honor of Kings** — Token
- **PUBG Mobile** — UC & Royal Pass

## Admin

- **Login**: `/login` (email: `admin@example.com`, password: `admin123`)
- **Dashboard**: `/dashboard`
- Role `admin` diperlukan untuk akses dashboard

## Environment Variables

| Variable | Deskripsi |
|----------|-----------|
| `MIDTRANS_SERVER_KEY` | Server key Midtrans |
| `MIDTRANS_CLIENT_KEY` | Client key Midtrans |
| `MIDTRANS_IS_PRODUCTION` | `false` = sandbox |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID |

## Fitur

- Top-up Multi Game (ML, FF, HOK, PUBG)
- Midtrans Payment Gateway (Snap)
- Admin Dashboard (statistik, transaksi, user)
- Google OAuth Login
- Search game
- FAQ interaktif
- Status bayar otomatis dari Midtrans (tidak bisa dimanipulasi)
