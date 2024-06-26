<?php

namespace App\Http\Controllers\Technician;

use App\Http\Controllers\Controller;
use App\Models\TCollaboration;
use Illuminate\Http\Request;

class CollaborationOrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $collaborationOrders = TCollaboration::with('t_collaboration_details')->when(request()->q, function ($collaborationOrders) {
            $collaborationOrders = $collaborationOrders->where('no_transaction', 'like', '%' . request()->q . '%');
        })
            ->where('technician_id', auth()->guard('technician')->user()->id)
            ->latest()
            ->paginate(10);
        $collaborationOrders->appends(['q' => request()->q]);
        return inertia('technician/collaboration-orders/index', [
            'collaborationOrders' => $collaborationOrders
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
        $transaction = TCollaboration::with(['t_collaboration_details.collaboration.technician'])->where('no_transaction_collaboration', $no_transaction)->first();
        $transaction_details = $transaction->t_collaboration_details;
        $totalPrice = $transaction_details->sum(function ($details) {
            return $details->collaboration->price;
        });
        return inertia('technician/collaboration-orders/show', [
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
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
