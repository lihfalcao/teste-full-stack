<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEntitiesHasspecialitiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('entities_has_specialities', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('identity');
            $table->unsignedInteger('idspeciality');

            $table->foreign('identity')->references('id')->on('entities')->onDelete('cascade');
            $table->foreign('idspeciality')->references('id')->on('specialities')->onDelete('cascade');
            
            $table->unique(['identity', 'idspeciality']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('entities_has_specialities');
    }
}

