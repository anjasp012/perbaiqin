<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\Collaboration;
use App\Models\TCollaboration;
use App\Models\TCollaborationDetail;
use App\Models\Transaction;
use App\Models\TransactionDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CheckoutController extends Controller
{
    public function index()
    {
        $carts = Cart::with(['product.vendor'])
            ->where('user_id', auth()->user()->id)
            ->latest()
            ->get();
        $subTotal = $carts->sum(function ($cart) {
            return $cart->product->price * $cart->quantity;
        });
        return inertia('user/checkout/index', [
            'carts' => $carts,
            'subTotal' => $subTotal
        ]);
    }

    public function checkoutNow(Request $request)
    {
        $request->validate([
            'buyer_name' => 'required',
            'buyer_phone' => 'required',
            'address' => 'required',
            'city' => 'required',
            'province' => 'required',
            'postal_code' => 'required',
            'payment_method' => 'required',
        ]);


        $carts = Cart::with(['product.vendor'])->where('user_id', Auth::id())->get();
        $transactions = [];

        foreach ($carts as $cart) {
            $vendorId = $cart->product->vendor->id;

            if (!isset($transactions[$vendorId])) {
                $subTotal = $carts->where('product.vendor.id', $vendorId)->sum(function ($cartItem) {
                    return $cartItem->product->price * $cartItem->quantity;
                });
                $transactions[$vendorId] = Transaction::create([
                    'user_id' => Auth::id(),
                    'no_transaction' => 'PQ-' . rand(10000, 99999),
                    'buyer_name' => $request->buyer_name,
                    'buyer_phone' => $request->buyer_phone,
                    'address' => $request->address,
                    'city' => $request->city,
                    'province' => $request->province,
                    'postal_code' => $request->postal_code,
                    'payment_method' => $request->payment_method,
                    'vendor_id' => $vendorId,
                    'total_price' => $subTotal,
                    'transaction_status' => 'PROCESS',
                ]);
            }

            // Buat detail transaksi untuk produk ini
            TransactionDetail::create([
                'transaction_id' => $transactions[$vendorId]->id,
                'product_id' => $cart->product->id,
                'product_name' => $cart->product->name,
                'product_price' => $cart->product->price,
                'quantity' => $cart->quantity,
            ]);
        }

        Cart::with(['product.vendor'])->where('user_id', Auth::id())->delete();
        flashMessage('Success', 'Order created successfully', 'success');
        return redirect()->route('user.transactions.index');
    }

    public function checkoutCollaboration(Request $request, $id)
    {
        $collaboration = Collaboration::with('technician')->where('id', $id)->firstOrFail();
        $subTotal = $collaboration->price;
        return inertia('user/checkout-collaboration/index', [
            'collaboration' => $collaboration,
            'subTotal' => $subTotal
        ]);
    }
    public function checkoutCollaborationNow(Request $request, $id)
    {
        $collaboration = Collaboration::with('technician')->where('id', $id)->firstOrFail();

        $request->validate([
            'buyer_name' => 'required',
            'buyer_phone' => 'required',
            'address' => 'required',
            'city' => 'required',
            'province' => 'required',
            'postal_code' => 'required',
            'payment_method' => 'required',
        ]);
        $transactions = TCollaboration::create([
            'user_id' => Auth::id(),
            'no_transaction_collaboration' => 'PQC-' . rand(10000, 99999),
            'buyer_name' => $request->buyer_name,
            'buyer_phone' => $request->buyer_phone,
            'address' => $request->address,
            'city' => $request->city,
            'province' => $request->province,
            'postal_code' => $request->postal_code,
            'payment_method' => $request->payment_method,
            'technician_id' => $collaboration->technician_id,
            'total_price' => $collaboration->price,
        ]);
        TCollaborationDetail::create([
            't_collaboration_id' => $transactions->id,
            'collaboration_id' => $collaboration->id,
            'collaboration_name' => $collaboration->name,
            'collaboration_price' => $collaboration->price,
        ]);

        flashMessage('Success', 'Collaboration Order created successfully', 'success');
        return redirect()->route('user.transactions.index');
    }
}
