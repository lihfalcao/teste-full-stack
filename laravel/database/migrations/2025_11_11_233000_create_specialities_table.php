<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class CreatespecialitiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
       
        Schema::create('specialities', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name')->unique();
        });

        DB::table('specialities')->insert([
            ['name' => 'Clínica Geral'],
            ['name' => 'Cardiologia'],
            ['name' => 'Pediatria'],
            ['name' => 'Ortopedia'],
            ['name' => 'Neurologia'],
            ['name' => 'Dermatologia'],
        ]);
        
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('specialities');
    }
}

