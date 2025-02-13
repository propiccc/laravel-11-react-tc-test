<?php

namespace App\Models;

use App\Traits\Uuid;
use Illuminate\Database\Eloquent\Model;

class PostsTag extends Model
{

    use Uuid;

    protected $fillable = [
        'post_id',
        'tags_id',
    ];

    // public function Post(){
    //     return $this->hasOne(Posts::class, 'id', 'post_id');
    // }
    public function Tag(){
        return $this->hasOne(Tags::class, 'id', 'tags_id');
    }
}
