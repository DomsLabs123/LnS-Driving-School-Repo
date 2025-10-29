<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Enrollment;
use App\Models\Courses;
use App\Models\BookingEnrollment;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use App\Mail\EnrollmentCredentialsMail;
use App\Models\TDCVideo;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
class StaffController extends Controller
{   
    /**
     * Function to Get Client who Booked
     */
    public function getBookingEnrollRequest(){
        $BookingRequest = BookingEnrollment::with(['course' => function($query) {
            $query->select('id', 'title');
        }])->get();
        return response()->json([
            'bookingRequest' => $BookingRequest
        ]);
    }

    /**
     * Function To Get Client Who Enrolled to Online TDC
     */
    public function getOnlineEnrollRequest(){
        $onlineRequestEnrollment = Enrollment::with(['course' => function($query){
            $query->select('id', 'title', 'category');
        }])->get();
        return response()->json([
            'enrollmentRequest' => $onlineRequestEnrollment
        ]);
    }

    /**
     * Function to Create a TDC Online Account 
     */
    public function generateUserCrendetials($id){
        try{
            // first find the specifict user who submit the form
            $enrollment = Enrollment::findOrFail($id);
            // automatic mo create ug random password ma change man sad nila
            $password = Str::random(16);

              // Create or update user
              $user = User::updateOrCreate(
                ['email' => $enrollment->email],
                [
                    'name' => $enrollment->firstname . ' ' . $enrollment->lastname,
                    'password' => Hash::make($password),
                    'role' => 'student',

                ]
            );

            /// Update the Online Enrollment Status to Approve
            $enrollment->update(['status' => 'approved']);

            Mail::to($enrollment->email)->send(new EnrollmentCredentialsMail([
                'name' => $user->name,
                'email' => $user->email,
                'password' => $password
            ]));

            return response()->json([
                'message' => 'Credentials generated and sent successfully'
            ]);
            
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to generate credentials',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Function To Approve Client Booking 
     */
    public function approveBookingEnrollment(Request $request, $id)
    {
        $bookingEnrollment = BookingEnrollment::findOrFail($id);
        $bookingEnrollment->approveBooking();

        return response()->json([
            'message' => 'Booking enrollment approved successfully',
        ]);
    }

    /**
     * Function To Reject Client Booking
     */
    public function rejectBookingEnrollment(Request $request, $id)
    {
        $bookingEnrollment = BookingEnrollment::findOrFail($id);
        $bookingEnrollment->rejectBooking();

        return response()->json([
            'message' => 'Booking enrollment rejected successfully',
        ]);
    }

    public function rescheduleBooking(Request $request, $id)
    {
        try {
            $booking = BookingEnrollment::findOrFail($id);
            
            // Validate the request - make both fields optional
            $request->validate([
                'date_booked' => 'sometimes|date',
                'time_booked' => 'sometimes|string'
            ]);
    
            // Initialize update array
            $updates = [];
    
            // Check if date is provided and different
            if ($request->has('date_booked') && $request->date_booked != $booking->date_booked) {
                $updates['date_booked'] = $request->date_booked;
            }
    
            // Check if time is provided and different
            if ($request->has('time_booked') && $request->time_booked != $booking->time_booked) {
                $updates['time_booked'] = $request->time_booked;
            }
    
            // Only update if there are changes
            if (!empty($updates)) {
                $booking->update($updates);
            }
    
            return response()->json([
                'message' => 'Booking rescheduled successfully',
                'booking' => $booking
            ]);
    
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to reschedule booking',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    
    public function getStaff()
    {
        $user = Auth::user();
        return response()->json([
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
            ]
        ]);
    }

}
