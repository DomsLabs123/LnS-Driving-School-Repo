import axiosInstance from '@/lib/axios/axios';
const BASE_URL = '/api';

// Get CSRF Token
export const getCsrfToken = async () => {
  try {
    await axiosInstance.get('/sanctum/csrf-cookie');
  } catch (error) {
    console.error('Error getting CSRF token:', error.message);
    throw new Error('Failed to get CSRF token');
  }
};

//  Staff: Get Online Enrollment Requests

export const getOnlineEnrollmentRequest = async () => {
  try {
    const res = await axiosInstance.get('/api/staff/online-enrollment-requests');
    return res.data;
  } catch (error) {
    console.error("Staff fetch error:", error);
    throw error;
  }
};

// 🔹 Staff: Get Booking Requests
export const getBookingRequests = async () => {
  try {
    const response = await axiosInstance.get(`${BASE_URL}/staff/booking-requests`);
    return response.data;
  } catch (error) {
    console.error('Get Booking Requests Error:', error.message);
    throw error;
  }
};

// 🔹 Staff: Reschedule a Booking
export const rescheduleBooking = async (bookingId, bookingData) => {
  try {
    const response = await axiosInstance.put(`${BASE_URL}/staff/reschedule-booking/${bookingId}`, {
      date_booked: bookingData.date_booked,
      time_booked: bookingData.time_booked,
    });
    return response.data;
  } catch (error) {
    console.error('Reschedule Booking Error:', error.message);
    throw error;
  }
};

// 🔹 Staff: Get List of Users (if allowed)
export const getStaffUsers = async () => {
  try {
    const response = await axiosInstance.get(`${BASE_URL}/staff/get-users`);
    return response.data;
  } catch (error) {
    console.error('Error getting Staff Users:', error.message);
    throw new Error('Failed to fetch users');
  }
};
