<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
{
    Schema::create('products', function (Blueprint $table) {
    $table->id();
    $table->string('name')->unique();          // Nama produk, misal: 5 Diamonds, 10 Diamonds, 15k Pulsa
    $table->integer('price');         // Harga produk dalam rupiah
    $table->string('type');           // Jenis produk: 'freefire', 'mobilelegend', 'higgsdomino', 'pulsa', 'kuota'
    $table->string('category')->nullable(); // Misal: 'diamond', 'pulsa', 'kuota', opsional
    $table->timestamps();
});

}


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
