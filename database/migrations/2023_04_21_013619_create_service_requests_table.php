<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateServiceRequestsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('service_requests', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("service_id");
            $table->unsignedBigInteger("speciality_id");
            $table->unsignedBigInteger("request_id");
            $table->unsignedBigInteger("provider_id")->nullable();
            $table->integer("claim_amount")->default(0)->comment("Null when no claims, up to 3");
            $table->enum("status", ["claimed", "unclaimed", "solved", "unsolved", "released"])->default("unclaimed");
            $table->softDeletes();
            $table->timestamps();
        });

        Schema::table('service_requests', function (Blueprint $table) {
            $table->foreign("service_id")->references("id")->on("services");
            $table->foreign("provider_id")->references("id")->on("providers");
            $table->foreign("speciality_id")->references("id")->on("specialities");
            $table->foreign("request_id")->references("id")->on("requests");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('service_requests');
    }
}
