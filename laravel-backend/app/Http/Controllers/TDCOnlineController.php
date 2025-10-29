<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;
use Illuminate\Validation\ValidationException;
use App\Models\User;
use App\Models\SessionScore;
use App\Models\SessionStatus;
use Illuminate\Support\Facades\Auth;
class TDCOnlineController extends Controller
{   

    public function sessionOneStatus(){
        $user = Auth::user();
    
    if (!$user) {
        return response()->json([
            'error' => 'Student is not Authenticated'
        ], 401);
    }

        return response()->json([
            'session_one_status' => $user->session_one_status
        ], 200);
    }

    // get session two status 
    public function getSessionTwoStatus(){
        $user = Auth::user();
    
        if (!$user) {
            return response()->json([
                'error' => 'Student is not Authenticated'
            ], 401);
        }
        
            return response()->json([
                'session_one_status' => $user->session_two_status
            ], 200);
    }


    public function startExam(){
        $user = Auth::user();

        if(!$user){
            return response()->json([
                'error' => 'Student is not Authenticated'
            ],401);
        }

        try{
            $user->status = 'on-going';
            $user->save();
            return response()->json([
                'message' => 'Exam started successfully',
            ], 200);
        }catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to start exam',
                'details' => $e->getMessage()
            ], 500);
        }
    }

    // update user account
    public function updateAccount(Request $request){

        $user = Auth::user();
           // Validate the request
           $request->validate([
            'current_password' => 'required_with:new_password',
            'new_password' => 'nullable|min:8',
        ]);


             // Handle password change
            if ($request->filled('newPassword')) {
                // Verify current password
                if (!Hash::check($request->currentPassword, $user->password)) {
                    throw ValidationException::withMessages([
                        'currentPassword' => ['The current password is incorrect.'],
                    ]);
                }

                // Update password
                $user->password = Hash::make($request->newPassword);
            }

            $user->save();
    
            return response()->json([
                'message' => 'Profile updated successfully',
                'user' => $user
            ]);
    }


    public function saveQuizScore(Request $request){
        try {

            $request->validate([
                'score' => 'required|numeric',
                'session_name' => 'required|string'
            ]);

            $user = Auth::user();
            
            $sessionScore = SessionScore::where('user_id', $user->id)
            ->where('session_name', $request->session_name)
            ->first();

            if ($sessionScore) {
            // Update only if new score is higher
            if ($request->score > $sessionScore->score) {
                $sessionScore->score = $request->score;
                $sessionScore->save();
            }
        } else {
            // Create new session score record
            SessionScore::create([
                'user_id' => $user->id,
                'session_name' => $request->session_name,
                'score' => $request->score
            ]);
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Score saved successfully',
            'data' => [
                'session_name' => $request->session_name,
                'score' => $request->score
            ]
        ],200);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to save score: ' . $e->getMessage()
            ], 403);
        }
    }


    // update SessionOne Status
    public function SessionOneUpdate(){
        $user = Auth::user();

        if(!$user){
            return response()->json([
                'error' => 'Student is not Authenticated'
            ],401);
        }

        // if the user is finished exam on Session One
        try {
            SessionStatus::updateOrCreate(
                [
                    'user_id' => $user->id,
                    'session_name' => 'session_one'
                ],
                [
                    'status' => 'Finished'
                ]
            );
    
            return response()->json([
                'message' => 'Session status updated successfully',
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to update session status',
                'details' => $e->getMessage()
            ], 403);
        }
    }


    /**
     * Function to Saved Session 2 Exam Score Result
     */
    public function saveSession2ExamScore(Request $request)
    {
        try {

            $request->validate([
                'score' => 'required|numeric',
                'session_name' => 'required|string'
            ]);

            $user = Auth::user();
            
            $sessionScore = SessionScore::where('user_id', $user->id)
            ->where('session_name', $request->session_name)
            ->first();

            if ($sessionScore) {
            // Update only if new score is higher
            if ($request->score > $sessionScore->score) {
                $sessionScore->score = $request->score;
                $sessionScore->save();
            }
        } else {
            // Create new session score record
            SessionScore::create([
                'user_id' => $user->id,
                'session_name' => $request->session_name,
                'score' => $request->score
            ]);
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Score saved successfully',
            'data' => [
                'session_name' => $request->session_name,
                'score' => $request->score
            ]
        ],200);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to save score: ' . $e->getMessage()
            ], 403);
        }
    }

    /**
     * Update Student Status Session Two If the user finished or failed the exam
     */
    public function SessionTwoStatus(){

        $user = Auth::user();

        if(!$user){
            return response()->json([
                'error' => 'Student is not Authenticated'
            ],401);
        }

        // if the user is finished exam on Session Two
        try {
            SessionStatus::updateOrCreate(
                [
                    'user_id' => $user->id,
                    'session_name' => 'session_two'
                ],
                [
                    'status' => 'Finished'
                ]
            );
    
            return response()->json([
                'message' => 'Session status updated successfully',
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to update session status',
                'details' => $e->getMessage()
            ], 403);
        }
    }


    /**
     * Function to get Session 1 current student score
     */
    public function getSessionOneScore()
    {
        try {
            $user = Auth::user();
            if (!$user) {
                return response()->json([
                    'error' => 'User not authenticated'
                ], 401);
            }
    
            $sessionScore = SessionScore::where('user_id', $user->id)
                ->where('session_name', 'session_one')
                ->first();
    
            if (!$sessionScore) {
                return response()->json([
                    'session_one_score' => null,
                    'message' => 'No score found for session one'
                ]);
            }
    
            return response()->json([
                'status' => 'success',
                'session_one_score' => $sessionScore->score,
                'data' => [
                    'session_name' => $sessionScore->session_name,
                    'score' => $sessionScore->score
                ]
            ]);
            
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to retrieve score: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Function to get Sessio 2 current Student Score
     */
    public function getSessionTwoScore()
    {
        try {
            $user = Auth::user();
            if (!$user) {
                return response()->json([
                    'error' => 'User not authenticated'
                ], 401);
            }
    
            $sessionScore = SessionScore::where('user_id', $user->id)
                ->where('session_name', 'session_two')
                ->first();
    
            return response()->json([
                'status' => 'success',
                'data' => [
                    'session_two_score' => $sessionScore ? $sessionScore->score : null
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to retrieve score'
            ], 500);
        }
    }

    /**
     * Function to calculate overall Session 1 and Session 2 score
     */
   public function getTotalScore()
{
    try {
        $user = Auth::user();
        if (!$user) {
            return response()->json([
                'error' => 'User not authenticated'
            ], 401);
        }

        // Get scores from both sessions
        $sessionOneScore = SessionScore::where('user_id', $user->id)
            ->where('session_name', 'session_one')
            ->first();
           
        $sessionTwoScore = SessionScore::where('user_id', $user->id)
            ->where('session_name', 'session_two')
            ->first();

        // Simply add the raw scores
        $totalScore = 0;
        if ($sessionOneScore) $totalScore += $sessionOneScore->score;
        if ($sessionTwoScore) $totalScore += $sessionTwoScore->score;
       
        return response()->json([
            'status' => 'success',
            'data' => [
                'score' => $totalScore
            ]
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'status' => 'error',
            'message' => 'Failed to retrieve total score'
        ], 500);
    }
}
}
