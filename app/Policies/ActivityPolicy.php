<?php

namespace App\Policies;

use App\Activity;
use App\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class ActivityPolicy
{
    use HandlesAuthorization;

    public function show(User $user, Activity $activity) : bool
    {
        return $user->organizationOwnsActivity($activity);
    }

    public function update(User $user, Activity $activity) : bool
    {
        return $user->organizationOwnsActivity($activity);
    }

    public function destroy(User $user, Activity $activity) : bool
    {
        return $user->organizationOwnsActivity($activity);
    }

    public function access(User $user, Activity $activity)
    {
        return $user->organizationOwnsActivity($activity);
    }
}
