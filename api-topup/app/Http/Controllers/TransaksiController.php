<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Transaksi;
use Illuminate\Support\Str;
use Midtrans\Snap;
use Midtrans\Transaction;

class TransaksiController extends Controller
{
    public function __construct() 
    {
        // Set konfigurasi Midtrans
        \Midtrans\Config::$serverKey = config('midtrans.server_key');
        \Midtrans\Config::$isProduction = config('midtrans.is_production');
        \Midtrans\Config::$isSanitized = config('midtrans.is_sanitized');
        \Midtrans\Config::$is3ds = config('midtrans.is_3ds');
    }

    public function index()
    {
        return response()->json(Transaksi::latest()->get());
    }

    public function show($id)
    {
        $transaksi = Transaksi::findOrFail($id);
        return response()->json($transaksi);
    }

    public function update(Request $request, $id)
    {
        $transaksi = Transaksi::findOrFail($id);

        $transaksi->update($request->only([
            'nama',
            'produk_type',
            'game_id',
            'server',
            'jumlah',
            'payment_method',
            'total_harga',
            'no_hp',
        ]));

        return response()->json($transaksi);
    }

    public function destroy($id)
    {
        $transaksi = Transaksi::findOrFail($id);
        $transaksi->delete();

        return response()->json(['message' => 'Transaksi berhasil dihapus.']);
    }

    public function cekStatus($invoiceNumber)
{
    $transaksi = Transaksi::where('invoice_number', $invoiceNumber)->firstOrFail();

    try {
        $status = (object) \Midtrans\Transaction::status($invoiceNumber);

        $transaksi->payment_method = $status->payment_type ?? $transaksi->payment_method;
        $transaksi->status_pembayaran = $status->transaction_status === 'settlement' ? 'PAID' : strtoupper($status->transaction_status);
        $transaksi->status_transaksi = match ($status->transaction_status) {
            'settlement' => 'SUCCESS',
            'cancel', 'expire', 'deny' => 'FAILED',
            default => 'PENDING',
        };
        $transaksi->midtrans_response = json_encode($status);
    } catch (\Exception $e) {
        // Midtrans error — return data lokal saja
    }
    $transaksi->save();

    return response()->json([
        'message' => 'Status transaksi diperbarui',
        'data' => $transaksi
    ]);
}
    public function totalPendapatan()
{
    $total = Transaksi::where('status_pembayaran', 'PAID')
                      ->where('status_transaksi', 'SUCCESS')
                      ->sum('total_harga');

    return response()->json([
        'total_pendapatan' => $total
    ]);
}


    public function store(Request $request)
    {
        $request->validate([
            'produk_id' => 'required|exists:products,id',
            'produk_type' => 'required|string',
            'game_id' => 'required|string',
            'nama' => 'required|string',
            'server' => 'required|string',
            'jumlah' => 'required|integer|min:1',
            'total_harga' => 'required|integer|min:0',
            'payment_method' => 'nullable|string',
            'nohp' => 'required|string'
        ]);

        $invoiceNumber = 'INV-' . strtoupper(Str::random(10));

        $transaksi = Transaksi::create([
            'produk_id' => $request->produk_id,
            'produk_type' => $request->produk_type,
            'user_id' => auth()->id(), // nullable — fine for guest checkout
            'nama' => $request->nama,
            'game_id' => $request->game_id,
            'server' => $request->input('server'),
            'jumlah' => $request->jumlah,
            'payment_method' => $request->payment_method ?? 'Midtrans',
            'total_harga' => $request->total_harga,
            'nohp' => $request->nohp,
            'invoice_number' => $invoiceNumber,
            'status_pembayaran' => 'UNPAID',
            'status_transaksi' => 'PENDING',
        ]);

        // Midtrans transaction payload
        $params = [
            'transaction_details' => [
                'order_id' => $invoiceNumber,
                'gross_amount' => $request->total_harga,
            ],
            'customer_details' => [
                'first_name' => $request->nama,
                'phone' => $request->nohp,
            ],
            'callbacks' => [
                'finish' => env('APP_URL') . '/invoice?order_id=' . $invoiceNumber,
            ]
        ];

        try {
            $snapToken = Snap::getSnapToken($params);
        } catch (\Exception $e) {
            $transaksi->delete();
            return response()->json([
                'message' => 'Gagal terhubung ke Midtrans: ' . $e->getMessage(),
            ], 500);
        }

        $transaksi->snap_token = $snapToken;
        $transaksi->save();

        return response()->json([
            'message' => 'Transaksi berhasil disimpan',
            'data' => [
                'invoice' => $transaksi,
                'snap_token' => $snapToken,
            ]
        ], 201);
    }
}
