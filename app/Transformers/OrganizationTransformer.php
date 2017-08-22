<?php

namespace App\Transformers;

use App\Organization;
use League\Fractal\TransformerAbstract;

class OrganizationTransformer extends TransformerAbstract
{
    protected $availableIncludes = ['users'];

    public function transform(Organization $organization)
    {
        return [
            'id'    =>  $organization->id,
            'name'    =>  $organization->name,
            'created_at'    =>  $organization->created_at->toDateTimeString(),
        ];
    }

    public function includeUsers(Organization $organization)
    {
        return $this->collection($organization->users, new UserTransformer());
    }
}