<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Phpfastcache\Helper\Psr16Adapter;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        // Register Phpfastcache as a singleton
        $this->app->singleton('Phpfastcache', function () {
            return new Psr16Adapter('Files');
        });
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
