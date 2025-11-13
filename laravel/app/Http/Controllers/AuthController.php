<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\AuthService;

class AuthController extends Controller
{
    protected $service;

    public function __construct(AuthService $service)
    {
        $this->service = $service;
    }

    public function login(Request $request)
    {
        $resp = $this->service->login($request);
        return response()->json($resp['data'], $resp['status']);
    }

    public function refresh(Request $request)
    {
        $resp = $this->service->refresh($request);
        return response()->json($resp['data'], $resp['status']);
    }

    public function logout(Request $request)
    {
        $resp = $this->service->logout($request->user());
        return response()->json($resp['data'], $resp['status']);
    }

    public function user(Request $request)
    {
        return response()->json([
            'user' => $request->user()
        ]);
    }

}

