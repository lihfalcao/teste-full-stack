<?php

namespace App\Http\Middleware;

use Closure;
use App\User;

class AuthenticateApiToken
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $token = $request->bearerToken();

        if (!$token) {
            return response()->json(['message' => 'Token inválido'], 401);
        }

        $hashed = hash('sha256', $token);

        $user = \App\User::where('api_token', $hashed)->first();

        if (!$user) {
            return response()->json(['message' => 'Token inválido'], 401);
        }

        auth()->login($user);

        return $next($request);
    }

}

