<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Transaction;
use Illuminate\Http\Request;

class TransactionController extends Controller
{
    public function index()
    {
        $transactions = Transaction::with(['transaction_details', 'vendor'])->when(request()->q, function ($transactions) {
            $transactions = $transactions->where('no_transaction', 'like', '%' . request()->q . '%');
        })
            ->where('user_id', auth()->user()->id)
            ->latest()
            ->paginate(10);
        $transactions->appends(['q' => request()->q]);
        return inertia('user/transactions/index', [
            'transactions' => $transactions
        ]);
    }

    public function show($no_transaction)
    {
        $transaction = Transaction::with(['transaction_details.product.vendor'])->where('no_transaction', $no_transaction)->first();
        $transaction_details = $transaction->transaction_details;
        return inertia('user/transactions/show', [
            'transaction' => $transaction,
            'transaction_details' => $transaction_details,
        ]);
    }
}
