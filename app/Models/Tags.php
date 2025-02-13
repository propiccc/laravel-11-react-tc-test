<?php

namespace App\Models;

use App\Traits\Uuid;
use Illuminate\Database\Eloquent\Model;

class Tags extends Model
{
    use Uuid;

    protected $fillable = [
        'tags_name',
    ];
    // protected $hidden = ['id', 'uuid'];
}
