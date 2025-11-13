<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\User;

class UserSeeder extends Seeder
{
    public function run()
    {
        User::create([
            'name' => 'Usuário Teste',
            'email' => 'teste@exemplo.com',
            'password' => Hash::make('senha123'),
        ]);
    }
}

