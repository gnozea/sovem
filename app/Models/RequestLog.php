<?php

namespace App\Models;

use Barryvdh\LaravelIdeHelper\Eloquent;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @mixin Eloquent
 */
class RequestLog extends Model
{
    use HasFactory;
    protected $fillable = ["api_log", "provider_id", "request_id", "date_slot", "time_slot", "service_request_id", "service_id", "decision", "speciality_id", "secure_message", "status"];

    public function service()
    {
        return $this->belongsTo(Service::class, "service_id");
    }

    public function specialist()
    {
        return $this->belongsTo(Speciality::class, "speciality_id");
    }

    public function provider()
    {
        return $this->belongsTo(Provider::class, "provider_id");
    }
}
