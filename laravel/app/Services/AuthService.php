<?php
namespace App\Services;

use App\Repositories\UserRepository;
use App\Repositories\RefreshTokenRepository;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Carbon\Carbon;

class AuthService
{
    protected $users;
    protected $refreshTokens;

    protected $accessTokenMinutes = 15;
    protected $refreshTokenDays   = 7;

    public function __construct(
        UserRepository $users,
        RefreshTokenRepository $refreshTokens
    ) {
        $this->users = $users;
        $this->refreshTokens = $refreshTokens;
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email'    => 'required|email',
            'password' => 'required|min:6'
        ]);

        if ($validator->fails()) {
            return [
                'status' => 422,
                'data'   => ['errors' => $validator->errors()]
            ];
        }

        if (!Auth::attempt($request->only('email', 'password'))) {
            return [
                'status' => 401,
                'data'   => ['message' => 'E-mail ou senha incorretos']
            ];
        }

        $user = Auth::user();

        $accessToken  = $this->users->generateAccessToken($user, $this->accessTokenMinutes);
        $refreshToken = $this->refreshTokens->createToken($user->id, $this->refreshTokenDays);

        return [
            'status' => 200,
            'data'   => [
                'message'           => 'Login realizado com sucesso',
                'token'             => $accessToken,
                'refresh_token'     => $refreshToken,
                'expires_in'        => $this->accessTokenMinutes * 60,
                'refresh_expires_in'=> $this->refreshTokenDays * 24 * 60 * 60,
                'user' => [
                    'id'    => $user->id,
                    'name'  => $user->name,
                    'email' => $user->email
                ]
            ]
        ];
    }

    public function refresh(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'refresh_token' => 'required|string'
        ]);

        if ($validator->fails()) {
            return [
                'status' => 422,
                'data'   => ['errors' => $validator->errors()]
            ];
        }

        $stored = $this->refreshTokens->findActive($request->refresh_token);

        if (!$stored) {
            return [
                'status' => 401,
                'data'   => ['message' => 'Refresh token inválido ou expirado']
            ];
        }

        $user = $stored->user;

        $this->refreshTokens->revoke($stored);

        $access = $this->users->generateAccessToken($user, $this->accessTokenMinutes);
        $refresh = $this->refreshTokens->createToken($user->id, $this->refreshTokenDays);

        return [
            'status' => 200,
            'data'   => [
                'message'       => 'Token renovado com sucesso',
                'token'         => $access,
                'refresh_token' => $refresh,
                'user'          => [
                    'id'    => $user->id,
                    'name'  => $user->name,
                    'email' => $user->email
                ]
            ]
        ];
    }

    public function logout($user)
    {
        $this->users->clearAccessToken($user);
        $this->refreshTokens->revokeAllForUser($user->id);

        return [
            'status' => 200,
            'data'   => ['message' => 'Logout realizado com sucesso']
        ];
    }
}