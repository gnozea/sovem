<?php

namespace App\Models;

use Barryvdh\LaravelIdeHelper\Eloquent;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\ProviderService
 *
 * @mixin Eloquent
 */
class ProviderService extends Model
{
    protected $fillable = ["provider_id", "service_id"];
    use HasFactory;
}
