<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Organization extends Model
{
    public function users()
    {
        return $this->hasMany(User::class);
    }

    public function activities()
    {
        return $this->hasMany(Activity::class);
    }
}
