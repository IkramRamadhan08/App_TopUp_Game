#Requires -Version 5.0

Write-Host "=======================================" -ForegroundColor Cyan
Write-Host "   AKS Store - Setup Windows" -ForegroundColor Cyan
Write-Host "=======================================" -ForegroundColor Cyan
Write-Host ""

# --- Cek prerequisites ---
$missing = @()
if (-not (Get-Command php -ErrorAction SilentlyContinue)) { $missing += "PHP" }
if (-not (Get-Command composer -ErrorAction SilentlyContinue)) { $missing += "Composer" }
if (-not (Get-Command node -ErrorAction SilentlyContinue)) { $missing += "Node.js" }
if (-not (Get-Command npm -ErrorAction SilentlyContinue)) { $missing += "npm" }

if ($missing.Count -gt 0) {
    Write-Host "[ERROR] Prerequisites belum terinstall: $($missing -join ', ')" -ForegroundColor Red
    Write-Host "Install dulu:"
    Write-Host "  PHP:     https://windows.php.net/download/"
    Write-Host "  Composer: https://getcomposer.org/download/"
    Write-Host "  Node.js:  https://nodejs.org/"
    exit 1
}
Write-Host "[OK] Semua prerequisite terdeteksi" -ForegroundColor Green

# --- Cari folder project ---
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $scriptDir

# --- Setup Backend ---
Write-Host ""
Write-Host ">>> Backend (Laravel)" -ForegroundColor Yellow
Set-Location "api-topup"

Write-Host "[1/5] Install composer dependencies..." -ForegroundColor Gray
composer install --no-interaction --prefer-dist
if ($LASTEXITCODE -ne 0) { Write-Host "[ERROR] composer install gagal" -ForegroundColor Red; exit 1 }
Write-Host "[OK]" -ForegroundColor Green

Write-Host "[2/5] Setup .env..." -ForegroundColor Gray
if (-not (Test-Path ".env")) {
    Copy-Item ".env.example" ".env"
    Write-Host "[OK] .env dibuat dari .env.example" -ForegroundColor Green
} else {
    Write-Host "[OK] .env sudah ada" -ForegroundColor Green
}

# Set default database (root, no password — default XAMPP)
(Get-Content ".env") -replace 'DB_USERNAME=.*', "DB_USERNAME=root" | Set-Content ".env"
(Get-Content ".env") -replace 'DB_PASSWORD=.*', "DB_PASSWORD=" | Set-Content ".env"

# Hapus baris Midtrans dari .env.example biar dicopy ulang dengan key bawaan
Write-Host "[OK] .env dikonfigurasi (DB: root, password kosong)" -ForegroundColor Green

Write-Host "[3/5] Generate APP_KEY..." -ForegroundColor Gray
php artisan key:generate --force
Write-Host "[OK]" -ForegroundColor Green

Write-Host "[4/5] Migrate & seed database..." -ForegroundColor Gray

# Coba buat database dulu (skip kalo udah ada)
mysql -u root -e "CREATE DATABASE IF NOT EXISTS api_topup;" 2>$null

php artisan migrate --seed --force
if ($LASTEXITCODE -ne 0) {
    Write-Host "[WARNING] Migrate gagal. Pastikan MySQL aktif." -ForegroundColor Yellow
    Write-Host "  Buka XAMPP > start MySQL, lalu jalankan ulang script ini."
} else {
    Write-Host "[OK]" -ForegroundColor Green
}

Write-Host "[5/5] Buat storage link..." -ForegroundColor Gray
php artisan storage:link --force 2>$null
Write-Host "[OK]" -ForegroundColor Green

Set-Location ..

# --- Setup Frontend ---
Write-Host ""
Write-Host ">>> Frontend (React + Vite)" -ForegroundColor Yellow
Set-Location "top-up"

Write-Host "[1/1] Install npm dependencies..." -ForegroundColor Gray
npm install
if ($LASTEXITCODE -ne 0) { Write-Host "[ERROR] npm install gagal" -ForegroundColor Red; exit 1 }
Write-Host "[OK]" -ForegroundColor Green

Set-Location ..

# --- Selesai ---
Write-Host ""
Write-Host "=======================================" -ForegroundColor Cyan
Write-Host "   SETUP SELESAI!" -ForegroundColor Cyan
Write-Host "=======================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Jalankan project:" -ForegroundColor White
Write-Host "  .\run.ps1" -ForegroundColor Yellow
Write-Host ""
Write-Host "Atau manual:" -ForegroundColor White
Write-Host "  Terminal 1: cd api-topup && php artisan serve --port=8000"
Write-Host "  Terminal 2: cd top-up && npm run dev"
Write-Host "  Browser:    http://localhost:5173"
Write-Host ""
Write-Host "Admin login:" -ForegroundColor White
Write-Host "  Email:    admin@example.com"
Write-Host "  Password: admin123"
Write-Host ""
pause
