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

export const loginUser = async (credentials) => {
    try {
        const response = await axiosInstance.post(`${BASE_URL}/login`, credentials);
        // Store token and user data
        if (response.data.token) {
            localStorage.setItem('token', response.data.token); 
            localStorage.setItem('user', JSON.stringify(response.data.user));
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        }
        return response.data;
    } catch (error) {
        if (error.response?.status === 422) {
            throw new Error(error.response.data.message || 'Validation failed. Please check your inputs.');
        }
        throw error;
    }
};


export const logoutUser = async () => {
    try {
        const response = await axiosInstance.post(`${BASE_URL}/logout`);
        // Clear stored data
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        delete axiosInstance.defaults.headers.common['Authorization'];
        return response.data;
    } catch (error) {
        console.error('Logout error:', error.message);
        throw error;
    }
};

export const getAdmin = async() => {
    try{
        const response = await axiosInstance.get(`${BASE_URL}/getAdmin`);
        return response.data;
    }catch (error) {
        console.error('Get Admin Error', error.message);
        throw error;
    }
}

export const getStaff = async() => {
    try{
        const response = await axiosInstance.get(`${BASE_URL}/getstaff`);
        return response.data;
    }catch (error) {
        console.error('Get Staff Error', error.message);
        throw error;
    }
}

export const getInstructor = async() => {
    try{
        const response = await axiosInstance.get(`${BASE_URL}/getinstructor`);
        return response.data;
    }catch (error) {
        console.error('Get Instructor Error', error.message);
        throw error;
    }
}

export const getUser = async() => {
    try{
        const response = await axiosInstance.get(`${BASE_URL}/get-auth-user`);
        return response.data;
    }catch (error) {
        console.error('Get User Error', error.message);
    }   
}



