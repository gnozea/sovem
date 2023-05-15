<?php

namespace App\Models;

use Barryvdh\LaravelIdeHelper\Eloquent;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 *@mixin Eloquent
 */
class ServiceRequest extends Model
{
    protected $fillable = ["service_id", "speciality_id", "request_id", "claim_amount", "status"];
    use HasFactory;
    protected $casts = [
        'violence_type' => 'array'
    ];

    public function specialities()
    {
        return $this->belongsTo(Speciality::class, "speciality_id");
    }

//    public function request_claimed()
//    {
//        return $this->hasMany(RequestClaimed::class, "request_id");
//    }

    public function request_log()
    {
        return $this->hasMany(RequestLog::class, "service_request_id");
    }

    public function provider()
    {
        return $this->belongsTo(Provider::class, "provider_id");
    }
}
