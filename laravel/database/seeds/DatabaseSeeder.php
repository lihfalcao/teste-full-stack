<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        $this->call(RegionSeeder::class);
        $this->call(SpecialitySeeder::class);
        $this->call(EntitySeeder::class);
        $this->call(UserSeeder::class);
    }
}
