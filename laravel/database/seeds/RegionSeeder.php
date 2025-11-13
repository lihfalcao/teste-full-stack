<?php

use Illuminate\Database\Seeder;
use App\Region;

class RegionSeeder extends Seeder
{
    public function run()
    {
        $regions = [
            'Alto Tietê',
            'Interior',
            'ES',
            'SP Interior',
            'SP',
            'MG',
            'Nacional',
            'SP CAV',
            'RJ',
            'SP2',
            'SP1',
            'NE1',
            'NE2',
            'SUDESTE',
            'SUL',
            'Norte',
            'Não informado',
        ];

        foreach ($regions as $region) {
            Region::firstOrCreate(['name' => $region]);
        }
    }
}


