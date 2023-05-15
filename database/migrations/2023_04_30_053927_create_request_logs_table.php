<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRequestLogsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('request_logs', function (Blueprint $table) {
            $table->id();
            $table->string("api_log");
            $table->unsignedBigInteger("provider_id");
            $table->unsignedBigInteger("request_id");
            $table->unsignedBigInteger("service_request_id");
            $table->unsignedBigInteger("service_id");
            $table->unsignedBigInteger("speciality_id");
            $table->date("date_slot");
            $table->string("time_slot");
            $table->enum("decision", ["accepted", "rejected"])->nullable();
            $table->text("secure_message")->nullable();
            $table->enum("status", ["read", "unread"])->default("unread");
            $table->softDeletes();
            $table->timestamps();
        });
        Schema::table('request_logs', function (Blueprint $table) {
            $table->foreign("request_id")->references("id")->on("requests");
            $table->foreign("provider_id")->references("id")->on("providers");
            $table->foreign("service_request_id")->references("id")->on("service_requests");
            $table->foreign("service_id")->references("id")->on("services");
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
        Schema::dropIfExists('request_logs');
    }
}
