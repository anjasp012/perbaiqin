<?php

namespace App\Http\Controllers\Landing;

use App\Http\Controllers\Controller;
use App\Models\Collaboration;
use Illuminate\Http\Request;

class CollaborationController extends Controller
{
    public function index()
    {
        $collaborations = Collaboration::with('technician')
            ->when(request()->q, function ($query) {
                $query->where('name', 'like', '%' . request()->q . '%');
            })
            ->when(request()->cities, function ($query) {
                $query->whereHas('technician', function ($technicianQuery) {
                    $technicianQuery->whereIn('city', request()->cities);
                });
            })
            ->latest()
            ->paginate(12);
        $collaborations->appends(['q' => request()->q]);
        $cities = Collaboration::with('technician')
            ->get()
            ->groupBy(function ($collaboration) {
                return $collaboration->technician->city;
            })
            ->keys();
        $citySelected = request()->cities ?? [];
        $query = request()->q;
        return inertia('landing/collaborations/index', [
            'collaborations' => $collaborations,
            'cities' => $cities,
            'citySelected' => $citySelected,
            'query' => $query,

        ]);
    }

    public function show($slug)
    {
        $collaboration = Collaboration::with(['technician', 'rateReviews'])->where('slug', $slug)->firstOrFail();
        $reviews = $collaboration->rateReviews;
        $collaborations = Collaboration::with('technician')->where('id', '!=', $collaboration->id)->take(4)->get();
        return inertia('landing/collaborations/show', [
            'collaboration' => $collaboration,
            'collaborations' => $collaborations,
            'reviews' => $reviews,
            'technician' => $collaboration->technician,
        ]);
    }
}
