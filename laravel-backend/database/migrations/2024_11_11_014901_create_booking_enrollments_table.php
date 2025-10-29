<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('booking_enrollments', function (Blueprint $table) {
            $table->id();
            $table->string('firstname');
            $table->string('lastname');
            $table->string('middlename')->nullable();
            $table->string('address');
            $table->string('cellphone');
            $table->string('email')->unique();
            $table->string('document_path')->nullable();
            $table->string('business_name')->nullable();
            $table->string('business_email')->nullable();
            $table->string('citizenship')->nullable();
            $table->integer('age')->nullable();
            $table->string('gender')->nullable();
            $table->date('birthday');
            $table->integer('height')->nullable();
            $table->integer('weight')->nullable();
            $table->string('civil_status')->nullable();
            $table->string('hair')->nullable();
            $table->string('build')->nullable();
            $table->string('complexion')->nullable();
            $table->string('education_attainment')->nullable();
            $table->string('school_name')->nullable();
            $table->string('school_address')->nullable();
            $table->string('spouse_name')->nullable();
            $table->string('father_name')->nullable();
            $table->string('mother_name')->nullable();
            $table->string('employer_name')->nullable();
            $table->string('employer_tel')->nullable();
            $table->string('employer_address')->nullable();
            $table->date('date_booked');
            $table->string('time_booked');
            $table->decimal('amount', 10, 2);
            $table->string('proof_image');
            $table->foreignId('course_enrolled')->constrained('courses')->onDelete('cascade');
            $table->enum('status', ['pending', 'approved', 'rejected'])->default('pending');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('booking_enrollments');
    }
};
