<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckSelectedStore
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
            // Periksa apakah pengguna memiliki selected_store_id
            if (!$request->user() || !$request->user()->selected_store_id) {
                flashMessage('Pilih Toko', 'Pilih Toko Terlebih dahulu untuk dikelola', 'warning');
                return redirect()->route('dashboard');
            }
        return $next($request);
    }
}
