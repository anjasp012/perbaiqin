<?php

namespace App\Http\Controllers\vendor;

use App\Http\Controllers\Controller;
use App\Models\Transaction;
use Illuminate\Http\Request;

class TransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $transactions = Transaction::with('transaction_details')->when(request()->q, function ($transactions) {
            $transactions = $transactions->where('no_transaction', 'like', '%' . request()->q . '%');
        })
            ->where('vendor_id', auth()->guard('vendor')->user()->id)
            ->latest()
            ->paginate(10);
        $transactions->appends(['q' => request()->q]);
        return inertia('vendor/transactions/index', [
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
    public function show(string $no_transaction)
    {
        $transaction = Transaction::with(['transaction_details.product.vendor'])->where('no_transaction', $no_transaction)->first();
        $transaction_details = $transaction->transaction_details;
        $totalPrice = $transaction_details->sum(function ($details) {
            return $details->product->price * $details->quantity;
        });
        return inertia('vendor/transactions/show', [
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
        $transaction = Transaction::findOrFail($id);
        $transaction->update([
            'transaction_status' => $request->transaction_status
        ]);
        flashMessage('success', 'Transaction updated successfully', 'success');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
