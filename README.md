# AKS Store — Top Up Game

Platform top-up game (Free Fire, Mobile Legends, Honor of Kings, PUBG) dengan integrasi Midtrans Payment Gateway.

## Cara Pakai

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

> **XAMPP user**: cukup start MySQL aja dari XAMPP Control Panel, gak perlu setting apapun.

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

## Midtrans

Key sandbox sudah include, langsung bisa testing. Testing pake kartu:
```
4811 1111 1111 1114  |  expiry masa depan  |  OTP: 112233
```

## Environment Variables (`api-topup/.env`)

| Variable | Fungsi | Default |
|----------|--------|---------|
| `DB_DATABASE` | Nama database | `api_topup` |
| `DB_USERNAME` | User MySQL | `root` |
| `DB_PASSWORD` | Password MySQL | *(kosong)* |
| `MIDTRANS_SERVER_KEY` | Server key Midtrans | *(sandbox)* |
| `MIDTRANS_CLIENT_KEY` | Client key Midtrans | *(sandbox)* |
