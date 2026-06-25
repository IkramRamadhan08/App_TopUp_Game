#!/bin/bash

set -e

echo "======================================="
echo "   AKS Store - Setup Linux/macOS"
echo "======================================="
echo ""

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# --- Cek prerequisites ---
for cmd in php composer node npm; do
    if ! command -v $cmd &> /dev/null; then
        echo "[ERROR] $cmd belum terinstall"
        exit 1
    fi
done
echo "[OK] Semua prerequisite terdeteksi"

# --- Setup Backend ---
echo ""
echo ">>> Backend (Laravel)"
cd "$DIR/api-topup"

echo "[1/4] Install composer dependencies..."
composer install --no-interaction --prefer-dist
echo "[OK]"

echo "[2/4] Setup .env..."
if [ ! -f ".env" ]; then
    cp .env.example .env
    echo "[OK] .env dibuat dari .env.example"
else
    echo "[OK] .env sudah ada"
fi

echo "[3/4] Generate APP_KEY..."
php artisan key:generate --force
echo "[OK]"

echo "[4/4] Migrate & seed database..."
php artisan migrate --seed --force
echo "[OK]"

php artisan storage:link --force 2>/dev/null

# --- Setup Frontend ---
echo ""
echo ">>> Frontend (React + Vite)"
cd "$DIR/top-up"

echo "[1/1] Install npm dependencies..."
npm install
echo "[OK]"

cd "$DIR"

# --- Selesai ---
echo ""
echo "======================================="
echo "   SETUP SELESAI!"
echo "======================================="
echo ""
echo "Jalankan project:"
echo "  ./run.sh"
echo ""
echo "Atau manual:"
echo "  Terminal 1: cd api-topup && php artisan serve --port=8000"
echo "  Terminal 2: cd top-up && npm run dev"
echo "  Browser:    http://localhost:5173"
echo ""
echo "Admin login:"
echo "  Email:    admin@example.com"
echo "  Password: admin123"
echo ""
