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

    public function provider_specialities()
    {
        return $this->hasMany(ProviderSpeciality::class, "speciality_id");
    }

    public function service_specialities()
    {
        return $this->hasMany(ServiceSpeciality::class, "speciality_id");
    }
}
