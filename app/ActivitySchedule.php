<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ActivitySchedule extends Model
{
    public function activity()
    {
        return $this->belongsTo(Activity::class);
    }
}
