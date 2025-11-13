<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRefreshTokensTable extends Migration
{
    public function up()
    {
        Schema::create('refresh_tokens', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('user_id');
            $table->string('token', 100);
            $table->timestamp('expires_at');
            $table->boolean('revoked')->default(false);
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->index(['user_id', 'token']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('refresh_tokens');
    }
}