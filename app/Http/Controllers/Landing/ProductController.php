<?php

namespace App\Http\Controllers\Landing;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::with('vendor')->when(request()->q, function ($products) {
            $products = $products->where('name', 'like', '%' . request()->q . '%');
        })->latest()->paginate(12);
        $products->appends(['q' => request()->q]);

        return inertia('landing/products/index', [
            'products' => $products,
        ]);
    }

    public function show($slug)
    {
        $product = Product::with(['vendor'])->where('slug', $slug)->firstOrFail();
        $products = Product::with('vendor')->where('id', '!=', $product->id)->take(4)->get();
        return inertia('landing/products/show', [
            'product' => $product,
            'products' => $products,
        ]);
    }
}
