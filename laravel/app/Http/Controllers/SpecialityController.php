<?php

namespace App\Http\Controllers;

use App\Speciality;
use Illuminate\Http\Request;

class SpecialityController extends Controller
{
    /**
     * Listar todas as especialidades
     */
    public function index()
    {
        $specialities = Speciality::orderBy('name')->get();
        return response()->json($specialities, 200);
    }
}

