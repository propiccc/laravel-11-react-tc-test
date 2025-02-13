<?php

namespace App\Models;

use App\Traits\Uuid;
use Illuminate\Database\Eloquent\Model;

class Comments extends Model
{
    use Uuid;

    protected $fillable = [
        'comment',
        'post_id',
        'user_id'
    ];

    public function User()
    {
        return $this->hasOne(User::class, 'id', 'user_id');
    }
}
