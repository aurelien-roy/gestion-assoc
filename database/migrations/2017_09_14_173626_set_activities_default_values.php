<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class SetActivitiesDefaultValues extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (Schema::hasTable('activities')) {
            Schema::table('activities', function (Blueprint $table) {
                $table->string('level', 150)->nullable()->change();
                $table->string('teacher', 100)->nullable()->change();
                $table->integer('maxParticipants')->unsigned()->nullable()->change(); // null = unlimited
            });
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        if (Schema::hasTable('activities')) {
            Schema::table('activities', function (Blueprint $table) {
                $table->string('level', 150)->change();
                $table->string('teacher', 100)->change();
                $table->integer('maxParticipants')->unsigned()->change(); // null = unlimited
            });
        }
    }
}
