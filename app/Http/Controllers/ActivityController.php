<?php

namespace App\Http\Controllers;

use App\Activity;
use App\ActivitySchedule;
use App\Http\Requests\StoreActivityRequest;
use App\Http\Requests\UpdateActivityRequest;
use App\Transformers\ActivityTransformer;
use Illuminate\Support\Facades\Auth;

class ActivityController extends Controller
{
    public function index()
    {
        $activities = Auth::user()->organization->activities;

        return fractal()
            ->collection($activities)
            ->transformWith(new ActivityTransformer())
            ->toArray();
    }

    public function show(Activity $activity)
    {
        $this->authorize('show', $activity);

        return fractal()
            ->item($activity)
            ->transformWith(new ActivityTransformer())
            ->includeSchedules()
            ->toArray();
    }

    public function store(StoreActivityRequest $request)
    {
        $activity = new Activity();
        $activity->organization()->associate($request->user()->organization);

        return $this->update($request, $activity);
    }

    public function update(StoreActivityRequest $request, Activity $activity)
    {
        $this->authorize('update', $activity);

        $activity->name = $request->get('name', $activity->name);
        $activity->period = $request->get('period', $activity->period);
        $activity->color = $request->get('color', $activity->color);
        $activity->level = $request->get('level', $activity->level);
        $activity->place = $request->get('place', $activity->place);
        $activity->teacher = $request->get('teacher', $activity->teacher);
        $activity->maxParticipants = $request->get('maxParticipants', $activity->maxParticipants);

        if($request->has('dates')){
            $activity->schedules()->delete();

            foreach($request->get('schedules') as $schedule){
                $activitySchedule = new ActivitySchedule();
                $activitySchedule->day = intval($schedule['day']);
                $activitySchedule->start = $schedule['start'];
                $activitySchedule->end = $schedule['end'];
                $activitySchedule->activity()->associate($activity);
                $activitySchedule->save();
            }
        }

        $activity->save();

        return fractal()
            ->item($activity)
            ->transformWith(new ActivityTransformer())
            ->includeSchedules()
            ->toArray();
    }

    public function destroy(Activity $activity)
    {
        $this->authorize('destroy', $activity);

        $activity->delete();

        return response(null, 204);
    }
}
