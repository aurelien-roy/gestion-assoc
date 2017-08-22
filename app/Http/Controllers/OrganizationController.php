<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreOrganizationRequest;
use App\Organization;
use App\Transformers\OrganizationTransformer;
use App\User;

class OrganizationController extends Controller
{
    public function store(StoreOrganizationRequest $request)
    {
        $organization = new Organization();
        $organization->name = $request->organization_name;
        $organization->save();

        $user = new User();
        $user->first_name = $request->first_name;
        $user->last_name = $request->last_name;
        $user->email = $request->email;
        $user->password = bcrypt($request->password);
        $user->organization()->associate($organization);
        $user->save();

        return fractal()
            ->item($organization)
            ->parseIncludes(['users'])
            ->transformWith(new OrganizationTransformer())
            ->toArray();
    }
}
