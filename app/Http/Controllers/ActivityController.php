<?php

namespace App\Http\Controllers;

use App\Activity;
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
            ->toArray();
    }

    public function store(StoreActivityRequest $request)
    {
        $activity = new Activity();
        $activity->name = $request->name;
        $activity->period = $request->period;
        $activity->color = $request->color;
        $activity->level = $request->level;
        $activity->teacher = $request->teacher;
        $activity->maxParticipants = $request->maxParticipants;
        $activity->organization()->associate($request->user()->organization);

        $activity->save();

        return fractal()
            ->item($activity)
            ->transformWith(new ActivityTransformer())
            ->toArray();
    }

    public function update(UpdateActivityRequest $request, Activity $activity)
    {
        $this->authorize('update', $activity);

        $activity->name = $request->get('name', $activity->name);
        $activity->period = $request->get('period', $activity->period);
        $activity->color = $request->get('color', $activity->color);
        $activity->level = $request->get('level', $activity->level);
        $activity->teacher = $request->get('teacher', $activity->teacher);
        $activity->maxParticipants = $request->get('maxParticipants', $activity->maxParticipants);
        $activity->save();

        return fractal()
            ->item($activity)
            ->transformWith(new ActivityTransformer())
            ->toArray();
    }

    public function destroy(Activity $activity)
    {
        $this->authorize('destroy', $activity);

        $activity->delete();

        return response(null, 204);
    }
}
