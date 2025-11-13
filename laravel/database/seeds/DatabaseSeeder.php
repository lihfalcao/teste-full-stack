<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        $this->call(SpecialitySeeder::class);
        $this->call(EntitySeeder::class);
        $this->call(UserSeeder::class);
    }
}
