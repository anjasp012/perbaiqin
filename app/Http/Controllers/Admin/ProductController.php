<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::with('vendor')->when(request()->q, function ($products) {
            $products = $products->where('name', 'like', '%' . request()->q . '%');
        })->latest()->paginate(10);
        //append query string to pagination links
        $products->appends(['q' => request()->q]);
        return inertia('admin/products/index', [
            'products' => $products
        ]);
    }
    public function create()
    {
        return inertia('admin/products/create');
    }

    public function edit($slug)
    {
        $product = Product::where('slug', $slug)->firstOrFail();
        return inertia('admin/products/edit', ['product' => $product]);
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
        $product->slug = Str::slug($request->name);
        $product->image = $imagePath;
        $product->description = $request->description;
        $product->price = $request->price;
        $product->vendor_id = $request->vendor_id;
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
        $product->name = $request->name;
        $product->slug = Str::slug($request->name);
        $product->description = $request->description;
        $product->price = $request->price;
        $product->vendor_id = $request->vendor_id;
        $product->save();
        flashMessage('success', 'Product updated successfully.');
        return redirect()->route('vendor.products.index');
    }

    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        $product->delete();
        flashMessage('success', 'Product deleted successfully.');
        return redirect()->route('admin.products.index');
    }
}
