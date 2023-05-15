<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProviderSpecialitiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('provider_specialities', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("provider_id");
            $table->unsignedBigInteger("speciality_id");
            $table->timestamps();
        });
        Schema::table('provider_specialities', function (Blueprint $table) {
            $table->foreign("provider_id")->references("id")->on("providers");
            $table->foreign("speciality_id")->references("id")->on("specialities");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('provider_specialities');
    }
}
