<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Speciality extends Model
{
    protected $table = 'specialities';
    
    protected $fillable = [
        'name'
    ];

    public $timestamps = false;

    public function entities()
    {
        return $this->belongsToMany(Entity::class, 'entities_has_specialities', 'idspeciality', 'identity');
    }
}

