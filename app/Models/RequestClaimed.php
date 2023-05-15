<?php

namespace App\Models;

use Barryvdh\LaravelIdeHelper\Eloquent;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\RequestClaimed
 *
 * @mixin Eloquent
 */
class RequestClaimed extends Model
{
    protected $table = "request_claimed";
    protected $fillable = ["request_id", "provider_id", "speciality_id", "service_id", "date_slot", "time_slot"];
    use HasFactory;

    public function specialities()
    {
        return $this->belongsTo(Speciality::class, "speciality_id");
    }
}
