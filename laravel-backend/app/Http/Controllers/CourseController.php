<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Courses;
class CourseController extends Controller
{
    public function store(Request $request){
        $request->validate([
            'category' => 'required|string|max:255',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'session' => 'required|integer|min:1',
            'duration' => 'required|string',
        ]);

        $course = Courses::create([
            'category' => $request->input('category'),
            'title' => $request->input('title'),
            'description' => $request->input('description'),
            'price' => $request->input('price'),
            'session' => $request->input('session'),
            'duration' => $request->input('duration')
        ]);

        return response()->json([
            'message' => 'Course created successfully!',
            'course' => $course
        ],201);
    }
    
    public function getAllCourses(){
        return Courses::all();
    }

    // Getting Only The TDC
    public function getTDCCourse(){
        $course = Courses::where('category', 'TDC')->get();
        return response()->json([
            'courses' =>  $course   
        ]);
    }

    // Get Only the PDC
    public function getPDCourse(){
        $course = Courses::where('category', 'PDC')->get();
        return response()->json([
            'courses' =>  $course  
        ]);
    }

    // Get Only the MDC
    public function getMDCCourse(){
        $course = Courses::where('category', 'MDC')->get();
        return response()->json([
            'courses' =>  $course   
        ]);
        
        }

        // Get Only the Refresher
    public function getRefresherCourse(){
        $course = Courses::where('category', 'Refresher')->get();
        return response()->json([
            'courses' =>  $course   
        ]);
    }

}
