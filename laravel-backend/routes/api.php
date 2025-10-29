<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\EnrollmentController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\BookingEnrollmentController;
use App\Http\Controllers\TDCOnlineController;
use App\Http\Controllers\StaffController;
use App\Http\Controllers\FeedbackController;



/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

//// Authentication /////
Route::post('/login', [AuthController::class, 'login']);
Route::middleware(['auth:sanctum'])->group(function(){
    Route::post('/logout', [AuthController::class, 'logout']);
});
/////////////////////////

//// Get list of Courses /////
Route::get('/list-course', [CourseController::class, 'getAllCourses']);
Route::get('/get-courses', [AdminController::class, 'getAllCourse']);
Route::get('/get-tdc', [CourseController::class, 'getTDCCourse']);
Route::get('/get-pdc', [CourseController::class, 'getPDCourse']);
Route::get('/get-mdc', [CourseController::class, 'getMDCCourse']);
Route::get('/get-refresher', [CourseController::class, 'getRefresherCourse']);

/////////////////////////////


//////////Online Enrollment ////////////
Route::post('/enrollment',[EnrollmentController::class, 'store']);
Route::post('/validator-enrollment',[EnrollmentController::class, 'validateEnrollments']);
//////////////////////////////////////

//////// Booking Enrollment //////////////////
Route::post('/booking-enrollment', [BookingEnrollmentController::class, 'store']);
Route::post('/validator-book-enrollment',[BookingEnrollmentController::class, 'validateEnrollments']);
////////////////////////////////////////////



Route::middleware(['auth:sanctum','role:student'])->group(function(){
    Route::post('/start-lecture', [TDCOnlineController::class, 'startExam']);
    Route::post('/sessionOneUpdate', [TDCOnlineController::class, 'SessionOneUpdate']);
    Route::post('/saved-score-session2', [TDCOnlineController::class, 'saveSession2ExamScore']);
    Route::post('/update-account', [TDCOnlineController::class, 'updateAccount']);
    Route::post('/saved-score-session1', [TDCOnlineController::class, 'saveQuizScore']);
    Route::post('/sessionTwoUpdate', [TDCOnlineController::class, 'SessionTwoStatus']);


    Route::get('/get-auth-user', [AuthController::class, 'getProfile']);
    Route::get('/check-status-sessionOne', [TDCOnlineController::class, 'sessionOneStatus']);
    Route::get('/check-SessionTwo-status', [TDCOnlineController::class, 'getSessionTwoStatus']);

    // get all Score
    Route::get('/get-sessionOne-score', [TDCOnlineController::class, 'getSessionOneScore']);
    Route::get('/get-sessionTwo-score', [TDCOnlineController::class, 'getSessionTwoScore']);
    Route::get('/get-Total-score', [TDCOnlineController::class, 'getTotalScore']);
    //submit feedback
    Route::post('/feedback', [FeedbackController::class, 'store']);
});


Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
    // Get all 
    Route::get('/getAdmin', [AuthController::class, 'getAdmin']);
    Route::get('/get-users',[AdminController::class, 'getAllUsers'] );

    //Upload Video
    Route::post('/upload-video', [AdminController::class, 'uploadVideo']);

    //courses api routes
    Route::get('/get-course', [AdminController::class, 'getAllCourse']);
    Route::post('/create-course', [AdminController::class, 'createCourse']);
    Route::put('/update-course/{id}', [AdminController::class, 'updateCourse']);
    Route::delete('/delete-course/{id}', [AdminController::class, 'deleteCourse']);
    
    //Online Enrollment Request
    Route::get('/online-enrollment-request', [AdminController::class, 'getOnlineEnrollRequest']);
    Route::get('/booking-request', [AdminController::class,'getBookingEnrollRequest']);

    Route::post('/booking-enrollment/{id}/approve', [AdminController::class, 'approveBookingEnrollment']);
    Route::post('/booking-enrollment/{id}/reject', [AdminController::class, 'rejectBookingEnrollment']);

    //User 
    Route::post('/create-user-credentials/{id}',[AdminController::class, 'generateUserCrendetials']);
    //Feedback
    Route::get('/feedback', [FeedbackController::class, 'index']);

});

Route::middleware(['auth:sanctum', 'role:staff'])->group(function(){
    Route::get('/getstaff', [StaffController::class, 'getStaff']);
    Route::put('/staff/reschedule-booking/{id}', [StaffController::class, 'rescheduleBooking']);
    Route::get('staff/booking-requests', [StaffController::class,'getBookingEnrollRequest']);
    Route::get('staff/online-enrollment-requests', [StaffController::class, 'getOnlineEnrollRequest']);
    
});

Route::middleware(['auth:sanctum', 'role:instructor'])->group(function(){
    Route::get('/getinstructor', [AuthController::class, 'getInstructor']);

});

Route::get('/audit-logs', [AdminController::class, 'getAuditLogs']);


// Route::put('/staff/reschedule-booking/{id}', [StaffController::class, 'rescheduleBooking']);
//     Route::get('/staff/booking-requests', [StaffController::class,'getBookingEnrollRequest']);
//     Route::get('/getstaff', [StaffController::class, 'getStaff']);


// Add these (inside the student middleware group if needed)
// Route::middleware(['auth:sanctum', 'role:student'])->group(function () {

// });

// // Admin route to view all feedback
// Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
//     Route::get('/feedbacks', [FeedbackController::class, 'index']);
// });

