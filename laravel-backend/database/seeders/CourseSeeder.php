<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Courses;
use Carbon\Carbon;
class CourseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Courses::create([
            'title' => 'Private Driving Course (PDC)',
            'description' => '15-hour practical driving course for beginners',
            'price' => 8000.00,
            'session' => 15,  
            'duration' => '15 hours',
            'category' => 'PDC',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);

        
        Courses::create([
            'title' => 'Theory Driving Course (TDC)',
            'description' => '8-hour theoretical driving course',
            'price' => 3000.00,
            'session' => 8,  
            'duration' => '8 hours',
            'category' => 'TDC',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);

        Courses::create([
            'title' => 'Motorcycle Driving Course (MDC)',
            'description' => '10-hour motorcycle driving course',
            'price' => 5000.00,
            'session' => 10,  
            'duration' => '10 hours',
            'category' => 'MDC',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);

        Courses::create([
            'title' => 'Refresher Course',
            'description' => 'Advanced special driving course for unique training needs',
            'price' => 6000.00,
            'session' => 12,  
            'duration' => '12 hours',
            'category' => 'Refresher',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);

    }
}
