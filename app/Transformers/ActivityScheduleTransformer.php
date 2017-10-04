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
            'day'   =>  $this->toDayCode($activitySchedule->day),
            'start' =>  $activitySchedule->start,
            'end'   =>  $activitySchedule->end,
        ];
    }


    public function includeActivity(ActivitySchedule $activitySchedule)
    {
        return $this->item($activitySchedule->activity, new ActivityTransformer());
    }

    private function toDayCode($day){
        if(is_numeric($day)){
            return intval($day);
        }else{
            return array_search($day, ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'])+1;
        }
    }
}
