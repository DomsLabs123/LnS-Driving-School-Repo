<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
class InstructorAccountSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Jhon Doe',
            'email' => 'johndoe@example.com',
            'status' => 'instructor',
            'password' => Hash::make('password321'), 
            'role' => 'instructor',
        ]);
    }
}
