<?php

namespace App\Http\Middleware;

use App\Http\Resources\AuthAdminResource;
use App\Http\Resources\AuthResource;
use App\Http\Resources\AuthTechnicianResource;
use App\Http\Resources\AuthVendorResource;
use App\Models\Store;
use Dotenv\Dotenv;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Middleware;
use Tightenco\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $dotenv = Dotenv::createImmutable(base_path());
        $dotenv->load();
        $pusherAppId = env('PUSHER_APP_ID');
        $pusherAppKey = env('PUSHER_APP_KEY');
        $pusherAppCluster = env('PUSHER_APP_CLUSTER');
        $authUser = $request->user();
        $authAdmin = auth()->guard('admin')->user();
        $authTechnician = auth()->guard('technician')->user();
        $authVendor = auth()->guard('vendor')->user();

        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $authUser ? new AuthResource($authUser) : null,
                'admin' => $authAdmin ? new AuthAdminResource($authAdmin) : null,
                'technician' => $authTechnician ? new AuthTechnicianResource($authTechnician) : null,
                'vendor' => $authVendor ? new AuthVendorResource($authVendor) : null,
            ],
            'flash_message' => fn () => [
                'type' => $request->session()->get('type'),
                'title' => $request->session()->get('title'),
                'message' => $request->session()->get('message'),
            ],
            'env' => [
                'app_name' => env('APP_NAME'),
            ],
            'ziggy' => function () use ($request) {
                return array_merge((new Ziggy)->toArray(), [
                    'location' => $request->url(),
                ]);
            },
        ]);
    }
}
