<?php

namespace App\Models;

use Barryvdh\LaravelIdeHelper\Eloquent;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\ServiceSpeciality
 *
 * @mixin Eloquent
 */
class ServiceSpeciality extends Model
{
    protected $fillable = ['service_id', "speciality_id"];
    use HasFactory;
}
