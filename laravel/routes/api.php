<?php

use Illuminate\Http\Request;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\EntityController;
use App\Http\Controllers\SpecialtyController;

// Rotas de autenticação
Route::post('/login', 'AuthController@login');

// Rotas protegidas
Route::middleware('auth.api')->group(function () {
    Route::post('/logout', 'AuthController@logout');
    Route::get('/user', 'AuthController@user');
    Route::post('/refresh', 'AuthController@refresh');
    
    // CRUD de Entidades
    Route::get('/entities', 'EntityController@index');
    Route::post('/entities', 'EntityController@store');
    Route::get('/entities/{id}', 'EntityController@show');
    Route::put('/entities/{id}', 'EntityController@update');
    Route::delete('/entities/{id}', 'EntityController@destroy');
    
    // specialities
    Route::get('/specialities', 'SpecialtyController@index');
});
