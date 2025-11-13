<?php 
namespace App\Http\Middleware;

use Closure;
use App\User;
use Carbon\Carbon;

class ApiTokenMiddleware
{
    public function handle($request, Closure $next)
    {
        $token = $request->bearerToken();

        if (!$token) {
            return response()->json(['message' => 'Token inválido'], 401);
        }

        $user = \App\User::where('api_token', $token)->first();

        if (!$user) {
            return response()->json(['message' => 'Token inválido'], 401);
        }

        auth()->login($user);

        return $next($request);
    }

    
}