<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Entity extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name',
        'fantasy_name',
        'cnpj',
        'region',
        'inauguration_date',
        'status'
    ];

    protected $casts = [
        'status' => 'boolean',
        'inauguration_date' => 'date',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'deleted_at' => 'datetime'
    ];

    protected $dates = ['deleted_at'];

    public function specialities()
    {
        return $this->belongsToMany(Speciality::class, 'entities_has_specialities', 'identity', 'idspeciality');
    }
}

