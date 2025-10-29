<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TDCVideo extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'session',
        'description',
        'duration',
        'filename',
        'filepath',
        'video_url',
        'instructor'
    ];
}
