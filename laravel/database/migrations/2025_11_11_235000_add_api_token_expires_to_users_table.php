<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddApiTokenExpiresToUsersTable extends Migration
{
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            if (!Schema::hasColumn('users', 'api_token_expires_at')) {
                $table->timestamp('api_token_expires_at')->nullable()->after('api_token');
            }
        });
    }

    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            if (Schema::hasColumn('users', 'api_token_expires_at')) {
                $table->dropColumn('api_token_expires_at');
            }
        });
    }
}