<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Booking Enrollment Rejected</title>
    <style>
        /* Add any custom styles here */
    </style>
</head>
<body>
    <h1>Booking Enrollment Rejected</h1>
    <p>Dear {{ $bookingEnrollment->firstname }} {{ $bookingEnrollment->lastname }},</p>
    <p>
        We regret to inform you that your booking enrollment for the course "{{ $bookingEnrollment->course->title }}" has been rejected.
    </p>
    <p>
        If you have any questions or concerns, please don't hesitate to contact us.
    </p>
    <p>Best regards,</p>
    <p>{{ config('app.name') }}</p>
</body>
</html>