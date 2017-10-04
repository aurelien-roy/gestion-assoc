<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddLocationToActivity extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (Schema::hasTable('activities') && !Schema::hasColumn('activities', 'place')) {
            Schema::table('activities', function (Blueprint $table) {
                $f = $table->string('place', 100)->after('level');

                if(Schema::getConnection()->getDriverName() === 'sqlite'){
                    $f->nullable();
                }
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
        if (Schema::hasTable('activities') && Schema::hasColumn('activities', 'place')) {
            Schema::table('activities', function (Blueprint $table) {
                $table->dropColumn('place');
            });
        }
    }
}
