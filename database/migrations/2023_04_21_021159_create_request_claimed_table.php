<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRequestClaimedTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     * This is where claimed request schedule is set
     */
    public function up()
    {
        Schema::create('request_claimed', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("request_id");
            $table->unsignedBigInteger("service_request_id");
            $table->unsignedBigInteger("provider_id");
            $table->unsignedBigInteger("speciality_id")->nullable();
            $table->unsignedBigInteger("service_id");
            $table->date("date_slot");
            $table->string("time_slot");
            $table->timestamps();
        });
        Schema::table('request_claimed', function (Blueprint $table) {
           $table->foreign("request_id")->references("id")->on("requests");
           $table->foreign("service_request_id")->references("id")->on("service_requests");
           $table->foreign("provider_id")->references("id")->on("providers");
           $table->foreign("speciality_id")->references("id")->on("specialities");
           $table->foreign("service_id")->references("id")->on("services");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('request_claimed');
    }
}
