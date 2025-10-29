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
use Illuminate\Support\Facades\Storage;
use App\Models\AuditLog;
class AdminController extends Controller
{

    public function getAllUsers(){
        $listofUsers = User::where('role', 'student')->get();
        return response()->json([
            'users' => $listofUsers  
        ]);
    }

    ////// Get Online Request Form ///////////
    public function getOnlineEnrollRequest(){
        $onlineRequestEnrollment = Enrollment::with(['course' => function($query){
            $query->select('id', 'title', 'category');
        }])->get();
        return response()->json([
            'enrollmentRequest' => $onlineRequestEnrollment
        ]);
    }


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


            // ✅ PUT YOUR AUDIT LOG HERE
        if (auth()->check()) {
            AuditLog::create([
                'user_id'   => auth()->id(),
                'user_type' => auth()->user()->role ?? 'admin',
                'action'    => 'Online Enrollment Approved',
                'details'   => "Approved enrollment ({$enrollment->email})",
                'created_at'=> now(),
            ]);
        }

            return response()->json([
                'message' => 'Credentials generated and sent successfully'
            ]);

            AuditLog::create([
    'user_id' => auth()->id(), // the admin who did it
    'action'  => 'Generated Credentials',
    'details' => "Enrollment {$enrollment->id} approved for {$user->email}"
]);

            
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to generate credentials',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    ////////// Get Booking Request Form   //////////////////
    public function getBookingEnrollRequest(){
        $BookingRequest = BookingEnrollment::with(['course' => function($query) {
            $query->select('id', 'title');
        }])->get();
        return response()->json([
            'bookingRequest' => $BookingRequest
        ]);
    }

   public function approveBookingEnrollment(Request $request, $id)
{
    $bookingEnrollment = BookingEnrollment::findOrFail($id);
    $bookingEnrollment->approveBooking();

    // ✅ Add audit log
    if (auth()->check()) {
        AuditLog::create([
            'user_id'   => auth()->id(),
            'user_type' => auth()->user()->role ?? 'admin',
            'action'    => 'Booking Enrollment Approved',
            'details'   => "Booking enrollment ({$bookingEnrollment->email}) approved",
            'created_at'=> now(),
        ]);
    }

    return response()->json([
        'message' => 'Booking enrollment approved successfully',
    ]);
}

public function rejectBookingEnrollment(Request $request, $id)
{
    $bookingEnrollment = BookingEnrollment::findOrFail($id);
    $bookingEnrollment->rejectBooking();

    // ✅ Add audit log
    if (auth()->check()) {
        AuditLog::create([
            'user_id'   => auth()->id(),
            'user_type' => auth()->user()->role ?? 'admin',
            'action'    => 'Booking Enrollment Reject',
            'details'   => "Booking enrollment ({$bookingEnrollment->email}) rejected",
            'created_at'=> now(),
        ]);
    }

    return response()->json([
        'message' => 'Booking enrollment rejected successfully',
    ]);
}

    ///////////////////////////////////////////////////////////////////




    /// Courses Section
    public function getAllCourse(){
        $listofCourses = Courses::all();
        return response()->json([
            'courses' => $listofCourses
        ]);
    }

    // Create Course
    public function createCourse(Request $request){
        $request->validate([
            'title' => 'required',
            'description' => 'required',
            'price' => 'required|numeric',
            'session' => 'required|numeric',
            'duration' => 'required'
        ]);

        $course = Courses::create($request->all());
        return response()->json([
            'message' => 'Course created successfully',
            'course' => $course
        ], 201);
    }

    /// Update Course
    public function updateCourse(Request $request, $id){
        $request->validate([
            'title' => 'required',
            'description' => 'required',
            'price' => 'required|numeric',
            'session' => 'required|numeric',
            'duration' => 'required'
        ]);

        $course = Courses::find($id);
        if(!$course) {
            return response()->json(['message' => 'Course not found'], 404);
        }

        $course->update($request->all());
        return response()->json([
            'message' => 'Course updated successfully',
            'course' => $course
        ]);
    }

    /// Delete Course
    public function deleteCourse($id){
        $course = Courses::find($id);
        if(!$course) {
            return response()->json(['message' => 'Course not found'], 404);
        }

        $course->delete();
        return response()->json([
            'message' => 'Course deleted successfully'
        ]);
    }


    public function uploadVideo(Request $request){

        $request->validate([
            'video' => 'required|file|mimetypes:video/mp4,video/mpeg,video/quicktime|max:500000', // 500MB max
            'title' => 'required|string|max:255',
            'session' => 'required|string|max:255',
            'description' => 'nullable|string|max:1000',
            'instructor' => 'required|string|max:255'
        ]);

        
        try {
            // Get the uploaded file
            $videoFile = $request->file('video');
            
            // Generate a unique filename
            $filename = Str::uuid() . '.' . $videoFile->getClientOriginalExtension();
            
            // Store the file in the videos directory
            $filepath = $videoFile->storeAs('videos', $filename, 'public');

            // Get video duration (you might need to use FFmpeg for accurate duration)
            $duration = $this->getVideoDuration($videoFile);

            // Create video record in database
            $video = TDCVideo::create([
                'title' => $request->input('title'),
                'session' => $request->input('session'),
                'description' => $request->input('description'),
                'filename' => $filename,
                'filepath' => $filepath,
                'video_url' => Storage::url($filepath),
                'duration' => $duration,
                'instructor' => $request->input('instructor')
            ]);

            return response()->json([
                'message' => 'Video uploaded successfully',
                'video' => $video
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Video upload failed',
                'error' => $e->getMessage()
            ], 500);
        }
    }
      // Existing helper method...
      private function getVideoDuration($videoFile)
      {
          // Placeholder for video duration calculation
          return 0;

          }
      public function getAuditLogs() {
    $logs = \App\Models\AuditLog::with('user')->latest()->get();
    return response()->json($logs);

    
}








}
