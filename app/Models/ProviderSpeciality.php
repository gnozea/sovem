<?php

namespace App\Models;

use Barryvdh\LaravelIdeHelper\Eloquent;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\ProviderSpeciality
 *
 * @mixin Eloquent
 */
class ProviderSpeciality extends Model
{
    protected $fillable = ["provider_id", "speciality_id"];
    use HasFactory;

    public function providers()
    {
        return $this->belongsTo(Provider::class, "provider_id");
    }

    public function speciality()
    {
        return $this->belongsTo(Speciality::class);
    }
}
