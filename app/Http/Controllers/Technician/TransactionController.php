<?php

namespace App\Http\Controllers\Technician;

use App\Http\Controllers\Controller;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TransactionController extends Controller
{
    public function index()
    {
        $technician = Auth::guard('technician')->user();
        $transactions = Transaction::with(['transaction_details', 'vendor'])->when(request()->q, function ($transactions) {
            $transactions = $transactions->where('no_transaction', 'like', '%' . request()->q . '%');
        })
            ->where('technician_id', $technician->id)
            ->latest()
            ->paginate(10);
        $transactions->appends(['q' => request()->q]);
        return inertia('technician/transactions/index', [
            'transactions' => $transactions
        ]);
    }

    public function show($no_transaction)
    {
        $transaction = Transaction::with(['transaction_details.product.vendor'])->where('no_transaction', $no_transaction)->first();
        $transaction_details = $transaction->transaction_details;
        return inertia('technician/transactions/show', [
            'transaction' => $transaction,
            'transaction_details' => $transaction_details,
        ]);
    }
}
