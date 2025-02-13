<?php

namespace App\Models;

use App\Traits\Uuid;
use Illuminate\Database\Eloquent\Model;

class Posts extends Model
{
    use Uuid;

    protected $fillable = [
        'title',
        'content',
    ];

    public function PostsTag(){
        return $this->hasMany(PostsTag::class, 'post_id', 'id')->with(['Tag']);
    }

    public function Comments() {
        return $this->hasMany(Comments::class, 'post_id', 'id')->with(['User']);
    }
}
