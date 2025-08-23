<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    // Kolom yang dapat diisi secara massal
    protected $fillable = [
        'service',
        'name',
        'comment',
        'rating',
    ];
}