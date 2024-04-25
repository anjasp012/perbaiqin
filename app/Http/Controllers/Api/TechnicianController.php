<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Technician;
use Illuminate\Http\Request;

class TechnicianController extends Controller
{
    public function index(Request $request)
    {
        $perPage = $request->input('per_page', 10);
        $searchQuery = $request->input('query');

        // Get technicians with optional search
        $technicians = Technician::when($searchQuery, function ($query) use ($searchQuery) {
            $query->where('name', 'like', "%$searchQuery%");
        })->paginate($perPage);

        // Transform technicians data
        $technicians->getCollection()->transform(function ($technician) {
            return [
                'id' => (int)$technician->id,
                'name' => (string)$technician->name,
                'slug' => (string)$technician->slug,
                'image' => $technician->image ? url($technician->image) : null,
                'email' => (string)$technician->email,
                'email_verified_at' => $technician->email_verified_at ? $technician->email_verified_at->format('Y-m-d H:i:s') : null,
                'phone' => $technician->phone ? (string)$technician->phone : null,
                'price' => $technician->price !== null ? (float)$technician->price : null,
                'created_at' => $technician->created_at->format('Y-m-d H:i:s'),
                'updated_at' => $technician->updated_at->format('Y-m-d H:i:s'),
            ];
        });

        return response()->json([
            'success' => true,
            'data' => $technicians
        ], 200, [], JSON_PRETTY_PRINT);
    }

    public function homepage()
    {
        $take = 5; // Set the number of items to take

        // Get the first 5 technicians
        $technicians = Technician::take($take)->get();

        // Transform technicians data
        $transformedTechnicians = $technicians->map(function ($technician) {
            return [
                'id' => (int) $technician->id,
                'name' => (string) $technician->name,
                'slug' => (string) $technician->slug,
                'image' => $technician->image ? url($technician->image) : null,
                'email' => (string) $technician->email,
                'email_verified_at' => $technician->email_verified_at ? $technician->email_verified_at->format('Y-m-d H:i:s') : null,
                'phone' => $technician->phone ? (string) $technician->phone : null,
                'price' => $technician->price !== null ? (float) $technician->price : null,
                'created_at' => $technician->created_at->format('Y-m-d H:i:s'),
                'updated_at' => $technician->updated_at->format('Y-m-d H:i:s'),
            ];
        });

        return response()->json(['data' => $transformedTechnicians], 200, [], JSON_PRETTY_PRINT);
    }
}
