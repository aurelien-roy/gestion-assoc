<?php

use Symfony\Component\HttpFoundation\Request;

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

//Route::post('/register', 'RegisterController@register');
Route::post('/login', 'LoginController@login');

Route::group(['prefix'  =>  'organization'], function () {
    Route::post('/', 'OrganizationController@store');
});

Route::group(['prefix'  =>  'activity'], function () {
    Route::get('/', 'ActivityController@index')->middleware('auth:api');
    Route::get('/{activity}', 'ActivityController@show')->middleware('auth:api');
    Route::post('/', 'ActivityController@store')->middleware('auth:api');
    Route::patch('/{activity}', 'ActivityController@update')->middleware('auth:api');
    Route::delete('/{activity}', 'ActivityController@destroy')->middleware('auth:api');

    Route::group(['prefix'  =>  '{activity}/schedule'], function () {
        Route::get('/', 'ActivityScheduleController@index')->middleware('auth:api');
        Route::get('/{activitySchedule}', 'ActivityScheduleController@show')->middleware('auth:api');
        Route::post('/', 'ActivityScheduleController@store')->middleware('auth:api');
        Route::patch('/{activitySchedule}', 'ActivityScheduleController@update')->middleware('auth:api');
        Route::delete('/{activitySchedule}', 'ActivityScheduleController@destroy')->middleware('auth:api');
    });
});
