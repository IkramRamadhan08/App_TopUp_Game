<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;
use Exception;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $products = [
            // Free Fire
            ["name" => "50 Diamonds", "price" => 6478, "type" => "freefire", "category" => "diamond"],
            ["name" => "55 Diamonds", "price" => 7289, "type" => "freefire", "category" => "diamond"],
            ["name" => "70 Diamonds", "price" => 8908, "type" => "freefire", "category" => "diamond"],
            ["name" => "75 Diamonds", "price" => 9719, "type" => "freefire", "category" => "diamond"],
            ["name" => "80 Diamonds", "price" => 10529, "type" => "freefire", "category" => "diamond"],
            ["name" => "90 Diamonds", "price" => 12150, "type" => "freefire", "category" => "diamond"],
            ["name" => "100 Diamonds", "price" => 12956, "type" => "freefire", "category" => "diamond"],
            ["name" => "120 Diamonds", "price" => 15386, "type" => "freefire", "category" => "diamond"],
            ["name" => "130 Diamonds", "price" => 16999, "type" => "freefire", "category" => "diamond"],
            ["name" => "140 Diamonds", "price" => 17813, "type" => "freefire", "category" => "diamond"],
            ["name" => "145 Diamonds", "price" => 18626, "type" => "freefire", "category" => "diamond"],
            ["name" => "150 Diamonds", "price" => 19434, "type" => "freefire", "category" => "diamond"],
            ["name" => "160 Diamonds", "price" => 20239, "type" => "freefire", "category" => "diamond"],
            ["name" => "170 Diamonds", "price" => 21852, "type" => "freefire", "category" => "diamond"],
            ["name" => "180 Diamonds", "price" => 23465, "type" => "freefire", "category" => "diamond"],
            ["name" => "190 Diamonds", "price" => 25078, "type" => "freefire", "category" => "diamond"],
            ["name" => "200 Diamonds", "price" => 26691, "type" => "freefire", "category" => "diamond"],
            ["name" => "210 Diamonds", "price" => 28304, "type" => "freefire", "category" => "diamond"],
            ["name" => "230 Diamonds", "price" => 30730, "type" => "freefire", "category" => "diamond"],
            ["name" => "250 Diamonds", "price" => 34000, "type" => "freefire", "category" => "diamond"],
            ["name" => "270 Diamonds", "price" => 37000, "type" => "freefire", "category" => "diamond"],
            ["name" => "300 Diamonds", "price" => 40500, "type" => "freefire", "category" => "diamond"],
            ["name" => "350 Diamonds", "price" => 47200, "type" => "freefire", "category" => "diamond"],
            ["name" => "400 Diamonds", "price" => 54000, "type" => "freefire", "category" => "diamond"],
            ["name" => "450 Diamonds", "price" => 60700, "type" => "freefire", "category" => "diamond"],
            ["name" => "500 Diamonds", "price" => 67500, "type" => "freefire", "category" => "diamond"],
        
            // Mobile Legends
            ["name" => "Starlight Member", "price" => 149000, "type" => "mobilelegend", "category" => "starlight"],
            ["name" => "Starlight Member Plus", "price" => 299000, "type" => "mobilelegend", "category" => "starlight"],
            ["name" => "5 (5+0) Diamonds", "price" => 1478, "type" => "mobilelegend", "category" => "diamond"],
            ["name" => "10 (9+1) Diamonds", "price" => 2995, "type" => "mobilelegend", "category" => "diamond"],
            ["name" => "12 (11+1) Diamonds", "price" => 3446, "type" => "mobilelegend", "category" => "diamond"],
            ["name" => "14 (13+1) Diamonds", "price" => 3993, "type" => "mobilelegend", "category" => "diamond"],
            ["name" => "15 (15+0) Diamonds", "price" => 4432, "type" => "mobilelegend", "category" => "diamond"],
            ["name" => "16 (16+1) Diamonds", "price" => 4923, "type" => "mobilelegend", "category" => "diamond"],
            ["name" => "18 (17+1) Diamonds", "price" => 4991, "type" => "mobilelegend", "category" => "diamond"],
            ["name" => "19 (17+2) Diamonds", "price" => 5414, "type" => "mobilelegend", "category" => "diamond"],
            ["name" => "20 (18+2) Diamonds", "price" => 5989, "type" => "mobilelegend", "category" => "diamond"],
            ["name" => "22 (20+2) Diamonds", "price" => 6440, "type" => "mobilelegend", "category" => "diamond"],
            ["name" => "28 (25+3) Diamonds", "price" => 7876, "type" => "mobilelegend", "category" => "diamond"],
            ["name" => "30 (28+2) Diamonds", "price" => 8436, "type" => "mobilelegend", "category" => "diamond"],
            ["name" => "36 (33+3) Diamonds", "price" => 9977, "type" => "mobilelegend", "category" => "diamond"],
            ["name" => "38 (35+3) Diamonds", "price" => 10378, "type" => "mobilelegend", "category" => "diamond"],
            ["name" => "40 (36+4) Diamonds", "price" => 10977, "type" => "mobilelegend", "category" => "diamond"],
            ["name" => "48 (43+5) Diamonds", "price" => 12194, "type" => "mobilelegend", "category" => "diamond"],
            ["name" => "56 (51+5) Diamonds", "price" => 14156, "type" => "mobilelegend", "category" => "diamond"],
            ["name" => "70 (63+7) Diamonds", "price" => 17356, "type" => "mobilelegend", "category" => "diamond"],
            ["name" => "85 (76+9) Diamonds", "price" => 20977, "type" => "mobilelegend", "category" => "diamond"],
            ["name" => "100 (90+10) Diamonds", "price" => 24561, "type" => "mobilelegend", "category" => "diamond"],
            ["name" => "170 (153+17) Diamonds", "price" => 42145, "type" => "mobilelegend", "category" => "diamond"],
            ["name" => "185 (167+18) Diamonds", "price" => 45977, "type" => "mobilelegend", "category" => "diamond"],
            ["name" => "240 (216+24) Diamonds", "price" => 59891, "type" => "mobilelegend", "category" => "diamond"],
            ["name" => "275 (247+28) Diamonds", "price" => 67339, "type" => "mobilelegend", "category" => "diamond"],
            ["name" => "306 (276+30) Diamonds", "price" => 72833, "type" => "mobilelegend", "category" => "diamond"],
            ["name" => "370 (333+37) Diamonds", "price" => 99797, "type" => "mobilelegend", "category" => "diamond"],
            ["name" => "384 (348+36) Diamonds", "price" => 103789, "type" => "mobilelegend", "category" => "diamond"],
            ["name" => "408 (367+41) Diamonds", "price" => 108062, "type" => "mobilelegend", "category" => "diamond"],
            ["name" => "406 (366+40) Diamonds", "price" => 109777, "type" => "mobilelegend", "category" => "diamond"],
            ["name" => "518 (467+51) Diamonds", "price" => 139716, "type" => "mobilelegend", "category" => "diamond"],
            ["name" => "554 (500+54) Diamonds", "price" => 149697, "type" => "mobilelegend", "category" => "diamond"],
            ["name" => "568 (503+65) Diamonds", "price" => 147393, "type" => "mobilelegend", "category" => "diamond"],
            ["name" => "716 (637+79) Diamonds", "price" => 187312, "type" => "mobilelegend", "category" => "diamond"],
            ["name" => "750 (676+74) Diamonds", "price" => 196122, "type" => "mobilelegend", "category" => "diamond"],
            ["name" => "790 (703+87) Diamonds", "price" => 207272, "type" => "mobilelegend", "category" => "diamond"],
            ["name" => "875 (774+101) Diamonds", "price" => 225922, "type" => "mobilelegend", "category" => "diamond"],

            // Honor Of King
            
                ["name" => "30 Tokens", "price" => 8000, "type" => "honorofkings", "category" => "token"],
                ["name" => "60 Tokens", "price" => 15000, "type" => "honorofkings", "category" => "token"],
                ["name" => "120 Tokens", "price" => 30000, "type" => "honorofkings", "category" => "token"],
                ["name" => "180 Tokens", "price" => 44000, "type" => "honorofkings", "category" => "token"],
                ["name" => "300 Tokens", "price" => 73000, "type" => "honorofkings", "category" => "token"],
                ["name" => "450 Tokens", "price" => 109000, "type" => "honorofkings", "category" => "token"],
                ["name" => "600 Tokens", "price" => 145000, "type" => "honorofkings", "category" => "token"],
                ["name" => "930 Tokens", "price" => 215000, "type" => "honorofkings", "category" => "token"],
                ["name" => "1980 Tokens", "price" => 435000, "type" => "honorofkings", "category" => "token"],
                ["name" => "3280 Tokens", "price" => 715000, "type" => "honorofkings", "category" => "token"],
                ["name" => "6480 Tokens", "price" => 1350000, "type" => "honorofkings", "category" => "token"],
                ["name" => "Monthly Pass", "price" => 59000, "type" => "honorofkings", "category" => "subscription"],
                ["name" => "Weekly Pass", "price" => 19000, "type" => "honorofkings", "category" => "subscription"],
            


            // Pulsa
            ["name" => "Pulsa Telkomsel", "price" => 6500, "type" => "telkomsel", "category" => "pulsa"],
            ["name" => "Pulsa XL 50K", "price" => 60000, "type" => "XL", "category" => "pulsa"],
            ["name" => "Pulsa indosat 60K", "price" => 80000, "type" => "indosat", "category" => "pulsa"],
            ["name" => "Pulsa Smartfren 80K", "price" => 85500, "type" => "smartfren", "category" => "pulsa"],

            // Kuota
            ["name" => "Kuota Telkomsel 1GB", "price" => 9500, "type" => "Telkomsel",  "category" => "kuota"],
            ["name" => "Kuota XL 2GB", "price" => 15500, "type" => "XL", "category" => "kuota"],
            ["name" => "Kuota Indosat 5GB", "price" => 20000, "type" => "indosat", "category" => "kuota"],
            ["name" => "Kuota Smartfren 2GB", "price" => 15500, "type" => "smartfren", "category" => "kuota"],
        ];

       foreach ($products as $index => $product) {
            try {
                $result = Product::updateOrCreate(
                    ['name' => $product['name'], 'type' => $product['type']],
                    $product
                );

                $action = $result->wasRecentlyCreated ? 'Created' : 'Updated';
                echo "[{$index}] {$action}: {$product['name']} ({$product['type']})\n";

            } catch (Exception $e) {
                echo "[ERROR {$index}] Gagal menyimpan '{$product['name']}' => {$e->getMessage()}\n";
            }
        }

        echo "✅ Selesai seeding semua data produk.\n";
    }
}