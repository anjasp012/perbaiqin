<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\ProductReview;
use App\Models\Transaction;
use App\Models\TransactionDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProductReviewController extends Controller
{
    public function create($id, $slug)
    {
        $transaction = Transaction::findOrFail($id);
        $product = Product::where('slug', $slug)->first();
        return inertia('user/transactions/ratereview', [
            'transaction' => $transaction,
            'product' => $product
        ]);
    }

    public function store(Request $request, $id, $slug)
    {
        $transactionDetail = TransactionDetail::findOrFail($id);
        $product = Product::where('slug', $slug)->first();
        $productReview = new ProductReview();
        $productReview->user_id = Auth::id();
        $productReview->product_id = $product->id;
        $productReview->rate = $request->rate;
        $productReview->review = $request->review;
        $productReview->save();

        $transactionDetail->update([
            'reviewed' => true
        ]);

        flashMessage('success', 'Rate & Review created successfully.');
        return redirect()->back();
    }
}
