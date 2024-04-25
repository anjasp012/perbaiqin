<?php

namespace App\Http\Controllers\Vendor;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Str;


class ProductController extends Controller
{
    public function index()
    {
        $products = Product::with('vendor')->when(request()->q, function($products) {
            $products = $products->where('name', 'like', '%'. request()->q . '%');
        })
        ->where('vendor_id', auth()->guard('vendor')->user()->id)
        ->latest()
        ->paginate(10);
        $products->appends(['q' => request()->q]);
        return inertia('vendor/products/index', [
            'products' => $products
        ]);
    }

    public function create()
    {
        return inertia('vendor/products/create');
    }

    public function edit($slug)
    {
        $product = Product::where('slug', $slug)->firstOrFail();
        $vendorId = auth()->guard('vendor')->user()->id;
        if ($product->vendor_id !== $vendorId) {
            flashMessage('warning', 'Sorry you are not granted permission.');
            return redirect()->back();
        }
        return inertia('vendor/products/edit', 
        ['product' => $product]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
        ]);

        $imagePath = $request->file('image')->store('products');
        $product = new Product();
        $product->name = $request->name;
        $uniqueString = Str::random(5);
        $slug = Str::slug($request->name) . '-' . $uniqueString;
        $product->slug = $slug;
        $product->image = $imagePath;
        $product->description = $request->description;
        $product->price = $request->price;
        $product->vendor_id = auth()->guard('vendor')->user()->id;
        $product->save();
        flashMessage('success', 'Product created successfully.');
        return redirect()->route('vendor.products.index');
    }

    public function update(Request $request, $slug)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
        ]);
        $product = Product::where('slug', $slug)->firstOrFail();
        $vendorId = auth()->guard('vendor')->user()->id;
        if ($product->vendor_id !== $vendorId) {
            flashMessage('warning', 'Sorry you are not granted permission.');
            return redirect()->back();
        }

        // Check if name has changed
        if ($request->name !== $product->name) {
            // If name has changed, generate new slug
            $uniqueString = Str::random(5);
            $slug = Str::slug($request->name) . '-' . $uniqueString;
        }

        $product->name = $request->name;
        $product->slug = $slug;
        $product->description = $request->description;
        $product->price = $request->price;
        $product->save();
        flashMessage('success', 'Product updated successfully.');
        return redirect()->route('vendor.products.index');
    }

    public function destroy($slug)
    {
        $product = Product::where('slug', $slug)->firstOrFail();
        $vendorId = auth()->guard('vendor')->user()->id;
        if ($product->vendor_id !== $vendorId) {
            flashMessage('warning', 'Sorry you are not granted permission.');
            return redirect()->back();
        }
        $product->delete();
        flashMessage('success', 'Product deleted successfully.');
        return redirect()->route('vendor.products.index');
    }
}
