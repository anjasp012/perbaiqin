<?php

namespace App\Http\Controllers\Technician;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    public function index()
    {
        $technician = Auth::guard('technician')->user();
        $carts = Cart::with(['product.vendor'])
            ->where('technician_id', $technician->id)
            ->latest()
            ->get();
        $subTotal = $carts->sum(function ($cart) {
            return $cart->product->price * $cart->quantity;
        });
        return inertia('technician/cart/index', [
            'carts' => $carts,
            'subTotal' => $subTotal
        ]);
    }

    public function post($id)
    {
        Product::findOrFail($id);
        $cart = Cart::where('technician_id', Auth::guard('technician')->user()->id)->count();
        if (5 <= $cart) {
            flashMessage('fail', 'Cart is full please delete some products from cart', 'error');
        } else {
            $cart = Cart::where('technician_id', Auth::guard('technician')->user()->id)->where('product_id', $id)->first();
            if ($cart) {
                $cart->update([
                    'quantity' => $cart->quantity + 1
                ]);
            } else {
                Cart::create([
                    'technician_id' => Auth::guard('technician')->user()->id,
                    'product_id' => $id,
                    'quantity' => 1,
                ]);
            }

            flashMessage('success', 'Cart added successfully', 'success');
        }
    }

    public function destroy($id)
    {
        $cart = Cart::findOrFail($id);
        $cart->delete();

        flashMessage('Deleted', 'Product deleted successfully.');
    }
}
