<?php

namespace App\Transformers;

use App\Activity;
use League\Fractal\TransformerAbstract;

class ActivityTransformer extends TransformerAbstract
{
    protected $availableIncludes = ['organization'];

    /**
     * A Fractal transformer.
     *
     * @param Activity $activity
     * @return array
     */
    public function transform(Activity $activity)
    {
        return [
            'id'    =>  $activity->id,
            'name'  =>  $activity->name,
            'period'  =>  $activity->period,
            'color'  =>  $activity->color,
            'level'  =>  $activity->level,
            'teacher'  =>  $activity->teacher,
            'max_participants'  =>  $activity->maxParticipants,
            'created_at'    =>  $activity->created_at->toDateTimeString(),
            'created_at_readable'    =>  $activity->created_at->diffForHumans(),
        ];
    }

    public function includeOrganization(Activity $activity)
    {
        return $this->item($activity->organization, new OrganizationTransformer());
    }
}
