<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AuditLog extends Model
{
    use HasFactory;

    // ✅ Allow mass assignment for these fields
    protected $fillable = [
        'user_id',
        'user_type',
        'action',
        'details',
    ];

    // ✅ Relationship to User (optional but useful for displaying logs with names)
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
