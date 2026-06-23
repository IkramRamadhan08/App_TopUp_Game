#!/bin/bash

# Kill running processes on port 8000 and 5173 if any
fuser -k 8000/tcp 2>/dev/null
fuser -k 5173/tcp 2>/dev/null

echo "Starting AKS Store Backend (Laravel)..."
cd /home/eightarch/Projects/App_TopUp_Game/api-topup
php artisan serve --port=8000 > /dev/null 2>&1 &

echo "Starting AKS Store Frontend (Vite)..."
cd /home/eightarch/Projects/App_TopUp_Game/top-up
npm run dev -- --port 5173 > /dev/null 2>&1 &

# Wait for servers to spin up
sleep 3

echo "Opening AKS Store in your default browser..."
xdg-open http://localhost:5173 > /dev/null 2>&1 || open http://localhost:5173 > /dev/null 2>&1

echo "AKS Store is running! Press Ctrl+C to stop."
wait
