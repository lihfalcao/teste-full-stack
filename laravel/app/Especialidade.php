<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Especialidade extends Model
{
    protected $fillable = [
        'nome'
    ];

    public function entities()
    {
        return $this->belongsToMany(Entity::class, 'entity_especialidade');
    }
}

