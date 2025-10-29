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
/// Gell all Users
export const getListUser = async () => {
    try {
        const response = await axiosInstance.get(`${BASE_URL}/get-users`);
        return response.data;
    } catch (error) {
        console.error('Error getting user:', error.message);
        throw new Error('Failed to fetch user data');
    }
}  


//////////////////////// Courses Services ////////////////////////
// Get All Courses
export const getAllCourses = async () => {
    try {
        const response = await axiosInstance.get(`${BASE_URL}/get-course`);
        return response.data;
    } catch (error) {
        console.error('Error getting user:', error.message);
        throw new Error('Failed to fetch user data');
    }
}
// Create Course
export const createCourse = async (courseData) => {
    try {
        const response = await axiosInstance.post(`${BASE_URL}/create-course`, courseData);
        return response.data;
    } catch (error) {
        console.error('Error creating course:', error.message);
        throw new Error('Failed to create course');
    }
}
// Update Course
export const updateCourse = async (id, courseData) => {
    try {
        const response = await axiosInstance.put(`${BASE_URL}/update-course/${id}`, courseData);
        return response.data;
    } catch (error) {
        console.error('Error updating course:', error.message);
        throw new Error('Failed to update course');
    }
};
// Delete Course
export const deleteCourse = async (id) => {
    try {
        const response = await axiosInstance.delete(`${BASE_URL}/delete-course/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting course:', error.message);
        throw new Error('Failed to delete course');
    }
};
//////////////////////////////////////////////////////////////////////////////////////

/// Online Enrollment Request
export const getOnlineEnrollmentRequest = async () => {
    try {
        const response = await axiosInstance.get(`${BASE_URL}/online-enrollment-request`);
        return response.data;
    } catch (error) {
        console.error('Error getting Online Enrollment Request:', error.message);
        throw new Error('Failed to fetch data');
    }
}




///   Booking Enrollment Request ///////////////////
export const getBookingRequest = async () => {
    try {
        const response = await axiosInstance.get(`${BASE_URL}/booking-request`);
        return response.data;
    } catch (error) {
        console.error('Error getting Booking Enrollment Request:', error.message);
        throw new Error('Failed to fetch data');
    }
}
 
export const approveBookingEnrollment = async (id) => {
    try {
        const response = await axiosInstance.post(`${BASE_URL}/booking-enrollment/${id}/approve`);
        return response.data;
    } catch (error) {
        console.error('Error approving booking enrollment:', error.message);
        throw new Error('Failed to approve booking enrollment');
    }
};

export const rejectBookingEnrollment = async (id) => {
    try {
        const response = await axiosInstance.post(`${BASE_URL}/booking-enrollment/${id}/reject`);
        return response.data;
    } catch (error) {
        console.error('Error rejecting booking enrollment:', error.message);
        throw new Error('Failed to reject booking enrollment');
    }
};
////////////////////////////////////////////////////////////////////////////////////

//// Create Credentials ////////////////
export const generateUserCredentials = async (id) => {
    try {
        const response = await axiosInstance.post(`${BASE_URL}/create-user-credentials/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error generating user credentials:', error.message);
        throw new Error('Failed to generate credentials');
    }
};


//// AUDITLOGS ////////////////
export const getAuditLogs = async () => {
  try {
    const res = await axiosInstance.get('/api/audit-logs');
    return res.data;
  } catch (error) {
    console.error('Error fetching audit logs:', error.message);
    throw new Error('Failed to fetch audit logs');
  }
};

//////////////////////// Feedback Services ////////////////////////

// Get All Feedbacks
export const getAllFeedbacks = async () => {
  try {
    const response = await axiosInstance.get(`${BASE_URL}/feedbacks`);
    return response.data;
  } catch (error) {
    console.error('Error getting feedbacks:', error.message);
    throw new Error('Failed to fetch feedback data');
  }
};
