<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Mail;
use App\Models\Courses;
use App\Mail\BookingApprovalEmail;
use App\Mail\BookingRejectionEmail;
class BookingEnrollment extends Model
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
        'date_booked',
        'time_booked'
    ];


    public function course()
    {
        return $this->belongsTo(Courses::class, 'course_enrolled');
    }


    public function approveBooking()
    {
        $this->status = 'approved';
        $this->save();

        $this->sendApprovalEmail();
    }

    public function rejectBooking()
    {
        $this->status = 'rejected';
        $this->save();

        $this->sendRejectionEmail();
    }

    public function sendApprovalEmail()
    {
        Mail::to($this->email)->send(new BookingApprovalEmail($this));
    }

    public function sendRejectionEmail()
    {
        Mail::to($this->email)->send(new BookingRejectionEmail($this));
    }
}
