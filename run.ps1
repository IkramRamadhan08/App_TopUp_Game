#Requires -Version 5.0

Write-Host "=======================================" -ForegroundColor Cyan
Write-Host "   AKS Store - Start Server" -ForegroundColor Cyan
Write-Host "=======================================" -ForegroundColor Cyan
Write-Host ""

# Paths
$rootDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$apiDir = Join-Path $rootDir "api-topup"
$frontendDir = Join-Path $rootDir "top-up"

# Kill existing processes on ports 8000 & 5173
Write-Host "[1/3] Membersihkan port 8000 & 5173..." -ForegroundColor Gray
$processes8000 = Get-NetTCPConnection -LocalPort 8000 -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess
$processes5173 = Get-NetTCPConnection -LocalPort 5173 -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess
$allPids = $processes8000 + $processes5173 | Select-Object -Unique
foreach ($pid in $allPids) {
    Stop-Process -Id $pid -Force -ErrorAction SilentlyContinue
    Write-Host "  Stopped process PID $pid" -ForegroundColor DarkGray
}
Start-Sleep -Seconds 1
Write-Host "[OK]" -ForegroundColor Green

# Start Laravel backend
Write-Host "[2/3] Starting Backend (Laravel :8000)..." -ForegroundColor Gray
$apiLog = Join-Path $rootDir "api.log"
try {
    $job = Start-Job -ScriptBlock {
        param($dir, $log)
        Set-Location $dir
        php artisan serve --port=8000 2>&1 | Out-File -FilePath $log -Encoding utf8
    } -ArgumentList $apiDir, $apiLog
    Write-Host "  PID: $($job.Id)" -ForegroundColor DarkGray
} catch {
    Write-Host "[ERROR] Gagal start backend: $_" -ForegroundColor Red
}
Write-Host "[OK]" -ForegroundColor Green

# Start Vite frontend
Write-Host "[3/3] Starting Frontend (Vite :5173)..." -ForegroundColor Gray
$frontendLog = Join-Path $rootDir "frontend.log"
try {
    $job2 = Start-Job -ScriptBlock {
        param($dir, $log)
        Set-Location $dir
        npm run dev -- --port 5173 2>&1 | Out-File -FilePath $log -Encoding utf8
    } -ArgumentList $frontendDir, $frontendLog
    Write-Host "  PID: $($job2.Id)" -ForegroundColor DarkGray
} catch {
    Write-Host "[ERROR] Gagal start frontend: $_" -ForegroundColor Red
}

# Tunggu sebentar
Start-Sleep -Seconds 4

# Buka browser
Write-Host ""
try {
    Start-Process "http://localhost:5173"
    Write-Host "[OK] Browser dibuka" -ForegroundColor Green
} catch {
    Write-Host "Buka manual: http://localhost:5173" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "=======================================" -ForegroundColor Cyan
Write-Host "   AKS Store running!" -ForegroundColor Cyan
Write-Host "=======================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "  Frontend: http://localhost:5173"
Write-Host "  Backend:  http://localhost:8000"
Write-Host ""
Write-Host "  Admin login:" -ForegroundColor White
Write-Host "    Email:    admin@example.com"
Write-Host "    Password: admin123"
Write-Host ""
Write-Host "  Stop server: tutup PowerShell ini"
Write-Host "  Atau: Get-Job | Stop-Job"
Write-Host ""
pause
