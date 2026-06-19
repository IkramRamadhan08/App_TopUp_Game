<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;


class ProductController extends Controller
{
public function product(Request $request)
{
    $type = $request->query('type');

    if ($type) {
        $products = Product::where('type', $type)->get();
    } else {
        $products = Product::limit(100)->get(); // atau pakai ->paginate(50)

    }

    return response()->json($products);
}

}
