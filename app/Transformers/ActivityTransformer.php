<?php

namespace App\Transformers;

use App\Activity;
use League\Fractal\TransformerAbstract;

class ActivityTransformer extends TransformerAbstract
{
    protected $availableIncludes = ['organization', 'schedules'];

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
            'place' => $activity->place,
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

    public function includeSchedules(Activity $activity)
    {
        return $this->collection($activity->schedules, new ActivityScheduleTransformer());
    }
}
