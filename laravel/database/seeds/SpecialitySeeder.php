<?php

use Illuminate\Database\Seeder;
use App\Speciality;

class SpecialitySeeder extends Seeder
{
    public function run()
    {
        $names = [
            'Cardiologia', 'Clínica Geral', 'Pediatria', 'Ortopedia',
            'Neurologia', 'Dermatologia', 'Ginecologia', 'Endocrinologia',
            'Oftalmologia', 'Otorrrinolaringologia', 'Reumatologia',
            'Urologia', 'Hematologia', 'Infectologia'
        ];

        foreach ($names as $name) {
            Speciality::firstOrCreate(['name' => $name]);
        }
    }
}
