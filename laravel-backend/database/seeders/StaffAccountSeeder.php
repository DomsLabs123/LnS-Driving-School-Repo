<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
class StaffAccountSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'L&S Staff',
            'email' => 'staff@example.com',
            'status' => 'staff',
            'password' => Hash::make('password321'), 
            'role' => 'staff',
        ]);
    }
}
