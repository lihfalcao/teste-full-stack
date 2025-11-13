<?php

namespace App\Http\Middleware;

use Closure;

class Cors
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
        // Allowed origins
        $allowedOrigins = [
            'http://localhost:4200',
            'http://localhost:8082',
            'http://127.0.0.1:4200',
            'http://127.0.0.1:8082',
        ];

        $origin = $request->headers->get('Origin');
        $allowedOrigin = in_array($origin, $allowedOrigins) ? $origin : $allowedOrigins[0];

        // Handle preflight requests
        if ($request->getMethod() === "OPTIONS") {
            return response('', 200)
                ->header('Access-Control-Allow-Origin', $allowedOrigin)
                ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH')
                ->header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, X-Token-Auth, Authorization, Accept, X-CSRF-TOKEN')
                ->header('Access-Control-Allow-Credentials', 'true')
                ->header('Access-Control-Max-Age', '3600');
        }

        $response = $next($request);

        // Add CORS headers to response
        return $response
            ->header('Access-Control-Allow-Origin', $allowedOrigin)
            ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH')
            ->header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, X-Token-Auth, Authorization, Accept, X-CSRF-TOKEN')
            ->header('Access-Control-Allow-Credentials', 'true');
    }
}

