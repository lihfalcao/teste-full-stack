<?php

namespace App\Http\Controllers;

use App\Region;

class RegionController extends Controller
{
    public function index()
    {
        $regions = Region::orderBy('name')->get(['id', 'name']);

        return response()->json($regions);
    }
}


