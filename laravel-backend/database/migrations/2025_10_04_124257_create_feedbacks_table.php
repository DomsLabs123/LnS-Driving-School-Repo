<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('feedbacks', function (Blueprint $table) {
            $table->id('feedback_id'); // primary key
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade'); // link to users table
            $table->foreignId('enrollment_id')->constrained('enrollments')->onDelete('cascade'); // link to enrollments
            $table->string('feedback_title'); // title of feedback
            $table->text('feedback_description'); // feedback content
            $table->timestamps(); // created_at & updated_at
        });
    }

    public function down()
    {
        Schema::dropIfExists('feedbacks');
    }
};
