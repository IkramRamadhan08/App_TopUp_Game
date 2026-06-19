<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTransaksiTable extends Migration
{
    public function up()
    {
        Schema::create('transaksi', function (Blueprint $table) {
            $table->id();
            $table->foreignId('produk_id')->constrained('products')->onDelete('cascade');
            $table->string('produk_type')->nullable();
            $table->unsignedBigInteger('user_id')->nullable(); // jika user login
            $table->string('nama');
            $table->string('nickname')->nullable();
            $table->string('game_id');
            $table->string('server');
            $table->integer('jumlah');
            $table->integer('total_harga');
            $table->string('payment_method');
            $table->string('nohp');
            $table->enum('status_pembayaran', ['UNPAID', 'PAID'])->default('UNPAID');
            $table->enum('status_transaksi', ['PENDING', 'SUCCESS', 'FAILED'])->default('PENDING');
            $table->string('invoice_number')->unique();
            $table->text('snap_token')->nullable(); // kalau pakai Midtrans
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('transaksi');
    }
}
