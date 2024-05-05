<?php

namespace App\Http\Controllers\Technician;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\ProductReview;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProductReviewController extends Controller
{
    public function create($id, $slug)
    {
        $transaction = Transaction::findOrFail($id);
        $product = Product::where('slug', $slug)->first();
        return inertia('technician/transactions/ratereview', [
            'transaction' => $transaction,
            'product' => $product
        ]);
    }

    public function store(Request $request, $id,  $slug)
    {
        $product = Product::where('slug', $slug)->first();
        $productReview = new ProductReview();
        $productReview->id_technician = Auth::guard('technician')->user()->id;
        $productReview->id_product = $product->id;
        $productReview->rate = $request->rate;
        $productReview->review = $request->review;
        $productReview->save();

        flashMessage('success', 'Rate & Review created successfully.');
        return redirect()->route('technician.transactions.show', $id);
    }
}
