<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Collaboration;
use App\Models\TCollaboration;
use Illuminate\Http\Request;

class CollaborationOrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $transactions = TCollaboration::with('t_collaboration_details', 'technician')->when(request()->q, function ($transactions) {
            $transactions = $transactions->where('no_transaction_collaboration', 'like', '%' . request()->q . '%');
        })
            ->where('user_id', auth()->user()->id)
            ->latest()
            ->paginate(10);
        return inertia('user/collaboration-orders/index', [
            'transactions' => $transactions
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $no_transaction_collaboration)
    {
        $transaction = TCollaboration::with(['t_collaboration_details.collaboration.technician'])->where('no_transaction_collaboration', $no_transaction_collaboration)->first();
        $transaction_details = $transaction->t_collaboration_details;
        $totalPrice = $transaction_details->sum(function ($details) {
            return $details->collaboration->price;
        });
        return inertia('user/collaboration-orders/show', [
            'transaction' => $transaction,
            'transaction_details' => $transaction_details,
            'totalPrice' => $totalPrice,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $transaction = TCollaboration::findOrFail($id);
        $transaction->update([
            'transaction_collaboration_status' => $request->transaction_collaboration_status
        ]);
        flashMessage('success', 'Collaboration Order updated successfully', 'success');
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
