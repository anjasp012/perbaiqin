<?php

namespace App\Http\Controllers\Technician;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\Transaction;
use App\Models\TransactionDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CheckoutController extends Controller
{
    public function index()
    {
        $carts = Cart::with(['product.vendor'])
            ->where('technician_id', Auth::guard('technician')->user()->id)
            ->latest()
            ->get();
        $subTotal = $carts->sum(function ($cart) {
            return $cart->product->price * $cart->quantity;
        });
        return inertia('technician/checkout/index', [
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


        $carts = Cart::with(['product.vendor'])->where('technician_id', Auth::guard('technician')->user()->id)->get();
        $transactions = [];

        foreach ($carts as $cart) {
            $vendorId = $cart->product->vendor->id;

            if (!isset($transactions[$vendorId])) {
                $subTotal = $carts->where('product.vendor.id', $vendorId)->sum(function ($cartItem) {
                    return $cartItem->product->price * $cartItem->quantity;
                });
                $transactions[$vendorId] = Transaction::create([
                    'technician_id' => Auth::guard('technician')->user()->id,
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

        Cart::with(['product.vendor'])->where('technician_id', Auth::guard('technician')->user()->id)->delete();
        flashMessage('Success', 'Order created successfully', 'success');
        return redirect()->route('technician.transactions.index');
    }
}
