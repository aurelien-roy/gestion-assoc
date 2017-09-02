<?php

namespace App\Providers;

use App\ActivitySchedule;
use App\Policies\ActivitySchedulePolicy;
use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Laravel\Passport\Passport;
use Carbon\Carbon;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        'App\Activity' => 'App\Policies\ActivityPolicy',
        ActivitySchedule::class => ActivitySchedulePolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        Passport::tokensExpireIn(Carbon::now()->addMonths(3)); // 30mn
        Passport::routes();
    }
}
