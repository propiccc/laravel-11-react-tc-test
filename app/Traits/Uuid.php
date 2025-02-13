<?php

namespace App\Traits;

use Illuminate\Support\Str;

trait Uuid
{
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (empty($model->uuid)) {
                $model->uuid = Str::uuid()->toString();;
            }
        });
    }

    public static function findByUuid($uuid, $with = [])
    {
        if (count($with) >= 1) {
            return static::with($with)->where('uuid', '=', $uuid)->first();
        }
        return static::where('uuid', '=', $uuid)->first();
    }
}
