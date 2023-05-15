<?php

namespace App\Models;

use Barryvdh\LaravelIdeHelper\Eloquent;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Department
 *
 * @mixin Eloquent
 */
class Department extends Model
{
    use HasFactory;

    public function cities()
    {
        return $this->hasMany(City::class);
    }
}
