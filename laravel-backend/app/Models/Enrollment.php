<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Courses;
class Enrollment extends Model
{
    use HasFactory;
    protected $fillable = [
        'firstname',
        'lastname',
        'middlename',
        'address',
        'cellphone',
        'email',
        'document_path',
        'business_name',
        'business_email',
        'citizenship',
        'age',
        'gender',
        'birthday',
        'height',
        'weight',
        'civil_status',
        'hair',
        'eyes',
        'build',
        'complexion',
        'education_attainment',
        'school_name',
        'school_address',
        'birthplace',
        'spouse_name',
        'father_name',
        'mother_name',
        'employer_name',
        'employer_tel',
        'employer_address',
        'course_enrolled',
        'amount',
        'proof_image',
        'status'
    ];


    public function course()
    {
        return $this->belongsTo(Courses::class, 'course_enrolled');
    }
}
