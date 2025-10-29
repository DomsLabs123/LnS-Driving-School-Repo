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

export const submitEnrollment = async (enrollmentData, paymentData) => {
    try {
        // pang insert sa data
        const formData = new FormData()

        // Getting all the inputs
         Object.keys(enrollmentData).forEach(key => {
            formData.append(`enrollment[${key}]`, enrollmentData[key]);
        });

        // Add payment data
        formData.append('payment[amount]', paymentData.amount);
        formData.append('payment[paymentProof]', paymentData.paymentProof);

        const response = await axiosInstance.post(`${BASE_URL}/enrollment`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;
    } catch (error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            throw new Error(error.response.data.message || 'Error submitting enrollment');
        } else if (error.request) {
            // The request was made but no response was received
            throw new Error('No response from server');
        } else {
            // Something happened in setting up the request that triggered an Error
            throw new Error('Error setting up enrollment request');
        }
    }
};

export const getCourses = async () => {
    try{
        const response = await axiosInstance.get(`${BASE_URL}/get-courses`);
        return response.data;
    } catch (error) {
        console.error('Error getting courses:', error.message);
        throw new Error('Failed to fetch course data');
    }
}

export const Validator = async (enrollmentData) => {
    const formData = new FormData();
    
    // Append all enrollment data to FormData
    Object.keys(enrollmentData).forEach(key => {
        if (key === 'document_path') {
            // Ensure file is appended correctly
            formData.append(`enrollment[${key}]`, enrollmentData[key]);
        } else {
            formData.append(`enrollment[${key}]`, enrollmentData[key]);
        }
    });
    try{
        const response = await axiosInstance.post(`${BASE_URL}/validator-enrollment`,formData,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Enrollment Validation Error:', error.response?.data || error.message);
        throw error;
    }
}

