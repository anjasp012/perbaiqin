<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Technician;
use App\Models\User;
use App\Models\Specialist;
use App\Models\Admin;
class DashboardController extends Controller
{
    public function index()
    {
        return inertia('user/dashboard/index');
    }
}
