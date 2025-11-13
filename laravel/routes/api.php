<?php

use Illuminate\Http\Request;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\EntityController;
use App\Http\Controllers\SpecialityController;
use App\Http\Controllers\RegionController;

Route::post('/login', 'AuthController@login');

Route::middleware('auth.api')->group(function () {
    Route::post('/logout', 'AuthController@logout');
    Route::get('/user', 'AuthController@user');
    Route::post('/refresh', 'AuthController@refresh');
    
    Route::get('/entities', 'EntityController@index');
    Route::post('/entities', 'EntityController@store');
    Route::get('/entities/{id}', 'EntityController@show');
    Route::put('/entities/{id}', 'EntityController@update');
    Route::delete('/entities/{id}', 'EntityController@destroy');
    
    Route::get('/specialities', 'SpecialityController@index');
    Route::get('/regions', 'RegionController@index');
});
