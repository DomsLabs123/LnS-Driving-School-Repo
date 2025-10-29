<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Feedback;

class FeedbackController extends Controller
{
    // Store feedback
    public function store(Request $request)
{
    \Log::info('Feedback request:', $request->all()); // <-- logs input

    $request->validate([
        'user_id' => 'required|exists:users,id',
        'enrollment_id' => 'required|exists:enrollments,id',
        'feedback_title' => 'required|string|max:255',
        'feedback_description' => 'required|string|max:1000',
    ]);

    $feedback = Feedback::create($request->only([
        'user_id',
        'enrollment_id',
        'feedback_title',
        'feedback_description',
    ]));

    return response()->json([
        'message' => 'Feedback submitted successfully.',
        'data' => $feedback,
    ], 201);
}

}
