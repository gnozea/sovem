<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class MakeGoogle2faSecretNullable extends Migration
{
    public function up()
    {
        DB::statement('ALTER TABLE users MODIFY COLUMN google2fa_secret TEXT NULL');
    }

    public function down()
    {
        DB::statement('ALTER TABLE users MODIFY COLUMN google2fa_secret TEXT NOT NULL');
    }
}
