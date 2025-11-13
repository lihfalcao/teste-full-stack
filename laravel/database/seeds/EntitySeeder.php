<?php

use Illuminate\Database\Seeder;
use App\Entity;
use App\Speciality;

class EntitySeeder extends Seeder
{
    public function run()
    {
        $allSpecs = Speciality::pluck('id')->toArray();

        $entitiesData = [
            [
                'name' => 'AmorSaude Pinheiros',
                'fantasy_name' => 'AmorSaude Pinheiros',
                'cnpj' => '50.212.139/0001-77',
                'region' => 'SUL',
                'inauguration_date' => '2021-06-18',
                'status' => true,
            ],
            [
                'name' => 'Hospital São Paulo',
                'fantasy_name' => 'HSP',
                'cnpj' => '12.345.678/0001-90',
                'region' => 'SUDESTE',
                'inauguration_date' => '2020-01-15',
                'status' => true,
            ],
            [
                'name' => 'Clínica Médica Central',
                'fantasy_name' => 'CMC',
                'cnpj' => '98.765.432/0001-10',
                'region' => 'NORTE',
                'inauguration_date' => '2019-03-20',
                'status' => false,
            ]
        ];

        foreach ($entitiesData as $data) {
            $entity = Entity::create($data);

            $randSpecs = collect($allSpecs)->shuffle()->take(rand(5, 8))->toArray();

            $entity->specialities()->attach($randSpecs);
        }
    }
}
