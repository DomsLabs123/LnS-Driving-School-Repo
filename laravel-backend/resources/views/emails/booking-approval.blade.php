<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Booking Enrollment Approved</title>
</head>
<body>
    <h1>Booking Enrollment Approved</h1>
    <p>Dear {{ $bookingEnrollment->firstname }} {{ $bookingEnrollment->lastname }},</p>
    <p>
        We're pleased to inform you that your booking enrollment for the course "{{ $bookingEnrollment->course->title }}" has been approved.
    </p>
    <p>
        Please let us know if you have any further questions or concerns.
    </p>
    <p>Best regards,</p>
    <p>{{ config('app.name') }}</p>
</body>
</html>