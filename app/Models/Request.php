<?php

namespace App\Models;

use Barryvdh\LaravelIdeHelper\Eloquent;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Request
 *
 * @mixin Eloquent
 */
class Request extends Model
{
//    protected $fillable = ["ticket_number", "service_id", "speciality_id", "age_range", "gender", "city", "incident_location",
//        "violence_type", "violence_by_who", "media_path"];
    use HasFactory;

    protected $casts = [
        'violence_type' => 'array'
    ];
    protected $fillable = [
        "ticket_number",
        "uuid",
        "age_range",
        "gender",
        "your_city",
        "incident_location",
        "incident_department",
        "incident_date",
        "violence_type",
        "felon",
        "media_path",
        "status",
        "incident_city"
    ];

    public function speciality_type()
    {
        return $this->hasOne(Speciality::class, "id", "speciality_id");
    }
    public function service_type()
    {
        return $this->hasOne(Service::class, "id", "service_id");
    }

    public function requests()
    {
        return $this->hasMany(ServiceRequest::class, "request_id");
    }

    public function claimed()
    {
        return $this->hasMany(RequestClaimed::class, "request_id");
    }

    public function city()
    {
        return $this->belongsTo(City::class, "your_city");
    }

    public function incident_city_location()
    {
        return $this->belongsTo(City::class, "incident_city");
    }

    public function incident_dept_location()
    {
        return $this->belongsTo(Department::class, "incident_department");
    }

    public function logs()
    {
        return $this->hasMany(RequestLog::class, "request_id");
    }
}
