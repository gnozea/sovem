<?php

namespace App\Models;

use Barryvdh\LaravelIdeHelper\Eloquent;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Service
 *
 * @mixin Eloquent
 */
class Service extends Model
{
    protected $fillable = ["name", "added_by"];
    use HasFactory;
}
