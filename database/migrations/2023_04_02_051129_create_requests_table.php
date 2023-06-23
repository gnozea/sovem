<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRequestsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('requests', function (Blueprint $table) {
            $table->id();
            $table->integer("ticket_number")->unique();
            $table->string("uuid");
            $table->enum("age_range", ["Mwens ke 12 zan", "12 - 18", "19 - 35", "36 - 49", "50 oswa plis"]);
            $table->enum("gender", ["Fi", "Gason"]);
            $table->string("your_city");
            $table->string("incident_location");
            $table->bigInteger("incident_city")->nullable();
            $table->date("incident_date")->nullable();
            $table->string("violence_type"); //["Vyolans seksyel", "Vyolans Fizik", "Deplasman fòse"]
            $table->enum("felon", ["Yon patenè", "Yon manm fanmi", "Yon otorite", "Yon enkoni"]);
            $table->string("media_path")->nullable();
            $table->enum("status", ['claimed', 'unclaimed', 'solved', 'unsolved']);
            $table->timestamps();
            $table->softDeletes();
        });
        Schema::table("request", function (Blueprint $table){
            $table->foreign("incident_city")->references("id")->on("cities");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('requests');
    }
}
