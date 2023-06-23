<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProvidersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('providers', function (Blueprint $table) {
            $table->id();
            $table->string("name");
            $table->string("name_short");
            $table->string("email");
            $table->string("phone");
            $table->string("logo")->nullable();
            $table->string("address_line_1")->nullable();
            $table->string("address_line_2")->nullable();
            $table->unsignedBigInteger("city")->nullable();
            $table->enum("status", ["active", "disabled", "inactive","pending"])->default("pending");
            $table->string("state")->nullable();
            $table->timestamps();
        });

        Schema::table("providers", function (Blueprint $table) {
            $table->foreign("city")->references("id")->on("cities");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('providers');
    }
}
