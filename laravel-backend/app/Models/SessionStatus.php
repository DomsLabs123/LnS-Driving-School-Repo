<?php

namespace App\Models;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SessionStatus extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'session_name',
        'status'
    ];

    public function user()
{
    return $this->belongsTo(User::class);
}
}
