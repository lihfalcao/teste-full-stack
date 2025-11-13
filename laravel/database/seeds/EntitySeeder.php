<?php

use Illuminate\Database\Seeder;
use App\Entity;
use App\Speciality;
use App\Region;

class EntitySeeder extends Seeder
{
    public function run()
    {
        $allSpecs = Speciality::pluck('id')->toArray();

        $allRegions = Region::pluck('id')->toArray();

        $entitiesData = [
            [
                'name' => 'Clínica Vida Plena',
                'fantasy_name' => 'Vida Plena',
                'cnpj' => '11.111.111/0001-11',
                'inauguration_date' => '2022-05-10',
                'status' => true,
            ],
            [
                'name' => 'Hospital Santa Beatriz',
                'fantasy_name' => 'HSB',
                'cnpj' => '22.222.222/0001-22',
                'inauguration_date' => '2018-11-02',
                'status' => true,
            ],
            [
                'name' => 'Centro Médico Aurora',
                'fantasy_name' => 'Aurora',
                'cnpj' => '33.333.333/0001-33',
                'inauguration_date' => '2017-04-12',
                'status' => false,
            ],
            [
                'name' => 'Clínica São Lucas',
                'fantasy_name' => 'São Lucas',
                'cnpj' => '44.444.444/0001-44',
                'inauguration_date' => '2020-09-21',
                'status' => true,
            ],
            [
                'name' => 'Hospital Novo Horizonte',
                'fantasy_name' => 'NH',
                'cnpj' => '55.555.555/0001-55',
                'inauguration_date' => '2023-02-14',
                'status' => true,
            ],
            [
                'name' => 'Clínica Bem Estar',
                'fantasy_name' => 'Bem Estar',
                'cnpj' => '66.666.666/0001-66',
                'inauguration_date' => '2016-12-01',
                'status' => false,
            ],
            [
                'name' => 'Hospital Imaculada Conceição',
                'fantasy_name' => 'HIC',
                'cnpj' => '77.777.777/0001-77',
                'inauguration_date' => '2015-07-30',
                'status' => true,
            ],
            [
                'name' => 'Centro Médico São Gabriel',
                'fantasy_name' => 'São Gabriel',
                'cnpj' => '88.888.888/0001-88',
                'inauguration_date' => '2019-01-10',
                'status' => true,
            ],
            [
                'name' => 'Clínica Horizonte Azul',
                'fantasy_name' => 'Horizonte Azul',
                'cnpj' => '99.999.999/0001-99',
                'inauguration_date' => '2021-10-05',
                'status' => true,
            ],
            [
                'name' => 'Hospital Vida Saudável',
                'fantasy_name' => 'Vida Saudável',
                'cnpj' => '10.000.000/0001-10',
                'inauguration_date' => '2020-06-22',
                'status' => false,
            ],
            [
                'name' => 'Clínica São José',
                'fantasy_name' => 'São José',
                'cnpj' => '12.345.678/0001-55',
                'inauguration_date' => '2018-09-18',
                'status' => true,
            ],
            [
                'name' => 'Hospital Monte Sinai',
                'fantasy_name' => 'Monte Sinai',
                'cnpj' => '20.123.456/0001-20',
                'inauguration_date' => '2014-02-28',
                'status' => true,
            ],
            [
                'name' => 'Centro Médico São Rafael',
                'fantasy_name' => 'São Rafael',
                'cnpj' => '30.987.654/0001-30',
                'inauguration_date' => '2022-08-11',
                'status' => true,
            ],
            [
                'name' => 'Clínica Vitalis',
                'fantasy_name' => 'Vitalis',
                'cnpj' => '40.555.444/0001-40',
                'inauguration_date' => '2019-11-09',
                'status' => false,
            ],
            [
                'name' => 'Hospital Santa Cecília',
                'fantasy_name' => 'HSC',
                'cnpj' => '50.999.888/0001-50',
                'inauguration_date' => '2017-05-23',
                'status' => true,
            ],
            [
                'name' => 'Clínica Boa Saúde',
                'fantasy_name' => 'Boa Saúde',
                'cnpj' => '60.777.666/0001-60',
                'inauguration_date' => '2016-03-19',
                'status' => true,
            ],
            [
                'name' => 'Centro Médico Alpha',
                'fantasy_name' => 'Alpha',
                'cnpj' => '70.333.222/0001-70',
                'inauguration_date' => '2021-12-08',
                'status' => true,
            ],
            [
                'name' => 'Hospital Cristo Rei',
                'fantasy_name' => 'Cristo Rei',
                'cnpj' => '80.222.111/0001-80',
                'inauguration_date' => '2013-04-14',
                'status' => false,
            ],
            [
                'name' => 'Clínica Nova Esperança',
                'fantasy_name' => 'Nova Esperança',
                'cnpj' => '90.111.222/0001-90',
                'inauguration_date' => '2020-07-29',
                'status' => true,
            ],
            [
                'name' => 'Hospital São Miguel',
                'fantasy_name' => 'São Miguel',
                'cnpj' => '21.432.543/0001-21',
                'inauguration_date' => '2019-02-16',
                'status' => true,
            ],
            [
                'name' => 'Centro Médico Flor de Lis',
                'fantasy_name' => 'Flor de Lis',
                'cnpj' => '32.111.555/0001-32',
                'inauguration_date' => '2023-01-03',
                'status' => true,
            ],
            [
                'name' => 'Clínica Santa Helena',
                'fantasy_name' => 'Santa Helena',
                'cnpj' => '41.222.333/0001-41',
                'inauguration_date' => '2018-08-12',
                'status' => false,
            ],
            [
                'name' => 'Hospital Dom Bosco',
                'fantasy_name' => 'Dom Bosco',
                'cnpj' => '52.444.666/0001-52',
                'inauguration_date' => '2014-10-27',
                'status' => true,
            ],
            [
                'name' => 'Clínica São Tiago',
                'fantasy_name' => 'São Tiago',
                'cnpj' => '62.555.444/0001-62',
                'inauguration_date' => '2016-04-04',
                'status' => true,
            ],
            [
                'name' => 'Centro Médico Esperança Viva',
                'fantasy_name' => 'Esperança Viva',
                'cnpj' => '72.999.888/0001-72',
                'inauguration_date' => '2022-09-30',
                'status' => true,
            ],
        ];

        foreach ($entitiesData as $data) {

            $data['region_id'] = collect($allRegions)->random();

            $entity = Entity::create($data);

            $randSpecs = collect($allSpecs)->shuffle()->take(rand(5, 8))->toArray();

            $entity->specialities()->attach($randSpecs);
        }
    }
}
