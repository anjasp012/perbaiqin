<?php

namespace App\Http\Controllers\Landing;

use App\Http\Controllers\Controller;
use App\Models\Collaboration;
use App\Models\Product;
use App\Models\Specialist;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index()
    {
        $products = Product::with('vendor')->latest()->take(8)->get();
        $specialists = Specialist::latest()->take(8)->get();
        $collaborations = Collaboration::with('technician')->latest()->take(8)->get();
        return inertia('landing/home/index', [
            'products' => $products,
            'specialists' => $specialists,
            'collaborations' => $collaborations,
        ]);
    }
}
