<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
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
        return inertia('user/cart/index', [
            'carts' => $carts,
            'subTotal' => $subTotal
        ]);
    }

    public function post($id)
    {
        Product::findOrFail($id);
        $cart = Cart::where('user_id', Auth::id())->count();
        if (5 <= $cart) {
            flashMessage('fail', 'Cart is full please delete some products from cart', 'error');
        } else {
            $cart = Cart::where('user_id', Auth::id())->where('product_id', $id)->first();
            if ($cart) {
                $cart->update([
                    'quantity' => $cart->quantity + 1
                ]);
            } else {
                Cart::create([
                    'user_id' => Auth::id(),
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
