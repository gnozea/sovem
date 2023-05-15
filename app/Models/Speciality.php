<?php

namespace App\Models;

use Barryvdh\LaravelIdeHelper\Eloquent;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Speciality
 *
 * @mixin Eloquent
 */
class Speciality extends Model
{
    protected $fillable = ["name"];
    use HasFactory;
}
