<?php

use App\Http\Controllers\UserController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\TransaksiController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('register', [UserController::class, 'register']);
Route::post('login', [UserController::class, 'login']);
Route::post('/admin/google-login', [UserController::class, 'googleLogin']);
Route::get('/products', [ProductController::class, 'Product']);
Route::get('/cek-status/{invoiceNumber}', [TransaksiController::class, 'cekStatus']);

// Public: buat transaksi & cek status (tanpa auth)
Route::post('/transaksi', [TransaksiController::class, 'store']);

// Protected: admin-only routes
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::get('/admin', [ProductController::class, 'Product']);
    Route::get('/stats', function () {
        $totalRevenue = \App\Models\Transaksi::where('status_pembayaran', 'PAID')
            ->where('status_transaksi', 'SUCCESS')
            ->sum('total_harga');

        return response()->json([
            'users' => \App\Models\User::count(),
            'transactions' => \App\Models\Transaksi::count(),
            'products' => \App\Models\Product::count(),
            'revenue' => $totalRevenue,
        ]);
    });

    Route::get('/transaksi', [TransaksiController::class, 'index']);
    Route::put('/transaksi/{id}', [TransaksiController::class, 'update']);
    Route::delete('/transaksi/{id}', [TransaksiController::class, 'destroy']);
    Route::get('/total-pendapatan', [TransaksiController::class, 'totalPendapatan']);
    Route::get('/transaksi/users', function () {
        return \App\Models\Transaksi::select('nama', 'game_id', 'server', 'nohp', 'created_at')->get();
    });
});







