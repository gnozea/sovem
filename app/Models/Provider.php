<?php

namespace App\Models;

use Barryvdh\LaravelIdeHelper\Eloquent;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Provider
 *
 * @mixin Eloquent
 */
class Provider extends Model
{
    protected $fillable = [ "name", "name_short", "email", "phone", "logo", "address_line_1", "address_line_2", "city", "state"];
    use HasFactory;
}
