<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Transaksi extends Model
{
    use HasFactory;

    protected $table = 'transaksi'; // Sesuaikan dengan nama tabel

    protected $fillable = [
        'produk_id',
        'produk_type',
        'nama',
        'user_id',
        'game_id',
        'server',
        'jumlah',
        'total_harga',
        'payment_method',
        'nohp',
        'invoice_number',
        'snap_token',
        'status_pembayaran',
        'status_transaksi',
    ];

    // Relasi ke produk
    public function produk()
    {
        return $this->belongsTo(Product::class, 'produk_id');
    }

    // Relasi ke user (opsional jika transaksi bisa tanpa login)
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Relasi ke pembayaran
    // public function payment()
    // {
    //     return $this->hasOne(Payment::class, 'transaction_id');
    // }
}
