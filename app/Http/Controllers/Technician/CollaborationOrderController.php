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
        $collaborationOrders = TCollaboration::with('tcollaboration_details')->when(request()->q, function ($collaborationOrders) {
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
    public function show(string $id)
    {
        //
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
