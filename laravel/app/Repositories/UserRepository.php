<?php

namespace App\Repositories;

use App\User;
use Carbon\Carbon;
use Illuminate\Support\Str;

class UserRepository
{
    public function findByEmail(string $email): User
    {
        return User::where('email', $email)->firstOrFail();
    }

    public function generateAccessToken(User $user, int $minutes): string
    {
        $plain = Str::random(60);

        $user->api_token = hash('sha256', $plain);
        $user->api_token_expires_at = Carbon::now()->addMinutes($minutes);
        $user->save();

        return $plain;
    }

    public function clearAccessToken(User $user): void
    {
        $user->api_token = null;
        $user->api_token_expires_at = null;
        $user->save();
    }
}