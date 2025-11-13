<?php 

namespace App\Repositories;

use App\RefreshToken;
use Carbon\Carbon;
use Illuminate\Support\Str;

class RefreshTokenRepository
{
    public function createToken(int $userId, int $days): string
    {
        $plain = Str::random(60);

        RefreshToken::create([
            'user_id'    => $userId,
            'token'      => hash('sha256', $plain),
            'expires_at' => Carbon::now()->addDays($days),
            'revoked'    => false,
        ]);

        return $plain;
    }

    public function findActive(string $plain): RefreshToken
    {
        $hashed = hash('sha256', $plain);

        return RefreshToken::where('token', $hashed)
            ->where('revoked', false)
            ->where('expires_at', '>', Carbon::now())
            ->firstOrFail();
    }

    public function revoke(RefreshToken $token): void
    {
        $token->revoked = true;
        $token->save();
    }

    public function revokeAllForUser(int $userId): void
    {
        RefreshToken::where('user_id', $userId)
            ->where('revoked', false)
            ->update(['revoked' => true]);
    }
}