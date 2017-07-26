<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\User;
use Illuminate\Http\Request;

class RegisterController extends Controller
{
    public function register(StoreUserRequest $request)
    {
        $user = new User();

        $user->first_name = $request->first_name;
        $user->last_name = $request->last_name;
        $user->email = $request->email;
        $user->password = bcrypt($request->password);

        $user->save();
    }
}
