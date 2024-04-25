<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class VendorMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        if (!auth()->guard('vendor')->check()) {
            return redirect()->route('vendor.login');
        }

        return $next($request);
    }
}
