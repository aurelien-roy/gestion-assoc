<?php

namespace App\Http\Controllers;

use App\Activity;
use App\ActivitySchedule;
use App\Http\Requests\StoreActivityScheduleRequest;
use App\Http\Requests\UpdateActivityScheduleRequest;
use App\Transformers\ActivityScheduleTransformer;

class ActivityScheduleController extends Controller
{
    public function index(Activity $activity)
    {
        $this->authorize('access', $activity);

        $schedules = $activity->schedules;

        return fractal()
            ->collection($schedules)
            ->transformWith(new ActivityScheduleTransformer())
            ->toArray();
    }

    public function show(Activity $activity, ActivitySchedule $activitySchedule)
    {
        $this->authorize('access', $activity);

        return fractal()
            ->item($activitySchedule)
            ->parseIncludes('activity')
            ->transformWith(new ActivityScheduleTransformer())
            ->toArray();
    }

    public function store(StoreActivityScheduleRequest $request, Activity $activity)
    {
        $this->authorize('storeSchedule', $activity);

        $activitySchedule = new ActivitySchedule();
        $activitySchedule->day = $request->day;
        $activitySchedule->start = $request->start;
        $activitySchedule->end = $request->end;
        $activitySchedule->activity()->associate($activity);
        $activitySchedule->save();

        return fractal()
            ->item($activitySchedule)
            ->transformWith(new ActivityScheduleTransformer())
            ->toArray();
    }

    public function update(UpdateActivityScheduleRequest $request, Activity $activity, ActivitySchedule $activitySchedule)
    {
        $this->authorize('access', $activity);

        $activitySchedule->day = $request->get('day', $activitySchedule->day);
        $activitySchedule->start = $request->get('start', $activitySchedule->start);
        $activitySchedule->end = $request->get('end', $activitySchedule->end);
        $activitySchedule->save();

        return fractal()
            ->item($activitySchedule)
            ->transformWith(new ActivityScheduleTransformer())
            ->toArray();
    }

    public function destroy(Activity $activity, ActivitySchedule $activitySchedule)
    {
        $this->authorize('access', $activity);

        $activitySchedule->delete();

        return response(null, 204);
    }
}
