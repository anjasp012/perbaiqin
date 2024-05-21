<?php

namespace App\Http\Controllers\Landing;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::with('vendor')
            ->when(request()->q, function ($query) {
                $query->where('name', 'like', '%' . request()->q . '%');
            })
            ->when(request()->cities, function ($query) {
                $query->whereHas('vendor', function ($vendorQuery) {
                    $vendorQuery->whereIn('city', request()->cities);
                });
            })
            ->latest()
            ->paginate(12);
        $cities = Product::with('vendor')
            ->get()
            ->groupBy(function ($product) {
                return $product->vendor->city;
            })
            ->keys();
        $citySelected = request()->cities ?? [];
        $query = request()->q;
        $products->appends(['q' => request()->q]);
        return inertia('landing/products/index', [
            'products' => $products,
            'cities' => $cities,
            'citySelected' => $citySelected,
            'query' => $query,
        ]);
    }

    public function show($slug)
    {
        $product = Product::with(['vendor', 'rateReviews'])->where('slug', $slug)->firstOrFail();
        $reviews = $product->rateReviews;
        $products = Product::with('vendor')->where('id', '!=', $product->id)->take(4)->get();
        $vendor = $product->vendor;
        return inertia('landing/products/show', [
            'product' => $product,
            'reviews' => $reviews,
            'products' => $products,
            'vendor' => $vendor,
        ]);
    }
}
