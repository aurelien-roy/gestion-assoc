<?php

namespace App\Transformers;

use App\ActivitySchedule;
use League\Fractal\TransformerAbstract;

class ActivityScheduleTransformer extends TransformerAbstract
{
    protected $availableIncludes = ['activity'];
    /**
     * A Fractal transformer.
     *
     * @param ActivitySchedule $activitySchedule
     * @return array
     */
    public function transform(ActivitySchedule $activitySchedule)
    {
        return [
            'id'  =>  $activitySchedule->id,
            'day'   =>  $activitySchedule->day,
            'start' =>  $activitySchedule->start,
            'end'   =>  $activitySchedule->end,
        ];
    }

    public function includeActivity(ActivitySchedule $activitySchedule)
    {
        return $this->item($activitySchedule->activity, new ActivityTransformer());
    }
}
