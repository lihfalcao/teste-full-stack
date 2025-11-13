<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Entity;

class Region extends Model
{
    protected $fillable = [
        'name',
    ];

    public function entities()
    {
        return $this->hasMany(Entity::class);
    }
}


