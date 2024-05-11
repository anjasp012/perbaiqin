<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Collaboration;
use App\Models\CollaborationReview;
use App\Models\Product;
use App\Models\ProductReview;
use App\Models\TCollaboration;
use App\Models\TCollaborationDetail;
use App\Models\Transaction;
use App\Models\TransactionDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CollaborationReviewController extends Controller
{
    public function create($id, $slug)
    {
        $transaction = TCollaboration::findOrFail($id);
        $collaboration = Collaboration::where('slug', $slug)->first();
        return inertia('user/transactions/ratereview', [
            'transaction' => $transaction,
            'collaboration' => $collaboration
        ]);
    }

    public function store(Request $request, $id, $slug)
    {
        $transactionDetail = TCollaborationDetail::findOrFail($id);
        $product = Collaboration::where('slug', $slug)->first();
        $productReview = new CollaborationReview();
        $productReview->user_id = Auth::id();
        $productReview->collaboration_id = $product->id;
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
